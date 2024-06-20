'use strict'

const shopModel = require("../models/shop.model")
const bycrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const { getInfoData } = require("../utils")
const { BadRequsetError } = require("../core/error.response")

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {

    static signUp = async ({ name, email, password }) => {

        // try {
        //step 1: check email exists??
        //Kiểm tra xem email của shop đã tồn tại trong cơ sở dữ liệu hay chưa. Nếu đã tồn tại, nó sẽ trả về thông báo lỗi.
        const holderShop = await shopModel.findOne({ email }).lean() // lean giup giam tai, tra ve 1 object java thuan thuy

        if (holderShop) {
            throw new BadRequsetError('Error: Shop already registere!')
        }
        //step 2: Nếu email chưa tồn tại, nó sẽ mã hóa mật khẩu của shop sử dụng thư viện bcrypt.
        const passwordHash = await bycrypt.hash(password, 10) //10 giup do bao mat cao( co the hon)

        const newShop = await shopModel.create({
            name, email, password: passwordHash, roles: [RoleShop.SHOP]
        })


        //step 3: Tạo cặp khóa công khai và riêng tư để sử dụng trong quá trình xác thực bằng token.
        if (newShop) {

            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            console.log({ privateKey, publicKey }) // save collection KeyStore

            //step 4: Lưu khóa công khai vào cơ sở dữ liệu (KeyStore).    
            const KeyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey
            })

            if (!KeyStore) {
                // throw new BadRequsetError('Error: KeyStore error')
                return {
                    code: 'xxx',
                    message: 'KeyStore error'

                }
            }

            // created token pair
            //step 5: Tạo cặp token (access token và refresh token) để xác thực người dùng.
            const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)
            console.log(`Create Token Success::`, tokens)

            return {
                code: 201,
                metadata: {
                    shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop }),
                    tokens
                }
            }
            //const token = await 

        }
        //step 6: Trả về thông tin của shop và cặp token nếu đăng ký thành công.
        return {
            code: 201,
            metadata: null
        }
        // } catch(error) {
        //     console.error(error);
        //     return {
        //         code: 'xxx',
        //         message: error.message,
        //         status: 'error'
        //     }
        // }
    }
}

module.exports = AccessService