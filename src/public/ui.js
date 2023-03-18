    
    
    const notesList = document.querySelector('#notes')
    let saveId = '' 


    const btnClose = document.querySelector('.close')
    const btnModalUpdate = document.querySelector('.update')
            
    const noteUI = note =>{
        const div = document.createElement('div')
        console.log(note)
        div.innerHTML = `
        <div class="card card-body rounded-0 mb-2 mt-2 animate__animated animate__fadeInLeftBig">
        <div class="d-flex justify-content-between">
            <h1 class="h3 card-title">Title: ${note.title}</h1>
            <div>
            <button class="btn btn-danger delete" data-id="${note.id}">Delete</button>
            <button class="btn btn-outline-success update" data-id="${note.id}">Update</button>

            </div>
        </div>
            <p class="card-description">Description: ${note.description}</p>
        </div>
    
        
        `

    
        const btnDelete =  div.querySelector('.delete')
        const btnUpdate = div.querySelector('.update')


        btnDelete.addEventListener('click', ()=>{
            deleteNote(btnDelete.dataset.id)
        });

        
        btnUpdate.addEventListener('click', ()=>{
            getNote(btnUpdate.dataset.id)
            $('#modal').modal('toggle')

        })

        btnClose.addEventListener('click', ()=>{
            $('#modal').modal('toggle')
        })


    
        return div
    }

    const renderNotes = (notes) =>{
        notesList.innerHTML = "";
        notes.forEach((note)=>{
            notesList.append(noteUI(note))
        });
    }

    const appendNotes = note =>{
        notesList.append(noteUI(note))
    }


