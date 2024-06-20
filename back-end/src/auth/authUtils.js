'use strict'

const JWT = require('jsonwebtoken')
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // accessToken
        const accessToken = await JWT.sign(payload, privateKey, {
            //payload chua nhung thong tin van chuyen tu he thong nay qua he thong khac thong qua token
            //privateKey ko luu vao database no chi say ra 1 lan khi chung ta signin hoac login thanh cong de day qua brower
            // algorithm: 'RS256',
            expiresIn: '2 days'
        })

        const refreshToken = await JWT.sign(payload, privateKey, {
            // algorithm: 'RS256',
            expiresIn: '7 days'
        })


        //

        JWT.verify(payload, publicKey, (err, decode) => {
            if (err) {
                console.error(`error verify::`, err)
            } else {
                console.log(`decode verify::`, decode)
            }
        })
        return { accessToken, refreshToken }
    } catch (error) {

    }
}

module.exports = {
    createTokenPair
}