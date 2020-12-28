var map;
var geocoder;
var overlay;

function mapinitialize() {
  
    //add all the overlays we want
    var overlayMaps =[
    {
        // Google Roads layer
        getTileUrl: function(coord, z) {
            var x = coord.x % (1 << z);
            var y = coord.y;
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
  
    //need a overlay object to get the object being clicked on using the click listener. this is a google api v3 requirement
    overlay = new google.maps.OverlayView();
    overlay.draw = function() {};
    overlay.setMap(map);
    //end overlay object
   
    //add all overlays to the map
    for (i=0; i<overlayMaps.length; i++){
        var overlayMap = new google.maps.ImageMapType(overlayMaps[i]);
        map.overlayMapTypes.push(overlayMap);
        map.overlayMapTypes.setAt(overlayMaps[i],overlayMap);
    }
    
    //click listener
    google.maps.event.addListener(map, 'click',
        function(event) {
            var point = overlay.getProjection().fromLatLngToContainerPixel(event.latLng);
            alert("latlng: " + event.latLng + "\npoint: " + point);
        }
        );
}
