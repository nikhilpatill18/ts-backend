import { createClient } from 'redis';

const redisClient=createClient({
    url:'redis://localhost:6379'
});

redisClient.on('connect',()=>{
    console.log('redis Connected SuccessFully');
});

redisClient.on('error',(err)=>{
    console.log('Error in redis connecting',err);
});


// const connectClient=async()=>{
//     await redisClient.connect();
// }

//  connectClient();

export default redisClient;

