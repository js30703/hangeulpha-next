import { Database, OPEN_READONLY } from "sqlite3"
import {db as FireStore } from '_firebase/admin'


export let dbReadOnly = new Database("./verbs.db", OPEN_READONLY, (err:any) => {
  if (err && err?.code == "SQLITE_CANTOPEN") {
    console.log("error: SQLITE_CANTOPEN");
    return;
  } else if (err) {
    console.log("Getting error " + err);
    process.exit(1);
  }
});

export function getRandomVerbs(level:string|string[]){
  return new Promise((resolve, reject) =>{
    const sql = `select * from verbs where level=${level} order by random() limit 5;`;
    let data:any = []
    dbReadOnly.all(sql, function(err:any, rows:any[]) {
      if (err) { reject(err) }
      resolve(rows)
    })
  })
}


export function verbsToFirebase(){
  dbReadOnly.all('select * from verbs;', function(err:any, rows:any[]) {
    if (err) { console.log(err) }
    console.log(rows.length)
  })
}