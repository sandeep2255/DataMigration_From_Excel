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

        if(!dataArr[rowNum]) dataArr[rowNum] = {};
        dataArr[rowNum][headers[header]] = value;
      }
      const dataArray = dataArr.slice(2);
      setExcelData(dataArray);
    };
    reader.readAsArrayBuffer(file)
  };
  
  const RenderExcelData = () => {
      const header = excelData.length > 0 ? Object.keys(excelData[0]) : [];
      return header;
  }
 


  return (
    <div className="App">
      <h1>MIGRATION APPLICATION</h1>
      <div className='UploadFile'>
        <label htmlFor='excel-file'>Upload Excel File:</label>
        <input type="file" id='excel-file' name='excel-file' accept='.xlsx, .xls' onChange={handleFileUpload} />
          <div className='view-details'>
            <table>
              <thead>
                <tr>
                {RenderExcelData().map((headerItem, index)=>(
                  <th key={index} className = 'vertical-heading'>
                  <span>{headerItem}</span>
                  </th>
                ))}
                </tr>
                </thead>
                <tbody>
                    {excelData.map((row, index)=>(
                      <tr key={index}>
                      {Object.values(row).map((value, index)=>(
                        <td key={index}>
                          {value}
                        </td>
                      ))}
                      </tr>
                    ))}
                </tbody>
            </table>
          </div>
      </div>
    </div>
  );
  
}

export default App;
