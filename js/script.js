
var vm = new Vue({
  el: '#vmx',
  data: {
      contracts:[
        {"n":0,"name":"Agrigation Contract (Multi Oracles &  APIs)"},
        {"n":1,"name":"Service Level Agreement Contract (Multi Oracles & APIs)"}
      ],
      type:0,
      oracles:{"Mainnet":[{"n":"LinkPool","o":"0x240BaE5A27233Fd3aC5440B5a598467725F7D1cd","get":"487f4c87101e4d9e8f6941a37a681167"},
      {"n":"Fiews","o":"0x049Bd8C3adC3fE7d3Fc2a44541d955A537c2A484","get":"79d17c42a2694b408a6393a9ee8fbff2"},
      {"n":"ChainLayer","o":"0xF5a3d443FccD7eE567000E43B23b0e98d96445CE","get":"6b81ed67816648ec95ab9397f7a0df7d"}],
      "Ropsten":[{"n":"Omniscience","o":"0x83dA1beEb89Ffaf56d0B7C50aFB0A66Fb4DF8cB1","get":"2f9cdff5cb5f499bb13061dced947426"},
      {"n":"Cosmostation","o":"0x90eeb07A0DdB176D4c60deC3a146e2289DCB2674","get":"86d12771437e42b38c33dad5e2d8412f"},
      {"n":"LinkPool","o":"0x83F00b902cbf06E316C95F51cbEeD9D2572a349a","get":"63a2add7b67a4082aaacfa1b069e3fea"}]
    },
      oracle:[],
      jobs:[],
      nets: ["Mainnet", "Ropsten"],
      net:'Ropsten',
      urls:'',
      uarr:[],
      pathes:'',
      parr:[],
      result:'',
      agrig:["Median","Mean"],
      agr:'Median',
      multi:100,
      features:[{'n':0,'f':''},{'n':1,'f':'Anyone can requests to the smart contract'}, {'n':2,'f':'Called by the owner to destroy the contract'}, {'n':3,'f':'Withdraw any LINK balance available on the contract'}, {'n':4,'f':'Permission other addresses to generate new requests to the smart contract'}],
      feat:[],
      https:['get','post'],
      http:'get',
      hold:"<span class = 'point' onclick=\"window.open('https://rinkeby.etherscan.io/token/0x10d05006a637470a709f9d41cb61bcea96ebe9b6#balances')\">TOKEN HOLDERS</span>",
      cost:{'Mainnet':10,'Ropsten':1},
      count:1,
      client:'',
      provider:'',
      threshold:'',
      time:'',
      conds:['<','<=','==','>=','>','!='],
      cond:'<',
      demo:0,
  }
});

function gits() {
  var uu;
  if (vm.type == 0) {uu = "https://remix.ethereum.org/#gist=7d65a495c5bd1804414ce115a325f586&optimize=false&evmVersion=null&version=soljson-v0.4.24+commit.e67f0147.js"}
  else if (vm.type == 1) {uu = "https://remix.ethereum.org/#gist=7184c21e0b85dd9fbce12749f033a99b&optimize=false&evmVersion=null&version=soljson-v0.4.24+commit.e67f0147.js"}
  window.open(uu);
}
 
function demo() {
  if (vm.type == 1) {
    vm.client = "0xaad4ac820067ef4bb62a7fb2a6a98f2a2dfdfb33";
    vm.provider = "0xd62808C0bbc51f2370a184E08a1E24D3E3bE7483";
    vm.threshold = 9000;
    vm.time = 86400;
    vm.cond = '<';
  }
  vm.count = 4;
  vm.multi = 1;
  vm.net = "Ropsten";
  vm.oracle = ["0x83dA1beEb89Ffaf56d0B7C50aFB0A66Fb4DF8cB1","0x90eeb07A0DdB176D4c60deC3a146e2289DCB2674","0x83F00b902cbf06E316C95F51cbEeD9D2572a349a"];
  vm.urls = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD,\n'+
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
  vm.pathes = 'RAW.BTC.USD.PRICE,bitcoin.usd';
  vm.feat = [2,3,4];
  code(1);
  graph();
}
 
