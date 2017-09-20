/**
 * Created by LDQ on 2017/6/20.
 */
import {observable, computed,action,autorun} from "mobx";
import loginService from '../../service/loginService';


class ActiveAddress{
    constructor(autoMap){
        this.autoMap = autoMap;
    }
    @observable _info = {};
    //  首页显示地址
    @computed get info(){
        return this.resetCurrentAddress || this.current;
    }
    //  当前地址
    @observable _current = {};
    @computed get current(){
        this.getCurrentAddress();
        return this._current;
    }
    //  获取当前地址
    @action getCurrentAddress(){
        this._current.receiveAddress = "正在获取当前位置...";
        //  获取当前地址
        this.autoMap.getCurrentLocation();
        this._current = this.autoMap.showLocationInfo;
    }
    //  用户选择首页地址
    @observable _resetCurrentAddress;
    @computed get resetCurrentAddress(){
        return this._resetCurrentAddress;
    }
    //  选择首页地址
    @action selectedCurrentAddress(addressInfo){
        if(addressInfo.id){
            this._deliverAddress = addressInfo;
        }
        this._resetCurrentAddress = addressInfo;
    }

    //  实际送货地址
    @observable _deliverAddress = false;
    @computed get deliverAddress(){
        return this._deliverAddress;
    }
    @action selectedDeliverAddress(addressInfo){
        this._deliverAddress = addressInfo;
    }
}
module.exports = ActiveAddress;



























