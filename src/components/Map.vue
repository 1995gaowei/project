<template>
  <div>
    <div>
      <Select v-model="activeKey" style="width: 400px;">
        <Option v-for="searchKey in searchKeys" :value="searchKey" :key="searchKey">{{ searchKey }}</Option>
      </Select>
      <Button type="primary" @click="search()" icon="search"> Search </Button>
    </div>
    <div id="map">map is here</div>
  </div>
</template>

<script>
  export default {
    name: 'map',
    data: function () {
      return {
        searchKeys: ['python', 'java', 'scala', 'lol', 'James', 'Kobe', 'Patriots', 'Rodgers', 'Allen', 'job'],
        activeKey: 'java',
        map: {}
      }
    },
    methods: {
      initMap() {
        this.updateMap()
      },
      search() {
        console.log(this.activeKey);
        // document.body.getElementsByTagName('script')[2].remove();
        // document.body.getElementsByTagName('script')[1].remove();

        // this.loadScript("http://localhost:3000/static/map.js")
        // this.loadScript("http://localhost:3000/static/map.js")
        this.updateMap();
      },
      updateMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: new google.maps.LatLng(2.8, -187.3),
//          mapTypeId: 'terrain'

          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]

        });

        $.get('http://flask3-dev.us-east-1.elasticbeanstalk.com/search/' + this.activeKey)
          .done(res => {
            console.log(res);
            var infowindow = new google.maps.InfoWindow({
              maxWidth: 250
            });
            res.forEach(val => {
              var latLng = new google.maps.LatLng(val.lat, val.long);

              var bluePoint = {
                url: 'https://c1.staticflickr.com/5/4509/37805505292_0df6f6ab56_o.png',
                size: new google.maps.Size(20,20),
              };

              var marker = new google.maps.Marker({
                position: latLng,
                icon: bluePoint,
// {
//                  path: google.maps.SymbolPath.CIRCLE,
//                  fillColor: 'yellow',
//                  scale: 1
//                },
                map: this.map
              });
              marker.addListener('click', function () {
                infowindow.open(map, marker);
                infowindow.setContent("<p>" + val.time + "    " + val.author + "</p>" + val.text);
              });
            })
          });
      }
      // loadScript(url, callback) {
      // var script = document.createElement("script");
      // script.type = "text/javascript";
      // // if (typeof(callback) != "undefined") {
      // //   if (script.readyState) {
      // //     script.onreadystatechange = function () {
      // //       if (script.readyState == "loaded" || script.readyState == "complete") {
      // //         script.onreadystatechange = null;
      // //         callback();
      // //       }
      // //     };
      // //   } else {
      // //     script.onload = function () {
      // //       callback();
      // //     };
      // //   }
      // // }
      // script.src = url;
      // document.body.appendChild(script);
      //   }
    },
    mounted() {

      this.updateMap();
      //   this.loadScript("http://localhost:3000/static/map.js");
      //   this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDK5vnss5QrWksNKv0PIzsaaRa_8skvj8s&callback=initMap&language=en");
    }
  }
</script>

<style scoped>
  #map {
    height: 500px;
    margin-bottom: 20px;
  }
</style>
