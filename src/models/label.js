export default class LabelModel {
    async upsert(labels) {
        if (!labels || !labels.length) return;
        for (const { id, name, organization_id } of labels) {
            await mysqlQuery(`
                INSERT INTO label
                (id, name, organization)
                values
                (:id, :name, :organization)
                ON DUPLICATE KEY UPDATE
                name = IF(:name IS NULL, name, :name),
                organization = IF(:organization IS NULL, organization, :organization),
                updated = now()
            `, {
                id,
                name,
                organization: organization_id
            });
        }
    }

    async get({ organization, labelId }) {
        let where = ``
        if (labelId) where += ` AND id = :labelId`
        if (organization) where += ` AND organization = :organization`
        return await mysqlQuery(`
        SELECT * FROM label
        where true
        ${where};
        `, { organization, labelId })
    }
}