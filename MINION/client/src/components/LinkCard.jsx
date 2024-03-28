
import React, { useState } from 'react'
import { MdOutlineContentCopy } from 'react-icons/md';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb'
import { AiOutlineDelete, AiFillEye, AiOutlineLink } from 'react-icons/ai'
import Analytics from './Analytics';

const LinkCard = ({ urlDetails, handleDeleteUrl, setIsCopied }) => {
    const {  urlId, originUrl, shortUrl, clicks, _id, browsers, devices } = urlDetails
    const [show, setShow] = useState(false);
    

    console.log(devices, 'devices')

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopy = () =>{
        setIsCopied(true);
        copyTextToClipboard(shortUrl)
            .then(() => {
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='max-w-[990px] w-full bg-white shadow-sm flex flex-col p-8 rounded-md'>
            <div className='flex justify-between items-center'>
                <div className='text-start'>
                    <h3 className='font-semibold'>{originUrl}</h3>
                    <p className='text-blue-500 mt-1 text-sm cursor-pointer'>
                        <a href={shortUrl} className='flex items-center gap-1' target='_blank' rel="noreferrer"><AiOutlineLink size={20} />{shortUrl}</a>
                    </p>
                </div>
                <div className='flex gap-3 items-center'>
                    <p className='flex text-gray-400 text-[12px] items-end mr-10 gap-2'>{clicks}<AiFillEye size={22} /></p>
                    <MdOutlineContentCopy size={20} className=' cursor-pointer text-gray-500' onClick={handleCopy}/>
                    <TbDeviceDesktopAnalytics size={22} className=' cursor-pointer text-gray-500' onClick={() => setShow(!show)} />
                    <AiOutlineDelete size={22} className=' cursor-pointer text-gray-500' onClick={()=>handleDeleteUrl(_id)}/>
                </div>
            </div>
            {
                show && <Analytics browsers={browsers} devices={devices}/>
            }
            <style jsx>{`
              .text-start {
                word-break: break-all;
              }
              .text-start p {
                white-space: normal;
              }
            `}</style>
            
        </div>
    )
}

export default LinkCard