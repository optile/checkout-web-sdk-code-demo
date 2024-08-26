import { CheckoutWeb as Checkout } from "@payoneer/checkout-web";

/**
 * Return array of networks based on given payment method
 * @param {string} paymentMethod - paymenet method
 * @returns {Array} array of payment networks
 */
function getPreselection(paymentMethod) {
  switch (paymentMethod) {
    case "cards":
      return ["AMEX", "VISA", "MASTERCARD", "JCB", "DISCOVER"];
    case "afterpay":
      return ["AFTERPAY"];
    case "klarna":
      return ["KLARNA"];
    default:
      return [
        "AMEX",
        "VISA",
        "MASTERCARD",
        "JCB",
        "AFTERPAY",
        "DISCOVER",
        "KLARNA",
      ];
  }
}

/**
 * Generate list session
 * Note: this is meant to be generated from backend, and pass the longId to Checkout Web on frontend.
 *
 * @param {string} integrationType - integration type
 * @param {number} amount - amount
 * @param {Object} country - country object
 * @param {string} method - payment method
 * @returns {Object} List data
 */
export async function generateList(
  integrationType,
  amount,
  country,
  method = ""
) {
  const listRequest = {
    allowDelete: false,
    callback: {
      cancelUrl:
        "https://optile.github.io/checkout-web-sdk-code-demo/checkout/failed",
      notificationUrl: "https://dev.oscato.com/shop/notify.html",
      returnUrl:
        "https://optile.github.io/checkout-web-sdk-code-demo/checkout/success",
      summaryUrl: "https://dev.oscato.com/shop/summary.html",
    },
    country: country.countryCode,
    customer: {
      number: "777",
      name: {
        firstName: "John",
        lastName: "Doe",
      },
      birthday: "1977-09-13",
      email: "afterpay_visa_successful@payoneer.com",
      addresses: {
        billing: {
          street: "Fake Street.",
          houseNumber: "123",
          zip: "80339",
          state: "California",
          city: "Los Angeles",
          country: country.countryCode,
          name: {
            firstName: "First",
            lastName: "Last",
          },
        },
        shipping: {
          street: "Fake Street.",
          houseNumber: "123",
          zip: "80339",
          state: "California",
          city: "Los Angeles",
          country: country.countryCode,
          name: {
            firstName: "First",
            lastName: "Last",
          },
        },
      },
    },
    integration: integrationType,
    payment: {
      amount: amount,
      netAmount: amount - 0.01,
      taxAmount: 0.01,
      currency: country.currency,
      reference: "Shop 101/20-03-2016",
    },
    preselection: {
      direction: "CHARGE",
      networkCodes: getPreselection(method),
    },
    presetFirst: false,
    style: {
      hostedVersion: "v5",
      language: ["en-US", "en-GB"].includes(country.language)
        ? "en"
        : country.language,
    },
    transactionId: "tr101",
    updateOnly: false,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(listRequest),
  };

  return fetch(
    "https://api.pi-nightly.integration.oscato.com/demo/lists",
    options
  )
    .then((res) => res.json())
    .then((listResponse) => listResponse)
    .catch((err) => err);
}

/**
 * Initialise Checkout Web on frontend.
 *
 * @param {string} longId
 * @param {string} env
 * @returns {Object} Instance of Checkout Web
 */
export const initCheckout = async (longId, env) => {
  return await Checkout({
    longId,
    env,
    preload: [],
  });
};
