module.exports = (sequelize,Sequelize) => {
    const Ator = sequelize.define("Ator", {
        nome: Sequelize.STRING
    });

    /* 1 - N */
    Ator.associate = (models) => {
        Ator.belongsToMany(models.Filme, {
           through: 'AtorFilmes'
        });
    };
    
    return Ator
}