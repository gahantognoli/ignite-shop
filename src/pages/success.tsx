import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Head } from "next/document";

interface SuccessProps {
  customerName: string;
  products: Stripe.Product[];
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      {/* <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head> */}
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <p>
          Uhuuul <strong>{customerName}</strong>,{" "}
          {products.length > 1 ? "seus itens " : "seu item "}{" "}
          <strong>{products.map((p) => p.name).join(", ")}</strong> já{" "}
          {products.length > 1 ? "estão" : "está"} a caminho da sua casa.
        </p>
        <Link href={"/"}>Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;
  const products = session.line_items.data.map(
    (item) => item.price.product
  ) as Stripe.Product[];

  return {
    props: {
      customerName,
      products,
    },
  };
};
