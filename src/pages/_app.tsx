import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import logoImg from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";
import { ShoppingCartButton } from "../components/shopping-cart-button";
import { Car } from "lucide-react";
import { CartProvider } from "use-shopping-cart";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.STRIPE_PUBLIC_KEY}
      successUrl={`${process.env.NEXT_URL}/success`}
      cancelUrl={`${process.env.NEXT_URL}/`}
      currency="BRL"
      shouldPersist={true}
    >
      <Container>
        <Header>
          <Image src={logoImg} alt="" />
          <ShoppingCartButton />
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}
