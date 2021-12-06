<script lang="ts">
    export let current = 0;
    export let last = 0;
</script>

<div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 stat-holder">
    <div class="big-info uncleCount text-info">
        <div class="pull-left icon-full-width">
            <i class="icon-uncle" />
        </div>
        <div class="big-details-holder">
            <span class="small-title"
                >uncles&nbsp;<span class="small hidden-xs"
                    >(current / last 50)</span
                ></span
            ><span class="big-details ng-binding">{current}/{last}</span>
        </div>
        <div class="clearfix" />
    </div>
</div>
