const uploadFile = document.getElementById('uploadFile');
const fileList = document.getElementById('fileList');

const convertFrom = document.getElementById('convertFrom');
const convertTo = document.getElementById('convertTo');
const convertButton = document.getElementById('convertButton');

let files = [];

uploadFile.addEventListener('change', () => {
    files = Array.from(uploadFile.files);
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
        const li = document.createElement('li');
        li.innerText = fileName; //`${index + 1}. ${fileName}`;
        fileList.appendChild(li);
    });
}

convertButton.addEventListener('click', () => {
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
    
})