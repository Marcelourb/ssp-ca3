// defining a Class to reflect into database

module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("job", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        publishedAt: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW
        },
        salary: {
            type: Sequelize.FLOAT
        },
        company: {
            type: Sequelize.STRING
        }
    });

    return Job;
};
