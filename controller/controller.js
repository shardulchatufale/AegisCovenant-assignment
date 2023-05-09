const { log } = require('console');
const geolib = require('geolib');
const https = require('https');
const querystring = require('querystring');
const { start } = require('repl');

// coordinates of location 1

const getFlights=async function(req,res){    //.......................................................................
try{
  let data=req.body

  if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please Enter data" })
if(!data.starting)return res.status(400).send({ status: false, message: 'Please enter starting point' })
if(!data.destination)return res.status(400).send({ status: false, message: 'Please enter destination' })

 function  getCoordinates(location) {
  const query = querystring.stringify({ q: location, format: 'json' });
  const options = {
    hostname: 'nominatim.openstreetmap.org',
    path: `/search?${query}`,
    headers: { 'User-Agent': 'Node.js' },
  };

  return new Promise((resolve, reject) => {
    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        const results = JSON.parse(data);
        if (results.length > 0) {
          const { lat, lon } = results[0];
          resolve({ latitude: lat, longitude: lon });
        } else {
          reject(new Error(`No results found for location: ${location}`));
        }
      });
    }).on('error', reject);
  })
}


let  a= await getCoordinates(data.starting)
console.log(a);

 let b= await getCoordinates(data.destination)

console.log(b);



console.log(a);
const location1 = {
  latitude:a.latitude,
  longitude: a.longitude,
}

const location2 = {
  latitude: b.latitude,
  longitude:b.longitude,
}

// // calculate the distance between the two locations in meters
const distance = (geolib.getDistance(location1, location2))/1000

// console.log(distance,"............64");
let obj={
  "indigo":Math.floor(distance*15),
  "airAsia":Math.floor(distance*25),
  "vistara":Math.floor(distance*35)
  
}
return res.status(201).send({ status: true, message: 'all flights', data: obj })
}catch{
  return res.status(500).send({ status: false, message: err.message })
}
}

module.exports.getFlights=getFlights