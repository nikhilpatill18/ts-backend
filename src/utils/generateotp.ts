export const generateOtp=():string=>{
    let otp=""
    let charString="ABCDEFGHIJKLMNOPQRSTUVWXYZ012456789"
    for(let i=0;i<6;i++){
        const randomIndex=Math.random()*36;
        otp=otp+charString.charAt(randomIndex);
    }
    return otp;
}