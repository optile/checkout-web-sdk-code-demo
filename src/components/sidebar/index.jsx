import { useContext } from "react";
import { products } from "../../utils";
import ProductOverview from "../product-overview";
import "./sidebar.scss";
import MainContext from "../../contexts/MainContext";

export default function Sidebar() {
  const { country } = useContext(MainContext);

  const subTotal = (products || []).reduce((accum, { price }) => accum + price, 0).toLocaleString("en", { minimumFractionDigits: 2 });

  return (
    <aside className="sidebar">
      <h2>Shopping Card</h2>
      <hr></hr>
      {products.map((product) => (
        <ProductOverview product={product} key={product.id} />
      ))}
      <div>
        <div className="details-tab">
          <p className="strong">Subtotal</p>
          <p className="strong">{subTotal} {country?.symbol}</p>
        </div>
        <div className="details-tab">
          <p className="strong">Shipping</p>
          <p className="strong">Free</p>
        </div>
        <div className="seperator" />
        <div className="details-tab">
          <p className="strong">Total</p>
          <p className="strong">{subTotal} {country?.symbol}</p>
        </div>
      </div>
    </aside>
  );
}
