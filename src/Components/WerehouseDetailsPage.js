import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editWarehouse } from '../Redux/Action';
import imageUrl from './images.jpg'; 

const WarehouseDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const warehouses = useSelector((state) => state.Reducer);

  // Find the warehouse with the matching 'id'
  const data = warehouses.find((warehouse) => warehouse.id === parseInt(id, 10));
  //console.log(data)

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: data ? data.name : '',
    city: data ? data.city : '',
    space_available: data ? data.space_available : '',
    cluster: data ? data.cluster : '',
    is_live: data ? data.is_live : '',
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Dispatch an action to update the warehouse data in the Redux store
    if (data) {
      dispatch(editWarehouse(data.id, formData));
      alert("Your Data is Saved");
      // Exit edit mode
      setIsEditing(false);
    }
  };

  return (
    <div className="container mt-5">
    <div className="row">
      <div className="col-md-4">
        <img
          src={imageUrl} 
          alt={data.name}
          className="img-fluid"
        />
      </div>
      <div className="col-md-8">
      {isEditing ? (
        <div>
          <h2>Edit Warehouse</h2>
          <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
                  <label className="form-label">Warehouse Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cluster</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cluster"
                    value={formData.cluster}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Space Available</label>
                  <input
                    type="number"
                    className="form-control"
                    name="space_available"
                    value={formData.space_available}
                    onChange={handleInputChange}
                  />
                </div>
              <div className="mb-3">
              <label className="form-label">  is_Live   </label>
              <input
                type="text"
                id="is_live"
                name="is_live"
                value={formData.is_live ? "Yes" : "No"}
                onChange={handleInputChange}
              />
            </div>


            <button type="submit"
                  className="btn btn-primary"
                  >Save</button>
          </form>
        </div>
      ) : (
            // Display details
            <div>
              <h1>{data.name}</h1>
              <p>Warehouse Code: {data.code}</p>
              <p>City: {data.city}</p>
              <p>Cluster: {data.cluster}</p>
              <p>Space Available: {data.space_available}</p>
              <p>Type: {data.type}</p>              
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
          )}
    </div>
    </div>
    </div>
  );
};

export default WarehouseDetailsPage;
