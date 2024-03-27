import React from 'react'
import { BsCheckLg } from 'react-icons/bs'

const Toast = () => {
    return (
        <div className=' border-l-4 border-green-500 fixed bottom-10 flex items-center gap-3 bg-white p-3 shadow-md rounded'>
            <div className='w-[25px] h-[25px] bg-green-600 text-white rounded-full flex items-center justify-center'>
                <BsCheckLg size={22} />
            </div>
            Copied to clipboard
        </div>
    )
}

export default Toast