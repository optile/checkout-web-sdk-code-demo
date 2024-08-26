import Header from "../components/header";
import PaymentMethods from "../components/payment-methods";
import Sidebar from "../components/sidebar";
import { getCountryDetails } from "../utils";

export default function Checkout() {
    console.log("getCountryDetails", getCountryDetails())
  return (
    <>
      <Header />
      <div className="main-content">
        <main className="main-body">
          <div className="checkout-page">
            <div className="details">
              <h2>Personal details</h2>
              <p>Alex Smith, alexsmith@gmail.com, +49 188299459</p>
            </div>
            <hr />

            <div className="details">
              <h2>Billing details</h2>
              <p>Bayern Street 5, 80336 Munich, Germany</p>
              <p className="fade-text"><input type="checkbox" name="billing-check" disabled checked /> Use this address for billing information</p>
            </div>
            <hr />

            <PaymentMethods />
          </div>
        </main>
        <Sidebar />
      </div>
    </>
  );
}
