import React from 'react';
import style from './UserPrompt.module.css';

type UserPromptProps = {
    submissionHandler: (locatinInput: string) => void
}

const UserPrompt: React.FC<UserPromptProps> = ({ submissionHandler }) => {

    const inputRef = React.useRef<HTMLInputElement>(null);

    const [locationInput, setLocationInput] = React.useState<string>("");

    const executeHandler: () => void = () => {
        submissionHandler(locationInput);
    }

    const inputHandler: (e:React.ChangeEvent<HTMLInputElement>) => void = e => {
        setLocationInput(e.target.value);
    }

    React.useEffect(() => { inputRef && inputRef.current && inputRef.current.focus() }, []);

    return (
        <div className={style.UserPromptContainer}>
            <p>Enter your location!</p>
            {/* latitude input with value x such that -90 < x < 90 */}
            {/* longitude input with value y such that -180 < y < 180 */}
            <input
                type="text"
                className={style.UserPromptInput}
                onChange={inputHandler}
                ref={inputRef}
                value={locationInput}
            />
            <button className={style.UserPromptSubmitButton} onClick={executeHandler}>
                Submit
            </button>
        </div>
    );
};

export default UserPrompt;
