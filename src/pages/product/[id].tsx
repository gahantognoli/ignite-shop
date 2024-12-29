import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";
import { useShoppingCart } from "use-shopping-cart";
import type { Product } from "use-shopping-cart/core";

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    sku: string;
    sku_id: string;
    currency: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart();
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  async function handleByProduct() {
    try {
      setIsAddingProduct(true);
      addItem(product);
    } catch (error) {
      alert("Falha ao colocar produto no carrinho.");
    } finally {
      setIsAddingProduct(false);
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.image} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
          </span>
          <p>{product.description}</p>
          <button disabled={isAddingProduct} onClick={handleByProduct}>
            Colocar no carrinho
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: "prod_RTxc0ZBIkKzZ06",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const productStripe = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = productStripe.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: productStripe.id,
        name: productStripe.name,
        description: productStripe.description,
        image: productStripe.images[0],
        price: price.unit_amount / 100,
        sku: "",
        sku_id: "",
        currency: price.currency,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
