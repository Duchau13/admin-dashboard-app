import React from "react";
import classes from "./Modal.module.css";

function ModalForm({ setOpenModal }) {
  return (
    <div className={classes["modalBackground"]}>
      <div className={classes["modalContainer"]}>
        <div className={classes["titleCloseBtn"]}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className={classes["title"]}>
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className={classes["body"]}>
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div>
        <div className={classes["footer"]}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default ModalForm;