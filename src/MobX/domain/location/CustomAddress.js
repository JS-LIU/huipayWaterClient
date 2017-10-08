/**
 * Created by LDQ on 2017/9/17
 */
import {observable, computed,action,autorun} from "mobx";
import AutoMap from './AutoMap';


class CustomAddress{

    constructor(position,tagList){
        this.position = position;
        this.tagList = tagList;
        this.tagList.getTagList();
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
        this._autoCompleteList = this._map.addressList;
    }
    @observable _autoCompleteList = [];
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
    @observable _isShowAutoCompleteList = true;
    //  是否显示搜索地址列表
    @computed get isShowAutoCompleteList(){
        return this._isShowAutoCompleteList;
    }




    //  主动选择地址
    @action selected(address){
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





    @observable _userInfo = {name:"",phoneNum:""};
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
        this.tagList.selected(tag);
    }

    @observable _canSave = false;
    @computed get canSave(){
        if(this._userInfo.name!="" && this._userInfo.phoneNum){
            return true;
        }
        return false;
    }
}


module.exports = CustomAddress;

