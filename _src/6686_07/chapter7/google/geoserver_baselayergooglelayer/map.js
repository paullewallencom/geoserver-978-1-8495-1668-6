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
  
    //add all the custom overlays we want.
    var overlayMaps =[
    {
        // Google Roads layer
        getTileUrl: function(coord, z) {
            var x = coord.x % (1 << z);
            var y = coord.y;
            // return "http://mt1.googleapis.com/vt?lyrs=m@159000000&src=apiv3&hl=en-US&s=Gal&style=api|smartmaps&x=" + x + "&y=" + y + "&z=" + z;
            return "http://mt0.google.com/vt/v=apt.116&hl=en-US&x="
            + x + "&y=" + y + "&z=" + z + "&src=apiv3&s=G&lyrs=r&apistyle=s.t:33|p.v:off&apistyle=s.t:49|s.e:l|p.v:on|p.l:50|p.s:24,s.t:5|p.v:off,s.t:6|p.v:off,s.t:1|p.v:off,s.t:5|p.v:off,s.t:2|p.v:off"
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: false,
        maxZoom: 18,
        name: "Roads",
        alt: "Custom Roads"
    }
    ];

    //add all overlays to the map
    for (i=0; i<overlayMaps.length; i++){
        var overlayMap = new google.maps.ImageMapType(overlayMaps[i]);
        map.overlayMapTypes.push(overlayMap);
        map.overlayMapTypes.setAt(overlayMaps[i],overlayMap);
    }
} //end init
  
