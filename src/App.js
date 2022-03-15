import firebase from './firebase';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import './App.css'
import Header from './Header.js';
import AddItemForm from './AddForm.js';

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
    <div className='container'>
      <div className="wrapper">
        <Header />
        {/* Display current inventory listing on screen */}
        <div className='invList'>
          <h3>Current Inventory</h3>
          <ul>
            {inventoryList.map( (inventoryItem, index) => {
              // console.log(inventoryItem);
              return (
                <li key={index}>
                  <div className='smallDetails'>
                    <p>Item: #{inventoryItem.itemId}</p>
                    <p>Type: {inventoryItem.Type}</p>
                    <p>Vol./Wt.: {inventoryItem.Volume}</p>
                    <p>Quantity: {inventoryItem.Quantity}</p>
                    <p>Price: ${inventoryItem.Price}</p>
                  </div>
                  <div className='largeDetails'>
                    <p>Item Name: {inventoryItem.itemName}</p>
                    <p>Description: {inventoryItem.Description}</p>
                  </div>
                  <hr></hr>
                </li>
              )
            })}
          </ul>
        </div>
        {/* Display Add Item to Inventory Form */}
        <div className='invAdd'>
          <AddItemForm />
        </div>
      </div>
      {/* END: Wrapper */}
    </div>
    // END: Container
  )
}


export default App;
