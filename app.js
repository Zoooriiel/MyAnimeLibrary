const addAnimeBtn = document.getElementById("addAnimeBtn");
const submitBtn = document.getElementById("submitBtn");
const deleteBtn = document.getElementById("deleteBtn");
const animeLibraryTable = document.getElementById("animeLibraryTable");
const tbody = document.querySelector("tbody");
const closeModalBtn = document.getElementById("closeModalBtn");
let editRowIndex = null;

const myAnimeLibrary = [];

// Anime constructor
class Anime{
    constructor(title, episodes, status, dateOfCompletion){
    this.title = title;
    this.episodes = episodes;
    this.status = status;
    this.dateOfCompletion = dateOfCompletion;
    }
}

// Add anime to library
function addAnimeToLibrary(){
    const title = document.getElementById("title").value;
    const episodes = document.getElementById("episodes").value;
    const status = document.getElementById("status").value;
    const dateOfCompletion = document.getElementById("dateOfCompletion").value;

    let newAnime = new Anime(title, episodes, status, dateOfCompletion);
    myAnimeLibrary.push(newAnime);
}

// Create Table Row
function createTableRow(anime, index){
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${anime.title}</td>
        <td>${anime.episodes}</td>
        <td>${anime.status}</td>
        <td>${anime.dateOfCompletion}</td>
        <td><span class="edit-link" data-index="${index}">Edit</span></td>
    `;

    tr.querySelector(".edit-link").addEventListener("click", () => {
        const modalText = document.getElementById("modal-text");
        modalText.textContent = "Edit Anime";

        openModalForEdit(index);
    })
    return tr;
}

// Open Modal for Edit
function openModalForEdit(index){
    const anime = myAnimeLibrary[index];

    document.getElementById("title").value = anime.title;
    document.getElementById("episodes").value = anime.episodes;
    document.getElementById("status").value = anime.status;
    document.getElementById("dateOfCompletion").value = anime.dateOfCompletion;

    document.getElementById("animeFormContainer").classList.toggle("hidden");
    deleteBtn.classList.remove("hidden");

    editRowIndex = index;
}

// Refresh table
function refreshTable(){
    tbody.innerHTML = "";
    myAnimeLibrary.forEach((anime, index) => {
        const tr = createTableRow(anime, index);
        tbody.appendChild(tr);
    });
}

// Toggle Modal
function toggleModal(){
    const animeFormContainer = document.getElementById("animeFormContainer");
    animeFormContainer.classList.toggle("hidden");
}


// Add anime Button
addAnimeBtn.addEventListener("click", () => {
    const modalText = document.getElementById("modal-text");
    modalText.textContent = "Add Anime";
    deleteBtn.classList.add("hidden");
    toggleModal();
})


// Modal Form Submit Button
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value; 
    const episodes = document.getElementById("episodes").value; 
    const status = document.getElementById("status").value; 
    const dateOfCompletion = document.getElementById("dateOfCompletion").value;

    if(editRowIndex !== null){

        myAnimeLibrary[editRowIndex].title = title;
        myAnimeLibrary[editRowIndex].episodes = episodes;
        myAnimeLibrary[editRowIndex].status = status;
        myAnimeLibrary[editRowIndex].dateOfCompletion = dateOfCompletion;

        const allRows = tbody.querySelectorAll("tr");
        const rowToUpdate = allRows[editRowIndex];
        const newRow = createTableRow(myAnimeLibrary[editRowIndex], editRowIndex);

        tbody.replaceChild(newRow, rowToUpdate);
    }
    else{
        addAnimeToLibrary()
        refreshTable();
    }

    toggleModal();

    document.getElementById("title").value = ""; 
    document.getElementById("episodes").value = ""; 
    document.getElementById("status").value = ""; 
    document.getElementById("dateOfCompletion").value = "";

})


// Modal Form Delete Button
deleteBtn.addEventListener("click", () => {
    
    if(editRowIndex !== null){
        myAnimeLibrary.splice(editRowIndex, 1);

        refreshTable();

        editRowIndex = null;
    }
    toggleModal();
})


// Close modal (x)
closeModalBtn.addEventListener("click", () => {
    toggleModal();
})

