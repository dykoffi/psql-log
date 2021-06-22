const { spawn } = require('child_process');


/**
 * Get date
 * @param {string} line 
 * @returns String
 */
const getDate = function (line) {
    let date = line.match(/\d{4}-\d{2}-\d{2}/)
    return date ? date[0] : date
}

/**
 * Get hour
 * @param {string} line 
 * @returns String
 */
const getHeure = function (line) {
    let heure = line.match(/\d{2}:\d{2}:\d{2}/)
    return heure ? heure[0] : heure
}

/**
 * Get user 
 * @param {string} line 
 * @returns String
 */
const getUser = function (line) {
    let user = line.match(/[A-Za-z0-9]+@/)
    return user ? user[0].replace("@", "") : "system"
}

/**
 * Get Db name 
 * @param {string} line 
 * @returns String
 */
const getDB = function (line) {
    let db = line.match(/@[A-Za-z0-9]+/)
    return db ? db[0].replace("@", "") : db
}

/**
 * Get type of output
 * @param {string} line 
 * @returns String
 */
const getType = function (line) {
    let sortie = line.match(/[A-Z]+:/)
    return sortie ? sortie[0].replace(":", "") : sortie
}

/**
 * Get output of an request
 * @param {string} line 
 * @returns String
 */
const getResultat = function (line) {
    let res = line.match(/:\s+.+/)
    return res ? res[0].replace(/(^:\s)/, "") : res
}

/**
 * 
 * @param {string} path 
 * @returns {Promise<Array<Object>>}
 */

const getAll = async function (path) {
    return new Promise((resolve, reject) => {
        ///var/log/postgresql/postgresql-13-main.log
        const cmd = spawn('cat', [path]);

        let query = ""
        let queries = []

        cmd.stdout.on('data', (data) => {
            let d = data.toString().split("\n")
            d.forEach(l => {
                let line = l.replace(/\s+/, " ")
                let id = line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+ GMT \[\d+\] ([A-Za-z0-9]+@[A-Za-z0-9]+ )?[A-Z]+:/)
                if (id === null) {
                    query += line
                } else {
                    queries.push(query)
                    query = line
                }
            });

            queries = queries
                .map(q => q.replace(/\s+/g, " "))
                .map(q => ({
                    user: getUser(q),
                    db: getDB(q),
                    type: getType(q),
                    output: getResultat(q),
                    date: getDate(q),
                    heure: getHeure(q)
                }))

        });

        cmd.on("close", (code, signal) => {
            resolve(queries)
        })

        cmd.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            reject(data)
        });
    })
}


/**
 * Get filtered request
 * @param {{user:string, path : string, db:string, type:string}} param0 
 * @returns {Promise<Array<Object>>}
 */

exports.psqlLog = async function psqlLog({ path, user, db, type }) {

    path = path || null
    user = user || null
    db = db || null
    type = type || null

    let queries = await getAll(path)

    return queries
        .filter(q => !user || q.user === user)
        .filter(q => !db || q.db === db)
        .filter(q => !type || q.type.toLowerCase() === type.toLowerCase())
}