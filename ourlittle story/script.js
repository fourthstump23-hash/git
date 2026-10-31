/**
 * ============================================================================
 * A LITTLE PUPPY WANTS TO SAY SORRY 🐶❤️
 * Interactive Script: Screen Transitions, Puppy Emotions, Canvas Animations & Audio
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // DOM ELEMENT REFERENCES
  // --------------------------------------------------------------------------
  const screens = {
    welcome: document.getElementById('screen-welcome'),
    apology: document.getElementById('screen-apology'),
    question: document.getElementById('screen-question'),
    surprise: document.getElementById('screen-surprise')
  };

  // Buttons
  const btnToApology = document.getElementById('btn-to-apology');
  const btnToQuestion = document.getElementById('btn-to-question');
  const btnYes = document.getElementById('btn-yes');
  const btnAngry = document.getElementById('btn-angry');
  const btnAskAgain = document.getElementById('btn-ask-again');
  const btnToSurprise = document.getElementById('btn-to-surprise');
  const btnRestart = document.getElementById('btn-restart');
  const musicToggle = document.getElementById('music-toggle');
  const musicIcon = document.getElementById('music-icon');
  const musicText = document.getElementById('music-text');

  // Question State Containers
  const boxQuestion = document.getElementById('box-question');
  const boxHappy = document.getElementById('box-happy');
  const boxAngry = document.getElementById('box-angry');

  // Puppy State Images in Question Screen
  const imgPuppyQuestion = document.getElementById('img-puppy-question');
  const imgPuppyHappy = document.getElementById('img-puppy-happy');
  const imgPuppySad = document.getElementById('img-puppy-sad');

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --------------------------------------------------------------------------
  // SCREEN TRANSITIONS
  // --------------------------------------------------------------------------
  function navigateTo(targetScreen) {
    Object.values(screens).forEach(screen => {
      if (screen) {
        screen.classList.remove('active');
      }
    });

    if (screens[targetScreen]) {
      screens[targetScreen].classList.add('active');
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  }

  // Welcome -> Apology
  if (btnToApology) {
    btnToApology.addEventListener('click', () => {
      soundEngine.playChime(587.33); // D5
      navigateTo('apology');
    });
  }

  // Apology -> Question
  if (btnToQuestion) {
    btnToQuestion.addEventListener('click', () => {
      soundEngine.playChime(659.25); // E5
      resetQuestionScreen();
      navigateTo('question');
    });
  }

  // --------------------------------------------------------------------------
  // QUESTION SCREEN LOGIC (YES / STILL ANGRY)
  // --------------------------------------------------------------------------
  function resetQuestionScreen() {
    // Reset state boxes
    boxQuestion.classList.add('active');
    boxHappy.classList.remove('active');
    boxAngry.classList.remove('active');

    // Reset puppy images
    imgPuppyQuestion.classList.add('active');
    imgPuppyHappy.classList.remove('active');
    imgPuppySad.classList.remove('active');
    imgPuppyHappy.classList.remove('puppy-jump');

    // Reset theme
    document.body.classList.remove('theme-celebration');
  }

  // 1. User Clicks: "YESSS, I forgive you ❤️"
  if (btnYes) {
    btnYes.addEventListener('click', () => {
      // Play joyful harmony
      soundEngine.playCelebrationChord();

      // Switch puppy image to Happy Puppy + add jumping animation
      imgPuppyQuestion.classList.remove('active');
      imgPuppySad.classList.remove('active');
      imgPuppyHappy.classList.add('active');
      if (!prefersReducedMotion) {
        imgPuppyHappy.classList.add('puppy-jump');
      }

      // Switch question box to Happy Box
      boxQuestion.classList.remove('active');
      boxAngry.classList.remove('active');
      boxHappy.classList.add('active');

      // Change background into bright happy pink
      document.body.classList.add('theme-celebration');

      // Trigger Confetti Explosion
      if (!prefersReducedMotion) {
        confettiCannon.burst();
      }

      // Spawn extra floating hearts on canvas
      heartCanvas.burstHearts(window.innerWidth / 2, window.innerHeight * 0.45, 24);
    });
  }

  // 2. User Clicks: "I'M STILL ANGRY 😤"
  if (btnAngry) {
    btnAngry.addEventListener('click', () => {
      soundEngine.playChime(392.00); // G4 gentle tone

      // Switch puppy to Sad / Patient waiting puppy
      imgPuppyQuestion.classList.remove('active');
      imgPuppyHappy.classList.remove('active');
      imgPuppyHappy.classList.remove('puppy-jump');
      imgPuppySad.classList.add('active');

      // Switch question box to Patient Waiting Box
      boxQuestion.classList.remove('active');
      boxHappy.classList.remove('active');
      boxAngry.classList.add('active');

      // Normal background
      document.body.classList.remove('theme-celebration');
    });
  }

  // "Can I ask again later? 🐶" button -> return to initial question screen
  if (btnAskAgain) {
    btnAskAgain.addEventListener('click', () => {
      soundEngine.playChime(523.25); // C5
      resetQuestionScreen();
    });
  }

  // "Send him a little surprise 💌" button -> Transition to Final Screen
  if (btnToSurprise) {
    btnToSurprise.addEventListener('click', () => {
      soundEngine.playChime(783.99); // G5
      navigateTo('surprise');
      if (!prefersReducedMotion) {
        confettiCannon.gentleShower();
      }
    });
  }

  // "Look at the puppy again" -> Restart experience
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      soundEngine.playChime(523.25);
      resetQuestionScreen();
      navigateTo('welcome');
    });
  }

  // --------------------------------------------------------------------------
  // BACKGROUND FLOATING HEARTS & SPARKLES CANVAS
  // --------------------------------------------------------------------------
  class HeartCanvas {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.maxParticles = prefersReducedMotion ? 12 : 36;
      this.resize();
      this.init();

      window.addEventListener('resize', () => this.resize());

      // Interactive touch / click heart bursts
      window.addEventListener('pointerdown', (e) => {
        // Spawn small burst where user tapped/clicked
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
          this.burstHearts(e.clientX, e.clientY, 6);
        }
      });
    }

    resize() {
      if (!this.canvas) return;
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    init() {
      for (let i = 0; i < this.maxParticles; i++) {
        this.particles.push(this.createParticle(true));
      }
      this.animate();
    }

    createParticle(randomY = false) {
      const isSparkle = Math.random() < 0.35;
      return {
        x: Math.random() * this.width,
        y: randomY ? Math.random() * this.height : this.height + 20,
        size: isSparkle ? (Math.random() * 4 + 2) : (Math.random() * 14 + 10),
        speedY: (Math.random() * 0.8 + 0.4) * (prefersReducedMotion ? 0.3 : 1),
        speedX: (Math.sin(Math.random() * Math.PI * 2) * 0.4),
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.01,
        opacity: Math.random() * 0.45 + 0.25,
        rotation: (Math.random() - 0.5) * 0.4,
        isSparkle: isSparkle,
        color: ['#FF8FA3', '#FFB3C1', '#FFCCD5', '#E8D7F1', '#FFE5D9'][Math.floor(Math.random() * 5)]
      };
    }

    burstHearts(originX, originY, count = 8) {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i + (Math.random() * 0.4 - 0.2);
        const speed = Math.random() * 2.5 + 1.2;
        this.particles.push({
          x: originX,
          y: originY,
          size: Math.random() * 12 + 10,
          speedY: -Math.abs(Math.sin(angle) * speed) - 0.8,
          speedX: Math.cos(angle) * speed,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.04,
          opacity: 0.85,
          rotation: (Math.random() - 0.5) * 0.8,
          isSparkle: Math.random() < 0.25,
          color: ['#FF4D6D', '#FF758F', '#FF8FA3', '#FFB3C1'][Math.floor(Math.random() * 4)],
          decay: 0.008
        });
      }
    }

    drawHeart(x, y, size, opacity, color, rotation) {
      const ctx = this.ctx;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;

      const scale = size / 20;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10 * scale, -10 * scale, -18 * scale, 5 * scale, 0, 18 * scale);
      ctx.bezierCurveTo(18 * scale, 5 * scale, 10 * scale, -10 * scale, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    drawSparkle(x, y, size, opacity, color) {
      const ctx = this.ctx;
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.lineTo(size * 1.8, 0);
        ctx.lineTo(size * 0.35, size * 0.35);
      }
      ctx.fill();
      ctx.restore();
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];

        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.5;
        p.y -= p.speedY;

        if (p.decay) {
          p.opacity -= p.decay;
          if (p.opacity <= 0) {
            this.particles.splice(i, 1);
            continue;
          }
        }

        if (p.isSparkle) {
          this.drawSparkle(p.x, p.y, p.size, p.opacity, p.color);
        } else {
          this.drawHeart(p.x, p.y, p.size, p.opacity, p.color, p.rotation);
        }

        // Recycle continuous background particles
        if (!p.decay && p.y < -30) {
          this.particles[i] = this.createParticle(false);
        }
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  const heartCanvas = new HeartCanvas('bg-canvas');

  // --------------------------------------------------------------------------
  // CELEBRATION CONFETTI ENGINE
  // --------------------------------------------------------------------------
  class ConfettiEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.pieces = [];
      this.animating = false;
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      if (!this.canvas) return;
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    burst() {
      const colors = ['#FF4D6D', '#FF758F', '#FF8FA3', '#FFCCD5', '#D8BFD8', '#FFB703', '#FFFFFF'];
      const pieceCount = 110;

      for (let i = 0; i < pieceCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 14 + 6;
        this.pieces.push({
          x: this.width / 2 + (Math.random() * 80 - 40),
          y: this.height * 0.45 + (Math.random() * 80 - 40),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 6,
          size: Math.random() * 9 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          type: Math.random() < 0.4 ? 'heart' : 'ribbon',
          opacity: 1,
          gravity: 0.38
        });
      }

      if (!this.animating) {
        this.animating = true;
        this.render();
      }
    }

    gentleShower() {
      const colors = ['#FF4D6D', '#FF758F', '#FFCCD5', '#FFFFFF', '#FFB703'];
      for (let i = 0; i < 45; i++) {
        this.pieces.push({
          x: Math.random() * this.width,
          y: -10 - Math.random() * 80,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 3 + 1.5,
          size: Math.random() * 8 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 6,
          type: Math.random() < 0.6 ? 'heart' : 'ribbon',
          opacity: 1,
          gravity: 0.1
        });
      }

      if (!this.animating) {
        this.animating = true;
        this.render();
      }
    }

    render() {
      if (this.pieces.length === 0) {
        this.animating = false;
        this.ctx.clearRect(0, 0, this.width, this.height);
        return;
      }

      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = this.pieces.length - 1; i >= 0; i--) {
        const p = this.pieces[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.007;

        if (p.opacity <= 0 || p.y > this.height + 40) {
          this.pieces.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillStyle = p.color;

        if (p.type === 'heart') {
          const s = p.size / 16;
          this.ctx.beginPath();
          this.ctx.moveTo(0, 0);
          this.ctx.bezierCurveTo(-8 * s, -8 * s, -14 * s, 4 * s, 0, 14 * s);
          this.ctx.bezierCurveTo(14 * s, 4 * s, 8 * s, -8 * s, 0, 0);
          this.ctx.fill();
        } else {
          this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }

        this.ctx.restore();
      }

      requestAnimationFrame(() => this.render());
    }
  }

  const confettiCannon = new ConfettiEngine('confetti-canvas');

  // --------------------------------------------------------------------------
  // ROMANTIC MUSIC BOX & WEB AUDIO SYNTHESIZER
  // --------------------------------------------------------------------------
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.melodyInterval = null;
      this.noteIndex = 0;

      // Romantic music box notes (frequencies in Hz: C5, E5, G5, A5, C6, etc.)
      this.melody = [
        { note: 523.25, dur: 450 }, // C5
        { note: 659.25, dur: 450 }, // E5
        { note: 783.99, dur: 450 }, // G5
        { note: 659.25, dur: 450 }, // E5
        { note: 880.00, dur: 500 }, // A5
        { note: 783.99, dur: 450 }, // G5
        { note: 659.25, dur: 450 }, // E5
        { note: 587.33, dur: 600 }, // D5
        { note: 523.25, dur: 450 }, // C5
        { note: 587.33, dur: 450 }, // D5
        { note: 659.25, dur: 500 }, // E5
        { note: 523.25, dur: 700 }, // C5
        { note: 440.00, dur: 450 }, // A4
        { note: 523.25, dur: 450 }, // C5
        { note: 587.33, dur: 600 }, // D5
        { note: 523.25, dur: 800 }  // C5
      ];
    }

    initContext() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // Play a gentle sweet celesta/music-box chime tone
    playChime(freq, duration = 0.5, volume = 0.12) {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Music box timbre: sine + slight triangle overtone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (err) {
        // Silent catch for background audio limits
      }
    }

    playCelebrationChord() {
      if (!this.ctx) return;
      // Arpeggiated C major celebration chime
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playChime(freq, 0.7, 0.14);
        }, idx * 100);
      });
    }

    startMelody() {
      this.initContext();
      this.isPlaying = true;
      this.stepMelody();
    }

    stepMelody() {
      if (!this.isPlaying) return;

      const current = this.melody[this.noteIndex];
      this.playChime(current.note, 0.6, 0.1);

      this.noteIndex = (this.noteIndex + 1) % this.melody.length;
      this.melodyInterval = setTimeout(() => {
        this.stepMelody();
      }, current.dur);
    }

    stopMelody() {
      this.isPlaying = false;
      if (this.melodyInterval) {
        clearTimeout(this.melodyInterval);
        this.melodyInterval = null;
      }
    }

    toggle() {
      this.initContext();
      if (this.isPlaying) {
        this.stopMelody();
        return false;
      } else {
        this.startMelody();
        return true;
      }
    }
  }

  const soundEngine = new SoundEngine();

  // Music Toggle Button Listener
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      const playing = soundEngine.toggle();
      if (playing) {
        musicToggle.classList.add('playing');
        musicIcon.textContent = '🎵';
        musicText.textContent = 'Playing';
        musicToggle.setAttribute('title', 'Pause romantic music');
      } else {
        musicToggle.classList.remove('playing');
        musicIcon.textContent = '🔇';
        musicText.textContent = 'Muted';
        musicToggle.setAttribute('title', 'Play romantic music');
      }
    });
  }
});
