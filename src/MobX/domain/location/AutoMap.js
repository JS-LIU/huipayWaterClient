/**
 * Created by LDQ on 2017/6/20.
 */
import {observable, computed,action,autorun} from "mobx";


class AutoMap{
    @observable showLocationInfo = {
        longitude : "",
        latitude : "",
        pcode: "",
        province:"",
        citycode:"",
        city:"",
        adcode:"",
        receiveAddress : "正在获取当前位置...",
    };
    @observable _showAddressList = false;
    @action hideNearAddressList(){
        this._showAddressList = false;
    }
    @action showNearAddressList(){
        this._showAddressList = true;
    }
    @computed get showAddressList(){
        return this._showAddressList;
    }
    @observable _searchAddressList = [];
    @computed get searchAddressList(){
        return this._searchAddressList;
    }

    constructor(){
        this.map = new AMap.Map('container', {
            resizeEnable: true
        });
    }
    @action getCurrentLocation(){
        let geolocation;
        let self = this;
        let pcode = "",citycode = '',districtcode = '',formattedAddress = '正在获取当前位置...';
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
            console.log('============定位成功',data);

            self.showLocationInfo.longitude = data.position.getLng();
            self.showLocationInfo.latitude = data.position.getLat();
            self.showLocationInfo.pcode = data.addressComponent.citycode.substring(0,2)+"0000";
            self.showLocationInfo.province = data.addressComponent.province;
            self.showLocationInfo.citycode = data.addressComponent.citycode;
            self.showLocationInfo.city = data.addressComponent.district;
            self.showLocationInfo.adcode = data.addressComponent.adcode;

            self.showLocationInfo.receiveAddress = data.formattedAddress;

        }
        function onError(data) {
            console.log('============定位失败');
            self.showLocationInfo.receiveAddress = '定位失败';
        }
    }
    @action autoComplete(str){
        let self = this;
        let auto = new AMap.Autocomplete();
        auto.search(str, function(status, result){
            if (status === 'complete' && result.info === 'OK') {
                console.log(result);
                self._searchAddressList = result.tips;
            }
        });
    }
    @action searchAddressDetail(str){
        let self = this;
        let placeSearch = new AMap.PlaceSearch({
            extensions:'all'
        });

        placeSearch.search(str,function(status, result){
            if (status === 'complete' && result.info === 'OK') {
                placeSearch_CallBack(result);
            }
        });
        function placeSearch_CallBack(data){
            let poiInfo = data.poiList.pois[0];
            console.log(poiInfo);
            self.showLocationInfo.longitude = poiInfo.location.getLng();
            self.showLocationInfo.latitude = poiInfo.location.getLat();
            self.showLocationInfo.pcode = poiInfo.pcode;
            self.showLocationInfo.province = poiInfo.pname;
            self.showLocationInfo.citycode = poiInfo.citycode;
            self.showLocationInfo.city = poiInfo.cityname;
            self.showLocationInfo.adcode = poiInfo.adcode;
            self.showLocationInfo.receiveAddress = poiInfo.name;

            self.city = poiInfo.cityname;
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

    @action geocoder(lnglatXY){
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
