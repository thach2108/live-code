import axios from "axios";

export const getProducts = () => {
  return axios({
    method: "get",
    url: "http://localhost:3000/products",
  });
};

export const getProduct = (id) => {
  return axios({
    method: "get",
    url: "http://localhost:3000/products/" + id,
  });
};
