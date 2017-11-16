// Google Map javascript
function initMap() {
    var coord = {lat: 38.252792, lng: -85.707061};
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: coord,
        scrollwheel: false,
        zoom: 15
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });
    //Resize Function
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
    google.maps.event.addDomListener(window, 'load', initialize);
}
