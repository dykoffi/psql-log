const { psqlLog } = require('./libs/utils');


let searching = {
    path: "/var/log/postgresql/postgresql-13-main.log",
    // user: "oscav",
    // type: "fatal",
    // bd: "winhealth"
}


psqlLog(searching)
    .then(data => {
        console.log(data);
    })

module.exports = psqlLog