/**
 * Created by LDQ on 2017/7/14.
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class ProductList{
    constructor(login){
        let self = this;
        this.login = login;
        this.shopId = 1;
        self.getProductList = function(postInfo){
            return _h.ajax.resource('/merchant/client/shop/:action')
                .save({action:"shopProducts"},postInfo,false)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postInfo.user_id = self.login.postDataAccessInfo.user_id;
        });
    }
    @observable content = [];
    @observable last = false;
    @observable pageNo = 1;

    //  这个接口的 sortProperties direction 字段都没有用
    @action getList(pageNo,size = 5,sortType,sortProperties = [],direction = "" ){
        let self = this;
        let postData = {
            shopId:self.shopId,
            pageInfo:{
                direction:direction,
                pageNo:pageNo,
                size:size,
                sortProperties:[]
            }
        };
        self.getProductList(postData).then((data)=>{
            self.content = data.content;
            self.pageNo = data.pageNo;
            self.last = data.last;
        });

    }
}

module.exports = ProductList;