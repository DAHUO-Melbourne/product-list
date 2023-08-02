import React, {useState} from 'react';
import data from './constants/products.json';
import { numRgex } from './constants/tools';

interface shoppingItem {
  name: string,
  type: string,
  price: number,
  itemNum: number,
}

const App = () => {
  const products = data.products;

  const [shoppingItemList, setShoppingItemList] = useState<shoppingItem[]>([]);
  const [memberShip, setMemberShip] = useState<boolean>(false);
  const [memberLoggedIn, setMemberLoggedIn] = useState<boolean>(false);
  const [showNumNightsInput, setShowNumNightsInput] = useState<boolean>(false);
  const [currentSelectedShoppingItem, seCcurrentSelectedShoppingItem] = useState<string>('');
  const [numOfNights, setNumOfNights] = useState<string>('1');

  const handleProductClick = (e: React.MouseEvent) => {
    const selectedCard = e.target as HTMLElement;
    if(selectedCard.nodeName !== 'BUTTON') {
      return;
    }
    const selectedProductLabel = selectedCard.closest('div')?.ariaLabel as string;
    selectedProductLabel === 'Membership' && setMemberShip(true);
    const selectedProductInfo = products?.filter((prod) => {
      if (prod.name === selectedProductLabel) {
        return prod;
      }
    });
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
    let initPrice = 0;
    const totalPrice = shoppingItemList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price * currentValue.itemNum,
      initPrice
    );
    return totalPrice;
  }

  const calculateTotalDiscount = () => {
    let totalPrice = calculateTotalPrice();
    let totalDiscount;
    if(totalPrice < 500) {
      totalDiscount =  0
    } else if (totalPrice >= 500 && totalPrice < 1000) {
      totalDiscount = 5
    } else {
      totalDiscount = 10;
    }
    return memberShip || memberLoggedIn ? totalDiscount + 10 : totalDiscount;
  }

  const handleApplyNumOfNights = () => {
    const updatedList = shoppingItemList.map((item) => {
      if (item.name === currentSelectedShoppingItem) {
        item.itemNum = parseInt(numOfNights);
      }
      return item
    })
    setShoppingItemList(updatedList);
    setNumOfNights('1');
    seCcurrentSelectedShoppingItem('');
    setShowNumNightsInput(false);
  }

  const verifyAddButtonDisabled  = () => {
    const membershipItem = shoppingItemList.filter((item) => item.type === 'Membership')
    return membershipItem.length > 0;
  }

  return (
    <div className="App">
      <label>
        <input
          type="checkbox"
          id="member"
          name="member"
          checked={memberLoggedIn}
          onChange={() => {
            setMemberLoggedIn((memberLoggedIn) => {return !memberLoggedIn})
          }}
        />
        membership logged-in
      </label>
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
            <button
              disabled={item.type === 'Membership' && verifyAddButtonDisabled()}
            >
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
            <div>
              <h5
                className='item-num'
                onClick={() => {
                  setNumOfNights('1');
                  seCcurrentSelectedShoppingItem(item.name);
                  setShowNumNightsInput(true)
                }}
              >
                {item.itemNum}
              </h5>
            </div>
          </div>
        ))}
      </div>
      {showNumNightsInput && (
        <div>
          <label>
            <input
              value={numOfNights}
              onChange={(e) => {
                setNumOfNights(e.target.value.replace(numRgex, ''));
              }}
            />
            {currentSelectedShoppingItem}
          </label>
          <button
            onClick={handleApplyNumOfNights}
          >
            apply
          </button>
        </div>
      )}
      <h1>
        TOTAL PRICE: {calculateTotalPrice()}
      </h1>
      <h1>
        TOTAL DISCOUNT: {calculateTotalDiscount()}%
      </h1>
    </div>
  );
}

export default App;
