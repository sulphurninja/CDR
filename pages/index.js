import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { parseCSV, findCommonCaller, findCommonIMEI, findLongDurationCaller } from './../utils/csvParser';


const Index = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [commonCaller, setCommonCaller] = useState(null);
  const [longDurationCaller, setLongDurationCaller] = useState(null);
  const [commonIMEI, setCommonIMEI] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const totalSlides = 3; // Add this line and adjust the value based on the total number of slides


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        const parsedData = parseCSV(csvData);
        setTimeout(() => {
          console.log('Parsed Data:', parsedData);
          setParsedData(parsedData);
          setCommonCaller(findCommonCaller(parsedData, '9730827623'));
          setLongDurationCaller(findLongDurationCaller(parsedData));
          setCommonIMEI(findCommonIMEI(parsedData));
          setIsLoading(false); // Stop loading
        }, 10000); // Simulating a delay of 2 seconds for analysis
      };
      reader.readAsText(selectedFile);
    }
  };


  return (
    <div className="min-h-screen">
      <div className="px-4 py-8">
        <div>
          <img src="/logo.png" className="h-10" alt="Logo" />
          <h1 className="font-bold font-mono text-white">CDR ANALYSIS</h1>
        </div>
        <h1 className="text-3xl text-center underline mt-[-5%] text-white font-mono mb-8">
          CDR Analysis - Premium Edition
        </h1>
        <div className="grid grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center absolute mt-24 w-[35%] justify-center mb-8"
          >
            {/* Input Dialog */}
            <div className="bg-green-900 pt-8 w-[100%] border-2 border-white flex shadow-lg rounded-lg p-6">
              <h1 className="font-bold font-mono text-2xl text-green-300">Upload CDR ➡️ </h1>

              <label>
                <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                <span
                  className="absolute cursor-pointer bg-green-700 rounded-lg mx-16 px-8 text-base text-white font-bold"
                  onClick={handleUpload}
                >
                  <span className="animate-pulse">S</span>
                  <span className="animate-pulse">E</span>
                  <span className="animate-pulse">L</span>
                  <span className="animate-pulse">E</span>
                  <span className="animate-pulse">C</span>
                  <span className="animate-pulse">T</span>
                </span>
              </label>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center absolute mt-56 w-[35%] justify-center mb-8"
          >
            {/* Input Dialog */}
            <div className="bg-green-900 pt-8 w-[100%] border-2 border-white flex shadow-lg rounded-lg p-6">
              <h1 className="font-bold font-mono text-2xl text-green-300">Upload CDR ➡️ </h1>

              <label>
                <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                <span
                  className="absolute cursor-pointer bg-green-700 rounded-lg mx-16 px-8 text-base text-white font-bold"
                  onClick={handleUpload}
                >
                  <span className="animate-pulse">S</span>
                  <span className="animate-pulse">E</span>
                  <span className="animate-pulse">L</span>
                  <span className="animate-pulse">E</span>
                  <span className="animate-pulse">C</span>
                  <span className="animate-pulse">T</span>
                </span>
              </label>
            </div>
          </motion.div>
          <div className="bg-white rounded-lg w-[90%] h-[90%] lg:ml-[100%]">
            <h1 className="font-mono font-bold text-center">TOOLS</h1>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 border-2 text-white border-white rounded-lg bg-green-900 sm:grid-cols-2 md:grid-cols-2 gap-4"
            >
              {/* Tools Box */}

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="shadow-lg hover:text-white hover:bg-green-700 mt-4 rounded-lg p-6 w-[80%] ml-4 cursor-pointer"
              >
                <h2 className="font-semibold font-mono">1. Location Tracker</h2>
                {/* Add your tool content here */}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-[80%] mt-4 ml-6 shadow-lg rounded-lg p-6 hover:bg-green-700 cursor-pointer"
              >
                <h2 className="font-semibold font-mono">2. SDR Analysis</h2>
                {/* Add your tool content here */}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-[80%] mt-4 ml-6 shadow-lg rounded-lg p-6 hover:bg-green-700 cursor-pointer"
              >
                <h2 className="font-semibold font-mono">3. RTO</h2>
                {/* Add your tool content here */}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-[80%] mt-4 ml-6 shadow-lg rounded-lg p-6 hover:bg-green-700 cursor-pointer"
              >
                <h2 className="font-semibold font-mono">4. IMEI Info</h2>
                {/* Add your tool content here */}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-[80%] h-[60%] mt-4 ml-6 shadow-lg rounded-lg p-6 hover:bg-green-700 cursor-pointer"
              >
                <h2 className="font-mono font-semibold">5. Social Analyzer</h2>
                {/* Add your tool content here */}
              </motion.div>
              <motion.div className="w-[90%] h-[60%] mt-4 ml-6 shadow-lg rounded-lg p-6 hover:bg-red-700 cursor-pointer">
                <h2 className="font-semibold font-mono">Cyber Security Updates</h2>
                {/* Add your tool content here */}
              </motion.div>
            </motion.div>
          </div>
        </div>
        {parsedData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
          >
            <div className=" rounded-lg p-8 max-w-md bg-opacity-80 backdrop-filter backdrop-blur-md">
              <h2 className="text-2xl text-white font-semibold mb-4">Data Analysis</h2>

              <div className="w-full h-64 relative overflow-hidden">
                <motion.div
                  className="h-full w-full flex"
                  initial={{ x: 0 }}
                  animate={{ x: `-${activeSlideIndex * 100}%` }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full flex-shrink-0">
                    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-2">Common Caller</h3>
                      {Array.isArray(commonCaller) ? (
                <div className="grid grid-cols-1 gap-4">
                  {commonCaller.map((caller, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md text-gray-700"
                    >
                      <p className="text-xl font-semibold mb-2">{caller.number}</p>
                      <p className="text-gray-500">Count: {caller.count}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>{commonCaller}</p>
              )}
                    </div>
                  </div>

                  <div className="w-full h-full flex-shrink-0">
                    <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-2">Long Duration Caller</h3>
                      <p className="text-gray-700">{longDurationCaller}</p>
                    </div>
                  </div>

                  <div className="w-full h-full flex-shrink-0">
                    <div className="bg-green-100 p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-2">Common IMEI</h3>
                      <p className="text-gray-700">{commonIMEI}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  className="mr-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg"
                  disabled={activeSlideIndex === 0}
                  onClick={() => setActiveSlideIndex(activeSlideIndex - 1)}
                >
                  Previous
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg"
                  disabled={activeSlideIndex === totalSlides - 1}
                  onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}
                >
                  Next
                </button>
              </div>

              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg"
                onClick={() => setParsedData(null)}
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
        {/* Add a condition to display the loader */}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white rounded-lg p-8 max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Analyzing Data...</h2>
              <div className="flex items-center">
                <div className="mr-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
                <p>Please wait while we analyze the data.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
