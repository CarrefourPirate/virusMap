<template>
    <div class="chinaInfo">
        <div class="blank"></div>
        <div class="container" id="container">
            <TopBox v-if="city && data.chinaTotal" :chinaTotal="data.chinaTotal" :lastUpdateTime="data.lastUpdateTime"
                :cityDatas="data.areaTree[2].children" :getCity="getCity" :city="city" />
            <div v-if="data.chinaTotal" class="charts" :style="[chartsHeight.style]">
                <div class="chartsContainer" id="chartsContainer" :style="[scaleMap.style]">
                    <CovidMap :cityMapDatas="data.areaTree[2].children" />
                    <CovidLineChart :cityLineDatas="data.chinaDayList" />
                </div>
            </div>
            <CovidTable v-if="data.chinaTotal" :cityMapDatas="data.areaTree[2].children" />
        </div>
    </div>
    <a href="https://space.bilibili.com/7277347" target="_blank" class="authorLogo"><img src="./assets/authorLogo.png"
            alt=""></a>
</template>

<script>
import * as echarts from 'echarts';
import { getCurrentInstance, reactive, toRefs, onMounted, ref, provide, onBeforeUnmount } from "vue";
import axios from "axios";
import TopBox from "./components/topBox.vue";
import CovidMap from "./components/covidMap.vue"
import CovidLineChart from "./components/covidLineChart.vue";
import CovidTable from './components/covidTable.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import "swiper/css";
export default {
    name: "app",
    setup() {
        const chartsContainer = ref(null)
        const data = reactive({
            data: {},
        });
        const city = reactive({
            city: {},
        })
        let cityData = reactive({
            cityData: {}
        })
        const scaleMap = reactive({
            style: {}
        })
        const chartsHeight = reactive({
            style: {}
        })

        provide('ec', echarts)

        onMounted(() => {
            // console.log(document.getElementById("container").clientWidth);
            scaleMap.style = { 'transform': `scale(${document.getElementById("container").clientWidth / 580})` };
            chartsHeight.style = { 'height': `${document.getElementById("container").clientWidth / 580 * 1100}px` };
            // console.log(scaleMap.style);
            window.onresize = function () {
                // console.log(document.getElementById("container").clientWidth);
                scaleMap.style = { 'transform': `scale(${document.getElementById("container").clientWidth / 580})` }
                chartsHeight.style = { 'height': `${document.getElementById("container").clientWidth / 580 * 1080}px` };
                // console.log(scaleMap.style);
            };
            axios({
                // url:"/netease/ug/api/wuhan/app/data/list-total",
                baseURL:'/netease/ug/api/wuhan/app/data/list-total',
                })
                .then((res) => {
                    data.data = res.data.data
                    // console.log(data.data);
                }).catch((e) => {
                    console.log("OK");
                    console.log(e);
                });
            axios("/sohu/cityjson?ie=utf-8")
                .then((res) => {
                    city.city = res.data.toString()
                })
                .catch((error) => {
                    city.city = '北京北京市'
                });
        });
        function getCity(city) {
            var i = 0
            while (i < 34) {
                try {
                    if (city.includes(data.data.areaTree[2].children[i].name)) {
                        // console.log(data.data.areaTree[2].children)
                        return data.data.areaTree[2].children[i]
                    }
                } catch (error) {
                    console.log(city)
                    return data.data.areaTree[2].children[11]
                }
                i++
                if (i > 33) {
                    return data.data.areaTree[2].children[11]
                }
            }
        };

        return {
            ...toRefs(data),
            ...toRefs(city),
            getCity,
            cityData,
            scaleMap,
            chartsHeight
        }
    },
    components: { TopBox, CovidMap, CovidLineChart, CovidTable, Swiper, SwiperSlide },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    font-family: "微软雅黑";
    color: #efefef;
}

.cards {
    background-color: rgba(50, 50, 55, 0.2);
    backdrop-filter: blur(5px);
    border-radius: 15px;
    color: rgba(128, 128, 128, 0.8);
    width: 100%;
    overflow: hidden;
}

.cardsTable,
.info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
}

.cardsTable {
    background-color: rgba(0, 0, 0, 0.25);
}

.tab {
    cursor: default;
    padding: 12px;
    width: 50%;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    font-weight: bold;
}

.cardsInfo {
    padding: 5% 7.5%;
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: space-between;
    grid-row-gap: 15px;
}

.info {
    flex-direction: column;
    font-weight: 600;
    font-size: 13px;
}

.update,
.source {
    font-size: 10px;
    color: #999;
    margin-bottom: 20px;
}



.compare {
    font-size: 10px;
}

.title {
    font-size: 15px;
}

.data {
    font-size: 20px;
}

.dataInfo {
    display: flex;
    justify-content: space-between;
    padding: 0 7%;
}

.change {
    grid-column-start: 1;
    grid-column-end: 4;
    align-self: center;
    text-align: center;
    background-color: rgba(50, 50, 55, 0.5);
    border-radius: 5px;
}

.selected,
.selList {
    cursor: default;
    text-align: center;
    letter-spacing: 0.5em;
}

.select,
.selected {
    margin: 0 auto;
    color: #efefef;
    width: 100%;
    padding: 7.5px 0;
    font-size: 16px;
}

.select {
    height: 200px;
    overflow-y: scroll;
}

.selList {
    padding: 2px 0;
}

::-webkit-scrollbar {
    width: 5px;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-thumb {
    background-color: rgba(214, 52, 24, 0.5);
    border-radius: 2px;
}

.selList:hover,
.selList:active {
    background-color: rgba(214, 52, 24, 0.5);
}

.selected {
    display: flex;
    justify-content: center;
    align-items: center;
}

.selected svg {
    height: 20px;
}

.blank {
    height: 10vh;
}

.container {
    width: 85%;
    display: block;
    margin: 0 auto;
    max-width: 580px;
}

.buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chartsContainer {
    transform-origin: left top;
    width: 580px;
}

.charts {
    margin: 25px 0;
    border-radius: 10px;
    background-color: rgba(50, 50, 55, 0.2);
}

.changeButton {
    background-color: rgba(50, 50, 50, 0.25);
    padding: 12.5px 0px;
    margin: 15px;
    letter-spacing: 1px;
    border-radius: 5px;
    width: 100%;
    text-align: center;
    color: #ccc;
    font-size: 18px;
    font-weight: bold;
}

.active {
    background-color: rgba(214, 52, 24, 0.5);
    color: #fff;
}

.authorLogo img {
    display: block;
    margin: 5px auto;
    padding: 25px 0;
    max-width: 55%;
    opacity: 0.1;
}

.buttonActive {
    color: rgba(214, 52, 24, 0.8);
}

.red {
    color: rgb(233, 60, 30);
}

.orange {
    color: rgb(228, 101, 27);
}

.yellow {
    color: rgb(248, 222, 106);
}

.lightred {
    color: rgb(238, 83, 83);
}

.darkred {
    color: rgb(160, 37, 15);
}

.green {
    color: rgb(99, 230, 190);
}
</style>
