/**
 * Created by LDQ on 2017/9/25
 */
import {observable, computed,action,autorun} from "mobx";
import AutoMap from './AutoMap';

class Location{
    constructor(){
        this.currentMap = new AutoMap();
        this.searchMap = new AutoMap();
    }
    @observable _current = {};
    @action getCurrentMap(){
        this._current.receiveAddress = "正在定位...";
        this.currentMap.getCurrentLocation();
        this._current = this.currentMap.showLocationInfo;
    }
    @computed get current(){
        if(!this._current.adcode){
            this.getCurrentMap()
        }
        return this._current;
    }
    @action selectedHomeAddress(address){
        if(typeof address === "string"){
            this.searchMap.searchAddressDetail(address);
            this._homeSelectedAddress = this.searchMap.showLocationInfo;
        }else{
            this._homeSelectedAddress = address;
        }
    }

    @computed get nearAddressList(){
        this.currentMap.searchNearAddress([this._current.longitude,this._current.latitude]);
        return this.currentMap.searchAddressList;
    }


    @observable _homeSelectedAddress;
    @computed get homePageAddress(){
        if(this._homeSelectedAddress){
            return this._homeSelectedAddress;
        }else if(!this._current.receiveAddress){
            this.getCurrentMap()
        }
        return this._current;
    }
}
module.exports = Location;