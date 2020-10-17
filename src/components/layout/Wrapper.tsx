import React from 'react';
import style from './Wrapper.module.css';

type WrapperProps = {
    children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <div className={style.WrapperContainer}>
        <div className={style.WrapperContent}>
            <h1 className={style.Title}>Weather app :)</h1>
            {children}
        </div>
    </div>
);

export default Wrapper;
