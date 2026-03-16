// Importar as funções do Model
const coisaModel = require('../models/coisaModel');

// ============================================================
// FUNÇÃO: listarTodos (ASSÍNCRONA)
// ROTA: GET /coisas
// DESCRIÇÃO: Lista todos os coisas do banco de dados
// ============================================================
// A palavra 'async' antes da função permite usar 'await' dentro dela
async function listarTodos(req, res) {
  try {
    // 'await' pausa a execução até a Promise do Model resolver
    // É como "esperar" o banco de dados responder
    const coisas = await coisaModel.listarTodos();
    
    // Depois que os dados chegam, enviar a resposta
    res.status(200).json(coisas);
  } catch (erro) {
    // Se der qualquer erro, cai aqui
    res.status(500).json({ 
      mensagem: 'Erro ao listar coisas', 
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorId (ASSÍNCRONA)
// ROTA: GET /coisas/:id
// ============================================================
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    // Validar o ID antes de consultar o banco
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    // Aguardar a busca no banco
    const coisa = await coisaModel.buscarPorId(id);
    
    if (coisa) {
      res.status(200).json(coisa);
    } else {
      res.status(404).json({ 
        mensagem: `Coisa ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar coisa',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: criar (ASSÍNCRONA)
// ROTA: POST /coisas
// ============================================================
async function criar(req, res) {
  try {
    const { nomec, tipoc, valor, dtcoisa, qtdc } = req.body;
    
    // Validações ANTES de tentar inserir no banco
    if (!nomec || !tipoc || !valor || !dtcoisa || !qtdc) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    if (parseFloat(valor) <= 0) {
      return res.status(400).json({ 
        mensagem: 'O valor deve ser maior que zero' 
      });
    }
    
    if (parseInt(qtdc) < 0) {
      return res.status(400).json({ 
        mensagem: 'A quantidade não pode ser negativo' 
      });
    }
    
    // Aguardar a inserção no banco
    const novacoisa = await coisaModel.criar({ 
      nomec,
      tipoc,
      valor,
      dtcoisa,
      qtdc
    });
    
    // Retornar o coisa criado com status 201
    res.status(201).json(novacoisa);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar coisa',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: atualizar (ASSÍNCRONA)
// ROTA: PUT /coisas/:id
// ============================================================
async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nomec, tipoc, valor, dtcoisa, qtdc } = req.body;
    
    // Validações
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!nomec || !tipoc || !valor || !dtcoisa || !qtdc) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    // Aguardar a atualização no banco
    const coisaAtualizada = await coisaModel.atualizar(id, { 
      nomec,
      tipoc,
      valor,
      dtcoisa,
      qtdc
    });
    
    if (coisaAtualizada) {
      res.status(200).json(coisaAtualizada);
    } else {
      res.status(404).json({ 
        mensagem: `Coisa ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar coisa',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: deletar (ASSÍNCRONA)
// ROTA: DELETE /coisas/:id
// ============================================================
async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    // Aguardar a deleção no banco
    const deletado = await coisaModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Coisa ${id} removida com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Coisa ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar coisa',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorNome (ASSÍNCRONA)
// ROTA: GET /coisas/categoria/:categoria
// ============================================================
async function buscarPorNome(req, res) {
  try {
    const { nomec } = req.params;
    
    // Aguardar a busca no banco
    const name = await coisaModel.buscarPorNome(nomec);
    
    res.status(200).json(name);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar coisas por nome',
      erro: erro.message 
    });
  }
}

// ============================================================
// EXPORTAR TODAS AS FUNÇÕES
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorNome
};
