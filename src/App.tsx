import React from 'react';
import styles from './App.module.scss'
import Filters from "./components/Filters/Filters";
import Tasks from "./components/Tasks/Tasks";
import {$store, storeType} from "./stateManagement/effector";
import {useStore} from "effector-react";

export type TaskType = {
    id: string,
    text: string,
    tags: Array<string>
}

const App = () => {
    const store = useStore<storeType>($store);

    return (
        <>
            <div className={styles.header}>
                <Filters/>
            </div>
            <div className={styles.container}>
                <Tasks tasks={store.tasks}/>
            </div>

        </>

    );
};

export default App;
