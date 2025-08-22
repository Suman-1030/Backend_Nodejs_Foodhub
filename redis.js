const redis = require('redis')

const redisClient = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    },
    password: process.env.REDIS_PASSWORD
  });

  redisClient.connect()
  .then(()=>{
    console.log('Redis Connected Successfully')})

  .catch((err)=>{
    console.log('Redis Connection error',err)
  })
  

module.exports=redisClient;