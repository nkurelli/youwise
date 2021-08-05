let databob2;
window.onload = event => {
  // Firebase authentication goes here.
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Console log the user to confirm they are logged in
      console.log("Logged in as: " + user.displayName);
      document.querySelector("#nameStuff").innerHTML = user.displayName;
      document.querySelector("#userDropdown").innerHTML+=`<img class="img-profile rounded-circle" src="${user.photoURL}">`;
      getUsers(user.uid);
    } else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
    }
  });
};

const getUsers = userId => {
    console.log("Getnotes called" + userId)
  const notesRef = firebase.database().ref(`users/`);
  notesRef.on("value", snapshot => {
    const data = snapshot.val();
    console.log(data);
    databob2 = data;
    renderDataAsHtml(data);
  });
};
const renderDataAsHtml = data => {
    console.log(data)
  let cards = "";

  for (const noteItem in data) {
  
    const note = data[noteItem];
    console.log(note);
 
    cards += createCard(note);
  }

  document.querySelector("#app2").innerHTML = cards;
};
const createCard = note => {
  return `
  <div class="col">
         <div class="card shadow mb-4" style="width: 20rem;">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">${note.name}</h6>
                
            </div>
            <div class="card-body">
                <img class= card-img-top src=${note.image}>
            </div>
        </div> </div>`;
};

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
searchButton.addEventListener('click', () => {
    let cards = "";
  const inputValue = searchInput.value;
  if(inputValue==""){
      renderDataAsHtml(databob2);
  }
  else{
      for (const noteItem in databob2) {
    const note = databob2[noteItem];
    if(inputValue===note.name.toLowerCase()){
        cards += createCard(note);
    }
  }
  document.querySelector("#app2").innerHTML = cards;
  }

});

function signOut() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}