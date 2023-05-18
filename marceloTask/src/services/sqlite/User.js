import db from './SQLiteDatabase'

db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  // tx.executeSql("DROP TABLE tasks;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);"
  );
});

// Função para buscar usuários 
export const getUser = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM users;",
        [],
        //-----------------------
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
  }

// Função para criar um novo usuário
const create = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (name) VALUES (?)',
        [name],
        (_, result) => {
          resolve(result.insertId)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

// Função para atualizar os dados de um usuário existente
const update = (userId, name) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE users SET name = ? WHERE id = ?',
        [name, userId],
        (_, result) => {
          resolve(result.rowsAffected)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

// Função para deletar todos os usuários
const deleteAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM users',
        [],
        (_, result) => {
          resolve(result.rowsAffected)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

const actions = {
    create,
    update,
    getUser,
    deleteAllUsers,
}

export default actions;