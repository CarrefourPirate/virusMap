<template>
    <div class="table">
        <div class="titles">
            <div class="title">地 区</div>
            <div class="title red">新增<br>确诊</div>
            <div class="title orange">现有<br>确诊</div>
            <div class="title darkred">累计<br>确诊</div>
        </div>
        <div v-for="(city,index) in cityMapDatas" class="city">
            <div class="mainCity" @click="changeShow(city.id)">
                <div class="data">{{city.name}}</div>
                <div class="data red">{{city.today.confirm}}</div>
                <div class="data orange">{{city.total.confirm - city.total.dead - city.total.heal}}</div>
                <div class="data darkred">{{city.total.confirm}}</div>
            </div>
            <div v-if="showState.type == city.id" v-for="(subcity,index) in city.children" class="subCity">
                <div class="data">{{subcity.name}}</div>
                <div class="data red">{{subcity.today.confirm}}</div>
                <div class="data orange">{{subcity.total.confirm - subcity.total.dead - subcity.total.heal}}</div>
                <div class="data darkred">{{subcity.total.confirm}}</div>
            </div>
        </div>
        <div class="blank"></div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    name: "covidTable",
    props: {
        cityMapDatas: {
            type: Array,
            required: true,
        },
    },
    setup() {
        const showState = reactive({
            type:false,
        })
        function changeShow(id){
            if (showState.type === id){
                showState.type = false;
            }
            else{
                showState.type = id
            }
        }
        return {
            showState,
            changeShow
        }
    }
}
</script>

<style lang="scss" scoped>
.table {
    width: 100%;
    cursor: default;
    overflow:visible;
}

.titles,.mainCity,.subCity {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title,.data {
    width: 100%;
    text-align: center;
}

.titles{
    padding: 10px 0;
    background-color: rgb(38, 40, 44);
    top: 0;
    font-size: 15px;
    letter-spacing: 3px;
    position:sticky;
    border-radius: 10px 10px 0 0;
}

.data {
    font-size: 15px;
}

.city {
    display: flex;
    width: 100%;
    flex-direction:column;
    padding: px 0;
    background-color: rgba(50, 50, 50, 0.2);
    border-bottom: 1px solid rgba(20, 20, 20, 0.15);
}
.city:hover {
    background-color: rgba(215, 52, 24, 0.25);
}
.mainCity {
    padding: 5px 0;
}
.subCity {
    padding: 5px 0;
}
.blank {
    height: 10px;
    background-color: rgba(50, 50, 50, 0.2);
    border-radius: 0 0 15px 15px;
}
</style>