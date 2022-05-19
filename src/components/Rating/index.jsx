import ReactStars from "react-rating-stars-component";

const Rating = ({ value, onChange = () => {}, ...props }) => {
  return (
    <ReactStars
      count={5}
      onChange={onChange}
      size={24}
      activeColor="#ffd700"
      value={value}
      {...props}
    />
  );
};

export default Rating;
