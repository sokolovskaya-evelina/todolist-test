import {createEvent, createStore} from "effector";
import {TaskType} from "../App";
import {v1} from "uuid";

export const addTask = createEvent<TaskType>()
export const updateTaskText = createEvent<TaskType>()

export const $tasks = createStore<Array<TaskType>>([
    {id: v1(), text: 'Задача 1', tags: []},
    {id: v1(), text: 'Задача 2', tags: []},
    {id: v1(), text: 'Задача 3', tags: []}
]).on(addTask, (state, task: TaskType) => [...state, task]).on(updateTaskText, (state, task: TaskType) => {
    return state.map(item => {
        if (item.id === task.id) {
            return {
                ...item,
                text: task.text
            };
        } else {
            return item;
        }})
})
