/**
 * Created by LDQ on 2017/9/17
 */
import {observable, computed,action,autorun} from "mobx";
import AutoMap from './AutoMap';


class CustomAddress{

    constructor(position){
        this.position = position;
    }
    @action createMap(mapObj){
        this._map = new AutoMap(mapObj);
    }
    @observable _map;


    //  默认的地址为首页的地址
    @computed get defCurrent(){
        return this.position.homePageAddress;
    }


    @action setBeforeAddress(addressInfo){
        this._beforeAddress = addressInfo;
    }
    //  编辑地址时的地址
    @observable _beforeAddress = {};
    @computed get beforeAddress(){
        return this._beforeAddress;
    }


    //  地图拖动
    @action dragMap(){
        this._map.dragSiteSelection();
        this._selectedAddress = this._map.showLocationInfo
    }


    //  搜索地址的展示列表
    @action searchAddressList(str){
        this._map.autoComplete(str);
        this._autoCompleteList = this._map._searchAddressList;
    }
    @observable _autoCompleteList = [];
    @computed get autoCompleteList(){
        return this._autoCompleteList;
    }


    //  主动选择地址
    @action selectedInputAddress(address){
        if(typeof address === "string"){
            this._map.searchAddressDetail(address);
            this._selectedAddress = this._map.showLocationInfo;
        }else{
            this._selectedAddress = address;
        }
    }
    //  主动选择的地址
    @observable _selectedAddress = {};
    @computed get selectedAddress(){
        return this._selectedAddress;
    }


    //  显示的地址
    @computed get addressInfo(){
        if(this._selectedAddress.receiveAddress){
            return this._selectedAddress;
        }
        if(this._beforeAddress.receiveAddress){
            return this._beforeAddress;
        }

        return this.defCurrent;
    }





    @observable _userInfo = {};
    @computed get userInfo(){
        return this._userInfo;
    }


    //  设置姓名
    @action setName(name){
        this._userInfo.name = name;
    }
    //  设置电话
    @action setNum(phoneNum){
        this._userInfo.phoneNum = phoneNum;
    }


    @observable _tag = {};


    //  设置地址
    @action setSpeAddress(address){
        this.speAddress = address;
    }



    //  设置 标签
    @action setTag(tag){
        if(tag.selected){
            this._tag = tag;
        }else{
            this._tag = {};
        }

    }
    @computed get tag(){
        return this._tag;
    }
}


module.exports = CustomAddress;

