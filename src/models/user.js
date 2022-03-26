export default class UserModel {
    async get({ username }) {
        if(username) {
            return await mysqlQuery(`
            SELECT id, name FROM user
            where name = :username LIMIT 1;`,
            { username })
        } else {
            throw new Error("Username not provided");
        }
    }

    async setAlertType({ user_id, type, email, webhook_url }) {
        await mysqlQuery(
            `INSERT INTO user_alert_type (user_id, type, webhook_url, email)
            values (:user_id, :type, :webhook_url, :email)
            ON DUPLICATE KEY UPDATE
            updated = now(),
            type = :type,
            webhook_url = :webhook_url,
            email = :email;
            `, 
            { user_id, type, webhook_url, email }
        )
    }

    async getAlertType({ userId }) {
        return await mysqlQuery(`SELECT * FROM user_alert_type 
            where user_id = :userId;`, 
            { userId }
        )
    }
}