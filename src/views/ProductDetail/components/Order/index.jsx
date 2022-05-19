import { useState } from "react";
import { getCurrency } from "../../../../services/support";

const Order = ({ product }) => {
  const [qty, setQty] = useState(1);
  return (
    <div className="row order py-4">
      <div className="col-6">
        <div className="mb-3 title">Quantity (Box)</div>
        <div className="d-flex align-items-center">
          <button
            onClick={() => setQty(qty - 1)}
            className="btn btn-outline-dark"
          >
            -
          </button>
          <input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            type="number"
            className="form-control qty text-center"
          />
          <button
            onClick={() => setQty(qty + 1)}
            className="btn btn-outline-dark"
          >
            +
          </button>
        </div>
      </div>
      <div className="col-6">
        <div className="mb-3 title">Subtotal {getCurrency(product)}</div>
        <div className="btn btn-light w-100 d-flex">
          {getCurrency(product)} {qty.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Order;
