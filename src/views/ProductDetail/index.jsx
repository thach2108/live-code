import { useEffect, useState } from "react";
import Rating from "../../components/Rating";
import { BsHeart } from "react-icons/bs";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { Tabs } from "antd";

import "./styles.scss";
import { getProductDetail } from "../../services";

const { TabPane } = Tabs;

const ProductDetail = () => {
  const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    getProductDetail(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

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

  const onChangeQty = (value) => {
    setQty(value);
  };

  console.log("product: ", product);

  const images = [
    {
      original: product?.small_image?.url,
      thumbnail: product?.small_image?.url,
    },
  ];

  return (
    <div className="products-detail container">
      <div className="products-detail__row mb-4">
        <div className="products-detail__left">
          <ImageGallery
            items={images}
            thumbnailPosition="left"
            showPlayButton={false}
          />
        </div>
        <div className="products-detail__right">
          <div className="tag">
            <span className="sale">sale</span>
            <span className="ready">Ready to ship</span>
          </div>
          <h3 className="title">{product.name}</h3>
          <div className="review">
            <div className="left">
              <Rating value={product.rating_summary} /> {product.review_count}{" "}
              Reviews | {product.rating_summary} Sold
            </div>
            <BsHeart />
          </div>
          <div className="products-detail__price">
            <span className="products-detail__price--new">
              {getPrice(product)}
            </span>
            {product.special_price && (
              <span className="products-detail__price--old">{`${product.price?.regularPrice?.amount?.currency} ${product.price?.regularPrice?.amount?.value}`}</span>
            )}{" "}
            {getDiscount(product)}
          </div>
          <div className="flex mb-4">
            <div className="quantity mr-3">
              <div className="mb-2 weight-700">Quantity (Box)</div>
              <div>
                <button
                  onClick={() => onChangeQty(qty - 1)}
                  className="btn btn-circle btn-outline"
                >
                  -
                </button>
                <input
                  value={qty}
                  onChange={(e) => onChangeQty(e.target.value)}
                  className="text-center form-control mr-2 ml-2"
                  type="number"
                />
                <button
                  onClick={() => onChangeQty(qty + 1)}
                  className="btn btn-circle btn-outline"
                >
                  +
                </button>
              </div>
            </div>
            <div className="total">
              <div className="weight-700">
                Subtotal {product.price?.regularPrice?.amount?.currency}
              </div>
              <div className="text-right mt-3">
                <b>
                  {product.price?.regularPrice?.amount?.currency}{" "}
                  {(
                    qty *
                    (product.special_price
                      ? product.special_price
                      : product.price?.regularPrice?.amount?.value)
                  ).toFixed(2)}
                </b>
              </div>
            </div>
          </div>
          <ul className="mb-4">
            <li>Minimum order 1 box</li>
            <li>Stock avaiable 100 box</li>
          </ul>
          <div className="mb-4">
            <button className="btn-add-to-cart btn btn-outline">
              Add to cart
            </button>
            <button className="btn-buy-now btn btn-primary">buy now</button>
          </div>
          <div>SKU: {product.sku}</div>
        </div>
      </div>
      <div className="tab">
        <Tabs defaultActiveKey="1" onChange={() => {}}>
          <TabPane tab="Description" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Reviews" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
