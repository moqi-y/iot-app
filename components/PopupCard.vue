<template>
    <view class="popup-card" @tap="$emit('tapCard', menuItem)">
        <view class="card-icon">
            <image class="card-icon-img" :src="menuItem.icon"></image>
        </view>
        <view class="card-name">
            {{ menuItem.name }}
        </view>
    </view>
</template>

<script setup>
const props = defineProps({
    menuItem:{}
})
</script>

<style scoped>
.popup-card {
    width: 95%;
    height: 100px;
    background-color: #f5f5f5;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
}

.card-icon{
    width: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-name{
    width: 60%;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.card-icon-img {
    width: 60px;
    height: 60px;
}
</style>