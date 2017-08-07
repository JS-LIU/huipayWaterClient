/**
 * Created by LDQ on 2017/7/4.
 */
import {observable, computed,action} from "mobx";
import {hex_md5} from '../../Util/md5';
import {HB_uuid} from '../../Util/uuid';

import _h from '../../Util/HB';

import loginService from '../service/loginService';
class Login{
    @observable _accessToken;
    @observable _accessTokenSecret;
    @observable _userId;

    @computed get postDataAccessInfo(){
        let self = this;
        return {
            accessInfo:{
                access_token: self._accessToken,
                account_num: self.account_num,
                app_key: self.appKey,
                loginType: self.loginType,
                os: self.os,
                signature:hex_md5(self.appSecret + '&' +  self._accessTokenSecret),
                version: self.version
            },
            user_id:self._userId
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
        let self = this;
        this.appKey = "b5958b665e0b4d8cae77d28e1ad3f521";
        this.appSecret = "71838ae252714085bc0fb2fc3f420110";
        this.account_num = "";
        this.loginType = 'weixin';
        this.os = 'web';
        this.version = "1.0.0";

        this.sign = "";
        this.ajax = _h.ajax.resource('/user/client/:action');

        /**
         * 设置基础AccessInfo
         * 用于获取MD5Key
         * @param account_num
         * @param loginType
         * @param os
         * @param version
         * @returns {{accessInfo: {access_token: string, account_num: *, app_key: string, loginType: string, os: string, version: string}}}
         */
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
        //  设置 获取 MD5Key 的 signature
        this.calcSetMd5KeySignature = function(){
            return hex_md5(this.appSecret);
        };

        //  密码
        this.calcPwd = function(account_num,pwd,Md5Key){
            return hex_md5(account_num + pwd + Md5Key).toUpperCase();
        };

        //  登录时候的 signature
        this.calcLoginSignature = function(account_num,pwd,Md5Key){
            let realPwd = this.calcPwd(account_num,pwd,Md5Key);
            return hex_md5(this.appSecret + realPwd);
        };

        this.getMd5Key = function(accessInfo){
            return self.ajax.save({action:"getMd5Key"},accessInfo)
        }.before(function(accessInfo){
            accessInfo.accessInfo.signature = this.calcSetMd5KeySignature();
        });

        this.login = function(accessInfo,account_num,pwd,Md5Key){
            return self.ajax.save({action:'login'},accessInfo)
        }.before(function(accessInfo,account_num,pwd,Md5Key){
            accessInfo.accessInfo.signature = this.calcLoginSignature(account_num,pwd,Md5Key);
        });
    }

    @action clientLogin(account_num,pwd ,loginType = 'weixin',os = 'web',version = '1.0.0'){

        let accessInfo = this.setBaseAccessInfo(account_num ,loginType,os ,version);
        this.getMd5Key(accessInfo).then((Md5Data)=>{
            let Md5Key = Md5Data.data;

            this.login(accessInfo,account_num,pwd,Md5Key).then((data)=>{
                this._isLogin = true;

                this._userId = data.user_id;
                this._accessToken = data.token.access_token;
                this._accessTokenSecret = data.token.access_token_secret;
                this._phoneNum = data.phone_num;
                this._sex = data.sex;
                this._nickName = data.nick_name;
            });
        });


    }

}

module.exports = Login;