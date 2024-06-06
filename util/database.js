import * as SQLite from 'expo-sqlite/legacy';
import { Place } from '../models/Place';

const database = SQLite.openDatabase('places.db');

export function init() {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL, 
                    title TEXT NOT NULL, 
                    imageUri TEXT NOT NULL, 
                    address TEXT NOT NULL, 
                    lat REAL NOT NULL, 
                    lng REAL NOT NULL);`,
                [],
                () => resolve(),
                (_, error) => reject(error)
            );
        });
    });
}

export function insertPlace({ title, imageUri, address, location }) {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
                [title, imageUri, address, location.lat, location.lng],
                (_, result) => {
                    console.log(result);
                    resolve(result);
                },
                (_, error) => reject(error)
            );
        });
    });
}

export function fetchPlaces() {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places`,
                [],
                (_, result) => {
                    const places = [];
                    for (const dp of result.rows._array) {
                        places.push(new Place(dp.title, dp.imageUri, { adress: dp.address, lat: dp.lat, lng: dp.lng }, dp.id));
                    }
                    resolve(places);
                },
                (_, error) => reject(error)
            );
        });
    });
}