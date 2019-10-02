/******************* Test Functions ************************/
import { firestore, storage } from "./pure_config.js";
import * as db from "./database.js";
import * as fs from "./storage.js";

async function get_all() {
   var collection;
   var result;
   collection = new db.Artifacts_collection(firestore);
   result = await collection.get_all_document();
   console.log(result);
   collection = new db.Appendums_collection(firestore);
   result = await collection.get_all_document();
   console.log(result);
   collection = new db.Users_collection(firestore);
   result = await collection.get_all_document();
   console.log(result);
   collection = new db.Events_collection(firestore);
   result = await collection.get_all_document();
   console.log(result);
   collection = new db.People_collection(firestore);
   result = await collection.get_all_document();
   console.log(result);
}

async function get() {
   var collection = new db.Artifacts_collection(firestore);
   var document_id = "wedding_ring_id";
   var result = await collection.get_document_by_id(document_id);
   console.log(result);
}

// console.log(db.server_time_stamp())
// console.log(db.convert_reference("Tests/a", firestore))
// console.log(db.convert_date("123"))
// get_all()
// get()
