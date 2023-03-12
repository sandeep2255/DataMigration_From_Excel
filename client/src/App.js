import React, { useState } from 'react';
import './App.css';
import XLSX from 'xlsx';

function App() {
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) =>{
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, {type:'array'});
    };
    reader.readAsArrayBuffer(file)
  }
  
  return (
    <div className="App">
      <h1>MIGRATION APPLICATION</h1>
      <div className='UploadFile'>
        <label htmlFor='excel-file'>Upload Excel File:</label>
        <input type="file" id='excel-file' name='excel-file' accept='.xlsx, .xls' onChange={handleFileUpload}/>
      </div>
    </div>
  );
}

export default App;
