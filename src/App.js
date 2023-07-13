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

  const animate = (swaps, arr, mil) => {
    if (swaps.length === 0) {
      return;
    }
    const [i, j] = swaps.shift();
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setArray([...arr]);
    setTimeout(() => {
      animate(swaps, arr, mil);
    }, mil);
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

  const selectionSort = (arry) => {
    let swaps = [];
    let arr = [...arry];
    let n = arr.length;
    for (let i = 0; i < n - 1; ++i) {
      let min_index = i;
      for (let j = i + 1; j < n; ++j) {
        if (arr[j] < arr[min_index]) min_index = j;
      }
      swaps.push([i, min_index]);
      let temp = arr[i];
      arr[i] = arr[min_index];
      arr[min_index] = temp;
    }
    return swaps;
  };

  const insertionSort = (arry) => {
    let swaps = [];
    let arr = [...arry];
    let n = arr.length;
    for (let i = 1; i < n; i++) {
      // Choosing the first element in our unsorted subarray
      let current = arr[i];
      // The last element of our sorted subarray
      let j = i - 1;
      while (j > -1 && current < arr[j]) {
        arr[j + 1] = arr[j];
        swaps.push([j, j + 1]);
        j--;
      }
      arr[j + 1] = current;
      // swaps.push([j, i]);
    }
    return swaps;
  };

  const sortArray = () => {
    switch (algo) {
      case 'bubble':
        let swaps = bubbleSort(array);
        animate(swaps, array, 5);
        break;
      case 'selection':
        let swapz = selectionSort(array);
        animate(swapz, array, 100);
        break;
      case 'insertion':
        let thwaps = insertionSort(array);
        animate(thwaps, array, 20);
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
