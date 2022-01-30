import React from 'react';
import styles from './index.module.scss';
import { useDrag } from 'react-dnd';

const IntervieweeCard = (props) =>  {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'interviewee',
        item: { itemID: props.id },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
               console.log(props.id)
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
            item: monitor.getItem(),
        }),
    }));
  return <div className={styles.card} ref={drag} style={{color : isDragging ? '#FF3F3F' : 'blue'}}>
  <div className={styles.cardUP}>
    <div>
      <img
        src='https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png'
        alt='card'
        height={50}
      />
    </div>
    <div className={styles.cardName}>
      <p className={styles.cardPName}>Rushikesh Ladke</p>
      <p className={styles.cardPYear}>6 Years</p>
    </div>
  </div>
  <div className={styles.Tech}>
    <p className={styles.cardPYear}>
      P : React, React Native, JavaScript
    </p>
    <p className={styles.cardPYear}>S : Node.</p>
  </div>
  <div className={styles.details}>
    <p className={styles.pNoMargin}>
      <strong>Exp:</strong> 0-2 years
    </p>
  </div>
</div>;
}

export default IntervieweeCard;
