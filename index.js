const server = require('./server.js')
const procuradosController = require('./controllers/procuradosController');

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
server.get('/procurados', procuradosController.getAllProcurados)

/**
 * @swagger
 * /procurados/:name:
 *   get:
 *     summary: Retorna todos os procurados
 *     tags: [Procurados]
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 */
 server.get('/procurados/:name', procuradosController.getProcuradoByNome)



