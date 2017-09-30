<template>
    <div class="user">
        <Row  type="flex" align="top" class="item">
            <Col :span="6" offset="3">
                <div class="title">Name</div>
            </Col>
            <Col :span="8" offset="2">
                <div class="value">{{ user.name }}</div>
            </Col>
        </Row>

        <Row  type="flex" align="top" class="item">
            <Col :span="6" offset="3">
                <div class="title">Address</div>
            </Col>
            <Col :span="8" offset="2">
                <div class="value">{{ user.address }}</div>
            </Col>
        </Row>

        <Row  type="flex" align="top" class="item">
            <Col :span="6" offset="3">
                <div class="title">Skills</div>
            </Col>
            <Col :span="8" offset="2">
                <div>
                    <Tag type="dot" color="green"  v-for="item in user.skill" :key="item">{{ item }}</Tag>
                    <Button type="dashed" icon="plus-round"></Button>
                </div>
            </Col>
        </Row>
        
        <Row  type="flex" align="top" class="item">
            <Col :span="6" offset="3">
                <div class="title">Preferences</div>
            </Col>
            <Col :span="8" offset="2">
                <div>
                    <Tag type="dot" color="blue"  v-for="item in user.preferences" :key="item">{{ item }}</Tag>
                </div>
                <div style="margin-top: 20px;">
                    <Tag type="dot" color="blue"  v-for="item in user.otherPref" :key="item">{{ item }}</Tag>
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
            user: {}
        }
    },
    methods: {},
    created() {
        $.get('/static/data/user.json').done((res) => {
            this.user = res;
        })
    }
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
    font-size: 18px;
    font-weight: bold;
}

.value {
    font-size: 18px;
    font-weight: bold;
}
</style>