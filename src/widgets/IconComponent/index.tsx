import styles from './index.module.scss';
const Icon = (props) => {
  return <div style={{ marginRight: 13}} onClick={props.onClick} className={styles.icons}>{props.icon}</div>;
};

export default Icon;
