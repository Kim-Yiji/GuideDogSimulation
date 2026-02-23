/* =============================================
   가이드독 매너 시뮬레이터 — 게임 로직
   ============================================= */

// ─── 문항 데이터 ────────────────────────────
const STAGES = [
  {
    id: 1,
    scene: 'public',
    situation: '길을 걷다가 <strong>안내견 조끼를 입은 강아지</strong>와 함께 걷는 사람을 만났어. 저 강아지, 뭐 하는 애일까?',
    question: '안내견은 어떤 역할을 하는 친구일까?',
    choices: [
      { text: '시각장애인이 어디든 출입 가능하게 해주는 "출입 패스"', correct: false },
      { text: '시각장애인의 안전한 보행을 돕도록 훈련된 보조견', correct: true },
      { text: '스트레스 풀어주는 힐링 반려견', correct: false },
      { text: '대신 물건 가져다주는 심부름견', correct: false },
    ],
    feedback: {
      correct: '✅ OK! 안내견은 "귀여운 반려견" 역할이 아니라 **안전 이동을 돕는 보조견**이야. 지금 이 친구는 열심히 일하는 중! 🐾',
      wrong:   '⚠️ 잠깐! 안내견은 보행 보조가 주 역할이야.',
      alt:     '대신 이렇게: **안내견 = 일하는 중**이라는 걸 항상 기억해. 반려견과 달라!'
    }
  },
  {
    id: 2,
    scene: 'talk',
    situation: '카페에서 안내견+핸들러 분이 음료를 주문하고 있어. 옆에 있던 사람이 갑자기 "어머, 강아지다! 🐶" 하며 안내견에게 말을 걸기 시작했어.',
    question: '공공장소에서 안내견을 만났을 때, 제일 별로인 행동은?',
    choices: [
      { text: '허락 없이 만지거나 부르지 않기 (=잘하는 것!)', correct: false },
      { text: '먹을 것 주지 않기 (=잘하는 것!)', correct: false },
      { text: '안내견+핸들러에게 말 걸어 집중을 깨기', correct: true },
      { text: '출입/탑승을 자연스럽게 받아들이기 (=잘하는 것!)', correct: false },
    ],
    feedback: {
      correct: '✅ OK! 안내견이 일할 때 방해하면 **핸들러 안전**에 바로 영향이 갈 수 있어. 집중 방해 NG!',
      wrong:   '⚠️ 잠깐! 안내견에게 말 걸거나 불러서 집중을 깨면 위험해.',
      alt:     '대신 이렇게: **그냥 지나치기**. 일하는 중인 강아지는 건드리지 않는 게 최선이야!'
    }
  },
  {
    id: 3,
    scene: 'snack',
    situation: '공원에서 안내견과 핸들러를 만났어. 주머니에 강아지 간식이 있었는데, 안내견이 너무 귀여워서 주고 싶어졌어.',
    question: '안내견에게 "절대 하면 안 되는" 건?',
    choices: [
      { text: '(허락받고) 잠깐 쓰다듬기', correct: false },
      { text: '음식/간식 주기', correct: true },
      { text: '안내견과 함께 병원에 가는 핸들러 응대하기', correct: false },
      { text: '자연스럽게 지나치기', correct: false },
    ],
    feedback: {
      correct: '✅ OK! 안내견은 먹는 것도 철저히 관리돼. 간식은 **건강 + 훈련** 둘 다 흔들 수 있어. 절대 NO!',
      wrong:   '⚠️ 잠깐! 간식 주는 건 안내견에게 아주 위험한 행동이야.',
      alt:     '대신 이렇게: **먹을 것은 절대 주지 말기**. 아무리 귀여워도! 건강과 훈련 상태에 영향을 줄 수 있어.'
    }
  },
  {
    id: 4,
    scene: 'restaurant',
    situation: '내가 일하는 식당에 안내견과 함께 온 손님이 들어왔어. 동료가 "개는 여기 못 들어와요"라고 말하려 하는 걸 봤어.',
    question: '가장 자연스러운 대응은?',
    choices: [
      { text: '"동물은 안 돼요" 하고 출입 거절', correct: false },
      { text: '다른 손님처럼 응대! 안내견은 보통 테이블 아래에 있어', correct: true },
      { text: '안내견을 따로 분리된 공간에 두게 한다', correct: false },
      { text: '안내견에게 음식/물을 줘서 편하게 한다', correct: false },
    ],
    feedback: {
      correct: '✅ OK! 안내견은 **공공장소 출입이 법적으로 허용**돼. 식당도 마찬가지야. 그냥 "평소처럼" 응대하면 돼!',
      wrong:   '⚠️ 잠깐! 안내견 출입을 거절하거나 분리하는 건 법적으로도 NG야.',
      alt:     '대신 이렇게: **안내견은 법적으로 공공장소 출입 허용**이라는 걸 기억해. 자연스럽게 다른 손님처럼 응대!'
    }
  },
  {
    id: 5,
    scene: 'help',
    situation: '지하철역에서 안내견+핸들러 분이 방향을 조금 헤매는 것 같아 보여. 도움을 주고 싶은데, 어떻게 하지?',
    question: '핸들러가 조금 헤매는 것 같다. 내가 할 일은?',
    choices: [
      { text: '안내견 리드(줄)를 잡고 "이쪽이요!"라고 이끌기', correct: false },
      { text: '안내견부터 쓰다듬고 친해지기', correct: false },
      { text: '핸들러에게 직접 "도움 필요하실까요?" 물어보기', correct: true },
      { text: '조끼 입은 관계자를 대신 찾아주기', correct: false },
    ],
    feedback: {
      correct: '✅ OK! 도움은 **안내견이 아니라 핸들러에게**. 리드를 잡으면 안내견이 헷갈릴 수 있어.',
      wrong:   '⚠️ 잠깐! 리드를 잡거나 안내견을 먼저 만지는 건 위험해.',
      alt:     '대신 이렇게: **"도움이 필요하신가요?"** 라고 핸들러에게 먼저 물어봐. 안내견은 건드리지 않기!'
    }
  },
  {
    id: 6,
    scene: 'touch',
    situation: '버스에서 안내견이 너무너무 귀엽다. 쓰다듬고 싶어 손이 저절로 가려고 해… 어떻게 할까?',
    question: '안내견 너무 귀엽다… 쓰다듬고 싶다. 정답 루트는?',
    choices: [
      { text: '살짝 머리를 바로 쓰다듬기', correct: false },
      { text: '핸들러에게 허락부터! 가능하면 일 끝난 뒤에', correct: true },
      { text: '이름을 부르면서 관심 끌기', correct: false },
      { text: '귀나 꼬리를 살살 만지기', correct: false },
    ],
    feedback: {
      correct: '✅ OK! 허락이 먼저. 그리고 보통은 **일할 때는 NO**인 경우가 많아. 꼭 물어봐!',
      wrong:   '⚠️ 잠깐! 안내견을 허락 없이 만지는 건 집중을 방해해.',
      alt:     '대신 이렇게: **반드시 핸들러에게 허락을 받고**, 일이 끝난 뒤에 시도해봐!'
    }
  },
  {
    id: 7,
    scene: 'subway',
    situation: '지하철에 안내견+핸들러 분이 탑승했어. 주변 승객들이 술렁이기 시작해. 나는 어떻게 해야 할까?',
    question: '지하철에 안내견+핸들러가 탑승했다. 가장 매너 있는 행동은?',
    choices: [
      { text: '불편하니 다른 칸으로 피하기', correct: false },
      { text: '"개는 안 되죠"라고 항의하기', correct: false },
      { text: '개인 공간 존중하고 그냥 평소처럼', correct: true },
      { text: '간식 줘서 조용히 있게 하기', correct: false },
    ],
    feedback: {
      correct: '✅ OK! 대중교통 탑승은 **법적으로 허용**이고, 우리가 할 일은 **방해하지 않기**야. 자연스럽게!',
      wrong:   '⚠️ 잠깐! 안내견의 대중교통 탑승은 당연한 권리야.',
      alt:     '대신 이렇게: **그냥 평소처럼**. 탑승을 허용하고 개인 공간을 존중해주는 것만으로도 충분해!'
    }
  },
  {
    id: 8,
    scene: 'cafe',
    situation: '안내견 에티켓에 대한 최종 퀴즈! 카페에서 안내견을 봤어. 다음 행동 중 하나만 에티켓 위반이야.',
    question: '다음 중 에티켓으로 제일 부적절한 행동은?',
    choices: [
      { text: '편해 보일 때, 허락받고 쓰다듬기', correct: false },
      { text: '안내견은 출입 허용이라는 걸 알고 자연스럽게 받아들이기', correct: false },
      { text: '카페에서 안내견을 위해 물그릇을 준비해주기 (핸들러 허락 후)', correct: false },
      { text: '허락 없이 귀/꼬리를 만지기', correct: true },
    ],
    feedback: {
      correct: '✅ OK! 신체 접촉은 무조건 **허락 먼저**. 특히 귀/꼬리/발은 더 민감할 수 있어. 완벽한 에티켓!',
      wrong:   '⚠️ 잠깐! 허락 없이 신체를 만지는 건 큰 실례야.',
      alt:     '대신 이렇게: 신체 접촉은 **항상 허락 먼저**. 아무리 귀여워도 먼저 물어보는 게 기본 매너!'
    }
  }
];

