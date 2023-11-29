import React, { useState } from 'react';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';

const RequestText = () => {
  const [text, setText] = useState('');
  const [num, setNum] = useState(''); 
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    if (!text) {
      setError('Please enter a valid text to scan.');
      return;
    }
    e.preventDefault();

    let web = 'http://127.0.0.1:5000/text';
    setLoading(true);

    axios.post(web, { text, size: num }) 
      .then((response) => {
        setLoading(false);

        if (response.data.error) {
          setError(response.data.error);
          setScanResult(null);
        } else {
          setError(null);
          setScanResult(response.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setError('An error occurred during the text scan.');
        setScanResult(null);
      });
  };

  return (
    <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Text Summarizer
      </h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Text to Summarize
          </label>
          <textarea
            name="text"
            id="text"
            rows="4"
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="num" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Number of Sentences
          </label>
          <input
            type="number"
            name="num"
            id="num"
            onChange={(e) => setNum(e.target.value)}
            value={num}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
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
}

export default RequestText
