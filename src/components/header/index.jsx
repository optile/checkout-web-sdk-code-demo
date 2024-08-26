import { useSearchParams } from "react-router-dom";
import payoneerLogo from "../../assets/payoneer-circle.png";
import "./header.scss";
import { useContext, useEffect } from "react";
import MainContext from "../../contexts/MainContext";
import { currentLang, getCountryDetails } from "../../utils";

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setCountry } = useContext(MainContext);

  useEffect(() => {
    setCountry(getCountryDetails(currentLang))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLang]);

  console.log({ currentLang })

  const handleOnChange = (e) => {
    const urlParams = {};
    for(let entry of searchParams.entries()) {
      urlParams[entry[0]] = entry[1];
    }
    urlParams.lang = e.target.value;
    setSearchParams(urlParams);
    setCountry(getCountryDetails(urlParams.lang));
  }


  return (
    <header className="main-header">
      <div>
        <a href="#" className="logo-wrapper">
          <img src={payoneerLogo} className="logo" alt="Payoneer Logo" />
          <span className="logo-text">Payoneer</span>
        </a>
      </div>

      <div>
        <select name="lang" onChange={handleOnChange}>
          <option value="en-US" selected={currentLang === "en-US"}>
            English - US
          </option>
          <option value="en-GB" selected={currentLang === "en-GB"}>
            English - GB
          </option>
          <option value="de" selected={currentLang === "de"}>
            German - DE
          </option>
          <option value="fr" selected={currentLang === "fr"}>
            French - FR
          </option>
        </select>

      </div>
    </header>
  );
}
