import React, {useEffect, useState} from 'react';
import {ReactComponent as DownArrow} from 'img/common/rightArrow.svg';
import styles from './datePicker.module.scss';
import {RootState} from '../../store/store';
import {connect} from 'react-redux';
import {setCallsDateInterval} from '../../reducers/callListReducer';
import {deltaDayCounter} from '../../utils/tableUtils';
import {GetCallList} from '../../interface/mangoInterfaces';


const mapStateToProps=({callList: {reqParams}}:RootState)=> ({reqParams});

interface propsInterface {
  setCallsDateInterval: (data: {start:string, end:string}) => void,
  show:boolean,
  close:()=>void,
  reqParams:GetCallList
}


export const DatePicker=connect(mapStateToProps, {setCallsDateInterval} )((props:propsInterface)=>{
  const {setCallsDateInterval, show, close, reqParams}=props;

  const [currentMonth, setCurrentMont]=useState(new Date());
  const [firstSelected, setFirstSelected]=useState<Date>(new Date(reqParams.date_start));
  const [secondSelected, setSecondSelected]=useState<Date>(new Date(reqParams.date_end));


  const firstMonthDay=new Date(new Date(currentMonth).setDate(1));
  const firstWeekDay=new Date(new Date(currentMonth).setDate(1)).getUTCDay();
  const lastMonthDay=new Date(new Date(new Date(currentMonth).
      setMonth(currentMonth.getMonth()+1)).setDate(0));

  const firstDay=new Date(new Date(currentMonth).setDate(2-firstWeekDay));
  const lastDay=new Date(
      new Date(lastMonthDay).setDate(lastMonthDay.getDate()+7-lastMonthDay.getUTCDay()),
  );

  const calendarLength=deltaDayCounter({lastDay, firstDay});


  const weekDays=['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
  const days = Array.from({length: calendarLength}, (v, k) =>
    new Date(new Date(currentMonth).setDate(2-firstWeekDay+k)));

  const nextMonthClickHandler=()=>{
    setCurrentMont(new Date(new Date().setMonth(currentMonth.getMonth()+1)));
  };
  const prevMonthClickHandler=()=>{
    setCurrentMont(new Date(new Date().setMonth(currentMonth.getMonth()-1)));
  };

  const dateClickHandler=(date:Date)=>{
    const current=date.getTime();
    const first=firstSelected?.getTime();
    const second=secondSelected?.getTime();

    if (!first) {
      setFirstSelected(date);
      setSecondSelected(date);
      return;
    }
    if (first && second) {
      if (first>current) {
        setFirstSelected(date);
        return;
      }
      if (second<current) {
        setSecondSelected(date);
        return;
      }
      if (current<second) {
        setSecondSelected(date);
        return;
      }
      if (current===second) {
        setFirstSelected(date);
        return;
      }
    }
  };

  const acceptClickHandler=()=>{
    if (firstSelected && secondSelected) {
      const start =firstSelected.toISOString().split('T')[0];
      const end =secondSelected.toISOString().split('T')[0];
      setCallsDateInterval({start, end});
    }
  };


  useEffect(()=>{
    acceptClickHandler();
  }, [firstSelected, secondSelected]);


  return (
    <>
      <section style={{display: show?'':'none', position: 'absolute'}}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div onClick={prevMonthClickHandler}>
              <DownArrow/>
            </div>
            <h3>{currentMonth.toLocaleDateString('rus', {month: 'long'})}</h3>
            <div onClick={nextMonthClickHandler}>
              <DownArrow />
            </div>
          </div>
          <div className={styles.dates}>
            {weekDays.map((el)=><div className={styles.day} key={el}>{el}</div>)}
            {days.map((el )=>{
              const style=((date)=>{
                let res={
                  background: '',
                  color: '',
                  borderRadius: '',
                };
                const current=new Date(date.toISOString().split('T')[0]).getTime();
                const first=firstSelected?.getTime();
                const second=secondSelected?.getTime();
                const firstMont=firstMonthDay.getTime();
                const lastMont=lastMonthDay.getTime();
                if (current>=firstMont && current<=lastMont) {
                  res.color='black';
                }

                if (first && second) {
                  if (current<second && current>first) {
                    res.background= '#EAF0FA';
                    // res.borderRadius='0';
                  }
                  if (current===first) res= {...res, background: '#002CFB', color: '#FFF'};
                  if (current===second) res= {...res, background: '#002CFB', color: '#FFF'};
                }


                return res;
              })(el);
              return (
                <div
                  className={styles.day}
                  key={el.getTime()}
                  onClick={()=>dateClickHandler(new Date(el.toISOString().split('T')[0]))}
                  style={style}
                >
                  {el.getUTCDate()}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section style={{display: show?'':'none', position: 'absolute'}}
        onClick={close} className={styles.activeBg}></section>
    </>
  );
});
