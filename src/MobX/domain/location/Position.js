/**
 * Created by LDQ on 2017/9/25
 */
import {observable, computed,action,autorun} from "mobx";
import AutoMap from './AutoMap';

class Position{
    constructor(){
        this.currentMap = new AutoMap();    //  当前地址相关的地图
        this.searchMap = new AutoMap(); //  用户搜索的地图
    }
    //  重新定位当前地址
    @action getCurrentMap(){
        this._current.fullAddress = "正在定位...";
        this.currentMap.getCurrentLocation();
        this._current = this.currentMap.showLocationInfo;
        this.currentMap.searchNearAddress([this._current.longitude,this._current.latitude]);
    }
    //  当前地址
    @observable _current = {};
    //  当前地址
    @computed get current(){
        if(!this._current.adcode){
            this.getCurrentMap();
        }
        this.currentMap.searchNearAddress([this._current.longitude,this._current.latitude]);
        return this._current;
    }

    //  附近地址
    @computed get nearAddressList(){
        return this.currentMap.addressList;
    }

    //  选择首页地址
    @action selected(address){
        if(typeof address === "string"){
            this.searchMap.searchAddressDetail(address);
            this._homeSelectedAddress = this.searchMap.showLocationInfo;
        }else{
            this._homeSelectedAddress = address;
        }
    }

    //  自主选择的首页地址
    @observable _homeSelectedAddress;


    //  搜索地址
    @action searchAddressList(str){
        this.searchMap.autoComplete(str);
        this._autoCompleteList = this.searchMap.addressList;
    }
    //  搜索地址列表
    @observable _autoCompleteList = [];
    //  搜索地址列表
    @computed get autoCompleteList(){
        return this._autoCompleteList;
    }
    //  隐藏搜索地址列表
    @action hideAutoCompleteList(){
        this._isShowAutoCompleteList = false;
    }
    //  显示搜索地址列表
    @action showAutoCompleteList(){
        this._isShowAutoCompleteList = true;
    }
    //  是否显示搜索地址列表
    @observable _isShowAutoCompleteList = false;
    //  是否显示搜索地址列表
    @computed get isShowAutoCompleteList(){
        return this._isShowAutoCompleteList;
    }

    //  实际的首页地址
    @computed get homePageAddress(){
        if(this._homeSelectedAddress){
            return this._homeSelectedAddress;
        }else if(!this._current.receiveAddress){
            this.getCurrentMap()
        }
        console.log("_current:",this._current);
        return this._current;
    }
}
module.exports = Position;