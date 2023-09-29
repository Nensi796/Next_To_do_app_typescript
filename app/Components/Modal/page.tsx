import { Dispatch, DispatchWithoutAction, SetStateAction, useEffect, useState } from "react";
import { Modal } from 'antd';
import { log } from "console";
interface IAddModal {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    getData: (value: ITask[]) => void;
    editReord?: ITask;
    setEditRecord?: Dispatch<SetStateAction<ITask>>;
    isDelete?:boolean;

}


export interface ITask {
    taskTitle: string;
    priority: string[]
}

export default function AddTaskModal({ isOpen, setOpen, getData, editReord,isDelete }: IAddModal) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [task, setTask] = useState<ITask>({ taskTitle: "", priority: [] })
    const [allTasks, setAllTasks] = useState<ITask[]>(JSON.parse(localStorage.getItem("tasks") as string) || [])

    useEffect(() => {
        if (editReord) setTask(editReord)
        // else setTask({ taskTitle: "", priority: [] })
    }, [editReord])

    const handleOk = () => {
        setConfirmLoading(true);
        

        if (editReord) {
            const updated = allTasks.map((item, index) => { if (item?.taskTitle?.toLocaleLowerCase() === editReord?.taskTitle?.toLocaleLowerCase()) return task; else return item });
            setAllTasks(updated);
            localStorage.setItem("tasks", JSON.stringify(updated));
        }
        else {
            setAllTasks([...allTasks, task])
            getData([...allTasks, task]);
            localStorage.setItem("tasks", JSON.stringify([...allTasks, task]));
        }
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 1000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleInputChange = (e: any) => {
        setTask({ ...task, [e.target.name]: e.target.value });

    }

    const handlePrioriyChange = (e: any) => {
        console.log(e.target.checked);
        if (!editReord?.priority?.includes(e.target.value) || !task?.priority?.includes(e?.target?.value)) {

            setTask({ ...task, priority: [...task.priority, e.target.value] })
        }
        if (!editReord && !task?.priority?.includes(e?.target?.value)) {
            // debugger
            setTask({ ...task, priority: [...task.priority, e.target.value] })
        }
        if (editReord?.priority?.includes(e.target.value) || task?.priority?.includes(e?.target?.value)) { setTask({ ...task, priority: task?.priority?.filter((item) => item?.toLocaleLowerCase() !== e?.target?.value?.toLocaleLowerCase()) }) }


    }

    console.log(task);


    return (
        <Modal
            title="Add Task"
            open={isOpen}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <div className="flex flex-col gap-2 ">
                <label htmlFor="Task" className="font-bold">Task</label>
                <input className="  shadow-md !shadow-gray-700	 p-[10px] rounded-lg border-0" value={task?.taskTitle} type="text" id="tst1" onChange={(e) => handleInputChange(e)} name="taskTitle"></input>

                <label htmlFor="priority" className="font-bold">Priority</label>

                <div className="flex">

                    <input className="cl-custom-check-first" id="marking_01" type="checkbox" checked={task?.priority?.includes('High')} value="High" onChange={(e) => handlePrioriyChange(e)} />
                    <label className="cl-custom-check-first-label" htmlFor="marking_01" title="High" >High</label>
                    <input className="cl-custom-check-second" id="marking_02" type="checkbox" value="Medium" checked={task?.priority?.includes("Medium")} onChange={(e) => handlePrioriyChange(e)} />
                    <label className="cl-custom-check-second-label" htmlFor="marking_02" title="Medium" >Medium</label>
                    <input className="cl-custom-check-third" id="marking_03" type="checkbox" value="Low" checked={task?.priority?.includes('Low')} onChange={(e) => handlePrioriyChange(e)} />
                    <label className="cl-custom-check-third-label" htmlFor="marking_03" title="Low" >Low</label>
                </div>
            </div>
        </Modal>
    )
}