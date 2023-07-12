import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const arraySize = Math.floor((window.innerWidth - 1) / 16);
  // const arraySize = 50;
  const [array, setArray] = useState([]);
  const [algo, setAlgo] = useState('');

  const handleChange = (e) => {
    setAlgo(e.target.value);
  };

  const constructArray = () => {
    setArray(
      Array.from(
        { length: arraySize },
        () => Math.floor(Math.random() * 100) + 1
      )
    );
  };

  const bubbleSort = (arry) => {
    let arr = [...arry];
    let swaps = [];
    for (let i = 0; i < arr.length; i++) {
      // Last i elements are already in place so
      // you dont need to keep iterating over them
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Checking if the item at current postion
        // is greater than the next position
        if (arr[j] > arr[j + 1]) {
          // If the current position > next position then swap them
          swaps.push([j, j + 1]);
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return swaps;
  };

  const animateBubble = (swaps, arr) => {
    if (swaps.length === 0) {
      return;
    }
    const [i, j] = swaps.shift();
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setArray([...arr]);
    setTimeout(() => {
      animateBubble(swaps, arr);
    }, 10);
  };

  const selectionSort = (arry) => {
    let arr = [...arry];
    let n = arr.length;
    for (let i = 0; i < n - 1; ++i) {
      let min_index = i;
      for (let j = i + 1; j < n; ++j) {
        if (arr[j] < arr[min_index]) min_index = j;
      }
      let temp = arr[i];
      arr[i] = arr[min_index];
      arr[min_index] = temp;
      setArray(arr);
    }
  };

  const insertionSort = (arry) => {
    let arr = [...arry];
    let n = arr.length;
  };

  const sortArray = () => {
    switch (algo) {
      case 'bubble':
        let swaps = bubbleSort(array);
        animateBubble(swaps, array);
        break;
      case 'selection':
        selectionSort(array);
        break;
      case 'insertion':
        console.log('insertion sort');
        break;
      default:
        console.log('select an algorithm');
    }
  };

  useEffect(() => constructArray(), [arraySize]);

  return (
    <div className="App">
      <div className="header">
        <button onClick={constructArray}>Randomize Array</button>
        <button onClick={sortArray}>Sort</button>
        <label htmlFor="algo">
          Sorting Algo:{' '}
          <select name="algo" id="algo" value={algo} onChange={handleChange}>
            <option value="">-- Select an Algorithm --</option>
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
          </select>
        </label>
      </div>
      <div className="array-container">
        {array.map((num, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${num * ((window.innerHeight - 75) / 100)}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
