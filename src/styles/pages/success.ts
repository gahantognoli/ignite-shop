import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: "656px",

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: "560px",
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: 1.4,
  },

  a: {
    marginTop: "5rem",
    display: "block",
    fontSize: "$lg",
    color: "$green500",
    textDecoration: "none",

    '&:hover': {
      color: "$green300",
    }
  }
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: "130px",
  height: "145px",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: "8px",
  padding: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "4rem",

  img: {
    objectFit: "cover",
  }
});
