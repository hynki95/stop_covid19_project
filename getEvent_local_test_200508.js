//const APIendpoint = "https://api.cypress.klaytn.net:8651" // currently using endpoint
const APIendpoint = "https://api.baobab.klaytn.net:8651" // currently using endpoint

const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let giniTokenABI = JSON.parse('[	{		"constant": false,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "addPauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_receiver",				"type": "address[]"			},			{				"name": "_value",				"type": "uint256[]"			}		],		"name": "airdropTokens",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "approve",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "value",				"type": "uint256"			}		],		"name": "burn",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "from",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "burnFrom",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "subtractedValue",				"type": "uint256"			}		],		"name": "decreaseAllowance",		"outputs": [			{				"name": "success",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "addedValue",				"type": "uint256"			}		],		"name": "increaseAllowance",		"outputs": [			{				"name": "success",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "pause",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "removePauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renounceOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renouncePauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "to",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "transfer",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "from",				"type": "address"			},			{				"name": "to",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "transferFrom",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "newOwner",				"type": "address"			}		],		"name": "transferOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "unpause",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "account",				"type": "address"			}		],		"name": "Paused",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "account",				"type": "address"			}		],		"name": "Unpaused",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "account",				"type": "address"			}		],		"name": "PauserAdded",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "account",				"type": "address"			}		],		"name": "PauserRemoved",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			},			{				"indexed": true,				"name": "newOwner",				"type": "address"			}		],		"name": "OwnershipTransferred",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "from",				"type": "address"			},			{				"indexed": true,				"name": "to",				"type": "address"			},			{				"indexed": false,				"name": "value",				"type": "uint256"			}		],		"name": "Transfer",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "owner",				"type": "address"			},			{				"indexed": true,				"name": "spender",				"type": "address"			},			{				"indexed": false,				"name": "value",				"type": "uint256"			}		],		"name": "Approval",		"type": "event"	},	{		"constant": true,		"inputs": [			{				"name": "owner",				"type": "address"			},			{				"name": "spender",				"type": "address"			}		],		"name": "allowance",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "owner",				"type": "address"			}		],		"name": "balanceOf",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "decimals",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "isOwner",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "isPauser",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_address",				"type": "address"			}		],		"name": "isThisOwner",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "name",		"outputs": [			{				"name": "",				"type": "string"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "owner",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "paused",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "symbol",		"outputs": [			{				"name": "",				"type": "string"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "totalSupply",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	}]');
let giniLottoABI = JSON.parse('[	{		"constant": false,		"inputs": [			{				"name": "_gameLotNumberMax",				"type": "uint256"			},			{				"name": "_gameLotNumberCounts",				"type": "uint256"			},			{				"name": "_rwdsLotteryRank1ReferalRate",				"type": "uint256[]"			}		],		"name": "adminBeginAGame",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_calTarget",				"type": "uint256"			}		],		"name": "adminCalWins",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "adminDistribute",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_ethBlockNumber",				"type": "uint256[]"			},			{				"name": "_ethBlockHash",				"type": "bytes32[]"			}		],		"name": "adminDrawNumber",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "adminEndGame",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_from",				"type": "address"			},			{				"name": "_referal",				"type": "address"			}		],		"name": "adminRegisterReferal",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_donationAddress",				"type": "address"			},			{				"name": "_votingDuraion",				"type": "uint256"			}		],		"name": "adminSetDonation",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_fundId",				"type": "uint8"			},			{				"name": "_toAddress",				"type": "address"			}		],		"name": "adminSetFundAddress",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_isLoggingAtCal",				"type": "bool"			}		],		"name": "adminSetOption",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_buyer",				"type": "address"			},			{				"name": "_donationId",				"type": "uint256"			},			{				"name": "_lotNumberBit",				"type": "uint48[]"			}		],		"name": "buyLottery",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_amount",				"type": "uint256"			}		],		"name": "fund4Lottery",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_buyers",				"type": "address[]"			},			{				"name": "_donationIds",				"type": "uint256[]"			},			{				"name": "_ticketToBuy",				"type": "uint256[]"			},			{				"name": "_lotNumbers",				"type": "uint48[]"			}		],		"name": "multiBuyLottery",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_child",				"type": "address[]"			},			{				"name": "_parents",				"type": "address[]"			}		],		"name": "multiRegisterReferal",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_recevier",				"type": "address[]"			},			{				"name": "_gameId",				"type": "uint256[]"			},			{				"name": "_lotNumberBit",				"type": "uint64[]"			},			{				"name": "_donationRate",				"type": "uint256[]"			}		],		"name": "multiWithdrawRewards",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_recevier",				"type": "address"			},			{				"name": "_gameId",				"type": "uint256"			},			{				"name": "_lotNumberBit",				"type": "uint64"			},			{				"name": "_donationRate",				"type": "uint256"			}		],		"name": "withdrawRewards",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [			{				"name": "_tokenAddress",				"type": "address"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "_gameId",				"type": "uint256"			},			{				"indexed": false,				"name": "_isLoggingAtCal",				"type": "bool"			}		],		"name": "AdminSetOption",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "_gameId",				"type": "uint256"			},			{				"indexed": false,				"name": "_lotNumberBit",				"type": "uint256"			},			{				"indexed": false,				"name": "_winners",				"type": "address[]"			}		],		"name": "winnerLog",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "_donationAddress",				"type": "address"			},			{				"indexed": false,				"name": "_votingDuraion",				"type": "uint256"			}		],		"name": "AdminSetDonation",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "_gameId",				"type": "uint256"			},			{				"indexed": false,				"name": "_gameLotNumberMax",				"type": "uint256"			},			{				"indexed": false,				"name": "_gameLotNumberCounts",				"type": "uint256"			}		],		"name": "AdminBeginAGame",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "_gameId",				"type": "uint256"			},			{				"indexed": false,				"name": "_ethBlockNumber",				"type": "uint256[]"			},			{				"indexed": false,				"name": "_ethBlockHash",				"type": "bytes32[]"			}		],		"name": "AdminDrawNumber",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "_fundId",				"type": "uint8"			},			{				"indexed": false,				"name": "_fromAddress",				"type": "address"			},			{				"indexed": false,				"name": "_toAddress",				"type": "address"			}		],		"name": "AdminSetFundAddress",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "_from",				"type": "address"			},			{				"indexed": false,				"name": "_referal",				"type": "address"			}		],		"name": "AdminRegisterReferal",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "_gameId",				"type": "uint256"			},			{				"indexed": true,				"name": "_rank",				"type": "uint256"			},			{				"indexed": true,				"name": "_lotNumberBit",				"type": "uint64"			},			{				"indexed": false,				"name": "_recevier",				"type": "address"			}		],		"name": "WithdrawRewards",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "_gameId",				"type": "uint256"			},			{				"indexed": true,				"name": "_buyer",				"type": "address"			},			{				"indexed": true,				"name": "_lotNumberBit",				"type": "uint48"			}		],		"name": "BuyLottery",		"type": "event"	},	{		"constant": true,		"inputs": [],		"name": "divisor",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "donationAddress",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "donationVotingDuration",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_x",				"type": "uint64"			}		],		"name": "dropTheBit",		"outputs": [			{				"name": "",				"type": "uint64"			}		],		"payable": false,		"stateMutability": "pure",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint8"			}		],		"name": "fundAddressIndex",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "gameId",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "gameIndex",		"outputs": [			{				"name": "salesAmountOfThisGame",				"type": "uint256"			},			{				"name": "remnantMoneyOfThisGame",				"type": "uint256"			},			{				"name": "drawedLotNumberBit",				"type": "uint64"			},			{				"name": "rndSource",				"type": "uint256"			},			{				"name": "bonusNumber",				"type": "uint256"			},			{				"name": "klayBlockHash",				"type": "bytes32"			},			{				"name": "isActive",				"type": "bool"			},			{				"name": "isLotNumberDrawed",				"type": "bool"			},			{				"name": "winnerCalculated",				"type": "uint256"			},			{				"name": "isDistributed",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "gameLotNumberCounts",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "gameLotNumberMax",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_gameId",				"type": "uint256"			}		],		"name": "getDrawedLotNumber",		"outputs": [			{				"name": "_lotNumber",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_gameId",				"type": "uint256"			},			{				"name": "_lotNumber",				"type": "uint256"			}		],		"name": "getGameLotNumberIndex",		"outputs": [			{				"name": "addr",				"type": "address[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_gameId",				"type": "uint256"			},			{				"name": "_score",				"type": "uint256"			}		],		"name": "getRankInfo",		"outputs": [			{				"name": "_rewards",				"type": "uint256"			},			{				"name": "_rewardPerOne",				"type": "uint256"			},			{				"name": "_winnerCounts",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_from",				"type": "address"			},			{				"name": "_depth",				"type": "uint256"			}		],		"name": "GetReferalTree",		"outputs": [			{				"name": "",				"type": "address[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "gtAddress",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "gtPrice",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "isLoggingAtCal",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "playerIndex",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			}		],		"name": "playerTree",		"outputs": [			{				"name": "referalLevel",				"type": "uint256"			},			{				"name": "lastPlayedGameId",				"type": "uint256"			},			{				"name": "referal",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "PRIZE_MONEY_FOR_REFERAL",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "PRIZE_MONEY_FOR_REFERAL_RATIO",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "PRIZE_MONEY_RATIO_BY_RANK",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "referalLevel",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "SALES_AMOUNT",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	}]');
// let giniDonationABI = JSON.parse('[	{		"constant": false,		"inputs": [],		"name": "adminGetDonationRank",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_name",				"type": "string"			},			{				"name": "_usage",				"type": "string"			},			{				"name": "_SNS",				"type": "string"			},			{				"name": "_hopeFundAmount",				"type": "uint256"			},			{				"name": "_donationOwner",				"type": "address"			}		],		"name": "adminRegisterDonation",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_amountToDonate",				"type": "uint256"			}		],		"name": "donate",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_donationId",				"type": "uint256"			},			{				"name": "_numberOfVotes",				"type": "uint256"			}		],		"name": "donationVote",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [			{				"name": "_lottoAddress",				"type": "address"			},			{				"name": "_giniTokenAddress",				"type": "address"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "_name",				"type": "string"			},			{				"indexed": false,				"name": "_donationOwner",				"type": "address"			}		],		"name": "AdminRegisterDonation",		"type": "event"	},	{		"constant": true,		"inputs": [],		"name": "donationVotingId",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "donationVotingIndex",		"outputs": [			{				"name": "donationId",				"type": "uint256"			},			{				"name": "donated",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_donationVotingId",				"type": "uint256"			},			{				"name": "_donationId",				"type": "uint256"			}		],		"name": "getDonation",		"outputs": [			{				"name": "_name",				"type": "string"			},			{				"name": "_usage",				"type": "string"			},			{				"name": "_SNS",				"type": "string"			},			{				"name": "_hopeFundAmount",				"type": "uint256"			},			{				"name": "_numberOfVotes",				"type": "uint256"			},			{				"name": "_donationOwner",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_donationVotingId",				"type": "uint256"			}		],		"name": "getDonationId",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_donationVotingId",				"type": "uint256"			},			{				"name": "_rank",				"type": "uint256"			}		],		"name": "getDonationRank",		"outputs": [			{				"name": "_donatedAmount",				"type": "uint256"			},			{				"name": "_donationAddress",				"type": "address[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "giniLottoAddress",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "giniTokenAddress",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "rwdsDonationRankRate",		"outputs": [			{				"name": "",				"type": "uint16"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	}]');
let contractAddressL = '0x8cE196aB1BbF9C8F48b0B977d83588f79d4cf292'; // klaytn Lotto
let contractAddressT = '0x54c06f13826bB940eE040743DB825E88178ddA38'; // klaytn Token
// let contractAddressD = '0x170BCF53532B08500b57f5ff988FdB3624148Ea5'; // klaytn Donation

