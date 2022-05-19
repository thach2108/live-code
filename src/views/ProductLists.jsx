import { useEffect, useState } from "react";
import axios from "axios";

const ProductLists = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/products",
    })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleLinkClick = () => {
    console.log("open product page");
  };

  console.log("products: ", products);

  return (
    <div>
      <header>Our products</header>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {products &&
          products.map((item) => {
            return (
              <div
                style={{
                  flexฺฺBasis: "20%",
                  flexGrow: 0,
                  maxWidth: "20%",
                }}
              >
                <article
                  style={{
                    marginBottom: "1.4rem",
                    marginLeft: 4,
                    marginRight: 4,
                    border: "1px solid #e9e4dd",
                    position: "relative",
                  }}
                  key={item.id}
                >
                  <a
                    href=""
                    title="See product details"
                    onClick={handleLinkClick}
                  >
                    <img
                      src={item.small_image.url}
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        height: "100%",
                      }}
                    />
                    <div>{item.name}</div>
                    <div>
                      {`${
                        item.price &&
                        item.price.regularPrice &&
                        item.price.regularPrice.amount.value
                      }`}
                    </div>
                  </a>
                </article>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductLists;
