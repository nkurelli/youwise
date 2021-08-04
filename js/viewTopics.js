console.log('init viewTopics')

window.onload = event => {
    console.log('Hello')
  // Firebase authentication goes here.
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Console log the user to confirm they are logged in
      console.log("Logged in as: " + user.displayName);
      const googleUserId = user.uid;
      getTopics(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
    }
  });
};

const getTopics = userId => {
    console.log("Getnotes called" + userId)
  const notesRef = firebase.database().ref(`topics/`);
  notesRef.on("value", snapshot => {
    const data = snapshot.val();
    renderDataAsHtml(data);
  });
};
const renderDataAsHtml = data => {
  let cards = "";
  for (const noteItem in data) {
    const note = data[noteItem];
    cards += createCard(note);
  }
  document.querySelector("#app").innerHTML = cards;
};
const createCard = note => {
  return `
         <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">${note.name}</h6>
            </div>
            <div class="card-body">
                <p>${note.description}</p>
                <img src=${note.image}>
            </div>
        </div>`;
};