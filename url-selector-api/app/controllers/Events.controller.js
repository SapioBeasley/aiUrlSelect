const
    pg = require('pg');
    // {Pool} = require('pg'),
    // pool = new Pool({
    //     connectionString: process.env.POSTGRES_CONNECTIONSTRING,
    // });

exports.list = (req, res) => {
    pg.Client(process.env.POSTGRES_CONNECTIONSTRING, async (err, client, done) => {
        let events = await client.query({
            name: 'list-events',
            text: 'SELECT * FROM events',
        });

        client.end();

        res.json({
            data: {
                events: events.rows.length > 0 ? events.rows : []
            }
        });

        done()
    });
};