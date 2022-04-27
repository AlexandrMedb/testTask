import React from 'react';
import {CallInterface} from '../../interface/mangoInterfaces';
import {ArrowCell, AvatarCell, ContactCell, DateCell, ScriptCel, TimeCell} from './cells';


export const CallListRow=(props:CallInterface)=>{
  const {date}=props;

  return (
    <>
      <div >
        <ArrowCell {...props}/>
      </div>
      <div >
        <DateCell date={date}/>
      </div>
      <div>
        <AvatarCell {...props}/>
      </div>
      <div >
        <ContactCell {...props}/>
      </div>
      <div ></div>
      <div >
        <ScriptCel/>
      </div >
      <div><TimeCell {...props} /></div>
    </>
  );
};