init();
 //EARTH
  var map, req, reqq; 
      function init() {
        map = WE.map('map', {
          center: [36.057944835, -112.18688965],
          zoom: 3,
          dragging: true,
          scrollWheelZoom: true,
          atmosphere: true,
          sky: true,
        });

        var baselayer = WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
          minZoom: 2,
          maxZoom: 5,
          attribution: 'NASA',
        
        }).addTo(map);

      

      // Start a simple rotation animation
      reqq = function() {
        var before = null;
        requestAnimationFrame(function animate(now) {
            var c = map.getPosition();
            var elapsed = before? now - before: 0;
            before = now;
            map.setCenter([c[0], c[1] + 0.1*(elapsed/200)]);
            req = requestAnimationFrame(animate);
        });
      }
       reqq();
     
      }

      function panTo(coords) {
        cancelAnimationFrame(req);
        map.panTo(coords);
        setTimeout(reqq,4000);
      }


//METAMASK

var account = '', net = 0;
const contract = '0x972c49907d7f22e2c8ae164c92c1019308ab03fa';
var int = setInterval(meta,5000);
meta();

async function metlog() {
  await ethereum.enable();
}

function meta() {
try {
// Modern dapp browsers...
if (window.ethereum) { window.web3 = new Web3(ethereum);  xmes();}
// Legacy dapp browsers...
else if (window.web3) {window.web3 = new Web3(web3.currentProvider); xmes();} 
else {
  mes = "<a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn' target='_blank'><span style = 'color:red' class='point'>Install MetaMask and refresh page</span></a>"; messs(mes); clearInterval(int);//"Non-Ethereum browser detected";
  }
}catch(e){}

function messs(mes) {
  try {
    net = web3.version.network;
    if ( net != 4 ) {mes = "<span style = 'color:red'>Switch MetaMask to Rinkeby Network</span>"};
  }catch(e){}
  document.getElementById('meta').innerHTML = mes; 
}

function xmes() {
      web3.eth.getAccounts(function(err, accounts){ account = accounts;
        if (err != null) mes = "An error occurred";
        else if (accounts.length == 0) {mes = "<b class = 'point' style = 'color:skyblue' onclick='metlog()'>Click here to login with Metamask</b>";  }
        else {mes = '<span style = "color:greenyellow">' + accounts + '</span>';}
        messs(mes);
      });
  }

}


//add token to metamask
function hnytok() {
  if (net == 0) {alert('MetaMask plugin is required!'); return} 
  ethereum.sendAsync({
    method: 'metamask_watchAsset',
    params: {
      "type":"ERC20", // Initially only supports ERC20, but eventually more!
      "options":{
        "address": "0x10d05006a637470a709F9D41cB61bceA96eBe9b6", // The address that the token is at.
        "symbol": "HAPPY", // A ticker symbol or shorthand, up to 5 chars.
        "decimals": 18, // The number of decimals in the token
        "image": "http:/contractor.rf.gd/img/token.png" // A string url of the token logo
      },
    },
    id: Math.round(Math.random() * 100000),
  }, (err, addedBoolean) => { })
}

//send tx
async function initButton () {
  if (net == 0) {alert('MetaMask plugin is required!'); return} 
  else if (net == 4) {
    try {await ethereum.enable()} catch(e) {}
      const transactionParameters = {to:contract, from:web3.eth.accounts[0],value:'0x00',data:'0xb96a367c'};
      ethereum.sendAsync({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      }, function(e){document.getElementById('hold').innerHTML = "We are looking for Santa via Oracle, please wait about 1 minute..."})
    } else {
    alert('Switch MetaMask to Rinkeby Network');
    }

}

//Get API Data

var coords = [], befor = 0, now = 0, markerSanta = [], cat = '';
apidata(0);
setInterval(apidata,30000,1);

