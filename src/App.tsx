import React from 'react';
import style from './App.module.css';
import Wrapper from './components/layout/Wrapper';
import UserPrompt from './components/UserPrompt';
import Forecast from './components/Forecast';

type MetaweatherLocationObject = {
  latt_long: string;
  location_type: string;
  title: string;
  woeid: number;
}

const App = () => {
  // const [locationInput, setLocationInput] = React.useState<string>("");
  // const [locationInputSubmitted, setLocationInputSubmitted] = React.useState<boolean>(false);

  const [MLObject, setMLObject]           = React.useState<MetaweatherLocationObject>();
  const [WOEID, setWOEID]                 = React.useState<number>(0);
  const [resolvedWOEID, setResolvedWOEID] = React.useState<boolean>(false);

  const inputHandler: (MLInput: MetaweatherLocationObject) => void = MLInput => {
    setMLObject(MLInput);
    // setWOEID(WOEIDInput);
    setResolvedWOEID(true);
  }

  React.useEffect(() => {
    console.log('=== App.tsx ===');
  });

  return (
    <Wrapper>
      <div className={style.AppContainer}>
        {resolvedWOEID ? <Forecast WOEID={WOEID}/> : <UserPrompt inputHandler={inputHandler}/>}
      </div>
    </Wrapper>
  );
};

export default App;
