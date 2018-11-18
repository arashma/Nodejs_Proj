
// const fs   = require('fs');
// const os   = require('os');
var   _    = require('lodash');
var  yargs = require('yargs');

const notes = require('./note');

const titleOptions = {
  describ: 'Title of note',
  demand :  true,
  alias  :  't'
};
var argv = yargs
      .command('add' , "Add a new note",{
        title:titleOptions,
        body:{
          describ: 'Body of note',
          demand :  true,
          alias  :  'b'
        }
      })
      .command('list' , "List all notes")
      .command('read' , "Read a note",{
        title:titleOptions
      })
      .command('remove' , "Remove a note",{
          title:titleOptions
      })
      .help()
      .argv;
var command = argv._[0];

if(command == "list"){
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note)=> notes.noteLog(note));
}else if(command == "add"){
  var note = notes.addNote(argv.title,argv.body);
  if(note){
    console.log("Note created.");
    notes.noteLog(note);
  }else{
    console.log("Note title taken!!");
  }
}else if(command == "remove"){
  var noteRemoved = notes.removeNote(argv.title);
  var message     = noteRemoved ? "Note was removed" : "Note not found";
  console.log(message);
}else if(command == "read"){

  var noteRead   = notes.getNote(argv.title);
  if(noteRead){
     console.log("Note found");
     notes.noteLog(noteRead);
  }else{
     console.log("Note not found");
  }
}else {
  console.log('Command not recognized');
}
//console.log(_.isString("true"));

// console.log(note.add(9 , -2));

// var user = os.userInfo();
//
// fs.appendFile('greeting.txt' , `Hello ${user.username}! You are ${note.age}.`,(err) => {
//   if (err) throw err;
//   console.log('The "data to append" was appended to file!');
// });
