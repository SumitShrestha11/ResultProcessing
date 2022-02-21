import { useState } from 'react';
import axios from 'axios';

const EditingTable = ({editData, setEditData}) => {
    console.log(editData)
    const [message, setMessage] = useState(null);
    
    const postData = async(values) => {
        const res = await axios.post('http://localhost:5000/confirm', values);
        setMessage(res.data);
        setTimeout(()=>{
            setMessage(null);
        },5000)
    }

    const onResultDataChange = (e) => {
        const id=e.target.id;                                               // get id of individual element
        const index=(e.target.parentElement.parentNode.id)                  // get index for table
        const key=e.target.parentElement.parentNode.parentNode.id;          // get key of studentData or summary
       
        if(index===""){
            setEditData({...editData, [key]:{...editData[key], [id]:e.target.value}});      // change values of studentData or summary
        } else{
            let v=[];
            let main = "";                                                      //
            let extra = "";                                                     //  for passMarks, fullMarks and obtainedMarks
            if (id.includes(".")){                                              //
                v = id.split(".");
                [main, extra] = [...v];
            }
            let table = editData.tableData.map((data, i) => {                   // change data in table
                if(i===parseInt(index) && v.length===0){
                    return{...data,[id]:e.target.value}
                }else if(i===parseInt(index) && v.length===2) {
                    console.log(main);
                    return{...data,[main]:{...data[main], [extra]:e.target.value}}
                }
                return {...data};
            });
            setEditData({...editData, tableData:[...table]});
        }
    }
    const onClick = () => {
        console.log(editData);
        postData(editData);                         // push data to backend
    }
        
  return (
    <div>
        <div id="studentInfo" className="flex">
            <div className="flex-1">
                <p className="font-black">Name :- <input id="name" className="outline-none" defaultValue={editData.studentInfo.name} onChange={onResultDataChange} /></p>
                <p className="font-black">Level :- <input id="level" className="outline-none w-52" defaultValue={editData.studentInfo.level} onChange={onResultDataChange} /></p>
                <p className="font-black">Campus :- <input id="campus" className="outline-none" defaultValue={editData.studentInfo.campus} onChange={onResultDataChange} /></p>
                <p className="font-black">Year/Part :- <input id="yearpart" className="outline-none" defaultValue={editData.studentInfo.yearpart} onChange={onResultDataChange} /></p>
            </div>
            <div className="flex-1">
                <p className="font-black">Exam Roll No :- <input id="examRollNo" className="outline-none" defaultValue={editData.studentInfo.examRollNo} onChange={onResultDataChange} /></p>
                <p className="font-black">CRN :- <input id="CRN" className="outline-none" defaultValue={editData.studentInfo.CRN} onChange={onResultDataChange} /></p>
                <p className="font-black">T.U. Regd. No :- <input id="TURegdNo" className="outline-none" defaultValue={editData.studentInfo.TURegdNo} onChange={onResultDataChange} /></p>
                <p className="font-black">Programme :- <input id="programme" className="outline-none" defaultValue={editData.studentInfo.programme} onChange={onResultDataChange} /></p>
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
                {editData.tableData?editData.tableData.map((subjectData, index )=> {
                    return (
                        <tr key={index} id={index}>
                            <th className="border-2 border-black border-r-0"><input id="code" className="text-center outline-none font-black" size="5" maxLength="5" defaultValue={subjectData.code} onChange={onResultDataChange} /></th>
                            <th className="border-2 border-black border-l-0"><textarea id="subject" className="resize-none outline-none font-black text-center overflow-hidden" rows="3" maxLength="100" defaultValue={subjectData.subject} onChange={onResultDataChange} /></th>
                            <td className="border-2 border-black"><input id="fullMarks.asst" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.fullMarks.asst} onChange={onResultDataChange} /></td>
                            <td className="border-2 border-black"><input id="fullMarks.final" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.fullMarks.final} onChange={onResultDataChange} /></td>
                            <td className="border-2 border-black"><input id="passMarks.asst" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.passMarks.asst} onChange={onResultDataChange} /></td>
                            <td className="border-2 border-black"><input id="passMarks.final" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.passMarks.final} onChange={onResultDataChange} /></td>
                            <td className="border-2 border-black"><input id="obtainedMarks.asst" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.obtainedMarks.asst} onChange={onResultDataChange} /></td>
                            <td className="border-2 border-black"><input id="obtainedMarks.final" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.obtainedMarks.final} onChange={onResultDataChange} /></td>
                            <td className="border-2 border-black"><input id="total" className="text-center outline-none" size="3" maxLength="3" defaultValue={subjectData.total} onChange={onResultDataChange} /></td>
                            <td className="border-2 border-black"><input id="remarks" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.remarks} onChange={onResultDataChange} /></td>
                        </tr>
                    )
                }):<tr></tr>}
            </tbody>
        </table>
        <br></br>
        <div id="summary" className="flex">
            <div className="flex-1 font-black">
                <p>Marks Entered By :- <input id="marksEnteredBy" className="outline-none" defaultValue={editData.summary.marksEnteredBy} onChange={onResultDataChange} /></p>
                <p>Verified By :- <input id="verifiedBy" className="outline-none" defaultValue={editData.summary.verifiedBy} onChange={onResultDataChange} /></p>
                <p>Date :- <input id="date" className="outline-none" defaultValue={editData.summary.date} onChange={onResultDataChange} /></p>
            </div>
            <div className="flex-1 font-black">
                <p>Grand Total :- <input id="grandTotal" className="outline-none" defaultValue={editData.summary.grandTotal} onChange={onResultDataChange} /></p>
                <p>Result :- <input id="result" className="outline-none" defaultValue={editData.summary.result} onChange={onResultDataChange} /></p>
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

export default EditingTable
