import React, {ReactElement} from 'react';
import styles from './customListItem.module.scss';


interface customListItem{
    text:string,
    Icon:ReactElement,
    active?:boolean,
}

export const CustomListItem =({text, Icon, active}:customListItem)=>{
  return (
    <div className={`${styles.container} ${active && styles.active}`}>
      <div className={styles.icon}>
        {Icon}
      </div>
      <span >{text}</span>
    </div>
  );
};


