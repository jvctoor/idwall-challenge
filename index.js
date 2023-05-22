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
 * /procurados/nome/{nome}/precisaoMinima/{precisao}:
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
 server.get('/procurados/nome/:name/precisaoMinima/:precisao', procuradosController.getProcuradoByNome)

/**
 * @swagger
 * /procurados/rg/{rg}:
 *   get:
 *     summary: Retorna o procurado por RG
 *     tags: [Procurados]
 *     parameters:
 *       - rg: rg
 *         in: path
 *         description: RG do procurado
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 *       404:
 *         description: Não foi encontrado usuários com o RG solicitado
 */
 server.get('/procurados/rg/:rg', procuradosController.getProcuradoByRG)
