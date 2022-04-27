type is_blocked= '1'|'0';

export type position= 'accountant'|'callleader'|'callmanager'|'chief-accountant'| 'controller'|
    'copywriter'| 'designer'| 'director'| 'frmanager'| 'hr'| 'hr-assist'| 'leader'|
    'mainoperator'| 'manager'| 'moderator'| 'operator'| 'sale-manager'| 'seo'|
    'skillmanager'| 'submoderator'| 'supervisor'| 'worksupport'

export interface getPartnershipList {
    is_blocked?:is_blocked
    position?:position
}

export interface employee {
    'id': string,
    'name': string,
    'surname': string,
    'patronymic': string,
    'login': string,
    'phone': string,
    'mango_phone': string,
    'email': string,
    'position': position,
    'is_blocked': is_blocked,
    'avatar': URL
}

export interface userInt extends employee {
    'partnership': {
        'id': string,
        'name': string,
        'brand_name': string,
        'brand_ico': string,
        'city': string,
        'phone': string,
        'email': string,
        'adress': string,
        'ur_adress': string,
        'office_adress': string,
        'inn': string,
        'kpp': string,
        'rs': string,
        'bank': string,
        'ks': string,
        'bik': string,
        'ogrn': string
    }
}


export interface menuItem {
    url:string,
    icon:string,
    name: string,
    is_new: boolean,
    submenu?:menuItem[]
}
