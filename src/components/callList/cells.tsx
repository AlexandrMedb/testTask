import React, {useRef, useState} from 'react';
import {CallInterface} from 'interface/mangoInterfaces';
import styles from './cells.module.scss';

// ArrowCell
import {ReactComponent as Incoming} from 'img/table component/icon/incoming.svg';
import {ReactComponent as Outgoing} from 'img/table component/icon/outgoing.svg';
import {ReactComponent as Canceled} from 'img/table component/icon/canceled.svg';

// AvatarCell
import {CircularProgress, Menu, MenuItem, Typography} from '@mui/material';
import {getRecord} from '../../api/mangoApi';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';


export const ArrowCell =(props:CallInterface)=>{
  const {status, in_out}=props;
  if (status==='Не дозвонился') {
    return in_out==='1'?
        <Canceled className={styles.ArrowCell}
          // style={{transform: 'rotate(180deg)'}}
        />:
        <Canceled className={styles.ArrowCell}/>;
  }
  return in_out==='1'?
      <Incoming className={styles.ArrowCell}/> :
      <Outgoing className={styles.ArrowCell}/>;
};


export const DateCell =({date}:{date:string})=>{
  const dateArr=date.split(' ');
  return (
    <div className={styles.TimeCell}>
      <p>
        {dateArr[1].slice(0, -3)}
      </p>
      <p>
        {dateArr[0].split('-').splice(1).join(':')}
      </p>
    </div>
  );
};


export const AvatarCell =(props:CallInterface)=>{
  const {person_name, person_surname, person_avatar}=props;

  return (
    <div className={styles.AvatarCell} title={`${person_name} ${person_surname} `}>
      {person_avatar?
          <img alt="Remy Sharp" src={person_avatar} />:
          <img src="./noavatar.jpg" alt="noavatar"/> }
    </div>);
};


export const ContactCell =(props:CallInterface)=>{
  const {contact_name, contact_company, from_number, to_number, in_out}=props;
  if (!contact_company && !contact_name) {
    return <>{in_out==='1'?from_number:to_number}</>;
  }

  if (contact_company && contact_name) {
    return (
      <div>
        <div>{contact_name}</div>
        <div className={styles.ContactCell}>{contact_company}</div>
      </div>);
  }

  return (
    <>
      {contact_company||contact_name}
    </>);
};


export const ScriptCel =()=>{
  return <div className={styles.ScriptCell}>Скрипт не использован</div>;
};

export const TimeCell =(props:CallInterface)=>{
  const {time, record, partnership_id}=props;

  const [src, setSrs]=useState('');
  const [loading, setLoading]=useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const clickHandler= ()=>{
    setLoading(true);
    getRecord({record, partnership_id}).
        then((res)=>{
          setLoading(false);
          if (res) {
            setSrs(res);
          }
        }).catch(()=>setLoading(false));
  };


  const timeHandler = ((time:string)=> {
    if (isNaN(+time)) return '';
    const hours = Math.floor(+time / 3600);
    const minutes = Math.floor((+time - (hours * 3600)) / 60);
    const seconds = +time - (hours * 3600) - (minutes * 60);

    const double =(data:number)=>{
      return `${data > 10 ? data : `0${data}`}`;
    };

    let res=`${double(minutes)}:${double(seconds)}`;
    if (hours>0) res=`${double(hours)}:res`;
    return res;
  })(time);


  if (loading) return <CircularProgress />;
  if (+time>0 && src==='') return <span onClick={clickHandler}>{timeHandler}</span>;

  if (+time>0) {
    return (
      <div>
        <span
          onClick={handleClick}
        >
          <PlayCircleIcon/>
        </span>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{'& .MuiList-padding': {padding: '0'}}}
        >
          <MenuItem dense={true} sx={{padding: 0}}>
            <audio style={{background: '#f1f3f4'}} autoPlay={false} controls={true} src={src}/>
          </MenuItem>

        </Menu>
      </div>

    );
  }


  return <>{timeHandler}</>;
};

