import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import "./payment-methods.scss";
import { generateList, initCheckout } from "./checkout";
import MainContext from "../../contexts/MainContext";
import { useSearchParams } from "react-router-dom";

export default function PaymentMethods() {
  const { country } = useContext(MainContext);
  const neetworksRef = useRef([]);
  const [longId, setLongId] = useState("");
  const [checkout, setCheckout] = useState(undefined);
  const [activeNetwork, setActiveNetwork] = useState("");
  const [searchParams] = useSearchParams();

  /**
   * method, env, and longId are passed as URL query params
   */
  const method = searchParams.get("method");
  const env = searchParams.get("env") || "pi-nightly.integration";
  const id = searchParams.get("longId");

  useEffect(() => {
    /**
     * Use the longId passed by URL query param or generate a new list session.
     */
    if (!id) {
      generateList("EMBEDDED", 100, country, method || "").then((response) => {
        setLongId(response?.identification?.longId);
      });
    } else {
      setLongId(id);
    }
  }, [method, country, searchParams, id]);

  useEffect(() => {
    /**
     * Initialise Checkout Web
     */
    if (longId) {
      initCheckout(longId, env).then((checkoutInstance) => {
        setCheckout(checkoutInstance);
      });
    }
  }, [longId, env]);

  useEffect(() => {
    /**
     * Do not proceed to droppping-in and rendering of drop-in components
     * before checkout instance is available.
     */
    if (!checkout) return;

    /**
     * Store reference of drop-in component instances
     */
    const dropIns = [];

    /**
     * Loop through all available drop-in components and render them to the given DOM element
     */
    checkout?.availableDropInComponents().forEach((method, i) => {
      const component = checkout
        .dropIn(method.name, { hidePaymentButton: false }) // Drop-in the component from CDN
        .mount(neetworksRef.current[method.name]); // Mount the component to given DOM node.

      /**
       * Store the initialised components into `dropIns` array.
       */
      dropIns.push(component);

      /**
       * Expand the 1st drop-in component
       */
      if (i === 0) setActiveNetwork(method.name);
    });

    return () => {
      /**
       * Unmount all the drop in components
       */
      dropIns.forEach((d) => {
        d.unmount();
      });
    };
  }, [checkout]);

  if (!checkout) return null;

  return checkout ? (
    <div className="details">
      <h2>Payment Methods</h2>
      {(checkout?.availableDropInComponents() || []).map((method) => (
        <div
          key={method.name}
          id={`${method.name}-component`}
          className="method-wrapper"
        >
          <label
            className="method-header"
            onClick={() => setActiveNetwork(method.name)}
          >
            <div className="method-label">{method.label}</div>
            <div className="network-logos-wrapper">
              {method.networkInformation.map((ni) => (
                <img key={ni.network} src={ni.logoUrl} alt={ni.network} />
              ))}
            </div>
          </label>

          <div
            id={`drop-in-${method.name}`}
            className={`method-body ${
              activeNetwork !== method.name ? "hidden" : ""
            }`}
            ref={(el) => (neetworksRef.current[method.name] = el)}
          ></div>
        </div>
      ))}
    </div>
  ) : null;
}
