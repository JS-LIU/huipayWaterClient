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
        this.currentMap.getCurrentLocation();
        this._current = this.currentMap.showLocationInfo;
    }
    @computed get current(){
        if(!this._current){
            this.getCurrentMap()
        }
        return this._current;
    }
    @action selectedHomeAddress(str){
        this.searchMap.searchAddressDetail(str);
        this._homeSelectedAddress = this.searchMap.showLocationInfo;
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