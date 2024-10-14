import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Fetch items on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
      });
  }, []);

  // Add a new item
  const addItem = () => {
    if (newItem.trim()) {
      axios.post('http://localhost:5000/items', { name: newItem })
        .then(response => {
          setItems([...items, response.data]);
          setNewItem('');
        })
        .catch(error => {
          console.error('There was an error adding the item!', error);
        });
    }
  };

  return (
    <div className="App">
      <h1>Simple MERN App</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add a new item"
      />
      <button onClick={addItem}>Add Item</button>

      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
