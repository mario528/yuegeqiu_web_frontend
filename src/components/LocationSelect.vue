<!--
 * @Author: majiaao
 * @Date: 2020-04-25 17:37:10
 * @LastEditors: majiaao
 * @LastEditTime: 2020-04-28 22:42:09
 * @Description: file content
 -->
<template>
    <div class="flex-row container">
        <el-select v-model="province" placeholder="请选择" class="select" @change="changeProvince">
            <el-option
                v-for="(item, index) in provinces"
                :key="index"
                :label="item.name"
                :value="{
                    value: item.value,
                    name: item.name
                }"
            ></el-option>
        </el-select>
        <el-select v-model="city" :disabled="disableOptions[0]" placeholder="请选择" class="select" @change="changeCity">
            <el-option
                v-for="(item, index) in cities"
                :key="index"
                :label="item.name"
                :value="{
                    value: item.value,
                    name: item.name
                }"
            ></el-option>
        </el-select>
        <el-select v-model="district" :disabled="disableOptions[1]" placeholder="请选择" class="select" @change="changeDistrict">
            <el-option
                v-for="(item, index) in districts"
                :key="index"
                :label="item.name"
                :value="{
                    value: item.value,
                    name: item.name
                }"
            ></el-option>
        </el-select>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
import City from '@/model/City/City'
@Component
export default class LocationSelect extends Vue {
    private disableOptions = [true, true]
    private provinces = []
    private cities = []
    private districts = []
    private province = {
        name: '',
        value: ''
    }
    private city = {
        name: '',
        value: ''
    }
    private district = {
        name: '',
        value: ''
    }
    private selectInfo = {}
    mounted() {
        this.requestRouter()     
    }
    private requestRouter (type = 'provinces') {
        switch (type) {
            case 'provinces':
                this.requestProvinces()
                break;
            case 'cities':
                this.requestCities()
                break;
            case 'districts':
                this.requestDistricts()
                break;
        }
    }
    private changeProvince () {
        if (this.province) {
            this.requestRouter('cities')
        }
    }
    private changeCity () {
        if (this.city) {
            this.requestRouter('districts')
        }
    }
    private changeDistrict () {
        this.$emit('selectComplete', {
            province: this.province.name,
            city: this.city.name =='市辖区' ? this.province.name : this.city.name,
            district: this.district.name
        })
    }
    private requestProvinces () {
        const city = new City()
        city.getProvinces.call(this).then((res: any) => {
            const { provinces } = res
            this.provinces = provinces
        })
    }
    private requestCities () {
        const city = new City()
        const params = {
           code: this.province.value
        }
        city.getCities.call(this, params).then((res: any) => {
            this.disableOptions[0] = false
            const { cities } = res
            this.cities = cities
        })
    }
    private requestDistricts () {
        const city = new City()
        const params = {
           code: this.city.value
        }
        city.getDistricts.call(this, params).then((res: any) => {
            this.disableOptions[1] = false
            const { districtes } = res
            this.districts = districtes
        })
    }
}
</script>
<style lang="scss" scoped>
.container {
    flex-wrap: wrap;
}
.select {
    width: 20%;
    min-width: 100px;
    margin-right: 5%;
}
</style>


