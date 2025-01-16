import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const ViewPaste = () => {

    const {id} = useParams();

    const allPastes = useSelector((state) => state.paste.pastes);
    const paste = allPastes.filter((p) => p._id === id)[0];
    return (

        <div >
            <div className='flex flex-row gap-7 place-content-between'>
                <input
                    className='p-2 rounded-2xl mt-3 w-[60%] pl-4'
                    type="text"
                    placeholder='enter title here...'
                    value={paste.title}
                    disabled
                    onChange={(e) => setTitle(e.target.value)}
                />

                
            </div>
            <div className='mt-8'>
                <textarea
                    className='rounded-2xl mt-4 min-w-[400px] p-4'
                    value={paste.content}
                    placeholder='enter content here...'
                    disabled
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    )
}

export default ViewPaste