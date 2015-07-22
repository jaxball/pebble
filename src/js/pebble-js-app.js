var locationOptions = {timeout: 10000, maximumAge: 60000}; 

function fetch_google_data(pos) {
   var req = new XMLHttpRequest(),
     version = Date.now(),
     latitude = pos.coords.latitude,
     // console.log(latitude);
     longitude = pos.coords.longitude;
     console.log(longitude);
     console.log(latitude);

    req.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude, + '&result_type=locality' + '&key=AIzaSyCuPyt2ZsgAWIsSCdpuzZBQMrFK64KdBpE', true);

    req.onload = function(e) {
      // if (request.status == 200) {
        console.log("request is successful!");
        var response = JSON.parse(req.responseText);
        if (response == '200' ) {
          var address = response.results.address_components[0];
          console.log("Yes! Address is " + address);
          return address.long_name;
        }
      // } else {
      //     console.log("Failed to retrieve data from Google.");
      //   }
    }
    console.log("but it reaches here");
}

function fetch_location_data(pos) {

  var address = fetch_google_data(pos);
  console.log("this is add: " + address);
  // var address;
  //  var request = new XMLHttpRequest(),
  //    version = Date.now(),
  //    latitude = pos.coords.latitude,
  //    console.log(latitude);
  //    longitude = pos.coords.longitude;
  //    console.log(longitude);

  // request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude, + '&result_type=sublocality' + '&key=AIzaSyCuPyt2ZsgAWIsSCdpuzZBQMrFK64KdBpE', true);

  // request.onload = function(e) {
  //   if(request.readyState == 4 && request.status == 200) {
  //     if (request.status == 200) {
  //       var res = JSON.parse(request.responseText);

  //       if (res && res.meta.code == '200' && res.results) {
  //         address = res.results.address_components[0];
  //         // Pebble.sendAppMessage({ sublocality: address.long_name });
  //       }
  //     }
  //     else { console.log('Error'); }
  //   }
  // }


  // request.send(null);

  var req = new XMLHttpRequest(),
      version = Date.now(),
      clientId = 'YAWGJ5IETYX0RGTZSOGQM52OAUI0L2CLUASDYJXSCOHXTIYD',
      clientSecret = 'IOSMA1PTF222NTDKZZWCC2LDCYRPDKQVRIODQD3UAC2TGW3E',
      latitude = pos.coords.latitude,
      longitude = pos.coords.longitude;
 
  req.open('GET', 'https://api.foursquare.com/v2/venues/search?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + version + '&ll=' + latitude + ',' + longitude + '&query=hotel', true);
   
  req.onload = function(e) {
    if (req.readyState == 4 && req.status == 200) {
      if (req.status == 200) {
        var response = JSON.parse(req.responseText);
 
        if (response && response.meta.code == '200' && response.response) {
          var venue = response.response.venues[0];
          var venue2 = response.response.venues[1];
          var venue3 = response.response.venues[2];
          
  //         var latlng = new google.maps.LatLng(latitude, longitude);
  // geocoder.geocode({'latLng': latlng}, function(results, status) {
  //   if (status == google.maps.GeocoderStatus.OK) {
  //     if (results[0]) {
  //       var components=results[0].address_components;

  //       for (var component=0;component<(components.length);component++){
  //           if(components[component].types[0]=="administrative_area_level_1"){
  //               var admin_area=components[component].long_name;
  //           }
  //           if(components[component].types[0]=="country"){
  //               var country=components[component].long_name;
  //           }

  //           if(components[component].types[0]=="postal_code"){
  //               var postal_code=components[component].long_name;
  //           }
  //       }
  //     }
  //   }
  // });
 
          // Pebble.sendAppMessage({location: venue.location.address + ', ' + venue.location.city});
          Pebble.sendAppMessage({ 'location': venue.name, 'sublocality': venue.name }, 
            function(e) {
              console.log('Send successful!');
            },
            function(e) {
              console.log('Send FAILED!');
            }
          );
        }
      } else {
        console.log('Error');
      }
    }
  }
 
  req.send(null);
}
 
function fetch_location_error(err) {
  console.log(err);
  Pebble.sendAppMessage({location: 'Unable to retrieve location'});
}
 
Pebble.addEventListener('ready', function(e) {
  locationWatcher = window.navigator.geolocation.watchPosition(fetch_location_data, fetch_location_error, locationOptions);

});