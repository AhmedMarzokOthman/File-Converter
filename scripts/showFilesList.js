const uploadFile = document.getElementById('uploadFile');
const fileList = document.getElementById('fileList');
const convertFrom = document.getElementById('convertFrom');
const convertTo = document.getElementById('convertTo');
const convertButton = document.getElementById('convertButton');
const sharp = require('sharp');
const potrace = require('potrace');
const path = require('path');
const fs = require('fs');
const { webUtils } = require('electron');


let files = [];

uploadFile.addEventListener('change', async () => {
    files = Array.from(uploadFile.files);

    console.log(webUtils.getPathForFile(files[0]));

    storeItems();
    showFiles();
});


const storeItems = () => {
    localStorage.setItem('files', JSON.stringify(files.map(file => file.name)));
}

const showFiles = () => {
    fileList.innerHTML = ''; // Clear the list before displaying new items
    const storedFiles = JSON.parse(localStorage.getItem('files')) || [];
    storedFiles.forEach((fileName, index) => {
        const convertFromValue = convertFrom.value;
        const li = document.createElement('li');
        const fileNameP = document.createElement('p');

        const img = document.createElement('img');

        if (fileName.includes('.png') && convertFromValue === 'png') {
            img.src = 'https://www.svgrepo.com/show/255822/png.svg';

        } else if (fileName.includes('.svg') && convertFromValue === 'svg') {
            img.src = 'https://www.svgrepo.com/show/255830/svg.svg';

        } else {
            img.src = 'https://www.svgrepo.com/show/219278/image-photo.svg';
        }
        img.alt = 'file icon';
        img.style.width = '30px';
        img.style.height = '30px';
        img.style.marginRight = '20px';
        li.style.display = 'flex';
        li.style.alignItems = 'center';

        fileNameP.textContent = document.createTextNode(fileName).textContent;

        li.appendChild(img);
        li.appendChild(fileNameP);

        fileList.appendChild(li);
    });
}

convertButton.addEventListener('click', async () => {
    const convertFromValue = convertFrom.value;
    const convertToValue = convertTo.value;
    console.log(convertFromValue + ' to ' + convertToValue);
    if (!convertFromValue || !convertToValue) {
        alert('Please select the file type to convert');
        return;
    }
    if (files.length === 0) {
        alert('Please upload file to convert');
        return;
    }

    for (const file of files) {
        const outputDir = path.join(path.dirname(webUtils.getPathForFile(file)), 'converted'); // Create a new directory called 'converted' in the same directory as the original file
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        } // Create the output directory if it doesn't exist

        const outputFilePath = path.join(
            outputDir,
            path.basename(webUtils.getPathForFile(file), `.${convertFromValue}`) + `.${convertToValue}`
        ); // Create the output file path

        // Perform conversion
        if (convertFromValue === 'png' && convertToValue === 'svg') {
            new Promise((resolve, reject) => {
                potrace.trace(webUtils.getPathForFile(file), (err, svg) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    fs.writeFileSync(outputFilePath, svg);

                    resolve();
                });
            });

            // sharp(webUtils.getPathForFile(file))
            // .toFormat('svg')
            // .toFile(outputFilePath);
        } else if (convertFromValue === 'svg' && convertToValue === 'png') {
            // new Promise((resolve, reject) => {
            //     potrace.trace(webUtils.getPathForFile(file), (err, png) => {
            //         if (err) {
            //             reject(err);
            //             return;
            //         }
            //         fs.writeFileSync(outputFilePath, png);

            //         resolve();
            //     });
            // });
            await sharp(webUtils.getPathForFile(file))
                .toFormat('png')
                .toFile(outputFilePath);
        } else {
            throw new Error(`Unsupported conversion: ${convertFrom} to ${convertTo}`);
        }
    }
});