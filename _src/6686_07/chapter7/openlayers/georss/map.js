var map, rss;

function mapinitialize() {

    map = new OpenLayers.Map('map', {
        maxResolution:'auto',
        projection: 'EPSG:4326'
    });
    layer = new OpenLayers.Layer.WMS(
        CountyLayer, GEOSERVERBASE + "/geoserver/tiger/wms",
        {
            LAYERS: CountyLayer,
            format: 'image/png'
        }
        );
    map.addLayer(layer);
    map.zoomTo(9);
    map.panTo(new OpenLayers.LonLat(-73.99, 40.75)); 
    addGeoRSS();
}

function addGeoRSS() {
      
    var value = GEOSERVERBASE + '/geoserver/tiger/wms?service=WMS&version=1.1.0&request=GetMap&layers=tiger:poi&styles=&bbox=-74.0118315772888,40.70754683896324,-74.00153046439813,40.719885123828675&width=427&height=512&srs=EPSG:4326&format=application%2Frss%2Bxml';
    var georss = new OpenLayers.Layer.GeoRSS('Tiger POI', value);
    map.addLayer(georss);
}
