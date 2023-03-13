import React, { useState } from 'react';
import './App.css';
import {read} from 'xlsx';

function App() {
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) =>{
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, {type:'array'});
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const headers = {};
      const dataArr = [];

      for(let cell in worksheet) {
        if(cell[0] === '!') continue;
        const header = cell.slice(0,1);
        const rowNum = parseInt(cell.slice(1));
        const value = worksheet[cell].v;

        if(rowNum === 1){
          headers[header] = value;
        }

        if(!dataArr[rowNum])dataArr[rowNum] = {};
        dataArr[rowNum][headers[header]] = value;
      }
      console.log(dataArr);
      dataArr.shift();
      setExcelData(dataArr);
    };
    reader.readAsArrayBuffer(file)
  };
  
  return (
    <div className="App">
      <h1>MIGRATION APPLICATION</h1>
      <div className='UploadFile'>
        <label htmlFor='excel-file'>Upload Excel File:</label>
        <input type="file" id='excel-file' name='excel-file' accept='.xlsx, .xls' onChange={handleFileUpload} />
        {excelData.map((row, index)=>(
          <div key={index} className="view-details">
            {Object.values(row).map((value,index)=>(
              <div key={index} className = "inDetails">
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
