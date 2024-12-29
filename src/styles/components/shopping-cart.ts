import { styled } from "..";

export const ShoppingCartContainer = styled("div", {
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 999,
  width: 400,
  height: "100vh",
  backgroundColor: "$gray800",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "2rem",

  transition: "transform 0.3s ease-in-out",

  h1: {
    color: "$gray100",
    fontSize: "$md",
    paddingBottom: "2rem",
  },

  "button[class=close]": {
    width: 20,
    backgroundColor: "transparent",
    border: 0,
    color: "$gray100",
    alignSelf: "flex-end",
    cursor: "pointer",
  },
});

export const ShoppingCartItems = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  flex: 2,
});

export const ShoppingCartItemContainer = styled("div", {
  display: "flex",
  alignItems: "flex-start",
  gap: "1rem",
});

export const ShoppingCartItem = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "0.25rem",

  div: {
    height: "90px",
  },

  p: {
    color: "$gray300",
  },

  button: {
    color: "$green500",
    backgroundColor: "transparent",
    border: 0,
    fontSize: "$md",
    cursor: "pointer",
  },
});

export const ShoppingCartItemImage = styled("div", {
  width: "120px",
  height: "120px",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const ShoppingCartTotal = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
  padding: "2rem 0",

  "p + p": {
    textAlign: "right",
  },

  strong: {
    fontSize: "$lg",
  },

  "strong + strong": {
    textAlign: "right",
  },
});

export const ShoppingCartCheckout = styled("button", {
  backgroundColor: "$green500",
  border: 0,
  color: "$white",
  borderRadius: 8,
  padding: "1.25rem",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "$md",

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  "&:not(:disabled):hover": {
    backgroundColor: "$green300",
  },
});
