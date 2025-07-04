import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { MdOutlineEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri';
import { GrView } from 'react-icons/gr';
import { FaCopy } from 'react-icons/fa';
import { SlCalender } from 'react-icons/sl';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);
  const [searchTerm, setSearchTern] = useState('');
  const dispatch = useDispatch();

  const filterData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }
  
  return (
    <div className='h-fit px-[10rem] py-[1rem]'>
      <input 
      className='p-2 rounded-[0.3rem] w-[100%] font-semibold text-[0.9rem] !text-gray-600 mt-5 border border-gray-500 outline-0'
      type="text"
      placeholder='Search paste here...'
      value={searchTerm}
      onChange={(e) => setSearchTern(e.target.value)}
      />

      <div className='border border-gray-500 rounded-[0.4rem] mt-4'>
        <div className='border-b border-gray-500 p-4'>
          <h1 className='font-extrabold text-4xl'>All Pastes</h1>
        </div>
        <div className='flex flex-col gap-5 m-4'>
          {
            filterData.length > 0 ?
            filterData.map(
              (paste) => {
                return (
                  <div className='border border-gray-500 px-[0.7rem] py-[1rem] rounded-[0.2rem] flex justify-between' key={paste._id}>
                    <div className=' flex flex-col gap-2'>
                      <div className='text-2xl font-bold'>
                      {paste.title}
                      </div>
                      <div className='text-[0.9rem] font-semibold'>
                        {paste.content}
                      </div>
                    </div>

                    <div className=' flex flex-col justify-between'>
                      <div className='flex gap-[0.4rem] justify-end'>
                        <button className='border p-[0.3rem] border-gray-400 rounded-[0.2rem]'
                        >
                          <Link to={`/?pasteId=${paste._id}`}>
                            <MdOutlineEdit/>
                          </Link>
                        </button>
                        <button className='border p-[0.3rem] border-gray-400 rounded-[0.2rem]'>
                          <Link to={`/pastes/${paste._id}`}>
                            <GrView/>
                          </Link>
                        </button>
                        <button className='border p-[0.3rem] border-gray-400 rounded-[0.2rem]' onClick={() => handleDelete(paste._id)}>
                          <RiDeleteBinLine/>
                        </button>
                        <button 
                        className='border p-[0.3rem] border-gray-400 rounded-[0.2rem]'
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("copied to clipboard", {position: "top-right"})
                        }}>
                          <FaCopy/>
                        </button>
                        {/* <button onClick={() => {
                          toast("hello")
                        }}>
                          Share
                        </button> */}
                      </div>
                      <div className='flex gap-2 justify-end'>
                        <SlCalender className='mt-[0.1rem]'/>
                        <p className='font-semibold text-[0.9rem]'>{paste.createdAt}</p>
                      </div>
                    </div>
                  </div>
                )
          } ) : <h2 className='font-semibold m-auto !text-gray-400 text-2xl'>No Data Found</h2>
          }
          {
             filterData.length<=0 
          }
        </div>
      </div>
    </div>
  )
}

export default Paste