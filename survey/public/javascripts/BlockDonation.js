
console.log('여기로들어옴')
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/a5d883b8e91348bba8f7e625b35ebdc5"));
  console.log("sucess")
}

web3.eth.defaultAccount = web3.eth.accounts[0];
contractAddress = '0x8a887d3d832f9314ffc6b86eca7e729b22fd7ca9'; 
let contract = new web3.eth.Contract(DonationServiceABI, contractAddress);
let methods = contract.methods;

//let nonce = 0;
//프라이빗 키로 로그인
function login_privatekey(password,privateKey){
  // let password = document.getElementById('password2').value;
  // let privateKey = document.getElementById('PK').value;
  // let password = "blockdonation";
  // let privateKey = "1bd023195bee1d8fbb6e50f4d8d4e190c19cbee41f2d528dc4a7686654bed1fa";
  b= Promise.resolve(web3.eth.accounts.encrypt(privateKey, password))
  b.then(l => {console.log(l); keystore = l
    a= Promise.resolve(web3.eth.accounts.wallet.decrypt([keystore], password));
    a.then(function (result){
    let address = result[0].address;
    // result[0].privateKey;
    // alert("로그인 되었습니다!");
    // document.getElementById("EOA").innerText = result[0].address;
    // web3.eth.defaultAccount = result[0].address;
    // document.getElementById("PK").innerText = result[0].privateKey;
    // let address = result[0].address;
    // let balval = 000;
    // let balance = web3.eth.getBalance(result[0].address).then(balval => {
    //   document.getElementById('getBalance').innerText = "이더리움 잔액 : " + balval/10**18 + "ETH";
});
  });
    //getNonce(address);
  //   methods.balanceOf(result[0].address).call().then(l => {
  //     document.getElementById('myBalance').innerText = l
  //   });
  // // web3.eth.personal.unlockAccount(address, password, 6**100000).then(console.log('Account unlocked!'));
  };
  
  



  
  //계정 생성하는 함수 (안에서 가스비 전송함수 바로 실행)
  function create_account() {
    var password = document.getElementById('password').value;
    if (!password) {
      alert("비밀번호를 입력하세요");
      return;
    }
    a = Promise.resolve(web3.eth.accounts.create(web3.utils.randomHex(32)));
    a.then(function (result) {
      address = result.address;
      var password = document.getElementById('password').value;
        keyStore = JSON.stringify(web3.eth.accounts.encrypt(result.privateKey, password));
        // alert("축하합니다. 회원가입 되셨습니다!" +
        //     "\n생성된 계좌 번호는 : " + result.address 
        //        + "\n private key는 : " + result.privateKey);
        var address = result.address 
         var privateKey = result.privateKey
    })
}



//register.ejs/////////////////////////////////후보로 등록하는 함수
async function register() {
  alert("블록체인에 등록을 시작합니다. 등록 완료 창이 뜰때까지 기다려 주세요.")
  privatekey =$('#privatekey').val();
  console.log(privatekey)
  address = $('#address').val(); //hidden으로 숨겨진 세션을 가져옴
  var campaign_name = document.getElementById('groupName').value;
  var project_name = document.getElementById('projectName').value;
  var fund_goal = document.getElementById('fund_goal').value;
  var beneficiary = document.getElementById('beneficiary').value;
  var fund_goal = document.getElementById('fund_goal').value;
  var date = document.getElementsByName('period'); //(날짜)
  var bank = document.getElementsByName('bankAccount'); //(계좌번호,은행)
  var period = (date[0].value + '.' +date[1].value + '.' + date[2].value + ' - ' + date[3].value + '.' +date[4].value + '.' + date[5].value)
  var realaccount = (bank[0].value + bank[1].value);
  await login_privatekey("blockdonation",privatekey);
  
    var enabi = contract.methods.newCampaign(campaign_name,project_name,period,realaccount,beneficiary,fund_goal).encodeABI();
  await web3.eth.sendTransaction({from:address ,to:contractAddress, value:0, gas:5900000, gasPrice:8000000000, data:enabi})
  .on('transactionHash', function(hash){
    alert('https://rinkeby.etherscan.io/tx/' + hash);
    // document.getElementById('etherscan').innerText = "https://rinkeby.etherscan.io/tx/"+hash ;
  })
  .on('receipt', function(receipt){console.log(receipt)})
  .on('confirmation', function(confirmationNumber, receipt){
    console.log(confirmationNumber);
    if(confirmationNumber == 1){
      console.log("confirmed")
      alert("등록완료!");
    }
  })
  .on('error', function(err){
    console.log(err);
    buyLottery("에러 발생 : "+err);
  })
}

