import { useEffect, useState, useMemo } from "react";

import { db } from "../db.js"
import type { GuitarItem } from "../types/index.js";
import type { Guitar } from "../types/index.js";
// import type { GuitarId } from "../types/index.js";

const useCart = () => {

  const [guitars] = useState(db);

  const initialCart = () : GuitarItem[]=> {
    const cartLocalStorage = localStorage.getItem("cart");
    return cartLocalStorage ? JSON.parse(cartLocalStorage) : [];
  };

  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddCart = (item: Guitar) => {
    const index = cart.findIndex((c) => c.id === item.id);

    if (index >= 0) {
      const cartReplicated = [...cart];
      cartReplicated[index].quantity++;
      setCart(cartReplicated);
    } else {
      const newItem : GuitarItem = { ...item, quantity: 1 }
      setCart([...cart, newItem]);
    }

  };

  const handleDeleteItem = (id: Guitar['id']) => {
    setCart(cart.filter((item) => item.id !== id));
    // another way to do this --> setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleIncrementItems = (id: Guitar['id']) => {
    const index = cart.findIndex((item) => item.id === id);
    const replica = [...cart];

    if (replica[index].quantity < 10) {
      replica[index].quantity++;
      setCart(replica);
    }
  };

  const handleDecrementItems = (id: Guitar['id']) => {
    const index = cart.findIndex((item) => item.id === id);
    const replica = [...cart];

    if (replica[index].quantity > 1) {
      replica[index].quantity--;
      setCart(replica);
    }
  };

  const handleEmptyCart = () => {
    setCart([]);
  };

  // derivated state
  const setTotal = useMemo(() => 
    cart.reduce((total, currentValue) => total + (currentValue.price * currentValue.quantity), 0),
  [cart]);

  // derivated state
  const isEmpty = useMemo(() => 
    cart.length !== 0, 
  [cart]);

  return {
    guitars,
    cart, 
    handleAddCart,
    handleDeleteItem,
    handleIncrementItems,
    handleDecrementItems,
    handleEmptyCart,
    setTotal,
    isEmpty
  };
};

export default useCart;
