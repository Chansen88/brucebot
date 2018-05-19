const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const message = {
    id: { type: Sequelize.STRING, primaryKey: true },
    attachments: { type: Sequelize.ARRAY(Sequelize.TEXT) },
    avatar_url: { type: Sequelize.STRING },
    created_at: { type: Sequelize.INTEGER },
    group_id: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING },
    sender_id: { type: Sequelize.STRING },
    sender_type: { type: Sequelize.STRING },
    source_guid: { type: Sequelize.STRING },
    system: { type: Sequelize.BOOLEAN },
    text: { type: Sequelize.STRING(1234) },
    user_id: { type: Sequelize.STRING }
};

const Message = sequelize.define("message", message, { timestamps: true });
sequelize.sync();
exports.Message = Message;
