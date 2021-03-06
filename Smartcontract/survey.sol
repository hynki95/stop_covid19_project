pragma solidity ^0.5.6;
contract SurveyContract{
    /////////////////////////////////////structure///////////////////////////
    uint public TotalSurvey;

    mapping (uint => Surveysheet) public surveyindex;
    
    struct Surveysheet{
        bool surveying;
        address Surveyer;
        string purpose;
        string SNS;
        uint goal;
        uint TotalQuestionsheet;
        uint TotalAnswersheet;
        mapping(uint =>Questionsheet) QuestionsheetIndex;
        mapping(uint =>Answersheet) AnswersheetIndex;
    }
    
    
    struct Answersheet{
        uint TotalAnswer;
        address answerer;
        mapping(uint => Answers) AnswerIndex;
    }
    
    struct Answers{
        string answer;
    }
    
    struct Questionsheet{
        uint TotalQuestion;
        mapping(uint => Question) QuestionIndex;
    }
    
    struct Question{
        string question;
    }
    
    mapping (address => Info) public InfoIndex;
    
    struct Info{
        uint age;
        string sex;
        string heigth;
        string weigth;
        string country;
    }
    
    ///////////////////////////////function///////////////////////////////////////////
    
    function makeSurvey(string memory _purpose, string memory _SNS, uint _goal) public{
        Surveysheet storage _Surveysheet = surveyindex[TotalSurvey];
        _Surveysheet.Surveyer=msg.sender;
        _Surveysheet.surveying = true;
        _Surveysheet.purpose = _purpose;
        _Surveysheet.SNS = _SNS;
        _Surveysheet.goal = _goal;
        TotalSurvey++;
    }
    
    function endSurvey(uint surveyID) public{
        require(surveyindex[surveyID].Surveyer == msg.sender);
        TotalSurvey++;
        surveyindex[surveyID].surveying == false;
    }
    event addQuestionList(uint indexed surveyID, string _question);
    function addQuestion(uint surveyID, string memory _question) public{
        Surveysheet storage _Surveysheet = surveyindex[surveyID];
        require(_Surveysheet.surveying == true);
        require(_Surveysheet.Surveyer == msg.sender);
        uint _TotalQuestionsheet = surveyindex[surveyID].TotalQuestionsheet;
        Questionsheet storage _Questionsheet = surveyindex[surveyID].QuestionsheetIndex[_TotalQuestionsheet];
        uint _TotalQuestion = _Questionsheet.TotalQuestion;
        _Questionsheet.QuestionIndex[_TotalQuestion].question = _question;
        surveyindex[surveyID].QuestionsheetIndex[_TotalQuestionsheet].TotalQuestion++;
        surveyindex[surveyID].TotalQuestionsheet++;
        emit addQuestionList( surveyID,  _question);
    }
    event addAnswerList(uint indexed surveyID, uint indexed _answersheetID, string _answer);
    function addAnswer(uint surveyID, uint _questionsheetID, string memory _answer) public{
        uint _TotalQuestionsheet = surveyindex[surveyID].TotalQuestionsheet;
        Surveysheet storage _Surveysheet = surveyindex[surveyID];
        require(_Surveysheet.surveying == true); // check if surveying is true
        uint _TotalAnswersheet = surveyindex[surveyID].TotalAnswersheet;
        require(_TotalQuestionsheet != 0 && _TotalQuestionsheet > _TotalAnswersheet); //check if Question sheet is available
        Answersheet storage _Answersheet = surveyindex[surveyID].AnswersheetIndex[_TotalAnswersheet];
        uint _TotalAnswer = _Answersheet.TotalAnswer;
        _Answersheet.AnswerIndex[_TotalAnswer].answer = _answer;
        surveyindex[surveyID].AnswersheetIndex[_questionsheetID].answerer = msg.sender;
        if(surveyindex[surveyID].AnswersheetIndex[_questionsheetID].TotalAnswer>= surveyindex[TotalSurvey].goal){
        surveyindex[surveyID].TotalAnswersheet++;
        }
        surveyindex[surveyID].AnswersheetIndex[_questionsheetID].TotalAnswer++;
        emit addAnswerList(surveyID,_questionsheetID,_answer);
    }
    
     function Register(uint _age, string memory _sex, string memory _heigth, string memory _weigth, string memory _country) public{
        InfoIndex[msg.sender].age =_age;
        InfoIndex[msg.sender].sex =_sex;
        InfoIndex[msg.sender].heigth =_heigth;
        InfoIndex[msg.sender].weigth =_weigth;
        InfoIndex[msg.sender].country =_country;
    }
    
    
    ///////////////////////view///////////////////////////////////////////////
    
    function getQuestions(uint _surveyID, uint _quesionsheetID, uint _questionID) public view returns(string memory _question, uint _TotalQuestion){
        Questionsheet storage _Questionsheet = surveyindex[_surveyID].QuestionsheetIndex[_quesionsheetID];
        _TotalQuestion = _Questionsheet.TotalQuestion;
        _question = _Questionsheet.QuestionIndex[_questionID].question;
    }
    
   function getAnswers(uint _surveyID, uint _answersheetID, uint _answerID) public view returns( uint _TotalAnswer, string memory _answer, address _answerer){
        Answersheet storage _Answersheet = surveyindex[_surveyID].AnswersheetIndex[_answersheetID];
        _TotalAnswer = _Answersheet.TotalAnswer;
        _answer = _Answersheet.AnswerIndex[_answerID].answer;
        _answerer = _Answersheet.answerer;
    }
    
  
}