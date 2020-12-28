var map;
 
function mapinitialize() {
  
   var wmsparams = [
    "REQUEST=GetMap",
    "SERVICE=WMS",
    "VERSION=1.1.1",
    "BGCOLOR=0xFFFFFF",
    "TRANSPARENT=TRUE",
    "SRS=EPSG:3857",
    "WIDTH=255",
    "HEIGHT=255",
    "format=image/png"
    ];
   
    //custom base layer options
    var maptypeOptions = {
        getTileUrl: function(coord, zoom)
        {
            var lULP = new google.maps.Point(coord.x*256,(coord.y+1)*256);
            var lLRP = new google.maps.Point((coord.x+1)*256,coord.y*256);

            var projectionMap = new MercatorProjection();

            var lULg = projectionMap.fromDivPixelToSphericalMercator(lULP, zoom);
            var lLRg  = projectionMap.fromDivPixelToSphericalMercator(lLRP, zoom);

            var lUL_Latitude = lULg.y;
            var lUL_Longitude = lULg.x;
            var lLR_Latitude = lLRg.y;
            var lLR_Longitude = lLRg.x;

            if (lLR_Longitude < lUL_Longitude){
              lLR_Longitude = Math.abs(lLR_Longitude);
            }
            return GEOSERVERBASE + "/geoserver/wms?" + wmsparams.join("&") + "&layers=" + CountyLayer + "&bbox=" + lUL_Longitude + "," + lUL_Latitude + "," + lLR_Longitude + "," + lLR_Latitude;

        },
        tileSize: new google.maps.Size(256, 256),
        isPng: true,
        maxZoom: 15,
        minZoom: 4,
        alt: ''
    };
  
    //Create a custom map with base layer options
    var custommap = new google.maps.ImageMapType(maptypeOptions);

  
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(37.609066626725,-97.423977848479),
        mapTypeControl:false,
        draggableCursor: 'crosshair',
        mapTypeId:'mapid',
        backgroundColor: "#badbff"
    }
  
    //Create a google map using custom base layer
    map = new google.maps.Map(document.getElementById("map"),mapOptions);
    map.mapTypes.set('mapid', custommap);
} //end init
