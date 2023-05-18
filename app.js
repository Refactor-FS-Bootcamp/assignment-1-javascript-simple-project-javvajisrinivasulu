if('Notes' in localStorage){
    // console.log("Key :'Notes' is Present")
 }else{
     localStorage.setItem('Notes','')
 }
const title=document.querySelector('.title')
const desc=document.querySelector('.user-note')
const addNoteButton=document.querySelector('#creatnote')
const date=new Date();
const current_date=date.getDate()+"-"+(date.toLocaleString('default', { month: 'short' }))+"-"+ date.getFullYear() ;

displayData()
addNoteButton.addEventListener('click',function(){
    if(title.value==='' || desc.value==''){
        alert("Please Enter Title and Note");
    }
    else{
        addnotes()
        displayData()
        title.value='';
        desc.value='';
        }    
})

function addnotes(){
    const titleVal=title.value;
    const descVal=desc.value;
    const Notes=localStorage.getItem('Notes')
    if (Notes===''){
        noteDataArray=[]
    }else{
        noteDataArray=JSON.parse(Notes)

    }
    const notes={
        title:titleVal,
        desc:descVal,
        date:current_date,
    }
    noteDataArray.push(notes)
    localStorage.setItem('Notes',JSON.stringify(noteDataArray))   
}

function displayData(){
    let notesInfo=localStorage.getItem('Notes')
    const disp=document.querySelector('.display')
    let DataUi = ' '
    if(notesInfo===''){
        notesInfoArr=[]
    }else{
        notesInfoArr=JSON.parse(notesInfo)
    }
    notesInfoArr.forEach(function(value){
        DataUi+=`<div class="box">
        <div class="content"
        <h2><b><big>${value.title}</big></b></h2>
        <p>${value.desc}</p>
        </div>
        <div class="buttons">
            <button class="Delete-btn">Delete Note</button>
            <button class="Edit-btn">Edit Note</button>
        </div>
        <p id="date">${value.date}</p>
        </div>`
        })
    if(notesInfoArr.length !=0){
        disp.innerHTML =DataUi
       }
       deletenote()
       editNote()
}
function deletenote(){
    const deleteBtn=document.querySelectorAll('.Delete-btn')
    deleteBtn.forEach(function(dBtn,index){
    dBtn.addEventListener('click',function(){
        notesInfoArr.splice(index,1);
        localStorage.setItem('Notes',JSON.stringify(notesInfoArr))//updating local storage data with new updated array
        displayData()
        if (notesInfoArr.length==0){
            const disp=document.querySelector('.display')
            // let nothingToShow=document.querySelector('#nothingToShow') --the value becomes NULL
            disp.innerHTML =`<p id="nothingToShow">Nothing to Show! Use "Add Note" for creating your note</p>`
            }
        })
    })
}
 function editNote(){
    const editBtn=document.querySelectorAll('.Edit-btn')
    editBtn.forEach(function(eBtn,index){
        eBtn.addEventListener('click',function(){
            if(title.value=='' || desc.value==''){
                alert("To Update the Note Enter Title and Note In the Input Fileds and Then Click Edit button")
            }
            eBtn.addEventListener('click',function(){
            const updatedNotes={
                title:title.value,
                desc:desc.value,
                date:current_date,
            }
            notesInfoArr[index]=updatedNotes
            localStorage.setItem('Notes',JSON.stringify(notesInfoArr))
            displayData()
            title.value='';
            desc.value='';
            })
        })
    })
}