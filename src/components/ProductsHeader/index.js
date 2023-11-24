import React from 'react';
import { BsFilterRight } from 'react-icons/bs';
import './index.css';

const ProductsHeader = ({ sortbyOptions, activeOptionId, changeSortby }) => {
  const onChangeSortby = (event) => {
    changeSortby(event.target.value);
  };

  return (
    <div className="products-header mb-5 mt-5 ">
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
         <div className='d-flex flex-row mt-3 mr-3'>
            <BsFilterRight className="sort-by-icon" />
            <p className="sort-by">Sort by</p>
         </div>
        
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map((eachOption) => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductsHeader;
