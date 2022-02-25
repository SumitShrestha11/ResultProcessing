import React from 'react'
import { MdOutlineDocumentScanner } from 'react-icons/md'

export const Logo = () => {
    return (
        <div className='inline-block text-center align-middle justify-center py-4 w-20 h-20 bg-white shadow-lg rounded-full'>
            <MdOutlineDocumentScanner className='text-dark-blue text-5xl ml-4 mb-3' />
        </div> 
        // <div className='top-50 m-10'>
        // </div>
    )
}
