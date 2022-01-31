import styles from "./index.module.scss";
import {  Createuser } from "../../utilities/images/icons/index";
import PrimaryButton from "widgets/PrimaryButton";

const Confirmation = (props) => {

    return (
      
        <div className={styles.invitemodal}>
          <Createuser className={styles.modalTopIcon} />
          <h5 className={styles.commonTitle}>
            <strong>Confirm</strong>
          </h5>
          <h6>Are You Sure?</h6>
          <div className="d-flex justify-content-center align-items-center mb-4">
          <div className={`m-0 ${styles.button}`}>
          <PrimaryButton
               className="m-2"
               method={props.hide}
               text="No"
            />
          </div>
            <PrimaryButton
                className="m-2"
                text={"Yes"}
                method={() => props.confirm()}
            />       
        </div>
        </div>
      
    );
  };
  
  export default Confirmation;