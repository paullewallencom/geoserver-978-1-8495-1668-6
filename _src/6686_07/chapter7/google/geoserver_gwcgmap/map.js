var map;
 
function mapinitialize() {
   
    //custom base layer options
    var maptypeOptions = {
        getTileUrl: function(coord, zoom) {
            return GEOSERVERBASE + "/geoserver/gwc/service/gmaps" +
            "?layers=" + CountyLayer + "&zoom=" + zoom + "&x=" + coord.x + "&y=" + coord.y + "&format=image/png";
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
