import styles from "./modal.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
const classnames = require("classnames");
const axios = require("axios");

import { useRouter } from "next/router";

export default function NewUserModal({ show, setShow }) {
  const showHideClassName = show ? "display-block" : "display-none";
  const fname = useRef(null);
  const lname = useRef(null);
  const email = useRef(null);
  const age = useRef(null);
  const password = useRef(null);
  const profession = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();
  function modalHandler() {
    setShow(false);
  }

  function passwordValidator(password) {
    if (password.length < 8) {
      setErrorMessage("Password must be atleast 8 characters");
      return false;
    } else if (password.search(/[a-z]/) < 0) {
      setErrorMessage("Password must contain atleast one lowercase letter");
      return false;
    } else if (password.search(/[A-Z]/) < 0) {
      setErrorMessage("Password must contain atleast one uppercase letter");
      return false;
    } else if (password.search(/[0-9]/) < 0) {
      setErrorMessage("Password must contain atleast one number");
      return false;
    } else if (password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0) {
      setErrorMessage("Password must contain atleast one special character");
      return false;
    } else {
      return true;
    }
  }

  function formValidator(userData) {
    if (userData.firstName === "") {
      setErrorMessage("First Name cannot be empty");
      return false;
    } else if (userData.email === "") {
      setErrorMessage("Email cannot be empty");
      return false;
    } else if (userData.age === "") {
      setErrorMessage("Age cannot be empty");
      return false;
    } else if (userData.password === "") {
      setErrorMessage("Password cannot be empty");
      return false;
    } else if (userData.profession === null) {
      setErrorMessage("Profession cannot be empty");
      return false;
    } else if (!passwordValidator(userData.password)) {
      return false;
    } else {
      return true;
    }
  }

  function refreshData() {
    router.replace(router.asPath);
  }

  function signupHandler(e) {
    e.preventDefault();
    setErrorMessage(null);
    const userData = {
      firstName: fname.current.value,
      lastName: lname.current.value,
      email: email.current.value,
      age: age.current.value,
      password: password.current.value,
      profession: profession.current.value,
    };
    if (formValidator(userData)) {
      axios
        .post("/api/users/create", userData)
        .then((res) => {
          if (res.data.success) {
            setSuccessMessage(res.data.message);
            refreshData();
            modalHandler();
          } else {
            setErrorMessage(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(err.response.data.message);
        });
    }
  }

  return (
    <div
      className={classnames(styles.modal, showHideClassName)}
      style={{ zIndex: "999" }}
    >
      <section className={styles.modalMain}>
        <div className={styles.closeButton}>
          <Image
            alt="X"
            src="/images/icons8-close-30.png"
            width={20}
            height={20}
            onClick={modalHandler}
          />
        </div>

        <div className={styles.modalContent}>
          <form>
            <div className={styles.headingPanel}>
              <h2>Add User</h2>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fname">
                First Name<span className="mandatory">*</span>
              </label>
              <input
                type="text"
                id="fname"
                placeholder="Enter your first name"
                className={styles.formField}
                ref={fname}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                id="lname"
                placeholder="Enter your last name"
                className={styles.formField}
                ref={lname}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">
                Email<span className="mandatory">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={styles.formField}
                ref={email}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="age">
                Age<span className="mandatory">*</span>
              </label>
              <input
                type="number"
                id="age"
                placeholder="Enter your age"
                className={styles.formField}
                ref={age}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="profession">
                Profession<span className="mandatory">*</span>
              </label>
              <input
                type="text"
                id="profession"
                placeholder="Enter your profession"
                className={styles.formField}
                ref={profession}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">
                Password<span className="mandatory">*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={styles.formField}
                ref={password}
                required
              />
            </div>

            {errorMessage === null ? null : (
              <div className={styles.errorMessage}>
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage === null ? null : (
              <div className={styles.successMessage}>
                <span>{successMessage}</span>
              </div>
            )}
            <div className="d-grid ">
              <button
                type="button"
                className="btn btn-primary mx-0"
                onClick={signupHandler}
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
