<template>
    <swiper :allowSlideNext="true" :allowSlidePrev="true" :allowTouchMove="false" @swiper="setMapSwiper">
        <swiper-slide :virtualIndex="0" ><div id="increaseLine"></div></swiper-slide>
        <swiper-slide :virtualIndex="1" ><div id="totalLine"></div></swiper-slide>
    </swiper>
    <div class="buttons">
        <div @click="slideTo(0)" class="changeButton" :class="{buttonActive:buttonIsActive.type===0}">全国疫情<br />新增趋势</div>
        <div @click="slideTo(1)" class="changeButton" :class="{buttonActive:buttonIsActive.type===1}">现有确诊<br />累计确诊</div>
    </div>
</template>

<script>
import { reactive, toRefs, inject, onMounted } from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import "swiper/css";
export default {
    name: "covidLineChart",
    props: {
        cityLineDatas: {
            type: Array,
            required: true,
        },
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup(props) {
        const buttonIsActive = reactive({
            type: 0
        })
        let echarts = inject("ec");
        // console.log(props.cityLineDatas)
        let datas = [[], [], [], [], []];
        const scaleMap = reactive({
            style: {},
        });
        let swiperSheet = null;
        function setMapSwiper(swiper) {
            swiperSheet = swiper;
            buttonIsActive.type = swiperSheet.realIndex
        };
        function slideTo(index) {
            swiperSheet.slideTo(index, 500)
            buttonIsActive.type = swiperSheet.realIndex
        };
        onMounted(() => {
            // scaleMap.style = { 'transform': `scale(${document.getElementById("container").clientWidth / 580})` }
            let increaseLine = echarts.init(document.getElementById("increaseLine"));
            let totalLine = echarts.init(document.getElementById("totalLine"));
            for (var i = 0; i < props.cityLineDatas.length; i++) {
                datas[0].push(props.cityLineDatas[i].date);
                datas[1].push(props.cityLineDatas[i].today.confirm);
                datas[2].push(props.cityLineDatas[i].today.input);
                datas[3].push(props.cityLineDatas[i].total.confirm);
                datas[4].push(props.cityLineDatas[i].total.storeConfirm);
            }
            increaseLine.setOption({
                title: {
                    text: "中国疫情新增趋势",
                    subtext: "点击可查看详情",
                    left: 25,
                    top: 25,
                    textStyle: {
                        color: "rgba(215, 52, 25, 0.8)",
                        fontSize: 22,
                    },
                },
                tooltip: {
                    trigger: "axis",
                    backgroundColor: "rgba(10, 10, 15, 0.8)",
                    borderWidth: 0,
                    textStyle: {
                        color: "#eee",
                        fontWeight: "bold",
                    },
                },
                grid: {
                    top: 100,
                    right:15,
                    zlevel:3,
                    bottom:25
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: datas[0],
                    axisLine: {
                        show: false,
                    },
                },
                yAxis: {
                    type: "value",
                    splitLine: {
                        lineStyle: {
                            color: "rgba(150,150, 150, 0.5)",
                            width: 0.2,
                        },
                    },
                },
                series: [
                    {
                        name: "确诊",
                        type: "line",
                        data: datas[1],
                        smooth: true,
                        showAllSymbol: false,
                        itemStyle: {
                            color: "rgba(215, 52, 25, 0.9)",
                        },
                    },
                    {
                        name: "境外输入",
                        type: "line",
                        data: datas[2],
                        smooth: true,
                        showAllSymbol: false,
                        itemStyle: {
                            color: "#f36d53",
                        },
                    },
                ],
            });
            totalLine.setOption({
                title: {
                    text: "中国疫情累积/现有确诊趋势",
                    subtext: "点击可查看详情",
                    left: 25,
                    top: 25,
                    textStyle: {
                        color: "rgba(215, 52, 25, 0.8)",
                        fontSize: 22,
                    },
                },
                tooltip: {
                    trigger: "axis",
                    backgroundColor: "rgba(10, 10, 15, 0.8)",
                    borderWidth: 0,
                    textStyle: {
                        color: "#eee",
                        fontWeight: "bold",
                    },
                },
                grid: {
                    top: 100,
                    left: 70,
                    right:15,
                    z:3,
                    bottom:25
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: datas[0],
                    axisLine: {
                        show: false,
                    },
                },
                yAxis: {
                    type: "value",
                    splitLine: {
                        lineStyle: {
                            color: "rgba(150,150, 150, 0.5)",
                            width: 0.2,
                        },
                    },
                },
                series: [
                    {
                        name: "累积确诊",
                        type: "line",
                        data: datas[3],
                        smooth: true,
                        showAllSymbol: false,
                        itemStyle: {
                            color: "rgba(215, 52, 25, 0.9)",
                        },
                    },
                    {
                        name: "现有确诊",
                        type: "line",
                        data: datas[4],
                        smooth: true,
                        showAllSymbol: false,
                        itemStyle: {
                            color: "#f36d53",
                        },
                    },
                ],
            });
        });
        
        return {
            setMapSwiper,
            slideTo,
            swiperSheet,
            buttonIsActive
        };
    },
};
</script>

<style lang="scss" scoped>
#increaseLine,
#totalLine {
    overflow: hidden;
    margin-top: 25px;
    width: 580px;
    height: 350px;
    transform-origin: left top;
}
</style>
