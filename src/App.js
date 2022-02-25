/*
for custom colors edit 'tailwind.config.js' file
*/
import { useState } from 'react';
import './App.scss';
import InputArea from './components/InputArea';
import { Logo } from './components/Logo';
import Result from './components/Result';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState({
    studentInfo:{
      name: "",
      level:"",
      campus:"",
      yearpart:"",
      examRollNo:"",
      CRN:"",
      TURegdNo:null,
      programme:"",
    },
      tableData: [],
      summary:{
        marksEnteredBy:null,
        verifiedBy:null,
        date:"",
        grandTotal:null,
        result:""
    }
  });

  return (
    <>
      <div className="grid grid-cols-12 gap-5 mx-5 p-10 my-8 bg-mainWindow shadow-lg rounded-lg"> {/*main window*/}
            <div className='col-span-7'>
              <Logo />
              <span className='ml-5 inline-block text-pink-500 font-bold text-3xl'>Data Segmentation and Extraction</span>
              <span className='mt-10 block text-dark-blue font-bold text-3xl'>Result</span>
              <Result isLoading={isLoading} resultData={resultData} setResultData={setResultData}/>
            </div>
            <div className='col-span-5'>
              <ErrorBoundary>
                <InputArea setIsLoading={setIsLoading} setResultData={setResultData}/>
              </ErrorBoundary>
            </div>
        </div>
    </>
  );
}

export default App;