/////////////////////confirm.ejs///
function init_confirm(){
  let privatekey =$('#privatekey').val();
  let address = $('#address').val(); //hidden으로 숨겨진 세션을 가져옴
  methods.campaigns_address(address).call().then(l => {
    console.log(l)
    console.log("들어옴")
    document.getElementById('campaign_name').innerText =  l[0] ;
    document.getElementById('project_name').innerText =  l[1] ;
    document.getElementById('date').innerText =  l[2] ;
    document.getElementById('realaccount').innerText =  l[3] ;
    document.getElementById('campaign_address').innerText =  l[4] ;
    document.getElementById('numFunders').innerText =  l[5] ;
    document.getElementById('myBalance').innerText =  l[6] ;
    document.getElementById('fund_goal').innerText =  l[7] ;
    document.getElementById('donationID').innerText =  l[8] ;
      var campaign_address = document.getElementById('campaign_address').value;  
      methods.balanceOf(campaign_address).call().then(l2 => {
          document.getElementById('fundedmoney').innerText = l2
      });
  });
}
async function use_money() {
  var campaignID = document.getElementById('donationID').value;
  var _amount = document.getElementById('_amount').value;
  var _usage = document.getElementById('_usage').value;
  let address = $("#address").val();
  let privatekey = $("#privatekey").val();
  await login_privatekey("blockdonation",privatekey);  
  
  var enabi = contract.methods.use_money(campaignID,_amount,_usage).encodeABI();
  console.log(enabi);
  web3.eth.sendTransaction({from:address ,to:contractAddress, value:0, gas:5900000, gasPrice:8000000000, data:enabi})
  .on('transactionHash', function(hash){
    alert('https://rinkeby.etherscan.io/tx/' + hash);
    document.getElementById('etherscan').innerText = "https://rinkeby.etherscan.io/tx/"+hash ;
  })
  .on('receipt', function(receipt){console.log(receipt)})
  .on('confirmation', function(confirmationNumber, receipt){
    console.log(confirmationNumber);
    if(confirmationNumber == 1){
      console.log("confirmed")
      alert("등록완료!");
      
    }
  })
  .on('error', function(err){
    console.log(err);
  })
}

