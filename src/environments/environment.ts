// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dbUrl: "dbUrl_test",
  apiHost: 'http://localhost:5029/',
  call_back_url_local: "http://localhost:5029",
  "FBVars": {
    "fbAppId": "227923824483815"
  },
  "google_blogger": {
    "id": "9170308257488689808"
  },
  "server_port": "5029"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
