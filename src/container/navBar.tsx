import React from 'react';
import {ReactComponent as CompanyLogo} from 'img/Sidebar/logo.svg';
import styles from './navBar.module.scss';

import {CustomListItem} from '../components/navBar/customListItem';
import {CustomButton} from '../components/navBar/customButton';

// icons
import {ReactComponent as TimelineIcon} from 'img/Sidebar/icon/timelineIcon.svg';
import {ReactComponent as DoneAllIcon} from 'img/Sidebar/icon/doneAllIcon.svg';
import {ReactComponent as MailOutlineIcon} from 'img/Sidebar/icon/mailOutlineIcon.svg';
import {ReactComponent as WorkOutlineIcon} from 'img/Sidebar/icon/workOutlineIcon.svg';
import {ReactComponent as LocalLibraryIcon} from 'img/Sidebar/icon/localLibraryIcon.svg';
import {ReactComponent as SettingsIcon} from 'img/Sidebar/icon/settingsIcon.svg';
import {ReactComponent as PersonOutlineIcon} from 'img/Sidebar/icon/personOutlineIcon.svg';
import {ReactComponent as CallIcon} from 'img/Sidebar/icon/call.svg';
import {ReactComponent as DocumentIcon} from 'img/Sidebar/icon/documents.svg';
import {ReactComponent as PeopleIcon} from 'img/Sidebar/icon/people.svg';
import {ReactComponent as AddCircleIcon} from 'img/Sidebar/icon/addIcon.svg';
import {ReactComponent as ErrorIcon} from 'img/Sidebar/icon/errorIcon.svg';


export const NavBar=()=>{
  return (
    <section className={styles.wrapper} >
      <div className={styles.container}>
        <div className={styles.logo}>
          <CompanyLogo/>
        </div >
        <nav className={styles.navBar}>
          <CustomListItem text={'Итоги'} Icon={ <TimelineIcon />} />
          <CustomListItem text={'Заказы'} Icon={ <DoneAllIcon />} />
          <CustomListItem text={'Сообщения'} Icon={ <MailOutlineIcon />} />
          <CustomListItem text={'Звонки'} Icon={ <CallIcon/>} active={true} />
          <CustomListItem text={'Контрагенты'} Icon={ <PeopleIcon />} />
          <CustomListItem text={'Документы'} Icon={ <WorkOutlineIcon />} />
          <CustomListItem text={'Исполнители'} Icon={ <PersonOutlineIcon />} />
          <CustomListItem text={'Отчеты'} Icon={ <DocumentIcon />} />
          <CustomListItem text={'База знаний'} Icon={ <LocalLibraryIcon />} />
          <CustomListItem text={'Настройки'} Icon={ <SettingsIcon/>} />
        </nav>


        <div className={styles.buttonsBlock}>
          <CustomButton text={'Добавить заказ'} icon={<AddCircleIcon/>}/>
          <CustomButton text={'Оплата'} icon={<ErrorIcon/>}/>
        </div>

      </div>
    </section>
  );
};
