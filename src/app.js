
require('dotenv').config({path : '.env'});

// console.log(process.env.PORT);

let express = require( 'express' );
let fs = require( 'fs' );
let app = express();
// let server = require( 'http' ).Server( app );

// var router = express();
let server = require( 'https' );
// var server = https.createServer(router);

app.listen(process.env.PORT1 , () => {
  console.log(
    `listening on port: ${process.env.PORT1 }, http://10.168.2.73:${
      process.env.PORT1 
    }`
  );
});

const options = {
  key: fs.readFileSync('/home/mahesh/Downloads/AI_Realated/MRD_Use_case_3/Video-Call-App-NodeJS/src/key.pem'),
  cert: fs.readFileSync('/home/mahesh/Downloads/AI_Realated/MRD_Use_case_3/Video-Call-App-NodeJS/src/cert.pem')
};

let load = server.createServer(options, app).listen(process.env.PORT2 , () => {
  console.log(
    `listening on port: ${process.env.PORT2 }, https://10.168.2.73:${
      process.env.PORT2
    }`
  );
});

let io = require( 'socket.io' )( load );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );



app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use(express.static(__dirname+'/assers'));
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );

io.of( '/stream' ).on( 'connection', stream );





// server.listen(process.env.PORT || 3006, () => {
//     console.log(
//       `listening on port: ${process.env.PORT || 3006}, http://10.168.2.73:${
//         process.env.PORT || 3006
//       }`
//     );
//   });

// server.listen( 3000 );
