(function(){
    console.log('login.js')
})();


function getLogin(){
    const uid = document.getElementById("uid").value;

    // 비밀번호 암호화 sha256
    const upw = CryptoJS.SHA256(document.getElementById("upw").value).toString();
    //  0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c
    document.location.href = `/getLogin?uid=${uid}&upw=${upw}`;
}