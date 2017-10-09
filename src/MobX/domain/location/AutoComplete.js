/**
 * Created by LDQ on 2017/9/28
 */
import {observable, computed,action,autorun} from "mobx";

class AutoComplete{
    constructor(position,customAddress){
        this.position = position;
        this.customAddress = customAddress;
    }
    @action setStore(lastUrl){
        if(lastUrl === "/addressList"){
            this._store = this.position;
            this._currentAddress = this._store.homePageAddress;
        }
        if(lastUrl === "/autoCompleteAddress"){
            this._store = this.customAddress;
            this.showAutoCompleteList();
            this._currentAddress = this._store.addressInfo;
        }
    }

    @observable _currentAddress;
    @computed get currentAddress(){
        return this._currentAddress;
    }

    @observable _store;
    @action choose(name){
        this._store.selected(name);
    }
    @action hideAutoCompleteList(){
        this._store.hideAutoCompleteList();
    }
    @action showAutoCompleteList(){
        this._store.showAutoCompleteList();
    }

    @computed get isShowAutoCompleteList(){
        return this._store.isShowAutoCompleteList;
    }


    @action searchAddressList(name){
        this._store.searchAddressList(name);
    }
    @action searchNearAddress(lnglat){
        this._store.searchNearAddress(lnglat);
    }
    @computed get autoCompleteList(){
        return this._store.autoCompleteList;
    }
}
module.exports = AutoComplete;