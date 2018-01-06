import { Component } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showForm:boolean;
  editNote:boolean;
  deleteButton:boolean;
  myNotes:any;
  note:any;
  myNotesOffline:Array<any>;



  constructor(public afDB: AngularFireDatabase){ 
     this.showForm = false;
     this.editNote = false; 
     this.deleteButton = false;
     this.note = { id:null , title:null, description:null };
     this.myNotesOffline = [];
     

     if(navigator.onLine){

       this.getNotes()
           .subscribe(
              notes =>{
                this.myNotes = notes;
                localStorage.setItem('myNotes',JSON.stringify(this.myNotes));
              }
     );

     }else{
        this.myNotes = JSON.parse(localStorage.getItem('myNotes'));
     }
  
  }

   getNotes(){
      return this.afDB.list('/notes').valueChanges();
  }

  resetNotes(){ this.note =  { id:null , title:null, description:null }; }

  
  addNote(){
      this.showForm = true;
      this.deleteButton = false;
      this.resetNotes();
  }

  saveNote(){

    if(this.editNote){
      if(navigator.onLine){
        this.afDB.database.ref('notes/' + this.note.id).set(this.note);
      }else{
        this.myNotes.forEach(note => {
          if(note.id == this.note.id){
              note = this.note;
          }
        });
      }
    }else{  
        if(navigator.onLine){
          this.note.id = Date.now(); 
          this.afDB.database.ref('notes/' + this.note.id).set(this.note);
        }else{
          this.myNotes.push(this.note);
        }
        
    }

    this.showForm = false;
    this.deleteButton = false;
    this.resetNotes();
    localStorage.setItem('myNotes',JSON.stringify(this.myNotes));
  }

  cancelNote(){
    this.showForm = false;
    this.deleteButton = false;
    this.resetNotes();
  }

  viewNote(note){
    this.editNote = true;
    this.note = note;
    this.showForm = true;
    this.deleteButton = true;
  }

  deleteNote(){
    if(navigator.onLine){
    this.afDB.database.ref('notes/' + this.note.id).remove();
    }else{
      this.myNotes.forEach((note, i) => {
        if(note.id == this.note.id){
            this.myNotes.splice(i,1);
        }
      });
    }
  
    this.deleteButton = false;
    this.showForm = true;
    this.resetNotes();
    localStorage.setItem('myNotes',JSON.stringify(this.myNotes));
  }

}
