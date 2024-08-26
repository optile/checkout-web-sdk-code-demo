import notebook from "./assets/notebook.jpg";
import notebook2 from "./assets/notebook2.jpg";
import notebook3 from "./assets/notebook3.jpg";

export const countryDetails = [
  {
    currency: "USD",
    symbol: "$",
    country: "United States",
    language: "en-US",
    countryCode: "US",
  },
  {
    currency: "GBP",
    symbol: "£",
    country: "United Kingdom",
    language: "en-GB",
    countryCode: "GB",
  },
  {
    currency: "EUR",
    symbol: "€",
    country: "Germany",
    language: "de",
    countryCode: "DE",
  },
  {
    currency: "EUR",
    symbol: "€",
    country: "France",
    language: "fr",
    countryCode: "FR",
  },
];

export const getCountryDetails = (lang = "en") => {
  return countryDetails.find(({ language }) => lang === language);
};

export const currentLang = countryDetails.find(({ language }) => language === new URLSearchParams(window.location.search).get("lang"))?.language || "en-GB"; 

export const products = [
  {
    id: 1,
    img: notebook,
    title: "Black Notebook #1",
    price: 25,
  },
  {
    id: 2,
    img: notebook2,
    title: "Blue notebook #2",
    price: 30,
  },
  {
    id: 3,
    img: notebook3,
    title: "Notebook default #3",
    price: 18,
  },
];
