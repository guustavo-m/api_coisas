const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do arquivo do banco de dados
// __dirname = diretório atual do arquivo
const dbPath = path.resolve(__dirname, '../config/coisa.db');

// Criar/abrir a conexão com o banco
const db = new sqlite3.Database(dbPath, (erro) => {
  if (erro) {
    console.error('❌ Erro ao conectar:', erro);
  } else {
    console.log('✅ Conectado ao SQLite!');
  }
});
// Criar a tabela se não existir

db.serialize(() => {
  db.run(`
      create table if not exists Coisa (
      id integer primary key autoincrement not null,
      nomec varchar(50) not null,
      tipoc varchar(30) not null,
      valor decimal(8,2) not null,
      dtcoisa date not null,
      qtdc integer not null
      )
  `, (erro) => {
    if (erro) {
      console.error('❌ Erro ao criar tabela:', erro);
    } else {
      console.log('✅ Tabela coisas verificada/criada');
    }
  });
});

// IMPORTANTE: Exportar o objeto 'db' diretamente
// NÃO exportar dentro de um objeto { db }
module.exports = db;
