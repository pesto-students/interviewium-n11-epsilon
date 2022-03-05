import styles from "./index.module.scss";
import {  Createuser } from "../../utilities/images/icons/index";
import PrimaryButton from "widgets/PrimaryButton";
import { remove } from "../../_store/actions/user";
import { useDispatch,  } from "react-redux";
import { path } from "../../pageRoutes/routers";
import { useHistory } from "react-router-dom";

const LogoutComponent = (props) => {
 const dispatch = useDispatch();
 const history = useHistory();

    const navigate = () => {
        history.push(path.Login);
      };
      
    const handleYes = () => {
      dispatch(remove(navigate));
    }
  
    return (
      
        <div className={styles.invitemodal}>
          <Createuser className={styles.modalTopIcon} />
          <h5 className={styles.commonTitle}>
            <strong>Confirm</strong>&nbsp;<span>Logout</span>
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
                method={() => handleYes()}
            />       
        </div>
        </div>
      
    );
  };
  
  export default LogoutComponent;