module.exports =
[
	{
		"constant": false,
		"inputs": [
			{
				"name": "surveyID",
				"type": "uint256"
			},
			{
				"name": "_questionsheetID",
				"type": "uint256"
			},
			{
				"name": "_answer",
				"type": "string"
			}
		],
		"name": "addAnswer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "surveyID",
				"type": "uint256"
			},
			{
				"name": "_question",
				"type": "string"
			}
		],
		"name": "addQuestion",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "surveyID",
				"type": "uint256"
			}
		],
		"name": "endSurvey",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_purpose",
				"type": "string"
			},
			{
				"name": "_SNS",
				"type": "string"
			},
			{
				"name": "_goal",
				"type": "uint256"
			}
		],
		"name": "makeSurvey",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_age",
				"type": "uint256"
			},
			{
				"name": "_sex",
				"type": "string"
			},
			{
				"name": "_heigth",
				"type": "string"
			},
			{
				"name": "_weigth",
				"type": "string"
			},
			{
				"name": "_country",
				"type": "string"
			}
		],
		"name": "Register",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "surveyID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_question",
				"type": "string"
			}
		],
		"name": "addQuestionList",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "surveyID",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "_answersheetID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_answer",
				"type": "string"
			}
		],
		"name": "addAnswerList",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_surveyID",
				"type": "uint256"
			},
			{
				"name": "_answersheetID",
				"type": "uint256"
			},
			{
				"name": "_answerID",
				"type": "uint256"
			}
		],
		"name": "getAnswers",
		"outputs": [
			{
				"name": "_TotalAnswer",
				"type": "uint256"
			},
			{
				"name": "_answer",
				"type": "string"
			},
			{
				"name": "_answerer",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_surveyID",
				"type": "uint256"
			},
			{
				"name": "_quesionsheetID",
				"type": "uint256"
			},
			{
				"name": "_questionID",
				"type": "uint256"
			}
		],
		"name": "getQuestions",
		"outputs": [
			{
				"name": "_question",
				"type": "string"
			},
			{
				"name": "_TotalQuestion",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "InfoIndex",
		"outputs": [
			{
				"name": "age",
				"type": "uint256"
			},
			{
				"name": "sex",
				"type": "string"
			},
			{
				"name": "heigth",
				"type": "string"
			},
			{
				"name": "weigth",
				"type": "string"
			},
			{
				"name": "country",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "surveyindex",
		"outputs": [
			{
				"name": "surveying",
				"type": "bool"
			},
			{
				"name": "Surveyer",
				"type": "address"
			},
			{
				"name": "purpose",
				"type": "string"
			},
			{
				"name": "SNS",
				"type": "string"
			},
			{
				"name": "goal",
				"type": "uint256"
			},
			{
				"name": "TotalQuestionsheet",
				"type": "uint256"
			},
			{
				"name": "TotalAnswersheet",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "TotalSurvey",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
