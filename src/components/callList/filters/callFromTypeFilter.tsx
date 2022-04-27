import React from 'react';
import {ModalFilter} from '../../common/modalFilter';
import {connect} from 'react-redux';
import {RootState} from '../../../store/store';
import {setInOutFilter, removeFilter, setFilter} from '../../../reducers/callListReducer';
import {callFilterType, from_typeCall, GetCallList} from '../../../interface/mangoInterfaces';


interface propsInterface {
    show: boolean,
    closeFilter: () => void,
    removeFilter:(key:callFilterType)=>void
    setFilter:(data:{key:callFilterType, value:from_typeCall[]})=>void
    reqParams:GetCallList
}

const mapStateToProps=({callList: {reqParams}}:RootState)=> ({reqParams});

const mapDispatchToProps= {
  setInOutFilter,
  removeFilter,
  setFilter,

};


export const CallFromFilter=connect(
    mapStateToProps,
    mapDispatchToProps,
)((props:propsInterface)=>{
  const {show, closeFilter, removeFilter, setFilter, reqParams}=props;

  const from_type=reqParams.filter['from_type[]'];

  const typeFilter={
    'Клиенты': !!from_type?.find((el)=>el==='clients'),
    'Новые клиенты': !!from_type?.find((el)=>el==='new_clients'),
    'Все исполнители': !!from_type?.find((el)=>el==='workers'),
    'Через приложение': !!from_type?.find((el)=>el==='app'),
    'Прочие звонки': !!from_type?.find((el)=>el==='clients'),
  };


  const checkHandler=(data:string)=>{
    let newFromType:from_typeCall='clients';
    if (data==='Клиенты') newFromType='clients';
    if (data==='Новые клиенты') newFromType='new_clients';
    if (data==='Все исполнители') newFromType='workers';
    if (data==='Через приложение') newFromType='app';
    if (data==='Прочие звонки') newFromType='clients';
    if (!from_type) {
      setFilter({key: 'from_type[]', value: [newFromType]});
      return;
    }
    const ind=from_type.findIndex((el)=>el===newFromType);
    if (ind===-1) {
      const arr=[...from_type, newFromType];
      setFilter({key: 'from_type[]', value: arr});
      return;
    }
    const arr=[...from_type];
    arr.splice(ind, 1);
    setFilter({key: 'from_type[]', value: arr});
  };

  const cleanHandler =()=>{
    removeFilter('from_type[]');
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
    />
  );
});
