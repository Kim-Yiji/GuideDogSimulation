/* =============================================
   가이드독 매너 시뮬레이터 — 게임 로직 (안내견 관점)
   ============================================= */

// ─── 문항 데이터 (안내견 관점) ────────────────────────────
const STAGES = [
  {
    id: 1,
    scene: 'public',
    situation: '나는 안내견! 오늘도 핸들러와 함께 거리를 걷고 있어. 사람들이 나를 보고 "귀엽다!"라고 하는데...',
    question: '나는 안내견! 내 \'주업무\'는 뭐지?',
    choices: [
      { text: '사람들한테 귀여움 받기', correct: false },
      { text: '핸들러가 어디든 입장하게 해주는 \'출입 패스\' 역할', correct: false },
      { text: '핸들러가 안전하게 걷도록 길을 찾고 장애물을 피하게 돕기', correct: true },
      { text: '대신 물건 가져오기(심부름 마스터)', correct: false },
    ],
    feedback: {
      correct: '✅ 맞아! 나는 반려견 모드가 아니라 **안전 이동 도우미 모드**가 기본값이야! 🐾',
      wrong:   '⚠️ 잠깐! 나는 귀여움 받으러 온 게 아니라 일하러 왔어.',
      alt:     '핵심: 안내견은 **보행 안전**을 최우선으로 생각해. 산책견이 아니야!'
    }
  },
  {
    id: 2,
    scene: 'talk',
    situation: '길에서 누군가 "강아지다! 이리 와~" 하면서 내 이름을 부르고 말도 걸어. 나는 어떻게 해야 할까?',
    question: '길에서 누가 내 이름을 부르고 말도 걸어. 나는?',
    choices: [
      { text: '"나 불렀어?" 하고 바로 쳐다본다', correct: false },
      { text: '꼬리 흔들며 다가가 인사한다', correct: false },
      { text: '핸들러에게 집중 유지! 시선/몸을 크게 움직이지 않는다', correct: true },
      { text: '그 사람 무릎 위로 점프한다', correct: false },
    ],
    feedback: {
      correct: '✅ 정답! 일하는 중엔 "친절한 인사"가 아니라 **집중 유지**가 안전이야.',
      wrong:   '⚠️ 잠깐! 나는 지금 일하는 중이야. 딴 데 보면 위험해.',
      alt:     '핵심: 안내견은 **핸들러에게만 집중**해야 안전하게 이동할 수 있어.'
    }
  },
  {
    id: 3,
    scene: 'snack',
    situation: '공원을 지나가는데 낯선 사람이 간식을 내밀어. 냄새가 정말 좋은데... 어떻게 하지?',
    question: '낯선 사람이 간식을 내민다. 나는?',
    choices: [
      { text: '일하는 중이어도 간식이면 먹는다', correct: false },
      { text: '먹고 싶으니까 핸들러 줄을 당긴다', correct: false },
      { text: '먹지 않는다. (훈련된 식단/집중 유지가 우선)', correct: true },
      { text: '몰래 먹고 아무 일 없었던 척한다', correct: false },
    ],
    feedback: {
      correct: '✅ 완벽해! 간식은 집중력을 깨고, 건강에도 영향 줄 수 있어. **거절이 매너!**',
      wrong:   '⚠️ 잠깐! 간식 먹으면 일에 집중 못 하고 배탈 날 수도 있어.',
      alt:     '핵심: 안내견은 **통제된 식단**만 먹어야 건강하고 집중할 수 있어.'
    }
  },
  {
    id: 4,
    scene: 'touch',
    situation: '버스 정류장에서 기다리는데 누군가 갑자기 내 머리를 쓰다듬으려고 손을 뻗어. 나는 어떻게 할까?',
    question: '누군가 갑자기 내 머리를 쓰다듬으려 한다. 나는?',
    choices: [
      { text: '"좋아!" 하고 몸을 비빈다', correct: false },
      { text: '낯선 손이면 피한다(무조건 으르렁)', correct: false },
      { text: '핸들러 곁에서 자세 유지(가능하면 시선/몸을 크게 흔들지 않기)', correct: true },
      { text: '배를 까고 눕는다(오늘부터 친구)', correct: false },
    ],
    feedback: {
      correct: '✅ 훌륭해! 일하는 중엔 쓰다듬기 자체가 방해가 될 수 있어. 나는 **흔들리지 않는다…!**',
      wrong:   '⚠️ 잠깐! 쓰다듬기에 반응하면 일에 집중 못 해.',
      alt:     '핵심: 안내견은 **신체 접촉에도 평정심 유지**해야 해. 일이 우선!'
    }
  },
  {
    id: 5,
    scene: 'help',
    situation: '횡단보도 앞인데 차가 빠르게 달려오고 있어. 핸들러는 신호를 보지 못하는데... 나는?',
    question: '앞으로 가면 위험해 보여(차가 빠르게 오거나, 공사 구간 등). 나는?',
    choices: [
      { text: '핸들러가 가자니까 무조건 전진', correct: false },
      { text: '"모르겠다" 하고 멈춘다(이유 없이)', correct: false },
      { text: '위험하면 멈춘다/돌아선다! 안전을 위한 \'멈춤\'이 가능하다', correct: true },
      { text: '혼자 먼저 뛰어서 길을 확인하고 온다', correct: false },
    ],
    feedback: {
      correct: '✅ 완벽! 안내견은 단순히 "명령 수행"이 아니라 **안전이 최우선**이야. 위험하면 멈추는 건 아주 중요한 능력이야.',
      wrong:   '⚠️ 잠깐! 안내견은 위험을 판단하고 멈출 수 있어야 해.',
      alt:     '핵심: 안내견은 **상황을 판단**해서 핸들러를 보호할 수 있어.'
    }
  },
  {
    id: 6,
    scene: 'restaurant',
    situation: '핸들러와 함께 식당에 들어왔어. 음식 냄새가 너무 좋은데... 나는 어디에 있어야 할까?',
    question: '식당에 왔다. 나는 어디에 있어야 할까?',
    choices: [
      { text: '의자에 앉아서 사람처럼 먹는다', correct: false },
      { text: '다른 손님에게 돌아다니며 인사한다', correct: false },
      { text: '테이블 아래나 핸들러 옆에서 조용히 대기한다', correct: true },
      { text: '주방 앞에서 음식 냄새 맡고 서성인다', correct: false },
    ],
    feedback: {
      correct: '✅ 정답! 공공장소에서는 **조용히 자리 지키기**가 기본 매너야.',
      wrong:   '⚠️ 잠깐! 식당에서 돌아다니면 안 돼. 조용히 있어야 해.',
      alt:     '핵심: 안내견은 **눈에 띄지 않게** 핸들러 곁을 지켜야 해.'
    }
  },
  {
    id: 7,
    scene: 'subway',
    situation: '지하철에 탑승했어. 사람이 많고 공간이 좁은데... 나는 어떻게 해야 할까?',
    question: '지하철에 탔다. 나는?',
    choices: [
      { text: '사람들 사이로 돌아다닌다', correct: false },
      { text: '낯선 사람 무릎에 얼굴 올리고 쉰다', correct: false },
      { text: '핸들러 가까이, 발밑/옆에서 조용히 대기한다', correct: true },
      { text: '다른 강아지 만나면 놀자고 달려간다', correct: false },
    ],
    feedback: {
      correct: '✅ 완벽해! 대중교통에서는 **공간 존중 + 안정적인 대기**가 안전!',
      wrong:   '⚠️ 잠깐! 대중교통에서는 더욱 조용히 있어야 해.',
      alt:     '핵심: 안내견은 **최소한의 공간**만 차지하며 핸들러를 방해하지 않아야 해.'
    }
  },
  {
    id: 8,
    scene: 'cafe',
    situation: '카페에서 누군가 핸들러를 도와주겠다며 내 리드(줄)를 잡으려고 해. 나는 어떻게 해야 할까?',
    question: '누군가 핸들러를 도와주겠다며 내 리드(줄)를 잡으려 한다. 나는?',
    choices: [
      { text: '좋아! 그 사람 따라간다', correct: false },
      { text: '줄을 뺏기지 않으려고 장난친다', correct: false },
      { text: '내 줄은 \'핸들러와의 연결\'! 낯선 사람이 잡으면 혼란이 생길 수 있어', correct: true },
      { text: '그 사람 손에 줄을 얹어준다(협조)', correct: false },
    ],
    feedback: {
      correct: '✅ 정확해! 리드는 내 장난감이 아니라 **핸들러와의 안전 연결선**이야. 낯선 사람이 잡으면 방향/신호가 꼬일 수 있어.',
      wrong:   '⚠️ 잠깐! 리드는 핸들러하고만 연결되어야 해.',
      alt:     '핵심: 리드는 **핸들러와의 신뢰와 소통**을 상징해. 함부로 다른 사람이 잡으면 안 돼.'
    }
  }
];

