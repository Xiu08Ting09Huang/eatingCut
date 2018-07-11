<template>
  <div >
    <el-button type="primary" plain  @click="dialogVisible = true">地图获取经纬度</el-button>
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose"  width="80%" >
      <baidu-map :style="mapStyle" class="bm-view" ak="TYzIKw3Y2C2GvHXGOESM1n28MdfTVVWB"
      :center="center" 
      :zoom="zoom" 
      :scroll-wheel-zoom="true" 
      @click="getClickInfo"
      @moving="syncCenterAndZoom" 
      @moveend="syncCenterAndZoom" 
      @zoomend="syncCenterAndZoom">
        <bm-view style="width: 100%; height:500px;"></bm-view>
        <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
        <bm-control :offset="{width: '10px', height: '10px'}">
          <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">
            <input type="text" placeholder="请输入搜索关键字" class="serachinput">
          </bm-auto-complete>
        </bm-control>
        <bm-local-search :keyword="keyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
      </baidu-map>
      <div slot="footer" style="margin-top: 0px;">
        <el-button @click="cancel" >取消</el-button>
        <el-button type="primary"  @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>  
</template>
<script>
  import {BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker} from 'vue-baidu-map'
  export default {
    components: {
      BaiduMap,
      BmControl,
      BmView,
      BmAutoComplete,
      BmLocalSearch,
      BmMarker
    },
    data () {
      return {
        dialogVisible: this.value,
        keyword: '',
        mapStyle: {
          width: '100%',
          height: this.mapHeight + 'px'
        },
        center: {lng: 120.60361, lat: 31.21573},
        zoom: 15
      }
    },
    watch: {
      value (currentValue) {
        this.dialogVisible = currentValue
        if (currentValue) {
          this.keyword = ''
        }
      }
    },
    props: {
      value: Boolean,
      mapHeight: {
        type: Number,
        default: 500
      }
    },
    methods: {
      handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
      //地图点击事件
      getClickInfo (e) {
        this.center.lng = e.point.lng
        this.center.lat = e.point.lat
      },
      syncCenterAndZoom (e) {
        const {lng, lat} = e.target.getCenter()
        this.center.lng = lng
        this.center.lat = lat
        this.zoom = e.target.getZoom()
      },
      //确认
      confirm () {
        this.dialogVisible = false
        this.$emit('map-confirm', this.center)
      },
      //取消
      cancel () {
        this.dialogVisible = false
        this.$emit('cancel', this.dialogVisible)
      }
    }
  }
</script>
 
<style scoped>
.serachinput{
  width: 300px;
  box-sizing: border-box;
  padding: 9px;
  border: 1px solid #dddee1;
  line-height: 20px;
  font-size: 16px;
  height: 38px;
  color: #333;
  position: relative;
  border-radius: 4px;
  -webkit-box-shadow: #666 0px 0px 10px;
  -moz-box-shadow: #666 0px 0px 10px;
  box-shadow: #666 0px 0px 10px;
}
</style>