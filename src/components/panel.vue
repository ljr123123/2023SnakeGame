<template>
    <Transition name="pop-in"  v-show="if_show">
    <div class="panel">
        <p>You Fail!</p>
        <div class="buttons">
            <img src="../assets/refresh.svg" class="icon" @click="$emit('refresh')"/>
            <img src="../assets/medal.svg" class="icon" @click="$emit('medalMember')"/>
        </div>
    </div>
    </Transition>
</template>
<script setup>

const props = defineProps(["if_show"])


</script>

<style scoped>
.panel{
    position: fixed;
    height:50%;
    width:50%;
    top:20%;
    left:25%;
    background:#FFFFFF;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}
.icon{
    height:50px;
    padding:10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
}
.buttons{
    width:50%;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
p
{
    font-size: 40px;
    font-weight: bold;
}
.pop-in-enter-active{
    animation: 1s pop-in ;
}
.pop-in-leave-active{
    animation: 1s pop-in reverse;
}
@keyframes pop-in{
    0%{
        opacity: 0;
        top:-50%;
    }
    50%{
        opacity: 1;
        top:21%;
    }
    100%{
        top:20%;
    }
}
</style>