<template>
    <div class="game-page">
        <Panel :if_show="!game_status" @refresh="setGame()"/>
        <TitleBar/>
        <input class="focus" @keydown="keySearch($event)" ref="main" @blur="unFocus()"/>
        <div class="game-box">
            <div v-for="(item_row, index_row) in box_child" class="game-row">
                <Child 
                v-for="(item,index_col) in item_row"
                :is_head="item.snake_head.value"
                :is_body="item.snake_body.value"
                :is_prop_one="item.prop_one.value"
                :is_prop_two="item.prop_two.value"
                :is_food_one="item.food_one.value"
                :is_food_two="item.food_two.value"
                :is_block="index_row == 0 || index_row == child_row - 1 || index_col == 0 || index_col == child_col - 1"
                />
            </div>
        </div>
        <p class="score">分数:{{ score }}</p>
        <p class="grey-block"><p>塑料数:{{ snake_body.length }}</p><p v-show="snake_body.length > 150" :style="{opacity : (snake_body.length-150) / 50, color:'red'}">DANGER!</p></p>
        <p class="decrease-time" v-show="decrease_time != 0">减速有效时间:{{ decrease_time }}</p>
        <p class="plus-time" v-show="plus_time != 0">分数加倍有效时间:{{ plus_time }}</p>
    </div>
</template>
<script setup>
import { ref, onMounted, computed} from "vue"

let score_add = "";
let game = "";
let game_status = true;
const box_child = [];
const score = ref(0);
const head = {row:0, col:0};
const child_row = 30;
const child_col = 60;
let speed = 0;
let direction = "";
let snake_body = [];
const main = ref();
let food_and_prop = [[1, 1], [1, 1], [1, 1], [1, 1]];
let plus_score = 1;
const decrease_time = ref(0);
const plus_time = ref(0);

for(let a = 0; a < child_row; a++){
    let line = [];
    for(let b = 0; b < child_col; b++){
        line.push({
        prop_one:ref(false), 
        prop_two:ref(false), 
        snake_head:ref(false), 
        snake_body:ref(false),
        food_one:ref(false),
        food_two:ref(false)
        })
    }
    box_child.push(line);
}

function isArraySame(arr1, arr2){
    if(arr1.length != arr2.length)return false;

    for(let a = 0;a < arr1.length; a++){
        if(arr1[a] != arr2[a])return false;
    }

    return true;
}

function keySearch(event){
    let key = event.key;
    if(key == "ArrowUp")direction = "up";
    else if (key == "ArrowDown")direction = "down";
    else if (key == "ArrowLeft")direction = "left";
    else if (key == "ArrowRight")direction = "right";

}

function unFocus(){
    main.value.focus();
}

function bodyMove(){

    let is_same = false;

    snake_body.forEach((item) => {
        if(isArraySame(item, [head.row, head.col]))is_same = true;
    })

    if(!is_same){
        snake_body.unshift([head.row, head.col]);
        box_child[head.row][head.col].snake_body.value = true;
    }
}

function foodAndEnzyme(){

    box_child[food_and_prop[0][0]][food_and_prop[0][1]].prop_one.value = false;
    box_child[food_and_prop[1][0]][food_and_prop[1][1]].prop_two.value = false;
    box_child[food_and_prop[2][0]][food_and_prop[2][1]].food_one.value = false;
    box_child[food_and_prop[3][0]][food_and_prop[3][1]].food_two.value = false;

    let data = [];

    while(true){
        let col = Math.floor(Math.random() * (child_col - 2)) + 1;
        let row = Math.floor(Math.random() * (child_row - 2)) + 1;

        //这行有隐藏的bug
        if(data.includes([row, col] != -1 || [row, col] == [head.row, head.col] || snake_body.includes([row, col] != -1)))continue;

        if(data.length == 4)break;
        data.push([row, col]);
    }

    food_and_prop = data;

    box_child[food_and_prop[0][0]][food_and_prop[0][1]].prop_one.value = true;
    box_child[food_and_prop[1][0]][food_and_prop[1][1]].prop_two.value = true;
    box_child[food_and_prop[2][0]][food_and_prop[2][1]].food_one.value = true;
    box_child[food_and_prop[3][0]][food_and_prop[3][1]].food_two.value = true;

}

