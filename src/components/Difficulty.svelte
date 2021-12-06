<script lang="ts">
  export let difficulty = 0;
  const getDifficulty = (hashes: number) => {
    var result = 0;
    var unit = "";

    if (hashes !== 0 && hashes < 1000) {
      result = hashes;
      unit = "";
    }

    if (hashes >= 1000 && hashes < Math.pow(1000, 2)) {
      result = hashes / 1000;
      unit = "K";
    }

    if (hashes >= Math.pow(1000, 2) && hashes < Math.pow(1000, 3)) {
      result = hashes / Math.pow(1000, 2);
      unit = "M";
    }

    if (hashes >= Math.pow(1000, 3) && hashes < Math.pow(1000, 4)) {
      result = hashes / Math.pow(1000, 3);
      unit = "G";
    }

    if (hashes >= Math.pow(1000, 4) && hashes < Math.pow(1000, 5)) {
      result = hashes / Math.pow(1000, 4);
      unit = "T";
    }

    return result.toFixed(2) + " " + unit + "H";
  };
</script>

<div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 stat-holder">
  <div class="big-info difficulty text-danger">
    <div class="pull-left icon-full-width">
      <i class="icon-difficulty" />
    </div>
    <div class="big-details-holder">
      <span class="small-title">difficulty</span><span class="big-details"><span class="small-hash ng-binding">{getDifficulty(difficulty)}</span></span>
    </div>
    <div class="clearfix" />
  </div>
</div>
