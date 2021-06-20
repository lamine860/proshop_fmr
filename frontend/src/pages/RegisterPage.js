import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Container from "../components/common/Container";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../constants/user";
import userContext from "../context/UserContext";
import InputField from "../components/common/InputField";
import ButtonField from "../components/common/ButtonFiled";
import Alert from "../components/common/Alert";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState();
  const { state, dispatch } = useContext(userContext);
  const userInfo = state.userInfo;
  const search = useLocation().search.split("=");
  const redirect = search.length > 1 ? search[1] : null;
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail(null);
    if (password.length > 1 && password === passwordConfirm) {
      dispatch({ type: USER_LOGIN_REQUEST });
      try {
        const { data } = await axios.post("/api/users/register", {
          name,
          email,
          password,
        });
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...data.user, token: data.auth_token })
        );
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      } catch (e) {
        dispatch({ type: USER_LOGIN_FAIL, payload: e.response.data });
      }
    } else {
      console.log(passwordConfirm);
      setError("You must confrim the password");
    }
  };
  useEffect(() => {
    if (userInfo) {
      history.push(`/${redirect ? redirect : "shipping"}`);
      window.location.reload();
    }
  }, [userInfo, redirect, history]);
  return (
    <Container>
      {error && (
        <div className="w-1/2 mx-auto">
          <Alert type="error">{error}</Alert>
        </div>
      )}
      {state.error && (
        <div className="w-1/2 mx-auto">
          <Alert type="error">{state.error.message}</Alert>
        </div>
      )}
      <form
        className="border-2 rounded-md md:w-1/2 mx-auto mt-8 p-4 bg-gray-300"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mb-4 text-center">
          <i className="fas fa-shopping-cart text-8xl"></i>
        </div>
        <InputField
          label="Your name"
          name="name"
          type="name"
          handleChange={setName}
          placeholder="John"
          value={name}
        />
        <InputField
          label="Your email"
          name="email"
          type="email"
          handleChange={setEmail}
          placeholder="John@example.com"
          value={email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          handleChange={setPassword}
          placeholder=""
          value={password}
        />
        <InputField
          label="Confrim your password"
          name="passwordConfirm"
          type="password"
          handleChange={setPasswordConfirm}
          placeholder=""
          value={passwordConfirm}
        />
        <ButtonField value="Login" />
      </form>
    </Container>
  );
};

export default RegisterPage;
