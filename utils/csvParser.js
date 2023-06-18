const csv = require('csv-parser');



function findCommonCaller(records, targetNumber) {
  const callerCounts = {};

  records.forEach((record) => {
    const callingNo = record['B PARTY NUMBER'];
    if (!isNaN(callingNo)) { // Skip non-numeric values
      callerCounts[callingNo] = (callerCounts[callingNo] || 0) + 1;
    }
  });

  // Sort callers by occurrence count in descending order
  const sortedCallers = Object.entries(callerCounts).sort((a, b) => b[1] - a[1]);

  // Get top 10 callers
  const top10Callers = sortedCallers.slice(0, 10);

  return top10Callers.map((caller) => ({
    number: caller[0],
    count: caller[1]
  }));
}



function findLongDurationCaller(records) {
  let longDurationCaller = null;
  let maxDuration = 0;
  records.forEach((record) => {
    const duration = parseInt(record['Dur(s)']);
    if (duration > maxDuration) {
      maxDuration = duration;
      longDurationCaller = record['Calling No'];
    }
  });
  return longDurationCaller;
}

function findCommonIMEI(records) {
  const imeiCounts = {};
  records.forEach((record) => {
    const imei = record['IMEI'];
    imeiCounts[imei] = (imeiCounts[imei] || 0) + 1;
  });
  const commonIMEI = Object.keys(imeiCounts).reduce(
    (a, b) => (imeiCounts[a] > imeiCounts[b] ? a : b)
  );
  // Sort callers by occurrence count in descending order
  const sortedimeis = Object.entries(imeiCounts).sort((a, b) => b[1] - a[1]);

  // Get top 10 callers
  const top5imei = sortedimeis.slice(0, 10);

  return top5imei.map((caller) => `${caller[0]} (${caller[1]})`).join(' ');

}


function parseCSV(csvData) {
  const rows = csvData.split('\n');

  // Find the line containing the headers
  let headersIndex = -1;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].includes('Target /A PARTY NUMBER' || 'Calling No' || '')) {
      headersIndex = i;
      break;
    }
  }

  if (headersIndex === -1) {
    throw new Error('Headers not found in CSV data');
  }

  // Extract the headers by splitting with commas and removing leading/trailing spaces and quotes
  const headers = rows[headersIndex]
    .replace(/"/g, '')
    .split(',')
    .map((header) => header.trim());

  // Extract the data rows
  const dataRows = rows.slice(headersIndex + 1);

  // Parse the data rows
  const parsedData = dataRows.map((row) => {
    const values = row.split(',');
    const rowData = {};
    for (let i = 0; i < headers.length; i++) {
      if (i < values.length) {
        rowData[headers[i]] = values[i].replace(/'/g, '').trim();
      } else {
        rowData[headers[i]] = ''; // Set empty value if not enough values in the row
      }
    }
    return rowData;
  });

  return parsedData;
}


module.exports = {
  findCommonCaller,
  findLongDurationCaller,
  findCommonIMEI,
  parseCSV,
};
