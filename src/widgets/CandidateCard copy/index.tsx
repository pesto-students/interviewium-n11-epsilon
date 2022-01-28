import React from 'react'
import PrimaryButton from 'widgets/PrimaryButton';
import SecondaryButton from 'widgets/SecondaryButton';
import styles from './index.module.scss'

function CandidateCard(props) {
    return (
        <article className={styles.card} data-toggle="modal" data-target="#exampleModalCenter" onClick={props.show}>
               <div className={styles.card_item}>
                    <div className={styles.cardUP}>
                        <div>
                            <img
                            className={styles.profile_img}
                                src="https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png"
                                alt="card"
                            />
                        </div>
                        <div className={styles.cardName}>
                            <p className={styles.cardPName}>Rushikesh Ladke</p>
                            <p className={styles.cardPYear}>6 years</p>
                        </div>
                    </div>
                    <div className={styles.Tech}>
                        <p className={styles.cardPYear}>P : React, React Native, JavaScript</p>
                        <p className={styles.cardPYear}>S : Node.</p>
                    </div>
                    <div className={styles.details}>
                    {props.exp && <p className={styles.pNoMargin}><strong>Exp:</strong> 0-2 years</p>}
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti praesentium, quod
                            sapiente a illo repellat odio rem perferendis beatae facere delectus quae impedit ....
                    {props.exp &&
                    <div className='d-flex justify-content-around'>
                    <PrimaryButton text='Accept' method={() => {}} />
                    <SecondaryButton text='Reject' method={() => {}} />
                    </div>
                    }
                    
                    </div>
        </div>
                </article>
    )
}

export default CandidateCard;