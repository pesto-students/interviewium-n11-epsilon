import styles from './index.module.scss';
import CreateAccountComponent from './createAccountComponent';
import InviteUserComponent from './inviteUserComponent';
import { Modal } from 'react-bootstrap';
import ModalCard from './modalCard';
import SuccessComponent from './successComponent';
import CreateOrEditIDPComponent from './CreateOrEditIDPComponent';
import LogoutComponent from './LogoutComponent';
import DeleteComponent from './DeleteComponent';

const ModalComponent = props => {
  const successModal = () => {
    return (
      <ModalCard
        hide={props.onHideModal}
        show={props.show}
        delete={props.deleteProfile}
        component={
          <SuccessComponent
            name='test'
            hide={props.onHideModal}
            successMessage={props.successMessage}
          />
        }
      />
    );
  };

  const formModal = () => {
    return (
      <ModalCard
        hide={props.onHideModal}
        component={
          props.modalInfo.modalIdentity === 'ActiveUser' ? (
            <DeleteComponent
            hide={props.onHideModal}
            delete={props.deleteProfile}
            activateDeactivate={props.modalInfo.apiCall}
            data={props.data}
          />
          ) : props.modalInfo.modalIdentity === 'inviteUser' ? (
            <InviteUserComponent
              accountChange={props.modalInfo.apiCall}
              companyName={props.companyName}
              resetForm={props.resetForm}
            />
          ) : props.modalInfo.modalIdentity === 'addInterviewer' ? (
            <CreateOrEditIDPComponent
              modalIdentity={props.modalInfo.modalIdentity}
              accountChange={props.modalInfo.apiCall}
              editObj={props.modalInfo.editObj}
              companyName={props.companyName}
              resetForm={props.resetForm}
            />
          ) : props.modalInfo.modalIdentity === 'Logout' ? (
            <LogoutComponent
              hide={props.onHideModal}
            />
          )  : props.modalInfo.modalIdentity === 'verdit' ? (
            <CreateAccountComponent
              hide={props.onHideModal}
              postVerditHandler={props.modalInfo.apiCall}
            />
          ) : null
        }
      />
    );
  };

  return (
    <Modal
      {...props}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      contentClassName={styles.modalMain}
    >
      {props.success ? successModal() : formModal()}
    </Modal>
  );
};

export default ModalComponent;
