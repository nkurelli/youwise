console.log('custom  init')

const moduleContents = {}

window.onload = event => {
    updateSelect()
};

const moduleNameInput = document.querySelector("#moduleNameInput")
const moduleDescriptionInput = document.querySelector("#moduleDescriptionInput")
const moduleImgInput = document.querySelector("#moduleImgInput")

const updateSelect = () => {
    const topicsRef = firebase.database().ref(`topics`);

    topicsRef.on("value", snapshot => {
        const data = snapshot.val();
        renderTopicList(data)
    })
}

const renderTopicList = topics => {
    console.log(topics)
    const selectContent = document.querySelector("#topicSelection");
    selectContent.innerHTML = `<option value="">Select Category</option>`;

    for (const topicID in topics) {
        const topic = topics[topicID];
        selectContent.innerHTML += `<option value="${topicID}">${topic.name}</option>`
    }
}

const onAddModule = () => {
    firebase.database().ref(`topics/`).push({
        name: moduleNameInput.value,
        description: moduleDescriptionInput.value,
        image: moduleImgInput.value
    })
        // 3. Clear the form so that we can write a new note
        .then(() => {
            moduleNameInput.value = "";
            moduleDescriptionInput.value = "";
            moduleImgInput.value = "";
        });
}

const onAddNewContent = () => {
    moduleContents[Object.keys(moduleContents).length] = {
        type: "",
        url: ""
    }    
    console.log(moduleContents)
}

const renderContent = () => {
    
}