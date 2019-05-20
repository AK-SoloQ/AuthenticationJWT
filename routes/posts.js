//Exthernal Dependencies
const router = require('express').Router()

router.get('/', (req, res) => {
      res.json({posts : 'done'})
})
module.exports = router