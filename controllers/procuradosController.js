const db = require('../database.js')


const getAllProcurados = (req, res) => {
    db.query("SELECT p.ID, p.Nome, p.Genero, p.DataNascimento, p.LocalNascimento, JSON_ARRAYAGG(a.Acusacao) AS Acusacoes, SUM(a.severidade) AS SeveridadeTotal FROM Procurados p INNER JOIN Acusacoes a ON p.ID = a.ProcuradoID GROUP BY p.ID, p.Nome, p.Genero, p.DataNascimento, p.LocalNascimento ORDER BY SeveridadeTotal DESC;", (err, rows) => {
      res.send(rows)
    })
}

const getProcuradoByNome = (req, res) => {
  const pesquisa = req.params.name;
  const porcentagemMinima = req.params.precisao;
  //console.log(pesquisa)
  db.query("SELECT p.ID, p.Nome, p.Genero, p.DataNascimento, p.LocalNascimento, JSON_ARRAYAGG(a.Acusacao) AS Acusacoes, SUM(a.severidade) AS SeveridadeTotal FROM Procurados p INNER JOIN Acusacoes a ON p.ID = a.ProcuradoID GROUP BY p.ID, p.Nome, p.Genero, p.DataNascimento, p.LocalNascimento ORDER BY SeveridadeTotal DESC;", (err, resultados) => {
    
    const resultadosFiltrados = resultados.filter(procurado => {
      const nomeCompleto = procurado.Nome.toLowerCase();
      const nomesPesquisa = pesquisa.toLowerCase().split(' ');
      return nomesPesquisa.some(nome => nomeCompleto.includes(nome));
    });

    resultadosFiltrados.forEach(procurado => {
      const nomeCompleto = procurado.Nome.toLowerCase();
      const nomesPesquisa = pesquisa.toLowerCase().split(' ');
      const totalNomesPesquisa = nomesPesquisa.length;
      let acertos = 0;
    
      nomesPesquisa.forEach(nome => {
        if (nomeCompleto.includes(nome)) {
          acertos++;
        }
      });
    
      const porcentagemAcerto = (acertos / totalNomesPesquisa) * 100;
      procurado.PrecisaoBusca = porcentagemAcerto;
    });

    const resultadosFiltradosPorPorcentagem = resultadosFiltrados.filter(procurado => procurado.PrecisaoBusca > porcentagemMinima);

    res.send(resultadosFiltradosPorPorcentagem)


  })

}

module.exports = {
  getAllProcurados,
  getProcuradoByNome
};