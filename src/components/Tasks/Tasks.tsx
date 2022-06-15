import React from 'react';
import {TaskType} from "../../App";
import Task from "./Task";
import styles from './Tasks.module.scss'

interface ITasks {
    tasks: Array<TaskType>
}

const Tasks: React.FC<ITasks> = ({tasks}) => {
    return (
        <div className={styles.wrapper}>
            {tasks.map((task) => <Task key={task.id} task={task}/>)}
        </div>
    );
};

export default Tasks;
