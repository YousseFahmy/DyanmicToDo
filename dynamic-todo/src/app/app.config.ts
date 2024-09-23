import { ApplicationConfig } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient } from "@angular/common/http";

export const firebaseConfig = {
  apiKey: "AIzaSyCh3_devKavoJ8kw--z-KintrP2FO_wUaQ",
  authDomain: "sumergetalentprogram.firebaseapp.com",
  projectId: "sumergetalentprogram",
  storageBucket: "sumergetalentprogram.appspot.com",
  messagingSenderId: "740007481983",
  appId: "1:740007481983:web:c8640a910957184cb0254a",
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
