let notes = []
let trash = []
let archive = []
let input = document.getElementById('NewNote');
let inputt = document.getElementById('editNote');

function renderNotes() {
    getNotesFromLocalStorage();
   let renderNotesRef = document.getElementById('content')
       renderNotesRef.innerHTML = "";
   for (let indexNotes = 0; indexNotes < notes.length; indexNotes++) {
        renderNotesRef.innerHTML += getNoteTemplate(indexNotes)   
       }
       saveNotesToLocalStorage()
}

function renderTrash() {
    let display = document.getElementById("trash");
    getTrashFromLocalStorage();
    if (trash.length == 0) {
        let display = document.getElementById("trash");
        display.classList.add('d_none')}
        else   {display.classList.remove('d_none')};
     let renderTrashNotesRef = document.getElementById('trash-content')
        renderTrashNotesRef.innerHTML = "";
    for (let indexTrashNotes = 0; indexTrashNotes < trash.length; indexTrashNotes++) {
        renderTrashNotesRef.innerHTML += getTrashNoteTemplate(indexTrashNotes)  
    }
    saveTrashToLocalStorage();
}

 function renderArchive() {
    let display = document.getElementById("archive");
    getArchiveFromLocalStorage()
    if (archive.length == 0) {
        let display = document.getElementById("archive");
        display.classList.add('d_none')}
        else   {display.classList.remove('d_none')};
    let renderArchiveNotesRef = document.getElementById('archive-content')
    renderArchiveNotesRef.innerHTML = "";
    for (let indexArchiveNotes = 0; indexArchiveNotes < archive.length; indexArchiveNotes++) {
        renderArchiveNotesRef.innerHTML += getArchiveNoteTemplate(indexArchiveNotes)  
    }
    saveArchiveToLocalStorage()
}

function getNoteTemplate(indexNotes) {
    return `<div class="note" id="notes"> <button id="deleteButton" onclick="toTrash(${indexNotes})" >X</button> <p ${indexNotes} ondblclick="editNote(${indexNotes})"> ${notes[indexNotes]} </p> </div>`;
}

function getTrashNoteTemplate(indexTrashNotes) {
    return `<div class="note"> 
            <button id="deleteButton" onclick="toArchive(${indexTrashNotes})">X</button>
            <button id="rewindTrashButton" onclick ="backToNotes(${indexTrashNotes})"><</button><p> ${trash[indexTrashNotes]} </p> 
            </div>`;
    
        
}

function getArchiveNoteTemplate(indexArchiveNotes) {
    return `<div class="note">
            <button id="deleteButton" onclick="deleteArchive(${indexArchiveNotes})">X</button>
            <button id="rewindArchiveButton" onclick ="backToTrash(${indexArchiveNotes})">V</button> <p> ${archive[indexArchiveNotes]} </p>
            </div>`;
}


function addNewNote() {
    let newNoteRef = document.getElementById('NewNote');
    let newNote = newNoteRef.value; 
   if (newNote != "") {
        notes.push(newNote);} 
    saveNotesToLocalStorage()
    renderNotes(); 
    newNoteRef.value = "";
}

function saveNotesToLocalStorage(){
    localStorage.setItem("notes",JSON.stringify(notes))
}

function saveTrashToLocalStorage() {
    localStorage.setItem("trash",JSON.stringify(trash))

}

function saveArchiveToLocalStorage() {
    localStorage.setItem("archive",JSON.stringify(archive))
 //   localStorage.removeItem("trash",JSON.stringify(trash))
}

function getNotesFromLocalStorage() {
    let noteObj = JSON.parse(localStorage.getItem("notes"))
    if (noteObj != null ) {
        notes = noteObj}
}

function getTrashFromLocalStorage() {
    let trashObj = JSON.parse(localStorage.getItem("trash"))
        if (trashObj != null ) {
       trash = trashObj};
}

function getArchiveFromLocalStorage() {
    let archiveObj = JSON.parse(localStorage.getItem("archive"))
        if (archiveObj != null ) {
       archive = archiveObj};
}

function toTrash(indexNotes) {
    trash.push(notes[indexNotes])
    notes.splice(indexNotes,1)
    localStorage.removeItem("notes",JSON.stringify(notes))
    saveTrashToLocalStorage();
    renderNotes();
    renderTrash();
}


