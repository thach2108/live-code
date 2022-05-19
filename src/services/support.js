export const getDiscount = (item) => {
  return item.special_price
    ? (
        ((item.price?.regularPrice?.amount?.value - item.special_price) /
          item.price?.regularPrice?.amount?.value) *
        100
      ).toFixed(2)
    : null;
};

export const getPrice = (item) => {
  return item.special_price
    ? item.special_price
    : item.price?.regularPrice?.amount?.value;
};

export const getOldPrice = (item) => {
  return item.special_price ? item.price?.regularPrice?.amount?.value : null;
};

export const getCurrency = (item) => {
  return item.price?.regularPrice?.amount?.currency;
};