// ─── 엔딩 데이터 ────────────────────────────
const ENDINGS = [
  {
    minScore: 80,
    emoji: '🏆',
    title: '매너 마스터',
    desc: '안내견 에티켓을 완벽하게 알고 있어!\n같이 있어주면 핸들러 분들도 안심할 수 있겠는걸?',
    color: '#F59E0B',
    dogEmoji: '🐕‍🦺'
  },
  {
    minScore: 60,
    emoji: '🛡️',
    title: '안전 지킴이',
    desc: '안내견 에티켓을 잘 알고 있어!\n조금만 더 연습하면 완벽해질 것 같아.',
    color: '#22C55E',
    dogEmoji: '🐕'
  },
  {
    minScore: 40,
    emoji: '🔍',
    title: '호기심 많은 시민',
    desc: '안내견에 관심은 많은데, 에티켓은 조금 더 공부하면 좋겠어.\n오답 복습으로 다시 확인해봐!',
    color: '#3B82F6',
    dogEmoji: '🐶'
  },
  {
    minScore: 0,
    emoji: '📚',
    title: '오늘은 연습이 필요!',
    desc: '안내견 에티켓을 알아가는 중이야!\n틀린 문제를 복습하고 다시 도전해봐. 응원해! 💪',
    color: '#EF4444',
    dogEmoji: '🐾'
  }
];

