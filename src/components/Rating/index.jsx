import ReactStars from "react-rating-stars-component";
import React from "react";

const Rating = ({ value = 0, ...props }) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      isHalf={true}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor="#ffd700"
      value={value}
      {...props}
    />
  );
};

export default Rating;
