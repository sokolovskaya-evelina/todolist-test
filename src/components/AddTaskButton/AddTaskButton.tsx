import React, {useState} from 'react';
import styles from "./AddTaskButton.module.scss";
import {IconLookup} from "@fortawesome/fontawesome-svg-core";
import {addTask, filterTasksByTagId} from "../../stateManagement/effector";
import {v1} from "uuid";
import TaskEditorModal from "../../common/TaskEditorModal/TaskEditorModal";
import {WITHOUT_TAGS} from "../../common/constants";
import Icon from "../../common/Icon";

const plusIcon: IconLookup = {prefix: 'fas', iconName: 'plus'}

const AddTaskButton = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <>
            <div onClick={() => setIsOpenModal(!isOpenModal)} className={styles.addBtn} data-tooltip="Добавить задачу">
                <Icon icon={plusIcon}/>
            </div>
            <TaskEditorModal
                title="Новая задача"
                onSave={(task) => {
                    filterTasksByTagId('all')
                    addTask({...task})
                    setIsOpenModal(false)
                }}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                task={{id: v1(), text: '', tagIds: [WITHOUT_TAGS]}}/>
        </>

    );
};

export default AddTaskButton;
