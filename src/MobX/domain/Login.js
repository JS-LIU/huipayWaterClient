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
    @observable _access_secret;
    @observable _access_token;
    // @observable _accessToken;
    // @observable _accessTokenSecret;
    // @observable _userId;

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

    @observable _isLogin = false;
    @computed get isLogin(){
        return this._isLogin;
    }

    constructor(){

        this._phoneNum = "";
        this._app_key = "b5958b665e0b4d8cae77d28e1ad3f521";
        this.countDownTextInit = "获取验证码";
        this.countDown = new CountDown(3,0,-1,this.countDownTextInit);
        // this.appSecret = "71838ae252714085bc0fb2fc3f420110";
        // this.loginType = 'weixin';
        // this.os = 'web';
        // this.version = "1.0.0";
        // this.sign = "";
        // let self = this;
        // /**
        //  * 设置基础AccessInfo
        //  * 用于获取MD5Key
        //  * @param account_num
        //  * @param loginType
        //  * @param os
        //  * @param version
        //  * @returns {{accessInfo: {access_token: string, account_num: *, app_key: string, loginType: string, os: string, version: string}}}
        //  */
        // this.setBaseAccessInfo = function(account_num,loginType = 'weixin' ,os = 'web',version="1.0.0"){
        //     self.account_num = account_num;
        //     self.loginType = loginType;
        //     self.os = os;
        //     self.version = version;
        //     return {
        //         accessInfo:{
        //             access_token:"",
        //             account_num:account_num,
        //             app_key:this.appKey,
        //             loginType:loginType,
        //             os:os,
        //             version:version
        //         }
        //     }
        // };
        // //  设置 获取 MD5Key 的 signature
        // this.calcSetMd5KeySignature = function(){
        //     return hex_md5(this.appSecret);
        // };
        //
        // //  密码
        // this.calcPwd = function(account_num,pwd,Md5Key){
        //     return hex_md5(account_num + pwd + Md5Key).toUpperCase();
        // };
        //
        // //  登录时候的 signature
        // this.calcLoginSignature = function(account_num,pwd,Md5Key){
        //     let realPwd = this.calcPwd(account_num,pwd,Md5Key);
        //     return hex_md5(this.appSecret + realPwd);
        // };
        //
        // this.getMd5Key = function(accessInfo){
        //     return self.ajax.save({action:"getMd5Key"},accessInfo)
        // }.before(function(accessInfo){
        //     accessInfo.accessInfo.signature = this.calcSetMd5KeySignature();
        // });
        // this.ajax = _h.ajax.resource('/login');
        // this.login = function(accessInfo,account_num,pwd,Md5Key){
        //     return self.ajax.save({action:'login'},accessInfo)
        // }.before(function(accessInfo,account_num,pwd,Md5Key){
        //     accessInfo.accessInfo.signature = this.calcLoginSignature(account_num,pwd,Md5Key);
        // });

        this.checkCheckCode = function(){

        }
    }

    @observable _isRegister = false;


    //  手机号登录接口
    @action clientLogin(history){

        // let accessInfo = this.setBaseAccessInfo(account_num ,loginType,os ,version);
        // this.getMd5Key(accessInfo).then((Md5Data)=>{
        //     let Md5Key = Md5Data.data;
        //
        //     this.login(accessInfo,account_num,pwd,Md5Key).then((data)=>{
        //         this._isLogin = true;
        //
        //         this._userId = data.user_id;
        //         this._accessToken = data.token.access_token;
        //         this._accessTokenSecret = data.token.access_token_secret;
        //         this._phoneNum = data.phone_num;
        //         this._sex = data.sex;
        //         this._nickName = data.nick_name;
        //     });
        // });
        let postData = {
            accessInfo:{
                app_key:this._app_key
            },
            phoneNum:this._phoneNum
        };
        _h.ajax.resource('/login').save({},postData).then((loginInfo)=>{
            console.log(loginInfo);
            this._access_secret = loginInfo.access_secret;
            this._access_token = loginInfo.access_token;
            this._isLogin = true;

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
            //  todo 获取验证码
        }
    }
    //  设置电话号码
    @action setPhoneNum(phoneNum){
        this._phoneNum = _h.valid.trimAllBlank(phoneNum);
    }

    //  是否可以点击获取验证码
    @computed get canGetCheckCode(){
        return (_h.valid.validPhoneNum(this._phoneNum) && (this.time === this.countDownTextInit));
    }
}

module.exports = Login;