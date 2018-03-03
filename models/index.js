const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const message = {
    id: { type: Sequelize.STRING, primaryKey: true },
    attachments: Sequelize.ARRAY(Sequelize.TEXT),
    avatar_url: Sequelize.STRING,
    created_at: Sequelize.INTEGER,
    group_id: Sequelize.STRING,
    name: Sequelize.STRING,
    sender_id: Sequelize.STRING,
    sender_type: Sequelize.STRING,
    source_guid: Sequelize.STRING,
    system: Sequelize.BOOLEAN,
    text: Sequelize.STRING(1234),
    user_id: Sequelize.STRING
};

const Message = sequelize.define("message", message, { timestamps: true });
sequelize.sync({ force: true });
exports.Message = Message;
