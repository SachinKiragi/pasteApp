import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { FaCopy } from "react-icons/fa";
import toast from 'react-hot-toast';

const Home  = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);

  useEffect(()=>{
    if(pasteId){
      const index = pastes.findIndex((p) => p._id==pasteId);
      console.log("paste: ", index);
      setTitle(pastes[index].title);
      setValue(pastes[index].content);
    }
  }, [])
  
  function getMonth(id){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"]
    return months[id]
  }

  function createPaste(){
    if(title=="" || value==""){
      toast.error("Fields Can't Be Empty!", {position:'top-right'})
      return;
    }
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: getMonth(new Date().getMonth()) + " " + new Date().getDate() + ", " + new Date().getFullYear(),
    }

    if(pasteId){
      dispatch(updateToPastes(paste))
    } else{
      dispatch(addToPastes(paste))
    }

    setTitle('');
    setValue('');
    setSearchParams({});

  }

  return (
   <div className='w-[70%] m-auto mt-[2rem]'>
     <div className='flex flex-row justify-between'>
      <input
       className='font-semibold h-10 p-2 border border-gray-400 rounded-[0.2rem]  !text-black place-content-evenlymt-2 w-[80%] pl-5 outline-0'
       type="text"
       placeholder='Title'
       value={title}
       onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createPaste} className='h-10 rounded-[0.5rem] w-[16%] !text-white bg-blue-800 cursor-pointer hover:bg-blue-900'>
        {
          pasteId ? "Update Paste" : "Create My Paste"
        }
      </button>

    </div>
    <div className='mt-8 border min-h-[400px] rounded-[0.3rem] border-gray-400'>
      <div className='flex justify-between p-3 h-10 items-center border-b border-b-gray-400'>
        <div className='h-[1rem] flex items-center gap-2'>
          <div className='h-[1rem] w-[1rem] bg-red-500 rounded-full'/>
          <div className='h-[1rem] w-[1rem] bg-yellow-500 rounded-full'/>
          <div className='h-[1rem] w-[1rem] bg-green-500 rounded-full'/>
        </div>
        <div>
          <button onClick={() => {
            navigator.clipboard.writeText(value)
            toast.success("content copied successulyy", {
              position: "top-right"
            })
          }} className='h-7 w-7 flex justify-center items-center rounded-full cursor-pointer'>
           <FaCopy />
          </button>
        </div>
      </div>
      <textarea 
      className='!text-black rounded-2xl mt-1 h-[400px] min-w-[100%] p-4 outline-0 resize-none font-semibold' name="" id="" 
      value={value}
      placeholder='Write Your Content Here'
      onChange={(e) => setValue(e.target.value)}
      />
    </div>
   </div>
  )
}

export default Home