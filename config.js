var config = {}

config.host = process.env.HOST || "https://funwithcitang.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "o79dfAq6jlovKDytTlvlfo2avKvzcfgZo3pN9lvubNh4loT7f8IKCns3SwrX8A5OxmhI5LEmrp2tFECKoeaWdA==";
config.databaseId = "ToDoList";
config.collectionId = "Items";

module.exports = config;