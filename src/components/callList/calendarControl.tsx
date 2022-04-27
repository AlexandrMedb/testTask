import React, {useState} from 'react';
import styles from './calendarControl.module.scss';
import {ReactComponent as RightArrow} from '../../img/common/rightArrow.svg';
import {ReactComponent as CalendarIcon} from '../../img/common/calendarIcon.svg';
import {DatePicker} from '../common/datePicker';
import {GetCallList} from '../../interface/mangoInterfaces';
import {connect} from 'react-redux';
import {RootState} from '../../store/store';
import {setCallsDateInterval} from '../../reducers/callListReducer';
import {deltaDayCounter} from '../../utils/tableUtils';


const mapStateToProps=({callList: {reqParams}}:RootState)=> ({reqParams});
const mapDispatchToProps={setCallsDateInterval};

interface propsInt {
    reqParams: GetCallList,
    setCallsDateInterval: (data: { start: string, end: string }) => void,
}

export const CalendarControl= connect(mapStateToProps, mapDispatchToProps)((props:propsInt)=>{
  const {reqParams, setCallsDateInterval}=props;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dayCount=deltaDayCounter({
    lastDay: new Date(reqParams.date_end),
    firstDay: new Date(reqParams.date_start),
  });

  const calendarButtonTitle=((dayCount)=>{
    if (dayCount>=5 && dayCount<=20) return `${dayCount} дней`;
    const countString=`${dayCount}`.slice(-1);
    switch (countString) {
      case '0':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return `${dayCount} дней`;
      case '1':
        return `${dayCount} день`;
      case '2':
      case '3':
      case '4':
        return `${dayCount} дня`;
    }

    return `${dayCount}`;
  })(dayCount);

  const changeDay=({date, minus}:{date:string, minus?:boolean})=>{
    let day=3600*1000*24;
    (minus && (day=-day));
    return new Date(new Date(date).getTime()+day).toISOString().split('T')[0];
  };
  const nextDayClickHandler=()=>{
    const start=changeDay({date: reqParams.date_start});
    const end=changeDay({date: reqParams.date_end});
    setCallsDateInterval({start, end});
  };
  const prevDayClickHandler=()=>{
    const minus=true;
    const start=changeDay({date: reqParams.date_start, minus});
    const end=changeDay({date: reqParams.date_end, minus});
    setCallsDateInterval({start, end});
  };

  return (
    <>
      <div className={styles.calendarButtonContainer}>
        <div onClick={prevDayClickHandler}>
          <RightArrow/>
        </div>
        <div className={styles.calendarButton} onClick={()=>setShowDatePicker(true)}>
          <CalendarIcon/>
          {calendarButtonTitle}
        </div>
        <div onClick={nextDayClickHandler}>
          <RightArrow/>
        </div>
        <DatePicker show={showDatePicker} close={()=>setShowDatePicker(false)} />
      </div>
    </>


  );
});
