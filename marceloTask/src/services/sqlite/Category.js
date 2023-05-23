import db from "./SQLiteDatabase";

db.transaction((tx) => {
  // tx.executeSql("DROP TABLE categories;");

  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL);"
  );
});

const create = ({ id, title }) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO categories (id, title) VALUES (?, ?);",
        [id, title],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting object: " + JSON.stringify({ id, title }));
        },
        (_, error) => reject(error)
      );
    });
  });
};

const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM categories;",
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM categories WHERE id = ?;",
        [id],
        (_, { rowsAffected }) => resolve(rowsAffected),
        (_, error) => reject(error)
      );
    });
  });
};

const update = ({ id, title }) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE categories SET title = ? WHERE id = ?;",
        [title, id],
        (_, { rowsAffected }) => resolve(rowsAffected),
        (_, error) => reject(error)
      );
    });
  });
};

const actionsCategory = {
  create,
  all,
  remove,
  update,
};

export default actionsCategory;
