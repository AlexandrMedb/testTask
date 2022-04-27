import React, {ReactElement, useMemo, useState} from 'react';
import {RootState} from '../../store/store';
import {removeFilter, setInOutFilter, setSortAndOrder} from '../../reducers/callListReducer';
import {GetCallList, sort_by, order, callFilterType, in_out} from '../../interface/mangoInterfaces';
import {connect} from 'react-redux';
import {CallTypeFilter} from './filters/callTypeFilter';
import {ReactComponent as SortLogo} from 'img/table component/icon/sortImg.svg';
import {ReactComponent as DownArrow} from 'img/common/downArrow.svg';
import {ReactComponent as CrossIcon} from 'img/common/cross.svg';

import styles from './callListHeader.module.scss';
import {CallDurationFilter} from './filters/callDurationFilter';
import {CallSourceFilter} from './filters/callSourceFilter';
import {CallFromFilter} from './filters/callFromTypeFilter';
import {CallResultFilter} from './filters/callResutFilter';
import {position, userInt} from '../../interface/partnershipInterfacs';


const mapStateToProps = ({callList: {reqParams}, curUser: {data: userData}}: RootState) => {
  return {reqParams, userData};
};

const mapDispatchToProps = {
  setSortAndOrder,
};

interface callListHeader {
    reqParams: GetCallList,
    setSortAndOrder: (data: { sort_by: sort_by, order: order }) => void
    userData?:userInt
}

export const CallListHeader = connect(
    mapStateToProps, mapDispatchToProps)((props: callListHeader) => {
  const {setSortAndOrder, reqParams, userData} = props;

  const role:position=userData?.position||'operator';

  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showFromFilter, setShowFromFilter] = useState(false);
  const [showPersonFilter, setShowPersonFilter] = useState(false);
  const [showSourceFilter, setShowSourceFilter] = useState(false);
  // const [showMistakeFilter, setShowMistakeFilter] = useState(false);
  const [showResultFilter, setShowResultFilter] = useState(false);
  const [showDurationFilter, setShowDurationFilter] = useState(false);


  const sortHandler = (sort_by: sort_by) => {
    if (reqParams.filter.sort_by !== sort_by) {
      setSortAndOrder({sort_by, order: 'ASC'});
      return;
    }
    if (reqParams.filter.order === 'ASC') setSortAndOrder({sort_by, order: 'DESC'});
    if (reqParams.filter.order === 'DESC') setSortAndOrder({sort_by, order: 'ASC'});
  };

  const durationClickHandler = () => {
    sortHandler('duration');
  };

  const dateClickHandler = () => {
    sortHandler('date');
  };


  const columnRule=((role)=>{
    const result ={
      type: true,
      time: true,
      callFrom: true,
      candidate: false,
      persons: true,
      result: true,
      mistakes: true,
      source: true,
      duration: true,
    };
    return result;
  })(role);

  return (
    <>
      <HeaderCell
        title={'Тип'}
        show={showTypeFilter}
        setShow={setShowTypeFilter}
        filterIsSet={reqParams.in_out !== ''}
        removeFilterKey='in_out'
        Filter={() => <CallTypeFilter
          closeFilter={() => setShowTypeFilter(false)}
          show={showTypeFilter}
        />}
      />
      <HeaderCell
        title={'Время'}
        sortFn={dateClickHandler}
      />

      {columnRule.callFrom && <HeaderCell
        title={'Звонок'}
        show={showFromFilter}
        setShow={setShowFromFilter}
        filterIsSet={!!reqParams.filter['from_type[]']}
        removeFilterKey='from_type[]'
        Filter={() => <CallFromFilter
          closeFilter={() => setShowFromFilter(false)}
          show={showFromFilter}
        />}
      />}

      {columnRule.candidate && <HeaderCell
        title={'Кандидат'}/>}
      <HeaderCell
        title={'Сотрудник'}
        show={showPersonFilter}
        setShow={setShowPersonFilter}
        filterIsSet={!!reqParams.filter['from_persons[]']}
        removeFilterKey='from_persons[]'
        Filter={() => <CallDurationFilter
          closeFilter={() => setShowPersonFilter(false)}
          show={showPersonFilter}
        />}
      />
      {columnRule.source &&<HeaderCell
        title={'Источник'}
        show={showSourceFilter}
        setShow={setShowSourceFilter}
        filterIsSet={!!reqParams.filter['sources[]']}
        removeFilterKey='sources[]'
        Filter={() => <CallSourceFilter
          closeFilter={() => setShowSourceFilter(false)}
          show={showSourceFilter}
        />}
      />}

      <HeaderCell
        title={'Итог'}
        setShow={setShowResultFilter}
        Filter={() => <CallResultFilter
          closeFilter={() => setShowResultFilter(false)}
          show={showResultFilter}
        />}
      />
      <HeaderCell
        title={'Длительность'}
        show={showDurationFilter}
        setShow={setShowDurationFilter}
        filterIsSet={!!reqParams.filter['duration[gte]']||!!reqParams.filter['duration[lte]']}
        removeFilterKey='duration[gte]'
        sortFn={durationClickHandler}
        Filter={() => <CallDurationFilter
          closeFilter={() => setShowDurationFilter(false)}
          show={showDurationFilter}
        />}
      />
    </>

  );
});

interface headerCellInterface {
    sortFn?: () => void,
    title: string,
    show?: boolean,
    setShow?: (data: boolean) => void,
    Filter?: () => ReactElement,
    filterIsSet?:boolean,
    removeFilterKey?:'in_out'|callFilterType
    removeFilter:(key:callFilterType)=>void
    setInOutFilter:(data:in_out)=>void
}


const HeaderCell =connect(()=>({}), {
  removeFilter,
  setInOutFilter,
})( (props: headerCellInterface) => {
  const {sortFn, title, Filter, setShow, show,
    filterIsSet, removeFilterKey, setInOutFilter, removeFilter} = props;


  const icon =(()=>{
    if (filterIsSet && !show) {
      return (
        <div
          onClick={()=> {
            if (removeFilterKey) {
              if (removeFilterKey==='in_out') setInOutFilter('');
              else if (removeFilterKey==='duration[gte]') {
                removeFilter('duration[gte]');
                removeFilter('duration[lte]');
              } else removeFilter(removeFilterKey);
            }
          }} className={styles.headerCellFilter}
        >
          <CrossIcon/>
        </div>);
    }
    if (show ) {
      return (
        <div style={{transform: 'rotate(180deg)'}} className={styles.headerCellFilter}>
          <DownArrow/>
        </div>);
    }
    if (!show && setShow) {
      return (
        <div onClick={()=>(setShow && setShow(true))} className={styles.headerCellFilter}>
          <DownArrow/>
        </div>);
    }
    return <></>;
  })();

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.headerCell}>
          {sortFn && (<div className={styles.headerCellSort} onClick={sortFn}>
            <SortLogo/>
          </div>)}
          <div onClick={() => {
            if (Filter) {
              (setShow && setShow(true));
              return;
            }
            (sortFn && sortFn());
          }}>
            {title}
          </div>
          {icon}
        </div>
      </div>
      {Filter && <Filter/>}
    </div>
  );
});

