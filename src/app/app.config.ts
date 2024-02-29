import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTokenInterceptor } from './core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';

const firebaseConfig = {
  // apiKey: "AIzaSyCnQbgNXDJT6sy1_f8gx3d74kM-3FY2uCw",
  // authDomain: "pubkin-6efd2.firebaseapp.com",
  // projectId: "pubkin-6efd2",
  // storageBucket: "pubkin-6efd2.appspot.com",
  // messagingSenderId: "1019249625237",
  // appId: "1:1019249625237:web:73473b4f492538851a739c"
  apiKey: "AIzaSyAdckeaaJ3jwqzIrpVmrm8Jw5-pGNKVlb0",
  authDomain: "pubkin20.firebaseapp.com",
  databaseURL: "https://pubkin20-default-rtdb.firebaseio.com",
  projectId: "pubkin20",
  storageBucket: "pubkin20.appspot.com",
  messagingSenderId: "1074836594378",
  appId: "1:1074836594378:web:d490abc4ff86b500689e33",
  measurementId: "G-3WR3CTR306"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideFunctions(() => getFunctions()),
      provideMessaging(() => getMessaging()),
      providePerformance(() => getPerformance()),
      provideStorage(() => getStorage()),
    ])
  ]
};
