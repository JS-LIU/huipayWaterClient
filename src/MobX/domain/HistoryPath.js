class HistoryPath{
    constructor(){
        this.list  = [];
    }

    /**
     * @param location
     */
    put(location){
        //  todo 如果 location.pathname 和location.state相等则不推入

        this.list.push(location);
    }

    /**
     * 从 【数组（参数 tarList）】 中找到距离当前页面最近的一个地址
     * @param tarList 数组
     */
    nearest(tarList){
        for(let i = this.list.length - 1;i >= 0;i--){
            for(let j = 0,len = tarList.length;j < len ;j++){
                if(this.list[i] === tarList[j]){
                    return tarList[j];
                }
            }
        }
        return null;
    }
}
module.exports = HistoryPath;