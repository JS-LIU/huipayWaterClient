import React, {Component} from 'react';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let window_w = document.body.clientWidth;
        let carouselNodeStyle = {
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            height:'100%',
            width:window_w+'px'
        };
        let carouselNodes = this.props.list.map((item,index)=>{
            return (
                <li key={index} style={carouselNodeStyle}>
                    <img src={item.img} alt="" className="w"/>
                </li>
            )
        });
        let bigWidth = window_w * this.props.list.length;
        return (
            <div
                style={this.props.style}
                className={this.props.className}
                onClick={this.props.onClick}
            >
                <ul style={{
                    width:bigWidth+'px',
                    height:'100%'
                }}>
                    {carouselNodes}
                </ul>


            </div>
        );
    }

}
module.exports = Carousel;