// ─── 엔딩 데이터 ────────────────────────────
const ENDINGS = [
  {
    minScore: 80,
    emoji: '🏆',
    title: '완벽한 안내견',
    desc: '모든 상황에서 완벽하게 대처했어!\n나는 진정한 프로 안내견이야! 🐕‍🦺',
    color: '#F59E0B',
    dogEmoji: '🐕‍🦺'
  },
  {
    minScore: 60,
    emoji: '🛡️',
    title: '믿음직한 파트너',
    desc: '대부분의 상황을 잘 헤쳐나갔어!\n조금만 더 연습하면 완벽해질 거야.',
    color: '#22C55E',
    dogEmoji: '🐕'
  },
  {
    minScore: 40,
    emoji: '🔍',
    title: '성장하는 안내견',
    desc: '아직 배울 게 많지만 열심히 하고 있어!\n오답 복습으로 더 공부해보자.',
    color: '#3B82F6',
    dogEmoji: '🐶'
  },
  {
    minScore: 0,
    emoji: '📚',
    title: '훈련 중인 강아지',
    desc: '안내견이 되려면 더 많은 훈련이 필요해!\n틀린 문제를 복습하고 다시 도전해봐. 💪',
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
    return `<strong>🌟 완벽해!</strong> 모든 상황에서 올바르게 판단했어. 너는 진정한 프로 안내견이야!`;
  }

  const wrongTopics = wrongStages.map(a => {
    const topics = ['나의 역할', '집중 유지', '간식 거절', '신체 접촉', '위험 판단', '식당 매너', '대중교통', '리드 관리'];
    return topics[a.stageIdx] || `STAGE ${a.stageIdx + 1}`;
  });

  return `<strong>💡 복습 포인트:</strong> ${wrongTopics.join(', ')} 부분을 더 연습해보자!<br>
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
      <div class="ri-my">❌ 내 선택: ${myChoice}</div>
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
