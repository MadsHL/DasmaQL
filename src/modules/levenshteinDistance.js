const levenshteinDistance = (a, b) => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    let matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(
                        matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1 // deletion
                    )
                );
            }
        }
    }

    return matrix[b.length][a.length];
};

const levenshteinSearchSort = (elements, search) => {
    const searchLower = search.toLowerCase();

    // Helper function to get element's label in lowercase
    const getElementLabelLower = (element) => {
        if (typeof element === 'object' && element.label) {
            return element.label;
        } else if (typeof element === 'string') {
            return element;
        }
        return '';
    };

    return elements
        .map((element) => ({
            element,
            label: getElementLabelLower(element).toLowerCase(),
        }))
        .map(element => ({
            ...element,
            distance: levenshteinDistance(element.label, searchLower) - (element.label.length - searchLower.length),
        }))

        .filter(({distance}) => {
            return distance < search.length;
        })
        .sort((a, b) => {
            if (a.distance === b.distance) {
                return getElementLabelLower(a.element).localeCompare(getElementLabelLower(b.element));
            }
            return a.distance - b.distance;
        })
        .map(({element}) => element);
};


module.exports = {
    levenshteinDistance,
    levenshteinSearchSort
};