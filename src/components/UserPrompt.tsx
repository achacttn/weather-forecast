import React from 'react';
import style from './UserPrompt.module.css';

type MetaweatherLocationObject = {
    latt_long: string;
    location_type: string;
    title: string;
    woeid: number;
}

type UserPromptProps = {
    inputHandler: (MLInput: MetaweatherLocationObject) => void
}


const UserPrompt: React.FC<UserPromptProps> = ({ inputHandler }) => {

    const inputRef                          = React.useRef<HTMLInputElement>(null);
    const [locInput, setLocInput]           = React.useState<string>("");
    const [latInput, setLatInput]           = React.useState<number>(0);
    const [longInput, setLongInput]         = React.useState<number>(0);
    
    const [requireAdditionalInput, setRequireAdditionalInput]   = React.useState<boolean>(false);
    const [possibleLocations, setPossibleLocations]             = React.useState<MetaweatherLocationObject[]>([])
    
    const locInputHandler: (e:React.ChangeEvent<HTMLInputElement>) => void = e => {
        setLocInput(e.target.value);
    }

    const locHandler: () => void = async () => {
        let locRequest = await fetch(`https://96dtnqwxz5.execute-api.ap-southeast-2.amazonaws.com/wf-locationSearch?loc=${locInput}`);
        let locResult = await locRequest.json();
        console.log(locResult);
        if( locResult.length === 1 ){
            inputHandler(locResult[0].woeid)
        } else {
            setRequireAdditionalInput(true);
            setPossibleLocations(locResult);
        }
    };
    
    const latInputHandler: (e:React.ChangeEvent<HTMLInputElement>) => void = e => {
        setLatInput(Number(e.target.value));
    }
    const longInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void = e => {
        setLongInput(Number(e.target.value));
    }
    const checkValidLatLong: () => boolean = () => {
        if(( -91 < latInput && latInput < 91 ) && ( -181 < longInput && longInput < 181 )){
            return true;
        } else {
            return false
        }
    }
    
    const latlongHandler: () => void = async () => {
        let latLongRequest = await fetch(`https://96dtnqwxz5.execute-api.ap-southeast-2.amazonaws.com/wf-locationSearch?ll=${latInput},${longInput}`);
        let latLongResult = await latLongRequest.json();
        console.log(latLongResult);
        if( latLongResult.length === 1 ){
            inputHandler(latLongResult[0].woeid)
        }
    }

    const getCurrentLocation: () => void = () => {
        const geo = navigator.geolocation;
        geo.getCurrentPosition(console.log, console.log);
    }

    const selectionHandler: (MLInput:MetaweatherLocationObject) => void = (MLInput) => {
        inputHandler(MLInput);
    }
    
    React.useEffect(() => { inputRef && inputRef.current && inputRef.current.focus() }, []);

    return (
        <div className={style.UserPromptContainer}>
            <div className={style.UserPromptContent}>
                { !requireAdditionalInput ?
                    <div className={style.InputPrompt}>
                        <p>Search a city by name</p>
                        <input
                            type="text"
                            className={style.UserPromptStringInput}
                            onChange={locInputHandler}
                            ref={inputRef}
                            value={locInput}
                            placeholder={"e.g. Sydney"}
                        />
                        <button className={style.UserPromptSubmitButton} onClick={locHandler}>Search by name</button>
                        <p>or latitude/longitude</p>
                        <input
                            type="number"
                            className={style.UserPromptLatlongInput}
                            onChange={latInputHandler}
                            value={latInput}
                            min={-90}
                            max={90}
                        />
                        <input
                            type="number"
                            className={style.UserPromptLatlongInput}
                            onChange={longInputHandler}
                            value={longInput}
                            min={-180}
                            max={180}
                        />
                        <button className={style.UserPromptSubmitButton} onClick={latlongHandler} disabled={checkValidLatLong() ? false: true}>
                            Search by latlong
                        </button>
                        <p>OR</p>
                        <button className={style.UserPromptGeoButton} onClick={getCurrentLocation}>
                            Use my current location
                        </button>
                    </div>
                    :
                    <div className={style.DecisionPrompt}>
                        {
                            possibleLocations.length !== 0 ?
                            possibleLocations.map( (location, i) => (
                                <button
                                    key={i}
                                    onClick={()=>selectionHandler(location)}>
                                        { location.title }
                                </button>
                            ))
                            :
                            "No results found"
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default UserPrompt;
