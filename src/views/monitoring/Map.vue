<template>
  <div class="app-container">
    <baidu-map class="bm-view"  center="中国" scroll-wheel-zoom="true">
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"></bm-map-type>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
    </baidu-map>
  </div>

</template>

<script>

</script>

<style scoped>
.bm-view{
  width: 100%;
  height: 600px;
}
</style>
