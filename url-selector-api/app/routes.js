const
    express = require('express'),
    AccessKeyController = require('./controllers/AccessKey.controller'),
    UrlSelectorController = require('./controllers/UrlSelector.controller'),
    EventsController = require('./controllers/Events.controller'),
    TokenCheckMiddleware = require('./Middleware/TokenCheckMiddleware');

let router = express.Router();

router.post('/url', TokenCheckMiddleware, UrlSelectorController.selectDomain);
router.get('/events', TokenCheckMiddleware, EventsController.list);
router.get('/list-keys', TokenCheckMiddleware, AccessKeyController.list);
router.get('/generate-key', AccessKeyController.generate);

module.exports = router;
