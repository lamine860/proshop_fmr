import { useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import countryList from "react-select-country-list";
import Alert from "../common/Alert";
import ButtonField from "../common/ButtonFiled";
import InputField from "../common/InputField";
import UserContext from "../../context/UserContext";
import CartContext from "../../context/CartContext";
import { SAVE_SHIPPING_ADDRESS } from "../../constants/cart";

const Shipping = () => {
  const {
    state: { userInfo },
  } = useContext(UserContext);
  const { state: shippingState, dispatch } = useContext(CartContext);
  const [address, setAddress] = useState(
    shippingState.shippingAddress.address
      ? shippingState.shippingAddress.address
      : ""
  );
  const [country, setCountry] = useState(
    shippingState.shippingAddress.country
      ? shippingState.shippingAddress.country
      : ""
  );
  const [city, setCity] = useState(
    shippingState.shippingAddress.city ? shippingState.shippingAddress.city : ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingState.shippingAddress.postalCode
      ? shippingState.shippingAddress.postalCode
      : ""
  );
  const options = useMemo(() => countryList().getData(), []);
  const history = useHistory();
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      address !== "" &&
      country.value !== "" &&
      postalCode !== "" &&
      city !== ""
    ) {
      dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: { address, city, postalCode, country: country.value },
      });
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify({ address, city, postalCode, country: country.value })
      );
      history.push("/payment-method");
    } else {
      setError("You don't filled all the filed");
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=shipping");
    }
  }, [userInfo, history]);
  return (
    <>
      <div className="w-1/2 mx-auto">
        {error && <Alert type="error">{error}</Alert>}
      </div>
      <form
        className="border-2 rounded-md md:w-1/2 mx-auto mt-8 p-4 bg-gray-300"
        onSubmit={(e) => handleSubmit(e)}
      >
        <InputField
          label="Address"
          name="address"
          handleChange={setAddress}
          placeholder="street 34 avnue"
          value={address}
        />
        <InputField
          label="City"
          name="city"
          handleChange={setCity}
          placeholder="New york"
          value={city}
        />
        <InputField
          label="Postal "
          name="postalCode"
          handleChange={setPostalCode}
          placeholder="00345"
          value={postalCode}
        />
        <div className="mt-4">
          <label htmlFor="country">Country</label>
          <Select options={options}  value={country}  onChange={setCountry} />
        </div>
        <ButtonField value="Save" />
      </form>
    </>
  );
};

export default Shipping;
