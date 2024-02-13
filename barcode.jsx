import React, { useState } from 'react';
import Barcode from 'react-barcode';

function BarcodeGenerator() {
  const [barcodeValue, setBarcodeValue] = useState('');

  const generateBarcode = () => {
    // For example, you can specify the width, height, format, etc.
    return <Barcode value={barcodeValue} />;
  };

  const handleInputChange = (event) => {
    setBarcodeValue(event.target.value);
  };

  return (
    <div className="app">
      <h1>Barcode Generator</h1>
      <input
        type="text"
        placeholder="Enter barcode value"
        value={barcodeValue}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={generateBarcode}>Generate</button>
      <div>{barcodeValue && generateBarcode()}</div>
    </div>
  );
}

export default BarcodeGenerator;
