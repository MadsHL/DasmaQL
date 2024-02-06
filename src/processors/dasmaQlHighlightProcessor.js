const escapeHTML = (str) => {
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
const dasmaQlHighlightProcessor = {
    escapeHTML: (str) => {
        return escapeHTML(str);
    },
    highlight: (type, text) => {
        return `<span class="dasma-ql-${type}">${escapeHTML(text)}</span>`;
    },
}

module.exports = dasmaQlHighlightProcessor;