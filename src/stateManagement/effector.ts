import {createEvent, createStore} from "effector";
import {v1} from "uuid";
import {TagType, TaskType} from "../common/types";
import {ALL, WITHOUT_TAGS} from "../common/constants";

export type storeType = {
    tasks: Array<TaskType>
    filteredTasks: Array<TaskType>
    tags: {
        [key: string]: TagType
    }
    selectedTagsIds: Array<string>

}

type TagForTaskType = {
    taskId: string
    tagId: string
}

const colors = [
    '#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1',
    '#9ADCFF', '#FFF89A', '#FFB2A6', '#FF8AAE',
    '#FBF46D', '#B4FE98', '#77E4D4', '#998CEB',
    '#F9989F', '#FCCB8F', '#FAF096', '#C5F8C8',
    '#EB5353', '#F9D923', '#36AE7C', '#187498'
]

const getRandomIndex = () => Math.floor(Math.random() * 20);

export const addTask = createEvent<TaskType>()
export const updateTask = createEvent<TaskType>()
export const deleteTask = createEvent<string>()
export const addTag = createEvent<TagType>()
export const deleteTag = createEvent<string>()
export const addTagForTask = createEvent<TagForTaskType>()
export const deleteTagForTask = createEvent<TagForTaskType>()
export const filterTasksByTagId = createEvent<string>()
export const updateTagIds = createEvent<string>()
export const searchByTagName = createEvent<string>()

export const $store = createStore<storeType>({
    tasks: [
        {id: v1(), text: 'Задача 1', tagIds: [WITHOUT_TAGS]},
        {id: v1(), text: 'Задача 2', tagIds: [WITHOUT_TAGS]},
        {id: v1(), text: 'Задача 3', tagIds: [WITHOUT_TAGS]}
    ],
    tags: {
        '1': {id: v1(), name: 'К выполнению', color: '#FF8AAE'},
        '2': {id: v1(), name: 'В работе', color: '#FBF46D'},
        '3': {id: v1(), name: 'Готово', color: '#B4FE98'},
    },
    filteredTasks: [
        {id: v1(), text: 'Задача 1', tagIds: [WITHOUT_TAGS]},
        {id: v1(), text: 'Задача 2', tagIds: [WITHOUT_TAGS]},
        {id: v1(), text: 'Задача 3', tagIds: [WITHOUT_TAGS]}
    ],
    selectedTagsIds: [ALL]
})
    .on(addTask, (state, task: TaskType) => ({
        ...state,
        tasks: [...state.tasks, task],
        filteredTasks: [...state.tasks, task]
    }))
    .on(updateTask, (state, task: TaskType) => ({
        ...state,
        tasks: state.tasks.map(item => {
                if (item.id === task.id) {
                    return {...item, ...task};
                } else {
                    return item;
                }
            }
        ),
        filteredTasks: state.tasks.map(item => {
                if (item.id === task.id) {
                    return {...item, ...task};
                } else {
                    return item;
                }
            }
        )
    }))
    .on(deleteTask, (state, taskId: string) => ({
        ...state,
        tasks: state.tasks.filter(item => item.id !== taskId),
        filteredTasks: state.filteredTasks.filter(item => item.id !== taskId)
    }))
    .on(addTag, (state, tag: TagType) => ({
        ...state,
        tags: {
            ...state.tags,
            [tag.id]:
                {
                    ...tag,
                    color: colors[getRandomIndex()]
                }
        },
        filteredTags: {
            ...state.tags,
            [tag.id]:
                {
                    ...tag,
                    color: colors[getRandomIndex()]
                }
        }
    }))
    .on(deleteTag, (state, tagId: string) => {
        delete state.tags[tagId]
        return {
            ...state,
            tasks: state.tasks.map(item => ({...item, tagIds: item.tagIds.filter(id => id !== tagId)})),
            filteredTasks: state.filteredTasks.map(item => ({...item, tagIds: item.tagIds.filter(id => id !== tagId)})),
        }
    })
    .on(addTagForTask, (state, payload: TagForTaskType) => ({
        ...state,
        tasks: state.tasks.map(item => {
            return item.id === payload.taskId ? {...item, tagId: payload.tagId} : item
        })
    }))
    .on(deleteTagForTask, (state, payload: TagForTaskType) => ({
        ...state,
        tasks: state.tasks.map(item => {
            return item.id === payload.taskId ? {...item, tagId: ''} : item
        })
    }))
    .on(updateTagIds, (state, tagId: string) => {
        if (tagId === ALL) return {...state, selectedTagsIds: [ALL]}
        if (state.selectedTagsIds.includes(tagId)) return {
            ...state,
            selectedTagsIds: state.selectedTagsIds.filter(id => id !== tagId)
        }
        return {...state, selectedTagsIds: [...state.selectedTagsIds, tagId].filter(id => id !== ALL)}
    })
    .on(filterTasksByTagId, (state, tagId) => {
        if (tagId.includes(ALL)) return {...state, filteredTasks: [...state.tasks]}
        const tasks = state.selectedTagsIds.map(id => [state.tasks.filter(task => task.tagIds.includes(id))]).flat(Infinity) as Array<TaskType>
        return {...state, filteredTasks: Array.from(new Set(tasks))}
    })
    .on(searchByTagName, (state, text) => {
        const findTadIds = Object.values(state.tags)
            .map(tag => tag.name.toLowerCase().startsWith(text.toLowerCase()) ? tag.id : '')
            .filter(id => !!id)
        const filteredTasks = findTadIds.flatMap(id => state.tasks.filter(task => task.tagIds.includes(id)))
        return {
            ...state,
            filteredTasks: Array.from(new Set(filteredTasks))
        }
    })

