/**
 * Created by LDQ on 2017/6/20.
 */
import {observable, computed,action,autorun} from "mobx";
import loginService from '../../service/loginService';


class ActiveAddress{
    constructor(autoMap){
        this.autpMap = autoMap;
    }
    @observable _info = {};
    //  首页显示地址
    @computed get info(){
        return this.resetCurrentAddress || this.current;
    }
    //  当前地址
    @observable _current = "正在获取当前位置...";
    @computed get current(){
        if(this._current === "正在获取当前位置..."){
            this.getCurrentAddress();
        }
        return this._current;
    }
    //  获取当前地址
    @action getCurrentAddress(){
        //  获取当前地址
        this.autoMap.getCurrentLocation();
        this._current = this.autoMap.showLocationInfo;
    }
    //  用户选择地址
    @observable _resetCurrentAddress;
    @computed get resetCurrentAddress(){
        return this._resetCurrentAddress;
    }
    //  选择首页地址
    @action selectedCurrentAddress(addressInfo){
        this._resetCurrentAddress = addressInfo;
    }
}
module.exports = ActiveAddress;



























