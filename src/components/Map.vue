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
        activeKey: 'scala',
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
          zoom: 2.5,
          center: new google.maps.LatLng(2.8, -187.3),
          mapTypeId: 'terrain'
        });

        $.get('http://flask3-dev.us-east-1.elasticbeanstalk.com/search/' + this.activeKey)
          .done(res => {
            console.log(res);
            var infowindow = new google.maps.InfoWindow();
            res.forEach(val => {
              var latLng = new google.maps.LatLng(val.lan, val.long);
              var marker = new google.maps.Marker({
                position: latLng,
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
