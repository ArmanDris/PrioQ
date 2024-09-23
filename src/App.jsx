import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [toDoList, setToDoList] = useState([]); // State to store to-do items
  const [newItem, setNewItem] = useState(''); // State to track the current input

  // Handler to add a new item to the list
  const addItem = () => {
  if (newItem.trim()) {
    // Add the new item to the list
    const newList = [...toDoList, { text: newItem, completed: false }];

    // Function to extract the numeric part of the item
    const getNumericValue = (item) => {
      const num = item.text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      return num ? parseInt(num, 10) : Infinity; // Return Infinity if no number is found to push it to the end
    };

    // Sort the list based on the numeric value extracted
    const sortedList = newList.sort((a, b) => getNumericValue(a) - getNumericValue(b));

    // Update the state with the sorted list
    setToDoList(sortedList);
    setNewItem(''); // Clear the input field after adding the item
  }
};


  // Handler for detecting Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  // Handler to toggle strikethrough (completed) for an item
  const toggleComplete = (index) => {
    const updatedList = toDoList.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setToDoList(updatedList);
  };

  // Handler to remove an item
  const removeItem = (index) => {
    const updatedList = toDoList.filter((_, i) => i !== index);
    setToDoList(updatedList);
  };

  return (
    <div>
      <h1>Prio Q</h1>
      <p> Sorts items by stripping any non-numeric characters, then sorts them in ascending order.</p>
      <p>There is no automatic alphabetical ordering, so make sure to add items in alphabetical order manually.</p>
      {/* Input field for adding new items, listens for Enter key press */}
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyDown={handleKeyPress} // Call handleKeyPress on key down
        placeholder="<PATH> <NUMBER>"
        style={{padding: '8px'}}
      />
      <button onClick={addItem}>Add</button>

      {/* Display the list of to-do items */}
      <ul>
        {toDoList.map((item, index) => (
          <li key={index} style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
            {item.text}
            {/* Button to toggle completed state (strikethrough) */}
            <button onClick={() => toggleComplete(index)}>
              {item.completed ? 'Undo' : 'expanded'}
            </button>
            {/* Button to remove the item */}
            <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
