import {
    ICrud
} from "./interfaces/icrud";

import * as Sequelize from 'sequelize';

export class Postgres extends ICrud {
    constructor() {
        super();
        this._driver = null;
        this._audio = null;
    }

    async isConnected() {
        try {
            await this._driver.authenticate();
            return true;
        } catch (err) {
            console.log('Connection`s fail ', err);
            return false;
        }
    }

    async defineModel() {
        this._audio = this._driver.define('audio', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: Sequelize.STRING,
                required: true,
            },
            audioUrl: {
                type: Sequelize.STRING,
                required: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                required: true,
            },
            updatedAt: {
                type: Sequelize.DATE,
                required: true,
            },
            createdBy: {
                type: Sequelize.STRING,
                required: true,
            },
            updatedBy: {
                type: Sequelize.STRING,
                required: true,
            },
        }, {
            tableName: 'TB_AUDIO',
            freezeTableName: false,
            timestamps: false,
        })
        await this._audio.sync()
    }

    async connect() {
        this._driver = new Sequelize(
            'postgres',
            'joaotavares',
            'senhaaleatoria', {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false,
            }
        );
        await this.defineModel();
        console.log('PostgreSQL connected');
    }

    async create(item) {
        console.log('O item foi salvo no Postgres');
        // this._driver.query()
    }
    async read(query) {
        console.log('Foi lido o dados requeridos');
        const {
            dataValues
        } = await this._driver.query(query);
        console.log(dataValues);
        return dataValues;
    }
    async update(id, item) {
        console.log('Foi atualizado do item');
    }
    async delete(id) {
        console.log('O Item foi deletado com sucesso');
    }
}

const createAudioQuery = (userId, audioUrl) => (
    `INSERT INTO TB_AUDIOS VALUES (
        ${userId}, 
        ${audioUrl}), 
        ${new Date()},
        ${new Date()},
        ${userId},
        ${userId},
`);

const createInfoQuery = (username, location, phoneNumber, createdAt, inputText1, inputText2) => (
    `INSERT INTO TB_INFO VALUES (
        ${username}, 
        ${location}, 
        ${phoneNumber}, 
        ${createdAt}, 
        ${inputText1}, 
        ${inputText2})
`);

const readInfoQuery = (filterType, filterValue) => (
    `SELECT * FROM TB_INFO ${filterType !== null ? `WHERE ${filterType}=${filterValue};` : ';'}
`);

const readAudioQuery = (userId) => (
    `SELECT * FROM TB_AUDIO ${userId !== null ? `WHERE userId=${userId};` : ';'}
`);

const deleteInfoQuery = (id) => (
    `DELETE FROM TB_INFO WHERE=${id}
`);

const deleteAudioQuery = (userId) => (
    `DELETE FROM TB_AUDIO WHERE=${userId}
`);