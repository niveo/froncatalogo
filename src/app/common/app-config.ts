import { InjectionToken } from "@angular/core";

export interface IConfigToken {
    production: boolean,
    root_http: string,
    urlCatalogos: string,
    user: string,
    password: string
}
export const APP_CONFIG = new InjectionToken<IConfigToken>('Application config'); 