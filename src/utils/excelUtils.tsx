import * as XLSX from 'xlsx';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const importExcelData = (file: File, callback: (data: any[]) => void) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = event.target?.result;
    const workbook = XLSX.read(data, { type: 'binary' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    callback(jsonData);
  };
  reader.readAsBinaryString(file);
};
