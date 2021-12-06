import { fill, forEach, isUndefined } from "lodash-es";

const LatencyFilter = (node) => {
  if (isUndefined(node.readable)) node.readable = {};

  if (isUndefined(node.stats)) {
    node.readable.latencyClass = "text-danger";
    node.readable.latency = "offline";
  }

  if (node.stats.active === false) {
    node.readable.latencyClass = "text-danger";
    node.readable.latency = "offline";
  } else {
    if (node.stats.latency <= 100) node.readable.latencyClass = "text-success";

    if (node.stats.latency > 100 && node.stats.latency <= 1000) node.readable.latencyClass = "text-warning";

    if (node.stats.latency > 1000) node.readable.latencyClass = "text-danger";

    node.readable.latency = node.stats.latency + " ms";
  }
};

export default LatencyFilter;