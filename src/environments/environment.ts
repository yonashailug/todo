// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  BASEURL: 'http://localhost:3000',
  firebase: {
    apiKey: 'AIzaSyCkTH_tba9fvXxD7h7Yxj-6WvtN_NQHtFo',
    authDomain: 'todo-f3651.firebaseapp.com',
    databaseURL: 'https://todo-f3651.firebaseio.com',
    projectId: 'todo-f3651',
    storageBucket: 'todo-f3651.appspot.com',
    messagingSenderId: '951040107681'
  }
};
