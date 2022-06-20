import React from 'react';
import styles from './App.module.scss'
import {$store, storeType} from "./stateManagement/effector";
import {useStore} from "effector-react";
import AddTaskButton from "./components/AddTaskButton/AddTaskButton";
import Tags from "./components/Tags/Tags";
import SearchByTagsInput from "./components/SearchByTagsInput/SearchByTagsInput";
import Tasks from "./components/Tasks/Tasks";


const App = () => {
    const tasks = useStore<storeType>($store).filteredTasks;

    return (
        <>
            <header className={styles.headerContainer}>
                <div className={styles.wrapper}>
                    <SearchByTagsInput/>
                </div>
            </header>
            <main className={styles.mainContainer}>
                <div className={styles.wrapper}>
                    <div className={styles.tagsContainer}>
                        <Tags/>
                    </div>
                    <div className={styles.tasksContainer}>
                        {tasks.length !== 0
                            ? <Tasks/>
                            : <div className={styles.empty}>Задачи не найдены</div>
                        }
                    </div>
                </div>
                <AddTaskButton/>
            </main>
        </>
    );
};

export default App;
