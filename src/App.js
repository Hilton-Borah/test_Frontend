import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Fetch items on component mount
  console.log("process.env:", process.env);
  console.log("process.env.REACT_APP_NODE_ENV:", process.env.REACT_APP_NODE_ENV);
  console.log("process.env.REACT_APP_SERVER_BASE_URL:", process.env.REACT_APP_SERVER_BASE_URL);
  const base_url = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_BASE_URL : process.env.REACT_APP_SERVER_BASE_URL;

  useEffect(() => {
    axios.get(`${base_url}/items`)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
      });
  }, [base_url]);

  // Add a new item
  const addItem = () => {
    if (newItem.trim()) {
      axios.post(`${base_url}/items`, { name: newItem })
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
