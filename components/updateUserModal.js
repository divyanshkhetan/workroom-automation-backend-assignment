import styles from "./modal.module.css";
import Image from "next/image";
import { useState } from "react";
const axios = require("axios");
const classnames = require("classnames");

const { passwordValidator } = require("../utils/passwordValidator");

import { useRouter } from "next/router";

export default function NewUserModal({ show, setShow, user }) {
  console.log(user);
  const showHideClassName = show ? "display-block" : "display-none";
  const [fname, setFname] = useState(user.firstName);
  const [lname, setLname] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(user.age);
  const [profession, setProfession] = useState(user.profession);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();
  function modalHandler() {
    setShow(false);
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
    } else {
      const passwordIsValid = passwordValidator(userData.password);
      if(!passwordIsValid.success) {
        setErrorMessage(passwordIsValid.message);
        return false;
      }
      return true;
    }
  }

  function refreshData() {
    router.replace(router.asPath);
  }

  function updateHandler(e) {
    e.preventDefault();
    setErrorMessage(null);
    const userData = {
      firstName: fname,
      lastName: lname,
      email: email,
      age: age,
      password: password,
      profession: profession,
    };
    if (formValidator(userData)) {
      axios
        .post("/api/users/updatedetails", userData)
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
              <h2>Update User</h2>
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
                value={fname}
                onChange={(e) => setFname(e.target.value)}
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
                value={lname}
                onChange={(e) => setLname(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={age}
                onChange={(e) => setAge(e.target.value)}
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
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">
                Password (to validate)<span className="mandatory">*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={styles.formField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                onClick={updateHandler}
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
