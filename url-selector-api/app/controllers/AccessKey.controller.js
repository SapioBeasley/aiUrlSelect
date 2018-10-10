const
    jwt = require('jsonwebtoken'),
    {Pool} = require('pg'),
    pool = new Pool({
        connectionString: process.env.POSTGRES_CONNECTIONSTRING,
    });

exports.generate = async (req, res) => {
    let token = jwt.sign({foo: 'bar'}, 'shhhhh');

    let text = 'INSERT INTO tokens(token) VALUES($1) RETURNING *';
    let values = [token];

    await pool.query(text, values);

    // Return results
    res.json({
        data: {
            accessKey: token
        }
    });
};

exports.list = async (req, res) => {
    let keys = await pool.query({
        name: 'list-keys',
        text: 'SELECT * FROM tokens',
    });

    res.json({
        data: {
            keys: keys.rows.length > 0 ? keys.rows : []
        }
    });
};
