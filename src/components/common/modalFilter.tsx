import React from 'react';
import styles from './modalFilter.module.scss';
import {CheckBox} from './controlComponents';
import {filterInterface} from '../../interface/callListInterfaces';

interface propsInterface{
    title?:string
    show:boolean,
    closeFilter:()=>void,
    updateFilter: (data:string)=>void
    filters:filterInterface,
    cleanHandler:()=>void
    checkBoxHide?:boolean
    top?:number
}
export const ModalFilter=(props:propsInterface)=>{
  const {title, filters, show, updateFilter, closeFilter, cleanHandler, checkBoxHide, top}=props;


  let activeFilter=true;
  Object.keys(filters).forEach((el)=>{
    if (filters[el]) activeFilter=false;
  });

  return (
    <>
      <div style={{display: show?'block': 'none'}} className={styles.wrapper}>
        <div className={styles.container} style={{top: `${top}px`||''}}>
          {title && <CheckBox
            value={activeFilter}
            setValue={cleanHandler}
            label={title}
            checkBoxHide={true}
          />}
          {Object.keys(filters).map((el)=>{
            const checkHandler=(value:boolean)=>{
              updateFilter(el);
            };
            return (
              <React.Fragment key={el}>
                <CheckBox
                  value={filters[el]}
                  setValue={checkHandler}
                  label={el}
                  checkBoxHide={checkBoxHide}/>
              </React.Fragment>
            );
          })}
        </div>
      </div>


      <div onClick={closeFilter}
        style={{display: show?'block': 'none'}}
        className={styles.activeBg}>
      </div>
    </>

  );
};
