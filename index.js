const urlParams = new URLSearchParams(window.location.search);

const name = urlParams.get('name');
const college = urlParams.get('college');
const uid = urlParams.get('uid');

const nameElement = document.getElementById('name');
const collegeElement = document.getElementById('college');
const uidElement = document.getElementById('uid');

const downloadButton = document.getElementById('download');
downloadButton.addEventListener('click', downloadAsPng);

function downloadAsPng() {
    const svgElement = document.getElementById('pass'); // Replace with your SVG id

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 5000;
    canvas.height = 1668;

    const data = new XMLSerializer().serializeToString(svgElement);
    const DOMURL = window.URL || window.webkitURL || window;
    const img = new Image();
    const svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    const url = DOMURL.createObjectURL(svgBlob);

    img.onload = function () {
        context.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);

        const dataUrl = canvas.toDataURL('image/png');
        const filename = 'maker-pass.png';

        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    img.src = url;
}

nameElement.textContent = name;
collegeElement.textContent = college;
uidElement.textContent = uid;
