import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import Rating from "../../components/Rating";
import { getProducts } from "../../services";
import {
  getOldPrice,
  getDiscount,
  getPrice,
  getCurrency
} from "../../services/support";

import "./styles.scss";

const ProductLists = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log("products: ", products);

  return (
    <div className="product-list container">
      <header className="header text-center">Our products</header>
      <div className="row">
        {products &&
          products.map((item) => {
            return (
              <div className="col-20 product-list__item px-2" key={item.id}>
                <article className="product-list__article mb-2 position-relative       ">
                  <div className="product-list__img">
                    <img src={item.small_image.url} alt={item.name} />
                  </div>
                  <div className="product-list__info p-2 mb-5">
                    <Link
                      className="mb-2"
                      to={`/product/${item.id}`}
                      title="See product details"
                    >
                      {item.name}
                    </Link>
                    <div className="price">
                      <div className="price--new">
                        {getCurrency(item)} {getPrice(item)}{" "}
                        {getDiscount(item) && (
                          <span className="px-2 discount border border-danger">
                            -{getDiscount(item)}%
                          </span>
                        )}
                      </div>
                      {getOldPrice(item) && (
                        <div className="price--old">
                          {getCurrency(item)} {getOldPrice(item)}
                        </div>
                      )}
                    </div>
                    <div className="reviews d-flex justify-content-between align-items-center">
                      <Rating value={item.rating_summary} />
                      <BsHeart />
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductLists;
