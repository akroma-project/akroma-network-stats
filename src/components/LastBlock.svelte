<script lang="ts">
  import moment from "moment";
  export let lastBlock = 0;
  const parse = (timestamp) => {
    if (timestamp === 0) return "∞";

    // var time = Math.floor((new Date()).getTime() / 1000);
    var time = new Date().getTime();
    var diff = Math.floor((time - timestamp) / 1000);

    if (diff < 60) return Math.round(diff) + " s ago";
    return moment.duration(Math.round(diff), "s").humanize() + " ago";
  };
</script>

<div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 stat-holder">
  <div class="big-info blocktime text-danger">
    <div class="pull-left icon-full-width">
      <i class="icon-time" />
    </div>
    <div class="big-details-holder">
      <span class="small-title">last block</span><span class="big-details ng-binding">{parse(lastBlock)}∞</span>
    </div>
    <div class="clearfix" />
  </div>
</div>
