import React from 'react';

const WeatherBackground = (props) => {
    const { weather } = props;
    return(
        <div className="clear-skies">
            {props.children}
        </div>
    )
}

export default WeatherBackground;