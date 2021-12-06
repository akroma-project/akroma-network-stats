
<script lang="ts">
    export let active = 0;
    export let total = 0;
</script>
<div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 stat-holder box">
    <div class="active-nodes text-danger">
        <i class="icon-node" /><span class="small-title">active nodes</span
        ><span class="small-value ng-binding">{active}/{total}</span>
    </div>
</div>
