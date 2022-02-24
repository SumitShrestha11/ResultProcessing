import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md'

const EditingTable = ({editData, setEditData}) => {
    const initialMessage = {data:null,color:'blue'};
    const [message, setMessage] = useState(initialMessage);
    // const ref = useRef(null)
    
    
    const postData = async(values) => {
        try{
            const res = await axios.post('http://localhost:5000/confirm', values);
            setMessage({...message,data:res.data});
        } catch(err) {
            setMessage({
                data:"Invalid Data! Please check if the data is correct",
                color:'red'
            });
        }
        setTimeout(()=>{
            setMessage(initialMessage);
        },10000)
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

    const onRowAdd = () => {
        const initialNewRowData = {
            code:null,
            subject:null,
            fullMarks:{
                asst:null,
                final:null
            },
            passMarks:{
                asst:null,
                final:null
            },
            obtainedMarks:{
                asst:null,
                final:null
            },
            total:null,
            remarks:null
        }
        let newTableData = [...editData.tableData]
        newTableData.unshift({...initialNewRowData})
        //console.log({newData:{...editData, tableData: newTableData}})
        setEditData({...editData,tableData:[...newTableData]})
    }

    const onRowDelete = (index) => {
        // let newTableData = [...editData.tableData]
        // newTableData.splice(index,1);
        setEditData({...editData,tableData:[...editData.tableData.filter((d,i) => i!==index)]})
        setMessage({data:"Row Deleted", color:'green'})
        setTimeout(()=>{
            setMessage(initialMessage);
        },10000)        
    }
        
  return (
    <div>
        <div id="studentInfo" className="flex">
            <div className="flex-1">
                <p className="font-black">Name :- <input id="name" className={`outline-none ${editData.studentInfo.name?"":"bg-red-200"}`} defaultValue={editData.studentInfo.name} onChange={onResultDataChange} /></p>
                <p className="font-black">Level :- <input id="level" className={`outline-none w-52 ${editData.studentInfo.level?"":"bg-red-200"}`} defaultValue={editData.studentInfo.level} onChange={onResultDataChange} /></p>
                <p className="font-black">Campus :- <input id="campus" className={`outline-none ${editData.studentInfo.campus?"":"bg-red-200"}`} defaultValue={editData.studentInfo.campus} onChange={onResultDataChange} /></p>
                <p className="font-black">Year/Part :- <input id="yearpart" className={`outline-none ${editData.studentInfo.yearpart?"":"bg-red-200"}`} defaultValue={editData.studentInfo.yearpart} onChange={onResultDataChange} /></p>
            </div>
            <div className="flex-1">
                <p className="font-black">Exam Roll No :- <input id="examRollNo" className={`outline-none ${editData.studentInfo.examRollNo?"":"bg-red-200"}`} defaultValue={editData.studentInfo.examRollNo} onChange={onResultDataChange} /></p>
                <p className="font-black">CRN :- <input id="CRN" className={`outline-none ${editData.studentInfo.CRN?"":"bg-red-200"}`} defaultValue={editData.studentInfo.CRN} onChange={onResultDataChange} /></p>
                <p className="font-black">T.U. Regd. No :- <input id="TURegdNo" className="outline-none" defaultValue={editData.studentInfo.TURegdNo} onChange={onResultDataChange} /></p>
                <p className="font-black">Programme :- <input id="programme" className={`outline-none ${editData.studentInfo.programme?"":"bg-red-200"}`} defaultValue={editData.studentInfo.programme} onChange={onResultDataChange} /></p>
            </div>
        </div>
        <br></br>
        <button className='float-right transition duration-150 ease-in-out cursor-pointer bg-green-500 hover:bg-green-600 transform hover:-translate-y-1 mt-1 mb-1 px-2 py-1 rounded-lg text-white' onClick={onRowAdd}>+ Add Rows</button>
        <table className="border-2 border-black text-center w-full">
            <thead>
                <tr>
                    <th className="border-2 border-black border-b-0 w-1/3 underline underline-offset-2 decoration-2" colSpan="2">Subjects</th>
                    <th className="border-2 border-black" colSpan="2">Full Marks</th>
                    <th className="border-2 border-black" colSpan="2">Pass Marks</th>
                    <th className="border-2 border-black" colSpan="2">Marks Obtained</th>
                    <th className="border-2 border-black" rowSpan="2">Total</th>
                    <th className="border-2 border-black" rowSpan="2">Remarks</th>
                    <th className="border-2 border-black" rowSpan="2">Actions</th>

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
                    console.log(subjectData, index)
                    return (
                        <tr key={subjectData.subject+index} id={index}>
                            <th className={`border-2 border-black border-r-0 ${subjectData.code?"":"bg-red-200"} `}><input id="code" className="text-center outline-none bg-inherit font-black" size="5" maxLength="5" defaultValue={subjectData.code} onChange={onResultDataChange} /></th>
                            <th className={`border-2 border-black border-l-0 ${subjectData.subject?"":"bg-red-200"}`}><textarea id="subject" className="bg-inherit resize-none outline-none font-black text-center overflow-hidden" rows="3" maxLength="100" defaultValue={subjectData.subject} onChange={onResultDataChange} /></th>
                            <td className={`border-2 border-black ${subjectData.fullMarks.asst?"":"bg-red-200"}`}><input id="fullMarks.asst" className="bg-inherit text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.fullMarks.asst} onChange={onResultDataChange} /></td>
                            <td className={`border-2 border-black ${subjectData.fullMarks.final?"":"bg-red-200"}`}><input id="fullMarks.final" className="bg-inherit text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.fullMarks.final} onChange={onResultDataChange} /></td>
                            <td className={`border-2 border-black ${subjectData.passMarks.asst?"":"bg-red-200"}`}><input id="passMarks.asst" className="bg-inherit text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.passMarks.asst} onChange={onResultDataChange} /></td>
                            <td className={`border-2 border-black ${subjectData.passMarks.final?"":"bg-red-200"}`}><input id="passMarks.final" className="bg-inherit text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.passMarks.final} onChange={onResultDataChange} /></td>
                            <td className={`border-2 border-black ${subjectData.obtainedMarks.asst?"":"bg-red-200"}`}><input id="obtainedMarks.asst" className="bg-inherit text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.obtainedMarks.asst} onChange={onResultDataChange} /></td>
                            <td className={`border-2 border-black ${subjectData.obtainedMarks.final?"":"bg-red-200"}`}><input id="obtainedMarks.final" className="bg-inherit text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.obtainedMarks.final} onChange={onResultDataChange} /></td>
                            <td className={`border-2 border-black ${subjectData.total?"":"bg-red-200"}`}><input id="total" className="bg-inherit text-center outline-none" size="3" maxLength="3" defaultValue={subjectData.total} onChange={onResultDataChange} /></td>
                            <td className="border-2 border-black"><input id="remarks" className="bg-inherit text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.remarks} onChange={onResultDataChange} /></td>
                            <td className="border-2 border-black"><button id="actions" className="transition duration-150 ease-in-out cursor-pointer transform hover:-translate-y-1 mt-4 px-2 py-1 rounded-lg text-white" onClick={e=>onRowDelete(index)}><MdDelete className='text-red-500 text-3xl'/></button></td>
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
        {message.data
            ?(<div className={'p-2 mt-2 rounded-lg bg-'+message.color+'-200 text-center'}>{message.data}</div>)
            :''
        }

    </div>
  )
}

export default EditingTable
