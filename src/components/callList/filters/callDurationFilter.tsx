import React from 'react';
import {ModalFilter} from '../../common/modalFilter';
import {connect} from 'react-redux';
import {RootState} from '../../../store/store';
import {setInOutFilter, removeFilter, setFilter} from '../../../reducers/callListReducer';
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
  setInOutFilter,
  removeFilter,
  setFilter,

};


export const CallDurationFilter=connect(
    mapStateToProps,
    mapDispatchToProps,
)((props:propsInterface)=>{
  const {show, closeFilter, removeFilter, setFilter, reqParams}=props;


  const typeFilter={
    'До 15 секунд': (!!reqParams.filter['duration[lte]'] && reqParams.filter['duration[lte]']===15),
    'До 5 минут': (!!reqParams.filter['duration[lte]'] && reqParams.filter['duration[lte]']===300),
    // eslint-disable-next-line max-len
    'Более 5 минут': (!!reqParams.filter['duration[gte]'] && reqParams.filter['duration[gte]']===300),
  };


  const checkHandler=(data:string)=>{
    if (data==='До 15 секунд') {
      removeFilter('duration[gte]');
      setFilter({key: 'duration[lte]', value: 15});
      closeFilter();
    }
    if (data==='До 5 минут') {
      removeFilter('duration[gte]');
      setFilter({key: 'duration[lte]', value: 300});
      closeFilter();
    }
    if (data==='Более 5 минут') {
      removeFilter('duration[lte]');
      setFilter({key: 'duration[gte]', value: 300});
      closeFilter();
    }
  };

  const cleanHandler =()=>{
    removeFilter('duration[lte]');
    removeFilter('duration[gte]');
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
