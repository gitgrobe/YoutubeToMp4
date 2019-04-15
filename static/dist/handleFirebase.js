var config = {
    apiKey: "AIzaSyBN4MDXgoTdX-S8_ABXT6CAYK71aIiHgus",
    authDomain: "firebasics-636dd.firebaseapp.com",
    databaseURL: "https://firebasics-636dd.firebaseio.com",
    projectId: "firebasics-636dd",
    storageBucket: "firebasics-636dd.appspot.com",
    messagingSenderId: "307563089272"
};
firebase.initializeApp(config);
//not needed? 
firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});
var storage = firebase.storage();
var storageRef = storage.ref();

function downloadFromFirebase(filename) {
    console.log(filename)
    storageRef.child(filename).getDownloadURL().then(function(url) {
    console.log(url)

    downloadLink = document.createElement("a")
    downloadLink.innerHTML = filename
    downloadLink.href = url
    document.getElementById("Progress").innerHTML = ""
    document.getElementById("Progress").appendChild(downloadLink)
    tellUserHeCanDownload()


    /* commented since we are unable to download due to cors existing. might come up with a solution later.

     `url` is the download URL for 'images/stars.jpg'
     This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
        var blob = xhr.response;
        console.log(blob)

        //saveAs(blob, "test.mp4")
    };
    xhr.open('GET', url);
    xhr.send(); 

    */
    }).catch(function(error) {
        console.log(error.code)
        tellUserItFailed()
    }); 
}