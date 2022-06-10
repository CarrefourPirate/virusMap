<template>
    <swiper :allowSlideNext="true" :allowSlidePrev="true" :allowTouchMove="false" @swiper="setMapSwiper">
        <swiper-slide>
            <div id="chinaMap"></div>
        </swiper-slide>
        <swiper-slide>
            <div id="chinaTotalMap"></div>
        </swiper-slide>

    </swiper>

    <div class="buttons">
        <div @click="slideTo(0)" class="changeButton" :class="{buttonActive:buttonIsActive.type===0}">现有确诊</div>
        <div @click="slideTo(1)" class="changeButton" :class="{buttonActive:buttonIsActive.type===1}">累计确诊</div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs, inject, watch, computed, ref } from "vue";
import ChinaData from '../assets/china.json'
import { Swiper, SwiperSlide } from 'swiper/vue';
import "swiper/css";
export default {
    name: "covidMap",
    props: {
        cityMapDatas: {
            type: Array,
            required: true,
        },
        // setMapSwiper: {
        //     type: Function,
        //     required: true,
        // },
        // slideTo: {
        //     type: Function,
        //     required: true,
        // }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup(props) {
        let echarts = inject("ec");
        let data = [];
        let totalData = [];
        let swiperMap = null;
        const buttonIsActive = reactive({
            type: 0
        })
        onMounted(() => {
            
            // scaleMap.style = { 'transform': `scale(${document.getElementById("container").clientWidth / 580})` }
            for (var i = 0; i < props.cityMapDatas.length; i++) {
                var temp = {
                    "name": props.cityMapDatas[i].name,
                    "value": props.cityMapDatas[i].total.confirm - props.cityMapDatas[i].total.dead - props.cityMapDatas[i].total.heal,
                    "today": props.cityMapDatas[i].today.confirm,
                }
                var totalTemp = {
                    "name": props.cityMapDatas[i].name,
                    "value": props.cityMapDatas[i].total.confirm
                }
                totalData.push(totalTemp)
                data.push(temp)
            }
            data.push({ "name": "南海诸岛", "value": 0, "today": 0, })
            totalData.push({ "name": "南海诸岛", "value": 0, })
            // console.log(data);
            let chinaMap = echarts.init(document.getElementById("chinaMap"));
            let chinaTotalMap = echarts.init(document.getElementById("chinaTotalMap"));
            echarts.registerMap("china", ChinaData);
            chinaMap.setOption({
                title: {
                    text: '中国疫情地图',
                    subtext: '点击可查看详情',
                    left: 25,
                    top: 5,
                    textStyle: {
                        color: 'rgba(215, 52, 25, 0.8)',
                        fontSize: 25,
                    },
                },
                tooltip: {
                    triggerOn: "mousemove|click",
                    enterable: true,
                    formatter: function (data) {
                        return `<p style="color:rgba(215, 52, 25, 0.9);font-size:22px;margin:5px;">${data.data.name}</p> <p style="font-size:16px;margin:5px;">现有确诊:${data.data.value}</p> <p style="font-size:16px;margin:5px;">新增:${data.data.today}</p>` //format(data.data.name,data.data.value,data.data.today)
                    },
                    backgroundColor: 'rgba(10, 10, 15, 0.8)',
                    borderWidth: 0,
                    textStyle: {
                        color: 'rgba(215, 52, 25, 0.9)',
                        fontWeight: 'bold',
                    },
                },
                // backgroundColor: 'rgba(50, 50, 55, 0.2)',
                animation: true,
                visualMap: {
                    left: 'left',
                    min: 0,
                    max: 250,
                    left: 15,
                    bottom: 10,
                    inRange: {
                        color: [
                            'rgba(150, 150, 155, 0.2)',
                            '#3575b5',
                            '#fee090',
                            '#fdae61',
                            '#f36d53',
                            '#d73027',
                            '#a50026'
                        ]
                    },
                    calculable: true
                },
                series: [
                    {
                        type: "map",
                        map: "china",
                        roam: false,
                        zoom: 1,
                        selectedMode: false,
                        left: 10,
                        right: 10,
                        top: 20,
                        label: {
                            show: true,
                            fontSize: 17,
                            fontFamily: 'Microsoft YaHei',
                        },

                        itemStyle: {

                            areaColor: 'rgba(150,150, 150, 0.5)',
                            borderWidth: 0.2,

                        },
                        emphasis: {
                            label: {
                                show: true,
                            },
                            itemStyle: {
                                areaColor: 'rgba(214, 52, 24, 0.6)',
                                fontFamily: 'Microsoft YaHei',

                            },
                        },
                        data: data,
                    },
                ],
            });
            chinaTotalMap.setOption({
                title: {
                    text: '中国累计疫情地图',
                    subtext: '点击可查看详情',
                    left: 25,
                    top: 5,
                    textStyle: {
                        color: 'rgba(215, 52, 25, 0.8)',
                        fontSize: 25,
                    },
                },
                tooltip: {
                    triggerOn: "mousemove|click",
                    enterable: true,
                    formatter: function (data) {
                        return `<p style="color:rgba(215, 52, 25, 0.9);font-size:22px;margin:5px;">${data.data.name}</p> <p style="font-size:16px;margin:5px;">累计确诊:${data.data.value}</p> `
                    },
                    backgroundColor: 'rgba(10, 10, 15, 0.8)',
                    borderWidth: 0,
                    textStyle: {
                        color: 'rgba(215, 52, 25, 0.9)',
                        fontWeight: 'bold',
                    },
                },
                // backgroundColor: 'rgba(50, 50, 55, 0.2)',
                animation: true,
                visualMap: {
                    left: 'left',
                    min: 0,
                    max: 5000,
                    left: 15,
                    bottom: 10,
                    inRange: {
                        color: [
                            'rgba(150, 150, 155, 0.2)',
                            '#fdae61',
                            '#f36d53',
                            'rgb(215, 52, 25)',
                            '#d73027',
                            '#a50026'
                        ]
                    },
                    calculable: true
                },
                series: [
                    {
                        type: "map",
                        map: "china",
                        roam: false,
                        zoom: 1,
                        selectedMode: false,
                        left: 10,
                        right: 10,
                        top: 20,
                        label: {
                            show: true,
                            fontSize: 17,
                            fontFamily: 'Microsoft YaHei',
                        },

                        itemStyle: {

                            areaColor: 'rgba(150,150, 150, 0.5)',
                            borderWidth: 0.2,

                        },
                        emphasis: {
                            label: {
                                show: true,
                            },
                            itemStyle: {
                                areaColor: 'rgba(214, 52, 24, 0.6)',
                                fontFamily: 'Microsoft YaHei',

                            },
                        },
                        data: totalData,
                    },
                ],
            });
        });
        function checkActive(){
            console.log("OK!")
        }
        function setMapSwiper(swiper) {
            swiperMap = swiper;
            buttonIsActive.type = swiperMap.realIndex
        };
        function slideTo(index) {
            swiperMap.slideTo(index, 500)
            buttonIsActive.type = swiperMap.realIndex
        }
        return {
            setMapSwiper,
            slideTo,
            swiperMap,
            buttonIsActive,
        };
    },
};
</script>

<style lang="scss" scoped>
#chinaMap,
#chinaTotalMap {
    overflow: hidden;
    margin-top: 25px;
    width: 580px;
    height: 500px;
    // transform-origin: left top;
}
</style>
