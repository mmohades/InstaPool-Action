function parse(str) {
    let args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, () => args[i++]);
}

module.exports = {
    parse
};
