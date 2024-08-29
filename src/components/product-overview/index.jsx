import { useContext } from "react";
import "./product-overview.scss";
import PropTypes from 'prop-types';
import MainContext from "../../contexts/MainContext";

export default function ProductOverview({ product }) {
  const { country } = useContext(MainContext);


  return (
    <div id={`product-id-${product.id}`} className="product-overview">
      <div className="img-wrapper">
        <img src={product.img} alt="Notebook image" />
      </div>
      <div className="product-detail">
        <p className="strong">
          {product.title}
        </p>
        <p className="strong">Qty: 01</p>
        <p className="align-right strong">{`${product.price.toLocaleString("en", { minimumFractionDigits: 2 })} ${country?.symbol}`}</p>
      </div>
    </div>
  );
}

ProductOverview.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    })

}
