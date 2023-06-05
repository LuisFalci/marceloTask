const fs = require('fs');
const path = require('path');

function listarEstrutura(diretorio, nivel = 0) {
  const itens = fs.readdirSync(diretorio);

  itens.forEach((item) => {
    const caminho = path.join(diretorio, item);
    const stats = fs.statSync(caminho);
    const prefixo = '  '.repeat(nivel); // Espaços para indentação

    if (item !== 'node_modules') { // Verificação para ignorar a pasta node_modules
      if (stats.isFile()) {
        console.log(`${prefixo}- ${item}`);
      } else if (stats.isDirectory()) {
        console.log(`${prefixo}- ${item}/`);
        listarEstrutura(caminho, nivel + 1); // Chamada recursiva para listar arquivos dentro do diretório
      }
    }
  });
}

// Diretório que deseja listar
const diretorioRaiz = 'C:/Users/luisg/Documents/GitHub/marceloTask/marceloTask';
listarEstrutura(diretorioRaiz);
