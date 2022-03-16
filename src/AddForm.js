import React, { useState } from 'react';
import { ref, push, child, update } from "firebase/database";
import { database } from './firebase';

function AddItemForm() {

    const [itemId, setItemId] = useState('');
    const [Type, setType] = useState ('');
    const [itemName, setItemName] = useState('');
    const [Description, setDescription] = useState('');
    const [Frozen, setFrozen] = useState('');
    const [Volume, setVolume] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [Price, setPrice] = useState('');

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        if (id === "itemId") {
            setItemId(value);
        }
        if (id === "Type") {
            setType(value);
        }
        if (id === "itemName") {
            setItemName(value);
        }
        if (id === "Description") {
            setDescription(value);
        }
        if (id === "Frozen") {
            setFrozen(value);
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
        console.log(itemId, Type, itemName, Description, Frozen, Volume, Quantity, Price);

        let obj = {
            itemId:itemId,
            Type:Type,
            itemName:itemName,
            Description:Description,
            Frozen:Frozen,
            Volume:Volume,
            Quantity:Quantity,
            Price:Price,
        }
        const newItemKey = push(child (ref (database), 'posts')).key;
        const updates = {};
        updates['/' + newItemKey] = obj;
        return update(ref (database), updates);
    }

    return (
        <form>
            <h3>Add a new item to your inventory</h3>
            <div className="form-body">
                <div className="itemId">
                    <label className="form_label" htmlFor="itemId">Item: # </label>
                    <input className="form_input" type="text" value={itemId} onChange={(event) => handleInputChange(event)} id="itemId" placeholder="e.g.0033" />
                </div>
                <div className="Type">
                    <label className="form_label" htmlFor="Type">Type: </label>
                    <input type="text" id="Type" value={Type} className="form_input" onChange={(event) => handleInputChange(event)} placeholder="Broth/Pickled Garlic/Pickles/Seasoning/Jam/Chutney"/>
                </div>
                <div className="itemName">
                    <label className="form_label" htmlFor="itemName">Item Name: </label>
                    <input type="text" id="itemName" value={itemName} className="form__input" onChange={(event) => handleInputChange(event)} placeholder="Garlic Chicken Bone Broth"/>
                </div>
                <div className="Description">
                    <label className="form_label" htmlFor="Description">Item Description: </label>
                    <input type="Description" id="Description" className="form_input" value={Description} onChange={(event) => handleInputChange(event)} placeholder="What's it like?"/>
                </div>
                <div className="Frozen">
                    <label className="form_label" htmlFor="Frozen">Is this item frozen? </label>
                    <input className="form_input" type="Frozen" id="Frozen" value={Frozen} onChange={(event) => handleInputChange(event)} placeholder="'true' or 'false'"/>
                </div>
                <div className="Volume">
                    <label className="form_label" htmlFor="Volume">Volume/Weight: </label>
                    <input className="form_input" type="Volume" id="Volume" value={Volume} onChange={(event) => handleInputChange(event)} placeholder="How much in each container?  e.g. 20g   250ml"/>
                </div>
                <div className="Quantity">
                    <label className="form_label" htmlFor="Quantity">Quantity: </label>
                    <input className="form_input" type="Quantity" id="Quantity" value={Quantity} onChange={(event) => handleInputChange(event)} placeholder="15"/>
                </div>
                <div className="Price">
                    <label className="form_label" htmlFor="Price">Price: $</label>
                    <input className="form_input" type="Price" id="Price" value={Price} onChange={(event) => handleInputChange(event)} placeholder="12.75"/>
                </div>
            </div>
            <div className="footer">
                <button onClick={() => handleSubmit()} type="submit" className='formButton'>Add Item</button>
            </div>
        </form>

    )
}

export default AddItemForm;