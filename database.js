/**
 * An independent fireabase database component
 */

/******************* Document Class ************************/
/**
 * A class that makes it easier to access information
 * - id
 *      the document id
 * - data
 *      the data we are intested in
 * - raw
 *      the document reference
 */
export class Document {
   constructor(ref) {
      this.id = ref.id;
      this.data = ref.data();
      this.ref = ref;
   }
}

/******************* Generic Class ************************/
/**
 * 1. get all the data
 *      returns: an objects [Document, .... ]
 * 2. get a single data
 *      returns: an object Document
 */
export class Collection {
   constructor(firestore, name) {
      this.db = firestore;
      this.name = name;
   }

   async get_all_document() {
      console.log("get_all_documents from " + this.name);
      try {
         var snapshot = await this.db.collection(this.name).get();
         var documents = snapshot.docs;
         var data = this.grab_data(documents);
         return data;
      } catch (error) {
         console.error("ERROR");
         return error;
      }
   }

   async get_document_by_id(document_id) {
      console.log(
         "get_document_by_id from " + this.name + " using " + document_id
      );
      try {
         var doc = await this.db
            .collection(this.name)
            .doc(document_id)
            .get();
         var data = new Document(doc);
         return data;
      } catch (error) {
         console.error("ERROR");
         return error;
      }
   }

   async upload_document() {}
   async upload_document_by_id(document_id) {}

   grab_data(documents) {
      var data = [];
      for (const doc of documents) {
         data.push(new Document(doc));
      }
      return data;
   }
}

/******************* Individual Collections ************************/
export class Artifacts_collection extends Collection {
   constructor(firestore) {
      super(firestore, "Artifacts");
   }
}
export class Appendums_collection extends Collection {
   constructor(firestore) {
      super(firestore, "Addendums");
   }
}
export class Users_collection extends Collection {
   constructor(firestore) {
      super(firestore, "Users");
   }
}
export class People_collection extends Collection {
   constructor(firestore) {
      super(firestore, "People");
   }
}
export class Events_collection extends Collection {
   constructor(firestore) {
      super(firestore, "Events");
   }
}

/******************* Convert data ************************/
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
export function convert_date(text) {
   if (empty(text)) return null;
   return new firebase.firestore.Timestamp.fromDate(new Date(text));
}

// convert datecreated to server time stamp
export function server_time_stamp() {
   return new firebase.firestore.FieldValue.serverTimestamp();
}

// convert string path to firebase document reference
export function convert_reference(text, firestore) {
   if (empty(text)) return null;
   return firestore.doc(text);
}
