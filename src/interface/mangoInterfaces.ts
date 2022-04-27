export interface CallInterface {
    'id': string,
    'partnership_id': string,
    'date': string,
    'date_notime': string,
    'time': string,
    'from_number': string,
    'from_extension': string,
    'to_number': string,
    'to_extension': string,
    'status': 'Дозвонился' | 'Не дозвонился',
    'record': string,
    'line_number': string,
    'in_out': '1' | '0',
    'contact_name': string,
    'contact_company': string,
    'person_id': string,
    'person_name': string,
    'person_surname': string,
    'person_avatar': string
}

export type in_out = '1' | '0' | '';
export type order = 'ASC' | 'DESC';
export type sort_by = 'date' | 'duration';
export type statusCall = 'success' | 'fail';
export type from_typeCall = 'clients' | 'new_clients' | 'workers' | 'app'
export type sourcesCall = 'from_site' | 'yandex' | 'google' | 'empty'
export type callErrorT = 'noerrors' | 'noscript'
export type callResultT = 'order' | 'message'|'preorder'

export interface GetCallList {
    date_start: string
    date_end: string
    // 1 - входящий звонок
    // 0 - исходящий звонок
    // пусто - все звонки
    in_out: '1' | '0' | '',
    filter:Partial<filter>,
}

interface filter {
    limit?: number,
    offset?: number,
    sort_by?: sort_by,
    order?: order,
    status?: statusCall,
    'duration[gte]'?: number,
    'duration[lte]'?: number,
    search?: string,
    'from_type[]'?:from_typeCall[],
    'from_persons[]'?:string[],
    'sources[]'?: sourcesCall[],
    'errors[]'?: callErrorT[],
    'results[]'?:callResultT[],
    'ids[]'?: string[],
}


export type callFilterType= keyof filter


export interface GetRecord {
    record: string,
    partnership_id: string
}
