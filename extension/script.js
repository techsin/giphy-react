

var actualCode = '(' + function () {
    var _wr = function (type) {
        var orig = history[type];
        return function () {
            var rv = orig.apply(this, arguments);
            var e = new Event(type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    };
    window.history.pushState = _wr('pushState'), window.history.replaceState = _wr('replaceState');
} + ')();';

var script = document.createElement('script');
script.textContent = actualCode;
(document.head || document.documentElement).appendChild(script);
script.remove();





window.addEventListener('replaceState', function (e) {
    loadNewData();
});

window.addEventListener('pushState', function (e) {
    loadNewData();
});




// Initialize Firebase
console.log(firebase, "fire")
var config = {
    apiKey: "AIzaSyAccAtHxQKGmrefBGSjG553kR2DZauzvIo",
    authDomain: "hackathon-fd920.firebaseapp.com",
    databaseURL: "https://hackathon-fd920.firebaseio.com",
    projectId: "hackathon-fd920",
    storageBucket: "hackathon-fd920.appspot.com",
    messagingSenderId: "564664901970"
};

var state = {
    chat_open: false,
    count: 0
};

var giphy_react_ele = document.createElement('div');
giphy_react_ele.id = 'giphy-react';
giphy_react_ele.innerHTML = `

<div class="chatbox">
    <input type="text" class='inputTxt'>
    <div class="gifs"></div>
</div>
<div class="toggle_chat btn">GIPHY<span class='red'>REACT (<span id="num">0</span>)</div>

`;

document.body.appendChild(giphy_react_ele);

var $ele = {
    main: document.querySelector("#giphy-react"),
    toggle_btn: document.querySelector("#giphy-react .toggle_chat.btn"),
    chat_box: document.querySelector("#giphy-react .chatbox"),
    input_box: document.querySelector("#giphy-react .chatbox .inputTxt"),
    gifs: document.querySelector("#giphy-react .chatbox .gifs"),
    num: document.querySelector("#giphy-react .toggle_chat #num")
};

firebase.initializeApp(config);

function loadNewData() {
    $ele.gifs.innerHTML = '';
    state.count = 0;
    updateCount(state.count);
    var current_url = btoa(location.hostname + location.pathname);
    var urls = firebase.database().ref("urls/" + current_url);
    var comments = urls.child("comments");
    comments.on("child_added", function (snapshot) {
        var data = snapshot.val();

        if (data && state.chat_open == false) {
            state.count += 1;
            updateCount(state.count);
        }

        if (data) {
            addGif(data.url);
        }
    });
    $ele.input_box.onkeydown = function (event) {
        if (event.which != 13 && event.keyCode != 13) return;

        fetch(giphySearchUrl($ele.input_box.value))
            .then(res => res.json())
            .then(data => {
                var data = data.data;
                var i = Math.floor(data.length * Math.random());
                var url = data[i].images.fixed_width.url;
                comments.push({ url: url });
            });
        $ele.input_box.value = "";
    };
}
loadNewData();



function giphySearchUrl(term) {
    return `https://api.giphy.com/v1/gifs/search?api_key=BPUDJy5FNE1p9K0dapj2sS1rDQMCsXtR&q=${term}&limit=20&offset=0&rating=PG-13&lang=en`;
}

//UI ctrl

var gr_toggle_btn = document.querySelector("#giphy-react .toggle_chat.btn");
gr_toggle_btn.onclick = function () {
    state.chat_open = !state.chat_open;
    if (state.chat_open) {
        state.count = 0;
        updateCount(state.count);
    }
    state.chat_open
        ? $ele.main.classList.add("open")
        : $ele.main.classList.remove("open");
};

function addGif(url) {
    var gif = document.createElement("img");
    gif.src = url;
    $ele.gifs.prepend(gif);
}

function updateCount(n) {
    $ele.num.innerText = n;
}
