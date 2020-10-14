import React from 'react';
import style from './Wrapper.module.css';

type WrapperProps = {
    children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <div className={style.WrapperContainer}>
        <div className={style.WrapperContent}>
            <h1>Weather widget :)</h1>
            {children}
        </div>
    </div>
);

// export type WrapperProps = {
//     children: React.ReactNode;
// }

export default Wrapper;
