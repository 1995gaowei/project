<template>
  <div>
    <Row>
      <Col span="14">
      <div id="map">map is here</div>
      <div class="jobs">
        <div class="job" v-for="(job, idx) in jobs" :key="idx" @click="changeCity(job)">
          <Card>
            <Button type="ghost" shape="circle" style="float: right;" v-if="job.status" @click.stop="toggleFollow(job)">
              Follow
            </Button>
            <Button type="success" shape="circle" style="float: right;" v-else @click.stop="toggleFollow(job)">
              Following
            </Button>
            <a class="name" :href="job.link" target="_blank">{{ job.name }}</a>
            <p class="company">{{ job.company }}</p>
            <p class="address">{{ job.city }}, {{ job.state }}</p>
            <p class="description">{{ job.description }}</p>
          </Card>
        </div>
      </div>
      </Col>
      <Col span="10">
        <Affix :offset-top="80">
            <div id="chart" style="height: 550px;"></div>
            <div class="followCity">
                <Button type="ghost" shape="circle" icon="star" v-if="followCity" @click="followCity = false">{{ activeCity }}</Button>
                <Button type="success" shape="circle" icon="star" v-else @click="followCity = true">{{ activeCity }}</Button>
            </div>
        </Affix>
      </Col>
    </Row>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'jobs',
    data: function () {
      return {
        jobs: [],
        activeCity: 'NewYork',
        followCity: true
      }
    },
    methods: {
      toggleFollow(job) {
        job.status = !job.status;
      },
      changeCity(job) {
        // this.chart = echarts.getInstanceByDom(document.getElementById('chart'));
        this.retrieveData(job.city);
        this.activeCity = job.city;
        this.followCity = true;
      },
      retrieveData(city) {
        $.get('/static/data/' + city + '.json').done((res) => {
          var option = {
            legend: {
              data: ['New York', city]
            },
            series: [
              {
                name: 'New York',
                type: 'bar',
                data: [89.0, 52.0, 177.02, 44.81, 100.0, 81.13, 56.89, 63.59, 88.6]
              },
              {
                name: city,
                type: 'bar',
                data: [res.education, res.femaleRatio, res.traffic, res.crime, res.costOfLiving, res.climate, res.pollution, res.healthCare, res.cuisine]
              }
            ]
          }
          this.chart.setOption(option);
        })
      }
    },
    created() {
      $.get('/static/data/jobs.json').done((res) => {
        res.forEach((val) => {
          val.status = true;
        });
        this.jobs = res;
      })
    },
    mounted() {


      function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (typeof(callback) != "undefined") {
          if (script.readyState) {
            script.onreadystatechange = function () {
              if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
              }
            };
          } else {
            script.onload = function () {
              callback();
            };
          }
        }
        script.src = url;
        document.body.appendChild(script);
      }

      loadScript("http://localhost:3000/static/map.js", function () {
      });
      loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDK5vnss5QrWksNKv0PIzsaaRa_8skvj8s&callback=initMap&language=en", function () {
      });

      this.chart = echarts.init(document.getElementById("chart"));
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['New York', ''],
          right: 20
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          // boundaryGap: ['5%', '5%']
        },
        yAxis: {
          type: 'category',
          data: ["Education", "Female Ratio", "Traffic", "Crime", "Cost of Living", "Climate", "Pollution", "Health Care", "Cuisine"]
        },
        series: [
          {
            name: 'New York',
            type: 'bar',
            data: [89.0, 52.0, 177.02, 44.81, 100.0, 81.13, 56.89, 63.59, 88.6],
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            }
          },
          {
            name: '',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            }
          }
        ]
      };
      this.chart.setOption(option);
    }
  }
</script>

<style scoped>
  #map {
    height: 300px;
    margin-bottom: 20px;
  }

  .job {
    text-align: left;
    margin-bottom: 10px;
  }

  .job .name {
    font-size: 18px;
    font-weight: bold;
    color: #2d8cf0;
  }

  .job .company {
    font-size: 16px;
  }

  .job .address {
    font-size: 15px;
    color: #aaa;
  }

  .job .description {
    font-size: 15px;
    margin-top: 5px
  }

  .followCity {
    position: absolute;
    top: 0px;
    left: 20px;
  }
</style>
