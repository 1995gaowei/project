//init map
console.log(document.getElementById('map'))
var citymap = {
  dallas: {
    center: {lat: 32.7833333, lng: -96.8},
    population: 137,
    relation: 50
  },
  sanantonio: {
    center: {lat: 29.4238889, lng: -98.4933333},
    population: 245,
    relation: 120
  },
  miami: {
    center: {lat: 25.7738889, lng: -80.1938889},
    population: 82,
    relation: 170
  },
  milwaukee: {
    center: {lat: 43.0388889, lng: -87.9063889},
    population: 127,
    relation: 50
  },
  saltlakecity: {
    center: {lat:  40.7608333, lng: -111.8902778},
    population: 231,
    relation: 120
  },
  oklahomacity: {
    center: {lat: 35.4675, lng: -97.5161111},
    population: 23,
    relation: 170
  },
  jackson: {
    center: {lat: 32.2986111, lng: -90.1847222},
    population: 65,
    relation: 50
  },
  columbus: {
    center: {lat: 39.9611111, lng:  -82.9988889},
    population: 199,
    relation: 120
  }
};

  function initMap() {
    // Create the map.
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {lat: 37.090, lng: -95.712},
      mapTypeId: 'terrain'
    });

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    for (var city in citymap) {
      // Add the circle for this city to the map.
      var cityCircle = new google.maps.Circle({
        strokeColor: '#FFFF00',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FFFF00',
        fillOpacity: 0.5,
        map: map,
        center: citymap[city].center,
        radius: Math.sqrt(citymap[city].population) * 14000
      });
      if (citymap[city].population < 100) {
        cityCircle.strokeColor = '#669900'
        cityCircle.fillColor = '#669900'
      }
      else if (citymap[city].population >= 100 && citymap[city].population < 150) {
        cityCircle.strokeColor = '#66CC00'
        cityCircle.fillColor = '#66CC00'
      }
      else {
        cityCircle.strokeColor = '#00FF00'
        cityCircle.fillColor = '#00FF00'
      }
    }
  }
