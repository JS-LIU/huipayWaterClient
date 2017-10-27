/**
 * Created by LDQ on 2017/10/23
 */
class Prepare{
    constructor(searchInfo){
        this.type = "shop";
        this.pageUrl = "/shop";
        if(searchInfo.shopId && searchInfo.productItemId){
            console.log("/productDetail");
            this.pageUrl = "/productDetail";
        }else if(searchInfo.shopId){
            this.pageUrl = "/shop";
        }
    }
}
module.exports = Prepare;