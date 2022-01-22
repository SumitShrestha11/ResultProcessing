import {useState, useEffect, useRef} from 'react';

const CameraFeed = () => {
    //const [userStream, setUserStream] = useState(null);
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    // const videoOff = () => {
    //     let videoTracks = userStream.getTracks();
    //     if(videoTracks[0].enabled){
    //         videoTracks[0].enabled=false;
    //     } else {
    //         videoTracks[0].enabled=true;
    //     }
    //     console.log(videoTracks[0]);
    // }

    const getVideo = async() => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video:{
                    width: 1920,
                    height: 1080
                }
            });
            //setUserStream(stream);
            let video=videoRef.current;
            video.srcObject = stream;
            video.play();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getVideo();
    }, [videoRef])

    return (
        <>
            <div className='p-2'>
                <div className='bg-black px-1 py-[25%] rotate-90 rounded-lg'>
                    <video ref={videoRef}></video>
                </div>
            </div>
            <div className='flex justify-center'>
                <button className='transition duration-150 ease-in-out rounded-lg bg-pink-500 hover:bg-pink-600 transform hover:-translate-y-1 px-3 py-1'>
                    Scan
                </button>
            </div>
            <div>
                <canvas ref={photoRef}></canvas>
                <button>Close</button>
            </div>
        </>
    );
};

export default CameraFeed;
