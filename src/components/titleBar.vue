<template>
    <div class="title-bar">
        <img src="../assets/more.svg" class="more" @click="$emit('more')"/>
    </div>
</template>
<script setup>

</script>
<style scoped>
.more{
    height:50px;
    margin:10px;
}
.title-bar{
    width:100%;
    display: flex;
    justify-content: flex-end;
}
</style>