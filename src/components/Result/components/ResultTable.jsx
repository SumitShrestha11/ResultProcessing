import { useState } from 'react';
import axios from 'axios';

const ResultTable = ({resultData}) => {
    const [message, setMessage] = useState(null);
    const onClick = async() => {
        const res = await axios.post('http://localhost:5000/confirm', resultData);
        setMessage(res.data);
        setTimeout(()=>{
            setMessage(null);
        },5000)
        
    }
  return (
    <div>
      <div className="flex">
                <div className="flex-1">
                    <p className="font-black">Name :- {resultData.studentInfo.name}</p>
                    <p className="font-black">Level :- {resultData.studentInfo.level}</p>
                    <p className="font-black">Campus :- {resultData.studentInfo.campus}</p>
                    <p className="font-black">Year/Part :- {resultData.studentInfo.yearpart}</p>
                </div>
                <div className="flex-1">
                    <p className="font-black">Exam Roll No :- {resultData.studentInfo.examRollNo}</p>
                    <p className="font-black">CRN :- {resultData.studentInfo.CRN}</p>
                    <p className="font-black">T.U. Regd. No :- {resultData.studentInfo.TURegdNo}</p>
                    <p className="font-black">Programme :- {resultData.studentInfo.programme}</p>
                </div>
            </div>
            <br></br>
            <table className="border-2 border-black text-center w-full">
                <thead>
                    <tr>
                        <th className="border-2 border-black border-b-0 w-1/3 underline underline-offset-2 decoration-2" colSpan="2">Subjects</th>
                        <th className="border-2 border-black" colSpan="2">Full Marks</th>
                        <th className="border-2 border-black" colSpan="2">Pass Marks</th>
                        <th className="border-2 border-black" colSpan="2">Marks Obtained</th>
                        <th className="border-2 border-black" rowSpan="2">Total</th>
                        <th className="border-2 border-black" rowSpan="2">Remarks</th>
                    </tr>
                    <tr>
                        <th className="border-2 border-black border-r-0 border-t-0">Code</th>
                        <th className="border-2 border-black border-l-0 border-t-0">Title</th>
                        <th className="border-2 border-black">Asst.</th>
                        <th className="border-2 border-black">Final</th>
                        <th className="border-2 border-black">Asst.</th>
                        <th className="border-2 border-black">Final</th>
                        <th className="border-2 border-black">Asst.</th>
                        <th className="border-2 border-black">Final</th>
                    </tr>
                </thead>
                <tbody>
                    {resultData.tableData?resultData.tableData.map((subjectResult, index) => {
                        return (
                            <tr key={index}>
                                <th className="border-2 border-black border-r-0">{subjectResult?subjectResult.code:""}</th>
                                <th className="border-2 border-black border-l-0">{subjectResult?subjectResult.subject:""}</th>
                                <td className="border-2 border-black">{subjectResult?subjectResult.fullMarks.asst:""}</td>
                                <td className="border-2 border-black">{subjectResult?subjectResult.fullMarks.final:""}</td>
                                <td className="border-2 border-black">{subjectResult?subjectResult.passMarks.asst:""}</td>
                                <td className="border-2 border-black">{subjectResult?subjectResult.passMarks.final:""}</td>
                                <td className="border-2 border-black">{subjectResult?subjectResult.obtainedMarks.asst:""}</td>
                                <td className="border-2 border-black">{subjectResult?subjectResult.obtainedMarks.final:""}</td>
                                <td className="border-2 border-black">{subjectResult?subjectResult.total:""}</td>
                                <td className="border-2 border-black">{subjectResult?subjectResult.remarks:""}</td>
                            </tr>
                        )
                    }):<tr></tr>}
                </tbody>
            </table>
            <br></br>
            <div className="flex">
                <div className="flex-1 font-black">
                    <p>Marks Entered By :- {resultData.summary?resultData.summary.marksEnteredBy:""}</p>
                    <p>Verified By :- {resultData.summary?resultData.summary.verifiedBy:""}</p>
                    <p>Date :- {resultData.summary?resultData.summary.date:""}</p>
                </div>
                <div className="flex-1 font-black">
                    <p>Grand Total :- {resultData.summary?resultData.summary.grandTotal:""}</p>
                    <p>Result :- {resultData.summary?resultData.summary.result:""}</p>
                </div>
            </div>
            <div className='grid align-middle justify-center'>
                <button className='transition duration-150 ease-in-out cursor-pointer bg-green-500 hover:bg-green-600 transform hover:-translate-y-1 mt-4 px-2 py-1 rounded-lg' onClick={onClick}>
                    Confirm
                </button>
            </div>
            {message
            ?(<div className='p-2 mt-2 rounded-lg bg-blue-200 text-center'>{message}</div>)
            :''
            }
    </div>
  )
}

export default ResultTable
