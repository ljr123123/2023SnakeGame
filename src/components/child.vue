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
    background-image: linear-gradient(to bottom right, red , yellow);;
}
.snake-body{
    background:#00000050;
}
.block{
    background:#000000;
}
.prop-1{
    background: greenyellow;
}
.prop-2{
    background:purple;
}
.food-one{
    background:blue;
}
.food-two{
    background: yellow;
}
</style>