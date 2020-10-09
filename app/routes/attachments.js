const router = require('express-promise-router')();
const FileController = require('../controllers/attachments');

router.route('/').get(FileController.getAttachement);

module.exports = router;
