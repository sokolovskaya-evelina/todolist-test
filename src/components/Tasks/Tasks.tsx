import React from 'react';
import {$store, storeType} from "../../stateManagement/effector";
import {useStore} from "effector-react";
import Task from "./Task";


const Tasks = () => {
    const tasks = useStore<storeType>($store).filteredTasks

    return (
        <>
            {tasks.map((task => <Task key={task.id} task={task}/>))}
        </>
    );
};

export default Tasks;
