import firebase from './firebase';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';

function App() {
  const [inventoryList, setInventoryList] = useState([]);
  useEffect (() => {
    const database = getDatabase(firebase)
    const dbRef = ref(database)
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      console.log(data);
      for (let itemKey in data) {
        newState.push(data[itemKey]);
        // console.log(data[itemKey]);
      }
      setInventoryList(newState);
      // console.log(newState);
    });
  }, [])

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
    </div>
  )
}


export default App;
