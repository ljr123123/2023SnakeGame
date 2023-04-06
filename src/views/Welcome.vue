<template>
    <div class="welcome">
        <p class="game-title">贪吃蛇大作战</p>
        <img src="../assets/snake.svg" class="snake"/>
        <button class="game-begin" @click="startPlay()">开始游戏</button>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

function startPlay(){
    router.push({path:"/GamePage"});
}

</script>
<style scoped>
.welcome{
    height:50%;
    width:80%;
    position: fixed;
    top:20%;
    left:10%;
    box-shadow: 0 0 5px rgba(135, 207, 235, 0.5);
    border-radius:10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.game-title{
    margin:30px;
    font-size:20px;
    font-weight: bold;
    margin-top:40px;
    color:rgba(135, 207, 235, 1);
}
.snake{
    height:80px;
    margin:30px;
}
.game-begin{
    margin:30px;
    height:40px;
    width:100px;
    font-size:15px;
    font-weight: bold;
    background:rgba(135, 207, 235, 1);
    color:#FFFFFF;
    border:0;
    border-radius:5px;
    box-shadow: 0 0 8px rgba(135, 207, 235, 0.5);
}
</style>