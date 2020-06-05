import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'hammerjs';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import amplify from './aws-exports';

import Amplify from 'aws-amplify';

amplify.oauth.redirectSignIn = environment.redirectSignIn;
amplify.oauth.redirectSignOut = environment.redirectSignOut;

Amplify.configure(amplify);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
