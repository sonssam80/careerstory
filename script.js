// 퀴즈 문항 데이터 (수업 내용에 맞춰 자유롭게 수정하세요)
const questions = [
    {
        question: "주말에 자유 시간이 주어지면 무엇을 하는 것을 가장 좋아하나요?",
        answers: [
            { text: "친구들과 밖에서 뛰어놀거나 운동하기", type: "active" },
            { text: "재미있는 소설책을 읽거나 그림 그리기", type: "creative" },
            { text: "새로운 스마트폰 앱이나 게임의 원리 찾아보기", type: "logical" },
            { text: "가족이나 친구들의 고민을 들어주고 도와주기", type: "social" }
        ]
    },
    {
        question: "학교에서 모둠 과제를 할 때, 내가 주로 맡는 역할은?",
        answers: [
            { text: "자료를 꼼꼼하게 검색하고 분석하는 역할", type: "logical" },
            { text: "발표 자료를 예쁘고 독창적으로 꾸미는 역할", type: "creative" },
            { text: "모둠원들의 의견을 모으고 이끄는 조장 역할", type: "social" },
            { text: "직접 몸으로 부딪히며 실행하고 실험하는 역할", type: "active" }
        ]
    },
    {
        question: "미래의 내 직업에서 가장 중요하게 생각하는 것은?",
        answers: [
            { text: "다른 사람들에게 도움을 주고 기쁨을 주는 것", type: "social" },
            { text: "내 아이디어로 새로운 것을 창조하는 것", type: "creative" },
            { text: "복잡한 문제를 해결하고 원리를 알아내는 것", type: "logical" },
            { text: "한 곳에 머물지 않고 자유롭게 활동하는 것", type: "active" }
        ]
    }
];

// 결과 데이터
const results = {
    logical: {
        title: "🧠 논리/탐구형 (Logical)",
        desc: "호기심이 많고 문제를 해결하는 것을 좋아해요! \n추천 직업 분야: 프로그래머, 과학자, 연구원, 데이터 분석가"
    },
    creative: {
        title: "🎨 예술/창조형 (Creative)",
        desc: "상상력이 풍부하고 아름다운 것을 만들어내는 것을 좋아해요! \n추천 직업 분야: 디자이너, 작가, 일러스트레이터, 기획자"
    },
    social: {
        title: "🤝 사회/봉사형 (Social)",
        desc: "따뜻한 마음을 가지고 사람들과 소통하는 것을 좋아해요! \n추천 직업 분야: 교사, 상담사, 사회복지사, 의료인"
    },
    active: {
        title: "🏃‍♂️ 활동/현장형 (Active)",
        desc: "에너지가 넘치고 직접 경험하며 배우는 것을 좋아해요! \n추천 직업 분야: 경찰관, 운동선수, 여행 가이드, 건축가"
    }
};

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const resultTitle = document.getElementById('result-title');
const resultDesc = document.getElementById('result-desc');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let scores = { logical: 0, creative: 0, social: 0, active: 0 };

// 퀴즈 시작
function startGame() {
    currentQuestionIndex = 0;
    scores = { logical: 0, creative: 0, social: 0, active: 0 };
    quizContainer.classList.remove('hide');
    resultContainer.classList.add('hide');
    setNextQuestion();
}

// 다음 질문 표시
function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

// 질문과 버튼 화면에 그리기
function showQuestion(question) {
    questionElement.innerText = `Q${currentQuestionIndex + 1}. ${question.question}`;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer.type));
        answerButtonsElement.appendChild(button);
    });
}

// 기존 버튼 초기화
function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// 답변 선택 시 로직
function selectAnswer(type) {
    scores[type]++;
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        showResult();
    }
}

// 결과 계산 및 화면 표시
function showResult() {
    quizContainer.classList.add('hide');
    resultContainer.classList.remove('hide');

    // 가장 높은 점수를 받은 유형 찾기
    let highestType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    resultTitle.innerText = results[highestType].title;
    resultDesc.innerText = results[highestType].desc;
}

// 다시하기 버튼 이벤트
restartButton.addEventListener('click', startGame);

// 페이지 로드 시 퀴즈 시작
startGame();