///////////////////////////////////////////////donate///////////////////////
async function donate1() {
  privatekey =$('#privatekey').val();
  address = $('#address').val(); //hidden으로 숨겨진 세션을 가져옴
 console.log(privatekey);
  // var campaignID = document.getElementById('campaignID').text;
  await login_privatekey("blockdonation",privatekey);
  // var address = "0x235C276eeDa97d1Aa0CDbc89BDb423CCD5822e57"
  var _amount = document.getElementById('_amount1').value;
  alert('로그인한 계정의 주소인' +address+'에서 '+_amount+"만큼의 도넛이 보내집니다. \n 이더스캔 확인 링크에서 직접 확인이 가능하며, 블록체인에 기록되기 까지 시간이 걸리기 때문에 전송완료 메세지가 뜰때까지 기다려 주시기 바랍니다. \n'블록체인에서 채굴중 입니다 등록완료 메세지를 기다려 주세요. 곧 안내메세지로 뜨는 링크를 복사하여 이더스캔에서 진행상황을 확인하실 수 있습니다. ")
  var enabi = contract.methods.contribute(0,_amount).encodeABI();
  await web3.eth.sendTransaction({from:address ,to:contractAddress, value:0, gas:5900000, gasPrice:8000000000, data:enabi})
  .on('transactionHash', function(hash){
    alert('https://rinkeby.etherscan.io/tx/' + hash);
    // document.getElementById('etherscan').innerText = "https://rinkeby.etherscan.io/tx/"+hash ;
  })
  .on('receipt', function(receipt){console.log(receipt)})
  .on('confirmation', function(confirmationNumber, receipt){
    console.log(confirmationNumber);
    if(confirmationNumber == 1){
      checking_campaigns();
      //  console.log("confirmed")
      //  let address1 = $('#campaign_address1')
      //   methods.balanceOf(address1).call().then(l => {
        //   document.getElementById('myBalance1').innerText = l
        //   });
        alert("기부내역 및 도넛 전송 블록체인에 기록완료!");
      }
    })
    .on('error', function(err){
      console.log(err);
      buyLottery("에러 발생 : "+err);
    })
  }

  async function donate2() {
    privatekey =$('#privatekey').val();
    address = $('#address').val(); //hidden으로 숨겨진 세션을 가져옴
   console.log(privatekey);
    // var campaignID = document.getElementById('campaignID').text;
    await login_privatekey("blockdonation",privatekey);
    // var address = "0x235C276eeDa97d1Aa0CDbc89BDb423CCD5822e57"
    var _amount = document.getElementById('_amount2').value;
    alert('로그인한 계정의 주소인' +address+'에서 '+_amount+"만큼의 도넛이 보내집니다. \n 이더스캔 확인 링크에서 직접 확인이 가능하며, 블록체인에 기록되기 까지 시간이 걸리기 때문에 전송완료 메세지가 뜰때까지 기다려 주시기 바랍니다.")
    var enabi = contract.methods.contribute(1,_amount).encodeABI();
    await web3.eth.sendTransaction({from:address ,to:contractAddress, value:0, gas:5900000, gasPrice:4000000000, data:enabi})
    .on('transactionHash', function(hash){
      alert('블록체인에서 채굴중 입니다 등록완료 메세지를 기다려 주세요. 하단 링크를 복사하여 이더스캔에서 진행상황을 확인하실 수 있습니다. \n https://rinkeby.etherscan.io/tx/' + hash);
      // document.getElementById('etherscan').innerText = "https://rinkeby.etherscan.io/tx/"+hash ;
    })
    .on('receipt', function(receipt){console.log(receipt)})
    .on('confirmation', function(confirmationNumber, receipt){
      console.log(confirmationNumber);
      if(confirmationNumber == 1){
        checking_campaigns();
        //  console.log("confirmed")
        //  let address1 = $('#campaign_address1')
        //   methods.balanceOf(address1).call().then(l => {
          //   document.getElementById('myBalance1').innerText = l
          //   });
          alert("기부내역 및 도넛 전송 블록체인에 기록완료!");
        }
      })
      .on('error', function(err){
        console.log(err);
        buyLottery("에러 발생 : "+err);
      })
    }
  
    async function donate3() {
      privatekey =$('#privatekey').val();
      address = $('#address').val(); //hidden으로 숨겨진 세션을 가져옴
     console.log(privatekey);
      // var campaignID = document.getElementById('campaignID').text;
      await login_privatekey("blockdonation",privatekey);
      // var address = "0x235C276eeDa97d1Aa0CDbc89BDb423CCD5822e57"
      var _amount = document.getElementById('_amount3').value;
      alert('로그인한 계정의 주소인' +address+'에서 '+_amount+"만큼의 도넛이 보내집니다. \n 이더스캔 확인 링크에서 직접 확인이 가능하며, 블록체인에 기록되기 까지 시간이 걸리기 때문에 전송완료 메세지가 뜰때까지 기다려 주시기 바랍니다.")
      var enabi = contract.methods.contribute(2,_amount).encodeABI();
      await web3.eth.sendTransaction({from:address ,to:contractAddress, value:0, gas:5900000, gasPrice:8000000000, data:enabi})
      .on('transactionHash', function(hash){
        alert('블록체인에서 채굴중 입니다 등록완료 메세지를 기다려 주세요. 하단 링크를 복사하여 이더스캔에서 진행상황을 확인하실 수 있습니다. \n https://rinkeby.etherscan.io/tx/' + hash);
        // document.getElementById('etherscan').innerText = "https://rinkeby.etherscan.io/tx/"+hash ;
      })
      .on('receipt', function(receipt){console.log(receipt)})
      .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber);
        if(confirmationNumber == 1){
          checking_campaigns();
          //  console.log("confirmed")
          //  let address1 = $('#campaign_address1')
          //   methods.balanceOf(address1).call().then(l => {
            //   document.getElementById('myBalance1').innerText = l
            //   });
            alert("기부내역 및 도넛 전송 블록체인에 기록완료!");
          }
        })
        .on('error', function(err){
          console.log(err);
          buyLottery("에러 발생 : "+err);
        })
      }

      async function donate4() {
        privatekey =$('#privatekey').val();
        address = $('#address').val(); //hidden으로 숨겨진 세션을 가져옴
       console.log(privatekey);
        // var campaignID = document.getElementById('campaignID').text;
        await login_privatekey("blockdonation",privatekey);
        // var address = "0x235C276eeDa97d1Aa0CDbc89BDb423CCD5822e57"
        var _amount = document.getElementById('_amount4').value;
        alert('로그인한 계정의 주소인' +address+'에서 '+_amount+"만큼의 도넛이 보내집니다. \n 이더스캔 확인 링크에서 직접 확인이 가능하며, 블록체인에 기록되기 까지 시간이 걸리기 때문에 전송완료 메세지가 뜰때까지 기다려 주시기 바랍니다.")
        var enabi = contract.methods.contribute(3,_amount).encodeABI();
        await web3.eth.sendTransaction({from:address ,to:contractAddress, value:0, gas:5900000, gasPrice:8000000000, data:enabi})
        .on('transactionHash', function(hash){
          alert('블록체인에서 채굴중 입니다 등록완료 메세지를 기다려 주세요. 하단 링크를 복사하여 이더스캔에서 진행상황을 확인하실 수 있습니다. \n https://rinkeby.etherscan.io/tx/' + hash);
          // document.getElementById('etherscan').innerText = "https://rinkeby.etherscan.io/tx/"+hash ;
        })
        .on('receipt', function(receipt){console.log(receipt)})
        .on('confirmation', function(confirmationNumber, receipt){
          console.log(confirmationNumber);
          if(confirmationNumber == 1){
            checking_campaigns();
            //  console.log("confirmed")
            //  let address1 = $('#campaign_address1')
            //   methods.balanceOf(address1).call().then(l => {
              //   document.getElementById('myBalance1').innerText = l
              //   });
              alert("기부내역 및 도넛 전송 블록체인에 기록완료!");
            }
          })
          .on('error', function(err){
            console.log(err);
            buyLottery("에러 발생 : "+err);
          })
        }
    
  
