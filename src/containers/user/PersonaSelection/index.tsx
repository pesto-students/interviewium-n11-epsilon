import styles from './index.module.scss';
import { HRPersonaHandler } from './PersonaSelection_API';

const Persona = () => {
 
  return (
    <div className={styles.container}>
      <div id={styles.logo}>
        <div>
          <img
            className={styles.logo_img}
            src='main_logo.png'
            alt='logo'
          />
        </div>
      </div>
      <div id={styles.content}>
      <div className={styles.card}>
          <div>Interviewee</div>
          <img
            className={styles.logo_img}
            src='hr.png'
            alt='logo'
          />
        </div>
        <div className={styles.card} onClick={() => HRPersonaHandler(`dasdsa`)}>
          <div>HR</div>
          <img
            className={styles.logo_img}
            src='interviewee.png'
            alt='logo'
          />
        </div>
     
      </div>
    </div>
  );
};

export default Persona;
