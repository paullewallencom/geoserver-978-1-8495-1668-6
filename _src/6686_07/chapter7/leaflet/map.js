var map;

function mapinitialize() {
                        
    counties = new L.TileLayer.WMS(GEOSERVERBASE + "/geoserver/tiger/wms",
    {
        layers: "tiger:tl_2011_us_county",
        format: 'image/png',
        transparent: true,
        attribution: ""
    });
    
    rivers = new L.TileLayer.WMS(GEOSERVERBASE + "/geoserver/NaturalEarth/wms",
    {
        layers: "NaturalEarth:50m-rivers-lake-centerlines",
        format: 'image/png',
        transparent: true,
        attribution: ""
    });

    populatedplaces = new L.TileLayer.WMS(GEOSERVERBASE + "/geoserver/NaturalEarth/wms",
    {
        layers: "NaturalEarth:ne_50m_populated_places",
        format: 'image/png',
        transparent: true,
        attribution: ""
    });

    map = new L.Map('map',
        {
            center: new L.LatLng(30.609, -87.424),
            zoom: 6,
            layers: [counties,rivers,populatedplaces],
            zoomControl: true
        });
}
