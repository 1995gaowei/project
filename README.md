# project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

API Example

User:

    {"preferences":["crime","traffic","pollution","climate"],"name":"Reggie Yang","otherPref":["education","cost_of_living","cuisine","female-male-ratio","health-care"],"address":"New York","skill":["Scala","Java"]}
    
第一个界面就用这个：

具体字段：用户姓名，技能，地址，主要看重点，次要看重点。展示：用户姓名：xxx，技能：xxx，主要看重点：分行展示，次要看重点：剩下几个，分行展示


City:

    {"name":"Dallas","state":"TX","cuisine":4.19,"healthCare":66.13,"pollution":44.8,"climate":82.78,"costOfLiving":67.44,"crime":44.76,"traffic":182.29,"femaleRatio":52.0,"education":55.0}
    
每个城市的名字，所在州。后面的字段就是各种指标，全都用于绘图。图上是对比型的柱状图。
