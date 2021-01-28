<template>
  <div id="map" :style="{ width, height }">
    <div id="popup"></div>
  </div>
</template>

<script>
import DATA_JSON from './assets/data.js'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
// import WMTS from 'ol/source/WMTS'
import Point from 'ol/geom/Point'
import Overlay from 'ol/Overlay'

import { fromLonLat, transform, get as getProjection } from 'ol/proj'
import { defaults as defaultControls } from 'ol/control'
// import { getWidth, getTopLeft } from 'ol/extent'
// import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { Fill, Stroke, Style, Icon, Text } from 'ol/style'

import 'ol/events/Event'
import 'ol/obj'
// import ScaleLine from 'ol/control/ScaleLine' //比例尺
// import GeoJSON from 'ol/format/GeoJSON' //以GeoJSON（地图数据/矢量数据）格式读取和写入数据
import Feature from 'ol/Feature' //具有几何和其他属性的地理要素的矢量对象
import VectorSource from 'ol/source/Vector' //提供矢量图层的数据
import VectorLayer from 'ol/layer/Vector' //用于显示在客户端渲染的矢量数据

export default {
  name: 'CtcMap',
  props: {
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '600px'
    },
    zoom: {
      type: Number,
      default: 4
    },
    center: {
      type: Array,
      default: () => [110, 36]
    }
  },
  data() {
    return {
      mapCtx: null,
      mapPopup: null,
      dataJson: DATA_JSON.data.rows
    }
  },
  mounted() {
    this.initMap()
    this.createPoint(this.dataJson)
    this.mapEvent()
  },
  methods: {
    // 初始化
    initMap() {
      this.mapCtx = new Map({
        target: 'map',
        controls: defaultControls({ attribution: false, zoom: false, rotate: false }).extend([]),
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
          })
        ],
        view: new View({
          center: transform(this.center, 'EPSG:4326', 'EPSG:3857'),
          zoom: this.zoom,
          minZoom: this.zoom - 1.5
        })
      })
      // 派发给父元素加载完成事件
      this.$emit('complete', this.mapCtx)

      this.mapPopup = new Overlay({
        element: document.getElementById('popup'),
        positioning: 'bottom-left',
        stopEvent: false,
        offset: [-23, -15]
      })
      this.mapCtx.addOverlay(this.mapPopup)
    },

    // 创建点源
    createPoint(data) {
      let featureTemp = []
      data.forEach(v => {
        const point = new Feature({
          data: v,
          geometry: new Point(fromLonLat([+v.longitude, +v.latitude]))
        })
        point.setStyle(
          new Style({
            image: new Icon({
              crossOrigin: 'anonymous',
              scale: [0.5, 0.5],
              src: require(`./assets/map-site/map-icon-${v.status}.png`),
              imgSize: [40, 40]
            })
          })
        )
        point.data = v
        featureTemp.push(point)
      })
      let source = new VectorLayer({
        // 创建矢量图层
        source: new VectorSource({
          features: featureTemp
        })
      })
      this.mapCtx.addLayer(source)
    },

    mapEvent() {
      if (!this.mapCtx) {
        return
      }
      // 处理鼠标hover状态、并且移动展示名称
      this.mapCtx.on('pointermove', evt => {
        const feature = this.mapCtx.forEachFeatureAtPixel(evt.pixel, feature => feature)
        // https://openlayers.org
        if (!feature) {
          return
        }
        let bizIndex = feature.revision_
        const elPopup = document.getElementById('popup')
        if (bizIndex === 2 || bizIndex === 3) {
          this.mapCtx.getTargetElement().style.cursor = this.mapCtx.hasFeatureAtPixel(evt.pixel) ? 'pointer' : ''

          if (!feature.data.name) {
            return
          }
          if (!this.mapPopup) {
            return
          }

          this.mapPopup.setPosition(feature.getGeometry().getCoordinates())
          elPopup.innerHTML = feature.data.name
          elPopup.style.display = 'block'

          evt.stopPropagation()
          evt.preventDefault()
        } else {
          elPopup.style.display = 'none'
          this.mapCtx.getTargetElement().style.cursor = ''
        }
      })

      // 点击打开弹层
      this.mapCtx.on('click', evt => {
        const feature = this.mapCtx.forEachFeatureAtPixel(evt.pixel, feature => feature)
        if (!feature) {
          return
        }
        this.$emit('mapClick', feature)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#map {
  background-color: #f1f1f1;
}
#popup {
  background: #fff;
  box-shadow: 1px 1px 5px rgb(158, 157, 157);
  color: #333;
  padding: 4px 10px;
  border-radius: 2px;
  display: none;
  position: relative;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 21px;
    left: 18px;
    height: 10px;
    width: 10px;
    transform: rotate(45deg);
    background-color: #fff;
    box-shadow: 1px 1px 1px rgb(158, 157, 157);
  }
}
</style>
