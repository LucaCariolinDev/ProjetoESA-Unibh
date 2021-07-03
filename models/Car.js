module.exports = (sequelize,Sequelize) => {
    const Car = sequelize.define("Car", {
        brand: Sequelize.STRING,
        model: Sequelize.STRING,
        year: Sequelize.INTEGER,
        horsePower:Sequelize.INTEGER
    });

    Car.associate = (models) => {
        Car.belongsTo(models.User, {
            foreingKey: 'userId'         
        }),
        Car.belongsToMany(models.CarEvent, {
            through: 'CarEventCars'
         });
    }
    
    return Car
}