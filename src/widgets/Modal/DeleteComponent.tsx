import styles from "./index.module.scss";
import {  Createuser } from "../../utilities/images/icons/index";
import PrimaryButton from "widgets/PrimaryButton";


const DeleteComponent = (props) => {
  console.log(props)
    return (
      
      <div className="modal-dialog modal-dialog-centered" role="document" style={{width: 1250,}}>
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className='d-flex'>
                                    <div>
                                        <article
                                            className={`${styles.card}$ ${styles.noBorder}`}
                                            data-toggle="modal"
                                            data-target="#exampleModalCenter"
                                        >
                                            <div className={styles.cardUP}>
                                                <div>
                                                    <img
                                                        src="https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png"
                                                        alt="card"
                                                        width={50}
                                                    />
                                                </div>
                                                <div className={styles.cardName}>
                                                    <p className={styles.cardPName}>Rushikesh Ladke</p>
                                                    <p className={styles.cardPYear}>6 years</p>
                                                </div>
                                            </div>
                                          
                                            <div className={styles.details}>
                                                <p>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
                                                    praesentium, quod sapiente a illo repellat odio rem perferendis beatae
                                                    facere delectus quae impedit ....
                                                </p>
                                            </div>
                                        </article>
                                    </div>
                                    <div>
                                    <div className={styles.Tech}>
                                                <p className={styles.cardPYear}>P : React, React Native, JavaScript</p>
                                                <p className={styles.cardPYear}>S : Node.</p>
                                            </div>
                                    <div className={styles.Tech}>
                                                <p className={styles.cardPYear}><strong>Freelance Developer</strong><br/>
                                 since March,2020 <br/>
                                 • Working on Different projects including React, Python and React Native and also with React Native Web.
• Building Apps and websites with wide range on people.
</p>
                                            </div>
                                    <div className={styles.Tech}>
                                                <p className={styles.cardPYear}><strong>Freelance Developer</strong><br/>
                                 since March,2020 <br/>
                                 • Working on Different projects including React, Python and React Native and also with React Native Web.
• Building Apps and websites with wide range on people.
</p>
                                            </div>
                                    <div>

                                    </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
      
    );
  };
  
  export default DeleteComponent;