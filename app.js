// ============================================================
// APP.JS - Arquivo Principal da Aplicação (SQLite)
// ============================================================

// Importar o Express
const express = require('express');
const app = express();
const PORT = 3000;

// ============================================================
// MIDDLEWARES
// ============================================================

// Middleware para processar JSON no body das requisições
app.use(express.json());

// ============================================================
// IMPORTAR ROTAS
// ============================================================

// Importar as rotas de produtos
const coisaRoutes = require('./src/routes/coisaRoutes');

// ============================================================
// REGISTRAR ROTAS
// ============================================================

// Todas as rotas de produtos ficarão disponíveis em /produtos
app.use('/coisas', coisaRoutes);

// ============================================================
// ROTA RAIZ (Boas-vindas)
// ============================================================

app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API de Coisas com SQLite - Bem-vindo!',
    versao: '2.0',
    banco: 'SQLite',
    rotas_disponiveis: {
      listar_todos: 'GET /coisas',
      buscar_por_id: 'GET /coisas/:id',
      buscar_por_nome: 'GET /coisas/nome/:nome',
      criar: 'POST /coisas',
      atualizar: 'PUT /coisas/:id',
      deletar: 'DELETE /coisas/:id'
    }
  });
});

// ============================================================
// INICIAR O SERVIDOR
// ============================================================

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor rodando!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco de Dados: SQLite`);
  console.log(`📂 Arquivo do banco: database.sqlite`);
  console.log('='.repeat(50));
  console.log('📋 Rotas disponíveis:');
  console.log(`   GET    http://localhost:${PORT}/coisas`);
  console.log(`   GET    http://localhost:${PORT}/coisas/:id`);
  console.log(`   POST   http://localhost:${PORT}/coisas`);
  console.log(`   PUT    http://localhost:${PORT}/coisas/:id`);
  console.log(`   DELETE http://localhost:${PORT}/coisas/:id`);
  console.log('='.repeat(50));
});
