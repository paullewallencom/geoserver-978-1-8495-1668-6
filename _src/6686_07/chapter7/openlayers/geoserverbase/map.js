var map;

function mapinitialize() {
    var bounds = new OpenLayers.Bounds(
        -180.0, -90.0, 180.0, 90.0
        );

    var options = {
        maxExtent: bounds,
        projection: 'EPSG:4326',
        units: 'meters'
    };
    map = new OpenLayers.Map('map', options);
            
    var countries = new OpenLayers.Layer.WMS(
        CountriesLayer, GEOSERVERBASE + '/geoserver/NaturalEarth/wms',
        {
            layers: CountriesLayer,
            format: 'image/png'
        }
        );
        
    map.addLayer(countries);

    map.zoomTo(4);
    map.panTo(new OpenLayers.LonLat(-95.0,40.0));
}