async function apidata(x) {
  coords = [];
await axios.get('https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=5311335&toBlock=latest&address='+contract+'&topic0=0x7acd657e89e6cffe6e2f2b9382792f76f8c7c94c00befc15d0c6a2c4c304cd48&apikey=xxx').then(function(response){
var res = response.data.result;
for (var i = 1; i < res.length; i++) {
 
  coords.push({'time':parseInt(res[i].timeStamp),'coord':[parseInt(res[i].topics[2])/2-90,parseInt(res[i-1].topics[2])-180]})
}
now = coords.length;
if (befor < now) {befor = now; srender(x)}

}).catch(function(e){})

}

//Render santa
async function srender(x) {
  if (x == 1) {
    setTimeout(function(){document.getElementById('hold').innerHTML = vm.hold;},30000); document.getElementById('hold').innerHTML = "Santa has sent to you 1 HappyNewYear token";
  }
  await axios('https://api.weatherbit.io/v2.0/current?key=xxx&lang=en&lat='+coords[now-1].coord[0]+'&lon='+coords[now-1].coord[1]).then(function(response){
   var resp = response.data.data[0]; weth = resp.city_name + ', Temp:'+resp.temp+' C';
  }).catch(function(resp){});
for (var i = 0; i < now; i++) {

 await axios.get('https://api.thecatapi.com/v1/images/search').then(function(c){cat = c.data[0]}).catch(function(e){});
  var x = cat.width/150, xx = cat.width/400;
 var imag = "<div style = 'height:"+cat.height/x+"px;width:"+150+"px; overflow:hidden'><img style = 'position:absolute; z-index:2' src='"+cat.url+
 "' width = '"+cat.width/x+"' height = '"+cat.height/x+
 "' onmouseover='this.width="+cat.width/xx+"; this.height="+cat.height/xx+"' onmouseout='this.width="+cat.width/x+"; this.height="+cat.height/x+"'/></div>"

  try { markerSanta[i].removeFrom(map); }catch(e){}
    var tt = moment.parseZone(coords[i].time*1000).format('DD-MM-YYYY HH:mm:ss');
  if (i < now-1) { 
    markerSanta[i] = WE.marker(coords[i].coord).addTo(map);
    markerSanta[i].bindPopup("Santa was here<br><span style='font-size:10px;color:#999'>"+ tt +"</span>"+imag, {maxWidth: 150, closeButton: true});
  }
  else {
    markerSanta[i] = WE.marker(coords[i].coord, './img/santa1.png', 200,113).addTo(map);
    markerSanta[i].bindPopup("HO-HO-HO, I am here!<br><span style='font-size:10px;color:#999'>"+weth+"<br>"+tt+"</span>"+imag, {maxWidth: 150, closeButton: true}).openPopup();
    panTo(coords[i].coord);
  }
}
}

// test api
async function test() {
 vm.uarr = pars(vm.urls); // string urls to arr
 vm.parr = pars(vm.pathes); //string pathes to arr
 var api, pat =[], str = '', res = [];
 vm.result = '';
 for (i = 0; i < vm.uarr.length; i++) {
  await axios.get(vm.uarr[i]).then(function(resp){
     api = resp.data ;
    pat = pars(vm.parr[i],'.'); 
  for (j = 0; j < pat.length; j++) {
    try{
       api = api[pat[j]]
    }catch(e){api = 'path error';}
  }
    }).catch(function(e){api = 'url error' });
  
  res.push(Number(api));
  str += 'Response '+(i+1)+': '+JSON.stringify(api)+'; '
 }
  vm.result = str + 'Calculate: '+ Math.round(math.median(res)*vm.multi);
}

//parse string separated by comma or dot
function pars(xy,i) {
    var arr = [], temp = xy, ind;
    temp = temp.replace(/[\r\n\t]/g,"");
    while (temp.length != 0) {
    let any = temp.search(/\w/);
    if (i == '.') {ind = temp.search(/\.|$/);} 
    else {ind = temp.search(/,|$/);}
    if (ind == -1 ){return}
    let a = temp.substr(any,ind);
    arr.push(a);
    temp = temp.substr(ind+1);
    }
    return arr;
}


