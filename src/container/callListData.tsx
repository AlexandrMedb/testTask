import React, {useEffect} from 'react';
import {CallListRow} from '../components/callList/callListRow';
import {CallInterface, GetCallList} from '../interface/mangoInterfaces';
import {RootState} from '../store/store';
import {connect} from 'react-redux';
import {CallListSlice, setCallListAsync} from '../reducers/callListReducer';
import {CircularProgressCustom} from '../components/common/circularProgress';
import {getProfileAsync} from '../reducers/curUserReducer';
import {getMenuSettingsAsync} from '../reducers/menuReducer';


const mapStateToProps=({callList}:RootState)=> {
  const {reqParams, data, loading, callsCount}=callList;
  return {reqParams, data, loading, callsCount};
};

interface callListPage extends CallListSlice{
  setCallListAsync:(data:GetCallList)=>void,
  reqParams:GetCallList
  getProfileAsync:()=>void,
}


export const CallListData=connect(mapStateToProps, {setCallListAsync, getProfileAsync,
  getMenuSettingsAsync} )((props:callListPage)=>{
  const {setCallListAsync, reqParams, data, loading} =props;
  useEffect(()=>{
    setCallListAsync(reqParams);
  }, [reqParams]);

  if (loading) return (<CircularProgressCustom/>);
  return <>
    {data.map((el:CallInterface) => (
      <CallListRow key={el.id} {...el}/>
    ))}
  </>;
});
