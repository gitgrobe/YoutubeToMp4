function runPyScript(input){
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/download",
        data: { url: input },
        async: true,
        success: function (result) {
            console.log(result)
            console.log("ASYNC???")
            filename = result.substring(result.lastIndexOf(";")+1)
            if(filename === "failed") tellUserItFailed()
            else if (filename === "forbidden") tellUserItIsForbbiden()
            else {
                url = result.substring(0, result.lastIndexOf(";"))
            
                saveAs(url, filename)

                const videoName = document.getElementById("videoName")
                videoName.innerHTML = filename
            
                console.log('Got back ' + result);
            
                tellUserHeCanDownload()
            }
        }
    });
}


function tellUserHeCanDownload() {
    document.getElementById("downloadbutton").style = "background-color:#c4313b;color:white;"
    document.getElementById("Progress").innerHTML = "Successfully downloaded!"
}

function tellUserItFailed(){
    document.getElementById("Progress").innerHTML = "Couldn't download this video. Try again later."
    document.getElementById("downloadbutton").style = "background-color:#c4313b;color:white;"
}

function tellUserItStarted() {
    document.getElementById("downloadbutton").style = "background-color:green;color:white;"
    document.getElementById("Progress").innerHTML = "Started downloading, this might take a while..."
}

function tellUserItIsInProgress() {
    document.getElementById("Progress").innerHTML = "Will finish soon..."
}

function tellUserItIsForbbiden() {
    document.getElementById("Progress").innerHTML = "We're sorry, you can't download this video, due to copyright reasons."
}

function downloadVideo() {
    tellUserItStarted()
    url = document.getElementById("url").value
    const vidUrl = document.getElementById('videoUrl')
    vidUrl.innerHTML = url
    console.log(url)
    runPyScript(url);

    /* downloadFromFirebase(result); */
}