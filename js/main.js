/* ============================================
   蔚海狂欢季 Blue-Sea Carnival 交互脚本
   ============================================ */

// 预加载用户指定字体，捕获错误
(function preloadUserFont() {
  if (!document.fonts) return;
  try {
    const f = new FontFace('AaWeiTa', 'url(fonts/weita.ttf) format("truetype")', {
      weight: '400 600',
      style: 'normal'
    });
    f.load().then(loaded => {
      document.fonts.add(loaded);
      console.log('[AaWeiTa] 字体加载成功 ✅', loaded.status);
    }).catch(err => {
      console.warn('[AaWeiTa] 字体加载失败 ❌', err?.message || err);
    });
  } catch(e) {
    console.warn('[AaWeiTa] FontFace API 异常', e);
  }
})();

// 当前页面标识（由各页面设置）
window.PAGE_ID = window.PAGE_ID || 'home';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initBackToTop();
  initDoodles();
});

/* ---------- 导航栏 ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // 滚动阴影
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 20px rgba(10,77,104,0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // 移动端菜单
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
}

/* ---------- 滚动淡入 ---------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ---------- 回到顶部 ---------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- 生成随机手绘拼贴装饰 ---------- */
function initDoodles() {
  const container = document.querySelector('.ocean-bg');
  if (!container) return;

  // 手帐拼贴风元素配置：描边星星、条纹胶带、圆点簇、菱形、波浪、气泡、实心星
  const doodles = [
    { type: 'bubble', count: 4 },
    { type: 'star', count: 3 },
    { type: 'star-outline', count: 5 },
    { type: 'tape', count: 3 },
    { type: 'dots', count: 3 },
    { type: 'diamond', count: 4 },
    { type: 'wave', count: 2 },
  ];

  const starFillSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4L12 16.8 5.7 21.4 8 14 2 9.4h7.6z"/></svg>`;
  const starOutlineSVG = (color) => `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4L12 16.8 5.7 21.4 8 14 2 9.4h7.6z"/></svg>`;
  const waveSVG = `<svg width="90" height="24" viewBox="0 0 90 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M0 12 Q 15 0 30 12 T 60 12 T 90 12"/></svg>`;

  const colors = ['#FF8C42', '#2E86AB', '#FFD93D', '#FFB5C5', '#7ED7C1'];
  const tapeVariants = ['', 'blue', 'yellow'];

  doodles.forEach(({ type, count }) => {
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = `doodle ${type}`;
      el.style.left = `${Math.random() * 92 + 2}%`;
      el.style.top = `${Math.random() * 85 + 3}%`;
      el.style.animationDelay = `${Math.random() * 4}s`;
      el.style.animationDuration = `${5 + Math.random() * 6}s`;
      el.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;

      switch (type) {
        case 'bubble': {
          const size = 18 + Math.random() * 36;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          break;
        }
        case 'star': {
          el.innerHTML = starFillSVG;
          el.style.fontSize = `${14 + Math.random() * 18}px`;
          break;
        }
        case 'star-outline': {
          const c = colors[Math.floor(Math.random() * colors.length)];
          el.innerHTML = starOutlineSVG(c);
          el.style.fontSize = `${18 + Math.random() * 22}px`;
          el.style.color = c;
          break;
        }
        case 'tape': {
          const v = tapeVariants[Math.floor(Math.random() * tapeVariants.length)];
          if (v) el.classList.add(v);
          el.style.width = `${50 + Math.random() * 50}px`;
          el.style.height = `${16 + Math.random() * 10}px`;
          break;
        }
        case 'dots': {
          const size = 36 + Math.random() * 40;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          break;
        }
        case 'diamond': {
          const variants = ['', 'blue', 'yellow'];
          const v = variants[Math.floor(Math.random() * variants.length)];
          if (v) el.classList.add(v);
          break;
        }
        case 'wave': {
          el.innerHTML = waveSVG;
          el.style.color = colors[Math.floor(Math.random() * colors.length)];
          break;
        }
      }
      container.appendChild(el);
    }
  });
}

/* ---------- 工具：平滑滚动到锚点 ---------- */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
window.scrollToId = scrollToId;

/* ---------- 简单弹窗提示 ---------- */
function toast(msg, type = 'info') {
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = `
    position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
    background: ${type === 'success' ? 'var(--ocean-blue)' : 'var(--deep-sea)'};
    color: #fff; padding: 14px 28px; border-radius: 999px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 9999;
    font-size: 0.92rem; font-weight: 600;
    animation: toastIn 0.4s ease;
  `;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(10px)';
    el.style.transition = 'all 0.3s';
    setTimeout(() => el.remove(), 300);
  }, 2200);
}
window.toast = toast;

// toast 动画
const style = document.createElement('style');
style.textContent = `@keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(20px);} to {opacity:1; transform:translateX(-50%) translateY(0);} }`;
document.head.appendChild(style);
