import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./ResetPasswordScreen.css";

const ResetPasswordScreen = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }
    // /passwordreset/:resettoken
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_PORT}/api/auth/passwordreset/${match.params.resetToken}`, { password }, config)
      // const { data } = await axios.put(
      //   `/api/auth/passwordreset/${match.params.resetToken}`,
      //   {
      //     password,
      //   },
      //   config
      // );
      setSuccess(data.data);
    } catch (error) {
      // setError(error.response.data.error);
      console.log(error)
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="resetpassword-screen">
      <form
        onSubmit={resetPasswordHandler}
        className="resetpassword-screen__form"
      >
        <h3 className="resetpassword-screen__title">Reset Password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && (
          <span className="success-message">
            {success} <Link to="/login">Login</Link>
          </span>
        )}
        <div className="form-group">
          <div className="mb-4 w-100 ">
            <input value={password} required autoComplete="true" onChange={(e) => setPassword(e.target.value)} minLength="6" type="password" className="form-control login-inputs" placeholder="Enter New Password" />
          </div>
          <div className="mb-4 w-100 ">
            <input value={confirmPassword} required autoComplete="true" onChange={(e) => setConfirmPassword(e.target.value)} minLength="6" type="password" className="form-control login-inputs" placeholder="Confirm Password" />
          </div>
          {/* <label htmlFor="password">New Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
        </div>
        {/* <div className="form-group">
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div> */}
        <div className="d-flex ">
          <button type="submit" className="btn btn-primary w-100">
            Reset Password
          </button>
        </div>

      </form>
    </div>
  );
};

export default ResetPasswordScreen;
