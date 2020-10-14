import React from 'react';
import style from './App.module.css';
import Wrapper from './components/layout/Wrapper';
import UserPrompt from './components/UserPrompt';
import Forecast from './components/Forecast';

const App = () => {
  const [locationInput, setLocationInput] = React.useState<string>("");
  const [locationInputSubmitted, setLocationInputSubmitted] = React.useState<boolean>(false);

  const submissionHandler: (locationInput: string) => void = locationInput => {
    setLocationInput(locationInput);
    setLocationInputSubmitted(true);
  }

  React.useEffect(() => {
    console.log('=== App.tsx ===');
  });

  return (
    <Wrapper>
      <div className={style.AppContainer}>
        {locationInputSubmitted ? <Forecast location={locationInput}/> : <UserPrompt submissionHandler={submissionHandler}/>}
      </div>
    </Wrapper>
  );
};

export default App;
