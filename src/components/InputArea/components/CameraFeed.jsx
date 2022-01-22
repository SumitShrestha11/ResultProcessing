import {useEffect, useRef} from 'react';

const CameraFeed = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video:{
                    width: 1920,
                    height: 1080
                }
            })//userstream
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;

                video.play();
            })
            .catch(err => {
                console.log(err);//Error in console
            })
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
                <button>Click</button>
            <div>
                <canvas ref={photoRef}></canvas>
                <button>Close</button>
            </div>
        </>
    );
};

export default CameraFeed;
