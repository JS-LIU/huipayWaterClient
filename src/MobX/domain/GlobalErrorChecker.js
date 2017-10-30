/**
 * Created by LDQ on 2017-10-28
 */
class GlobalErrorChecker{
    constructor(){
        this.loginError = "需要用户正式登录";
    }
    checkError(errorMsg,history){
        switch (errorMsg){
            case this.loginError:
            {
                history.replace('/shop');
                return true;
            }
            default:
                return false;
        }


    }
}
const globalErrorChecker = new GlobalErrorChecker();

module.exports = globalErrorChecker;