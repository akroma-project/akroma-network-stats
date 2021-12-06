<div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 stat-holder">
    <div class="big-info difficulty text-orange">
        <div class="pull-left icon-full-width">
            <i class="icon-hashrate" />
        </div>
        <div class="big-details-holder">
            <span class="small-title"
                ><span class="hidden-xs">avg&nbsp;</span>network hash<span
                    class="hidden-xs">rate</span
                ></span
            ><span
                ng-bind-html="avgHashrate | networkHashrateFilter"
                class="big-details ng-binding"
                >0 <span class="small-hash">KH/s</span></span
            >
        </div>
        <div class="clearfix" />
    </div>
</div>
