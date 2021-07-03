module.exports = (sequelize,Sequelize) => {
    const CarEvent = sequelize.define("CarEvent", {
        name: Sequelize.STRING,
        location: Sequelize.STRING,
        duration: Sequelize.INTEGER
    });

    CarEvent.associate = (models) => {
        CarEvent.belongsToMany(models.Car, {
            through: 'CarEventCars'
        });
    };
    
    return CarEvent
}