import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";
import { CartDetails } from "use-shopping-cart/core";
import Stripe from "stripe";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const items = req.body.items as CartDetails;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = Object.keys(items).map((key) => {
    const item = items[key];
    return {
      price_data: {
        currency: item.currency, 
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    };
  });

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: lineItems,
  });

  return res.status(201).json({ checkoutUrl: checkoutSession.url });
}
