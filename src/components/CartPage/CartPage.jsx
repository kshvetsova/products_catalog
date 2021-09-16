import React, { useContext, useEffect, useState } from 'react';
import './CartPage.scss';
import { useHistory } from 'react-router';
import { ProductCart } from '../ProductCart';
import { ProductsContext } from '../../ProductsProvider';

export const CartPage = () => {
  const history = useHistory();
  const { carts, setCarts } = useContext(ProductsContext);
  const [totalPriceHidden, setTotalPriceHidden] = useState(false);
  const [totalPrice, setTotalPrice] = useState(
    JSON.parse(localStorage.getItem('carts'))
      ? JSON.parse(localStorage.getItem('carts'))
          .reduce((sum, item) => sum + (item.count * item.price), 0)
      : carts.reduce((sum, item) => sum + (item.count * item.price), 0)
  );

  const [quantity, setQuantity] = useState(
    JSON.parse(localStorage.getItem('carts'))
      ? JSON.parse(localStorage.getItem('carts'))
        .reduce((sum, item) => sum + item.count, 0)
      : carts.length
  );

  useEffect(() => (
    setQuantity(carts.reduce((sum, item) => sum + item.count, 0))
  ), [quantity, carts]);

  useEffect(() => (
    setTotalPrice(carts.reduce((sum, item) => sum + (item.count * item.price), 0))
  ), [totalPrice, carts]);

  return (
    <div className="CartPage">
      <div className="CartPage-Back Back">
        <img src="./img/icons-page/prev.svg" alt="Prev"/>
        <button
          className="Back-Button"
          type="button"
          onClick={() => history.goBack(-1)}
        >
          Back
        </button>
      </div>
      <h1 className="CartPage-Title">Cart</h1>
      <div className="CartPage-Content">
        <ul className="CartPage-ContainerCart">
          {carts.map(item => (
            <li key={item.id}>
              <ProductCart
                {...item}
                quantity={quantity}
                setQuantity={setQuantity}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
              />
            </li>
          ))}
        </ul>
        {totalPriceHidden && (
          <img
            src="./img/page_gif/checkout.gif"
            className="CartPage-CheckoutGif"
            alt="Checkout"
          />
        )}
        {(!totalPriceHidden && carts.length > 0) &&(
          <div className="CartPage-Total">
            <div className="CartPage-CounterPrice">${totalPrice}</div>
            <div className="CartPage-CounterItems">Total for {quantity} items</div>
            <button
              className="CartPage-Checkout"
              onClick={() => {
                setCarts([]);
                setTotalPriceHidden(true);
                setTimeout(() => {setTotalPriceHidden(false)}, 3500);
              }}
            >
              Checkout
            </button>
          </div>
        )}
        {(carts.length === 0 && !totalPriceHidden) && (
          <img
            src="./img/page_gif/cart.gif"
            className="CartPage-CartGif"
            alt="Cart"
          />
        )}
      </div>
    </div>
  )
}