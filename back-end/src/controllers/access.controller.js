'use strict'

const AccessService = require("../services/access.service")

const { CREATE } = require('../core/success.response')

class AccessController {

    signUp = async (req, res, next) => {

        // return res.status(200).json({
        //     message: '',
        //     metadata: 
        // })
        new CREATE({
            message: 'Regiserted OK!',
            metadata: await AccessService.signUp(req.body),
            options: {
                limit: 10
            }

        }).send(res)

    }
}

module.exports = new AccessController()