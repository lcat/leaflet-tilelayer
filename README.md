收集国内外leaflet瓦片图（tileLayer），包括：

- 百度 （普通地图，卫星地图）
- 高德 （普通地图，卫星地图）
- 腾讯 （普通地图，卫星地图，地形图）
- 天地 （普通地图，卫星地图，地形图）
- Bing （普通地图，卫星地图） -> 注: 需要申请key
- Google （普通地图，卫星地图）
- GeoQ （普通地图，灰色底图）
- [openstreetmap](https://www.openstreetmap.org/)
- [Foursquare](https://foursquare.com/)

百度、bing、腾讯地图的tileLayer需要解析，所以单独抽离出三个文件扩展方法。

leaflet代码很不错，建议阅读

