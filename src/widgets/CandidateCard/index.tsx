import React from 'react';
import PrimaryButton from 'widgets/PrimaryButton';
import SecondaryButton from 'widgets/SecondaryButton';
import styles from './index.module.scss';

function CandidateCard(props) {
  const primarySkillsHandler = data => {
    let primary = data.split('#');
    if (primary[0]) {
      return primary[0];
    } else return '';
  };
  const secondarySkillsHandler = data => {
    let secondary = data.split('#');
    if (secondary[1]) {
      return secondary[1];
    } else return '';
  };

  return (
    <article
      className={styles.card}
      data-toggle='modal'
      data-target='#exampleModalCenter'
      onClick={props.show}
    >
      <div className={styles.card_item}>
        <div className={styles.cardUP}>
          <div>
            <img
              className={styles.profile_img}
              src='https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png'
              alt='card'
            />
          </div>
          <div className={styles.cardName}>
            <p className={styles.cardPName}>{props?.data?.interviewee?.name}</p>
            <p className={styles.cardPYear}>
              {props?.data?.interviewee?.yearsOfExperience} year
            </p>
          </div>
        </div>
        <div className={styles.Tech}>
          <p className={styles.cardPYear}>
            P :{' '}
            {props?.data?.interviewee &&
              primarySkillsHandler(
                props?.data?.interviewee?.primaryAndSecondarySkills
              )}
          </p>
          <p className={styles.cardPYear}>
            S :{' '}
            {props?.data?.interviewee &&
              secondarySkillsHandler(
                props?.data?.interviewee?.primaryAndSecondarySkills
              )}
          </p>
        </div>
        <div className={styles.details}>
          {props.exp && (
            <p className={styles.pNoMargin}>
              <strong>Job Title: </strong>
              {props?.data?.job?.title}
            </p>
          )}
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          praesentium, quod sapiente a illo repellat odio rem perferendis beatae
          facere delectus quae impedit ....
          {props.exp && (
            <div className='d-flex justify-content-around'>
              <PrimaryButton
                text={props.search ? 'Invite' : 'Accept'}
                method={() => {
                  props.inviteIntervieweeHandler(props.data?.interviewee?.id);
                }}
              />
              {props.search ? null : (
                <SecondaryButton text='Reject' method={() => {}} />
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default CandidateCard;
