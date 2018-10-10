const
    CompanyToDomain = require('../libraries/CompanyToDomain');

/**
 * Gather domain for company name
 *
 * @param req
 * @param res
 */
exports.selectDomain = async (req, res) => {
    let reqData = Object.keys(req.query).length !== 0 ? req.query : req.body;

    let companies = reqData.companies;

    // Default data
    let data = {
        data: [],
        length: 0
    };

    // max companies to 25
    if (companies.length > 25) res.json({
        success: false,
        message: 'Limit of companies is 25'
    });

    // Loop the items and match with domains
    for (const company of companies) {
        data.data.push(await new CompanyToDomain(company, req.headers['access-token']).get());
    }

    data.length = data.data.length;

    // Return results
    res.json(data);
};