async function getGameBlockNumber(){
    
    let Caver = require("caver-js");
    let caver = new Caver(APIendpoint) // for cypress, use "https://api.cypress.klaytn.net:8651"

    let contract = new caver.klay.Contract(giniLottoABI, contractAddressL);
    let methods = contract.methods;

    contract.getPastEvents('AdminBeginAGame', {
        filter: { 
            // _gameId : 10, //gameID
            // _gameLotNumberMax : 25, //25~45
            // _gameLotNumberCounts : 5//5 or 6
        },
        fromBlock : 0,
        toBlock : 'latest'
        })
        .then(function(events){
            let text;
        events.map( ( Item, Index ) => {          
                text += "\n gameId : " + Item.returnValues._gameId+ ", blockNumber : " + Item.blockNumber + ", gameLotNumberMax : " + Item.returnValues._gameLotNumberMax + ", gameLotNumberCounts : " + Item.returnValues._gameLotNumberCounts; 
            })
        //const title = "BeginGame - date :"+new Date();
        fs.writeFileSync( 'block_num.txt',text);
    });

};

async function getTransferList(){

    let Caver = require("caver-js");
    let caver = new Caver(APIendpoint) // for cypress, use "https://api.cypress.klaytn.net:8651"

    let contract = new caver.klay.Contract(giniTokenABI, contractAddressT);
    let methods = contract.methods;

    contract.getPastEvents('Transfer', {
        filter: { 
        _from : "0x5f3AC09eCAD467Ed3b53479a02C86649d20Bd8DC", //from filter
        _to : "0xf1c77a044F684287601F2D92C1CE841CA9fe510D", //to filter
        },
        fromBlock : 27295312, 
        toBlock : 'latest'
        })
        .then(function(events){
            let text;
        events.map( ( Item, Index ) => {          
                text += "blockNumber : " + Item.blockNumber +"from : " + Item.returnValues.from+ "  to : " + Item.returnValues.to + "  value : " + Item.returnValues.value + "\n"; 
            })
            //const title = "BeginGame - date :"+new Date();
        fs.writeFileSync( 'block_num.txt',text);
        });
}

    let startgameID;
    let endgameID;

    function getTrnsferListbyGameID (startgameID,endgameID) {
        let Caver = require("caver-js");
        let caver = new Caver(APIendpoint) // for cypress, use "https://api.cypress.klaytn.net:8651"

        let contract = new caver.klay.Contract(giniLottoABI, contractAddressL);
        let methods = contract.methods;

        contract.getPastEvents('AdminBeginAGame', {
            filter: { 
                _gameId : startgameID
            },
            fromBlock : 0,
            toBlock : 'latest'
            })
            .then(function(events){
                let text;
                let startblockNumber =  events[0].blockNumber
                contract.getPastEvents('AdminBeginAGame', {
                    filter: { 
                        _gameId : endgameID
                    },
                    fromBlock : startblockNumber,
                    toBlock : 'latest'
                    })
                    .then(function(events){
                        let text;
                        let endblockNumber =  events[0].blockNumber
                        let contract = new caver.klay.Contract(giniTokenABI, contractAddressT);
                        let methods = contract.methods;

                        contract.getPastEvents('Transfer', {
                            filter: { 
                            _from : "0x5f3AC09eCAD467Ed3b53479a02C86649d20Bd8DC", //from filter
                            _to : "0xf1c77a044F684287601F2D92C1CE841CA9fe510D", //to filter
                            },
                            fromBlock : startblockNumber, 
                            toBlock : endblockNumber
                            })
                            .then(function(events){
                                let text;
                                console.log("\n startblockNumber : " +startblockNumber + "endblockNumber : " +endblockNumber);
                                    const csvWriter = createCsvWriter({
                                        header: [
                                            {id: 'blockNumber', title:'BlockNumber'},
                                            {id: 'from', title:'From'},
                                            {id: 'to', title:'To'},
                                            {id: 'value', title:'Value'}
                                          ],
                                        path: './file2.csv'//,
                                       // hasCSVColumnTitle: true
                                    });
                                    const records = [];
                                    events.map( ( Item, Index ) => { 
                                        records.push({blockNumber : Item.blockNumber, from: Item.returnValues.from, to: Item.returnValues.to, value: Item.returnValues.value})                                                  
                                    });
                                    csvWriter.writeRecords(records)       // returns a promise
                                    .then(() => {
                                        console.log('...Done');
                                    });    
                            });
                    });
            });
        };
        


//  getGameBlockNumber();
getTransferList(); 
//getTrnsferListbyGameID(3,4); // 4,5 => 4회차 부터 5회차 검색