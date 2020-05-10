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
        uint TotalQuestionsheet;
        uint TotalAnswersheet;
        mapping(uint =>Questionsheet) QuestionsheetIndex;
        mapping(uint =>Answersheet) AnswersheetIndex;
    }
    
    struct Answersheet{
        address Answerer;
        uint TotalInfo;
        uint TotalAnswer;
        mapping(uint => Infos) InfoIndex;
        mapping(uint => Answers) AnswerIndex;
    }
    
    struct Infos{
        string info;
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
    
    ///////////////////////////////function///////////////////////////////////////////
    
    function makeSurvey(string memory _purpose, string memory _SNS) public{
        Surveysheet storage _Surveysheet = surveyindex[TotalSurvey];
        require(_Surveysheet.surveying == false);
        _Surveysheet.Surveyer=msg.sender;
        _Surveysheet.surveying = true;
        _Surveysheet.purpose = _purpose;
        _Surveysheet.SNS = _SNS;
    }
    
    function endSurvey() public{
        Surveysheet storage _Surveysheet = surveyindex[TotalSurvey];
        require(_Surveysheet.Surveyer == msg.sender);
        TotalSurvey++;
        _Surveysheet.surveying == false;
    }
    
    function addQuestion(string memory _question) public{
        Surveysheet storage _Surveysheet = surveyindex[TotalSurvey];
        require(_Surveysheet.surveying == true);
        require(_Surveysheet.Surveyer == msg.sender);
        uint _TotalQuestionsheet = surveyindex[TotalSurvey].TotalQuestionsheet;
        Questionsheet storage _Questionsheet = surveyindex[TotalSurvey].QuestionsheetIndex[_TotalQuestionsheet];
        uint _TotalQuestion = _Questionsheet.TotalQuestion;
        _Questionsheet.QuestionIndex[_TotalQuestion].question = _question;
        surveyindex[TotalSurvey].QuestionsheetIndex[_TotalQuestionsheet].TotalQuestion++;
        surveyindex[TotalSurvey].TotalQuestionsheet++;
    }
    
    function addAnswer(string memory _answer) public{
        uint _TotalQuestionsheet = surveyindex[TotalSurvey].TotalQuestionsheet;
        uint _TotalQuestion=surveyindex[TotalSurvey].QuestionsheetIndex[_TotalQuestionsheet].TotalQuestion;
        Surveysheet storage _Surveysheet = surveyindex[TotalSurvey];
        require(_Surveysheet.surveying == true);
        uint _TotalAnswersheet = surveyindex[TotalSurvey].TotalAnswersheet;
        require(_TotalQuestionsheet != 0 && _TotalQuestionsheet >= _TotalAnswersheet);
        Answersheet storage _Answersheet = surveyindex[TotalSurvey].AnswersheetIndex[_TotalAnswersheet];
        uint _TotalAnswer = _Answersheet.TotalAnswer;
        _Answersheet.AnswerIndex[_TotalAnswer].answer = _answer;
        surveyindex[TotalSurvey].AnswersheetIndex[_TotalAnswersheet].TotalAnswer++;
        surveyindex[TotalSurvey].TotalAnswersheet++;
    }
    
     function addInfo(string memory _info) public{
        Surveysheet storage _Surveysheet = surveyindex[TotalSurvey];
        require(_Surveysheet.surveying == true);
        uint _TotalAnswersheet = surveyindex[TotalSurvey].TotalAnswersheet;
        Answersheet storage _Answersheet = surveyindex[TotalSurvey].AnswersheetIndex[_TotalAnswersheet];
        uint _TotalInfo = _Answersheet.TotalInfo;
        _Answersheet.InfoIndex[_TotalInfo].info = _info;
        _TotalInfo++;
    }
    
    ///////////////////////view///////////////////////////////////////////////
    
    function getQuestions(uint _surveyID, uint _quesionsheetID, uint _questionID) public view returns(string memory _question, uint _TotalQuestion){
        Questionsheet storage _Questionsheet = surveyindex[_surveyID].QuestionsheetIndex[_quesionsheetID];
        _TotalQuestion = _Questionsheet.TotalQuestion;
        _question = _Questionsheet.QuestionIndex[_questionID].question;
    }
    
   function getAnswers(uint _surveyID, uint _answersheetID, uint _answerID) public view returns(string memory _answer, uint _TotalAnswer){
        Answersheet storage _Answersheet = surveyindex[_surveyID].AnswersheetIndex[_answersheetID];
        _TotalAnswer = _Answersheet.TotalAnswer;
        _answer = _Answersheet.AnswerIndex[_answerID].answer;
    }
    
    function getInfo(uint _surveyID, uint _answersheetID, uint _infoID) public view returns(string memory _info){
        Answersheet storage _Answersheet = surveyindex[_surveyID].AnswersheetIndex[_answersheetID];
        _info = _Answersheet.InfoIndex[_infoID].info;
    }
}