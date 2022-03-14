import firebase from './firebase';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';

function App() {
  const [inventoryList, setInventoryList] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect (() => {
    const database = getDatabase(firebase)
    const dbRef = ref(database)
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      // console.log(data);
      for (let itemKey in data) {
        newState.push(data[itemKey]);
        // console.log(data[itemKey]);
      }
      setInventoryList(newState);
      // console.log(newState);
    });
  }, []);

  // Update state with userInput from form when the "Submit" button is pressed
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make connection to database
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    // Push userInput contents into database
    push(dbRef, userInput);

    // Reset state
    setUserInput('');
  }

  return (
    <div>
      <h1>Two Birds One Stone Foods</h1>
      <ul>
        {inventoryList.map( (inventoryItem, index) => {
          // console.log(inventoryItem);
          return (
            <li key={index}>
              <p>Product: #{inventoryItem.ProdId}</p>
              <p>Type: {inventoryItem.Type}</p>
              <p>Product Name: {inventoryItem.ProductName}</p>
              <p>Description: {inventoryItem.Description}</p>
              <p>Volume/Weight: {inventoryItem.Volume}</p>
              <p>Quantity: {inventoryItem.Quantity}</p>
              <p>Price: ${inventoryItem.Price}</p>
            </li>
          )
        })}
      </ul>
      {/* Form --> add new products to inventory */}
      <div>
        <h2>Add a new item to your inventory</h2>
        <form action="submit">
          <label htmlFor="ProdId">Item: #</label>
          <input
            type="text"
            id="ProdId"
            onChange={handleInputChange}
            value={userInput}
          />

          {/* <label htmlFor="ProductName">Item Name: </label>
          <input 
            type="text" 
            id="ProductName" 
            onChange={handleInputChange} 
            value={userInput}
          /> */}

           
          <button onClick={handleSubmit}>Add Product</button>
        </form>
      </div>
    </div>
  )
}


export default App;
