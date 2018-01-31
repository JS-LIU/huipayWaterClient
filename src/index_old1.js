/**
 * Created by LDQ on 2017/12/26
 */


const React = require('react');
const ReactDom = require('react-dom');
import $ from 'jquery';

const setBaseFontSize = function(designWidth,rem2px){
    var d = window.document.createElement('div');
    d.style.width = '1rem';
    d.style.display = "none";
    var head = window.document.getElementsByTagName('head')[0];
    head.appendChild(d);
    var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
    d.remove();
    document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
    var st = document.createElement('style');
    var portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+ ((window.innerWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";
    var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((window.innerHeight/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}"
    st.innerHTML = portrait + landscape;
    head.appendChild(st);
    return defaultFontSize
};
setBaseFontSize(750,100);

function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
let shopId = GetQueryString("shopId")||1;
class ScanPay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imageUrl:"",
        }
    }
    componentWillMount(){

        $.ajax({
            type:"POST",
            url:'/huibeiwater/wxPayShopInfo',
            data:JSON.stringify({shopId:shopId}),
            contentType:'application/json; charset=utf-8',
        }).done((shopInfo)=>{
            this.setState(shopInfo)
        })
    }
    createPayOrder(){
        var data = {
            shopId:shopId,
            payRmb:this.refs.money.value * 100
        };

        $.ajax({
            type:"POST",
            url:'/huibeiwater/payOrder/create',
            data:JSON.stringify(data),
            contentType:'application/json; charset=utf-8',
        }).done((data)=>{
            localStorage.orderId = data.orderId;

            window.location.href = "http://huipay.com/huibeiwater/huipayWaterClientWap/payWay.html";
        });
    }
    render(){
        return (
            <div>
                <div style={{height:"1.6rem",display:"flex",alignItems:"center",background:"#f8f8f8"}}>
                    <div style={{display:"flex",justifyContent:"center",flexDirection:"column",marginLeft:"0.3rem",width:"1rem",height:"1rem",overflow:"hidden",borderRadius:"0.12rem"}}>
                        <img src={this.state.imageUrl} style={{width:"100%"}} alt=""/>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-around",height:"1rem",marginLeft:"0.3rem"}}>
                        <div style={{fontSize:"0.34rem"}}>{this.state.name}</div>
                        <div style={{color:"#8e8e8e"}}>商户号：{this.state.shopId}</div>
                    </div>
                </div>
                <div style={{margin:"0.4rem 0.3rem",fontSize:"0.3rem"}}>消费金额</div>
                <div style={{margin:"0 0.3rem",height:"0.9rem",fontSize:"0.42rem",lineHeight:'0.9rem',borderBottom:"0.01rem solid #E2E2E2"}}>
                    <span>￥</span>
                    <input type="number"
                           ref="money"
                           style={{outline:'none',height:"0.9rem",marginLeft:"0.2rem",fontSize:"0.42rem"}}/>
                </div>
                <div onClick={this.createPayOrder.bind(this)}
                     style={{height:"0.8rem",margin:"1.3rem 0.3rem",color:"#FFF",lineHeight:"0.8rem",textAlign:"center",borderRadius:"0.05rem",background:"#ff5050"}}>确认付款</div>
            </div>
        )
    }
}

ReactDom.render(
    <ScanPay/>
    ,document.getElementById('root')
);
