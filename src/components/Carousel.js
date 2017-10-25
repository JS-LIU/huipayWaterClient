import React, {Component} from 'react';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselListStyle:{
                display:'flex',
                flexDirection:'row',
                height:'100%',
            }
        }
    }
    autoMove(width,max){
        let time = 5000;
        this.timer = setInterval(()=>{
            let currentX = this.state.carouselListStyle.transform.match(/translateX\((.*)\)/)[1];
            let nextX = Math.abs(parseFloat(currentX) - width);
            let carouselListStyle;
            if(nextX === max){
                nextX = width;
                //  回到初始值
                let transVary = {
                    transform: "translateX("+ -nextX +"px)",
                    transitionDuration: "0ms",
                };
                carouselListStyle = Object.assign({},this.state.carouselListStyle,transVary);
                this.setState({
                    carouselListStyle:carouselListStyle
                });
                //  手动触发一次动画 否则会双倍等待时间 （因为都在setInterval中）
                transVary = {
                    transform: "translateX("+ (-nextX-width) +"px)",
                    transitionDuration: "300ms",
                };
                carouselListStyle = Object.assign({},this.state.carouselListStyle,transVary);
                this.setState({
                    carouselListStyle:carouselListStyle
                });
            }else{
                let transVary = {
                    transitionDuration: "300ms",
                    transform: "translateX("+ -nextX +"px)"
                };
                carouselListStyle = Object.assign({},this.state.carouselListStyle,transVary);
                this.setState({
                    carouselListStyle:carouselListStyle
                })
            }


        },time)
    }

    componentDidMount(){
        let window_w = document.body.clientWidth;
        let bigWidth = window_w * (this.props.list.length+2);

        let startCarouselList = {
            transform:"translateX("+ -window_w +"px)",
            width:bigWidth
        };
        let carouselListStyle = Object.assign({},this.state.carouselListStyle,startCarouselList);
        this.setState({
            carouselListStyle:carouselListStyle
        });
        this.autoMove(window_w,bigWidth);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    render() {
        let window_w = document.body.clientWidth;
        let carouselNodeStyle = {
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            height:'100%',
            flex:1
        };
        //  实际轮播的列表
        let carouselList = [...this.props.list];
        let firstItem = this.props.list[0];
        carouselList.push(firstItem);
        let lastItem = this.props.list[this.props.list.length-1];
        carouselList.unshift(lastItem);
        let carouselNodes = carouselList.map((item,index)=>{
            return (
                <li key={index} style={carouselNodeStyle}>
                    <img src={item.img} alt="" style={{width:window_w+"px"}}/>
                </li>
            )
        });

        return (
            <div
                style={this.props.style}
                className={this.props.className}
                onClick={this.props.onClick}>
                <ul style={this.state.carouselListStyle}>
                    {carouselNodes}
                </ul>
            </div>
        );
    }

}
module.exports = Carousel;