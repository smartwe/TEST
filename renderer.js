// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('electron').remote;

(function handleWindowControls() {
    // When document has loaded, initialise
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
        }
    };

    function init() {
        // 최소, 최대, 닫기 버튼 - 헤더 
        let win = remote.getCurrentWindow();
        const minButton = document.getElementById('min-button'),
            maxButton = document.getElementById('max-button'),
            restoreButton = document.getElementById('restore-button'),
            closeButton = document.getElementById('close-button');
        minButton.addEventListener("click", event => {
            win = remote.getCurrentWindow();
            win.minimize();
        });
        maxButton.addEventListener("click", event => {
            win = remote.getCurrentWindow();
            win.maximize();
            toggleMaxRestoreButtons();
        });
        restoreButton.addEventListener("click", event => {
            win = remote.getCurrentWindow();
            win.unmaximize();
            toggleMaxRestoreButtons();
        });
        // Toggle maximise/restore buttons when maximisation/unmaximisation
        // occurs by means other than button clicks e.g. double-clicking
        // the title bar:
        toggleMaxRestoreButtons();
        win.on('maximize', toggleMaxRestoreButtons);
        win.on('unmaximize', toggleMaxRestoreButtons);
        closeButton.addEventListener("click", event => {
            win = remote.getCurrentWindow();
            win.close();
        });
        function toggleMaxRestoreButtons() {
            win = remote.getCurrentWindow();
            if (win.isMaximized()) {
                maxButton.style.display = "none";
                restoreButton.style.display = "flex";
            } else {
                restoreButton.style.display = "none";
                maxButton.style.display = "flex";
            }
        }
        // 최소, 최대, 닫기 버튼 - 헤더 끝
    }
})();

function zoomInOut(value) {   
    const { webFrame } = require('electron')
    var zoomFactor = webFrame.getZoomFactor() + value;
    if(zoomFactor >= 0.5){
        webFrame.setZoomFactor(zoomFactor);
        document.getElementById('zoom-factor').innerHTML = Math.round(zoomFactor*100)+"%";
    }
}

function setZoom(value) {
    const { webFrame } = require('electron')
    webFrame.setZoomFactor(value);
    document.getElementById('zoom-factor').innerHTML = Math.round(value*100)+"%";
}
