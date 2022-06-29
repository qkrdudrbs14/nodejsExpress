module.exports = {
    secretKey: 'dycni#3240',    // 원하는 시크릿키
    option : {
        algorithm: 'HS256', // 해싱 알고리즘
        expresIn : "30m",   // 토큰 유효기간
        issuer: "dycni" //발행자
    }
}