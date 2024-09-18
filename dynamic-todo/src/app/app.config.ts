import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


const firestoreConfig = {
  apiKey: "AIzaSyCh3_devKavoJ8kw--z-KintrP2FO_wUaQ",
  authDomain: "sumergetalentprogram.firebaseapp.com",
  projectId: "sumergetalentprogram",
  storageBucket: "sumergetalentprogram.appspot.com",
  messagingSenderId: "740007481983",
  appId: "1:740007481983:web:c8640a910957184cb0254a"
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(firestoreConfig)),
    provideFirestore(() => getFirestore()),
  ]
};
