/**
 * Created by LDQ on 2017/7/4.
 */
import {observable, computed,action} from "mobx";
import {hex_md5} from '../../Util/md5';
import {HB_uuid} from '../../Util/uuid';

import _h from '../../Util/HB';

import loginService from '../service/loginService';
class Login{
    @observable loginInfo = {};
    @observable access_token;
    @observable access_token_secret;
    @observable head_img = "";
    @observable nick_name = "汇贝送水客户";
    @observable sex = "男";
    @observable user_id;


    constructor(){
        let self = this;
        this.appKey = "b5958b665e0b4d8cae77d28e1ad3f521";
        this.appSecret = "71838ae252714085bc0fb2fc3f420110";
        this.account_num = "";
        this.loginType = 'weixin';
        this.os = 'web';
        this.version = "1.0.0";

        this.sign = "";
        // this.ajax = _h.ajax.resource('/user/client/:action');
        this.setBaseAccessInfo = function(account_num,loginType = 'weixin' ,os = 'web',version="1.0.0"){
            self.account_num = account_num;
            self.loginType = loginType;
            self.os = os;
            self.version = version;
            return {
                accessInfo:{
                    access_token:"",
                    account_num:account_num,
                    app_key:this.appKey,
                    loginType:loginType,
                    os:os,
                    version:version
                }
            }
        };
        this.calcSetMd5KeySignature = function(){
            return hex_md5(this.appSecret);
        };
        this.calcPwd = function(account_num,pwd,Md5Key){
            return hex_md5(account_num + pwd + Md5Key).toUpperCase();
        };
        this.calcLoginSignature = function(account_num,pwd,Md5Key){
            let realPwd = this.calcPwd(account_num,pwd,Md5Key);
            return hex_md5(this.appSecret + realPwd);
        };
        this.getMd5Key = function(accessInfo){
            return _h.ajax.resource('/user/client/:action').save({action:"getMd5Key"},accessInfo)
        }.before(function(accessInfo){
            accessInfo.accessInfo.signature = this.calcSetMd5KeySignature();
        });

        this.login = function(accessInfo,account_num,pwd,Md5Key){
            return _h.ajax.resource('/user/client/:action').save({action:'login'},accessInfo)
        }.before(function(accessInfo,account_num,pwd,Md5Key){
            accessInfo.accessInfo.signature = this.calcLoginSignature(account_num,pwd,Md5Key);
        });
    }

    @action clientLogin(account_num,pwd ,loginType = 'weixin',os = 'web',version = '1.0.0'){

        let accessInfo = this.setBaseAccessInfo(account_num ,loginType,os ,version);
        let self = this;
        this.getMd5Key(accessInfo).then((Md5Data)=>{
            let Md5Key = Md5Data.data;

            this.login(accessInfo,account_num,pwd,Md5Key).then(function(data){
                console.log(data);
                self.loginInfo = data;
                loginService.trigger('loginSucc',this.postDataAccessInfo);
            });

        });
    }
    @computed get postDataAccessInfo(){

        return {
            access_token: this.access_token,
            account_num: this.account_num,
            app_key: this.appKey,
            loginType: this.loginType,
            os: this.os,
            signature:hex_md5(this.appSecret + '&' +  this.access_token_secret),
            version: this.version
        }
    }
}

module.exports = Login;