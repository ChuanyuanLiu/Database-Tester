// DOM objects that we will refer to frequently
const output_list = document.getElementById("output-list");

// create each element and render them
function render_output(string) {
   // crate a list element
   // save document id to the list
   let li = document.createElement("li");
   // display the data
   li.textContent = string;
   // save the list element to a list we selected
   output_list.appendChild(li);
}

///////////////// Tools /////////////////////
// Parse test data to the appropriate data format
function empty(thing) {
   if (thing === null) {
      return true;
   }
   if (thing === undefined) {
      return true;
   }
   return false;
}

// convert date from string to firebase object
function convert_date(text) {
   if (empty(text)) return null;
   return new firebase.firestore.Timestamp.fromDate(new Date(text));
}

// convert datecreated to server time stamp
function server_time_stamp() {
   return new firebase.firestore.FieldValue.serverTimestamp();
}

// convert string path to firebase document reference
function convert_reference(text) {
   if (empty(text)) return null;
   return db.doc(text);
}

// parse a javascript_object to get the correct firebase object
// return a new object
function parse_object(javascript_object) {
   // deep copy
   object = Object.assign(javascript_object);

   // must have items change time
   object.date_created = server_time_stamp();

   if (object.date) {
      object.date = convert_date(object.date);
   }

   if (object.dob) {
      object.dob = convert_date(object.dob);
   }
   // change reference
   if (object.reference) {
      object.reference = convert_reference(object.reference);
   }
   if (object.people_links) {
      for (link of object.people_links) {
         link.reference = convert_reference(link.reference);
      }
   }
   if (object.events_links) {
      for (link of object.events_links) {
         link.reference = convert_reference(link.reference);
      }
   }
   if (object.artefacts_links) {
      for (link of object.artefacts_links) {
         link.reference = convert_reference(link.reference);
      }
   }
   return object;
}

///////////////// Logic /////////////////////

// buttons
const delete_button = document.querySelector("#delete");
const upload_button = document.querySelector("#upload");
const delete_test_button = document.querySelector("#delete-test");

// trigger
delete_test_button.addEventListener("click", e => {
   e.stopPropagation();

   delete_collection("Tests");
});

delete_button.addEventListener("click", e => {
   e.stopPropagation();

   delete_collection("Artefacts");
   delete_collection("Addendums");
   delete_collection("People");
   delete_collection("Users");
   delete_collection("Events");
});
upload_button.addEventListener("click", e => {
   e.stopPropagation();

   upload_collection("Artefacts", Artefacts);
   upload_collection("Addendums", Addendums);
   upload_collection("People", People);
   upload_collection("Users", Users);
   upload_collection("Events", Events);
});

// delete everything
async function delete_collection(path) {
   console.log("Deleting ......");
   try {
      snapshot = await db.collection(path).get();
      for (doc of snapshot.docs) {
         console.log(">>>> Deleting");
         console.log(doc.id);
         db.collection(path)
            .doc(doc.id)
            .delete();
      }
   } catch (error) {
      console.error("Error deleteing document: ", error);
   }
}

// upload test data
function upload_collection(path, javascript_object) {
   // convert the javascript object into a list of list
   // each list is a [document id, document data] pair
   var document = Object.entries(javascript_object);

   // go through each document
   document.forEach(document => {
      let docId = document[0];
      let value = parse_object(document[1]);
      // add to database
      db.doc(path + "/" + docId)
         .set(value)
         .then(function() {
            render_output("Success:" + docId);
            console.log(">>>> Uploading");
            console.log(docId);
            console.log("Document successfully written!");
         })
         .catch(function(error) {
            render_output("Error:" + docId);
            console.log(docId);
            console.log(value);
            console.error("Error writing document: ", error);
         });
   });
}
