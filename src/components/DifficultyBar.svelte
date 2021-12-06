<script lang="ts">
  export let difficultyChart = [];
  import { LinkedChart } from "svelte-tiny-linked-charts";
  //https://mitcheljager.github.io/svelte-tiny-linked-charts/?ref=madewithsvelte.com
</script>

<div class="col-xs-6 col-sm-4 col-md-3 stat-holder">
  <div class="big-info chart text-info">
    <span class="small-title">difficulty</span>
    <span class="chart-details">
      <LinkedChart data={difficultyChart} showValue={true} valueDefault="" valuePrepend="difficulty:"  width="250" height="50" align="left"/>
    </span>
  </div>
</div>
