import React,{useState,useEffect} from 'react'
import { BsTrash } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import AOS from 'aos';
import 'aos/dist/aos.css';
;

AOS.init();

const getTodos=()=>{
    let lists=localStorage.getItem('todos')
    return lists ? JSON.parse(localStorage.getItem('todos')):[]
}

const Todo = () => {
    const [input,setInput]=useState("");
    const [todo, setTodo]=useState(getTodos());

    const handleClick = (event) => {
        event.preventDefault()
        setTodo([...todo, input])
        setInput("")
    }

    const handleDelete = (id) => {
        const updatedList = todo.filter((element, index) => {
            return index !== id
        })
        return setTodo(updatedList)
    }


    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date();
    let dayName = days[d.getDay()];
    const currentYear = new Date().getFullYear()


    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(todo))
    },[todo])
    

    return (
        <div className="bg-white rounded-xl shadow-xl p-8 box-border my-12" data-aos="zoom-in-up" data-aos-duration="5000">
            <div className="py-6">
            <h1 className="text-3xl">{`${dayName} ${currentYear}`}</h1>
               <h5 className="py-2 text-xl font-semibold text-blue-700">{todo.length} tasks</h5>
            </div>
            <form className="flex flex-row items-center ">
                <input type="text" placeholder="Enter task"  type="text"  placeholder="Write todo" value={input} name="input" onChange={(event) => setInput(event.target.value)} className=" flex flex-row border border-gray-500 hover:border-blue-400 px-2 py-3 outline-none  rounded-lg "/>
                <button type="submit" onClick={handleClick}>
                    <HiOutlinePlus className="text-green-100 bg-green-500 rounded-xl ml-4 text-5xl"/>
                </button>
            </form>
            <div className="flex flex-col-reverse overflow-y-hidden">
                    {todo.map((element, id) => {
                        return (
                            <>
                                <div className="todos flex flex-row items-center py-4 px-5 bg-white shadow-xl text-gray-700 my-4 rounded-lg" key={id}>
                                    <span className="overflow-hidden  flex flex-grow"
                                    >{element}</span>
                                    <BsTrash className="text-2xl hover:text-red-700 cursor-pointer" onClick={() => handleDelete(id)} />
                                </div>
                            </>
                        )
                    })}
                </div>
        </div>
    ) 
}

export default Todo

