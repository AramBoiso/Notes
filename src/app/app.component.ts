import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showForm:boolean;
  editNote:boolean;
  deleteButton:boolean;

 

  constructor(){ this.showForm = false; this.editNote = false; this.deleteButton = false; }

  notes:any[] = [
    {id:1, title:'Note 1', description:'It is my note one'},
    {id:2, title:'Note 2', description:'It is my note two'},
    {id:3, title:'Note 3', description:'It is my note three'},
    {id:4, title:'Note 4', description:'It is my note four'},
    {id:5, title:'Note 5', description:'It is my note five'},

  ];

  note = { id:null , title:null, description:null };

  addNote(){
      this.showForm = true;
      this.note = { id:null , title:null, description:null };
      this.deleteButton = false;
  }

  saveNote(){
  if(this.editNote){
    var me = this;
    this.notes.forEach(function(el, i){
      if(el.id === me.note.id){
          me.notes[i] = me.note;
      }
      me.note = { id:null , title:null, description:null };
    });
    
    this.showForm = false;
  }else{
     this.note.id = Date.now();
     this.notes.push(this.note);
     this.showForm = false;
     this.note = { id:null , title:null, description:null };
  }
  }

  cancelNote(){
    this.showForm = false;
    this.note = { id:null , title:null, description:null };
    this.deleteButton = false;
  }

  viewNote(note){
    this.editNote = true;
    this.note = note;
    this.showForm = true;
    this.deleteButton = true;
  }

  deleteNote(){
    var me = this;
    this.notes.forEach(function(el, i){
     if(el == me.note){
       me.notes.splice(i, 1);
     }
     me.note = { id:null , title:null, description:null };
     me.showForm = false;
     me.deleteButton = false;
    });
  }

}
