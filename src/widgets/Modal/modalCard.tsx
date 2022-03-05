import styles from "./index.module.scss";
import { Card } from "react-bootstrap";
import CloseIcon from "@material-ui/icons/Close";

const ModalCard = (props) => {

  return (
    <Card className={styles.modalsubMain}>
      {props.show?'':<div className={styles.closeBtn} onClick={props.hide}>
          <CloseIcon className={styles.clsoeI}  />
        </div>}

        <div className={styles.subBodyItems}>
            {props.component}
        </div>
      </Card>
  );
};

export default ModalCard;
