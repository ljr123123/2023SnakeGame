<template>
    <div class="game-page">
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
    </div>
</template>
<script setup>
import { ref, onMounted, reactive} from "vue"

let game_status = true;
const box_child = [];
const score = ref(0);
const head = {row:0, col:0};
const child_row = 30;
const child_col = 60;
let speed = 100;
let direction = "";
const body = [];
const main = ref();
let food_and_prop = [[1, 1], [1, 1], [1, 1], [1, 1]];
let plus_score = false;

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
    console.log(event.key);
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

    body.forEach((item) => {
        if(isArraySame(item, [head.row, head.col]))is_same = true;
    })

    if(!is_same){
        body.unshift([head.row, head.col]);
        box_child[head.row][head.col].snake_body.value = true;
    }

    console.log(body.length);
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
        if(data.includes([row, col] != -1 || [row, col] == [head.row, head.col] || body.includes([row, col] != -1)))continue;

        if(data.length == 4)break;
        data.push([row, col]);
    }

    food_and_prop = data;

    box_child[food_and_prop[0][0]][food_and_prop[0][1]].prop_one.value = true;
    box_child[food_and_prop[1][0]][food_and_prop[1][1]].prop_two.value = true;
    box_child[food_and_prop[2][0]][food_and_prop[2][1]].food_one.value = true;
    box_child[food_and_prop[3][0]][food_and_prop[3][1]].food_two.value = true;

}

function gameRun(){

    let game = setInterval(() => {

        if(body.length > (child_col * child_row) / 2) game_status = false;
        if(head.col == 0 || head.row == 0 || head.col == child_col - 1|| head.row == child_row - 1) game_status = false;
        if(!game_status){
            clearInterval(game);
            alert("You failed! 刷新网页重新开始")
        }
        
        box_child[head.row][head.col].snake_head.value = false;
        //console.log("前: 头行：" + head.row + "头列：" + head.col);

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
        //console.log("后: 头行：" + head.row + "头列：" + head.col);
        

        for(let a = 0; a < 4; a++){
            if(food_and_prop[0][0] == head.row && food_and_prop[0][1] == head.col){
                //道具1:时间减慢10s
                //绿色
                foodAndEnzyme();
                clearInterval(game);
                speed = speed * 5;
                game = gameRun();
                
                setTimeout(() => {
                    clearInterval(game);
                    speed = speed / 5;
                    gameRun();
                }, 10000);
            }
            else if(food_and_prop[1][0] == head.row && food_and_prop[1][1] == head.col){
                //道具2:减少一半的塑料
                //紫色
                foodAndEnzyme();
                let moveChild = body.splice(0, body.length % 2 == 0 ? body.length / 2 : (body.length + 1) / 2);
                moveChild.forEach((item) => {
                    box_child[item[0]][item[1]].snake_body.value = false;
                })
            }
            else if(food_and_prop[2][0] == head.row && food_and_prop[2][1] == head.col){
                //食物:吃了得一分
                //蓝色
                foodAndEnzyme();
                if(plus_score)score.value++;
                score.value++;
            }
            else if(food_and_prop[3][0] == head.row && food_and_prop[3][1] == head.col){
                //食物道具:10s吃到食物加2分
                //黄色
                plus_score = true;
                foodAndEnzyme();
                setTimeout(() => plus_score = false, 10000);
                console.log("得分加成！");
            }
        }
        

    }, speed);
    return game;
}



onMounted(()=>{
    head.row = 1;
    head.col = 1;
    box_child[head.row][head.col].snake_head.value = true;
    direction = "down";
    main.value.focus();
    gameRun();
    foodAndEnzyme()
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
</style>