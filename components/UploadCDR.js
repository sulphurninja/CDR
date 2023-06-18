import { useEffect, useState } from 'react';
import csvParser from '../utils/csvParser';
import { motion } from 'framer-motion';

function UploadCDR() {
  const [commonCaller, setCommonCaller] = useState(null);
  const [longDurationCaller, setLongDurationCaller] = useState(null);
  const [commonIMEI, setCommonIMEI] = useState(null);

  useEffect(() => {
    // File upload logic
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target.result;
      const records = csvParser.parseCSV(csvData);
      setCommonCaller(csvParser.findCommonCaller(records, '9702297312'));
      setLongDurationCaller(csvParser.findLongDurationCaller(records));
      setCommonIMEI(csvParser.findCommonIMEI(records));
    };
    reader.readAsText(file);
  };

  return (
    <div>
    <div>
      <img src='rain.gif'className='w-full h-full absolute' />
    </div>
    <header className='absolute w-full'>
      <h1 className=' text-center text-white text-4xl font-bold font-mono'>A3M - CDR ANALYSIS SOFTWARE</h1>
    </header>
    <div className="flex flex-col font-mono items-center justify-center h-screen">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-[40%] w-[90%] h-[10%]  mx-auto fixed flex lg:mt-[-30%] mt-[-60%] p-8 bg-green-900 rounded-lg shadow-lg border border-white  transform rotate-3"
      >
        <h1 className="lg:text-2xl  w-[100%]  font-bold text-green-300 mt-[-4%] lg:mt-[-2%]">Upload CDR ➡️ </h1>
        <label className="relative lg:w-[50%] w-[50%] lg:mt-[-2%] mt-[-3%] ml-[30%] flex items-center justify-center py-4 px-6 bg-green-700 rounded-lg text-black cursor-pointer text-3xl">
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
          />
          <span className="absolute   px-8 text-base text-white  font-bold">
            <span className="animate-pulse">S</span>
            <span className="animate-pulse">E</span>
            <span className="animate-pulse">L</span>
            <span className="animate-pulse">E</span>
            <span className="animate-pulse">C</span>
            <span className="animate-pulse">T</span>
            
          </span>
        </label>
        {/* Additional rendering logic */}
      </motion.div>
    </div>
    </div>
  );
}

export default UploadCDR;
