const db = require('./database.js')
const server = require('./server.js')

require('./swagger')(server);

/**
 * @swagger
 * tags:
 *   name: Procurados
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna todos os usuários
 *     description: Retorna uma mensagem de exemplo
 *     tags: [Procurados]
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 */
server.get('/usuarios', (req, res) => {
    db.query("select * from usuario", (err, rows) => {
        res.send(rows)
    })
})

