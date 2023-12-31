import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignUP.css";
import LandingPage from "../LandingPage/LandingPage";

const SignUp = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);

  //importing global state from context
  const [userData, setUserData] = useContext(UserContext);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending data to be registered in database
      await axios.post(`${process.env.REACT_APP_base_url}/api/users`, form);

      //once registered the login automatically so send the new user info to be logged in
      const loginRes = await axios.post(
        `${process.env.REACT_APP_base_url}/api/users/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      // set the global state with the new user info
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate to homepage once the user is signed up
      navigate("/");
    } catch (error) {
      console.log("problem ==>", error.response.data.msg);
      console.log("you've been thrown to the bin");
    }
  };
  return (
    <>
      <LandingPage
        sign={
          <>
            <div className="signup">
              <h3>Join the network</h3>
              <div>
                <span>Already have an account? </span>
                <Link className="link" to="/login">
                  Sign In
                </Link>
              </div>

              <form onSubmit={handleSubmit}>
                <br />
                <input
                  placeholder="Email"
                  type="text"
                  name="email"
                  onChange={handleChange}
                />
                <br />
                <br />
                <div className="signup__names">
                  <input
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                  />

                  <input
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                  />
                </div>

                <br />
                <input
                  placeholder="User Name"
                  type="text"
                  name="userName"
                  onChange={handleChange}
                />
                <br />
                <br />
                {/* <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                /> */}

                <div className="password-input">
                  <input
                    placeholder="Your Password"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                  />
                  {passwordVisible ? (
                    <FaEyeSlash
                      className="password-icon"
                      onClick={handlePasswordToggle}
                    />
                  ) : (
                    <FaEye
                      className="password-icon"
                      onClick={handlePasswordToggle}
                    />
                  )}
                </div>
                <br />
                <br />
                <button type="submit">Agree and Join</button>
              </form>

              <p>
                I agree to the <span className="link"> Privacy policy </span>and
                <span className="link"> terms of services</span>
              </p>
              <Link className="link" to="/login">
                Already have an account?
              </Link>
            </div>
          </>
        }
      />
    </>
  );
};

export default SignUp;