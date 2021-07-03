module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define("User", {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        userType: Sequelize.INTEGER(1)
    });

    User.associate = (models) => {
        User.hasMany(models.Car, {
                foreingKey: "userId",
                as: "userid",
                onDelete: 'cascade'
        })
    }

    User.prototype.toJSON =  function () {
        var values = Object.assign({}, this.get());
      
        delete values.password;
        return values;
    }
      
    
    return User
}