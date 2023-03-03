const urlParams = new URLSearchParams(window.location.search);

const name = urlParams.get('name');
const college = urlParams.get('college');
const uid = urlParams.get('uid');

const svgElement = document.getElementById('pass'); // Replace with your SVG id

const nameElement = document.getElementById('name');
const collegeElement = document.getElementById('college');
const uidElement = document.getElementById('uid');

const downloadButton = document.getElementById('download-png');
const downloadPdfButton = document.getElementById('download-pdf');

downloadPdfButton.addEventListener('click', downloadAsPdf);
downloadButton.addEventListener('click', downloadAsPng);

function svgToImg(callback)
{
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 5000;
    canvas.height = 1668;

    const data = new XMLSerializer().serializeToString(svgElement);
    const DOMURL = window.URL || window.webkitURL || window;
    const img = new Image();
    const svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    const url = DOMURL.createObjectURL(svgBlob);

    img.onload = () => {
        context.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
        callback(canvas);
    }

    img.src = url;
}

function downloadAsPng() {
    svgToImg((canvas) => {
        const filename = 'maker-pass.png';
        const link = document.createElement('a');

        link.download = filename;
        link.href = canvas.toDataURL('image/png');

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

function downloadAsPdf() {
    svgToImg((canvas) => {
        const dataUrl = canvas.toDataURL('image/png');

        // Define the document definition for pdfmake
        const docDefinition = {
            content: [
                {
                    image: dataUrl,
                    width: canvas.width / 10,
                    height: canvas.height / 10,
                }
            ]
        };

        // Create a new PDF document with pdfmake
        const pdfDoc = pdfMake.createPdf(docDefinition);

        // Download the PDF
        pdfDoc.download('maker-pass.pdf');
    });
}

nameElement.textContent = name;
collegeElement.textContent = college;
uidElement.textContent = uid;

const colors = ["#fa1d1d", "#2b60ed", "#17cd33"];

const filled = document.getElementsByClassName('fill-color');
const stroke = document.getElementsByClassName('stroke-color');

const color = urlParams.get('color') || colors[Math.floor(Math.random() * colors.length)];

for (let i = 0; i < filled.length; i++) {
    filled[i].style.fill = color;
}

for (let i = 0; i < stroke.length; i++) {
    stroke[i].style.stroke = color;
}
