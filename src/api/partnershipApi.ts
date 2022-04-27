import {PARTNER_GET_MENU, PARTNER_GET_PERSONS, PARTNER_GET_PROFILE} from 'const/mangoApiUrls';
import {getPartnershipList} from 'interface/partnershipInterfacs';


export const getPersonsList= async (req:getPartnershipList)=>{
  try {
    let url =PARTNER_GET_PERSONS;
    (Object.keys(req) as Array<keyof typeof req>).forEach((el, i)=>{
      url+=`${i===0?'?':'&'}${el}=${req[el]}`;
    });

    const response = await fetch(url,
        {
          method: 'POST',
          body: null,
          // todo get right token
          headers: {Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`}});
    return await response.json();
  } catch (e) {

  }
};


export const getProfile= async ()=>{
  try {
    const response = await fetch(PARTNER_GET_PROFILE,
        {
          method: 'POST',
          body: null,
          // todo get right token
          headers: {Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`}});
    return await response.json();
  } catch (e) {

  }
};


export const getMenu= async ()=>{
  try {
    const response = await fetch(PARTNER_GET_MENU,
        {
          method: 'POST',
          body: null,
          // todo get right token
          headers: {Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`}});
    return await response.json();
  } catch (e) {

  }
};
