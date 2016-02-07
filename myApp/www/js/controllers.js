angular.module('starter.controllers', [])

.controller('planWalkCtrl', function($scope) {
    $scope.home = function(){
       if(!!navigator.geolocation) {
           var mapOptions = {
                div: '#map',
                zoom: 1,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        
        $scope.map = new GMaps(mapOptions);
    
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var marker = new google.maps.Marker({
                position: geolocate,
                map: $scope.map.map
            });

            geocoder.geocode({'location': geolocate}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var table = document.getElementById('walkingRoute');
                        var row = table.insertRow(1);

                        var start = row.insertCell(0);
                        start.innerHTML = results[0].formatted_address;
                      } 
                    }
            });
        });
        
        } else {
            document.getElementById('google_canvas').innerHTML = 'No Geolocation Support.';
        }
    };
    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow;
    var coords = [];
    var count = 0;
    var mapCount = 2;
    var mapOptions = {
        div: '#map',
        zoom: 15,
        center: {lat: 53.2167, lng: 6.5667},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    $scope.map = new GMaps(mapOptions);
    GMaps.on('click', $scope.map, function(event) {
        var marker = new google.maps.Marker({
            position: event.latLng,
            map: $scope.map.map
        });
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();


        coords[count] = { lat: lat, lng: lng };
        count++;
        
        if(coords.length == 1) {
            geocoder.geocode({'location': event.latLng}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var table = document.getElementById('walkingRoute');
                        var row = table.insertRow(1);

                        var start = row.insertCell(0);
                        start.innerHTML = results[0].formatted_address;
                      } 
                    }
            });
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng( lat, lng),
            map: $scope.map.map,
            title: 'Start of the walk'
        });
        } else {
            for(var i = 0; i < coords.length - 1; i++) {
                $scope.map.drawRoute({
                    origin: [coords[i].lat, coords[i].lng],
                    destination: [coords[i+1].lat, coords[i+1].lng],
                    waypoints: [],
                    travelMode: 'walking'
                });
            }
            geocoder.geocode({'location': event.latLng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            var table = document.getElementById('walkingRoute');
                            var row = table.insertRow(mapCount);
                            mapCount++;
                            var cell1 = row.insertCell(0);

                            cell1.innerHTML = results[0].formatted_address;
                          } 
                        } 
                  });
        }
    });

})


.controller('AltCtrl', function($scope) {})

.controller('AltDetailCtrl', function($scope, $stateParams) {})

.controller('AccountCtrl', function($scope) {})

.controller('AppCtrl', function($scope) {
    $scope.init = function() {
        
    }
})
