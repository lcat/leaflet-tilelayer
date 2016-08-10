/**
 * 腾讯地图
 */
L.TencentLayer = L.TileLayer.extend({
  options: {
    subdomains: [0, 1, 2]
  },

  //type: ROADMAP(普通地图), RealROADMAP(路网), SATELLITE(卫星), TERRAIN(地形)
  //如果实现HYBRID效果则需要叠加RealROADMAP和SATELLITE两个图层
  initialize: function(type, options) {
    L.Util.setOptions(this, options);

    this._type = type || 'ROADMAP';
  },

  getTileUrl: function(tilePoint) {

    this._url =
      "http://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style={t}";

    var urlArgs = {
      z: tilePoint.z,
      x: tilePoint.x,
      y: Math.pow(2, tilePoint.z) - 1 - tilePoint.y
    };

    switch (this._type) {
      case 'ROADMAP':
        this._url = this._url.replace('{t}', 0);
        break;
      case 'RealROADMAP':
        this._url = this._url.replace('{t}', 1);
        break;
      case 'SATELLITE':
        this._url = "http://p{s}.map.gtimg.com/sateTiles/{z}/{x16}/{y16}/{x}_{y}.jpg";
        urlArgs.x16 = Math.floor(tilePoint.x / 16);
        urlArgs.y16 = Math.floor((Math.pow(2, tilePoint.z) - 1 - tilePoint.y) / 16);
        break;
      case 'TERRAIN':
        this._url = "http://p{s}.map.gtimg.com/demTiles/{z}/{x16}/{y16}/{x}_{y}.jpg";
        urlArgs.x16 = Math.floor(tilePoint.x / 16);
        urlArgs.y16 = Math.floor((Math.pow(2, tilePoint.z) - 1 - tilePoint.y) / 16);
    }

    return L.Util.template(this._url, L.extend(urlArgs, this.options, {
      s: this._getSubdomain(tilePoint)
    }));
  }
});

L.tencentLayer = function(key, options) {
  return new L.TencentLayer(key, options);
};