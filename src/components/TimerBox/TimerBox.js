import React from 'react';
import './TimerBox.css';

const Box = (props) => {
    return (
        <div className="box">
            <span className="box-time">{props.timeLeft}</span>
            <span className="box-label">{props.boxLabel}</span>
        </div> 
    )
};

export default Box;