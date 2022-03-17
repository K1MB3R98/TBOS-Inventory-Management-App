import React, { useState } from 'react';
import { ref, push, child, update } from "firebase/database";
import { database } from './firebase';

function AddItemForm() {

    const [Type, setType] = useState ('');
    const [itemName, setItemName] = useState('');
    const [Description, setDescription] = useState('');
    const [Volume, setVolume] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [Price, setPrice] = useState('');

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        if (id === "Type") {
            setType(value);
        }
        if (id === "itemName") {
            setItemName(value);
        }
        if (id === "Description") {
            setDescription(value);
        }
        if (id === "Volume") {
            setVolume(value);
        }
        if (id === "Quantity") {
            setQuantity(value);
        }
        if (id === "Price") {
            setPrice(value);
        }
    }

    const handleSubmit = () => {
        if (!itemName || !Type || !Volume || !Quantity || !Price) {
            alert("You forgot to enter data in one or more fields.");
        } else {
            let obj = {
                Type:Type,
                itemName:itemName,
                Description:Description,
                Volume:Volume,
                Quantity:Quantity,
                Price:Price,
            }
            const newItemKey = push(child (ref (database), 'posts')).key;
            const updates = {};
            updates['/' + newItemKey] = obj;
            return update(ref (database), updates);
        }
    }

    return (
        <form>
            <h3>Add New Item</h3>
            <div className="formBody">
                <div className="itemName">
                    <label 
                        className="formLabel" 
                        htmlFor="itemName">
                        Item Name: 
                    </label>
                    <input 
                        className="formInput" 
                        type="text" 
                        id="itemName" 
                        value={itemName} 
                        onChange={(event) => handleInputChange(event)} 
                        placeholder=""
                    />
                </div>
                <div className="description">
                    <label  
                        htmlFor="Description">
                        Item Description: 
                    </label>
                    <textarea 
                        className="formInput" 
                        type="text" 
                        id="Description" 
                        value={Description} 
                        onChange={(event) => handleInputChange(event)} 
                        placeholder="">
                    </textarea>
                </div>
                <div className="type">
                    <label 
                        className="formLabel" 
                        htmlFor="Type">
                        Item Type: 
                    </label>
                    <input 
                        className="formInput" 
                        type="text" 
                        id="Type" 
                        value={Type} 
                        onChange={(event) => handleInputChange(event)} 
                        placeholder="e.g. Seasoning"
                    />
                </div>
                <div className="volume">
                    <label 
                    className="formLabel" 
                    htmlFor="Volume">
                        Volume/Weight: 
                    </label>
                    <input 
                    className="formInput" 
                    type="Volume" id="Volume" 
                    value={Volume} 
                    onChange={(event) => handleInputChange(event)} 
                    placeholder="e.g. 20g or 250ml"/>
                </div>
                <div className="quantity">
                    <label 
                        className="formLabel" 
                        htmlFor="Quantity">
                        Quantity: 
                    </label>
                    <input 
                        className="formInput" 
                        type="Quantity" 
                        id="Quantity" 
                        value={Quantity} 
                        onChange={(event) => handleInputChange(event)} 
                        placeholder=""
                    />
                </div>
                <div className="price">
                    <label 
                        className="formLabel" 
                        htmlFor="Price">
                        Price: $
                    </label>
                    <input 
                        className="formInput" 
                        type="Price" 
                        id="Price" 
                        value={Price} 
                        onChange={(event) => handleInputChange(event)} 
                        placeholder=""
                    />
                </div>
            </div>

            <div>
                <button className='formButton' onClick={() => handleSubmit()} type="submit">Add Item</button>
            </div>
        </form>
    )
}

export default AddItemForm;