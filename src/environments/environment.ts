// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IConfigToken } from "src/app/common/app-config";

export const environment : IConfigToken = {
  production: false,
  root_http: 'http://localhost:8080',
  urlCatalogos:  'http://localhost:8080/catalogos',
  user: 'admin',
  password: 'admin'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
