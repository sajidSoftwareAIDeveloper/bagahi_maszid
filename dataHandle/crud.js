import { MongoClient } from "mongodb";

export async function ConnectMongo() {
    const url =
    "mongodb+srv://bagahi_maszid:zmr1EYTvNFl9oovl@cluster0.x2beiqv.mongodb.net/bagahi_masjid?retryWrites=true&w=majority&appName=Cluster0";
    const client = await MongoClient.connect(url); 
    return client;   
}
  // insert all data 
export async function PostData(data,collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).insertMany(data);
  client.close();
  return result;
}


export async function UpdateData(id,data,collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).updateOne(id,{$set:data});
  client.close();
  console.log(result);
  return result;
}
/*
export async function DeleteData(id){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection("crud").deleteOne(id);
  client.close();
  return result;
}
export async function FindAllData(){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection("crud").find().toArray();
  client.close();
  return result;
}
*/ 

// validate login value
export async function SearchEmailPassword(data,collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).findOne(data);
  client.close();
  return result;  
}   

 // find the value using uniq id    
export async function findSingleValueUsingId(_id,collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).findOne({_id});
  client.close();
  return result;
}  

// find the value using userId  
export async function storeLogin(data,collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).insertOne(data);
  client.close();
  return result;
}  

// find data
export async function findValueUsingId(id,collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).
  find(id).toArray();
  client.close();
  return result;
}  
export async function findValueUsingCollect(collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).find().toArray();
  client.close();
  return result;
} 
