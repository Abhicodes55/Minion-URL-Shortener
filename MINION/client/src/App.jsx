import logo from './logo.svg';
import './App.css';
import LinkCard from './components/LinkCard';
import { useEffect, useState } from 'react';
import { axiosDelete, axiosGet, axiosPost } from './AxiosService';
import Toast from './components/Toast';
import { toast } from 'react-toastify';

function App() {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [render, setRender] = useState(false);
  const [copied, setIsCopied] = useState(false);

  const validateUrl = (input) => {
    const urlRegex = new RegExp(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i);
    return urlRegex.test(input);
  };

  const handleShortenUrl = () => {
    if (!validateUrl(userInput)) {
      toast.error('Please enter a valid URL.');
      return;
    }
  
    axiosPost('shorturl', { originUrl: userInput })
      .then(res => {
        console.log(res.data);
        setRender(!render);
        toast.success('URL shortened successfully.');
      })
      .catch(handleError);
  };
  
  const handleError = err => {
    console.log(err);
    if (err.response && err.response.data === 'Rate limit exceeded') {
      handleRateLimitExceeded();
    } else {
      handleOtherErrors();
    }
  };
  
  const handleRateLimitExceeded = () => {
    toast.error('Only 20 requests are allowed per hour.Please try again after some time.');
  };
  
  const handleOtherErrors = () => {
    toast.error('Failed to shorten URL.');
  };
  

  const handleDeleteUrl = (id) => {
    axiosDelete(`deleteurl/${id}`)
      .then(res => {
        console.log(res);
        setRender(!render);
      })
      .catch(err => console.log(err));
  };
  

  useEffect(() => {
    axiosGet('allurls')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [render]);

  return (
    <div className="App flex flex-col items-center justify-center" style={{ backgroundColor: '#111827', minHeight: '100vh' }}>
      <div className='max-w-[1360px] mt-4'>
      
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white animate-bounce">
          <span class="text-blue-600 dark:text-blue-500 hover:scale-125">M</span>INI<span class="text-blue-600 dark:text-blue-500">ON</span>
        </h1>
        <div className="flex gap-3">
          <div className="group relative">
            <button className="inline-flex items-center px-3 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900" aria-label="GitHub" onClick={() => window.open('https://github.com/Abhicodes55', '_blank')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </button>
          </div>
          <div className="group relative">
            <button className="inline-flex items-center px-3 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700" aria-label="LinkedIn" onClick={() => window.open('https://www.linkedin.com/in/abhishek-mishra-951821208/', '_blank')}>
            <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1.1em"
      viewBox="0 0 512 512"
      stroke-width="0"
      fill="currentColor"
      stroke="currentColor"
      class="w-5 h-5"
    >
      <path
        d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"
      ></path>
    </svg>
              LinkedIn
            </button>
            </div>
        </div>
      </div>
      
        <div className='flex'>
          <div className=''>
            <div className='flex items-center justify-center gap-10 mt-10'>
              <input
                onChange={(e) => setUserInput(e.target.value.trim())}
                type="text"
                className='shadow-sm appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Enter link here' />
             <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline'
                onClick={handleShortenUrl}>
                ShrinkURL</button>

              
            </div>

            <div className='flex flex-col gap-4 w-full justify-center items-center mt-10' style={{ backgroundColor: '#111827' }}>
              {
                data && data.map((url) =>
                  <LinkCard
                    key={url._id}
                    urlDetails={url}
                    handleDeleteUrl={handleDeleteUrl}
                    setIsCopied={setIsCopied}
                  />
                )

              }
            </div>
          </div>

        </div>
      
      {
        copied && <Toast />
      }

    </div>
  );
}

export default App;
