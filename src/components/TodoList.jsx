import React, { useEffect, useState } from 'react'

export default function TodoList() {
    let [todoItems,setTodoItems] = useState([]);

    useEffect(()=>{
        // let items = fetch()
        // setTodoItems([])
    },[])
  return (
    <div className="bg-black min-h-screen">
        <InputContainer setTodoItems={setTodoItems}/>
        <DisplayContainer todoItems={todoItems} setTodoItems={setTodoItems}/>
    </div>
  )
}

function InputContainer(){
    let INITIAL_DATA = {
        title : '',
        description : '',
        dueDate : '',
        status : 'pending',
        priority : 'LOW'
    }
    let [formData,setformData] = useState(INITIAL_DATA)
    function addItem(){
        console.log(formData);
        setformData(INITIAL_DATA)
    }
    return (<div className="flex flex-col gap-5">
        <input type="text" name="title" value={formData.title} className='w-fit'
        onChange={(e)=>setformData({...formData,title:e.target.value})}/>
        <input type="text" name="description" value={formData.description} className='w-fit'
        onChange={(e)=>setformData({...formData,description:e.target.value})}/>
        <input type="date" name="dueDate" value={formData.dueDate} className='w-fit'
        onChange={(e)=>setformData({...formData,dueDate:e.target.value})}/>
        <div className="text-white uppercase border-2 text-center w-fit px-5 py-2 rounded-xl" onClick={addItem}>ADD</div>
    </div>)
}

function DisplayContainer({todoItems,setTodoItems}){

    let todoElements = todoItems.map((item)=>{
        return <TodoItem key={item._id} item={item}/>
    })
    return(<>
        {todoElements}
    </>)
}  
function TodoItem({item}){
    return (<div>
        
    </div>)
}