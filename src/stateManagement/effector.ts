import {createEvent, createStore} from "effector";
import {TaskType} from "../App";
import {v1} from "uuid";

export const addTask = createEvent<TaskType>()
export const updateTaskText = createEvent<TaskType>()
export const deleteTask = createEvent<string>()
// export const addTagForTask = createEvent<string>()
// export const deleteTagForTask = createEvent<string>()

export const $tags = createStore<any>({})

export type TagType = {
    id: string,
    name: string,
    color: string
}

export type storeType = {
    tasks: Array<TaskType>
    tags: {
        [key: string]: TagType
    }
}

export const $store = createStore<storeType>({
    tasks: [{id: v1(), text: 'Задача 1', tags: ['1', '2']},
        {id: v1(), text: 'Задача 2', tags: ['1']},
        {id: v1(), text: 'Задача 3', tags: ['2', '3']}
    ],
    tags: {
        '1': {id: '1', name: 'К выполнению', color: '#1B262C'},
        '2': {id: '2', name: 'В работе', color: '#0F4C75'},
        '3': {id: '3', name: 'Готово', color: '#0F4C75'},
    }
})
    .on(addTask, (state, task: TaskType) => ({...state, tasks: [...state.tasks, task]}))
    .on(updateTaskText, (state, task: TaskType) => ({
        ...state, tasks: state.tasks.map(item => {
                if (item.id === task.id) {
                    return {
                        ...item,
                        text: task.text
                    };
                } else {
                    return item;
                }
            }
        )
    }))
    .on(deleteTask, (state, taskId: string) => ({...state, tasks: state.tasks.filter(item => item.id !== taskId)}))



