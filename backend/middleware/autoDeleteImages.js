const fs = require('fs');

function deleteImg(imageUrl) {
    let filename = imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {});
}

module.exports = { deleteImg };
