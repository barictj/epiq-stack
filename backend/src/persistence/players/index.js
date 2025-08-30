const {
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem,
} = require('./players');
console.log('Player persistence module loaded');
module.exports = {
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem,
};
