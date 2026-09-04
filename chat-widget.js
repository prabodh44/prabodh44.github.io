(() => {
  'use strict';

  // ---- Set this to your deployed Worker URL ----
  const WORKER_URL = "https://portfolio-chatbot.tuladharprabodhbiz.workers.dev";

  const toggle = document.getElementById('chatToggle');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  const sendBtn = form ? form.querySelector('.chat-panel__send') : null;

  if (!toggle || !panel || !form) return;

  const openPanel = () => {
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    input.focus();
  };
  const closePanel = () => {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    panel.classList.contains('is-open') ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
  });

  function addMessage(text, cls) {
    const div = document.createElement('div');
    div.className = `chat-msg chat-msg--${cls}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    addMessage(question, 'user');
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;

    const typingEl = addMessage('thinking…', 'typing');

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question }),
      });

      const data = await res.json();
      typingEl.remove();

      if (res.ok && data.reply) {
        addMessage(data.reply, 'bot');
      } else {
        addMessage("Something went wrong on my end. Please try again or email hello@prabodhtuladhar.com.np.", 'error');
      }
    } catch (err) {
      typingEl.remove();
      addMessage("Couldn't reach the server. Please check your connection and try again.", 'error');
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  });
})();
