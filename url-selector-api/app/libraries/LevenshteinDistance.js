class LevenshteinDistance {

    /**
     * LevenshteinDistance Constructor
     * @param stringA
     * @param stringB
     */
    constructor(stringA, stringB) {
        this.stringA = stringA;
        this.stringB = stringB;
    }

    /**
     * Calculate the distance
     */
    distance() {
        let edit_distance = this.dpa(this.stringA, this.stringB);

        let temp_sim = parseFloat(1 - edit_distance / Math.max(this.stringA.length, this.stringB.length));
        let similarity_temp = temp_sim.toFixed(4);
        let similarity = (similarity_temp * 100).toFixed(2);

        return Math.round(similarity);
    };

    /**
     * Distance Formula
     * @param string1
     * @param string2
     * @returns {*}
     */
    dpa(string1, string2) {
        let m = [];
        let i, j;

        for (i = 0; i < string1.length + 1; i++) m[i] = [];

        m[0][0] = 0; // boundary conditions

        for (j = 1; j <= string2.length; j++) m[0][j] = m[0][j - 1] - 0 + 1; // boundary conditions

        for (i = 1; i <= string1.length; i++) {
            m[i][0] = m[i - 1][0] - 0 + 1; // boundary conditions

            for (j = 1; j <= string2.length; j++) {
                let diag = m[i - 1][j - 1];
                let temp1 = string1.charAt(i - 1).toLowerCase();
                let temp2 = string2.charAt(j - 1).toLowerCase();

                if (temp1 !== temp2) diag++;

                m[i][j] = Math.min(diag, Math.min(m[i - 1][j] - 0 + 1, m[i][j - 1] - 0 + 1))
            }
        }

        return m[string1.length][string2.length];
    }
}

module.exports = LevenshteinDistance;
