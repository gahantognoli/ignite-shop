import { relative } from "path";
import { styled } from "..";

export const ShoppingCartButtonContainer = styled("div", {
  display: "flex",
});

export const ShoppingCartButtonComponent = styled("button", {
  padding: "0.5rem",
  backgroundColor: "$gray800",
  border: 0,
  color: "$gray100",
  borderRadius: "4px",
  cursor: "pointer",
});

export const ShoppingCartBadge = styled("span", {
  display: "block",
  width: 24,
  height: 24,
  position: "relative",
  top: -8,
  left: -10,
  backgroundColor: "$green500",
  color: "$gray100",
  borderRadius: "50%",
  textAlign: "center",
  alignContent: "center",
});
