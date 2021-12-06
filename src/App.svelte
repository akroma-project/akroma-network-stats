<script lang="ts">
  import ActiveNodes from "./components/ActiveNodes.svelte";

  import AverageBlockTime from "./components/AverageBlockTime.svelte";
  import AverageHashRate from "./components/AverageHashRate.svelte";

  import BestBlock from "./components/BestBlock.svelte";
  import BlockTime from "./components/BlockTime.svelte";
  import Difficulty from "./components/Difficulty.svelte";
  import DifficultyBar from "./components/DifficultyBar.svelte";
  import GasLimit from "./components/GasLimit.svelte";
  import GasPrice from "./components/GasPrice.svelte";
  import LastBlock from "./components/LastBlock.svelte";
  import PageLatency from "./components/PageLatency.svelte";
  import TransactionsPerSecond from "./components/TransactionsPerSecond.svelte";
  import Uncles from "./components/Uncles.svelte";
  import Uptime from "./components/Uptime.svelte";
  import Map from "./components/Map.svelte";
  import BlockPropagation from "./components/BlockPropagation.svelte";
  import LastBlockMiners from "./components/LastBlockMiners.svelte";
  import UncleCount from "./components/UncleCount.svelte";
  import Transactions from "./components/Transactions.svelte";
  import GasSpending from "./components/GasSpending.svelte";
  import GasLimitBar from "./components/GasLimitBar.svelte";
  import NodeTable from "./components/NodeTable.svelte";

  import { fill, forEach, isUndefined, max, findIndex, now, get, isEqual, forIn, result, find, maxBy } from "lodash";
  import LatencyFilter from "./methods/latencyFilter";
  import type { AkromaNode, NodeStats } from "./Model";

  var MAX_BINS = 40;
  let nodesTotal = 0;
  let nodesActive = 0;
  let bestBlock = 0;
  let lastBlock = 0;
  let lastDifficulty = 0;
  let upTimeTotal = 0;
  let avgBlockTime = 0;
  let blockPropagationAvg = 0;
  let avgHashrate = 0;
  let uncleCount = 0;
  let bestStats: Partial<NodeStats> = {};

  let lastGasLimit = fill(Array(MAX_BINS), 2);
  let lastBlocksTime = fill(Array(MAX_BINS), 2);
  let difficultyChart = fill(Array(MAX_BINS), 2);
  let transactionDensity = fill(Array(MAX_BINS), 2);
  let gasSpending = fill(Array(MAX_BINS), 2);
  let miners = [];

  let nodes: AkromaNode[] = [];
  let map = [];
  let blockPropagationChart = [];
  let uncleCountChart = fill(Array(MAX_BINS), 2);
  let coinbases = [];
  let latency = 0;
  let currentApiVersion = "0.0.1";
  let pinned = [];

  const socket = new WebSocket("wss://stats.akroma.wattpool.net/primus");
  socket.onopen = () => {
    const ready = { emit: ["ready"] };
    socket.send(JSON.stringify(ready));
    console.log("The connection has been opened.");
  };

  socket.onmessage = (event: MessageEvent<any>) => {
    const parsed = JSON.parse(event.data);

    if (parsed.action) {
      onaction(parsed.action, parsed.data);
    }
    if (parsed.emit) {
      const d = { emit: ["client-pong", { serverTime: 1638151924026, clientTime: 1638151924088 }] };
      onmessage(parsed.emit[0], parsed.emit[1]);
    }
  };

  const onmessage = (action: string, data: any) => {
    console.debug("onmessage:", action, data);
    switch (action) {
      case "init":
        nodes = data.nodes;
        forEach(nodes, (node: AkromaNode, index) => {
          if (isUndefined(node.stats.hashrate)) {
            node.stats.hashrate = 0;
          }

          // Init latency
          LatencyFilter(node);

          // Init history
          if (isUndefined(data.history)) {
            data.history = new Array(40);
            fill(data.history, -1);
          }

          // Init or recover pin
          node.pinned = pinned.indexOf(node.id) >= 0 ? true : false;
        });

        if (nodes.length > 0) {
          //toastr["success"]("Got nodes list", "Got nodes!");
          UpdateActiveNodes();
          updateBestBlock();
        }
        break;
      default:
        console.warn("unknown server message: ", action);
    }
  };

  const onaction = (action: string, data: any) => {
    console.debug("onaction:", action);
    switch (action) {
      case "block":
        var index = findIndex(nodes, { id: data.id });

        if (index >= 0 && !isUndefined(nodes[index]) && !isUndefined(nodes[index].stats)) {
          if (nodes[index].stats.block.number < data.block.number) {
            var best = maxBy(nodes, (x) => x.stats.block.number).stats.block;

            if (data.block.number > best.number) {
              data.block.arrived = now();
            } else {
              data.block.arrived = best.arrived;
            }

            nodes[index].history = data.history;
          }

          nodes[index].stats.block = data.block;
          nodes[index].stats.propagationAvg = data.propagationAvg;

          updateBestBlock();
        }
        break;
      case "stats":
        var index = findIndex(nodes, { id: data.id });
        if (!isUndefined(data.id) && index >= 0) {
          var node = nodes[index];

          if (!isUndefined(node) && !isUndefined(node.stats)) {
            nodes[index].stats.active = data.stats.active;
            nodes[index].stats.mining = data.stats.mining;
            nodes[index].stats.hashrate = data.stats.hashrate;
            nodes[index].stats.peers = data.stats.peers;
            nodes[index].stats.gasPrice = data.stats.gasPrice;
            nodes[index].stats.uptime = data.stats.uptime;
            if (!isUndefined(data.stats.latency) && get(nodes[index], "stats.latency", 0) !== data.stats.latency) {
              nodes[index].stats.latency = data.stats.latency;

              LatencyFilter(nodes[index]);
            }
            UpdateActiveNodes();
          }
        }
        break;
      case "charts":
        console.debug("charts", data);
        if (!isEqual(avgBlockTime, data.avgBlocktime)) avgBlockTime = data.avgBlocktime;

        if (!isEqual(avgHashrate, data.avgHashrate)) avgHashrate = data.avgHashrate;

        if (!isEqual(lastGasLimit, data.gasLimit) && data.gasLimit.length >= MAX_BINS) lastGasLimit = data.gasLimit;

        if (!isEqual(lastBlocksTime, data.blocktime) && data.blocktime.length >= MAX_BINS) lastBlocksTime = data.blocktime;
        
        
        // TODO: this is not being set correct.
        // console.debug("data.difficulty", data);
        if (!isEqual(difficultyChart, data.difficulty) && data.difficulty.length >= MAX_BINS) {
          difficultyChart = data.difficulty;
        }
        

        if (!isEqual(blockPropagationChart, data.propagation.histogram)) {
          blockPropagationChart = data.propagation.histogram;
          blockPropagationAvg = data.propagation.avg;
        }

        data.uncleCount.reverse();

        if (!isEqual(uncleCountChart, data.uncleCount) && data.uncleCount.length >= MAX_BINS) {
          uncleCount = data.uncleCount[data.uncleCount.length - 2] + data.uncleCount[data.uncleCount.length - 1];
          uncleCountChart = data.uncleCount;
        }

        if (!isEqual(transactionDensity, data.transactions) && data.transactions.length >= MAX_BINS) transactionDensity = data.transactions;

        if (!isEqual(gasSpending, data.gasSpending) && data.gasSpending.length >= MAX_BINS) gasSpending = data.gasSpending;

        if (!isEqual(miners, data.miners)) {
          miners = data.miners;
          getMinersNames();
        }

        break;
      case "client-ping":
        // {"emit":["client-pong",{"serverTime":1638151037945,"clientTime":1638151038001}]}
        const pong = {
          emit: [
            "client-pong",
            {
              serverTime: data.serverTime,
              clientTime: now(),
            },
          ],
        };
        socket.send(JSON.stringify(pong));
        updateBestBlock();
        break;
      default:
        console.warn("unknown action", action);
    }
  };

  const updateBestBlock = () => {
    console.debug("nodes length: ", nodes);
    if (nodes.length) {
      var foundBestBlock = maxBy(nodes, (x) => x.stats.block.number).stats.block.number;

      if (foundBestBlock !== bestBlock) {
        bestBlock = foundBestBlock;
        bestStats = maxBy(nodes, (x) => x.stats.block.number).stats;

        lastBlock = bestStats.block.arrived;
        lastDifficulty = Number(bestStats.block.difficulty);
      }
    }
  };

  const getMinersNames = () => {
    if (miners.length > 0) {
      forIn(miners, function (value, key) {
        if (value.name !== false) return;

        if (value.miner === "0x0000000000000000000000000000000000000000") return;

        var name = result(
          find(
            nodes.map((x) => x.info),
            "coinbase",
            value.miner
          ),
          "name"
        );

        if (!isUndefined(name)) miners[key].name = name;
      });
    }
  };

  const UpdateActiveNodes = () => {
    nodesTotal = nodes.length;
    nodesActive = nodes.filter((x) => x.stats.active).length;

    // upTimeTotal =
    //   reduce(
    //     nodes,
    //     function (total, node) {
    //       return total + node.stats.uptime;
    //     },
    //     0
    //   ) / nodes.length;
    // map = _.map(nodes, function (node) {
    //   var fill = $filter("bubbleClass")(node.stats, bestBlock);
    //   if (node.geo != null)
    //     return {
    //       radius: 3,
    //       latitude: node.geo.ll[0],
    //       longitude: node.geo.ll[1],
    //       nodeName: node.info.name,
    //       fillClass: "text-" + fill,
    //       fillKey: fill,
    //     };
    //   else
    //     return {
    //       radius: 0,
    //       latitude: 0,
    //       longitude: 0,
    //     };
    // });
  };
