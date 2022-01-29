import React from 'react';
import axios from 'axios';

const EditingTable = ({editData}) => {
    let table = [];
    
    const postData = async(values) => {
        const res = await axios.post('http://localhost:5000/confirm', values);
        console.log(res);
    }
    const onClick = () => {
        let input = document.getElementsByName('array');
        for (let i = 0; i < input.length; i += 10) {
            table.push({
                "code":input[i].value,
                "subject":input[i+1].value,
                "fullMarks":{
                    "asst":input[i+2].value,
                    "final":input[i+3].value
                },
                "passMarks":{
                    "asst":input[i+4].value,
                    "final":input[i+5].value
                },
                "obtainedMarks":{
                    "asst":input[i+6].value,
                    "final":input[i+7].value
                },
                "total":input[i+8].value,
                "remarks":input[i+9].value
            });
        };

        let values = {
            "studentInfo":{
                "name": document.getElementById('name').value,
                "level":document.getElementById('level').value,
                "campus":document.getElementById('campus').value,
                "yearpart":document.getElementById('yearpart').value,
                "examRollNo":document.getElementById('examRollNo').value,
                "CRN":document.getElementById('CRN').value,
                "TURegdNo":document.getElementById('TURegdNo').value,
                "programme":document.getElementById('programme').value
    
            },
            "tableData": table,
            "summary":{
                "marksEnteredBy":document.getElementById('marksEnteredBy').value,
                "verifiedBy":document.getElementById('verifiedBy').value,
                "date":document.getElementById('date').value,
                "grandTotal":document.getElementById('grandTotal').value,
                "result":document.getElementById('result').value
            }
        };

        console.log(values);
        postData(values);
    }
        

  return (
    <div>
        <div className="flex">
            <div className="flex-1">
                <p className="font-black">Name :- <input id="name" className="outline-none" defaultValue={editData.studentInfo.name}/></p>
                <p className="font-black">Level :- <input id="level" className="outline-none w-52" defaultValue={editData.studentInfo.level}/></p>
                <p className="font-black">Campus :- <input id="campus" className="outline-none" defaultValue={editData.studentInfo.campus}/></p>
                <p className="font-black">Year/Part :- <input id="yearpart" className="outline-none" defaultValue={editData.studentInfo.yearpart}/></p>
            </div>
            <div className="flex-1">
                <p className="font-black">Exam Roll No :- <input id="examRollNo" className="outline-none" defaultValue={editData.studentInfo.examRollNo}/></p>
                <p className="font-black">CRN :- <input id="CRN" className="outline-none" defaultValue={editData.studentInfo.CRN}/></p>
                <p className="font-black">T.U. Regd. No :- <input id="TURegdNo" className="outline-none" defaultValue={editData.studentInfo.TURegdNo}/></p>
                <p className="font-black">Programme :- <input id="programme" className="outline-none" defaultValue={editData.studentInfo.programme}/></p>
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
                {editData.tableData?editData.tableData.map(subjectData => {
                    return (
                        <tr>
                            <th className="border-2 border-black border-r-0"><input name="array" className="text-center outline-none font-black" size="5" maxLength="5" defaultValue={subjectData.code}/></th>
                            <th className="border-2 border-black border-l-0"><textarea name="array" className="resize-none overflow-hidden outline-none font-black text-center" rows="2" cols="25" maxLength="50" defaultValue={subjectData.subject}/></th>
                            <td className="border-2 border-black"><input name="array" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.fullMarks.asst}/></td>
                            <td className="border-2 border-black"><input name="array" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.fullMarks.final}/></td>
                            <td className="border-2 border-black"><input name="array" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.passMarks.asst}/></td>
                            <td className="border-2 border-black"><input name="array" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.passMarks.final}/></td>
                            <td className="border-2 border-black"><input name="array" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.obtainedMarks.asst}/></td>
                            <td className="border-2 border-black"><input name="array" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.obtainedMarks.final}/></td>
                            <td className="border-2 border-black"><input name="array" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.total}/></td>
                            <td className="border-2 border-black"><input name="array" className="text-center outline-none" size="2" maxLength="2" defaultValue={subjectData.remarks}/></td>
                        </tr>
                    )
                }):""}
            </tbody>
        </table>
        <br></br>
        <div className="flex">
            <div className="flex-1 font-black">
                <p>Marks Entered By :- <input id="marksEnteredBy" className="outline-none" defaultValue={editData.summary.marksEnteredBy}/></p>
                <p>Verified By :- <input id="verifiedBy" className="outline-none" defaultValue={editData.summary.verifiedBy}/></p>
                <p>Date :- <input id="date" className="outline-none" defaultValue={editData.summary.date}/></p>
            </div>
            <div className="flex-1 font-black">
                <p>Grand Total :- <input id="grandTotal" className="outline-none" defaultValue={editData.summary.grandTotal}/></p>
                <p>Result :- <input id="result" className="outline-none" defaultValue={editData.summary.result}/></p>
            </div>
        </div>
        <button className='cursor-pointer bg-green-500 mt-4 px-2 py-1 rounded-lg' onClick={onClick}>
            Confirm
        </button>
    </div>
  )
}

export default EditingTable
