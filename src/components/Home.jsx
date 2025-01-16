import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPastes]);


    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId ||Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }
        // update 
        if (pasteId) {
            console.log("Updating paste:", paste);
            dispatch(updateToPastes(paste));
        }
        // create 
        else {
            dispatch(addToPastes(paste));
        }
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div >
            <div className='flex flex-row gap-7 place-content-between mt-4'>
                <input
                    className='p-2 rounded-2xl mt-3 w-[60%] pl-4'
                    type="text"
                    placeholder='enter title here...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={createPaste} className='p-2 rounded-2xl w-[30%] h-[40%] mt-[3.5%] pl-4'>
                    {pasteId ? "Update Paste" : "Create Paste"}
                </button>
            </div>
            <div className='mt-8'>
                <textarea
                    className='rounded-2xl mt-4 min-w-[400px] p-4'
                    value={value}
                    placeholder='enter content here...'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    )
}

export default Home