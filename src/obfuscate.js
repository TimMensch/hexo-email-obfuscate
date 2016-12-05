'use strict';

const emailRegex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;

function emailReplace(match, altText) {
    let newHtml = "";
    altText = altText.replace(emailRegex, "").trim();
    if (altText.length>0) {
        altText += " ";
    }
    match = " " + match;
    for (let b = 0; b < match.length; ++b) {
        newHtml += String.fromCharCode(match.charCodeAt(b) ^ 0xA);
    }
    newHtml = newHtml.replace(/'/g, "\\'");
    let v = `v${count}`;
    let s = `s${count++}`;
    let result = `<script>
var ${v},${s}='${newHtml}';
for (${v}=0;${v}<${s}.length;++${v}) {
    document.write(String.fromCharCode(${s}.charCodeAt(${v})^0xA));
}
</script><noscript>${altText}[Email Protected]</noscript>`;
    return result;
}
const mailtoRegex = /<a href=['"]mailto:.+?['"]>(.+?)<\/a>/g;
let count = 1;
function obfuscate(text) {
    return text.replace(mailtoRegex, emailReplace);
}

module.exports = obfuscate;