//기부 정보 조회

async function donate5() {
  privatekey =$('#privatekey').val();
  address = $('#address').val(); //hidden으로 숨겨진 세션을 가져옴
  donationID = $('#donationID').val();
 console.log(donationID);
  await login_privatekey("blockdonation",privatekey);
  var _amount = document.getElementById('_amount5').value;
  alert('로그인한 계정의 주소인' +address+'에서 '+_amount+"만큼의 도넛이 보내집니다. \n 이더스캔 확인 링크에서 직접 확인이 가능하며, 블록체인에 기록되기 까지 시간이 걸리기 때문에 전송완료 메세지가 뜰때까지 기다려 주시기 바랍니다.")
  var enabi = contract.methods.contribute(donationID,_amount).encodeABI();
  await web3.eth.sendTransaction({from:address ,to:contractAddress, value:0, gas:5900000, gasPrice:8000000000, data:enabi})
  .on('transactionHash', function(hash){
    alert('https://rinkeby.etherscan.io/tx/' + hash);
    // document.getElementById('etherscan').innerText = "https://rinkeby.etherscan.io/tx/"+hash ;
  })
  .on('receipt', function(receipt){console.log(receipt)})
  .on('confirmation', function(confirmationNumber, receipt){
    console.log(confirmationNumber);
    if(confirmationNumber == 1){
      checking_campaigns();
      //  console.log("confirmed")
      //  let address1 = $('#campaign_address1')
      //   methods.balanceOf(address1).call().then(l => {
        //   document.getElementById('myBalance1').innerText = l
        //   });
        alert("기부내역 및 도넛 전송 블록체인에 기록완료!");
      }
    })
    .on('error', function(err){
      console.log(err);
      buyLottery("에러 발생 : "+err);
    })
  }
