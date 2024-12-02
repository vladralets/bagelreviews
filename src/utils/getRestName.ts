import { TRestaurant } from "../types/types";

export const getRestName = (rest: TRestaurant) => {
  switch (rest) {
    case "KV":
      return "Karlovy Vary";
    case "FL":
      return "Florenc";
    case "CH":
      return "Cheb";
    case "ML":
      return "Malostranská";
  }
};
