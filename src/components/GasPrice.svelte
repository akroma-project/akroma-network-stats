<script lang="ts">
  export let gasPrice = "0";
  const getPrice = (price: string) => {
    console.debug('gas price:', price);
    if (typeof price === "undefined") return "0 wei";

    if (price.length < 4) return price + " wei";

    if (price.length < 7) return (Number(price) / 1000) + " kwei";

    if (price.length < 10) return (Number(price) / 1000000) + " mwei";

    if (price.length < 13) return (Number(price) / 1000000000) + " gwei";

    if (price.length < 16) return (Number(price) / 1000000000000) + " szabo";

    if (price.length < 19) return (price.substr(0, price.length - 15)) + " finney";

    return (price.substr(0, price.length - 18)) + " ether";
  };
</script>

<div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 stat-holder box">
  <div class="gasprice text-info">
    <i class="icon-gasprice" /><span class="small-title">gas price</span><span class="small-value ng-binding">{getPrice(gasPrice)}</span>
  </div>
</div>
