const fs = require('fs');

fs.writeFile('output.txt', 'This is the updated content.', (err) => {
    if (err) throw err;
    console.log('File written successfully.');
});