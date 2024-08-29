import Header from "../components/header";

export default function Success() {
  return (
    <>
      <Header />
      <div className="main-content">
        <main className="main-body">
          <div className="checkout-page">
            <div className="details">
              <h2>Thank you</h2>
              <p>Your order is successfully completed</p>
            </div>
            </div>
        </main>
      </div>
    </>
  );
}
