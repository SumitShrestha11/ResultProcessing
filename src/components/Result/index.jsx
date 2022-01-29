import {useState} from 'react'
import ResultTable from './components/ResultTable'
import EditingTable from './components/EditingTable'

const Result = ({resultData}) => {
    const [editTable, setEditTable] = useState(false);

    const onClick = () => {
        setEditTable(!editTable);
    }

    return (
        <div className='bg-white rounded-lg shadow-lg p-2'>
            {!editTable?<ResultTable resultData={resultData} />:<EditingTable editData={resultData}/>}
            <button className='cursor-pointer bg-red-500 mt-4 px-2 py-1 rounded-lg' onClick={onClick}>
                Edit
            </button>
        </div>
    )
}

export default Result
