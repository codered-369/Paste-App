import React, { useState } from 'react'
import { TrashIcon, PencilSquareIcon, DocumentDuplicateIcon } from '@heroicons/react/24/solid';

import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import {
    FacebookIcon, FacebookShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share'
import { Link } from 'react-router-dom';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTearm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTearm.toLowerCase()));

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }

    const shareUrlf = "https://www.facebook.com/"
    const shareUrlw = "https://www.web.whatsapp.com/"

    return (
        <div>
            <input type="search"
                className='p-2 rounded-2xl min-w-[600px] mt-5'
                placeholder='search here'
                value={searchTearm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='flex flex-col gap-5 mt-5'>
                {
                    filteredData.length > 0 &&
                    filteredData.map((paste) => {
                        return (
                            <div className='border rounded-2xl p-4 mb-4' key={paste?._id}>

                                <div className='text-lg text-indigo-300'>
                                    {paste.title.toUpperCase()}
                                </div>
                                <div className='py-5 mx-2'>
                                    {paste.content}
                                </div>
                                <div className='flex flex-row gap-4 place-content-evenly'>
                                    <button className="flex items-center gap-2">
                                    <PencilSquareIcon className="w-6 h-6 text-white" />
                                        <Link to={`/?pasteId=${paste?._id}`}   className="text-white">Edit</Link>
                                    </button>
                                    
                                    <button>
                                        <Link to={`/pastes/${paste?._id}`} className="text-white">
                                            View
                                        </Link>
                                    </button>
                                    
                                    {/* <button onClick={() => handleDelete(paste?._id)}>Delete</button> */}
                                    <button onClick={() => handleDelete(paste?._id)} className="flex items-center gap-2">
                                        <TrashIcon className="w-6 h-6 text-red-500" />
                                        Delete
                                    </button>

                                    <button className='flex gap-2 items-center' onClick={() => {
                                        navigator.clipboard.writeText(paste?.content);
                                        toast.success("Content copied to clipboard");
                                    }}><DocumentDuplicateIcon className="w-5 h-5" />Copy</button>

                                    <div className='bb flex flex-row gap-4 border rounded-md p-4 items-center bg-indigo-500 '>
                                        Share
                                        <FacebookShareButton className=' flex w-[45px] h-1 gap-3 items-center ' id='fb' url={shareUrlf} quote={paste?.content}><FacebookIcon></FacebookIcon></FacebookShareButton>
                                        <WhatsappShareButton className=' flex w-[45px] h-1 gap-3 items-center' id='fb' url={shareUrlw} quote={paste?.content}><WhatsappIcon></WhatsappIcon></WhatsappShareButton>
                                    </div>

                                </div>
                                <div>
                                    {paste.createdAt}
                                </div>
                            </div>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default Paste