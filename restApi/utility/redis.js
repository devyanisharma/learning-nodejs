const  { createClient } = require('redis');

const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));
(async () => {
  try {
    await client.connect();
    await client.set('redis client status', 'redis client initiated');
    
   // const value = await client.get('key');
   // await client.disconnect();
  } catch (error) {
    console.log(error)
  }
})().catch((error)=>{
  console.log("redis client catch error",error)
})


//configuration of redis instance
// const redisClient = redis.createClient(
//     {
//       port: 6379,
//       host: 'localhost'
//     }

//   )

module.exports = {
  redisClient: client
}