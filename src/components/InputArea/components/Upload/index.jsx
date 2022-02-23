import { useState } from 'react';
import axios from 'axios';

const Upload = ({setIsLoading, setResultData}) => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [message, setMessage] = useState(null);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };
    
    const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
            setUploadPercentage(
            parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
            );
            if(uploadPercentage===100){
                setMessage('File Uploaded');
            }
            setTimeout(()=>{
                setMessage(null);
            },5000);
        }
        });
                
        setResultData(res.data);
        if(res.data){
            setIsLoading(false);
            
        }
        console.log(res.data);
        
    } catch (err) {
        if (err.response.status === 500) {
        console.log("There was a problem with the server")
        setMessage('There was a problem with the server');
        } else {
        console.log(err.response.data.msg);
        setMessage(err.response.data.msg);
        setTimeout(()=>{
            setMessage(null);
        },5000)
        }
        setUploadPercentage(0)
    }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className='bg-black mb-4 rounded-lg'>
                <input
                    type='file'
                    className='hidden'
                    id='customFile'
                    onChange={onChange}
                />
                <label className='custom-file-label flex justify-between cursor-pointer' htmlFor='customFile'>
                    <div className='p-1 ml-2'>{filename}</div>
                    <div className='transition duration-150 ease-in-out cursor-pointer ml-1 bg-pink-500 hover:bg-pink-600 px-2 py-1 rounded-lg'>Browse</div>
                </label>
                </div>


                <input
                type='submit'
                value='Upload'
                className='transition duration-150 ease-in-out cursor-pointer bg-pink-500 hover:bg-pink-600 transform hover:-translate-y-1 mt-4 px-2 py-1 rounded-lg'
                />
            </form>
            {message
                ?(<div className='p-2 mt-2 rounded-lg bg-blue-200 text-center'>{message}</div>)
                :''
            }
        </>
    );
};

export default Upload;
