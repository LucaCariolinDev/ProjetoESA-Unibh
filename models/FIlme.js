module.exports = (sequelize,Sequelize) => {
    const Filme = sequelize.define("Filme", {
        titulo: Sequelize.STRING
    });

    /* 1 - N */
    Filme.associate = (models) => {
        Filme.belongsToMany(models.Ator, {
            through: 'AtorFilmes'
        });
    };
    
    return Filme
}