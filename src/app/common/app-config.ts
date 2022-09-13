import { InjectionToken } from "@angular/core";

export interface IConfigToken {
    production: boolean,
    root_http: string,
    urlCatalogos: string
}
export const APP_CONFIG = new InjectionToken<IConfigToken>('Application config'); 