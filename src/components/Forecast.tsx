import React from 'react';
import style from './Forecast.module.css';

type MetaweatherLocationObject = {
    latt_long: string;
    location_type: string;
    title: string;
    woeid: number;
}

type ForecastProps = {
    MLObject: MetaweatherLocationObject | undefined;
}

type WeatherDataObject = {
    applicable_date: string;
    weather_state_name: string;
    weather_state_abbr: string;
    max_temp: number;
    min_temp: number;
    wind_speed: number;
    wind_direction: number;
}

const Forecast: React.FC<ForecastProps> = ({ MLObject }) => {

    const [locationName, setLocationName]   = React.useState<string>();
    const [forecastData, setForecastData]   = React.useState<WeatherDataObject[]>();
    // /api/location/search/?lattlong=(latt),(long)
    // /api/location/search/?query=(query)

    const weatherHandler: (woeid:number) => void = async (woeid) => {
        let weatherRequest = await fetch(`https://6gep2gbvlg.execute-api.ap-southeast-2.amazonaws.com/wf-woeid?woeid=${woeid}`);
        let weatherResult = await weatherRequest.json();
        setForecastData(weatherResult.consolidated_weather);
    }

    React.useEffect(() => {
        console.log('=== Forecast.tsx ===');
        if( MLObject ){
            let { latt_long, location_type, title, woeid } = MLObject;
            // console.log({ latt_long, location_type, title, woeid });
            // console.log(typeof woeid);
            weatherHandler(woeid);
            setLocationName(title);

        }
    }, [MLObject]);

    return (
        <div className={style.ForecastContainer}>
            <p>Forecast!</p>
            <p>Location: { locationName }</p>
            {
                forecastData && forecastData.map( (dataObj, i) => {
                let { applicable_date, weather_state_name, weather_state_abbr, max_temp, min_temp, wind_speed, wind_direction } = dataObj;
                return (
                    <div key={i}>
                        <p>Date: { applicable_date }</p>
                        <p>{ weather_state_name }</p>
                        <img src={`https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`} alt=""/>
                        <p>High: { max_temp }</p>
                        <p>Low: { min_temp }</p>
                        <p>Wind speed: { wind_speed }</p>
                        <p>Wind direction bearing: { wind_direction }</p>
                    </div>
                )
            })
            }
        </div>
    );
};

export default Forecast;
