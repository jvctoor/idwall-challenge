const server = require('./server.js')
const procuradosControllers = require('./controllers/procuradosControllers');

require('./swagger')(server);

/**
 * @swagger
 * /procurados:
 *   get:
 *     summary: Retorna todos os procurados
 *     tags: [Procurados]
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 */
server.get('/procurados', procuradosControllers.getAllProcurados)



