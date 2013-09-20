function MainCtrl($scope) {

  arrowClick = function() {
    var regex = /\d*/;
    var hite = $('#ah-header').css("height");
    if (regex.exec(hite) < 300) {
      $('#ah-header').animate({height: "300px", opacity: .8}, {duration: 400, queue: false});
      $('#nav-arrow').removeClass("icon-angle-down").addClass("icon-angle-up");
      $('#arrow-text').text("LESS");
    }
    else {
      $('#ah-header').animate({height: "110px", opacity: 1}, {duration: 400, queue: false});
      $('#nav-arrow').removeClass("icon-angle-up").addClass("icon-angle-down");
      $('#arrow-text').text("MORE");
    }
  }
}
function HomeCtrl($scope, $http) {

// Get recent tweets that contain @atlharvest and geo coordinates.
  $scope.tweets = [];
  $http({method: 'GET', url: 'api/index.php/tweets'}).
    success(function(data) {
      angular.forEach(data.statuses, function(value) {
        if (value.geo !== null) {
            //$scope.tweets.push({'text':value.text, 'screen_name':value.user.screen_name, 'profile_img':value.user.profile_image_url, 'geo':value.geo.coordinates});
              var infowindow = new google.maps.InfoWindow({
                  content: '<img src="' + value.user.profile_image_url + '"/> ' + value.user.screen_name + ": " + value.text
                  
              });
              var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(value.geo.coordinates[0], value.geo.coordinates[1]),
                  map: map
              });
              google.maps.event.addListener(marker, 'mouseover', function() {
                infowindow.open(map,marker);
              });
              google.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close(map,marker);
              });
        } 
      });
    }).
    error(function() {
      console.log('error getting Tweets.');
    });

//Get recent instagrams from user: atlharvest 
  $scope.instagrams = [];
  $http({method: 'GET', url: 'api/index.php/ahinstagram'}).
    success(function(retrieved) {
      angular.forEach(retrieved.data, function(value) {
        if (value.location !== null) {
            //$scope.instagrams.push({'lat':value.location.latitude, 'lng': value.location.longitude, 'place': value.location.name, 'link': value.link, 'img_url': value.images.thumbnail.url, 'caption': value.caption.text, 'user': value.caption.from.username});
              var infowindow = new google.maps.InfoWindow({
                  content: '<a href="' + value.link + '"><img src="' + value.images.thumbnail.url + '"/></a> ' + value.caption.text + '</br >Location: ' + value.location.name    
              });
              var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(value.location.latitude, value.location.longitude),
                  map: map
              });
              google.maps.event.addListener(marker, 'mouseover', function() {
                infowindow.open(map,marker);
              });
              google.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close(map,marker);
              });
        } 
      });
    }).
    error(function() {
      console.log('error getting Instagram.');
    });

  //Load map styling JSON and draw map
  var styles = $.ajax({
    url: "js/mapStyle.json",
    async: false,
    dataType: 'json' 
  });

  var mapStyle = JSON.parse(styles.responseText);

  // Draw Google Map
  var map;

  var location = new google.maps.LatLng(33.76, -84.4);
  var mapOptions = {
    zoom: 11,
    center: location,
    draggable: false,
    scrollwheel: false,
    mapTypeControl: false,
    panControl: false,
    scaleControl: false,
    streetViewControl: false,
    zoomControl: false,
    disableDoubleClickZoom: true,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, "id1"]
    },
    mapTypeId: "id1"
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var styledMapOptions = {
    name: 'Styled Map'
  };

  var customMapType = new google.maps.StyledMapType(mapStyle, styledMapOptions);
  map.mapTypes.set("id1", customMapType);

  //Marker at farm location
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(33.723786, -84.416220),
    map: map,
  });

  var imageBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(33.723786,-84.416220),
  new google.maps.LatLng(33.9,-84.2));
  
  var oldmap = new google.maps.GroundOverlay(
  'https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
  imageBounds);
  oldmap.setMap(map);

}

function LocalCtrl($scope) {

}

function SocialCtrl($scope) {

}

function GetInvolvedCtrl($scope) {

}