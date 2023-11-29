import React, { useState } from 'react';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner'

const formatOutput = (output) => {
  if (output) {
    const lines = output.split('\n').filter((line) => line.trim() !== '');
    const formattedOutput = lines.map((line) => line.replace(/^\s*\+\s*/, '')).join('<br>');

    return formattedOutput;
  }
  return '';
};

const RequestUrl = () => {
  const [url, setUrl] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleUrlScan = () => {
    if (!url) {
      setError('Please enter a valid URL to scan.');
      return;
    }

    let web = 'http://127.0.0.1:5000/webscrap';

    setLoading(true); 

    axios
      .post(web, { url })
      .then((response) => {
        setLoading(false); 

        if (response.data.error) {
          setError(response.data.error);
          setScanResult(null);
        } 
        else 
        {
          setError(null);
          setScanResult(formatOutput(response.data));
        }
      })
      .catch((error) => {
        setLoading(false); 
        console.error(error);
        setError('An error occurred during the URL scan.');
        setScanResult(null);
      });
  };

  return (
    <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-center mb-8 text-2xl font-bold">Web Scraper</h2>
      <div className="flex items-center mb-8">
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter URL"
          className="mr-4 w-4/5 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleUrlScan}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Scan
        </button>
      </div>
    <h3 className="text-xl font-bold">Scan Result:</h3>
      {error && <div className="text-red-500 mb-8">{error}</div>}
      <div className="bg-gray-50 p-8 rounded-lg border border-gray-300 text-gray-900 text-sm h-[20rem] max-h-[20rem] overflow-scroll">
        {loading ? (
          <div className="text-center flex justify-center items-center h-32">
            <div className="spinner-border text-primary" role="status">
              <ThreeCircles
                height="70"
                width="70"
                color="#5D3FD3"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />
            </div>
          </div>
        ) : (
            <p dangerouslySetInnerHTML={{ __html: scanResult}} />
        )}
      </div>
    </div>
  )
};

export default RequestUrl;
