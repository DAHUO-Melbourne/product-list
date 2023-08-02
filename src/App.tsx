import React, {useState} from 'react';
import data from './constants/products.json';

interface shoppingItem {
  name: string,
  type: string,
  price: number,
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
    const selectedProductInfo = products?.filter((prod) => {
      if (prod.name === selectedProductLabel) {
        return prod;
      }
    });
    console.log(selectedProductInfo[0]);
    const itemExists = shoppingItemList.filter((item) => (item.name === selectedProductLabel))
    if (itemExists.length === 0) {
      setShoppingItemList([
        ...shoppingItemList,
        {
          ...selectedProductInfo[0],
          itemNum: 1,
        }
      ]);
      return;
    }
    const updatedList = shoppingItemList.map((item) => {
      if (item.name === selectedProductLabel) {
        item.itemNum ++
      }
      return item
    })
    setShoppingItemList(updatedList);
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    shoppingItemList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      totalPrice
    );
    return totalPrice;
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
            key={item.name}
          >
            <h4>{item.name}</h4>
            <h5>{item.itemNum}</h5>
          </div>
        ))}
      </div>
      <h1>
        TOTAL PRICE: {calculateTotalPrice()}
      </h1>
    </div>
  );
}

export default App;
