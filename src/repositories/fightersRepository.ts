import connection from "../db.js";

export async function list (){
    const { rows: fighters } = await connection.query(`
        SELECT  username, wins, losses, draws 
          FROM  fighters 
      ORDER BY  wins DESC, draws DESC
    `);

    if (!fighters.length) return null;

    return fighters;
}

export async function insert(username: string){
    const result = await connection.query(`
        INSERT INTO  fighters ( username )
             VALUES  ( $1 )
    `,[ username]);

    if (!result.rowCount) return false;

    return true;
}

export async function find(column: string, value: any){
    const { rows: [fighter]} = await connection.query(`
        SELECT  * 
          FROM  fighters 
         WHERE  ${column} = $1
    `,[value]);

    if (!fighter) return null;

    return fighter;
}

export async function update(username: string, column: string){
    const result = await connection.query(`
        UPDATE  fighters
           SET  ${column} = ${column} + 1
         WHERE  username = $1
    `, [ username]);

    if (!result.rowCount) return false;

    return true;
}