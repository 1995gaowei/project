<template>
    <Menu mode="horizontal" active-name="User" class="header" @on-select="selectNav">
        <MenuItem name="User">
            <Icon type="person"></Icon>
            Profile
        </MenuItem>
        <MenuItem name="Jobs">
            <Icon type="stats-bars"></Icon>
            Jobs
        </MenuItem>
    </Menu>
</template>

<script>
export default {
    name: 'header-nav',
    data: function() {	
        return {}
    },
    methods: {
        selectNav (name) {
            this.$router.push(name);
        },
    }
}
</script>

<style scoped>
.header {
    position: fixed;
    top: 0;
    width: 100%;
    padding-left: 10%;
}
</style>