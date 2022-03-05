import styles from "./index.module.scss";
import PrimaryButton from "widgets/PrimaryButton";
import { Successuser } from "../../utilities/images/icons/index";
const ModalCard = (props) => {
  return (
    <div className={styles.successMain}>
      <h5 className={styles.commonTitle}>
        <strong>{props.successMessage.title}</strong>&nbsp;
      </h5>
      <h6 className={styles.successsubtitle}>
      {props.successMessage.message}
      </h6>
      <Successuser className={styles.modalTopIcon} />
      <div className={`m-0 ${styles.button}`}>
        <PrimaryButton method={props.hide} text="Done" className={styles.modalBtn} />
      </div>
    </div>
  );
};

export default ModalCard;
