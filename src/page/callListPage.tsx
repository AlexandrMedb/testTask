import React, {useEffect, useState} from 'react';

import styles from './callListPage.module.scss';
import {Header} from '../components/callList/header';
import {CallListHeader} from '../components/callList/callListHeader';
import {CallListData} from '../container/callListData';
import {connect} from 'react-redux';
import {RootState} from '../store/store';
import {ReactComponent as DownTriangle} from '../img/common/downTriangle.svg';
import {ReactComponent as DownLoadIcon} from '../img/common/downloadIcon.svg';
import {ReactComponent as CrossIcon} from '../img/common/cross.svg';
import {GetCallList} from '../interface/mangoInterfaces';
import {cleanAllFilters} from '../reducers/callListReducer';
import {CallLimitFilter} from '../components/callList/filters/callLimitFilter';
import {CalendarControl} from '../components/callList/calendarControl';
import {getReportXLSX} from '../api/mangoApi';
import {getProfileAsync} from '../reducers/curUserReducer';


const mapStateToProps=({callList: {callsCount, reqParams}}:RootState)=> ({callsCount, reqParams});
const mapDispatchToProps={cleanAllFilters, getProfileAsync};

interface propsInterface {
  callsCount: number,
  reqParams: GetCallList,
  cleanAllFilters:()=>void
  getProfileAsync:()=>void
}

export const CallListPage=connect(mapStateToProps, mapDispatchToProps)((props:propsInterface)=>{
  const {callsCount, reqParams, cleanAllFilters, getProfileAsync}=props;

  const [showLength, setShowLength] = useState(false);

  useEffect(()=>{
    getProfileAsync();
  });

  const saveData = (function() {
    const a = document.createElement('a');
    document.body.appendChild(a);
    return function(url:string, fileName:string) {
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
  }());

  const downloadClick= async ()=>{
    const downLoadParams={
      ...reqParams,
      filter: {...reqParams.filter, offset: 0, limit: callsCount}} as GetCallList;
    const url=await getReportXLSX(downLoadParams);
    const fileName='report.xlsx';
    if (url) {
      saveData(url, fileName);
    }
  };


  return (
    <main className={styles.wrapper}>
      <Header/>
      <section className={styles.container}>
        <div className={styles.tableActions}>
          <div className={styles.callCounter}>
            <h2>Звонки </h2>
            <div>{callsCount}</div>
          </div>
          <div className={styles.search}></div>
          {(Object.keys(reqParams.filter).length>4 || reqParams.in_out!=='') && (
            <div>
              <div onClick={()=>cleanAllFilters()} className={styles.listLength}>
                  Очистить все фильтры
                <div>
                  <CrossIcon/>
                </div>
              </div>
            </div>
          )}
          <div>
            <div onClick={()=>setShowLength(true)} className={styles.listLength}>
              Отображать по {reqParams.filter.limit || 50} <DownTriangle/>
            </div>
            <CallLimitFilter show={showLength} closeFilter={()=>setShowLength(false)}/>
          </div>
          <div className={styles.downLoadButton} onClick={downloadClick}>
            Скачать отчет
            <DownLoadIcon/>
          </div>
          <CalendarControl/>
        </div>
        <div className={styles.table}
          style={{gridTemplateColumns: '100px  89px  128px 2fr 1fr 2fr 1fr'}}
        >
          <CallListHeader/>
          <CallListData/>
        </div>
      </section>
    </main>
  );
});
