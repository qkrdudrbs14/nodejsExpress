module.exports = {
    secretKey: 'secretKey',    // 원하는 시크릿키
    option : {
        algorithm: 'HS256', // 해싱 알고리즘
        expresIn : "30m",   // 토큰 유효기간
        issuer: "issuer" //발행자
    }
}