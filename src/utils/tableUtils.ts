import {filterInterface} from '../interface/callListInterfaces';


export const clearFilter=({updateFilter, filters}: {
    updateFilter:(data:filterInterface)=>void,
    filters:filterInterface})=>{
  const cleanFilter ={...filters};
  Object.keys(cleanFilter).forEach((el)=>{
    cleanFilter[el]=false;
  });

  updateFilter(cleanFilter);
};

export const deltaDayCounter= ({lastDay, firstDay}:{lastDay:Date, firstDay:Date })=>{
  return Math.round((lastDay.getTime()-firstDay.getTime())/3600/24/1000)+1;
};


