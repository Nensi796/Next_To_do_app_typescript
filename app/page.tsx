"use client"

import { Button, Modal } from 'antd'
import { useEffect, useState } from 'react';
import AddTaskModal, { ITask } from './Components/Modal/page';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [editRecord, setEditRecord] = useState<ITask>();


  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks") as string) || [])
  }, [open])

  const handleeDelete = (ind: number) => {
    setTasks(tasks.filter((item, index) => index !== ind));
    localStorage.setItem("tasks", JSON.stringify(tasks.filter((item, index) => index !== ind)))
  }

  return (
    <main className="flex min-h-screen flex-col  items-center justify-between p-24 bg-[#f0f2f5]">
      <div className='w-[70vw] m-auto'>
        <div className='flex justify-between items-center mb-5'>
          <h1>Tasks</h1>
          <Button className='bg-[#713fff] text-white font-bold hover:!text-white hover:!border-white ' onClick={() => setOpen(true)} >Add Task</Button>
        </div>
        {tasks.map((item, index) => {
          return (<div onClick={() => setEditRecord(item)} className='  test bg-[#ffffff] p-[20px] rounded-lg flex justify-between items-center mt-5'>
            <div className='flex flex-col gap-2'>

              <p className='text-[#91929e] font-bold'>Task</p>
              <p className='text-[#000000] font-semibold'>{item?.taskTitle}</p>
            </div>
            <div className='flex flex-col gap-2'>

              <p className='text-[#91929e] font-bold'>Priority</p>
              <p className='text-[#000000] font-semibold'>{item?.priority?.join(" ")}</p>
            </div>
            <div>
              <BiEdit onClick={() => { setOpen(true) }} className="text-[40px] !text-[#00ff00]" />
            </div>
            <div>
              <RiDeleteBin6Line onClick={() => handleeDelete(index)} className="text-[40px] !text-[#ff0000]" />
            </div>
          </div>)
        })}
      </div>
      <AddTaskModal editReord={editRecord as ITask} isOpen={open} setOpen={setOpen} getData={(e) => setTasks(e)} />
    </main>
  )
}
