import React, {useState} from 'react';
import data from './constants/products.json';

const App = () => {
  const products = data.products;

  const [shoppingItemList, setShoppingItemList] = useState<string[]>([]);

  const handleProductClick = (e: React.MouseEvent) => {
    const selectedCard = e.target as HTMLElement;
    if(selectedCard.nodeName !== 'BUTTON') {
      return;
    }
    const selectedProductLabel = selectedCard.closest('div')?.ariaLabel as string;
    setShoppingItemList([
      ...shoppingItemList,
      selectedProductLabel
    ])
  }

  return (
    <div className="App">
      <div onClick={handleProductClick}>
        {products.map((item) => (
          <div
            key={item.name}
            className='product-item'
            aria-label={item.name}
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
            <button>
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
