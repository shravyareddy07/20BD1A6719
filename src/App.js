import React, { useState } from 'react';
import './App.css';

function App() {
  const [urls, setUrls] = useState([]);
  const [mergedNumbers, setMergedNumbers] = useState([]);

  const fetchNumbers = async () => {
    const numbersLists = await Promise.all(
      urls.map(async (url) => {
        try {
          const response = await fetch(url, { timeout: 500 });
          if (response.ok) {
            const data = await response.json();
            return data.numbers || [];
          }
        } catch (error) {
          console.error(`Error fetching numbers from ${url}:`, error);
        }
        return [];
      })
    );
    
    const mergedNumbers = Array.from(new Set(numbersLists.flat())).sort((a, b) => a - b);
    setMergedNumbers(mergedNumbers);
  };

  return (
    <div className="App">
      <h1>Number Management App</h1>
      <div>
        <input className='url'
          type="text"
          placeholder="Enter URL"
          value={urls[urls.length - 1] || ''}
          onChange={(e) => {
            const newUrls = [...urls];
            newUrls[urls.length - 1] = e.target.value;
            setUrls(newUrls);
          }}
        />
      </div>
      <br></br>
      <div>
        <button onClick={() => setUrls([...urls, ''])} >Add URL</button> 
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={fetchNumbers}>Fetch Numbers</button>
      </div>
      <br></br>
      <div>

        {mergedNumbers.join(', ')}
        
      </div>
    </div>
  );
}

export default App;
