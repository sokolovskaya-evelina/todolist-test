import React from 'react';
import styles from './App.module.scss'
import Filters from "./components/Filters/Filters";

const App = () => {
    return (
        <div className={styles.header}>
            <Filters/>
        </div>
    );
};

export default App;
