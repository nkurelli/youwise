console.log('init viewTopics')
let databob;
let datarob;
let usersArray;
let useriddd;
window.onload = event => {
  // Firebase authentication goes here.
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Console log the user to confirm they are logged in
      console.log("Logged in as: " + user.displayName);
      
      document.querySelector("#nameStuff").innerHTML = user.displayName;
      document.querySelector("#userid").innerHTML+=user.uid;
      document.querySelector("#userDropdown").innerHTML+=`<img class="img-profile rounded-circle" src="${user.photoURL}">`;
      getTopics(user.uid);
      addUser(user);
    } else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
    }
  });
};
const addUser = user => {
    let found;
    console.log("addUser method called")
    const notesRef2 = firebase.database().ref(`users/`);
    notesRef2.on("value", snapshot => {
        console.log("notesref in users called")
        const data2 = snapshot.val();
        for (const noteItem in data2) {
            console.log("started");
            const note = data2[noteItem];
            console.log(noteItem);
            if(user.displayName===note.name){
                found = true;
                console.log("found");
            }
        }
        if(!found){
            firebase.database().ref(`users`).push({
            name: user.displayName,
            image: user.photoURL
            })
        }
    });
};
const getTopics = userId => {
    console.log("Getnotes called" + userId)
    const notesRef = firebase.database().ref(`topics/`);
    notesRef.on("value", snapshot => {
        const data = snapshot.val();
        databob = data;
        console.log("notesref for topics called");
        renderDataAsHtml(data);
    });
};
const renderDataAsHtml = data => {
  let cards = "";
  for (const noteItem in data) {
    const note = data[noteItem];
    cards += createCard(noteItem, note);
  }
  document.querySelector("#app").innerHTML = cards;
};
const createCard = (noteId, note) => {
  return `
         <a class="card shadow mb-4" href="viewTopic.html?topicId=${noteId}">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold" id="topicTitle">${note.name}</h6>
            </div>
            <div class="card-body">
                <p>${note.description}</p>
                <img class= card-img-top src=${note.image}>
                
            </div>
            
        </a>
        <a class="btn btn-primary"  id="${noteId}" onClick="saveTopic(this)" >Save topic</a>
            `;
};

function saveTopic(btn){
    console.log("savetopics method called")
    useridd = document.querySelector("#userid").innerHTML;
    console.log(useridd);
    const notesRef3 = firebase.database().ref(`users/`);
    notesRef3.on("value", snapshot => {
        const data4 = snapshot.val();
        for (const noteItem in data4) {
            const note = data4[noteItem];
            console.log("note item" + note.name);
            if(document.querySelector("#nameStuff").innerHTML===note.name){
                useriddd = noteItem;
                console.log("user found: " + noteItem);
            }
        }
    });

    
    const notesRef2 = firebase.database().ref(`topics/`);

    notesRef2.on("value", snapshot => {
        console.log("savetopics value called")
        const data2 = snapshot.val();
        const note = data2[btn.id];
        console.log(btn.id)
        console.log(note)
        console.log("bob" + useriddd);
        firebase.database().ref(`users/${useriddd}/`).push({
            name: note.name,
            descriptition: note.description
        })
    });
}

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
searchButton.addEventListener('click', () => {
    console.log("search button activated")
    let cards = "";
    const inputValue = searchInput.value;
    if(inputValue==""){
        const notesRef = firebase.database().ref(`topics/`);
        notesRef.on("value", snapshot => {
            const data3 = snapshot.val();
            for (const noteItem in data3) {
                const note = data3[noteItem];
                cards += createCard(noteItem, note);
            }
        });
    }
    else{
        const notesRef = firebase.database().ref(`topics/`);
        notesRef.on("value", snapshot => {
            const data3 = snapshot.val();
            for (const noteItem in data3) {
                const note = data3[noteItem];
                console.log(note.name);
                if(inputValue===note.name.toLowerCase()){
                    cards += createCard(noteItem, note);
                }
            }
        });
    }
  document.querySelector("#app").innerHTML = cards;
  
});

function signOut() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}
