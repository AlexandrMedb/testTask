import React from 'react';
import {Box} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import {LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {connect} from 'react-redux';
import {setCallsDate} from '../../reducers/callListReducer';
import {RootState} from '../../store/store';
import {GetCallList} from '../../interface/mangoInterfaces';
import styles from './header.module.scss';
import {ReactComponent as DownArrow} from 'img/common/downArrow.svg';
import {ReactComponent as SearchIcon} from 'img/common/search.svg';


const mapStateToProps=({callList: {reqParams}}:RootState)=> ({reqParams});

interface header {
    reqParams?: GetCallList,
    setCallsDate: (data: string) => void,
}

export const Header =connect(mapStateToProps, {setCallsDate} )((props:header)=>{
  const {reqParams, setCallsDate}= props;

  const Progress =(props:{text:string, color:string, max:number, value:number, long?:boolean})=>{
    const {text, color, max, value, long}=props;

    const percent= ` ${(Math.floor(value/max*100))}%`;
    const part=long?` ${value} из ${max}шт`:percent;

    return (
      <div className={styles.progressContainer}>
        <div className={styles.progressText}>
          <span style={{color: '#122945'}}>{text}</span>
          <span style={{color: color}}>{part}</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{width: percent, background: color}}>{value}</div>
        </div>
      </div>
    );
  };


  const date=(()=>{
    const date =new Date().toLocaleDateString('ru', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });
    return date.slice(0, 1).toLocaleUpperCase()+date.slice(1);
  })();


  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.date}>
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>*/}
          {/*  <DatePicker*/}
          {/*    value={reqParams?.date_start|| new Date()}*/}
          {/*    onChange={(newValue) => {*/}
          {/*      if (newValue) {*/}
          {/*        setCallsDate(newValue.toISOString().split('T')[0]);*/}
          {/*      }*/}
          {/*    }}*/}
          {/*    maxDate={new Date()}*/}
          {/*    components={{*/}
          {/*      OpenPickerIcon: () =><div className={styles.date}>{date}</div>,*/}
          {/*    }}*/}
          {/*    renderInput={({inputRef, inputProps, InputProps}) => (*/}
          {/*      <Box*/}
          {/*        sx={{display: 'flex', alignItems: 'center', paddingLeft: '7px'}}*/}
          {/*      >*/}
          {/*        <input*/}
          {/*          ref={inputRef}*/}
          {/*          {...inputProps}*/}
          {/*          style={{opacity: 0, width: '1px', position: 'absolute',*/}
          {/*          }}*/}
          {/*        />*/}
          {/*        {InputProps?.endAdornment}*/}
          {/*      </Box>*/}
          {/*    )}*/}
          {/*  />*/}
          {/* </LocalizationProvider>*/}
          {date}
        </div>
        {/* <div className={styles.progressWrapper}>*/}
        {/*  <Progress*/}
        {/*    text={'Новые звонки'}*/}
        {/*    color={ '#28A879'}*/}
        {/*    max={30}*/}
        {/*    value={20}*/}
        {/*    long={true}*/}
        {/*  />*/}
        {/*  <Progress*/}
        {/*    text={'Качество разговоров'}*/}
        {/*    color={ '#FFD500'}*/}
        {/*    max={100}*/}
        {/*    value={40}*/}
        {/*  />*/}
        {/*  <Progress*/}
        {/*    text={'Конверсия в заказ'}*/}
        {/*    color={ '#EA1A4F'}*/}
        {/*    max={100}*/}
        {/*    value={67}*/}
        {/*  />*/}
        {/* </div>*/}
        <SearchIcon className={styles.search}/>
        <div className={styles.account}>
          <div>ИП Сидорова Александра Михайловна</div>
          <DownArrow/>
        </div>
        <div className={styles.account}>
          <img src="./noavatar.jpg" alt="noavatar"/>
          <DownArrow/>
        </div>
      </div>
    </header>
  );


  return (
    <Box sx={{
      width: '100%',
      minHeight: '65px',
      paddingTop: '5px',
      background: 'white',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={reqParams?.date_start||''}
          inputFormat="dd-MM-yy"
          maxDate={new Date()}
          onChange={(newValue) => {
            if (newValue) {
              setCallsDate(new Date(newValue).toISOString().split('T')[0]);
            }
          }}
          renderInput={(params) => <TextField {...params}/>}
        />
      </LocalizationProvider>
    </Box>);
});