// ─── 게임 상태 ────────────────────────────────
let gameState = {
  currentStage: 0,
  score: 0,
  answers: [],    // { stageIdx, correct, myAnswerIdx, correctIdx }
  answered: false
};

// ─── 화면 전환 ────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ─── 게임 시작 ────────────────────────────────
function startGame() {
  gameState = { currentStage: 0, score: 0, answers: [], answered: false };
  showScreen('screen-game');
  renderStage();
}

function retryGame() {
  startGame();
}

// ─── 스테이지 렌더링 ──────────────────────────
function renderStage() {
  const idx = gameState.currentStage;
  const stage = STAGES[idx];

  // HUD 업데이트
  document.getElementById('stage-badge').textContent = `STAGE ${idx + 1}`;
  document.getElementById('score-display').textContent = gameState.score;
  updateProgressBar(idx);
  updateStageDots(idx);

  // 씬
  const sceneEl = document.getElementById('situation-scene');
  sceneEl.innerHTML = buildScene(stage.scene);
  sceneEl.className = 'situation-scene';
  sceneEl.style.animation = 'none';
  requestAnimationFrame(() => {
    sceneEl.style.animation = '';
    sceneEl.classList.add('fadeIn');
  });

  // 상황 텍스트
  document.getElementById('situation-text').innerHTML = stage.situation;

  // 질문
  document.getElementById('question-text').textContent = stage.question;

  // 선택지
  const choicesEl = document.getElementById('choices');
  choicesEl.innerHTML = '';
  stage.choices.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `<span class="choice-num">${i + 1}</span><span>${c.text}</span>`;
    btn.addEventListener('click', () => selectChoice(i));
    choicesEl.appendChild(btn);
  });

  // 피드백 숨기기
  const fb = document.getElementById('feedback-box');
  fb.style.display = 'none';
  fb.className = 'feedback-box';

  gameState.answered = false;
}

