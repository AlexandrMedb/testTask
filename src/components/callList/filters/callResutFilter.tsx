import React from 'react';
import {ModalFilter} from '../../common/modalFilter';
import {connect} from 'react-redux';
import {RootState} from '../../../store/store';
import {setInOutFilter, removeFilter, setFilter} from '../../../reducers/callListReducer';
import {callFilterType, callResultT, GetCallList} from '../../../interface/mangoInterfaces';


interface propsInterface {
    show: boolean,
    closeFilter: () => void,
    removeFilter:(key:callFilterType)=>void
    setFilter:(data:{key:callFilterType, value:callResultT[]})=>void
    reqParams:GetCallList
}

const mapStateToProps=({callList: {reqParams}}:RootState)=> ({reqParams});

const mapDispatchToProps= {
  setInOutFilter,
  removeFilter,
  setFilter,

};


export const CallResultFilter=connect(
    mapStateToProps,
    mapDispatchToProps,
)((props:propsInterface)=>{
  const {show, closeFilter, removeFilter, setFilter, reqParams}=props;

  const results=reqParams.filter['results[]'];

  const typeFilter={
    'Заказ оформлен': !!results?.find((el)=>el==='order'),
    'Создано обращение': !!results?.find((el)=>el==='message'),
    'Предварительный заказ': !!results?.find((el)=>el==='preorder'),

  };


  const checkHandler=(data:string)=>{
    let newResult:callResultT='order';
    if (data==='Заказ оформлен') newResult='order';
    if (data==='Создано обращение') newResult='message';
    if (data==='Предварительный заказ') newResult='preorder';

    if (!results) {
      setFilter({key: 'results[]', value: [newResult]});
      return;
    }
    const ind=results.findIndex((el)=>el===newResult);
    if (ind===-1) {
      const arr=[...results, newResult];
      setFilter({key: 'results[]', value: arr});
      return;
    }
    const arr=[...results];
    arr.splice(ind, 1);
    setFilter({key: 'results[]', value: arr});
  };

  const cleanHandler =()=>{
    removeFilter('results[]');
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
