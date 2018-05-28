<template>
  <div class="app-container">
    <baidu-map class="bm-view"  :center="center" :zoom="zoom" :scroll-wheel-zoom="true" >
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"></bm-map-type>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bm-marker v-for="marker of projectPoint"
                 :position="{lng: marker.lng, lat: marker.lat}"
                 :key="marker.projectId"
                  animation="BMAP_ANIMATION_BOUNCE"
                 :icon="{url: 'static/project.png', size: {width: 100, height: 157}}"
                  @dblclick="getConcentratorPoints(marker.projectId)"
                 :title="'项目:'+marker.projectName+'\r'+'联系人：'+marker.personName+'\r'+'联系方式：'+marker.phone">
      </bm-marker>
      <bm-marker v-for="marker of concentratorPoint"
                 :position="{lng: marker.longitude, lat: marker.latitude}"
                 animation="BMAP_ANIMATION_BOUNCE"
                 :icon="{url: 'static/concentrator.png', size: {width: 100, height: 157}}"
                 >
      </bm-marker>
    </baidu-map>
  </div>

</template>

<script>
  import {getProjectPoints,getConcentratorPoints}from '@/api/monitoring'
  import MyOverlay from '../../components/MyOverlay'
  import {FormatNumber,FormatBinary} from '@/utils/format'

  export default {
    components: {
      MyOverlay
    },
    data () {
      return {
        center:"中国",
        zoom:6,
        projectPoint:[],
        concentratorPoint:[],
      }
    },
    mounted(){
      this.getProjectPoints()
    },
    methods: {
      disposeDetail(data){
        let res = []
        for (let value of data){
          value.upInterval = this.judgeUpInterval(value.upInterval)
          value.upDelay = value.upDelay + "s"
          value.upRepeat = value.upRepeat + "次"
          value.systemControlMode = this.judgeControlMode(value.systemControlMode)
          value.collectTimeInterval = this.judgeUpInterval(value.collectTimeInterval)
          value.longitude = FormatNumber(value.longitude,6)
          value.latitude = FormatNumber(value.latitude,6)
          value.circuitState = FormatBinary(Number(value.circuitState).toString(2),8)
          res.push(value)
        }
        return res
      },
      judgeUpInterval(num){
        switch (num){
          case 0 :
            return "无"
          case 1 :
            return "2s"
          case 2 :
            return "5s"
          case 3 :
            return "10s"
          case 4 :
            return "15s"
          case 5 :
            return "20s"
          case 6 :
            return "30s"
          case 7 :
            return "1m"
          case 8 :
            return "2m"
          case 9 :
            return "5m"
          case 10 :
            return "10m"
          case 11 :
            return "15m"
          case 12 :
            return "20m"
          case 13 :
            return "30m"
          case 14 :
            return "1h"
          case 15 :
            return "2h"
          case 16 :
            return "3h"
          case 17 :
            return "4h"
          case 18 :
            return "6h"
          case 19 :
            return "12h"
        }
      },
      judgeControlMode(num){
        switch (num){
          case 0:
            return "本地"
          case 1:
            return "远程"
        }
      },
      getProjectPoints(){
        return new Promise((resolve, reject) => {
          getProjectPoints(this.$store.state.user.projectID).then(response => {
            const data = response.data
            this.projectPoint = data
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      getConcentratorPoints(projectId){
        this.projectPoint = []
        return new Promise((resolve, reject) => {
          getConcentratorPoints(projectId).then(response => {
            const data = response.data
            this.concentratorPoint = this.disposeDetail(data)
            this.zoom = 7
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
    },
  }
</script>

<style scoped>
.bm-view{
  width: 100%;
  height: 600px;
}
</style>
