# Overview

## Database design

-  [Database design (Lucid chart)](https://www.lucidchart.com/invitations/accept/5273bef4-c7d5-441d-9155-24498632c760)
-  [Firestore console](https://console.firebase.google.com/u/0/project/heirloom22-2b4a8/database/firestore/)

## Schema

### Terminology

-  UID
   -  User Identity
   -  From Firebase Authentiation module
   -  Unique for every user
-  map
   -  What firestore call an a javascript object

### Addendums

![](./Images/addendums.png)

| Field name   | Type      | Description                                     | Constraint                                                                   | Example                              |
| ------------ | --------- | ----------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------ |
| created_by   | string    | UID                                             | Required and valid                                                           | AiKUMgHhMohdDyC9zHJfkMNH3u72         |
| date_created | timestamp | the time created at the server side             | Required and should be generated using `server_time_stamp()` helper function | 19 September 2019 at 11:58:41 UTC+10 |
| name         | string    | the title                                       | Required                                                                     | I borke the vase                     |
| details      | string    | additional information                          |                                                                              | I am sorry                           |
| reference    | reference | refer to the artifact that the comment is about | Required                                                                     | /Artifacts/vase_id                   |

### Artifacts

-  Update 29/09/2019
   -  `details` became `description`

![image-20190919211819821](./Images/artifacts.png)

All media links would be in this form

![image-20190926124632103](./Images/media_links.png)

| Field name                | Type      | Description                                     | Constraint                                                                                    | Example                                                                                                               |
| ------------------------- | --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| created_by                | string    | UID                                             | Required and valid                                                                            | AiKUMgHhMohdDyC9zHJfkMNH3u72                                                                                          |
| date_created              | timestamp | the time created at the server side             | Required and should be generated using `server_time_stamp()` helper function                  | 19 September 2019 at 11:58:41 UTC+10                                                                                  |
| name                      | string    | the title                                       | Required                                                                                      | family crest drawing                                                                                                  |
| date                      | timestamp | the time the artifact was created               | Optional                                                                                      | 10 August 1972 at 00:00:00 UTC                                                                                        |
| description               | string    | additional information                          | Optional                                                                                      | a very old drawing of family crest by grandpa                                                                         |
| events_links              | array     | refer to the artifact that the comment is about | Required                                                                                      | /Artifacts/vase_id                                                                                                    |
| events_links[i]           | map       | an object that contains the following 3 fields  | If you link an event then you must have `events_links[i].name` and `events_link[i].reference` | {<br />name: "Making the family crest"<br />reference: /Events/making_crest_id<br />relation: "created during"<br />} |
| events_links[i].name      | string    | name of the event                               | Required if linked to an event                                                                | Making the famly crest                                                                                                |
| events_links[i].reference | reference | reference to the event document                 | Required if linked to an event                                                                | /Events/making_crest_id                                                                                               |
| events_links[i].relation  | string    | a description of what the relation is           | Optional                                                                                      | created during                                                                                                        |
| people_links              | array     | refer to the artifact that the comment is about | Required                                                                                      | {<br />name: "John Gilbertt"<br />reference: /People/john_gilbert_id<br />relation: "made by"<br />}                  |
| people_links[i].name      | string    | name of the person                              | Required if linked to a person                                                                | John Gilbert                                                                                                          |
| people_links[i].reference | reference | reference to the people document                | Required if linked to a person                                                                | /People/john_gilbert_id                                                                                               |
| people_links[i].relation  | string    | a description of what the relation is           | Optional                                                                                      | made by                                                                                                               |

### Events

![image-20190919213514361](./Images/events.png)

### People

![image-20190919215401022](./Images/people.png)

### Users

![image-20190919213414621](./Images/users.png)

## Helper functions

```javascript
// convert date from string to firebase object
function convert_date(text) {
   if (empty(text)) return null;
   return new firebase.firestore.Timestamp.fromDate(new Date(text));
}

// generate server time stamp
function server_time_stamp() {
   return new firebase.firestore.FieldValue.serverTimestamp();
}

// convert firebase document path to firebase document reference
// example
// input: /Artifacts/vase_id
// output: {...} a firestore object
function convert_reference(text) {
   if (empty(text)) return null;
   return db.doc(text);
}
```

## Firebase API

Currently using Heirloom22
project-id: heirloom22-2b4a8

```javascript
var firebaseConfig = {
   apiKey: "AIzaSyC1HQX45nzJr6SDRMsPkA_zAgAYM9iGjTg",
   authDomain: "heirloom22-2b4a8.firebaseapp.com",
   databaseURL: "https://heirloom22-2b4a8.firebaseio.com",
   projectId: "heirloom22-2b4a8",
   storageBucket: "heirloom22-2b4a8.appspot.com",
   messagingSenderId: "323147351760",
   appId: "1:323147351760:web:bf785136b38cb3a4d380d5"
};
```

## Reset or Upload test data to firebase

1. Open index.html in browser
2. Delete the database (optional)
3. Upload the database (will overwrite exisiting data)

![screen shot](./Images/upload_sample_data.png)

## Test data

-  Test data is stored as javascript objects
-  path to test data `./TestData/data.js`

## Data types

-  string
-  number
-  boolean
-  map (javascript obejct)
-  array
-  null
-  timestamp
-  geopoint
-  reference

## Sprint 2 clarification (Database)

Deadline

-  Week 8

Aim

1. Store all required information
2. Support all required queries
3. Model data to support desired relations
4. Interactive query testing web page

Not supporting

1. No Multimedia
   -  Will be done in the next sprint
2. Can't determine which documents user can access
   -  Oliver is responsible for user access and authentication.
3. Geospatial data
   -  Currently there isn't a UI solution for input or output geospatial data

## Database conventions

Document ID

-  Also known as file name
-  Lowercase
-  Syntax `<descriptive_name>_id`
-  Where `<descriptive_name>` is manually selected by me to make it easy to debug
-  User generated data will have autogenerated id like 42OqXx2K1bX7V4CfHkGt

Fields

-  Lowercase
-  Words separated by underscore like `artifacts_link`

Database and subcollections

-  Also known as a folder
-  Capitalize
-  Plurals
-  List of collections
   -  `Artifacts`
   -  `People`
   -  `Addendums`
   -  `Events`
   -  `Users`

Important fields

-  All documents except `User_authentication_files` must have
   -  `date_created` : the date and time the document was created
   -  `created_by` : the name user who created the data

## Week 6-7 plan

1. Create sample data and automate upload (For resetting)
2. Get a list of necessary queries from requirements
   1. Create queries
3. Interactive webpage to display queries

# Firebase Overview

by Chuanyuan Liu

![image-20190908232504728](./Images/firestore.png)

## List of requirements

-  Users can create and store new artifacts in the database, adding relevant information, such
   as a textual story behind the artefact and a photo of it.
-  Users can add “addendums” to artifacts for the purpose of adding to its story as time goes
   by.
-  The application will allow users to browse the artifacts in the database, and learn more
   about individual artifacts they are interested in.
-  All data are editable (Except security related)
-  Minimal data constraints
-  Fuzzy text search everything

## Initalization

### Load firebase library

```html
<!-- Load the main app (Mandatory) -->
<script src="https://www.gstatic.com/firebasejs/6.5.0/firebase-app.js"></script>
<!-- Load the firestore library only -->
<script src="https://www.gstatic.com/firebasejs/6.5.0/firebase-firestore.js"></script>
```

### Link to firebase

```javascript
// Your web app's Firebase configuration
var firebaseConfig = {
   apiKey: "AIzaSyC1HQX45nzJr6SDRMsPkA_zAgAYM9iGjTg",
   authDomain: "heirloom22-2b4a8.firebaseapp.com",
   databaseURL: "https://heirloom22-2b4a8.firebaseio.com",
   projectId: "heirloom22-2b4a8",
   storageBucket: "heirloom22-2b4a8.appspot.com",
   messagingSenderId: "323147351760",
   appId: "1:323147351760:web:bf785136b38cb3a4d380d5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
```

### Link to firestore

```javascript
const db = firebase.firestore();
```

## Overview on important objects

### Document reference format

-  `[DATABASE_ID]/[DOCUMENT_ID]`

### Document Reference object

-  https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference

-  Document reference is only areference to a **document** or a collection of **documents**
   -  It would also be a reference to the documents that resulted from a complex query
-  obtain using
   -  `db.doc("collection/document")`
   -  `db.collection("collection")`

| method                                     | explaination                                                              |
| ------------------------------------------ | ------------------------------------------------------------------------- |
| `docRef.onSnapshot().then((doc) => {...})` | A listener that fires when the data changes<br />Returns a promise        |
| `docRef.get().then((doc) => {...})`        | Get the document refered by the document reference<br />Returns a promise |

### Document Snapshot (Aka doc)

-  https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot.html

| attribute/method    | explaination                                       |
| ------------------- | -------------------------------------------------- |
| doc                 | the whole document                                 |
| doc.id              | document id                                        |
| doc.data()          | document data                                      |
| doc.exists          | true or false                                      |
| doc.get(field_name) | access the field name of an object like a property |
| doc.ref             | Firebase reference to the object                   |

## Create / Update

-  https://firebase.google.com/docs/firestore/manage-data/add-data

### Create collections

-  Cloud Firestore creates collections and documents if the collection of the document file is not found

### Create new document without documentID

-  Firebase will generate a unique ID for each document if ID was not supplied

```javascript
db.collection("users")
   .add({
      first: "Ada",
      last: "Lovelace",
      born: 1815
   })
   .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
   })
   .catch(function(error) {
      console.error("Error adding document: ", error);
   });
```

### Create or overwrite document with documentID

-  Create if document does not exists

```javascript
const docRef = db.doc("collection/document_id");
docRef.set({ field: "new value" });
```

### Update data or Add field using merge

```javascript
const docRef = db.doc("collection/document_id");
docRef.set({ new_field: "new value" }, { merge: true });
```

### Update existing field

-  Access nested objects using "dot notation"
-  Access elements in an array using

```javascript
// inital
doc = {
  field: "old value",
  parent {
 		child1: "old value",
  	child2: "old value"
}}

// method
const docRef = db.doc("collection/document_id")
docRef.update(
  {field: "new value",
   parent.child2 : 'new value'} // <--- here we access a property of the object
)

// result
doc = {
  field: "new value",
  parent {
 		child1: "old value", // <--- notice that child1 was not overwritten
  	child2: "new value"
}}
```

## Read

-  https://firebase.google.com/docs/firestore/query-data/get-data

### Read all the documents in a collection

```javascript
db.collection("Artifacts").get()
.then(function (querySnapshot) {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    }
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
```

### Read a document by its ID

```javascript
var snapshot = await this.db.collection(this.name).doc(document_id);
```

```javascript
db.doc("Artifacts/random_photos_id").get()
.then( function(doc)
  ...
)
```

### Real-time update

-  Let query be any query

```javascript
query().onSnapshot(
  function (doc) {
 		...
})
```

## Delete

-  https://firebase.google.com/docs/firestore/manage-data/delete-data
-  Delete a document does not delete its subcollection
   -  `collection/doc/subcollection/subdoc`
   -  Delete doc at `collection/doc`
   -  Subcollection at `collection/doc/subcollection` still exits

### Delete a document

`db.doc(path).delete()`

### Delete all documents

-  Iterate over all documents in a collection and delete them one by one

```javascript
// delete everything
function delete_collection(path) {
    console.log("Deleting ......")
    try {
        documents = await db.collection(path).get()
        for (doc of documents) {
            console.log(">>>> Deleting")
            console.log(doc.id)
            db.collection(path).doc(doc.id).delete()
        }
    } catch (error) {
        console.error("Error deleteing document: ", error);
    }
};
```

## Query

-  https://firebase.google.com/docs/firestore/query-data/order-limit-data
-  let `ref` be `db.collection('Tests')`

### Ordering

-  Ascending
   -  `ref.orderby(high_priority).orderBy(low_pripority)`
-  Descending
   -  `ref.order(by: same_priority, "desc")`

### Limit

-  `ref.order(by: field_name).limit(3)`

### Filter

-  `ref.where(field, ">", 10)`
-  `ref.where(field, isEqualTo: "value")`

## Data types

-  https://firebase.google.com/docs/firestore/manage-data/data-types

```javascript
// convert date from string to firebase object
// text in the format of day/month/year
function convert_date(text) {
   if (empty(text)) return null;
   return new firebase.firestore.Timestamp.fromDate(new Date(text));
}

// server timestamp
function server_time_stamp() {
   return new firebase.firestore.FieldValue.serverTimestamp();
}

// convert string path to firebase document reference
// text is in the format of [collection]/[document]
function convert_reference(text) {
   if (empty(text)) return null;
   return db.doc(text);
}
```

## Data validation

-  For query, you can't access data because it is too computationally expensive

![image](./Images/request.png)

### request.auth object

| method/field | description         |
| ------------ | ------------------- |
| auth.uid     | the uid of the user |
|              |                     |
|              |                     |

### request.data object

| method/field    | description                  |
| --------------- | ---------------------------- |
| data.field_name | access the value of the data |
| data.size()     | length of the string         |
|                 |                              |

### resource object

-  Resource refers to the data in database. (Unlike request.resource)

| method/field  | description                  |
| ------------- | ---------------------------- |
| resource.data | access the value of the data |
| data.size()   | length of the string         |
|               |                              |

### Path matching

-  Always in the format
   -  `databases/{database}/documents/{document}`
-  Single document wild card
   -  `{wildcard}`
-  Multi doucment wild card
   -  `{wildcard=**}`
   -  Very bad because it matches evreything and removes all rules

![path](./Images/path.png)

### Validation

-  Check type
   -  `data.field_name` + `is` + `number`
   -  number
   -  string
-  Comparsion
   -  `>=`
   -  `<=`
-  Check if data is within a validate set
   -  `in [values, ...]`

*  Data validation front end using class
   -  https://medium.com/capital-one-tech/nosql-database-doesnt-mean-no-schema-a824d591034e
   -  https://stackoverflow.com/questions/41454050/firebase-database-schema

Backend

-  Introduction video
   -  https://www.youtube.com/watch?v=eW5MdE3ZcAw&t=776s
-  Security rules
   -  https://firebase.google.com/docs/rules/rules-language#firestore
   -  https://firebase.google.com/docs/firestore/security/get-started

## Tutorials

-  [Firebase Firestore Tutorial (The best one)](https://www.youtube.com/playlist?list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB)
-  [Firebase for SQL developer (Youtube Playlist) (Official)](https://www.youtube.com/playlist?list=PLl-K7zZEsYLlP-k-RKFa7RyNPa9_wCH2s)
-  [Get to know cloud firebase (Youtube Playlist) (Official)](https://www.youtube.com/playlist?list=PLl-K7zZEsYLluG5MCVEzXAQ7ACZBCuZgZ)

## Firebase

-  [Firebase overview (with lovely images!)](https://firebase.google.com)
-  [Firebase cloud storage (with Video!)](https://firebase.google.com/docs/storage/web/start)

## Firestore

-  [Firestore vs realtime store (a nice comparison table)](https://firebase.google.com/docs/firestore/rtdb-vs-firestore)
-  [Firestore transactions (with Video!)](https://firebase.google.com/docs/firestore/manage-data/transactions)
-  [Firestore sample queries](https://firebase.google.com/docs/firestore/query-data/queries)
-  [Firebase security (with Video!)](https://firebase.google.com/docs/firestore/query-data/queries)
-  [How Firestore works (with Video)](https://firebase.google.com/docs/firestore/data-model)

## Data modeling

-  [Many to many relations in Firebase (Medium)](https://medium.com/@alfianlosari/firebase-realtime-database-many-to-many-relationship-schema-4155d9647f0f)
-  [Firebase data modeling (Medium)](https://howtofirebase.com/firebase-data-modeling-939585ade7f4)
-  [Arrays are evil!](https://firebase.googleblog.com/2014/04/best-practices-arrays-in-firebase.html)

## Modeling data in Firebase

-  [Model Realtional Data in Firestore NoSQL (Youtube)](https://www.youtube.com/watch?v=jm66TSlVtcc)

## Sample project

-  [Friendly Eats Rating App](https://github.com/firebase/quickstart-js/tree/master/firestore)
