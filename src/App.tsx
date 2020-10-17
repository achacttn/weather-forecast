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

  React.useEffect(()=>{
    document.title = "Weather Widget";
  }, []);
  
  const [MLObject, setMLObject]                 = React.useState<MetaweatherLocationObject>();
  const [resolvedMLObject, setResolvedMLObject] = React.useState<boolean>(false);

  const inputHandler: (MLInput: MetaweatherLocationObject) => void = MLInput => {
    setMLObject(MLInput);
    setResolvedMLObject(true);
  }

  return (
    <Wrapper>
      <div className={style.AppContainer}>
        {resolvedMLObject ? <Forecast MLObject={MLObject}/> : <UserPrompt inputHandler={inputHandler}/>}
      </div>
    </Wrapper>
  );
};

export default App;
