const Sequelize = require('sequelize');
const driver = new Sequelize(
    'postgres',
    'joaotavares',
    'senhaaleatoria', {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
    }
);

const Audio = driver.define('audio', {
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
await Audio.sync();

module.exports = Audio;