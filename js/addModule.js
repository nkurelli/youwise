console.log('custom  init')

let moduleContents = {}

window.onload = event => {
    updateSelect()
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
    firebase.database().ref(`topics/${topicId}`).push({
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
        contentItems.innerHTML += `<div>${content.type} : ${content.url} </div>`
    }

}

renderContent();