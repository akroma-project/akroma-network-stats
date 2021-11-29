<script lang="ts">
	const socket = new WebSocket("wss://stats.akroma.wattpool.net/primus");
	socket.addEventListener("open", function open() {
		socket.send("ready");
		console.log("The connection has been opened.");
	});

	socket.addEventListener("end", function end() {
		console.log("Socket connection ended.");
	});

	socket.addEventListener("error", function error(err) {
		console.log(err);
	});

	socket.addEventListener("reconnecting", function reconnecting(opts) {
		console.log("We are scheduling a reconnect operation", opts);
	});

	socket.addEventListener("data", function incoming(data) {
		console.debug("on data", data);
		// $scope.$apply(socketAction(data.action, data.data));
	});

	socket.addEventListener("init", function (data) {
		console.debug("on init", data);
		//$scope.$apply(socketAction("init", data.nodes));
	});

	socket.addEventListener("client-latency", function (data) {
		console.debug("on latency", data);
		//$scope.latency = data.latency;
	});

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
	export let name: string;
</script>

<main>
	<div ng-controller="StatsCtrl" class="container-fluid ng-scope">
		<div class="row">
			<BestBlock />
			<Uncles />
			<LastBlock />
			<AverageBlockTime />
			<AverageHashRate />
			<Difficulty />
			<div class="clearfix" />
		</div>
		<div class="row">
			<div style="padding-top: 0px;" class="col-xs-12 stats-boxes">
				<div class="row second-row">
					<ActiveNodes />
					<TransactionsPerSecond />
					<GasPrice />
					<GasLimit />
					<PageLatency />
					<Uptime />
				</div>
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
						<div class="row">
							<BlockTime />
							<DifficultyBar />
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
