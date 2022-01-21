/*
for custom colors edit 'tailwind.config.js' file
*/
import './App.scss';
import InputArea from './components/InputArea';
import { Logo } from './components/Logo';
import Result from './components/Result';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  return (
    <>
      <div className="grid grid-cols-12 gap-5 mx-5 p-10 my-8 bg-mainWindow shadow-lg rounded-lg"> {/*main window*/}
            <div className='col-span-7'>
              <Logo />
              <span className='ml-5 inline-block'>Organization Name</span>
              <span className='mt-10 block text-dark-blue font-bold text-3xl'>Result</span>
              <Result />
            </div>
            <div className='col-span-5'>
              <ErrorBoundary>
                <InputArea />
              </ErrorBoundary>
            </div>
        </div>
    </>
  );
}

export default App;
