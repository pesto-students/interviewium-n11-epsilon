import React from 'react'
import styles from './Candidate_Card.module.scss'

function Candidate_Card(props) {
    return (
        <article className={styles.card} data-toggle="modal" data-target="#exampleModalCenter">
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
                    {props.exp && <><button>Accept</button><button>Reject</button></>}
                    
                    </div>
        </div>
                </article>
    )
}

export default Candidate_Card;