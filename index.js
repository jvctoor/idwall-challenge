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
 * /procurados/{nome}/precisaoMinima/{precisao}:
 *   get:
 *     summary: Retorna os procurados por nome
 *     tags: [Procurados]
 *     parameters:
 *       - name: nome
 *         in: path
 *         description: Nome do procurado
 *         required: true
 *         schema:
 *           type: string
 *       - name: precisao
 *         in: path
 *         description: Precisão mínima
 *         required: true
 *         schema:
 *           type: number
 *           format: float 
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 */
 server.get('/procurados/:name/precisaoMinima/:precisao', procuradosController.getProcuradoByNome)



