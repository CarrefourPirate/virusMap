<template>
    <div class="cards">
        <div class="cardsTable">
            <div @click="showTypeChange(1)" class="tab" :class="{ active: showType.type === 1 }">
                全国疫情数据(含港澳台)
            </div>
            <div @click="showTypeChange(2)" class="tab" :class="{ active: showType.type === 2 }">
                {{ cityData.name }}疫情数据
            </div>
        </div>
        <div v-show="showType.type === 1" class="cardsInfo">
            <div class="info">
                <div class="title">现有确诊</div>
                <div class="data red">
                    {{ total.confirm - total.heal - total.dead }}
                </div>
                <div class="compare">
                    较昨日
                    <span class="red">+{{ today.confirm - today.dead - today.heal }}</span>
                </div>
            </div>
            <div class="info">
                <div class="title">境外输入</div>
                <div class="data orange">{{ total.input }}</div>
                <div class="compare">
                    较昨日 <span class="orange">+{{ today.input }}</span>
                </div>
            </div>
            <div class="info">
                <div class="title">无症状感染</div>
                <div class="data yellow">{{ extData.noSymptom }}</div>
                <div class="compare">
                    较昨日 <span class="yellow">+{{ extData.incrNoSymptom }}</span>
                </div>
            </div>
            <div class="info">
                <div class="title">累计确诊</div>
                <div class="data lightred">{{ total.confirm }}</div>
                <div class="compare">
                    较昨日 <span class="lightred">+{{ today.confirm }}</span>
                </div>
            </div>
            <div class="info">
                <div class="title">累计死亡</div>
                <div class="data darkred">{{ total.dead }}</div>
                <div class="compare">
                    较昨日<span class="darkred">+{{ today.dead }}</span>
                </div>
            </div>
            <div class="info">
                <div class="title">累计治愈</div>
                <div class="data green">{{ total.heal }}</div>
                <div class="compare">
                    较昨日 <span class="green">+{{ today.heal }}</span>
                </div>
            </div>
        </div>
        <div v-show="showType.type === 2" class="cardsInfo">
            <div class="info">
                <div class="title">现有确诊</div>
                <div class="data red">
                    {{
                            cityData.total.confirm - cityData.total.dead - cityData.total.heal
                    }}
                </div>
                <div class="compare">
                    较昨日 <span class="red">+{{ cityData.today.confirm }}</span>
                </div>
            </div>
            <div class="info">
                <div class="title">累计确诊</div>
                <div class="data darkred">{{ cityData.total.confirm }}</div>
                <div class="compare">
                    较昨日<span class="darkred">+{{ cityData.today.confirm }}</span>
                </div>
            </div>
            <div class="info">
                <div class="title">累计治愈</div>
                <div class="data green">{{ cityData.total.heal }}</div>
                <div class="compare">
                    较昨日 <span class="green">+{{ cityData.today.heal }}</span>
                </div>
            </div>
            <div class="change">
                <!-- <select class="citySel" @change="cityData = getCity($event.target.value)">
                    <option v-for="(city,index) in cityDatas" :key="index" :value="city.name" :selected="city.name == cityData.name">{{city.name}}</option>
                </select> -->
                <div class="selected" @click="showList()">
                    <span>{{ cityData.name }}</span><svg t="1652956129241" class="icon" viewBox="0 0 1024 1024"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2977">
                        <path
                            d="M500.8 604.779L267.307 371.392l-45.227 45.27 278.741 278.613L779.307 416.66l-45.248-45.248z"
                            p-id="2978" fill="#ffffff"></path>
                    </svg>
                </div>
                <div v-show="showListType.type" class="select">
                    <div class="selList" :class="{ active: city.name === cityData.name }"
                        v-for="(city, index) in cityDatas" :key="index" :value="city.name"
                        @click="(cityData = getCity(city.name)), showList()">
                        {{ city.name }}
                    </div>
                </div>
            </div>
        </div>
        <div class="dataInfo"> 
            <div class="update">更新于 {{ lastUpdateTime }}</div>
            <div class="source">数据来源 : 网易新闻</div>
        </div>
    </div>
</template>

<script>
import { onUnmounted, reactive, toRefs, ref } from "vue";
export default {
    name: "topBox",
    props: {
        chinaTotal: {
            type: Object,
            required: true,
        },
        lastUpdateTime: {
            type: String,
            required: true,
        },
        getCity: {
            type: Function,
            required: true,
        },
        cityDatas: {
            type: Object,
            required: true,
        },
        city: {
            // type: String,
            required: true,
        },
    },
    setup(props) {
        const showType = reactive({
            type: 1,
        });
        const cityData = reactive({
            cityData: {},
        });
        cityData.cityData = props.getCity(props.city);
        function showTypeChange(num) {
            showType.type = num;
        }
        const showListType = reactive({
            type: false,
        });
        function showList() {
            showListType.type = !showListType.type;
        }
        // cityId = getCity(props.city)
        return {
            ...toRefs(props.chinaTotal),
            showType,
            showTypeChange,
            ...toRefs(cityData),
            showList,
            showListType,
        };
    },
};
</script>

<style lang="scss" scoped>

</style>
