import db from "./SQLiteDatabase";

db.transaction((tx) => {
  // tx.executeSql("DROP TABLE categories;");

  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, notificationSound TEXT, icon TEXT, minutes INTEGER);"
  );
});

const createCategory = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO categories (title, notificationSound, icon, minutes) VALUES (?, ?, ?, ?);",
        [obj.title, obj.notificationSound, obj.icon, parseInt(obj.minutes)],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting object: " + JSON.stringify(obj));
        },
        (_, error) => reject(error)
      );
    });
  });
};

const getCategories = () => {
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

const deleteCategory = (id) => {
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

const updateCategory = ({ id, title, notificationSound, icon, minutes }) => {
  console.log(id, title, notificationSound, icon, minutes)
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE categories SET title = ?, notificationSound = ?, icon = ?, minutes = ? WHERE id = ?;",
        [title, notificationSound, icon, minutes, id],
        (_, { rowsAffected }) => resolve(rowsAffected),
        (_, error) => reject(error)
      );
    });
  });
};

const categoryActions = {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};

export default categoryActions ;
