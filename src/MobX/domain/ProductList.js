/**
 * Created by LDQ on 2017/7/14.
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class ProductList{
    constructor(login,shopInfo){
        let self = this;
        this.login = login;
        this.shopInfo = shopInfo;
        self.getProductList = function(postInfo){
            return _h.ajax.resource('/merchant/client/shop/:action')
                .save({action:"shopProducts"},postInfo,false)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
    }
    @observable content = [];
    @observable last = false;
    @observable pageNo = 1;

    //  这个接口的 sortProperties direction 字段都没有用
    @action getList(pageNo,size = 5,sortType,sortProperties = [],direction = "" ){
        let self = this;
        let postData = Object.assign(this.shopInfo,{
            pageInfo:{
                direction:direction,
                pageNo:pageNo,
                size:size,
                sortProperties:[]
            }
        });
        self.getProductList(postData).then((data)=>{
            self.content = data.content;
            self.pageNo = data.pageNo;
            self.last = data.last;
        });

    }
}

module.exports = ProductList;