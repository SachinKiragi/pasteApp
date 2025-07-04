import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaCopy } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom'

const ViewPaste = () => {

  const pasteId = useParams().id;
  const [paste, setPaste] = useState();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(()=>{
    const currPaste = allPastes.find((p) => p._id==pasteId)
    setPaste(currPaste);
    console.log(paste);
    
  }, [paste])

  return (
  <div className='w-[70%] m-auto mt-[2rem]'>
     <div className='flex flex-row justify-between'>
      <input
       className='font-semibold h-10 p-2 border border-gray-400 rounded-[0.2rem]  !text-black place-content-evenlymt-2 w-[100%] pl-5 outline-0'
       type="text"
       placeholder='Title'
       disabled
       value={paste?.title}
      />

    </div>
    <div className='mt-5 border min-h-[400px] rounded-[0.3rem] border-gray-400'>
      <div className='flex justify-between p-3 h-10 items-center border-b border-b-gray-400'>
        <div className='h-[1rem] flex items-center gap-2'>
          <div className='h-[1rem] w-[1rem] bg-red-500 rounded-full'/>
          <div className='h-[1rem] w-[1rem] bg-yellow-500 rounded-full'/>
          <div className='h-[1rem] w-[1rem] bg-green-500 rounded-full'/>
        </div>
        <div>
          <button onClick={() => {
            navigator.clipboard.writeText(paste?.content)
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
      placeholder='Write Your Content Here'
      disabled
      value={paste?.content}
      />
    </div>
   </div>
  )
}

export default ViewPaste