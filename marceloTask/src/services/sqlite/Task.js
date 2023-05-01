import db from "./SQLiteDatabase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
    //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
    // tx.executeSql("DROP TABLE tasks;");
    //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL, createdAt DATE, duration DATE NOT NULL, status BOOLEAN DEFAULT 0);"
    );
});

/**
 * CRIAÇÃO DE UM NOVO REGISTRO
 * - Recebe um objeto;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
 *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
 */
const create = (obj) => {
    console.log("create")
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificávelr
            tx.executeSql(
                "INSERT INTO tasks (title, description, createdAt, duration) values (?, ?, datetime('now'), ?);",
                [obj.title, obj.description, obj.duration],
                //-----------------------
                (_, { rowsAffected, insertId }) => {
                    if (rowsAffected > 0) resolve(insertId);
                    else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
                },
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

/**
 * BUSCA TODOS OS REGISTROS DE UMA DETERMINADA TABELA
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise é uma lista (Array) de objetos;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso não existam registros.
 */
const all = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "SELECT * FROM tasks;",
          [],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };

  /**
 * DELETAR UM REGISTRO
 * - Recebe um id como parâmetro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o número de linhas afetadas (deletadas);
 *  - Pode retornar erro (reject) caso ocorra erro no SQL.
 */
const remove = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "DELETE FROM tasks WHERE id = ?;",
                [id],
                //-----------------------
                (_, { rowsAffected }) => resolve(rowsAffected),
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

/**
 * ATUALIZAR UM REGISTRO
 * - Recebe um objeto como parâmetro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o número de linhas afetadas (atualizadas);
 *  - Pode retornar erro (reject) caso ocorra erro no SQL ou nos parâmetros.
 */
const update = (obj) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "UPDATE tasks SET title = ?, description = ?, duration = ? WHERE id = ?;",
                [obj.title, obj.description, obj.duration, obj.id],
                //-----------------------
                (_, { rowsAffected }) => resolve(rowsAffected),
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

const actions = {
    create,
    all,
    remove,
    update,
}

export default actions;