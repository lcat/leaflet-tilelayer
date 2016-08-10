/**
 * 百度地图
 */
L.BaiduLayer = L.TileLayer.extend({
  options: {
    subdomains: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },

  //type: ROADMAP(普通地图), SATELLITE(卫星), HYBRID(混合)
  initialize: function(type, options) {
    L.Util.setOptions(this, options);

    this._type = type || 'ROADMAP';
  },

  getTileUrl: function(tilePoint) {

    this._url =
      "http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20150213";

    var zoom = tilePoint.z - 1;
    var offsetX = Math.pow(2, zoom);
    var offsetY = offsetX - 1;

    var numX = tilePoint.x - offsetX;
    var numY = -tilePoint.y + offsetY;

    zoom = zoom + 1;
    var x = (numX + "").replace("-", "M");
    var y = (numY + "").replace("-", "M");

    var urlArgs = {
      z: zoom,
      x: x,
      y: y
    };

    switch (this._type) {
      case 'ROADMAP':
        break;
      case 'SATELLITE':
        this._url = "http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&udt=20150601";
        break;
      case 'HYBRID':
        this._url = "http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=039&udt=20140314";
        break;
    }

    return L.Util.template(this._url, L.extend(urlArgs, this.options, {
      s: this._getSubdomain(tilePoint)
    }));
  }
});

L.baiduLayer = function(key, options) {
  return new L.BaiduLayer(key, options);
};