"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postMusic = `
    INSERT INTO music (name, album, artist, album_cover_url, song_url, date, genre)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
`;
const getMusic = `SELECT * FROM music;`;
const putMusic = `UPDATE music SET song_url = $1 WHERE id = $2;`;
exports.default = { postMusic, getMusic, putMusic };
