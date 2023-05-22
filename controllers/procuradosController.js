const db = require('../database.js')


const getAllProcurados = (req, res) => {
    db.query("SELECT p.id, p.nome, p.genero, p.dataNascimento, p.localNascimento, JSON_ARRAYAGG(a.descricao) AS acusacoes, SUM(a.severidade) AS severidadeTotal, JSON_ARRAYAGG(JSON_OBJECT('descricao', e.descricao, 'dataEvidencia', e.dataEvidencia, 'imagens', e.imagens)) AS evidencias FROM Procurado p LEFT JOIN Acusacao a ON p.id = a.procurado_id LEFT JOIN Evidencia e ON a.id = e.acusacao_id GROUP BY p.id, p.nome, p.genero, p.dataNascimento, p.localNascimento ORDER BY severidadeTotal DESC;", (err, rows) => {
      res.send(rows)
    })
}

const getProcuradoByNome = (req, res) => {
  const pesquisa = req.params.name;
  const porcentagemMinima = req.params.precisao;
  //console.log(pesquisa)
  db.query("SELECT p.id, p.nome, p.genero, p.dataNascimento, p.localNascimento, JSON_ARRAYAGG(a.descricao) AS acusacoes, SUM(a.severidade) AS severidadeTotal, JSON_ARRAYAGG(JSON_OBJECT('descricao', e.descricao, 'dataEvidencia', e.dataEvidencia, 'imagens', e.imagens)) AS evidencias FROM Procurado p LEFT JOIN Acusacao a ON p.id = a.procurado_id LEFT JOIN Evidencia e ON a.id = e.acusacao_id GROUP BY p.id, p.nome, p.genero, p.dataNascimento, p.localNascimento ORDER BY severidadeTotal DESC;", (err, resultados) => {
    
    const resultadosFiltrados = resultados.filter(procurado => {
      const nomeCompleto = procurado.nome.toLowerCase();
      const nomesPesquisa = pesquisa.toLowerCase().split(' ');
      return nomesPesquisa.some(nome => nomeCompleto.includes(nome));
    });

    resultadosFiltrados.forEach(procurado => {
      const nomeCompleto = procurado.nome.toLowerCase();
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

const getProcuradoByRG = (req, res) => {
  const rg = req.params.rg;
  
  db.query("SELECT p.id, p.nome, p.genero, p.dataNascimento, p.localNascimento, p.rg, p.cpf, JSON_ARRAYAGG(a.descricao) AS acusacoes, SUM(a.severidade) AS severidadeTotal, JSON_ARRAYAGG(JSON_OBJECT('descricao', e.descricao, 'dataEvidencia', e.dataEvidencia, 'imagens', e.imagens)) AS evidencias FROM Procurado p LEFT JOIN Acusacao a ON p.id = a.procurado_id LEFT JOIN Evidencia e ON a.id = e.acusacao_id GROUP BY p.id, p.nome, p.genero, p.dataNascimento, p.localNascimento, p.rg, p.cpf ORDER BY severidadeTotal DESC;", (err, rows) => {
    const usuarioEncontrado = rows.find(usuario => usuario.rg === rg);

  if (usuarioEncontrado) {
    res.json(usuarioEncontrado);
  } else {
    res.status(404).json({ error: 'Usuário não encontrado.' });
  }
  })
  
}

module.exports = {
  getAllProcurados,
  getProcuradoByNome,
  getProcuradoByRG
};