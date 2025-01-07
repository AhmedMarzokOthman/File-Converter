const uploadFile = document.getElementById('uploadFile');
const fileList = document.getElementById('fileList');
const convertTo = document.getElementById('convertTo');
const convertButton = document.getElementById('convertButton');
const openFileLocationButton = document.getElementById('openFileLocationButton');
const sharp = require('sharp');
const potrace = require('potrace');
const path = require('path');
const fs = require('fs');
const pngToIco = require('png-to-ico');
const { webUtils, shell } = require('electron');

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
        const convertFromValue = webUtils.getPathForFile(files[0]).split('.').pop();
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

openFileLocationButton.addEventListener('click', () => {
    try {
        const filePath = webUtils.getPathForFile(files[0]);
        if (!filePath) {
            alert('File path is required!');
            return;
        }
        shell.showItemInFolder(filePath);
    } catch (err) {
        alert('An error occurred while opening file location ' + err);
    }
});

convertButton.addEventListener('click', async () => {
    try {
        const convertFromValue = webUtils.getPathForFile(files[0]).split('.').pop();
        const convertToValue = convertTo.value;
        const listItem = document.createElement('li');
        const fileNameP = document.createElement('p');

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
            const filePath = webUtils.getPathForFile(file);
            const outputDir = path.join(path.dirname(filePath), 'converted'); // Create a new directory called 'converted' in the same directory as the original file
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            } // Create the output directory if it doesn't exist

            const outputFilePath = path.join(
                outputDir,
                path.basename(filePath, `.${convertFromValue}`) + `.${convertToValue}`
            ); // Create the output file path

            // Perform conversion
            if (convertToValue === 'svg') {
                new Promise((resolve, reject) => {
                    potrace.trace(filePath, (err, svg) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        fs.writeFileSync(outputFilePath, svg);
                        resolve();
                    });
                });

                console.log('Conversion successful');
            } else if (convertToValue === 'png') {
                await sharp(filePath)
                    .toFormat('png')
                    .toFile(outputFilePath, (err, info) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log("Image converted successfully");
                    });
            } else if (convertToValue === 'jpeg') {
                await sharp(filePath)
                    .toFormat('jpeg')
                    .toFile(outputFilePath, (err, info) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log("Image converted successfully");
                    });
            } else if (convertToValue === 'ico') {
                const icoBuffer = await pngToIco(filePath);
                fs.writeFileSync(outputFilePath, icoBuffer);
            } else if (convertToValue === 'pdf') {

            } else if (convertToValue === 'docx') {

            }
            else {
                throw new Error(`Unsupported conversion: ${convertFrom} to ${convertTo}`);
            }
        }
        alert(`Converted from ${convertFromValue} to ${convertToValue} successfully`);
    } catch (err) {
        alert('An error occurred while converting files');
    }
});