/**
 * Created by LDQ on 2017/7/4.
 */
import {observable, computed,action} from "mobx";
import CountDown from './CountDown';
import {hex_md5} from '../../Util/md5';
import {HB_uuid} from '../../Util/uuid';
import _h from '../../Util/HB';

import loginService from '../service/loginService';
class Login{
    constructor(access_secret,access_token){

        this._phoneNum = "";
        this._app_key = "b5958b665e0b4d8cae77d28e1ad3f521";
        this.countDownTextInit = "获取验证码";
        this.countDown = new CountDown(3,0,-1,this.countDownTextInit);
        this._access_secret = access_secret;
        this._access_token = access_token;

    }
    @observable _access_secret;
    @observable _access_token;

    @computed get postDataAccessInfo(){
        return {
            accessInfo:{
                access_secret:this._access_secret,
                access_token:this._access_token,
                app_key:this._app_key
            }
        }
    }

    @observable _headImg = "";
    @observable _nickName = "汇贝送水客户";
    @observable _sex = "男";
    @observable _phoneNum;

    @observable _checkCode = "";
    @computed get headImg(){
        return this._headImg;
    }
    @computed get nickName(){
        return this._nickName;
    }
    @computed get sex(){
        return this._sex;
    }
    @computed get phoneNum(){
        return this._phoneNum;
    }
    @computed get checkCode(){
        return this._checkCode;
    }
    @observable _isLogin = false;
    @computed get isLogin(){
        return this._isLogin;
    }

    @observable _isRegister = false;


    //  手机号登录接口
    @action clientLogin(history){
        let postData = {
            accessInfo:{
                app_key:this._app_key
            },
            phoneNum:this._phoneNum,
            checkCode:this._checkCode
        };
        console.log(postData);
        _h.ajax.resource('/login').save({},postData).then((loginInfo)=>{
            console.log(loginInfo);
            this._access_secret = loginInfo.access_secret;
            this._access_token = loginInfo.access_token;
            this._isLogin = true;
            localStorage.access_secret=this._access_secret;
            localStorage.access_token = this._access_token;


            //  页面跳转
            history.replace('/shop');
        }).catch((data)=>{
            console.log(data);
            alert('验证码错误');
        })

    }

    //  倒计时按钮文字
    @computed get time(){
        return this.countDown.time;
    }

    //  点击获取验证码
    @action getCheckCode(){
        if(this.canGetCheckCode){
            //  开始倒计时
            this.countDown.start();
            //  获取验证码
            _h.ajax.resource('/checkCode/login').save({},{phoneNum:this.phoneNum}).then((data)=>{
            }).catch((data)=>{
                console.log(data);
                alert('验证码获取失败，请检查网络');
            })

        }
    }
    //  设置电话号码
    @action setPhoneNum(phoneNum){
        let num = _h.valid.trimAllBlank(phoneNum);
        if(num.length <= 11){
            this._phoneNum = num;
        }
    }
    @action setCheckCode(checkCode){
        this._checkCode = checkCode;
    }

    //  是否可以点击获取验证码
    @computed get canGetCheckCode(){
        return (_h.valid.validPhoneNum(this._phoneNum) && (this.time === this.countDownTextInit));
    }
}

module.exports = Login;