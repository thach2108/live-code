import { useEffect, useState } from "react";
import Rating from "../../components/Rating";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getList } from "../../services";
import "./styles.scss";

const ProductLists = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getList()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getPrice = (item) => {
    return (
      <span style={{ marginRight: 5 }}>
        {item.special_price
          ? `${item.price?.regularPrice?.amount?.currency} ${item.special_price}`
          : `${item.price?.regularPrice?.amount?.currency} ${item.price?.regularPrice?.amount?.value}`}
      </span>
    );
  };

  const getDiscount = (item) => {
    return item.special_price ? (
      <span className="discount">
        -{" "}
        {(
          ((item.price?.regularPrice?.amount?.value - item.special_price) /
            item.price?.regularPrice?.amount?.value) *
          100
        ).toFixed(2)}{" "}
        %
      </span>
    ) : (
      ""
    );
  };

  console.log("products: ", products);

  return (
    <div className="products-list container">
      <header className="header">Our products</header>
      <div className="row">
        {products &&
          products.map((item) => {
            return (
              <div key={item.id} className="col-20">
                <article className="products-list__article" key={item.id}>
                  <div className="product-list__img">
                    <img src={item.small_image.url} alt="product"/>
                  </div>
                  <div className="product-list__info">
                    <div className="product-list__name blue-400">
                      <Link
                        to={`/products/${item.id}`}
                        title="See product details"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="product-list__price">
                      <div className="product-list__price--new">
                        {getPrice(item)} {getDiscount(item)}
                      </div>
                      {item.special_price && (
                        <div className="product-list__price--old">{`${item.price?.regularPrice?.amount?.currency} ${item.price?.regularPrice?.amount?.value}`}</div>
                      )}
                    </div>
                  </div>
                  <div className="product-list__rating">
                    <Rating value={item.rating_summary} />
                    <BsHeart />
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
