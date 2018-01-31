/**
 * Created by LDQ on 2017/10/23
 */
class Prepare{
    constructor(searchInfo){
        this.type = "shop";
        this.pageUrl = "/shop";
        if(searchInfo.shopId && searchInfo.productItemId){
            this.pageUrl = "/productDetail";
        }else if(searchInfo.isToWaterTickets){
            this.pageUrl="/waterTickets";
        }else if(searchInfo.shopId){
            this.pageUrl = "/shop";
        }
    }
}
module.exports = Prepare;