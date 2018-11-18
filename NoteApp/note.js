const fs    = require('fs');

var fethNotes = ()=>{
  try{
    var noteString = fs.readFileSync('notes-data.json');
    notes = JSON.parse(noteString);
    return notes;
  }catch(e){
    return [];
  }
}
var saveNotes = (notes)=>{
   fs.writeFileSync('notes-data.json' , JSON.stringify(notes));
}

var addNote = (title,body)=>{

  var notes = fethNotes();
  var note = {
    title,
    body
  }

  var duplicateNote = notes.filter((note)=> note.title === title);

  if(duplicateNote.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
}

var getAll = ()=>{
  return fethNotes();
}

var getNote = (title)=>{
  var notes = fethNotes();
  var filteredNotes = notes.filter((note)=> note.title === title);
  return filteredNotes[0];
}

var removeNote = (title)=>{
  var notes = fethNotes();
  var filteredNotes = notes.filter((note)=> note.title !== title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
}

var noteLog = (note)=>{
  console.log("\n------------\n");
  console.log(`Title : ${note.title}\n`);
  console.log(`Body : ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  noteLog
}

// module.exports.age = 25;
// console.log(module);
// module.exports.addNote = ()=>{
//   console.log('Add Note');
//   return 'New Note';
// }
//
// module.exports.add = (a,b)=>{
//   return a + b;
// }
