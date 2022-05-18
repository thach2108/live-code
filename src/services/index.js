import axios from "axios";

export const getList = () => {
  return axios({
    method: "get",
    url: `http://localhost:3000/products/`,
  });
};

export const getProductDetail = (id) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/products/${id}`,
  });
};
