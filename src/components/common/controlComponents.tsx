import React from 'react';
import style from './controlComponents.module.scss';


interface checkboxInterface{
    label?:string,
    value:boolean,
    setValue:(value:boolean)=>void,
    checkBoxHide?:boolean
}

// eslint-disable-next-line react/prop-types
export const CheckBox =({label, value, setValue, checkBoxHide}:checkboxInterface)=>{
  return (
    <div>
      <label className={style.checkbox}>
        <input
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setValue(e.target.checked);
          }}
          type="checkbox"
          checked={value}
        />
        <span style={{display: checkBoxHide? 'none' : ''}} className={style.checkmark}></span>
        <span >{label}</span>
      </label>
    </div>
  );
};

