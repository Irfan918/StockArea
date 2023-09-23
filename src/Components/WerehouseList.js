import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import imageUrl from './images.jpg'

const Card = () => {
  const navigate = useNavigate();
  const warehouses = useSelector((state) => state.Reducer);

  // State variables for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [clusterFilter, setClusterFilter] = useState('');
  const [spaceFilter, setSpaceFilter] = useState('');

  // Function to filter warehouses based on applied filters
  const filteredWarehouses = warehouses.filter((warehouse) => {
    // Apply filters based on the selected criteria
    const nameMatch = warehouse.name.toLowerCase().includes(searchTerm.toLowerCase());
    const cityMatch = cityFilter === '' || warehouse.city === cityFilter;
    const clusterMatch = clusterFilter === '' || warehouse.cluster === clusterFilter;
    const spaceMatch = spaceFilter === '' || warehouse.space_available >= parseInt(spaceFilter, 10);

    // Return true if all criteria match
    return nameMatch && cityMatch && clusterMatch && spaceMatch;
  });

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          
          <div>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="form-select mb-3"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              {/*unique cities from warehouses */} 
              <option value="">All Cities</option>
                {Array.from(new Set(warehouses.map((warehouse) => warehouse.city))).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              className="form-select mb-3"
              value={clusterFilter}
              onChange={(e) => setClusterFilter(e.target.value)}
            >
              <option value="">All Clusters</option>           
              {Array.from(new Set(warehouses.map((warehouse) => warehouse.cluster))).map((cluster) => (
                <option key={cluster} value={cluster}>
                  {cluster}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="form-control"
              placeholder="Minimum space available"
              value={spaceFilter}
              onChange={(e) => setSpaceFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
            {filteredWarehouses.map((warehouse) => (
              <div className="col-md-4 mb-4" key={warehouse.id}>
                <div className="card">                 
                  <img
                    src={imageUrl} // Replace with your actual image source
                    className="card-img-top"
                    alt={warehouse.name}
                  />
                  <div className="card-body">
                   
                    <h5 className="card-title">{warehouse.name}</h5>
                    
                    <p className={`card-text ${warehouse.space_available < 100 ? 'text-danger' : ''}`}>
                      Space Available: {warehouse.space_available}
                    </p>
                    
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/werehouseDetails/${warehouse.id}`)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
