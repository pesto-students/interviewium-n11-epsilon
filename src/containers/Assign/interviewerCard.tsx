import React from 'react';
import { useDrop } from 'react-dnd';
import styles from './index.module.scss';

const InterviewerCard = (props) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'interviewee',
        drop: (monitor : any) => {
          props.dragAndDrop(monitor.itemID.humanResourceId, monitor.itemID.intervieweeId, monitor.itemID.jobId , props.id.interviewer.id)
            // console.log('moving item:', monitor.itemID , props.id)
          },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;
    let backgroundColor = 'darkkhaki';
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = '#FF3F3F';
    }
  return <div className={styles.cardInterviewer} style={{backgroundColor}} ref={drop}>
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
    </div>
  </div>
  <div className={styles.Tech}>
    <p className={styles.cardPYear}>
      P : React, React Native, JavaScript
    </p>
    <p className={styles.cardPYear}>S : Node.</p>
  </div>
</div>;
}

export default InterviewerCard;
