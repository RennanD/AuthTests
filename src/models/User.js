module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.difine('User',{
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING
    })

    return Users
}