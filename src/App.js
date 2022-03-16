import firebase from './firebase';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import './App.css'
import Header from './Header.js';
import AddItemForm from './AddForm.js';

function App() {
  const [inventoryList, setInventoryList] = useState([]);

  useEffect (() => {
    const database = getDatabase(firebase)
    const dbRef = ref(database)
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      for (let itemKey in data) {
        newState.push({key: itemKey, inventoryItem: data[itemKey]});
      }
      setInventoryList(newState);
    });
  }, []);


  // Removing an Item: Update state with userInput from form when the "Submit" button is pressed
  const handleRemoveItem = (itemId) => {
    // reference the item's specific node
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${itemId}`);
    // remove the node from the database
    remove(dbRef);
  }

  return (
    <div className='container'>
      <div className="wrapper">
        <Header />
        {/* Display current inventory listing on screen */}
        <div className='invList'>
          <h3>Current Inventory</h3>
          <ul>
            {inventoryList.map( (item) => {
              return (
                <li key={item.key}>
                  <div className='smallDetails'>
                    <p>Item: #{item.inventoryItem.itemId}</p>
                    <p>Type: {item.inventoryItem.Type}</p>
                    <p>Vol./Wt.: {item.inventoryItem.Volume}</p>
                    <p>Quantity: {item.inventoryItem.Quantity}</p>
                    <p>Price: ${item.inventoryItem.Price}</p>
                  </div>
                  <div className='largeDetails'>
                    <p>Item Name: {item.inventoryItem.itemName}</p>
                    <p>Description: {item.inventoryItem.Description}</p>
                  </div>
                  <button onClick={() => handleRemoveItem(item.key)}>Remove from Inventory</button>
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
