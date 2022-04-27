import {MANGO_GET_LIST, MANGO_GET_RECORD} from '../const/mangoApiUrls';
import {GetCallList, GetRecord} from '../interface/mangoInterfaces';


const callListUrlHandler =(req:GetCallList, limitList=true):string=>{
  const {date_start, date_end, in_out, filter}=req;
  // const {'from_type[]', from_persons, sources, ...optional}=filter;
  const {...optional}=filter;
  // eslint-disable-next-line max-len
  let url =`${MANGO_GET_LIST}?date_start=${date_start}&date_end=${date_end}&${in_out?`&in_out=${in_out}`:''}`;
  (Object.keys(filter) as Array<keyof typeof filter>).forEach((el)=>{
    if (filter[el] && Array.isArray(filter[el])) {
      const arr =filter[el] as Array<string>;
      url+= arr.map((els)=>`&${el}=${els}`).join('');
    } else {
      url+=`&${el}=${optional[el]}`;
    }
  });

  return url;
};

export const getCallList= async (req:GetCallList)=>{
  try {
    const url =callListUrlHandler(req);
    console.log(url);
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


export const getRecord= async ({record, partnership_id}:GetRecord)=>{
  try {
    const url =`${MANGO_GET_RECORD}?record=${record}&partnership_id=${partnership_id}`;

    const response = await fetch(url,
        {
          method: 'POST',
          body: null,
          // todo get right token
          headers: {Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`}});
    const data = await response.blob();
    return URL.createObjectURL(data);
  } catch (e) {

  }
};


export const getReportXLSX= async (req:GetCallList)=>{
  try {
    const url =callListUrlHandler(req, false)+'&xls=1';
    console.log(url);
    const response = await fetch(url,
        {
          method: 'POST',
          body: null,
          // todo get right token
          headers: {Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`}});
    const data = await response.blob();
    return URL.createObjectURL(data);
  } catch (e) {

  }
};
