import React from 'react';
import data from './constants/products.json';

const App = () => {
  const products = data.products;
  return (
    <div className="App">
      {products.map((item) => (
        <div
          key={item.name}
          className='product-item'
        >
          <h1>
            {item.name}
          </h1>
          <h3>
            {item.type}
          </h3>
          <h5>
            {item.price}
          </h5>
        </div>
      ))}
    </div>
  );
}

export default App;
