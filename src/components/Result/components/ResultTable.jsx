import { useState } from 'react';
import axios from 'axios';

const ResultTable = ({resultData}) => {
    const initialMessage = {data:null,color:'blue'};
    const [message, setMessage] = useState(initialMessage);
    const onClick = async() => {
        try{
            const res = await axios.post('http://localhost:5000/confirm', resultData);
            setMessage({...message,data:res.data});
            
        } catch(err) {
            
            setMessage({
                data:"Invalid Data! Please check if the data is correct",
                color:'red'
            });
            console.log({message})
            // setTimeout(()=>{
            //     setMessage(null);
            // },5000)
        }
        setTimeout(()=>{
            setMessage(initialMessage);
        },10000)
        
    }
  return (
    <div>
      <div className="flex gap-1">
                <div className="flex-1">
                    <p className={`font-black ${resultData.studentInfo.name?"":"bg-red-200"}`}>Name :- {resultData.studentInfo.name}</p>
                    <p className={`font-black ${resultData.studentInfo.level?"":"bg-red-200"}`}>Level :- {resultData.studentInfo.level}</p>
                    <p className={`font-black ${resultData.studentInfo.campus?"":"bg-red-200"}`}>Campus :- {resultData.studentInfo.campus}</p>
                    <p className={`font-black ${resultData.studentInfo.yearpart?"":"bg-red-200"}`}>Year/Part :- {resultData.studentInfo.yearpart}</p>
                </div>
                <div className="flex-1">
                    <p className={`font-black ${resultData.studentInfo.examRollNo?"":"bg-red-200"}`}>Exam Roll No :- {resultData.studentInfo.examRollNo}</p>
                    <p className={`font-black ${resultData.studentInfo.CRN?"":"bg-red-200"}`}>CRN :- {resultData.studentInfo.CRN}</p>
                    <p className="font-black">T.U. Regd. No :- {resultData.studentInfo.TURegdNo}</p>
                    <p className={`font-black ${resultData.studentInfo.programme?"":"bg-red-200"}`}>Programme :- {resultData.studentInfo.programme}</p>
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
                                <th className={`border-2 border-black border-r-0 ${subjectResult.code?"":"bg-red-200"} `}>{subjectResult?subjectResult.code:""}</th>
                                <th className={`border-2 border-black border-l-0 ${subjectResult.subject?"":"bg-red-200"}`}>{subjectResult?subjectResult.subject:""}</th>
                                <td className={`border-2 border-black ${subjectResult.fullMarks.asst?"":"bg-red-200"}`}>{subjectResult?subjectResult.fullMarks.asst:""}</td>
                                <td className={`border-2 border-black ${subjectResult.fullMarks.final?"":"bg-red-200"}`}>{subjectResult?subjectResult.fullMarks.final:""}</td>
                                <td className={`border-2 border-black ${subjectResult.passMarks.asst?"":"bg-red-200"}`}>{subjectResult?subjectResult.passMarks.asst:""}</td>
                                <td className={`border-2 border-black ${subjectResult.passMarks.final?"":"bg-red-200"}`}>{subjectResult?subjectResult.passMarks.final:""}</td>
                                <td className={`border-2 border-black ${subjectResult.obtainedMarks.asst?"":"bg-red-200"}`}>{subjectResult?subjectResult.obtainedMarks.asst:""}</td>
                                <td className={`border-2 border-black ${subjectResult.obtainedMarks.final?"":"bg-red-200"}`}>{subjectResult?subjectResult.obtainedMarks.final:""}</td>
                                <td className={`border-2 border-black ${subjectResult.total?"":"bg-red-200"}`}>{subjectResult?subjectResult.total:""}</td>
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
            {message.data
            ?(<div className={'p-2 mt-2 rounded-lg bg-'+message.color+'-200 text-center'}>{message.data}</div>)
            :''
            }
    </div>
  )
}

export default ResultTable
