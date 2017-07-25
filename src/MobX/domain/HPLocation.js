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
            return _h.ajax.resource('/location/common/city/:action').save({action:"getCitys"},postInfo)
        }.before((postInfo)=>{
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
        this.getCities = function(){

        }
    }
    getProvinceList(pageNo = 0,size = 100,sortProperties = [],direction = "DESC"){
        let postData = {
            pageInfo:{
                direction:direction,
                pageNo:pageNo,
                size:size,
                sortProperties:[]
            }
        };
        this.getProvinces(postData).then((data)=>{
            console.log('hpLocation======',data);
        })
    }
}
module.exports = HPLocation;