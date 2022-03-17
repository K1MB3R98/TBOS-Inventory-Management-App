import firebase from './firebase';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import './App.css'
import Header from './Header.js';
import AddItemForm from './AddForm.js';
import Footer from './Footer.js';

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
      <div className='wrapper'>
        <Header />
        {/* Display Add Item to Inventory Form */}
        <div className='invAdd'>
          <AddItemForm />
        </div>

        {/* Display current inventory list on screen */}
        <div className='invList'>
          <h3>Current Inventory</h3>
          <ul className='list'>
            {inventoryList.map( (item) => {
              return (
                <li key={item.key}>
                  <ul className='smallDetails'>
                    <li>
                      <h4>Type:</h4>
                      <p>{item.inventoryItem.Type}</p>
                    </li>
                    <li>
                      <h4>Vol./Wt.:</h4>
                      <p>{item.inventoryItem.Volume}</p>
                    </li>
                    <li>
                      <h4>Quantity:</h4>
                      <p>{item.inventoryItem.Quantity}</p>
                    </li>
                    <li>
                      <h4>Price:</h4>
                      <p>${item.inventoryItem.Price}</p>
                    </li>
                  </ul>
                  <div className='largeDetails'>
                    <h4>Item Name: </h4>
                    <p>{item.inventoryItem.itemName}</p>
                    <h4>Description: </h4>
                    <p>{item.inventoryItem.Description}</p>
                  </div>
                  <button className='removeButton' onClick={() => handleRemoveItem(item.key)}>Remove from Inventory</button>
                  <hr />
                </li>
              )
            })}
          </ul>
        </div>
        {/* END: invList */}
      </div>
      {/* END: wrapper */}
      <Footer />
    </div>
    // END: container
  )
}

export default App;