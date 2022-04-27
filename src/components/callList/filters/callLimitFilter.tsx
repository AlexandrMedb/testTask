import React, {useState} from 'react';
import {ModalFilter} from '../../common/modalFilter';
import {connect} from 'react-redux';
import {RootState} from '../../../store/store';
import {removeFilter, setFilter} from '../../../reducers/callListReducer';
import {callFilterType, GetCallList} from '../../../interface/mangoInterfaces';


interface propsInterface {
    show: boolean,
    closeFilter: () => void,
    removeFilter:(key:callFilterType)=>void
    setFilter:(data:{key:callFilterType, value:number})=>void
    reqParams:GetCallList
}

const mapStateToProps=({callList: {reqParams}}:RootState)=> ({reqParams});

const mapDispatchToProps= {
  removeFilter,
  setFilter,
};


export const CallLimitFilter=connect(
    mapStateToProps,
    mapDispatchToProps,
)((props:propsInterface)=>{
  const {show, closeFilter, removeFilter, setFilter, reqParams}=props;


  const typeFilter={
    '50 звонков': reqParams.filter.limit===50,
    '100 звонков': reqParams.filter.limit===100,
    '200 звонков': reqParams.filter.limit===200,
  };


  const checkHandler=(data:string)=>{
    const value=+data.split(' ')[0];
    if (!isNaN(value)) setFilter({key: 'limit', value});
    closeFilter();
  };

  const cleanHandler =()=>{
    removeFilter('duration[lte]');
    removeFilter('duration[gte]');
    closeFilter();
  };


  return (
    <ModalFilter
      show={show}
      cleanHandler={cleanHandler}
      closeFilter={closeFilter}
      filters={typeFilter}
      updateFilter={checkHandler}
      checkBoxHide={true}
      top={4}
    />
  );
});
