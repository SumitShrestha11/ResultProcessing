import './App.scss';
import { Logo } from './components/Logo';
import Result from './components/Result';


function App() {
  return (
    <>
      <div className="grid grid-cols-12 gap-5 mx-5 p-10 my-8 bg-mainWindow shadow-lg rounded-lg">
            <div className='col-span-6'>
              <Logo />
              <span className='ml-5 inline-block'>Organization Name</span>
              <span className='mt-10 block text-dark-blue font-bold text-3xl'>Result</span>
              <Result />
            </div>
        </div>
    </>
  );
}

export default App;
