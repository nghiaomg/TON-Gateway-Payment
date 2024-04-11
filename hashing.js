

const bufferToString = (buffer) => {
    const dataBase64 = Buffer.from(buffer).toString('base64');

    return dataBase64
}

const stringToBuffer = (dataString) => {
    const buffer = Buffer.from(dataString, 'base64');
    return buffer;
}


const cellToString = (cell) => {
    return JSON.stringify(cell);
}

const stringToCell = (str) => {
    return JSON.parse(str);
}

module.exports = {
    cellToString,
    stringToCell
}


module.exports = {
    bufferToString,
    stringToBuffer,

    cellToString,
    stringToCell
}