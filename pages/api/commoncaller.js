import { join } from 'path';
import csvParser from 'csv-parser';
import fs from 'fs';

export default async (req, res) => {
  const filePath = join(process.cwd(), 'public', 'wow.csv');
  const header = 'B PARTY NUMBER';

  const data = [];
  const headerValues = {};

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      data.push(row);
      const caller = row[header];
      if (caller) {
        if (headerValues[caller]) {
          headerValues[caller]++;
        } else {
          headerValues[caller] = 1;
        }
      }
    })
    .on('end', () => {
      const mostCommonCaller = Object.keys(headerValues).reduce(
        (a, b) => (headerValues[a] > headerValues[b] ? a : b)
      );

      res.status(200).json({ data, mostCommonCaller });
    })
    .on('error', (error) => {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing the file.' });
    });
};
