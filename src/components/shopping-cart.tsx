import { useShoppingCart } from "use-shopping-cart";
import {
  ShoppingCartCheckout,
  ShoppingCartContainer,
  ShoppingCartItem,
  ShoppingCartItemContainer,
  ShoppingCartItemImage,
  ShoppingCartItems,
  ShoppingCartTotal,
} from "../styles/components/shopping-cart";
import Image from "next/image";
import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";

interface ShoppingCartProps {
  toggleShoppingCart: () => void;
}

export function ShoppingCart({ toggleShoppingCart }: ShoppingCartProps) {
  const { cartDetails, cartCount, decrementItem, clearCart } = useShoppingCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalPrice = Object.keys(cartDetails).reduce((total, key) => {
    const item = cartDetails[key];
    return total + item.quantity * item.price;
  }, 0);

  async function handleCheckout() {
    try {
      setIsCheckingOut(true);
      const res = await axios.post("/api/checkout", {
        items: cartDetails,
      });
      clearCart()
      window.location.href = res.data.checkoutUrl;
    } catch (error) {
      alert("Falha ao redirecionar para checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <ShoppingCartContainer>
      <button className="close" onClick={toggleShoppingCart}>
        <X />
      </button>
      <h1>Sacola de compras</h1>
      <ShoppingCartItems>
        {Object.keys(cartDetails).map((key) => {
          const item = cartDetails[key];
          return (
            <ShoppingCartItemContainer key={key}>
              <ShoppingCartItemImage>
                <Image src={item.image} width={120} height={120} alt="" />
              </ShoppingCartItemImage>
              <ShoppingCartItem>
                <div>
                  <p>{item.name}</p>
                  <strong>
                    {item.quantity} x{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price)}
                  </strong>
                </div>
                <button onClick={() => decrementItem(item.id)}>Remover</button>
              </ShoppingCartItem>
            </ShoppingCartItemContainer>
          );
        })}
      </ShoppingCartItems>
      <ShoppingCartTotal>
        <p>Quantidade</p>
        <p>{cartCount}</p>
        <strong>Valor total</strong>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalPrice)}
        </strong>
      </ShoppingCartTotal>
      <ShoppingCartCheckout
        disabled={totalPrice <= 0 || isCheckingOut}
        onClick={handleCheckout}
      >
        Finalizar compra
      </ShoppingCartCheckout>
    </ShoppingCartContainer>
  );
}
