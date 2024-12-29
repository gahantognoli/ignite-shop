import { ShoppingBag } from "lucide-react";
import {
  ShoppingCartBadge,
  ShoppingCartButtonComponent,
  ShoppingCartButtonContainer,
} from "../styles/components/shopping-cart-button";
import { useShoppingCart } from "use-shopping-cart";
import { ShoppingCart } from "./shopping-cart";
import { useState } from "react";

export function ShoppingCartButton() {
  const { cartCount } = useShoppingCart();
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  function toggleShoppingCart() {
    setShowShoppingCart(!showShoppingCart);
  }

  return (
    <>
      <ShoppingCartButtonContainer onClick={toggleShoppingCart}>
        <ShoppingCartButtonComponent>
          <ShoppingBag size={24} />
        </ShoppingCartButtonComponent>
        {cartCount > 0 ? (
          <ShoppingCartBadge>{cartCount}</ShoppingCartBadge>
        ) : null}
      </ShoppingCartButtonContainer>
      {showShoppingCart && (
        <ShoppingCart toggleShoppingCart={toggleShoppingCart} />
      )}
    </>
  );
}
