console.log('custom  init')

let moduleContents = {}

window.onload = event => {
  // Firebase authentication goes here.
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Console log the user to confirm they are logged in
      console.log("Logged in as: " + user.displayName);
      document.querySelector("#nameStuff").innerHTML = user.displayName;
      document.querySelector("#userDropdown").innerHTML+=`<img class="img-profile rounded-circle" src="${user.photoURL}">`;
      updateSelect()
    } else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
    }
  });
};

const moduleNameInput = document.querySelector("#moduleNameInput")
const moduleDescriptionInput = document.querySelector("#moduleDescriptionInput")
const moduleImgInput = document.querySelector("#moduleImgInput")
const contentItems = document.querySelector("#contentItems")
const selectContent = document.querySelector("#topicSelection");

const updateSelect = () => {
    const topicsRef = firebase.database().ref(`topics`);

    topicsRef.on("value", snapshot => {
        const data = snapshot.val();
        renderTopicList(data)
    })
}

const renderTopicList = topics => {
    console.log(topics)
    selectContent.innerHTML = `<option value="">Select Category</option>`;

    for (const topicID in topics) {
        const topic = topics[topicID];
        selectContent.innerHTML += `<option value="${topicID}">${topic.name}</option>`
    }
}

const onAddModule = () => {
    const topicId = selectContent.value
    firebase.database().ref(`topics/${topicId}/modules`).push({
        name: moduleNameInput.value,
        description: moduleDescriptionInput.value,
        image: moduleImgInput.value,
        content: moduleContents
    })
        // 3. Clear the form so that we can write a new note
        .then(() => {
            moduleNameInput.value = "";
            moduleDescriptionInput.value = "";
            moduleImgInput.value = "";
            moduleContents = {}
            renderContent()
        });
}

const onAddNewContent = () => {

    const contentTypeSelect = document.querySelector("#contentTypeSelect")
    const contentURL = document.querySelector("#contentURL")
    moduleContents[Object.keys(moduleContents).length] = {
        type: contentTypeSelect.value,
        url: contentURL.value
    }

    contentTypeSelect.value = ""
    contentURL.value = ""
    console.log(moduleContents)

    renderContent()
}

const renderContent = () => {
    contentItems.innerHTML = ""

    for (const index in moduleContents) {
        const content = moduleContents[index];
        console.log(content)
        contentItems.innerHTML += `<div class="card"><header class="card-header">${content.type}</header> <div class="card-content"> ${content.url} </div></div><br>`
    }

}

renderContent();