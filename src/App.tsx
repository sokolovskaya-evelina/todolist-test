import React from 'react';
import styles from './App.module.scss'
import Filters from "./components/Filters/Filters";
import Tasks from "./components/Tasks/Tasks";
import {$tasks} from "./stateManagement/effector";
import {useStore} from "effector-react";

export type TaskType = {
    id: string,
    text: string,
    tags: Array<string>
}

const App = () => {
    const tasks = useStore($tasks);

    return (
        <>
            <div className={styles.header}>
                <Filters/>
            </div>
            <div className={styles.container}>
                <Tasks tasks={tasks}/>
            </div>

        </>

    );
};

export default App;
