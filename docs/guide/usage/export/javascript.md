---
sidebar_position: 1
---
# Javascript

To easily extend the JavaScript build process, you can add a custom script. Here’s a step-by-step guide on how to do this:

## Create a new file

Create the file `./scripts/rob18n.js`

## File contents

Copy the following code into the `rob18n.js` file:

```js
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as unzipper from 'unzipper';
import * as path from 'path';

async function handleLangFolder() {
    if (!fs.existsSync('./src/lang')) {
        fs.mkdirSync('./src/lang', { recursive: true });
    }
}

handleLangFolder().then(() => {
    getData();
});

function getData() {
    fetch('http://localhost:2402/language-key/export?project_id=27&languages=["de_DE", "en_US"]&format=json', {
        method: 'POST',
    })
        .then((response) => response.json())
        .then((zipUrl) => {
            downloadAndExtractZip(zipUrl, './src/lang');
        })
        .catch((error) => console.log(error));
}

function downloadAndExtractZip(url, destFolder) {
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
            }
            const tempFolder = path.join(destFolder, 'temp_unzip');
            if (!fs.existsSync(tempFolder)) {
                fs.mkdirSync(tempFolder);
            }
            return res.body.pipe(unzipper.Extract({ path: tempFolder }))
                .promise()
                .then(() => tempFolder);
        })
        .then(tempFolder => {
            moveFilesFromSubfolder(tempFolder, destFolder);
        })
        .catch(err => console.log('Error downloading or extracting ZIP:', err));
}

function moveFilesFromSubfolder(srcFolder, destFolder) {
    fs.readdir(srcFolder, (err, folders) => {
        if (err) throw err;

        const subfolderPath = path.join(srcFolder, folders[0]);

        fs.readdir(subfolderPath, (err, files) => {
            if (err) throw err;

            files.forEach(file => {
                const srcPath = path.join(subfolderPath, file);
                const destPath = path.join(destFolder, file);

                fs.rename(srcPath, destPath, (err) => {
                    if (err) throw err;
                    console.log(`Moved file: ${file} to ${destFolder}`);
                });
            });

            fs.rmdir(srcFolder, { recursive: true }, (err) => {
                if (err) throw err;
                console.log(`Deleted temporary folder: ${srcFolder}`);
            });
        });
    });
}
```

### Adjust API Call Parameters

Before running the script, make sure to adjust the parameters in the API call according to your project needs. Specifically, you will need to modify the `format`, `project_id` and the list of `languages` in the getData function:

## Extend the package.json

Add the new script command in your package.json:

```json
"scripts": {
    "dev": "vite",
	...
    "rob18n": "node ./scripts/rob18n.js"
}
```

### combine script

```json
"scripts": {
    "dev": "node ./scripts/rob18n.js && vite",
	...
    "rob18n": "node ./scripts/rob18n.js"
}
```

Pay attention to the order. It is important to follow the correct sequence. The call to rob18n must come before serve.

## Run the script

You can now run the script with the following command:
`npm run rob18n`

With these steps, you’ve extended the build process to automatically download and integrate language files during the build.