import {useState} from 'react'
import ResultTable from './components/ResultTable'
import EditingTable from './components/EditingTable'
import Loader from '../Loader';
import { MdEdit } from 'react-icons/md';
import { IoArrowBackCircle } from 'react-icons/io5';

const Result = ({isLoading, resultData, setResultData}) => {
    const [editTable, setEditTable] = useState(false);

    const onClick = () => {
        setEditTable(!editTable);
    }

    return (
        <>
        
        
        <div className='bg-white rounded-lg shadow-lg p-2 static'>
            {isLoading?(
                <div className='z-3 grid justify-items-center items-center w-[808px] h-[380px] text-3xl'>
                <Loader />
                Processing...
                </div>
            ): (
            <>
            <div className='flex justify-end'>
            <button className='flex transition duration-150 ease-in-out cursor-pointer bg-blue-500 hover:bg-blue-600 text-white mb-4 px-2 py-1 rounded-lg text-lg' onClick={onClick}>
                {!editTable?(<>Edit <MdEdit className='text-2xl ml-1' /></>):(<>Go Back <IoArrowBackCircle className='text-2xl ml-1' /></>)}
            </button>
            </div>
            
            {!editTable?<ResultTable resultData={resultData} />:<EditingTable editData={resultData} setEditData={setResultData}/>}
            </>
            )
            }
        </div>
        </>
    )
}

export default Result
