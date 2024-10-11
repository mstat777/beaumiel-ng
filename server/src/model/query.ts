import pool from '../config/db';

export function find(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, res) => {
            if (err) reject(err)
            else resolve(res)
        });
    });
}

export function queryWithValue(query: string, value: any): Promise<any> {
    return new Promise((resolve, reject) => {
        //console.log(query);
        //console.log(value);
        pool.query<any[]>(query, [value], (err, res) => {
            if (err) reject(err)
            else {
                //console.log("queryWithValue - res");
                //console.log(res.length);
                //if (res) console.log("res is not empty");
                //resolve(res?.[0]);
                resolve(res);
            }
        });
    });
}

export function queryWithArray(query: string, arr: []): Promise<any[]> {
    return new Promise((resolve, reject) => {
        pool.query<any>(query, arr, (err, res) => {
            if (err) reject(err)
            else resolve(res?.[0])
        });
    });
}