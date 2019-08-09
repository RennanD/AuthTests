const  { User } = require('../models')


class UserController {
    async store(req, res){
        const { email, password} = req.body

        const user = await User.findOne({where: { email } })

        if(!user) {
            return res.status(401).json({error: 'User not found'})
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({error: 'Invalid password'})
        }

        return res.json({ user })
    }
}

module.exports = new UserController()