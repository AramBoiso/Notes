import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


export const firebaseConfig = {
  apiKey: "AIzaSyAtuGLvbgF4N2wUFnM1_J-tYU1LAlfoRIQ",
  authDomain: "notes-84d64.firebaseapp.com",
  databaseURL: "https://notes-84d64.firebaseio.com",
  storageBucket: "notes-84d64.appspot.com",
  messagingSenderId: '290547451196'
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
