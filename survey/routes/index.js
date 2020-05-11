const express = require('express');
const router = express.Router();
const Caver = require('caver-js');
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let surveyABI = require('../public/javascripts/surveyABI');
let contractAddress = '0x465A8ACe1206918c8A7Ee17D2378e175e2f3E7F6';
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
  let privateKey = req.body.privateKey;

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
  console.log(surveyID,addAnswer_questionsheetID,answer)
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
router.post('/getsurveyindex', async function(req, res) { //making a survey 
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  let surveyID = req.body.surveyID;
  console.log(surveyID)
  let contract = new caver.klay.Contract(surveyABI, contractAddress);
  let methods = contract.methods;
  methods.surveyindex(surveyID).call().then(l => {
    console.log(l);
    console.log(l[0])
    var surveying = l[0];
    var Surveyer = l[1];
    var purpose =l[2];
    var SNS = l[3];
    var goal = l[4];
    var TotalQuestionsheet = l[5];
    var TotalAnswersheet = l [6];
    res.send({msg: "success" ,status: true, data0: surveying, data1: Surveyer, data2: purpose, data3: SNS, data4: goal, data5: TotalQuestionsheet, data6: TotalAnswersheet  })
  });
});

router.post('/infoindex', async function(req, res) { //making a survey 
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  let address = req.body.surveyID;
  let contract = new caver.klay.Contract(surveyABI, contractAddress);
  let methods = contract.methods;
  methods.InfoIndex(address).call().then(l => {
    console.log(l);
    console.log(l[0])
    var age  = l[0];
    var sex  = l[1];
    var heigth  =l[2];
    var weigth  = l[3];
    var country  = l[4];
    res.send({msg: "success" ,status: true, data0: age, data1: sex, data2: heigth, data3: weigth, data4: country})
  });
});

router.post('/searchQuestion', async function(req, res) { //making a survey 
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  let surveyID = req.body.surveyID;
  let QustionSheetID = req.body.searchQuestion_QustionSheetID;
  let questionID = req.body.searchQuestion_questionID;

  let contract = new caver.klay.Contract(surveyABI, contractAddress);
  let methods = contract.methods;
  methods.getQuestions(surveyID,QustionSheetID,questionID).call().then(l => {
    console.log(l);
    console.log(l[0])
    var question  = l[0];
    var totalquestion  = l[1];

    res.send({msg: "success" ,status: true, data0: question, data1: totalquestion})
  });
});

router.post('/getAnswers', async function(req, res) { //making a survey 
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  let surveyID = req.body.surveyID;
  let AnswerSheetID = req.body.searchAnswer_AnswerSheetID;
  let AnswerID = req.body.searchAnswer_AnswerID;

  let contract = new caver.klay.Contract(surveyABI, contractAddress);
  let methods = contract.methods;
  methods.getAnswers(surveyID,AnswerSheetID,AnswerID).call().then(l => {
    console.log(l);
    console.log(l[0])
    var answer  = l[0];
    var totalanswer  = l[1];
    var answerer  = l[2];

    res.send({msg: "success" ,status: true, data0: answer, data1: totalanswer, data2: answerer})
  });
});

router.post('/totalsurvey', async function(req, res) { //making a survey 
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')

  let contract = new caver.klay.Contract(surveyABI, contractAddress);
  let methods = contract.methods;
  methods.TotalSurvey().call().then(l => {
    res.send({msg: "success" ,status: true, data0: l})
  });
});

router.post('/getcsv', async function(req, res) { //making a survey 
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')

  let contract = new caver.klay.Contract(surveyABI, contractAddress);
  let methods = contract.methods;
  contract.getPastEvents('addAnswerList', {
    fromBlock : 0, 
    toBlock : 'latest'
    })
    .then(function(events){
      console.log(events)
          const csvWriter = createCsvWriter({
              header: [
                  {id: 'blockNumber', title:'blockNumber'},
                  {id: 'surveyID', title:'surveyID'},
                  {id: '_answersheetID', title:'_answersheetID'},
                  {id: '_answer', title:'_answer'},
                ],
              path: './answerlist.csv'//,
             // hasCSVColumnTitle: true
          });
          const records = [];
          events.map( ( Item, Index ) => { 
              records.push({blockNumber : Item.blockNumber, surveyID: Item.returnValues.surveyID, _answersheetID: Item.returnValues._answersheetID, _answer: Item.returnValues._answer})                                                  
          });
          csvWriter.writeRecords(records)       // returns a promise
          .then(() => {
              console.log('...Done');
          });    
  });
});


module.exports = router;
