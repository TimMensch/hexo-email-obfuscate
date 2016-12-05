var renderFootnotes = require('./src/obfuscate');

// Register footnotes filter
hexo.extend.filter.register('after_post_render', function (data) {
    data.content = renderFootnotes(data.content);
    return data;
},100);
