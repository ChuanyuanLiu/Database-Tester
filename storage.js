/**
 * An independent firebase storage component
 */

class Image {
   constructor() {}
}

file_name = "41d7a63.jpg";

// Points to the root reference
var storageRef = firebase.storage().ref();

var pathReference = storage.ref("images/" + file_name);

function show() {
   storageRef
      .child(file_name)
      .getDownloadURL()
      .then(function(url) {
         // `url` is the download URL for 'images/stars.jpg'

         // inserted into an <img> element:
         var img = document.getElementById("myimg");
         img.src = url;
      })
      .catch(function(error) {
         console.log(error);
      });
}
