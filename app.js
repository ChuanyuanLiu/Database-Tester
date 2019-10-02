// DOM objects that we will refer to frequently
const showList = document.getElementById("artifacts-list");
const createForm = document.getElementById("add-artifacts-form");

// The name of the collection we will be accessing
const collection_name = "Tests";
const field_of_interst = "age";

// create artifacts form

// create each element and render them
function renderArtifacts(doc) {
   // crate a list element
   // save document id to the list
   // we need data id for deleting things
   let li = document.createElement("li");
   li.setAttribute("data-id", doc.id);
   // display the data
   let name = document.createElement("span");
   let age = document.createElement("span");
   // display a cross button to delete data
   let cross = document.createElement("div");

   cross.textContent = "x";
   name.textContent = doc.data().name;
   age.textContent = doc.data().age;
   li.appendChild(name);
   li.appendChild(age);
   li.appendChild(cross);

   // save the list element to a list we selected
   showList.appendChild(li);

   // when the cross is clicked
   // delete data function associated to each list item
   cross.addEventListener("click", e => {
      e.stopPropagation();
      // get the id of the parent which is the list element
      // let id = e.target.parentElement.getAttribute('data-id');
      // query the database to delete it
      db.collection(collection_name)
         .doc(doc.id)
         .delete();
   });
}

// saving data
// Link to the createForm on HTML
// Listen to the submission button press
createForm.addEventListener("submit", e => {
   // link to the createForm

   // prevent reloading which stops program from executing
   e.preventDefault();
   id = createForm.name.value;

   // upload the document
   db.collection(collection_name).add({
      // create a json object
      name: createForm.name.value,
      age: Number(createForm.age.value)
   });

   // // reset the values of the createForm
   createForm.name.value = "";
   createForm.age.value = "";
});

function reload(snapshot) {
   // delete existing data
   showList.innerHTML = "";
   // reload
   snapshot.docs.forEach(doc => renderArtifacts(doc));
}
// reload upon update
db.collection(collection_name)
   .orderBy(field_of_interst)
   .onSnapshot(reload);
