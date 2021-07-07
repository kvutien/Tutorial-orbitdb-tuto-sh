/*
 * create an orbitDB key-value database of pet animals
 */
const IPFS = require('ipfs-http-client');
const OrbitDB = require('orbit-db');

async function main () {
    const ipfsOptions = {/*    EXPERIMENTAL: {
        pubsub: true
      }*/
   };    // placeholder
    const ipfs = await IPFS.create(ipfsOptions);
    console.log('-> IPFS node created');
    const orbitdb = await OrbitDB.createInstance(ipfs);
    console.log('-> OrbitDB instance created');
    
    // First stage, create and populate database with 2 key-value pairs
    // in OrbitDB, 1 database = 1 pet
    const db1 = await orbitdb.keyvalue('pet-animals');
    await db1.put('species', 'German Shepherd');
    await db1.put('owner', 'myself');
    await db1.close();

    // 2nd stage, use the database
    const db2 = await orbitdb.keyvalue('pet-animals');
    await db2.load();
    let species = db2.get('species');
    console.log(' -> database value of "species" = ', species);
    let owner = db2.get('owner');
    console.log(' -> database value of "owner" = ', owner);
    await db2.close();
}
main();