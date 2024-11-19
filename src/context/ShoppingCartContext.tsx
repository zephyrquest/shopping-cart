import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/shoppingCart/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ShoppingCartProviderProps {
  children: ReactNode;
}

type CartItem = {
  id: number;
  amount: number;
};

type ShoppingCartContext = {
  getItemAmount: (id: number) => number;
  increaseCartAmount: (id: number) => void;
  decreaseCartAmount: (id: number) => void;
  removeFromCart: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartAmount: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  //const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const cartAmount = cartItems.reduce(
    (amount, item) => item.amount + amount,
    0
  );
  const [isOpen, setIsOpen] = useState(false);

  function getItemAmount(id: number) {
    return cartItems.find((item) => item.id === id)?.amount || 0;
  }

  function increaseCartAmount(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, amount: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, amount: item.amount + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartAmount(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.amount === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, amount: item.amount - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemAmount,
        increaseCartAmount,
        decreaseCartAmount,
        removeFromCart,
        openCart,
        closeCart,
        cartAmount,
        cartItems,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
