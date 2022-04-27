import React, {ReactElement} from 'react';
import styles from './customButton.module.scss';


interface customButton{
    text:string,
    icon?:ReactElement,
}

export const CustomButton=({text, icon}:customButton)=>{
  return (
    <div className={styles.button}>
      <div className={styles.text}>
        {text}
      </div>
      {icon}
    </div>
  );
};