//var Campaign_index = 0

function checking_campaigns() {
  // var Campaign_index = document.getElementById(0).value ;
  methods.campaigns(0).call().then(l => {
    console.log(l)
    document.getElementById('campaign_name1').innerText =  l[0] ;
    document.getElementById('project_name1').innerText =  l[1] ;
    document.getElementById('date1').innerText =  l[2] ;
    // document.getElementById('realaccount').innerText =  l[3] ;
    document.getElementById('campaign_address1').innerText =  l[4] ;
    document.getElementById('numFunders1').innerText =  l[5] ;
    document.getElementById('myBalance1').innerText =  l[6] ;
    document.getElementById('fund_goal1').innerText =  l[7] ;
    document.getElementById('donationID1').innerText =  l[8] ;
      methods.campaigns(1).call().then(l => {
        document.getElementById('campaign_name2').innerText =  l[0] ;
        document.getElementById('project_name2').innerText =  l[1] ;
        document.getElementById('date2').innerText =  l[2] ;
        // document.getElementById('realaccount').innerText =  l[3] ;
        document.getElementById('campaign_address2').innerText =  l[4] ;
        document.getElementById('numFunders2').innerText =  l[5] ;
        document.getElementById('myBalance2').innerText =  l[6] ;
        document.getElementById('fund_goal2').innerText =  l[7] ;
        document.getElementById('donationID2').innerText =  l[8] ;
            methods.campaigns(2).call().then(l => {
              document.getElementById('campaign_name3').innerText =  l[0] ;
              document.getElementById('project_name3').innerText =  l[1] ;
              document.getElementById('date3').innerText =  l[2] ;
              // document.getElementById('realaccount').innerText =  l[3] ;
              document.getElementById('campaign_address3').innerText =  l[4] ;
              document.getElementById('numFunders3').innerText =  l[5] ;
              document.getElementById('myBalance3').innerText =  l[6] ;
              document.getElementById('fund_goal3').innerText =  l[7] ;
              document.getElementById('donationID3').innerText =  l[8] ;
                    methods.campaigns(3).call().then(l => {
                      document.getElementById('campaign_name4').innerText =  l[0] ;
                      document.getElementById('project_name4').innerText =  l[1] ;
                      document.getElementById('date4').innerText =  l[2] ;
                      // document.getElementById('realaccount').innerText =  l[3] ;
                      document.getElementById('campaign_address4').innerText =  l[4] ;
                      document.getElementById('numFunders4').innerText =  l[5] ;
                      document.getElementById('myBalance4').innerText =  l[6] ;
                      document.getElementById('fund_goal4').innerText =  l[7] ;
                      document.getElementById('donationID4').innerText =  l[8] ;
            });
        });
      });
    });
};