// ─── 선택지 선택 ──────────────────────────────
function selectChoice(choiceIdx) {
  if (gameState.answered) return;
  gameState.answered = true;

  const idx = gameState.currentStage;
  const stage = STAGES[idx];
  const isCorrect = stage.choices[choiceIdx].correct;
  const correctIdx = stage.choices.findIndex(c => c.correct);

  // 점수 계산
  if (isCorrect) {
    gameState.score += 10;
    document.getElementById('score-display').textContent = gameState.score;
    spawnParticles(true);
  } else {
    spawnParticles(false);
  }

  // 정답 기록
  gameState.answers.push({
    stageIdx: idx,
    correct: isCorrect,
    myAnswerIdx: choiceIdx,
    correctIdx: correctIdx
  });

  // 선택지 스타일 업데이트
  const btns = document.querySelectorAll('.choice-btn');
  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIdx) {
      btn.classList.add('correct');
    } else if (i === choiceIdx && !isCorrect) {
      btn.classList.add('wrong');
      btn.classList.add('shake');
    } else {
      btn.classList.add('dim');
    }
  });

  // 도트 업데이트
  updateStageDots(idx, isCorrect);

  // 피드백 표시
  showFeedback(stage, isCorrect);
}

// ─── 피드백 표시 ──────────────────────────────
function showFeedback(stage, isCorrect) {
  const fb = document.getElementById('feedback-box');
  fb.style.display = 'block';

  if (isCorrect) {
    fb.className = 'feedback-box is-correct';
    document.getElementById('feedback-icon').textContent = '🎉';
    document.getElementById('feedback-main').innerHTML =
      stage.feedback.correct.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  } else {
    fb.className = 'feedback-box is-wrong';
    document.getElementById('feedback-icon').textContent = '💡';
    document.getElementById('feedback-main').innerHTML =
      stage.feedback.wrong.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }

  document.getElementById('feedback-alt').innerHTML =
    stage.feedback.alt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 마지막 스테이지면 버튼 텍스트 변경
  const btnNext = document.getElementById('btn-next');
  btnNext.textContent = gameState.currentStage === STAGES.length - 1
    ? '결과 보기 🏁'
    : '다음 →';

  // 스크롤
  setTimeout(() => {
    fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 200);
}

// ─── 다음 스테이지 ────────────────────────────
function nextStage() {
  gameState.currentStage++;
  if (gameState.currentStage >= STAGES.length) {
    showResult();
  } else {
    renderStage();
    document.getElementById('situation-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ─── 진행 바 업데이트 ─────────────────────────
function updateProgressBar(currentIdx) {
  const pct = ((currentIdx) / STAGES.length) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
}

// ─── 스테이지 도트 ───────────────────────────
function updateStageDots(currentIdx, isCorrect) {
  const container = document.getElementById('stage-dots');
  container.innerHTML = '';
  STAGES.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'stage-dot';
    const ans = gameState.answers.find(a => a.stageIdx === i);
    if (ans) {
      dot.classList.add(ans.correct ? 'correct' : 'wrong');
    } else if (i === currentIdx) {
      dot.classList.add('current');
    }
    container.appendChild(dot);
  });
}

// ─── 결과 화면 ───────────────────────────────
function showResult() {
  showScreen('screen-result');

  const score = gameState.score;
  const ending = ENDINGS.find(e => score >= e.minScore);
  const correctCount = gameState.answers.filter(a => a.correct).length;
  const wrongCount = STAGES.length - correctCount;

  // 애니메이션 점수 카운트업
  animateScore(score);

  // 결과 내용
  document.getElementById('result-dog').textContent = ending.dogEmoji;
  document.getElementById('result-badge').textContent = `${ending.emoji} 칭호 획득`;
  document.getElementById('result-title').textContent = ending.title;
  document.getElementById('result-sub').textContent = ending.desc;

  // 정답/오답 breakdown
  const breakdown = document.getElementById('result-breakdown');
  breakdown.innerHTML = `
    <div class="bd-item">✅ 정답 <strong>${correctCount}개</strong></div>
    <div class="bd-item">❌ 오답 <strong>${wrongCount}개</strong></div>
    <div class="bd-item">🏅 ${score}/80점</div>
  `;

  // 총평
  const summary = getSummary(correctCount, wrongCount);
  document.getElementById('result-summary').innerHTML = summary;

  // 오답 없으면 복습 버튼 숨기기
  const btnReview = document.querySelector('.btn-review');
  if (wrongCount === 0) {
    btnReview.style.display = 'none';
  } else {
    btnReview.style.display = '';
  }

  // 진행바 100%
  document.getElementById('progress-bar').style.width = '100%';
}

// 점수 카운트업 애니메이션
function animateScore(target) {
  let current = 0;
  const el = document.getElementById('result-score');
  const step = Math.max(1, Math.floor(target / 30));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 40);
}

// 총평 텍스트 생성
function getSummary(correct, wrong) {
  const wrongStages = gameState.answers.filter(a => !a.correct);
  if (wrong === 0) {
    return `<strong>🌟 완벽해!</strong> 안내견 에티켓을 모두 알고 있어. 앞으로도 안내견을 만나면 자신 있게 매너를 실천해봐!`;
  }

  const wrongTopics = wrongStages.map(a => {
    const topics = ['안내견의 역할', '집중 방해 금지', '간식 주기 금지', '출입 허용', '핸들러에게 먼저', '허락 후 쓰다듬기', '대중교통 탑승', '신체 접촉 예절'];
    return topics[a.stageIdx] || `STAGE ${a.stageIdx + 1}`;
  });

  return `<strong>💡 복습 포인트:</strong> ${wrongTopics.join(', ')} 부분을 더 알아보면 좋겠어!<br>
  <span style="font-size:12px;margin-top:4px;display:block">아래 "오답 복습" 버튼으로 다시 확인해봐 🐾</span>`;
}

// ─── 오답 복습 화면 ──────────────────────────
function showReview() {
  showScreen('screen-review');

  const wrongAnswers = gameState.answers.filter(a => !a.correct);
  const listEl = document.getElementById('review-list');
  listEl.innerHTML = '';

  if (wrongAnswers.length === 0) {
    listEl.innerHTML = '<p style="text-align:center;color:#64748B;padding:20px">오답이 없어! 완벽해 🎉</p>';
    return;
  }

  wrongAnswers.forEach(a => {
    const stage = STAGES[a.stageIdx];
    const myChoice = stage.choices[a.myAnswerIdx].text;
    const correctChoice = stage.choices[a.correctIdx].text;

    const item = document.createElement('div');
    item.className = 'review-item';
    item.innerHTML = `
      <div class="ri-stage">⚠️ STAGE ${a.stageIdx + 1}</div>
      <div class="ri-q">Q. ${stage.question}</div>
      <div class="ri-my">❌ 내 답변: ${myChoice}</div>
      <div class="ri-correct">✅ 정답: ${correctChoice}</div>
      <div class="ri-feedback">
        💡 ${stage.feedback.wrong.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}<br>
        ${stage.feedback.alt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
      </div>
    `;
    listEl.appendChild(item);
  });
}

function backToResult() {
  showScreen('screen-result');
}

// ─── 파티클 효과 ─────────────────────────────
function spawnParticles(isCorrect) {
  const emojis = isCorrect
    ? ['🐾', '✅', '⭐', '🎉', '💫', '🌟']
    : ['💡', '📖', '🔁'];
  const container = document.body;

  for (let i = 0; i < (isCorrect ? 8 : 3); i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed;
      font-size: ${Math.random() * 16 + 14}px;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 40 + 10}vh;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      animation: particleFly 1.2s ease forwards;
      animation-delay: ${Math.random() * 0.3}s;
    `;
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    container.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
}

// ─── 초기화 ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // stage-dots 초기화
  const dotsEl = document.getElementById('stage-dots');
  if (dotsEl) {
    STAGES.forEach(() => {
      const dot = document.createElement('div');
      dot.className = 'stage-dot';
      dotsEl.appendChild(dot);
    });
  }
});
