import React from 'react';
import {ModalFilter} from '../../common/modalFilter';
import {connect} from 'react-redux';
import {RootState} from '../../../store/store';
import {setInOutFilter, removeFilter, setFilter} from '../../../reducers/callListReducer';
import {callFilterType, GetCallList, in_out, statusCall} from '../../../interface/mangoInterfaces';


interface propsInterface {
  show: boolean,
  closeFilter: () => void,
  setInOutFilter: (data: in_out) => void,
  removeFilter:(key:callFilterType)=>void
  setFilter:(data:{key:callFilterType, value:statusCall})=>void
  reqParams:GetCallList
}

const mapStateToProps=({callList: {reqParams}}:RootState)=> ({reqParams});

const mapDispatchToProps= {
  setInOutFilter,
  removeFilter,
  setFilter,

};


export const CallTypeFilter=connect(mapStateToProps, mapDispatchToProps )((props:propsInterface)=>{
  const {show, closeFilter, setInOutFilter, removeFilter, setFilter, reqParams}=props;


  const typeFilter={
    'Входящие': reqParams.in_out==='1',
    'Исходящие': reqParams.in_out==='0' && !reqParams.filter.status,
    'Пропущенные': reqParams.filter.status==='fail',
  };


  const checkHandler=(data:string)=>{
    if (data==='Входящие') {
      setInOutFilter('1');
      removeFilter('status');
      closeFilter();
    }
    if (data==='Исходящие') {
      setInOutFilter('0');
      removeFilter('status');
      closeFilter();
    }
    if (data==='Пропущенные') {
      setInOutFilter('0');
      setFilter({key: 'status', value: 'fail'});
      closeFilter();
    }
  };

  const cleanHandler =()=>{
    setInOutFilter('');
    removeFilter('status');
    closeFilter();
  };


  return (
    <ModalFilter
      title={'Все звонки'}
      show={show}
      cleanHandler={cleanHandler}
      closeFilter={closeFilter}
      filters={typeFilter}
      updateFilter={checkHandler}
      checkBoxHide={true}
    />
  );
});