function backToNotes(indexTrashNotes){
    notes.push(trash[indexTrashNotes])
    trash.splice(indexTrashNotes,1)
    localStorage.removeItem("trash",JSON.stringify(trash))
    saveNotesToLocalStorage();
    renderNotes();
    renderTrash();
}

function backToTrash(indexArchiveNotes){
    trash.push(archive[indexArchiveNotes])
    archive.splice(indexArchiveNotes,1)
    localStorage.removeItem("archive",JSON.stringify(archive))
    saveTrashToLocalStorage();
    renderTrash();
    renderArchive();
}

function toArchive(indexTrashNotes) {
    archive.push(trash[indexTrashNotes])
    trash.splice(indexTrashNotes,1)
    localStorage.removeItem("trash",JSON.stringify(trash))
    saveArchiveToLocalStorage();
    renderTrash();
    renderArchive();
}


function removeNotesFromLocalStorage() {
    localStorage.removeItem("notes",JSON.stringify(notes))
    saveNotesToLocalStorage();
    renderNotes();
}

function removeTrashFromLocalStorage() {
    localStorage.removeItem("trash",JSON.stringify(trash))
    saveTrashToLocalStorage();
    renderNotes();
    renderTrash();
}
 
 
 function removeArchiveFromLocalStorage() {
     localStorage.removeItem("archive",JSON.stringify(archive))
     saveArchiveToLocalStorage();
     renderNotes();
     renderTrash();
     renderArchive()
}

function deleteNotes(indexNotes) {
    notes.splice(indexNotes,1)
    removeNotesFromLocalStorage(indexNotes)
}


function deleteTrash(indexTrashNotes) {
    trash.splice(indexTrashNotes,1)
    removeTrashFromLocalStorage(indexTrashNotes)
    renderTrash();
}

function deleteArchive(indexArchiveNotes) {
    archive.splice(indexArchiveNotes,1)
    removeArchiveFromLocalStorage(indexArchiveNotes)
    renderArchive();
}


//function deleteWholeTrash(indexTrashNotes){
//    for (let trashIndex = 0; trashIndex < trash.length; trashIndex++) {
//        archive.push(trash[indexTrashNotes])
//        trash.splice(indexTrashNotes)
//        removeTrashFromLocalStorage(indexTrashNotes)
//        saveArchiveToLocalStorage();
//        renderTrash();
//        renderArchive();
//    }
//}
//
function deleteWholeTrash(){
    console.log(trash);
    for (let index = 0; index < trash.length; index++) {
        let element = trash[index];

        archive.push(element);
        trash.splice(element);
    //   removeTrashFromLocalStorage();
    //    saveArchiveToLocalStorage();
    renderTrash();
    renderArchive();
    }    

}

function deleteWholeArchive(indexArchiveNotes){
    archive.splice(indexArchiveNotes)
    removeArchiveFromLocalStorage(indexArchiveNotes)
    renderTrash();
    renderArchive();
}



function editNote(indexNotes) {
       let renderEditNotesRef = document.getElementsByClassName('note')
    for (let index = 0; index < renderEditNotesRef.length; index++) {
        const element = renderEditNotesRef[index];
        if (index == indexNotes) {
            element.innerHTML = getEditNoteTemplate(indexNotes)  
            break;            
        } 
    }
console.log(getElementById("editedSubmit"));

}


function getEditNoteTemplate(indexNotes) {
    return `<div class="note" id="notes"><input id="editNote" value="${notes[indexNotes]}"> <button id="editedSubmit" class="btnIcon" onclick="saveEditNote(${indexNotes})"><img src="assets/check_icon.png" alt="check_icon"></button></div>`;
}

function saveEditNote(indexNotes) {
    let editedNoteRef = document.getElementById('editNote');
    let editedNote = editedNoteRef.value; 
    const findIndexNote = notes.indexOf(notes[indexNotes])
    const findEditedNoteValue = editedNoteRef.value

    if (editedNote != "") {
    editedNote = notes.with(findIndexNote,editedNote)
    notes.splice(findIndexNote,1,findEditedNoteValue)
    saveNotesToLocalStorage()
    renderNotes()
    }
}





    input.addEventListener("keypress", function(event){
        if (event.key === "Enter"){
            event.preventDefault();
            document.getElementById("submit").click()
        }
    })
    
    document.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            let editNoteRef = document.getElementById("editNote");
            if (document.activeElement === editNoteRef) { 
                event.preventDefault();
                document.getElementById("editedSubmit").click();
            }
        }
    });
    
    