import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const arraySize = Math.floor(window.innerWidth / 16);
  const [array, setArray] = useState([]);

  const constructArray = () => {
    setArray(
      Array.from(
        { length: arraySize },
        () => Math.floor(Math.random() * 100) + 1
      )
    );
  };

  const sortArray = () => {
    let newthing = array.sort((a, b) => a - b);
    setArray([...newthing]);
  };

  useEffect(() => constructArray(), [arraySize]);

  return (
    <div className="App">
      <button onClick={constructArray}>click</button>
      <button onClick={sortArray}>sort</button>
      <div className="array-container">
        {array.map((num, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${num * ((window.innerHeight - 50) / 100)}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
