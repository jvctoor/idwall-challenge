const db = require('../database.js')


const getAllProcurados = (req, res) => {
    db.query("SELECT p.ID, p.Nome, p.Genero, p.DataNascimento, p.LocalNascimento, JSON_ARRAYAGG(a.Acusacao) AS Acusacoes, SUM(a.severidade) AS SeveridadeTotal FROM Procurados p INNER JOIN Acusacoes a ON p.ID = a.ProcuradoID GROUP BY p.ID, p.Nome, p.Genero, p.DataNascimento, p.LocalNascimento ORDER BY SeveridadeTotal DESC;", (err, rows) => {
      res.send(rows)
    })
}

const getProcuradoByNome = (req, res) => {
  const nomePesquisado = req.params.name;
  db.query("SELECT p.ID, p.Nome, p.Genero, p.DataNascimento, p.LocalNascimento, JSON_ARRAYAGG(a.Acusacao) AS Acusacoes, SUM(a.severidade) AS SeveridadeTotal FROM Procurados p INNER JOIN Acusacoes a ON p.ID = a.ProcuradoID GROUP BY p.ID, p.Nome, p.Genero, p.DataNascimento, p.LocalNascimento ORDER BY SeveridadeTotal DESC;", (err, rows) => {
    const resultadosFiltrados = rows.filter(procurado => procurado.Nome.includes(nomePesquisado));

    resultadosFiltrados.forEach(procurado => {
      const nomeCompleto = procurado.Nome;
      const acertos = nomeCompleto.split(' ').filter(nome => nome.includes(nomePesquisado)).length;
      const porcentagemAcerto = (acertos / nomeCompleto.split(' ').length) * 100;
      procurado.PorcentagemAcerto = porcentagemAcerto;
    });

    const resultadosFiltradosPorPorcentagem = resultadosFiltrados.filter(procurado => procurado.PorcentagemAcerto > 40);

    res.send(resultadosFiltradosPorPorcentagem);

  })

}

module.exports = {
  getAllProcurados,
  getProcuradoByNome
};