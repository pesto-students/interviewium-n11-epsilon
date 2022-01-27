import styles from './index.module.scss';
import ModalComponent from "widgets/Modal/indexL";
import { useEffect, useState } from "react";
import { allJobs } from '_store/apis/userManagementAPI';
import { useDispatch } from 'react-redux';
import { ERROR_MESSAGE  } from '_store/constants';

const Jobs = () => {

  const [modalShow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({  modalIdentity : 'ActiveUser',
  apiCall : () => {}});
  const [jobApp, setJobApp] = useState<any>();
  const dispatch = useDispatch()

  useEffect(() => {
    jobApplicationHandler();
  }, []);
  

  const hideModal = () => {
    setModalShow(!modalShow);
  };


  const jobApplicationHandler = async () => {
    try {
      let data;
      data = await allJobs();
      let { body, status }: any = data;
      if (status === 200) {
        setJobApp(body)
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };

    const primarySkillsHandler = data => {
      let primary = data.split('^');
      if (primary[0]) {
        return primary[0];
      } else return '';
    };
    const secondarySkillsHandler = data => {
      let secondary = data.split('^');
      if (secondary[1]) {
        return secondary[1];
      } else return '';
    };
  
  return (
    <>
    <ModalComponent 
        show = {modalShow}
        onHideModal = {hideModal}
        onHide = {hideModal}
        modalInfo = {modalInfo}
        data={'data'}
        />
          <div className={styles.card_parent}>
            <div className={styles.cardParent}>
            {jobApp && jobApp.map((e:any) => {
              return (
                <div className={styles.card} key={e.id}>
                <div className="p-1">
                <div className={styles.cardUP}>
                        <div>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                                alt="card"
                                height={50}
                            />
                        </div>
                        <div className={styles.cardName}>
                            <p className={styles.cardPName}>{e?.title}</p>
                            <p className={styles.cardPYear}>{e?.company?.companyName}</p>
                        </div>
                    </div>
                    <div className={styles.Tech}>
                        <p className={styles.cardPYear}>P : {primarySkillsHandler(e?.primaryAndSecondarySkills)}</p>
                        <p className={styles.cardPYear}>S : {secondarySkillsHandler(e?.primaryAndSecondarySkills)}</p>
                    </div>
                    <div className={styles.details}>
                        <p className={styles.pNoMargin}>
                            <strong>Exp:</strong> {e?.minExperienceInYears ? e?.minExperienceInYears : 0}-{e?.maxExperienceInYears ? e?.maxExperienceInYears : 1} years
                        </p>
                        <p>
                         {e?.jobDescription}
                        </p>
                    </div>
                </div>
         
            </div>
              )
              })}
            </div>
          </div>
          
        
    </>
  );
};

export default Jobs;
