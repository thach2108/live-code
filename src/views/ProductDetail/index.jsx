import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services";
import ImageGallery from "react-image-gallery";
import { BsHeart, BsCart4 } from "react-icons/bs";
import Rating from "../../components/Rating";
import {
  getOldPrice,
  getDiscount,
  getPrice,
  getCurrency,
} from "../../services/support";
import Order from "./components/Order";
import { Tabs } from "antd";

import "./styles.scss";

const { TabPane } = Tabs;

const ProductDetail = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getProduct(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  console.log("product: ", product);

  function callback(key) {
    console.log(key);
  }

  const images = [
    {
      original: product.small_image?.url,
      thumbnail: product.small_image?.url,
    },
    {
      original: product.small_image?.url,
      thumbnail: product.small_image?.url,
    },
  ];

  return (
    <div className="product container pb-5">
      <div className="row my-5">
        <div className="col-6 product__left">
          <ImageGallery thumbnailPosition="left" items={images} />
        </div>
        <div className="col-6 product__right">
          <div className="tag mb-4">
            <span className="sale px-2">Sale</span>
            <span className="ready px-2">Ready to ship</span>
          </div>
          <div className="product__title mb-4">{product.name}</div>
          <div className="reviews d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Rating value={product.rating_summary} />
              <span style={{ marginLeft: 5 }}>
                {product.review_count} Reviews | {product.rating_summary} Sold
              </span>
            </div>
            <BsHeart />
          </div>
          <div className="price p-3">
            <div className="price--new">
              {getCurrency(product)} {getPrice(product)}{" "}
              {getOldPrice(product) && (
                <span className="price--old">
                  {getCurrency(product)} {getOldPrice(product)}
                </span>
              )}{" "}
              {getDiscount(product) && (
                <span className="px-2 discount border border-danger">
                  -{getDiscount(product)}%
                </span>
              )}
            </div>
          </div>
          <Order product={product} />
          <ul>
            <li>Minimum orders 1 Box</li>
            <li>Stock Avaiable 100 Box</li>
          </ul>
          <div className="row py-4">
            <div className="col-6">
              <button className="w-100 btn btn-outline-dark d-flex align-items-center justify-content-between">
                <BsCart4 style={{ marginRight: 5 }} /> Add to cart
              </button>
            </div>
            <div className="col-6">
              <button className="w-100 btn btn-dark">Buy now</button>
            </div>
          </div>
          <span>SKU: {product.sku}</span>
        </div>
      </div>

      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Description" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Reviews" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProductDetail;
