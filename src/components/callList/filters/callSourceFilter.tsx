import React from 'react';
import {ModalFilter} from '../../common/modalFilter';
import {connect} from 'react-redux';
import {RootState} from '../../../store/store';
import {removeFilter, setFilter} from '../../../reducers/callListReducer';
import {callFilterType, GetCallList, sourcesCall} from '../../../interface/mangoInterfaces';


interface propsInterface {
    show: boolean,
    closeFilter: () => void,
    removeFilter:(key:callFilterType)=>void
    setFilter:(data:{key:callFilterType, value:sourcesCall[]})=>void
    reqParams:GetCallList
}

const mapStateToProps=({callList: {reqParams}}:RootState)=> ({reqParams});

const mapDispatchToProps= {
  removeFilter,
  setFilter,
};


export const CallSourceFilter=connect(
    mapStateToProps, mapDispatchToProps )((props:propsInterface)=>{
  const {show, closeFilter, removeFilter, reqParams, setFilter}=props;

  const source=reqParams.filter['sources[]'];

  const typeFilter={
    'Сайт': !!source?.find((el)=>el==='from_site'),
    'Яндекс': !!source?.find((el)=>el==='yandex'),
    'Google': !!source?.find((el)=>el==='google'),
    // 'Avito': !!source?.find((el)=>el==='empty'),
    'Без источника': !!source?.find((el)=>el==='empty'),
  };


  const checkHandler=(data:string)=>{
    let newSource:sourcesCall='empty';
    if (data==='Сайт') newSource='from_site';
    if (data==='Яндекс') newSource='yandex';
    if (data==='Google') newSource='google';
    if (!source) {
      setFilter({key: 'sources[]', value: [newSource]});
      return;
    }
    const ind=source.findIndex((el)=>el===newSource);
    if (ind===-1) {
      const arr=[...source, newSource];
      setFilter({key: 'sources[]', value: arr});
      return;
    }
    const arr=[...source];
    arr.splice(ind, 1);
    setFilter({key: 'sources[]', value: arr});
  };

  const cleanHandler =()=>{
    removeFilter('sources[]');
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
