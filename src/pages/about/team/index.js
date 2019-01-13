import React from 'react';
import PropTypes from 'prop-types';
// import replace from 'string-replace-to-array';
// import Modal from '../../../components/modal';
import styles from './team.module.scss';

const TeamMember = ({ memberData: { avatar, name, title, description } }) => {//eslint-disable-line

  // console.log(replace(description, 'Schalke 04', <Modal ));


  return (
    <div className={styles.teamMember}>
      <img src={`/assets/images/team/${avatar}`} className={styles.avatar} alt="" />
      <div className={styles.prose}>
        <h2 className={styles.teamMemberName}>{name}</h2>
        <p>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default TeamMember;

TeamMember.propTypes = {
  memberData: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired

};