</script>

<main>
  <div class="container-fluid">
    <div class="row">
      <BestBlock num={bestBlock} />
      <Uncles current={bestStats?.block?.uncles?.length} last={uncleCount} />
      <LastBlock {lastBlock} />
      <AverageBlockTime />
      <AverageHashRate />
      <Difficulty difficulty={lastDifficulty} />
      <div class="clearfix" />
    </div>
    <div class="row">
      <div style="padding-top: 0px;" class="col-xs-12 stats-boxes">
        <div class="row second-row">
          <ActiveNodes active={nodesActive} total={nodesTotal} />
          <!-- <TransactionsPerSecond /> -->
          <GasPrice />
          <GasLimit />
          <PageLatency />
          <Uptime />
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
            <div class="row">
              <BlockTime />
              <DifficultyBar {difficultyChart} />
              <BlockPropagation />
              <LastBlockMiners />
              <UncleCount />
              <Transactions />
              <GasSpending />
              <GasLimitBar />
            </div>
          </div>
          <Map />
        </div>
      </div>
    </div>
    <div class="row hidden-xs">
      <div class="col-xs-12 stats-boxes">
        <div class="row second-row" />
      </div>
    </div>
    <div style="padding-top: 10px" class="row">
      <NodeTable />
    </div>
  </div>
</main>

<style lang="scss" global>
  @import "./global.scss";
</style>
