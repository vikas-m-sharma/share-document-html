var switchInput = document.getElementsByClassName("switch-input");
var loader = document.getElementsByClassName("loader");
var main = document.getElementsByClassName("main");
var cursor = document.getElementsByClassName("cursor");
var cursor1 = document.getElementById("cursor1");
var cursor2 = document.getElementById("cursor2");
var dateTime = document.getElementById("date-time");
var linkInput = document.getElementById("linkInput");
var msgModal = document.querySelectorAll(".msgModal");
var clipboardModal = document.querySelector(".clipboardModal");
var quoteDiv = document.getElementById("quoteDiv");

switchInput[0].addEventListener('change', () => {
    main[0].classList.toggle('dark-theme');
    main[0].classList.toggle('light-theme');
});

function loaderFunction() {
    setTimeout(() => {
        loader[0].style.opacity = 0;        
        loader[0].style.display = "none";
        main[0].style.display = "block";
        setTimeout(() => {
            main[0].style.opacity = 1;
        }, 50);
    }, 500);    
}

window.addEventListener('load', loaderFunction);

document.addEventListener("mousemove", (e) => {
    let timeout;
    let x = e.pageX;
    let y = e.pageY;

    cursor1.style.top = cursor2.style.top = y + "px";
    cursor1.style.left = cursor2.style.left = x + "px";
    Array.from(cursor).forEach(element => {
        element.style.display = "block";
    });
    
    function mouseStopped(){
        Array.from(cursor).forEach(element => {
            element.style.display = "none";
        });
    }
    clearTimeout(timeout);
    timeout = setTimeout(mouseStopped, 10000);

});

document.addEventListener("mouseout", () => {
    Array.from(cursor).forEach(element => {
        element.style.display = "none";
    });
});

setInterval(() => {
    dateTime.innerHTML = new Date().toDateString() + ", " + new Date().toLocaleTimeString();
}, 1000);

function openTabs(evt, tabsName) {
    var tabIndex, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (tabIndex = 0; tabIndex < tabcontent.length; tabIndex++) {
        tabcontent[tabIndex].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (tabIndex = 0; tabIndex < tablinks.length; tabIndex++) {
        tablinks[tabIndex].className = tablinks[tabIndex].className.replace(" active", "");
    }
    document.getElementById(tabsName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

function webShare(){
    if(navigator.share){
        navigator.share({
            title: "Conrad Nunes",
            url: "https://conrad93.github.io/",
            text: "Web Developer (Resume)"
        }).then(() => {
            let message = "<p>Thank you! For sharing.</p>";
            showMsg(message);
        }).catch(err => {
            let message = "<p>Something went wrong!!!</p>";
            showMsg(message);
            console.log(err);
        });
    } else {
        clipboardModal.style.display = "block";
    }
}

function showMsg(msg) {
    msgModal[0].style.display = "block";
    msgModal[0].innerHTML = msg;
    setTimeout(() => {
        msgModal[0].style.display = "none";
    }, 3000);
}

function clipboardModalClose() {
    clipboardModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == clipboardModal) {
        clipboardModal.style.display = "none";
    }
}

function copyLink(){
    linkInput.select();
    linkInput.setSelectionRange(0, linkInput.value.length);
    document.execCommand("copy");
    clipboardModal.style.display = "none";
    let message = `<p>Link copied - ${linkInput.value}</p>`;
    showMsg(message);
}

function getQuote(){
    let quoteURL = 'http://conrad93.com/getTodaysQuote.php';
    fetch(quoteURL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        if(data.status) {
            quoteDiv.innerHTML = `<h2>${data.data[0].quote}</h2><p>- ${data.data[0].author}</p>`;
        } else {
            quoteDiv.innerHTML = `<h2>API response - ${data.status}</h2><p style="text-align:center;">${quoteURL}</p>`;
        }
    })
    .catch(error => {
        console.log(error);
        quoteDiv.innerHTML = `<h2>My code DOESN’T work, I have no idea why. My code WORKS, I have no idea why.</h2><p>- Anonymous</p>`;
    });
}
getQuote();