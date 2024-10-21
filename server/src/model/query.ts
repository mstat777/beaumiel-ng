import pool from '../config/db';

export function find(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, res) => {
            if (err) reject(err)
            else resolve(res);
        });
    });
}

export function queryWithValue(query: string, value: any): Promise<any> {
    return new Promise((resolve, reject) => {
        pool.query(query, [value], (err, res) => {
            if (err) reject(err)
            else resolve(res);
        });
    });
}

export function queryWithArray(query: string, arr: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
        pool.query<any[]>(query, arr, (err, res) => {
            if (err) reject(err)
            else resolve(res);
        });
    });
}

export function queryWithObject(query: string, obj: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        pool.query<any>(query, [...Object.values(obj)], (err, res) => {
            if (err) reject(err)
            else resolve(res);
        });
    });
}