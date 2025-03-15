import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import styles from "../css/Login.module.css";
import { Title } from "../components/Typography";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerWrapper}>
        <Title>Sign In</Title>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form className={styles.formContainer} onSubmit={submitHandler}>
          <Form.Group className={styles.formGroup} controlId='email'>
            <Form.Control
              type='email'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group className={styles.formGroup} controlId='password'>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <button className={styles.buttonWrapper} type='submit'>
            Sign In
          </button>
        </Form>

        <div className={styles.ssoContainer}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
              width: "75%",
            }}>
            <div
              style={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
                width: "100%",
              }}>
              <p
                style={{
                  color: "rgba(0, 0, 0, 1)",
                  textAlign: "center",
                  textJustify: "inter-word",
                  margin: 0,
                }}>
                or
              </p>
            </div>
          </div>

          <button
            type='button'
            className={`login-with-google-btn ${styles.googleButton}`}>
            <div className='login-with-google-btn-div'></div>

            <p style={{ margin: 0, paddingLeft: "1rem" }}>
              Sign in with Google
            </p>
          </button>

          <div className={styles.accountContainer}>
            <text>Don't have an account? </text>
            <a
              className='text-danger py-2'
              href={redirect ? `/register?redirect=${redirect}` : "/register"}>
              <p>Create account</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
