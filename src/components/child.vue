<template>
    <div class="child" :class="{
        'snake-head':is_head, 
        'snake-body':is_body, 
        'prop-1':is_prop_one,
        'prop-2':is_prop_two,
        'block':is_block,
        'food-one':is_food_one,
        'food-two':is_food_two
    }">
    </div>
</template>
<script setup>

const props = defineProps(["is_head", "is_body", "is_prop_one", "is_prop_two", "is_block", "is_food_one", "is_food_two"])

</script>
<style scoped>
.child{
    height:15px;
    width:15px;
    background:rgba(135, 207, 235, 0.1);
    border:.5px #FFFFFF solid;
    font-size: 1px;
}
.snake-head{
    background-image: url("../assets/snake.svg");
    background-size: 100% 100%;
}
.snake-body{
    background:#00000050;
}
.block{
    background-image: url("../assets/block.svg");
    background-size: 100% 100%;
    background-color: #000000;
}
.prop-1{
    background-image: url("../assets/clock.svg");
    background-size: 100% 100%;
}
.prop-2{
    background-image: url("../assets/clear.svg");
    background-size: 100% 100%;
}
.food-one{
    background-image: url("../assets/star.svg");
    background-size: 100% 100%;
}
.food-two{
    background-image: url("../assets/plus.svg");
    background-size: 100% 100%;
}
</style>