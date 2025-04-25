/**
 * Executes a query on the SQLite database.
 * @param {string} query - The SQL query to execute.
 * @param {Array} params - The parameters for the query.
 * @returns {Promise} - Resolves with the query result.
 */
function executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
}

/**
 * Fetches all rows from a query.
 * @param {string} query - The SQL query to execute.
 * @param {Array} params - The parameters for the query.
 * @returns {Promise<Array>} - Resolves with the rows.
 */
function fetchAll(query, params = []) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

/**
 * Fetches a single row from a query.
 * @param {string} query - The SQL query to execute.
 * @param {Array} params - The parameters for the query.
 * @returns {Promise<Object>} - Resolves with the row.
 */
function fetchOne(query, params = []) {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

/**
 * Fetches user details by Gmail.
 * @param {string} gmail - The Gmail address to search for.
 * @returns {Promise<Object>} - Resolves with the user details.
 */
function fetchUserByGmail(gmail) {
    const query = "SELECT name, gender, dob, house FROM stu_info WHERE gmail = ?";
    return fetchOne(query, [gmail]);
}

// Example usage:
// executeQuery("INSERT INTO users (name, age) VALUES (?, ?)", ["John Doe", 30]);
// fetchAll("SELECT * FROM users").then(rows => console.log(rows));
// fetchOne("SELECT * FROM users WHERE id = ?", [1]).then(row => console.log(row));
// fetchUserByGmail("example@gmail.com").then(user => console.log(user)).catch(err => console.error(err));