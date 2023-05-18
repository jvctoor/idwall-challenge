const db = require('../database.js')

const getAllProcurados = (req, res) => {
    db.query("select * from procurados", (err, rows) => {
        res.send(rows)
    })
}

module.exports = {
  getAllProcurados
};