function checking_myList(){
  var donationID = document.getElementById("donationID").value;
  // donationID=donationID;
  methods.campaigns(donationID).call().then(l => {
    console.log(l)
      document.getElementById('campaign_name5').innerText =  l[0] ;
      document.getElementById('project_name5').innerText =  l[1] ;
      document.getElementById('date5').innerText =  l[2] ;
      // document.getElementById('realaccount').innerText =  l[3] ;
      document.getElementById('campaign_address5').innerText =  l[4] ;
      document.getElementById('numFunders5').innerText =  l[5] ;
      document.getElementById('myBalance5').innerText =  l[6] ;
      document.getElementById('fund_goal5').innerText =  l[7] ;
      document.getElementById('donationID5').innerText =  l[8] ;
  });
}
//////////////////////////////////////////////////////MyPage///////////////////////////




function mypageinit() {
  privatekey = $('#privatkey').val();
  address = $('#address').val(); //hidden으로 숨겨진 세션을 가져옴
  // $('Myaddress').text(address);
  console.log(address);
  methods.balanceOf(address).call().then(l => {
    // document.getElementById('Myaddress').value = address;
    document.getElementById('balanceOf').innerText =  l ;
    console.log(l);
  
  methods.funderInfo(address).call().then(l2 => {
    console.log(l2)
    document.getElementById('amountByID').innerText =  l2 ;
    // document.getElementById('amountByID').innerText =  l2[0][1] ;
    // document.getElementById('amountCount').innerText =  l2[0][2] ;
  });
  });
}
async function transfer() {
  $("#state").text('[요청] 구매정보 블록체인에 보내는 중');

  console.log("실행");
  address = $('#address').val(); //hidden으로 숨겨진 세션을 가져옴
  await login_privatekey("blockdonation","1bd023195bee1d8fbb6e50f4d8d4e190c19cbee41f2d528dc4a7686654bed1fa");
  to = $('#address').val();// 이 변수는 데이터베이스에서 가져옴
  money_value = $('#value').val(); 
  value = (money_value/1000)
  // give_gasprice(to);
  var enabi = contract.methods.transfer(to,value).encodeABI();
  await web3.eth.sendTransaction({from:"0x235C276eeDa97d1Aa0CDbc89BDb423CCD5822e57" ,to:contractAddress, value:0, gas:5900000, gasPrice:4000000000, data:enabi})
  .on('transactionHash', function(hash){
    alert('https://rinkeby.etherscan.io/tx/' + hash);
    // document.getElementById('etherscan').innerText = "https://rinkeby.etherscan.io/tx/"+hash ;
  })
  .on('receipt', function(receipt){console.log(receipt);    
    $("#state").text('[채굴중] Donut 지갑에 보내는 중');
  })
  .on('confirmation', function(confirmationNumber, receipt){
    console.log(confirmationNumber);
    if(confirmationNumber == 1){
      $("#state").text('[채굴완료] Donut 전송 완료');
      mypageinit();
    }
  })
  .on('error', function(err){
    console.log(err);
    alert("에러발생")
  })
}

