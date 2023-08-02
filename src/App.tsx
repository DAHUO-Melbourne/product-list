import React, {useState} from 'react';
import data from './constants/products.json';

interface shoppingItem {
  itemName: string,
  itemNum: number,
}

const App = () => {
  const products = data.products;

  const [shoppingItemList, setShoppingItemList] = useState<shoppingItem[]>([]);

  const handleProductClick = (e: React.MouseEvent) => {
    const selectedCard = e.target as HTMLElement;
    if(selectedCard.nodeName !== 'BUTTON') {
      return;
    }
    const selectedProductLabel = selectedCard.closest('div')?.ariaLabel as string;
    const itemExists = shoppingItemList.filter((item) => (item.itemName === selectedProductLabel))
    if (itemExists.length === 0) {
      setShoppingItemList([
        ...shoppingItemList,
        {
          itemName: selectedProductLabel,
          itemNum: 1,
        }
      ]);
      return;
    }
    const updatedList = shoppingItemList.map((item) => {
      if (item.itemName === selectedProductLabel) {
        item.itemNum ++
      }
      return item
    })
    setShoppingItemList(updatedList);
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
            <h2>
              {item.name}
            </h2>
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
      <h1>
        shopping cart info
      </h1>
      <div>
        {shoppingItemList.map((item) => (
          <div
            className='shopping-item-wrapper'
            key={item.itemName}
          >
            <h4>{item.itemName}</h4>
            <h5>{item.itemNum}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
