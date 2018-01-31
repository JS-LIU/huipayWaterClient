/**
 * Created by LDQ on 2018/1/31
 */
import Position from './Position'


class HbMap{

    constructor(){
        this.position = new Position();
    }

    getHomeAddress(){
        return {
            fullAddress:this.position.homePageAddress.fullAddress,
            longitude:this.position.homePageAddress.longitude,
            latitude:this.position.homePageAddress.latitude,
        }
    }
}

module.exports = HbMap;