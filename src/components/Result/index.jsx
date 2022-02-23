import {useState} from 'react'
import ResultTable from './components/ResultTable'
import EditingTable from './components/EditingTable'
import Loader from '../Loader';

const Result = ({isLoading, resultData, setResultData}) => {
    const [editTable, setEditTable] = useState(false);

    const onClick = () => {
        setEditTable(!editTable);
    }

    return (
        <>
        {isLoading?(
            <div className='z-3 absolute grid justify-items-center items-center bg-zinc-50/75 w-[810px] h-[380px] '>
            <Loader />
            </div>
        ):''}
        
        <div className='bg-white rounded-lg shadow-lg p-2 static'>
            <div className='flex justify-end'>
            <button className='transition duration-150 ease-in-out cursor-pointer bg-blue-500 hover:bg-blue-600 text-white mb-4 px-2 py-1 rounded-lg' onClick={onClick}>
                {!editTable?'Edit':'Go Back'}
            </button>
            </div>
            
            {!editTable?<ResultTable resultData={resultData} />:<EditingTable editData={resultData} setEditData={setResultData}/>}
        </div>
        </>
    )
}

export default Result
