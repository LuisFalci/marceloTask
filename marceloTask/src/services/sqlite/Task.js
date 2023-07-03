import db from "./SQLiteDatabase";

db.transaction((tx) => {
    //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
    // tx.executeSql("DROP TABLE IF EXISTS tasks;");
    //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL, createdAt TEXT, date TEXT NOT NULL, time TEXT NOT NULL, status BOOLEAN DEFAULT 0, category TEXT, notificationId TEXT);"
    );
});

const createTask = (obj) => {
    const createdAt = Date.now().toString();

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO tasks (title, description, createdAt, date, time, category, notificationId) VALUES (?, ?, ?, ?, ?, ?, ?);",
                [obj.title, obj.description, createdAt, obj.date, obj.time, obj.category, obj.notificationId],
                (_, { rowsAffected, insertId }) => {
                    if (rowsAffected > 0) resolve(insertId);
                    else reject("Error inserting obj: " + JSON.stringify(obj));
                },
                (_, error) => reject(error) 
            );
        });
    });
};


const getTasks = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM tasks;",
                [],
                (_, { rows }) => resolve(rows._array),
                (_, error) => reject(error)
            );
        });
    });
};

const deleteTask = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM tasks WHERE id = ?;",
                [id],
                (_, { rowsAffected }) => resolve(rowsAffected),
                (_, error) => reject(error)
            );
        });
    });
};

const updateTask = (obj) => {
    const updatedAt = Date.now().toString();

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE tasks SET title = ?, description = ?, createdAt = ?, date = ?, time = ?, status = ?, category = ?, notificationId = ? WHERE id = ?;",
                [obj.title, obj.description, updatedAt, obj.date, obj.time, obj.status, obj.category, obj.notificationId, obj.id],
                (_, { rowsAffected }) => resolve(rowsAffected),
                (_, error) => reject(error)
            );
        });
    });
};

const actions = {
    createTask,
    getTasks,
    deleteTask,
    updateTask,
};

export default actions;
