<template>
    <div class="user">
        <Row  type="flex" align="top" class="item">
            <Col :span="6" offset="4">
                <div class="title">Name</div>
            </Col>
            <Col :span="8" offset="2">
                <div class="value">{{ user.name }}</div>
            </Col>
        </Row>

        <Row  type="flex" align="top" class="item">
            <Col :span="6" offset="4">
                <div class="title">Address</div>
            </Col>
            <Col :span="8" offset="2">
                <div class="value">{{ user.address }}</div>
            </Col>
        </Row>

        <Row  type="flex" align="top" class="item">
            <Col :span="6" offset="4">
                <div class="title">Skills</div>
            </Col>
            <Col :span="8" offset="2">
                <div  v-for="item in user.skill" :key="item">
                    <Tag type="dot" color="blue">{{ item }}</Tag>
                </div>
            </Col>
        </Row>
        
        <Row  type="flex" align="top" class="item">
            <Col :span="6" offset="4">
                <div class="title">Preferences</div>
            </Col>
            <Col :span="8" offset="2">
                <div  v-for="item in user.preferences" :key="item">
                    <Tag type="dot" color="blue">{{ item }}</Tag>
                </div>
            </Col>
        </Row>
        
        <Row  type="flex" align="top" class="item">
            <Col :span="6" offset="4">
                <div class="title">OtherPref</div>
            </Col>
            <Col :span="8" offset="2">
                <div  v-for="item in user.otherPref" :key="item">
                    <Tag type="dot" color="blue">{{ item }}</Tag>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'user',
    data: function() {	
        return {
            user: {"preferences":["crime","traffic","pollution","climate"],"name":"Reggie Yang","otherPref":["education","cost_of_living","cuisine","female-male-ratio","health-care"],"address":"New York","skill":["Scala","Java"]}
        }
    },
    methods: {}
}
</script>

<style scoped>
.user {
    text-align: left;
}

.item {
    margin-bottom: 20px;
}

.title {
    text-align: right;
    font-size: 20px;
    font-weight: bold;
}

.value {
    font-size: 20px;
    font-weight: bold;
}
</style>