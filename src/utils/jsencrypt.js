import JSEncrypt from 'jsencrypt/bin/jsencrypt'

const publicKey =
  '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDZWVDfaDbhPNYIU4gUsfawpXXTBQA0xf1nrW+g2pFYED+jDyQkcumpEl2cAEvF9vJbB7rVIJQFyJfmg0J9XO5X0jDtykJkedHWqi7z9AS056UAXhUQcJ+rGwVDu2oBMT/tbCCbRDzuaLcrd5PPQCI1fIrsNQ511cWH6Hv3Lg3JcwIDAQAB-----END PUBLIC KEY-----'

const privateKey =
  '-----BEGIN RSA PRIVATE KEY-----MIICWwIBAAKBgQDZWVDfaDbhPNYIU4gUsfawpXXTBQA0xf1nrW+g2pFYED+jDyQkcumpEl2cAEvF9vJbB7rVIJQFyJfmg0J9XO5X0jDtykJkedHWqi7z9AS056UAXhUQcJ+rGwVDu2oBMT/tbCCbRDzuaLcrd5PPQCI1fIrsNQ511cWH6Hv3Lg3JcwIDAQABAoGAJtlCDUyRUp0PHJnhnuFYWKaacsdYDBa/foKPi07F39m3piuUqDcp8KBpvvKGmLHVC9RL3sBd9NKv4/HeNo4fw5pPBjGbqcekYKb2QcA+Mc9HuZojdE6awl1Rf2it9jCadijlh7LN4U8748E2qXwFnRThSPypQ+mbZWyoLn4EaIECQQD3yku9AmP9qMtHyk4q/qMx3+Rtq49ohsngSa8EhtrYNjaFBRll7wlFg0p/W9JGb5+IDi4xEmJhTMFlBfWoFBUhAkEA4IzSuqTwHArKtds2ficGLriiChbt3T1a6XArBg6TsZ7f3x2XoLp21j/rsqA3qSmqv9q32pZaowlL6QxAENE4EwJAfkZzbnDnb/8zCPTJ/RMjK2mDyXfib0wxWMF0FYR7xi9qfUNp/A5i1S/hKSIr+IUt8XH4jD1oMVmiPM9arzr8wQJAXQm8Hl1MpzHJf8QONgLRSvZxHSEW+T38txAko2PSyht7wqQuOQhJSMg/TkmYBl0fRFLJLqZxc2/cpfjPaqhlRQJAOiO+BzClFXLlhlozxMc1zvVVvFOMXGSlzxdINC7jDbhGchT5nlMu6vn5sgA6Vb3TRW0w98EmxOLcQwpVNiaD5g==-----END RSA PRIVATE KEY-----'

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}
