import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Modal from "../Modal/Modal";
import Tag from "../../components/Tag/Tag";
import {TaskType} from "../types";
import {$store, storeType} from "../../stateManagement/effector";
import {useStore} from "effector-react";
import styles from "./TaskEditorModal.module.scss"
import {WITHOUT_TAGS} from "../constants";

interface ITaskEditorModal {
    title: string
    isOpenModal: boolean
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
    task: TaskType
    onSave: (task: TaskType) => void
}

const TaskEditorModal: React.FC<ITaskEditorModal> = ({task, setIsOpenModal, isOpenModal, onSave, title}) => {
    const tags = useStore<storeType>($store).tags;
    const [currentTask, setCurrentTask] = useState<TaskType>({...task, tagIds: [...task.tagIds]})
    const [isWarning, setIsIsWarning] = useState<boolean>(false)

    useEffect(() => {
        if (isOpenModal) setCurrentTask({...task, tagIds: [...task.tagIds]})
    }, [isOpenModal, task])

    const getTagIds = () => {
        if (currentTask.tagIds.includes(WITHOUT_TAGS) && currentTask.tagIds.length === 1) return [WITHOUT_TAGS]
        if (currentTask.tagIds.length === 0) return [WITHOUT_TAGS]
        if (currentTask.tagIds.length > 1 && currentTask.tagIds.includes(WITHOUT_TAGS)) return [...currentTask.tagIds].filter(id => id !== WITHOUT_TAGS)
        if (currentTask.tagIds.length > 0 && !currentTask.tagIds.includes(WITHOUT_TAGS)) return [...currentTask.tagIds]
        return []
    }

    return (
        <Modal isOpenModal={isOpenModal} setOpenModal={setIsOpenModal}>
            <div className={styles.title}>{title}</div>
            <div>
                    <textarea
                        className={styles.textArea}
                        style={{borderColor: isWarning ? '#EB5353' : '#1B262C'}}
                        placeholder="Название задачи"
                        value={currentTask.text}
                        onChange={e => {
                            if (isWarning && !currentTask.text) {
                                setIsIsWarning(false)
                            }
                            setCurrentTask(prevState => ({...prevState, text: e.target.value}))
                        }}
                    />
            </div>

            <div className={styles.selectedTagsContainer}>
                Выбранные теги:
                {currentTask.tagIds.map(id =>
                    <Tag
                        key={id}
                        onDeleteTag={(tagId) => setCurrentTask(prevState => ({
                            ...prevState,
                            tagIds: prevState.tagIds.filter(id => id !== tagId)
                        }))}
                        tag={tags[id]}
                    />)
                }
            </div>
            <div className={styles.tagsContainer}>
                {Object.values(tags).map(tag =>
                    <Tag
                        key={tag.id}
                        onClick={tagId => setCurrentTask(prevState => ({
                            ...prevState,
                            tagIds: [...prevState.tagIds, tagId]
                        }))}
                        tag={tag}
                    />)}
            </div>
            <div className={styles.btnsContainer}>
                <button
                    className={styles.cancelBtn}
                    onClick={() => {
                        setCurrentTask(task)
                        setIsOpenModal(false)
                    }}
                >
                    Отмена
                </button>
                <button
                    onClick={() => {
                        if (!!currentTask.text) {
                            onSave({
                                ...currentTask,
                                tagIds: getTagIds()
                            })
                        } else {
                            setIsIsWarning(true)
                        }
                    }}
                    className={styles.saveBtn}
                >
                    Сохранить
                </button>
            </div>
        </Modal>
    );
};

export default TaskEditorModal;
