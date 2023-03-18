// capturamos los elementos del formulario

const form = document.querySelector('#noteForm')
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const modal = document.querySelector('#modal')
const titleModal = document.querySelector('#modal-title')
const descriptionModal= document.querySelector('#modal-description')
const modalUpdate = document.querySelector('#modal-btn')




form.addEventListener('submit', e =>{
   
    e.preventDefault()


saveNotes(title.value, description.value)

title.value = '';
description.value = '';
    
title.focus()
  
})  


modalUpdate.addEventListener('click', e =>{
    e.preventDefault()
    
    if(saveId){
     updateNote(saveId, titleModal.value, descriptionModal.value)
     $('#modal').modal('toggle')
    }   else{
     saveNotes(title.value, description.value)
    } 
    
    
})

 