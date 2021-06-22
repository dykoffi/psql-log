<h1 align="center" style="color:grey;font-family:">PSQL LOG</h1>
<p style="font-size:18.5px; border-bottom:1px solid grey; padding-bottom:30px" align="justify">
    psql-log is a tool that allows consulting the logs recorded with Postgres.
</p>
<h1 style="color:#9fa8da;">Intallation</h1>

> yarn add psql-log
>
> npm i psql-log

<h1 style="color:#9fa8da;">Usage</h1>


```js
const psqlLog = require('psql-log')

let searching = {
    path: "/var/log/postgresql/postgresql-13-main.log",
    user: "test", //optional
    type: "STATEMENT", //optional
    bd: "test" //optional
}

//type : [STATEMENT, ERROR, FATAL, HINT, LOG]

psqlLog(searching)
    .then(data => {
        console.log(data);
    })

```
<p style="font-size:16.5px">
<b>NB : </b> the path may change depending on the version of Postgres
</p>
<h1 style="color:#9fa8da;">Contributors</h1>

- KOFFI Kouassi Edy
- YAO Bini Samuel
- JOHNSON Grâce Yénin Edwige

<h1 style="color:#9fa8da;">Licence</h1>
<p>
MIT License

Copyright (c) 2021

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</p>
<p align="center" style="font-size:12.5px">
LICENSE <code>MIT</code>
</p>