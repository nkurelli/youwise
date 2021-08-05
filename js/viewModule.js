console.log('init')

const urlParams = new URLSearchParams(window.location.search);
const topicId = urlParams.get('topicId');
const moduleId = urlParams.get('moduleId');

const titleTag = document.querySelector("#topic-page-title")
const descriptionTag = document.querySelector("#topic-page-description")
const heroTag = document.querySelector("#topic-page-hero")
const contentWrapper = document.querySelector("#module-page-content-wrapper")
const backButtonWrapper = document.querySelector("#back-button")

let moduleContentsData = []
let currentIndex = 0;

function fetchData() {
    if (topicId && moduleId) {
        const topicsRef = firebase.database().ref(`topics/${topicId}/modules/${moduleId}`);
        topicsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            titleTag.innerHTML = data.name
            descriptionTag.innerHTML = data.description
            console.log(heroTag)
            heroTag.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${data.image}")`
            console.log(data.content);

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

        console.log(getYTId(currentContent.url))
        contentWrapper.innerHTML = `
        <div>
         <h1 class="h3 mb-4">${currentContent.name} (${currentContent.time} mins)</h1>
        </div>
        <div style="text-align: center">
        <iframe width="560" height="315"  src="https://www.youtube.com/embed/${getYTId(currentContent.url)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
     
    `
    }

    else{
contentWrapper.innerHTML = `
    <div>
         <h1 class="h3 mb-4">${currentContent.name} (${currentContent.time} mins)</h1>
        </div>
        <iframe src="${currentContent.url}" class="content-embed"></iframe>
     
    `
    }
    
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
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}
