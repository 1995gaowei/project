<template>
    <div>
        <Row>
            <Col span="14">
                <div id="map">map is here</div>
                <div class="jobs">
                    <div class="job" v-for="(job, idx) in jobs" :key="idx" @click="changeCity(job)">
                        <Card>
                            <Button type="ghost" shape="circle" style="float: right;" v-if="job.status" @click.stop="toggleFollow(job)">Follow</Button>
                            <Button type="success" shape="circle" style="float: right;" v-else @click.stop= "toggleFollow(job)">Following</Button>
                            <p class="name">{{  job.name }}</p>
                            <p class="company">{{  job.company }}</p>
                            <p class="address">{{  job.city }}, {{ job.state }}</p>
                            <p class="description">{{ job.description }}</p>
                        </Card>
                    </div>
                </div>
            </Col>
            <Col span="10">
                <Affix :offset-top="80">
                    <div id="chart" style="height: 550px;"></div>
                </Affix>
            </Col>
        </Row>
    </div>
</template>

<script>
import echarts from 'echarts'

export default {
    name: 'jobs',
    data: function() {	
        return {
            jobs: [{status: true, "name":"Java Engineer","company":"eBay","city":"Miami","state":"CA","link":"https://www.linkedin.com/jobs/view/414170965/","description":"Are you an experienced Front End Developer with strong JavaScript skills looking to join a Leader in the Digital Music Arena?","skill":"Java,Scala"},{status: true, "name":"Java Engineer","company":"eBay","city":"Milwaukee","state":"CA","link":"https://www.linkedin.com/jobs/view/414170965/","description":"Are you an experienced Front End Developer with strong JavaScript skills looking to join a Leader in the Digital Music Arena?","skill":"Java,Scala"},{status: true, "name":"Java Engineer","company":"eBay","city":"San Antonio","state":"CA","link":"https://www.linkedin.com/jobs/view/414170965/","description":"Are you an experienced Front End Developer with strong JavaScript skills looking to join a Leader in the Digital Music Arena?","skill":"Java,Scala"},{status: true, "name":"Java Engineer","company":"eBay","city":"Columbus","state":"CA","link":"https://www.linkedin.com/jobs/view/414170965/","description":"Are you an experienced Front End Developer with strong JavaScript skills looking to join a Leader in the Digital Music Arena?","skill":"Java,Scala"},],
            NewYork: {"name":"New York","state":"NY","cuisine":4.43,"healthCare":63.59,"pollution":56.89,"climate":81.13,"costOfLiving":100.0,"crime":44.81,"traffic":177.02,"femaleRatio":52.0,"education":89.0}
        }
    },
    methods: {
        toggleFollow(job) {
            job.status = !job.status;
        },
        changeCity(job) {
            // this.chart = echarts.getInstanceByDom(document.getElementById('chart'));
            this.retrieveData(job.city);
        },
        retrieveData(city) {
            $.get('/static/data/'+city+'.json').done((res) => {
                var option = {
                    legend: {
                        data: ['New York', city]
                    },
                    series: [
                        {
                            name: 'New York',
                            type: 'bar',
                            data: [89.0, 52.0, 177.02, 44.81, 100.0, 81.13, 56.89, 63.59, 4.43]
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
    mounted() {
        //init map
        var citymap = {
        dallas: {
          center: {lat: 32.7833333, lng: -96.8},
          population: 137
        },
        sanantonio: {
          center: {lat: 29.4238889, lng: -98.4933333},
          population: 245
        },
        miami: {
          center: {lat: 25.7738889, lng: -80.1938889},
          population: 82
        },
        milwaukee: {
          center: {lat: 43.0388889, lng: -87.9063889},
          population: 127
        },
        saltlakecity: {
          center: {lat:  40.7608333, lng: -111.8902778},
          population: 231
        },
        oklahomacity: {
          center: {lat: 35.4675, lng: -97.5161111},
          population: 23
        },        
        jackson: {
          center: {lat: 32.2986111, lng: -90.1847222},
          population: 65
        },        
        columbus: {
          center: {lat: 39.9611111, lng:  -82.9988889},
          population: 199
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
            fillOpacity: 0.35,
            map: map,
            center: citymap[city].center,
            radius: Math.sqrt(citymap[city].population) * 14000
          });
          // alert(citymap[city].population)
          if (citymap[city].population < 100) {
            cityCircle.strokeColor = '#FFCC00'
            cityCircle.fillColor = '#FFCC00'
          }
          else if (citymap[city].population > 150) {
            cityCircle.strokeColor = '#FF6600'
            cityCircle.fillColor = '#FF6600'
          }
          else {
            cityCircle.strokeColor = '#FF0000'
            cityCircle.fillColor = '#FF0000'
          }
          // alert(cityCircle.strokeColor)
        }
      }

        this.chart = echarts.init(document.getElementById("chart"));
        var option =  {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['New York', '']
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
                data: ["education", "femaleRatio", "traffic", "crime", "costOfLiving", "climate", "pollution", "healthCare", "cuisine"]
            },
            series: [
                {
                    name: 'New York',
                    type: 'bar',
                    data: [89.0, 52.0, 177.02, 44.81, 100.0, 81.13, 56.89, 63.59, 4.43],
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
    cursor: pointer;
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
</style>