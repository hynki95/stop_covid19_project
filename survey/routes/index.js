const express = require('express');
const router = express.Router();
const Caver = require('caver-js');
let surveyABI = require('../public/javascripts/surveyABI');
let contractAddress = '0x8C06153839f44439e6fF7ed1DFbf39F36BdC9b23';
const feepayer = '0x9ed71cee50f313a875bfc118234322fdefc526186329c6d0e94850cdb7d35f3e';
var caver = new Caver(new Caver.providers.HttpProvider('https://api.cypress.klaytn.net:8651'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bock Survey' });
});

/////////////////////////////function/////////////////////////////////////
router.post('/register', async function(req, res) { //대납 계정으로 보낸 트렌젝션
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  let privateKey = req.body.privateKey;
  let age = req.body.age;
  let sex = req.body.sex;
  let height = req.body.height;
  let weight = req.body.weight;
  let country = req.body.country;
  console.log(age)
  let contract = new caver.klay.Contract(surveyABI, contractAddress);
  var enabi = contract.methods.Register(age,sex,height,weight,country).encodeABI();
  caver.klay.accounts.wallet.create(1);
  const sender = caver.klay.accounts.wallet.add(privateKey);
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add(feepayer); //feepayer private key
  
  caver.klay.getAccount(sender.address).then(console.log); // should print `null`
  
  // const privateKey = req.body.testpk;
  
  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddress,
    data: enabi,
    gas: '10000000',
    value: 0
  }, sender.privateKey);
  
  // signed raw transaction
  // console.log("Raw TX:\n", senderRawTransaction);
  caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
        console.log(">>>tx_hash for deploy =", hash);
  })
  .on('receipt', function (receipt) {
    console.log(">>> receipt arrived: ", receipt);
    res.send({status: true, msg:"success."});    
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
  })
  .on('error', function (err) {
    console.error(">>> error: ", err);
    res.send({status: false, msg: err});    
  });
  

  });


router.post('/makesurvey', async function(req, res) { //making a survey 
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  let privateKey = req.body.privateKey;
  let purpose = req.body.purpose;
  let SNS = req.body.SNS;
  let goal = req.body.goal;
  console.log(purpose,SNS,goal)
  let contract = new caver.klay.Contract(surveyABI, contractAddress);
  var enabi = contract.methods.makeSurvey(purpose,SNS,goal).encodeABI();
  caver.klay.accounts.wallet.create(1);
  const sender = caver.klay.accounts.wallet.add(privateKey);
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add(feepayer); //feepayer private key
  
  caver.klay.getAccount(sender.address).then(console.log); // should print `null`
  
  // const privateKey = req.body.testpk;
  
  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddress,
    data: enabi,
    gas: '10000000',
    value: 0
  }, sender.privateKey);
  
  // signed raw transaction
  // console.log("Raw TX:\n", senderRawTransaction);
  caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
        console.log(">>>tx_hash for deploy =", hash);
  })
  .on('receipt', function (receipt) {
    console.log(">>> receipt arrived: ", receipt);
    res.send({status: true, msg:"success."});    
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
  })
  .on('error', function (err) {
    console.error(">>> error: ", err);
    res.send({status: false, msg: err});    
  });
});

router.post('/endsurvey', async function(req, res) { //making a survey 
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  let privateKey = req.body.privateKey;
  let surveyID = req.body.surveyID;
  let contract = new caver.klay.Contract(surveyABI, contractAddress);
  var enabi = contract.methods.endSurvey(surveyID).encodeABI();
  caver.klay.accounts.wallet.create(1);
  const sender = caver.klay.accounts.wallet.add(privateKey);
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add(feepayer); //feepayer private key
  
  caver.klay.getAccount(sender.address).then(console.log); // should print `null`
  
  // const privateKey = req.body.testpk;
  
  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddress,
    data: enabi,
    gas: '10000000',
    value: 0
  }, sender.privateKey);
  
  // signed raw transaction
  // console.log("Raw TX:\n", senderRawTransaction);
  caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
        console.log(">>>tx_hash for deploy =", hash);
  })
  .on('receipt', function (receipt) {
    console.log(">>> receipt arrived: ", receipt);
    res.send({status: true, msg:"success."});    
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
  })
  .on('error', function (err) {
    console.error(">>> error: ", err);
    res.send({status: false, msg: err});    
  });
});

router.post('/addquestion', async function(req, res) { //making a survey 
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  let surveyID = req.body.surveyID;
  let question = req.body.question;
  let contract = new caver.klay.Contract(surveyABI, contractAddress);
  var enabi = contract.methods.addQuestion(surveyID,question).encodeABI();
  caver.klay.accounts.wallet.create(1);
  const sender = caver.klay.accounts.wallet.add(privateKey);
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add(feepayer); //feepayer private key
  
  caver.klay.getAccount(sender.address).then(console.log); // should print `null`
  
  // const privateKey = req.body.testpk;
  
  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddress,
    data: enabi,
    gas: '10000000',
    value: 0
  }, sender.privateKey);
  
  // signed raw transaction
  // console.log("Raw TX:\n", senderRawTransaction);
  caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
        console.log(">>>tx_hash for deploy =", hash);
  })
  .on('receipt', function (receipt) {
    console.log(">>> receipt arrived: ", receipt);
    res.send({status: true, msg:"success."});    
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
  })
  .on('error', function (err) {
    console.error(">>> error: ", err);
    res.send({status: false, msg: err});    
  });
});

router.post('/addanswer', async function(req, res) { //making a survey 
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  let surveyID = req.body.surveyID;
  let answer = req.body.answer;
  let privateKey = req.body.privateKey;
  let addAnswer_questionsheetID = req.body.addAnswer_questionsheetID;

  let contract = new caver.klay.Contract(surveyABI, contractAddress);
  var enabi = contract.methods.addAnswer(surveyID,addAnswer_questionsheetID,answer).encodeABI();
  caver.klay.accounts.wallet.create(1);
  const sender = caver.klay.accounts.wallet.add(privateKey);
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add(feepayer); //feepayer private key
  
  caver.klay.getAccount(sender.address).then(console.log); // should print `null`
  
  // const privateKey = req.body.testpk;
  
  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddress,
    data: enabi,
    gas: '10000000',
    value: 0
  }, sender.privateKey);
  
  // signed raw transaction
  // console.log("Raw TX:\n", senderRawTransaction);
  caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
        console.log(">>>tx_hash for deploy =", hash);
  })
  .on('receipt', function (receipt) {
    console.log(">>> receipt arrived: ", receipt);
    res.send({status: true, msg:"success."});    
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
  })
  .on('error', function (err) {
    console.error(">>> error: ", err);
    res.send({status: false, msg: err});    
  });
});

router.post('/createWallet', function(req, res){
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  console.log("1")
 caver.klay.accounts.wallet.create(1, caver.utils.randomHex(32));
 console.log("2")
  var prik = caver.klay.accounts.wallet[0]["privateKey"]
  var pubk = caver.klay.accounts.wallet[0]["address"]
  let privateKey
  console.log(prik,pubk)
  res.send({status: true, data1: prik, data2: pubk});
});

/////////////////////////////view/////////////////////////////////////

module.exports = router;
