import React from 'react';
import style from './Forecast.module.css';

type ForecastProps = {
    WOEID: number;
}

const Forecast: React.FC<ForecastProps> = ({ WOEID }) => {
    // /api/location/search/?lattlong=(latt),(long)
    // /api/location/search/?query=(query)

    const requestHandler: () => void = async () => {
        try {
            let weatherRequest = await fetch(`https://metaweather.com/api/location/search/?query=${WOEID}`, {
            // let weatherRequest = await fetch('https://www.metaweather.com/api/location/2487956/', {
                headers: {
                    'Content-type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }
            });
            let rawData = await weatherRequest.json();
            console.log('rawData: ', rawData);
        } catch (error) {
            console.log(error)
            // restart button, error handling
        }
    }

    React.useEffect(() => {
        console.log('Forecast.tsx received location: ', WOEID);
    });

    // React.useEffect(() => {
    //     requestHandler();
    // });

    React.useEffect(()=>{

    })

    return (
        <div className={style.ForecastContainer}>
            Forecast
        </div>
    );
};

export default Forecast;
