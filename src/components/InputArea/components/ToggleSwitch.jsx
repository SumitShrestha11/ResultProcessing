import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'

const ToggleSwitch = ({setInputArea}) => {
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
      setInputArea(enabled);
      
    }, [enabled]);
    
    return (
        <div className='mx-1'>
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`bg-white relative inline-flex flex-shrink-0 h-[20px] w-[35px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span
                aria-hidden="true"
                className={`${enabled ? 'translate-x-[15px]' : 'translate-x-0'}
                    pointer-events-none inline-block h-[16px] w-[16px] rounded-full bg-dark-blue shadow-lg transform ring-0 transition ease-in-out duration-200`}
                />
            </Switch>
        </div>
    );
};

export default ToggleSwitch;
