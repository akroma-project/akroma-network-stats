<table class="table table-striped">
    <thead
        ><tr class="text-info"
            ><th class="th-nodecheck"
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Pin nodes to display first"
                    ng-click="orderTable(['-stats.block.number', 'stats.block.propagation'], false)"
                    class="icon-check-o"
                /></th
            ><th class="th-nodename"
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Node name"
                    ng-click="orderTable(['info.name'], false)"
                    class="icon-node"
                /></th
            ><th class="th-nodetype hidden-xs"
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Node type"
                    ng-click="orderTable(['info.node'], false)"
                    class="icon-laptop"
                /></th
            ><th class="th-latency hidden-xs"
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Node latency"
                    ng-click="orderTable(['stats.latency'], false)"
                    class="icon-clock"
                /></th
            ><th class="hidden-xs"
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Is mining"
                    ng-click="orderTable(['-stats.hashrate'], false)"
                    class="icon-mining"
                /></th
            ><th
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    ng-click="orderTable(['-stats.peers'], false)"
                    class="icon-group"
                    data-original-title="Peers"
                /></th
            ><th
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Pending transactions"
                    ng-click="orderTable(['-stats.pending'], false)"
                    class="icon-network"
                /></th
            ><th class="hidden-xs"
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Last block"
                    ng-click="orderTable(['-stats.block.number', 'stats.block.propagation'], false)"
                    class="icon-block"
                /></th
            ><th class="th-blockhash hidden-xs hidden-sm hidden-md">&nbsp;</th
            ><th class="th-blockhash hidden-xs hidden-sm hidden-md"
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Total difficulty"
                    ng-click="orderTable(['-stats.block.totalDifficulty'], false)"
                    class="icon-difficulty"
                /></th
            ><th class="hidden-xs"
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    ng-click="orderTable(['-stats.block.transactions.length'], false)"
                    class="icon-check-o"
                    data-original-title="Block transactions"
                /></th
            ><th class="hidden-xs"
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Uncles"
                    ng-click="orderTable(['-stats.block.uncles.length'], false)"
                    class="icon-uncle"
                /></th
            ><th class="th-blocktime"
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    ng-click="orderTable(['-stats.block.received'], false)"
                    class="icon-time"
                    data-original-title="Last block time"
                /></th
            ><th class="th-peerPropagationTime"
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Propagation time"
                    ng-click="orderTable(['-stats.block.number', 'stats.block.propagation'], false)"
                    class="icon-gas"
                /></th
            ><th class="th-peerPropagationChart" /><th
                class="th-peerPropagationAvg hidden-xs"
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Average propagation time"
                    ng-click="orderTable(['stats.propagationAvg'], false)"
                    class="icon-gas"
                /></th
            ><th
                ><i
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    ng-click="orderTable(['-stats.uptime'], false)"
                    class="icon-bulb"
                    data-original-title="Up-time"
                /></th
            ></tr
        ></thead
    ><tbody
        ><!-- ngRepeat: node in nodes | orderBy:predicate track by node.id --></tbody
    >
</table>
