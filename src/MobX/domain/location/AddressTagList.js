/**
 * Created by LDQ on 2017/9/20
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../../Util/HB';
class AddressTagList{
    constructor(){
        this.getTags = function(postData){
            return _h.ajax.resource("/delivery/:action")
                .save({action:"tagList"},postData)
        }
    }
    @observable _tagList = [];
    @action getTagList(){
        this.getTags({}).then((data)=>{
            for(let i = 0;i < data.length;i++){
                data[i].selected = false;
            }
            this._tagList = data;
        })
    }
    @computed get tagList(){
        return this._tagList;
    }
    @action selected(tag){
        for(let i = 0 ;i < this._tagList.length;i++){

            if(this._tagList[i].id === tag.id){
                this._tagList[i].selected = !tag.selected;
            }else{
                this.tagList[i].selected = false;
            }
        }
    }
}
module.exports = AddressTagList;