<template>
    <div>
        <Row>
            <Col span="14">
                <div id="map">map is here</div>
                <div class="jobs">
                    <div class="job" v-for="(job, idx) in jobs" :key="idx" @click="changeCity(job)">
                        <Card>
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
            jobs: [{"name":"Java Engineer","company":"eBay","city":"Miami","state":"CA","link":"https://www.linkedin.com/jobs/view/414170965/","description":"Are you an experienced Front End Developer with strong JavaScript skills looking to join a Leader in the Digital Music Arena?","skill":"Java,Scala"},{"name":"Java Engineer","company":"eBay","city":"Milwaukee","state":"CA","link":"https://www.linkedin.com/jobs/view/414170965/","description":"Are you an experienced Front End Developer with strong JavaScript skills looking to join a Leader in the Digital Music Arena?","skill":"Java,Scala"},{"name":"Java Engineer","company":"eBay","city":"San Antonio","state":"CA","link":"https://www.linkedin.com/jobs/view/414170965/","description":"Are you an experienced Front End Developer with strong JavaScript skills looking to join a Leader in the Digital Music Arena?","skill":"Java,Scala"},{"name":"Java Engineer","company":"eBay","city":"Columbus","state":"CA","link":"https://www.linkedin.com/jobs/view/414170965/","description":"Are you an experienced Front End Developer with strong JavaScript skills looking to join a Leader in the Digital Music Arena?","skill":"Java,Scala"},],
            NewYork: {"name":"New York","state":"NY","cuisine":4.43,"healthCare":63.59,"pollution":56.89,"climate":81.13,"costOfLiving":100.0,"crime":44.81,"traffic":177.02,"femaleRatio":52.0,"education":89.0}
        }
    },
    methods: {
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