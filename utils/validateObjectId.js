var mongoose = require('mongoose');

const validateId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error('Invalid ID');
    return isValid;
}

module.exports = validateId;