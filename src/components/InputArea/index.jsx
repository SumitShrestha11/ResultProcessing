import {useState} from 'react';
import CameraFeed from './components/CameraFeed';
import ToggleSwitch from './components/ToggleSwitch';
import Upload from './components/Upload';

const InputArea = () => {
 const [enabled, setEnabled] = useState(false);
 const setInputArea = (inputType) => {
     console.log(inputType);
     setEnabled(inputType);
 }

  return (
    <div className='bg-dark-blue rounded-lg text-white m-10 p-5'>
        <div className='flex justify-end'>
            {/* Camera Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <ToggleSwitch setInputArea={setInputArea} />
            {/* Upload Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
        </div>
        <div className='mt-2'>
            {
                !enabled ?<CameraFeed /> :<Upload />
            }
            
        </div>
    </div>
  );
};

export default InputArea;