//관리자 계정에서 가스 전송해주는 함수 -admin 계정에 추가 또는 회원가입시에 자동 실행하게
async function give_gasprice() {

  money_value = $('#value').val(); 
  value = (money_value/1000)
  if(confirm("입력한 현금만큼 도넛을 구매하시겠습니까? \n도넛 : "+value+"개 \n현금 : "+money_value+"원")== true)
  $("#state").text('[요청] 수수료 송금 정보를 블록체인에 보내는 중');
  address = $('#address').val(); //hidden으로 숨겨진 세션을 가져옴
  await login_privatekey("blockdonation","1bd023195bee1d8fbb6e50f4d8d4e190c19cbee41f2d528dc4a7686654bed1fa");
  await web3.eth.sendTransaction({from:"0x235C276eeDa97d1Aa0CDbc89BDb423CCD5822e57" ,to:address, value:10**17, gas:53000, gasPrice:8000000000})
  .on('receipt', function(receipt){$("#state").text('[채굴중] Donut 사용을 위한 수수료 지급중');})
  .on('confirmation', function(confirmationNumber, receipt){
    if(confirmationNumber == 1){  
      $("#state").text('[채굴완료] Donut 사용을 위한 수수료 지급 완료');
      transfer();
    }
  })
  .on('error', function(err){
    console.log(err);
    alert("에러발생")
  })
  }



  // function showevent(){
  //   if(confirm("정말 contract를 없애시겠습니까?")== true)
  //   mySendEvent = Promise.resolve(contract.getPastEvents('contribute_log', {
  //       fromBlock: 0,
  //       toBlock: 'latest'
  //   }));
  //   mySendEvent.then(function (c) {
  //       console.log( c );
  //   });
  // };

  function historyViewer() {
    address = $('#address').val(); //hidden으로 숨겨진 세션을 가져옴

    document.getElementById("historyTable").innerText = " ";

    var table = document.getElementById("historyTable");
    console.log(address)
    document.getElementById("historyTable").innerText = "Loding...";
    mySendEvent = Promise.resolve(contract.getPastEvents('contribute_log', {
        filter: {
          contributer : address
        },
        fromBlock: 0,
        toBlock: 'latest'
    }));
      mySendEvent.then(function (r) {
            result = r;
            console.log(r)
            document.getElementById("historyTable").innerText = " ";
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
           
            cell1.innerHTML = "기부 단체 번호";
            cell2.innerHTML = "지갑주소";
            cell3.innerHTML = "후원한 도넛의 수";
            cell4.innerHTML = "Block number";
            cell5.innerHTML = "Transaction hash value";
            for (i = 0; i < result.length; i++) {

                log = result[i].returnValues
                var colBlock = result[i].blockNumber;
                var colTrx = result[i].transactionHash;
                // var colTime = new Date(log._time * 1000);
              
                var colcampId = log.campaignID;
                var colcontributer = log.contributer;
                var col_amoun = log._amount;

                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                // var cell7 = row.insertCell(6);


                cell1.innerHTML = colcampId;
                cell2.innerHTML = colcontributer;
                cell3.innerHTML = col_amoun;
                cell4.innerHTML = colBlock;
                cell5.innerHTML = colTrx;
                // cell7.innerHTML = colEtc;
            }
        });
    }


    function historyViewer2() {
      address = $('#checkingaddress').val(); //hidden으로 숨겨진 세션을 가져옴
  
      document.getElementById("historyTable2").innerText = " ";
  
      var table = document.getElementById("historyTable2");
      console.log(address)
      document.getElementById("historyTable2").innerText = "Loding...";
      mySendEvent = Promise.resolve(contract.getPastEvents('use_money_log', {
          filter: {
            user: address
          },
          fromBlock: 0,
          toBlock: 'latest'
      }));
        mySendEvent.then(function (r) {
              result = r;
              document.getElementById("historyTable2").innerText = " ";
              var row = table.insertRow(-1);
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              var cell5 = row.insertCell(4);
             
              cell1.innerHTML = "후원단체의 지갑주소";
              cell2.innerHTML = "사용 금액";
              cell3.innerHTML = "사용처";
              cell4.innerHTML = "Block number";
              cell5.innerHTML = "Transaction hash value";
              for (i = 0; i < result.length; i++) {
  
                  log = result[i].returnValues
                  var colBlock = result[i].blockNumber;
                  var colTrx = result[i].transactionHash;
                  // var colTime = new Date(log._time * 1000);
                
                  var coluser = log.user;
                  var colsend_amount = log.send_amount;
                  var col_usage = log.usage;
  
                  var row = table.insertRow(-1);
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);
                  var cell3 = row.insertCell(2);
                  var cell4 = row.insertCell(3);
                  var cell5 = row.insertCell(4);
                  // var cell7 = row.insertCell(6);
  
  
                  cell1.innerHTML = coluser;
                  cell2.innerHTML = colsend_amount;
                  cell3.innerHTML = col_usage;
                  cell4.innerHTML = colBlock;
                  cell5.innerHTML = colTrx;
                  // cell7.innerHTML = colEtc;
              }
          });
      }



////////////////////////////////////////////////////////////////////로그인 로그아웃/////////////////////

function init() {
  $("#logout").hide();
  $("#donate").hide();
  $("#myList").hide();
}

init();
