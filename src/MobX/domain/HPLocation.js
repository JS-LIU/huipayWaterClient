/**
 * Created by LDQ on 2017/7/21.
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';


class HPLocation{
    constructor(login){
        let self = this;
        self.login = login;

        this.getProvinces = function(postInfo){
            return _h.ajax().resource('/location/city/:action').save({action:"getCitys"},postInfo)
        }.before((postInfo)=>{
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postInfo.userId = self.login.postDataAccessInfo.user_id;
        });
        this.getCities = function(){

        }
    }
}