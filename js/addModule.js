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
      console.log(user);
      console.log(user.uuid);
      console.log("i'm here");
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

const validateModule = () => {
    let num = 0;
    if(selectContent.value === "") num++;
    if (moduleNameInput.value === "") {
        moduleNameInput.classList.add("is-danger");
        num++;
    }
    if (moduleDescriptionInput.value === "") {
        num++;
        moduleDescriptionInput.classList.add("is-danger");
    }
    if (moduleImgInput.value === "") {
        num++;
        moduleImgInput.classList.add("is-danger");
    }

    if(Object.keys(moduleContents).length === 0) {
        num++;
        alert("You must add content to your modules!")
    }

    

    return (num === 0? true: false)
}

moduleNameInput.addEventListener("input", e=> {
    moduleNameInput.classList.remove("is-danger");
})
moduleDescriptionInput.addEventListener("input", e=> {
    moduleDescriptionInput.classList.remove("is-danger");
})
moduleImgInput.addEventListener("input", e=> {
    moduleImgInput.classList.remove("is-danger");
})

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
    if (validateModule()) {
    const user = firebase.auth().currentUser;
    const topicId = selectContent.value
    firebase.database().ref(`topics/${topicId}/modules`).push({
        name: moduleNameInput.value,
        description: moduleDescriptionInput.value,
        image: moduleImgInput.value,
        author: user.uid,
        content: moduleContents,
        
    })
        // 3. Clear the form so that we can write a new note
        .then(() => {
            moduleNameInput.value = "";
            moduleDescriptionInput.value = "";
            moduleImgInput.value = "";
            moduleContents = {}
            renderContent()
        });
    } else {
        alert("You cannot leave module inputs empty!")
    }

}
const contentTypeSelect = document.querySelector("#contentTypeSelect")
const contentURL = document.querySelector("#contentURL")
const contentName = document.querySelector("#contentName");
const contentTime = document.querySelector("#contentTime");

const onAddNewContent = () => {

    if(validateContent()) {
          moduleContents[Object.keys(moduleContents).length] = {
        type: contentTypeSelect.value,
        url: contentURL.value,
        name: contentName.value,
        time: contentTime.value,
    }
        renderContent()

        contentTypeSelect.value = ""
        contentURL.value = ""
        contentName.value = ""
        contentTime.value = ""
        console.log(moduleContents)

    } else {
        alert("You cannot leave content inputs blank!")
    }
}

// when user enters field, it removes the red error from being empty
contentTypeSelect.addEventListener("input", e => {
    contentTypeSelect.classList.remove("is-danger");
})
contentName.addEventListener("input", e => {
    contentName.classList.remove("is-danger");
})
contentURL.addEventListener("input", e => {
    contentURL.classList.remove("is-danger");
})
contentTime.addEventListener("input", e => {
    contentTime.classList.remove("is-danger");
})

// checks if inputs are empty or not
const validateContent = () => {
    let num = 0;
    if (contentTypeSelect.value === "") {
        contentTypeSelect.classList.add("is-danger");
        num++;
    }
    if (contentURL.value === "") {
        contentURL.classList.add("is-danger");
        num++;
    }
    if (contentName.value === "") {
        contentName.classList.add("is-danger");
        num++;
    }
    if (contentTime.value === "") {
        contentTime.classList.add("is-danger");
        num++;
    }
    return (num === 0? true: false);

}

const renderContent = () => {
    contentItems.innerHTML = ""

    for (const index in moduleContents) {
        const content = moduleContents[index];
        console.log(content)
        contentItems.innerHTML += `<div class="card"><header class="card-header">${content.name} - ${content.type}</header> <div class="card-content"> <p>Estimated time: ${content.time} minutes </p>
                                                <p>Source: ${content.url}</p> </div></div><br>`
    }

}

renderContent();

function signOut() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}
