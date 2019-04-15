(function() {
    var config = {
        apiKey: "AIzaSyBN4MDXgoTdX-S8_ABXT6CAYK71aIiHgus",
        authDomain: "firebasics-636dd.firebaseapp.com",
        databaseURL: "https://firebasics-636dd.firebaseio.com",
        projectId: "firebasics-636dd",
        storageBucket: "firebasics-636dd.appspot.com",
        messagingSenderId: "307563089272"
    };
    firebase.initializeApp(config);

    var firestore = firebase.firestore()

    const txtEmail = document.getElementById('txtEmail')
    const txtPassword = document.getElementById('txtPassword')
    const btnLogin = document.getElementById('btnLogin')
    const btnSignUp = document.getElementById('btnSignup')
    const btnLogout = document.getElementById('btnLogout')
    const historyOfDownloadsLink = document.getElementById('historyOfDownloadsLink')

    const vidUrl = document.getElementById('videoUrl')
    const vidName = document.getElementById('videoName')

    const historyOfDownloadsDiv = document.getElementById('historyOfDownloadsDiv')

    if(btnLogin){
        btnLogin.addEventListener('click', e => {
            const email = txtEmail.value
            const pass = txtPassword.value
            const auth = firebase.auth()

            //Sign in
            const promise = auth.signInWithEmailAndPassword(email, pass)

            promise.catch(e => console.log(e.message))
        })
    }
    if(btnLogout){
        btnLogout.addEventListener('click', e => {
            firebase.auth().signOut()
        })
    }
    if(btnSignUp) {
        btnSignUp.addEventListener('click', e => {
                const email = txtEmail.value
                const pass = txtPassword.value
                const auth = firebase.auth()

                //Sign up
                const promise = auth.createUserWithEmailAndPassword(email, pass)

                promise.
                catch(e => console.log(e.message))
        })
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser)
            if(btnLogout) btnLogout.classList.remove('hide')
            if(btnLogin) btnLogin.classList.add('hide')
            if(btnSignUp) btnSignUp.classList.add('hide')
            if(txtEmail) txtEmail.classList.add('hide')
            if(txtPassword) txtPassword.classList.add('hide')
            if(historyOfDownloadsLink) historyOfDownloadsLink.classList.remove('hide')

            const docRef = firestore.doc("users/" + firebaseUser.uid)

            if(historyOfDownloadsDiv){
                docRef.get().then(doc => {
                    historyOfDownloads = {}
                    if(doc && doc.exists) {
                        const vids = doc.data()
                        historyOfDownloadsDiv.innerHTML = ''
                        let ul = document.createElement('ul')

                        for(var v in vids){
                            let li = document.createElement('li')
                            let a = document.createElement('a')
                            a.target = '_blank'
                            a.rel = 'noopener noreferrer'
                            a.href = vids[v]
                            a.innerHTML = v
                            li.appendChild(a)
                            ul.appendChild(li)

                            console.log("key:" + v, "\nvalue:" + vids[v])
                        }

                        historyOfDownloadsDiv.appendChild(ul)
                    }
                })
            }

            setInterval(function(){
                if(vidUrl && vidName && vidUrl.innerHTML !== 'Empty' && vidName.innerHTML !== 'Loading') {
                    const url = vidUrl.innerHTML
                    let name = vidName.innerHTML
                    name = name.substring(0 ,name.length - 4) 


                    // TODO: Top-right corner button: make it useful and true to detail (if logged: username + signout-btn, if not: signin-btn)

                    console.log(name, url)
                    docRef.set({
                        [name]: url
                    }, { merge: true }).then(function(){
                        console.log("status saved")
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
                    vidName.innerHTML = 'Loading'
                    vidUrl.innerHTML = 'Empty'
                }
    
            }, 2000)
       } else {
            console.log('not logged in')
            if(btnLogout) btnLogout.classList.add('hide')
            if(btnLogin) btnLogin.classList.remove('hide')
            if(btnSignUp) btnSignUp.classList.remove('hide')
            if(txtEmail) txtEmail.classList.remove('hide')
            if(txtPassword) txtPassword.classList.remove('hide')
            if(historyOfDownloadsLink) historyOfDownloadsLink.classList.add('hide')
        }
    })

}());