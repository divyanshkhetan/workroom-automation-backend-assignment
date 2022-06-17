import styles from "./modal.module.css";
import Image from "next/image";
import { useState } from "react";
const classnames = require("classnames");
const axios = require("axios");
import { useRouter } from 'next/router';

export default function DeleteUserModal({ show, setShow, user }) {
  const showHideClassName = show ? "display-block" : "display-none";
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();

  function modalHandler() {
    setShow(false);
  }

  const refreshData = () => {
    router.replace(router.asPath);
  }

  async function deleteHandler() {
    const res = await axios.post("http://localhost:3000/api/users/delete", {
      email: user.email,
    });

    if (res.data.success) {
      setSuccessMessage(res.data.message);
      setShow(false);
      refreshData();
    } else {
      setErrorMessage(res.data.message);
    }
  }

  return (
    <div className={classnames(styles.modal, showHideClassName)} style={{zIndex: '999'}}>
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
          <div className="container">
            Are you sure you want to delete{" "}
            <span className="bold"> {user.email}</span>?
          </div>

          <div style={{ margin: "1rem" }}>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => deleteHandler()}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => modalHandler()}
            >
              Cancel
            </button>
          </div>
          <div>
            {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
            )}
            {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
