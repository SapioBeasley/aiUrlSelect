const
    url = require('url'),
    LevenshteinDistance = require('../libraries/LevenshteinDistance'),
    fetch = require("node-fetch"),
    NodeCache = require("node-cache"),
    myCache = new NodeCache({stdTTL: 0}),
    pg = require('pg');
    // {Pool} = require('pg'),
    // pool = new Pool({
    //     connectionString: process.env.POSTGRES_CONNECTIONSTRING,
    // });

/**
 * Determine company name
 */
class CompanyToDomain {

    /**
     * CompanyToDomain constructor
     * @param company
     * @param token
     */
    constructor(company, token) {
        this.company = company;
        this.accessToken = token;
        this.json = {};
    }

    /**
     * Gets the domain for the company name supplied
     * @returns {{name: string, domain: string}}
     */
    async get() {
        try {
            await this.getResults();
        } catch (e) {
            return {
                success: false
            };
        }

        let items = this.json.items;

        let editCounts = [];

        // match domain
        for (let i = 0; i < items.length; i++) {
            let companyUrl = url.parse(items[i].link).hostname.replace(/^www\./, '');

            editCounts.push(CompanyToDomain.getEditDistance(this.company, companyUrl));
        }

        let domain = url.parse(items[editCounts.indexOf(Math.max.apply(null, editCounts))].link).hostname;

        // Return data
        return {
            name: this.company,
            domain: domain.replace(/http:\/\/.+?\./, '').replace(/^www\./, '')
        };
    }

    /**
     * Manage results from cache
     */
    async getResults() {
        let start = new Date();

        try {
            let value = await myCache.get(this.company);

            if (value === undefined) {
                // Request custom search
                try {
                    let response = await fetch('https://www.googleapis.com/customsearch/v1?q=' + this.company + '&key=' + process.env.GOOGLE_CUSTOM_SEARCH_KEY + '&cx=' + process.env.GOOGLE_CUSTOM_SEARCH_CX);
                    this.json = await response.json();

                    // this.json = require('../../test/response');

                    this.saveDuration(this.accessToken, '/url?companies[]=' + this.company, new Date() - start);

                    myCache.set(this.company, this.json)
                } catch (e) {
                    return {
                        success: false
                    };
                }
            } else {
                this.saveDuration(this.accessToken, '/url?companies[]=' + this.company, new Date() - start);

                this.json = value;
            }
        } catch (e) {
            return {
                success: false
            };
        }
    }

    /**
     *
     * @param token
     * @param path
     * @param duration
     */
    saveDuration(token, path, duration) {
        pg.Client(process.env.POSTGRES_CONNECTIONSTRING, (err, client, done) => {
            client.query({
                name: 'fetch-token-id',
                text: 'SELECT id FROM tokens WHERE token = $1',
                values: [token]
            }, (err, res) => {
                // If key was not found
                if (typeof res === undefined) {
                    return {
                        success: false
                    };
                }

                let text = 'INSERT INTO events(path, duration, token_id) VALUES($1, $2, $3) RETURNING *';
                let values = [path, duration, res.rows[0].id];

                client.query(text, values, (err, res) => {
                    client.end()
                });
            });
        });
    }

    /**
     * Compute the accuracy of strings
     * @param a
     * @param b
     * @returns {Array}
     */
    static getEditDistance(a, b) {
        return new LevenshteinDistance(a, b).distance();
    }
}

module.exports = CompanyToDomain;
