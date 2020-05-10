const express = require('express');
const router = express.Router();
const Caver = require('caver-js');
let surveyABI = require('../public/javascripts/surveyABI');
let contractAddress = '0x8C06153839f44439e6fF7ed1DFbf39F36BdC9b23';
const privateKey = '0xa51956a2a0d4a530d193564f12a8f2dbe5830da6853da53afba7a43d7e1eccb6';//sigining PrivateKey
const feepayer = '0x9ed71cee50f313a875bfc118234322fdefc526186329c6d0e94850cdb7d35f3e';
var caver = new Caver(new Caver.providers.HttpProvider('https://api.cypress.klaytn.net:8651'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bock Survey' });
});

router.post('/register', async function(req, res) { //대납 계정으로 보낸 트렌젝션
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
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


module.exports = router;
