/**
 * Created by LDQ on 2017/6/20.
 */
import {observable, computed,action} from "mobx";


class AutoMap{
    @observable province = "正在定位";
    @observable city = "";
    @observable district = "";
    @observable township = "";
    @observable street = "";
    @observable streetNumber = "";
    @observable lng = "";
    @observable lat = "";
    @observable formattedAddress = "正在定位";

    constructor(){
        this.map = new AMap.Map('container', {
            resizeEnable: true
        });
    }

    currentLocationInfo(){
        let geolocation;
        let self = this;
        this.map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,               //是否使用高精度定位，默认:true
                timeout: 10000,                         //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),   //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,                   //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'RB'
            });
            self.map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });
        function onComplete(data) {
            self.province = data.addressComponent.province;
            self.city = data.addressComponent.city;
            self.district = data.addressComponent.district;
            self.township = data.addressComponent.township;
            self.street = data.addressComponent.street;
            self.streetNumber = data.addressComponent.streetNumber;
            self.lng = data.position.getLng();
            self.lat = data.position.getLat();

            self.formattedAddress = data.formattedAddress;

            console.log('============定位成功');

            console.log("省："+data.addressComponent.province);
            console.log("市："+data.addressComponent.city);
            console.log("区："+data.addressComponent.district);

            // 乡镇+街道+门牌号 = 详细地址
            console.log("乡镇："+data.addressComponent.township);
            console.log("街道："+data.addressComponent.street);
            console.log("门牌号："+data.addressComponent.streetNumber);

            console.log(data.formattedAddress);

            console.log("精度："+data.position.getLng());
            console.log('纬度：' + data.position.getLat());


        }
        function onError(data) {
            console.log('============定位失败');
        }
    }

    dragSiteSelection(){
        let self = this;
        AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
            let positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: self.map,
                iconStyle: { //自定义外观
                    url: '//webapi.amap.com/ui/1.0/assets/position-picker2.png',
                    ancher: [24, 40],
                    size: [48, 48]
                }
            });
            positionPicker.start();
            positionPicker.on('success', function(positionResult) {
                let regeocode = positionResult.regeocode;
                console.log("省："+regeocode.addressComponent.province);
                console.log("市："+regeocode.addressComponent.city);
                console.log("区："+regeocode.addressComponent.district);
                console.log("乡镇："+regeocode.addressComponent.township);
                console.log("街道："+regeocode.addressComponent.street);
                console.log("门牌号："+regeocode.addressComponent.streetNumber);
                console.log("所在社区："+regeocode.addressComponent.neighborhood);
                console.log("社区类型："+regeocode.addressComponent.neighborhoodType);
                console.log("所在大楼："+regeocode.addressComponent.building);
                console.log("楼类型："+regeocode.addressComponent.buildingType);

                console.log("经度："+positionResult.position.getLng());
                console.log("纬度："+positionResult.position.getLat());

                console.log(positionResult.address);
            });

        });
    }
    autoComplete(){
        let self = this;
        let auto = new AMap.Autocomplete({
            input: "tipinput"
        });
        let placeSearch = new AMap.PlaceSearch({
            map: self.map,
            extensions:'base'
        });  //构造地点查询类
        AMap.event.addListener(auto, "select", select);
        function select(e) {

            placeSearch.search(e.poi.name,function(status, result){
                if (status === 'complete' && result.info === 'OK') {
                    placeSearch_CallBack(result);
                }
            });
        }
        function placeSearch_CallBack(data){
            let poiInfo = data.poiList.pois[0];
            console.log("省："+poiInfo.pname);
            console.log("市："+poiInfo.cityname);
            console.log("区："+poiInfo.adname);
            console.log("具体地址："+poiInfo.name);

            console.log("经度："+poiInfo.location.getLng());
            console.log("纬度："+poiInfo.location.getLat());
        }
    }
    geocoder(lnglatXY){
        let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "base"
        });
        geocoder.getAddress(lnglatXY, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                geocoder_CallBack(result);
            }
        });
        function geocoder_CallBack(data) {
            let regeocode = data.regeocode;
            console.log("省："+regeocode.addressComponent.province);
            console.log("市："+regeocode.addressComponent.city);
            console.log("区："+regeocode.addressComponent.district);
            console.log("乡镇："+regeocode.addressComponent.township);
            console.log("街道："+regeocode.addressComponent.street);
            console.log("门牌号："+regeocode.addressComponent.streetNumber);
            console.log("所在社区："+regeocode.addressComponent.neighborhood);
            console.log("社区类型："+regeocode.addressComponent.neighborhoodType);
            console.log("所在大楼："+regeocode.addressComponent.building);
            console.log("楼类型："+regeocode.addressComponent.buildingType);
        }
    }
}


module.exports = AutoMap;
