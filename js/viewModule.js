console.log('init')

const urlParams = new URLSearchParams(window.location.search);
const topicId = urlParams.get('topicId');
const moduleId = urlParams.get('moduleId');

const titleTag = document.querySelector("#topic-page-title")
const descriptionTag = document.querySelector("#topic-page-description")
const heroTag = document.querySelector("#topic-page-hero")
const contentWrapper = document.querySelector("#module-page-content-wrapper")
const backButtonWrapper = document.querySelector("#back-button")
const progressWrapper = document.querySelector("#view-module-progress")

let moduleContentsData = []
let currentIndex = 0;

function fetchData() {
    if (topicId && moduleId) {
        const topicsRef = firebase.database().ref(`topics/${topicId}/modules/${moduleId}`);
        topicsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            titleTag.innerHTML = data.name
            descriptionTag.innerHTML = data.description
            heroTag.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${data.image}")`

            moduleContentsData = data.content;
            backButtonWrapper.innerHTML = `     <a type="button" class="btn btn-primary back-button" id="back-to-topic" href="viewTopic.html?topicId=${topicId}">Back to Topic Page</a>`

            renderModuleContent(moduleContentsData)
        });
    }
}

function renderModuleContent() {

    currentContent = moduleContentsData[currentIndex]
    console.log(currentContent)
    contentWrapper.innerHTML = ""

    if (currentContent.type === "Youtube Video") {
        contentWrapper.innerHTML = `
        <div>
         <h1 class="h3 mb-4">${currentContent.name} (${currentContent.time} mins)</h1>
        </div>
        <div style="text-align: center">
        <iframe width="560" height="315"  src="https://www.youtube.com/embed/${getYTId(currentContent.url)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
     
    `
    }

    else {
        contentWrapper.innerHTML = `
    <div>
         <h1 class="h3 mb-4">${currentContent.name} (${currentContent.time} mins)</h1>
        </div>
        <iframe src="${currentContent.url}" class="content-embed"></iframe>
     
    `
    }

    let backButton = ` <button type="button" class="btn btn-outline-primary"
                        onclick="previousContent()" ${currentIndex === 0 ? "disabled" : ""}>Previous</button>`
    let nextButton = ` <button type="button" class="btn btn-outline-primary" onclick="nextContent()" ${(currentIndex === moduleContentsData.length - 1) ? "disabled" : ""}>Next</button>`

    let progressContent = ``;
    
    moduleContentsData.forEach((content, i) => {
        progressContent += `<div class="${i === currentIndex ? "module-progress-item-active" : "module-progress-item"}" onclick="moveToIndex(${i})"></div>`
    })

    progressWrapper.innerHTML = `${backButton} <div class="module-progress-item-wrapper">${progressContent}</div> ${nextButton}`

}

function nextContent() {
    if (moduleContentsData.length > currentIndex + 1) {
        currentIndex++;
    }
    renderModuleContent()
}

function previousContent() {
    if (currentIndex !== 0) {
        currentIndex--;
    }
    renderModuleContent()
}

function moveToIndex(index) {
    currentIndex = index;
        renderModuleContent()
}

window.addEventListener("DOMContentLoaded", function (ev) {
    console.log("DOMContentLoaded event");
    fetchData()
});
function getYTId(url) {
    VID_REGEX =
        /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    return url.match(VID_REGEX)[1];
}

function signOut() {
    firebase.auth().signOut()

        .then(function () {
            console.log('Signout Succesfull')
        }, function (error) {
            console.log('Signout Failed')
        });
}