function setGame(){

    decrease_time.value = 0;
    plus_time.value = 0;
    speed = 200;
    snake_body.forEach((item) => {
        box_child[item[0]][item[1]].snake_body.value = false;
    })
    
    score.value = 0;
    game_status = true;
    

    if(snake_body.length > 200){box_child[head.row][head.col].snake_head.value = false;}

    snake_body.length = 0;

    head.row = 1;
    head.col = 1;

    box_child[1][1].snake_head.value = true;
    direction = "down";
    main.value.focus();
    
    gameRun();
    scoreAdd();
    foodAndEnzyme();
}

function scoreAdd(){
    if(!game_status){
            clearInterval(score_add);
            clearInterval(game);
            return;
    }
    score_add = setInterval(() => {
        if(plus_time.value)plus_time.value--;
        if(decrease_time.value)decrease_time.value--;
        
        score.value = score.value + plus_score;
        speed -= 2;
        
        clearInterval(game);
        clearInterval(score_add);
        
        gameRun();
        scoreAdd();
    }, 1000);
}

function gameRun(){
        game = setInterval(() => {
          
            if(snake_body.length > 200) game_status = false;
            if(head.col == 0 || head.row == 0 || head.col == child_col - 1|| head.row == child_row - 1) game_status = false;
            
            
            box_child[head.row][head.col].snake_head.value = false;

            bodyMove();

            if(direction == "up"){
                head.row = head.row - 1;
            }
            else if(direction == "down"){
                head.row = head.row + 1;
            }
            else if(direction == "left"){
                head.col = head.col - 1;
            }
            else if(direction == "right"){
                head.col = head.col + 1;
            }

            box_child[head.row][head.col].snake_head.value = true;
            

            for(let a = 0; a < 4; a++){
                if(food_and_prop[0][0] == head.row && food_and_prop[0][1] == head.col){
                    //道具1:时间减慢10s
                    //绿色
                    foodAndEnzyme();
                    clearInterval(game);
                    clearInterval(score_add);
                    decrease_time.value = 10;
                    speed = speed * 2;
                    game = gameRun();
                    scoreAdd()
                    
                    setTimeout(() => {

                        clearInterval(game);
                        clearInterval(score_add);

                        speed = (speed + 50) / 2;

                        if(game_status){
                            gameRun();
                            scoreAdd();
                        }
                    }, 10000);
                }
                else if(food_and_prop[1][0] == head.row && food_and_prop[1][1] == head.col){
                    //道具2:减少一半的塑料
                    //紫色
                    foodAndEnzyme();
                    let moveChild = snake_body.splice(snake_body.length % 2 == 0 ? snake_body.length / 2 : (snake_body.length + 1) / 2);
                    moveChild.forEach((item) => {
                        box_child[item[0]][item[1]].snake_body.value = false;
                    })
                }
                else if(food_and_prop[2][0] == head.row && food_and_prop[2][1] == head.col){
                    //食物:吃了得一分
                    //蓝色
                    foodAndEnzyme();
                    if(plus_score)score.value++;
                    score.value += 20;
                }
                else if(food_and_prop[3][0] == head.row && food_and_prop[3][1] == head.col){
                    //食物道具:10s吃到食物加2分
                    //黄色
                    plus_time.value = 10;
                    plus_score = plus_score * 2;
                    foodAndEnzyme();
                    setTimeout(() => plus_score = plus_score / 2, 10000);
                }
            }
    }, speed);
    return game;
}

onMounted(() => {
    setGame();
})

</script>
<style scoped>
.game-page{
    display:flex;
    flex-direction: column;
    align-items: center;
}
.game-box{
    display:flex;
    flex-direction:column;
}
.game-row{
    display:flex;
    flex-direction: row;
}
.score{
    font-size:20px;
    font-weight: bold;
    margin:30px;
}
.focus{
    position: fixed;
    bottom: 0;
    left:0;
    opacity: 0;
}
.grey-block{
    display:flex;
    flex-direction: row;
    width:15%;
    justify-content: center;
    align-items: center;
}
</style>