 docker run -d -p 27017-27019:27017-27019 --name mongodb mongo
faf2647f79dcdf89f20555e12f6e8a26079bd7edede1a1c2ecf1f385219143cb

2. Copy the connection string, then open MongoDB Compass
mongodb+srv://admin:<password>@node2024db.tvcomop.mongodb.net/


Restart the Docker Container: Sometimes, simply restarting the Docker container can resolve the issue. You can use the command docker restart mongodb to restart the mongodb container:  
docker restart mongodb