//DIALOG
function modalv(x) {
 
  var dialog = document.querySelector(x);
      dialogPolyfill.registerDialog(dialog);
      dialog.showModal();
  }
  
  function modalx(x) { 
      var dialog = document.querySelector(x);
          dialogPolyfill.registerDialog(dialog);
          dialog.close(); 
      }


function code(d) {
vm.demo = d;
  if (vm.oracle.length == 0) {alert('Select one or more Oracles!');return} 
    else if (vm.urls == '') {alert('Enter API Sources!'); return} 
    else if (vm.pathes == '') {alert('Enter JSON Pathes!'); return}
    else if (pars(vm.pathes).length != pars(vm.urls).length) {alert('Number of the urls must be equal number of the paths!'); return}
  if (vm.count > vm.oracle.length * pars(vm.urls).length) {alert('The min responses must be less than total amount of the responses (Oracles * APIs).'); return}
  if (vm.multi == '') {alert('Enter Multiplier'); return} else if (vm.count == '') {alert('Enter Minimum Responses');return}
  
  if (vm.type == 1) {
    if (vm.client == '') {alert('Enter Client Address'); return} else if (vm.provider == '') {alert('Enter Provider Address'); return} else if (vm.multi == '') {alert('Enter Multiplier'); return}
    else if (vm.threshold == '') {alert('Enter Threshold'); return} else if (vm.time == '') {alert('Enter Expiration Time'); return}
  } 

  vm.jobs = [];
  for (var i of vm.oracles[vm.net]) {
    vm.jobs.push(i.get);
  }
 
  modalv('#code');
}


//3D graph
function graph () {

try {
  var nodesg = [{'id':0,'info':vm.contracts[vm.type].name, 'color':'red','val':30}];
  var linksx = [];
   var apis = pars(vm.urls,',');
   var z = 0;
  for (var i = 0; i < vm.oracle.length; i++) {++z;
     nodesg.push({'id':z,'info':'Oracle Contract: '+vm.oracle[i],'color':'green', 'val':4});
    linksx.push({source:nodesg[z].id, target:nodesg[0].id});
    ++z;
     nodesg.push({'id':z,'info':'Node: '+vm.oracles[vm.net][i].n,'color':'skyblue', 'val':6});
      linksx.push({source:nodesg[z].id,target:nodesg[z-1].id},{source:nodesg[z-1].id,target:nodesg[z].id});
   
   
    var x = 0;
    for (var j = 0; j < apis.length; j++) {++z; ++x;
      nodesg.push({'id':z,'info':apis[j],'color':'blue','val':1})
      linksx.push({source:nodesg[z].id,target:nodesg[z-x].id})
    }
  }
  if (vm.type == 1) {
    nodesg.push({'id':100,'info':'Client Address: '+vm.client,'color':'gray', 'val':2});
    linksx.push({source:nodesg[0].id, target:100});
    nodesg.push({'id':101,'info':'Provider Address: '+vm.provider,'color':'gray', 'val':2});
    linksx.push({source:nodesg[0].id, target:101});
  }
}catch(e){}
  if ((nodesg.length < 2 && vm.type == 0) || (vm.type == 1 && nodesg.length < 4)) {alert('Select one or more Oracles!');return} else {modalv('#graph');}
  
   const gData = {
   nodes: nodesg,
   links: linksx
   };
   const elem = document.getElementById('dg');
   const Graph = ForceGraph3D()
       (elem)
       .graphData(gData)
       .width(800)
       .height(630)
       .backgroundColor('#000')
      .nodeLabel('info')
       .nodeResolution(26)
      .linkWidth(1)
      .linkDirectionalParticles(10)
       .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
       .onNodeClick(node => {
           // Aim at node from outside it
           const distance = 50;
           const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
           Graph.cameraPosition(
             { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
             node, // lookAt ({ x, y, z })
             3000  // ms transition duration
           );
         });
       
 }











