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
  const [resolvedMLObject, setResolvedMLObject] = React.useState<boolean>(false);

  const inputHandler: (MLInput: MetaweatherLocationObject) => void = MLInput => {
    setMLObject(MLInput);
    // setWOEID(WOEIDInput);
    setResolvedMLObject(true);
  }

  React.useEffect(() => {
    console.log('=== App.tsx ===');
  });

  return (
    <Wrapper>
      <div className={style.AppContainer}>
        {resolvedMLObject ? <Forecast MLObject={MLObject}/> : <UserPrompt inputHandler={inputHandler}/>}
      </div>
    </Wrapper>
  );
};

export default App;
