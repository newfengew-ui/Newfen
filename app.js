(function() {
  'use strict';

  /* ==================== SECURE SERVER-SIDE PROXY CONFIG (v7.0) ==================== */
  const FOX_API_ENDPOINT = '/api/chat';

  /* ==================== CUSTOM GEOMETRIC SVG ICONS ==================== */
  const ICONS = {
    copy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2.5"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    regen: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/></svg>',
    cont: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 5 14 12 5 19 5 5"/><line x1="19" y1="5" x2="19" y2="19"/></svg>',
    speak: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
    stopSpeak: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2.5"/></svg>',
    quote: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>',
    edit: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>',
    bookmark: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
    bookmarkFill: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.6"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
    reader: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
    share: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    diff: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="11"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="17" x2="15" y2="17"/></svg>',
    more: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>',
    play: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>',
    wrap: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><path d="M3 12h15a3 3 0 1 1 0 6h-4"/><polyline points="16 16 14 18 16 20"/><line x1="3" y1="18" x2="9" y2="18"/></svg>',
    download: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    chart: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    fold: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>',
    sort: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="9" y2="18"/></svg>'
  };

  const DAILY_LIMIT = 50;
  const MAX_PDF_BYTES = 15 * 1024 * 1024;
  const MAX_VIDEO_BYTES = 50 * 1024 * 1024;
  const MAX_DOC_CHARS = 18000;
  const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
  const MAX_TEXT_BYTES = 5 * 1024 * 1024;
  const MAX_ZIP_UNCOMPRESSED_BYTES = 25 * 1024 * 1024;
  const MAX_ATTACHMENTS_PER_MSG = 8;
  const MAX_BACKUP_CHATS = 500;
  const MAX_BACKUP_MSGS_PER_CHAT = 1500;
  const MSG_WINDOW_STEP = 40;

  const FOLDERS = ['Все', 'Код', 'Учёба', 'Идеи', 'Работа', 'Избранное', 'Архив'];
  const FOLLOWUP_PRESETS = ['Объясни проще', 'Визуализируй графиком', 'Сделай мини-тест', 'Чек-лист шагов', 'В таблицу'];
  const DEFAULT_PROMPTS = [
    { id: 'p_1', cmd: '/график', text: 'Построй интерактивную визуализацию (блок ```chart JSON) и KPI-карточки (блок ```kpi JSON) для данных:\n' },
    { id: 'p_2', cmd: '/тест', text: 'Создай интерактивный мини-квиз из 3 вопросов (блок ```quiz JSON) по теме:\n' },
    { id: 'p_3', cmd: '/план', text: 'Составь дорожную карту (блок ```timeline JSON) и чек-лист (- [ ]) для:\n' },
    { id: 'p_4', cmd: '/кратко', text: 'Сделай краткую выжимку главного из следующего текста:\n' },
    { id: 'p_5', cmd: '/код', text: 'Напиши чистый, рабочий код с краткими пояснениями для задачи:\n' },
    { id: 'p_6', cmd: '/перевод', text: 'Переведи естественно и точно на русский язык:\n' }
  ];

  const LS_KEYS = {
    CHATS: 'foxai_chats_v2', MEMORY: 'foxai_memory_v2', QUOTA: 'foxai_quota_v2',
    THEME: 'foxai_theme_v2', ACTIVE: 'foxai_active_v2', SETTINGS: 'foxai_settings_v2',
    BOOKMARKS: 'foxai_bookmarks_v2', PROMPTS: 'foxai_prompts_v2', DRAFTS: 'foxai_drafts_v2'
  };

  const DEFAULT_SETTINGS = {
    font: 'md', fontFamily: 'sans', radius: 'normal', density: 'normal',
    userName: 'Пользователь', tone: 'balanced', customPrompt: '',
    showFollowups: true, showThink: true, codeLines: true, videoFrames: 4,
    autoMemory: true, haptic: true, autoTts: false, ttsRate: 1, enterToSend: false, foxCompanion: true, accent: 'mono', winterMode: true
  };

  // Системный промпт и правила Fox AI хранятся и применяются строго на сервере (/api/chat).

  /* ==================== SECURITY: SAFE IDs & DOMPURIFY + FALLBACK ==================== */
  function escapeHtml(str) {
    return String(str == null ? '' : str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function safeId(str) {
    const clean = String(str || '').replace(/[^a-zA-Z0-9_-]/g, '');
    return clean || ('id_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7));
  }
  function sanitizeUrl(url) {
    const s = String(url || '').trim();
    if (/^(https?:|mailto:)/i.test(s)) return s;
    return '#';
  }
  function sanitizeImageDataUrl(url) {
    const s = String(url || '').trim();
    if (!s || s.length > 3_500_000) return '';
    if (/^data:image\/(png|jpeg|jpg|webp|gif);base64,[A-Za-z0-9+/=]+$/i.test(s)) return s;
    return '';
  }
  function sanitizeAttachment(raw) {
    if (!raw || typeof raw !== 'object' || typeof raw.name !== 'string') return null;
    const name = raw.name.replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, 140) || 'file';
    const rawKind = String(raw.kind || raw.type || 'text').toLowerCase();
    const kind = (rawKind === 'image' || rawKind === 'pdf' || rawKind === 'text') ? rawKind : 'text';
    const metaNote = typeof raw.metaNote === 'string' ? raw.metaNote.slice(0, 180) : '';
    if (kind === 'image') {
      const safeDataUrl = sanitizeImageDataUrl(raw.dataUrl);
      if (!safeDataUrl) return null;
      return { kind: 'image', name, dataUrl: safeDataUrl, metaNote };
    }
    const content = typeof raw.content === 'string'
      ? raw.content.slice(0, MAX_DOC_CHARS)
      : (typeof raw.extractedText === 'string' ? raw.extractedText.slice(0, MAX_DOC_CHARS) : '');
    return { kind, name, content, metaNote };
  }
  function sanitizeSettingsObj(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return Object.assign({}, DEFAULT_SETTINGS);
    const out = Object.assign({}, DEFAULT_SETTINGS);
    if (['sm', 'md', 'lg'].includes(raw.font)) out.font = raw.font;
    if (['sans', 'serif', 'mono'].includes(raw.fontFamily)) out.fontFamily = raw.fontFamily;
    if (['sharp', 'normal', 'soft'].includes(raw.radius)) out.radius = raw.radius;
    if (['compact', 'normal', 'comfortable', 'spacious'].includes(raw.density)) out.density = raw.density;
    if (typeof raw.userName === 'string') out.userName = raw.userName.replace(/[\u0000-\u001f]/g, '').slice(0, 60);
    if (['balanced', 'concise', 'detailed', 'coder', 'tech'].includes(raw.tone)) out.tone = raw.tone;
    if (['mono', 'fox', 'ice', 'emerald'].includes(raw.accent)) out.accent = raw.accent;
    if (typeof raw.customPrompt === 'string') out.customPrompt = raw.customPrompt.slice(0, 3000);
    ['showFollowups', 'showThink', 'codeLines', 'autoMemory', 'haptic', 'autoTts', 'enterToSend', 'foxCompanion', 'winterMode'].forEach(k => {
      if (typeof raw[k] === 'boolean') out[k] = raw[k];
    });
    if (Number.isFinite(Number(raw.videoFrames))) out.videoFrames = Math.max(2, Math.min(8, Math.round(Number(raw.videoFrames))));
    if (Number.isFinite(Number(raw.ttsRate))) out.ttsRate = Math.max(0.75, Math.min(1.5, Number(raw.ttsRate)));
    return out;
  }
  const _FALLBACK_DROP_SUBTREE = new Set(['script', 'style', 'iframe', 'object', 'embed', 'foreignobject', 'noscript', 'template', 'title', 'textarea', 'form', 'base', 'meta', 'link', 'math']);
  const _FALLBACK_HTML_TAGS = new Set([
    'p', 'br', 'div', 'span', 'strong', 'b', 'em', 'i', 'u', 's', 'del', 'mark', 'code', 'pre',
    'blockquote', 'hr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'a', 'img', 'button', 'input', 'label',
    'details', 'summary', 'sup', 'sub', 'kbd', 'small',
    'svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'text', 'tspan', 'defs', 'lineargradient', 'stop', 'desc'
  ]);
  const _FALLBACK_SVG_TAGS = new Set([
    'svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'text', 'tspan', 'defs', 'lineargradient', 'stop', 'desc'
  ]);
  const _FALLBACK_ALLOWED_ATTRS = new Set([
    'class', 'title', 'alt', 'href', 'src', 'target', 'rel', 'colspan', 'rowspan',
    'type', 'checked', 'disabled', 'aria-label', 'aria-hidden', 'role',
    'width', 'height', 'viewbox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin',
    'stroke-dasharray', 'd', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry',
    'points', 'transform', 'opacity', 'text-anchor', 'font-size', 'font-weight', 'offset', 'stop-color', 'stop-opacity',
    'data-copy-code', 'data-dl-code', 'data-wrap-code', 'data-expand-code', 'data-fold-code',
    'data-open-ide', 'data-toggle-art', 'data-chart-card', 'data-chart-type', 'data-chart-sort',
    'data-dl-chart', 'data-dl-chart-png', 'data-viz-tip', 'data-dl-csv', 'data-sort-col',
    'data-toggle-task', 'data-quiz', 'data-qitem', 'data-ans', 'data-qopt',
    'data-fc', 'data-fc-flip', 'data-fc-nav', 'data-fc-mark', 'data-live-code-scroll', 'data-viz-zoom', 'data-calc-id', 'data-calc-var', 'data-calc-res', 'data-stepper-nav', 'data-stepper-done', 'data-calc-val', 'data-calc-out', 'data-stepper', 'data-st-role', 'min', 'max', 'step', 'value', 'data-viz-zoom', 'data-calc-id', 'data-calc-var', 'data-calc-res', 'data-stepper-nav', 'data-stepper-done', 'data-calc-val', 'data-calc-out', 'data-stepper', 'data-st-role', 'min', 'max', 'step', 'value'
  ]);

  function _strictFallbackSanitize(dirty, svgOnly) {
    const allowedTags = svgOnly ? _FALLBACK_SVG_TAGS : _FALLBACK_HTML_TAGS;
    const parser = new DOMParser();
    const doc = parser.parseFromString(String(dirty || ''), 'text/html');
    const outDoc = document.implementation.createHTMLDocument('');
    const root = outDoc.createElement('div');

    function cloneSafe(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        return outDoc.createTextNode(node.nodeValue || '');
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return null;
      const tag = node.tagName.toLowerCase();
      if (_FALLBACK_DROP_SUBTREE.has(tag)) return null;
      if (!allowedTags.has(tag)) {
        const frag = outDoc.createDocumentFragment();
        for (const ch of Array.from(node.childNodes)) {
          const safeCh = cloneSafe(ch);
          if (safeCh) frag.appendChild(safeCh);
        }
        return frag;
      }
      const isSvgTag = _FALLBACK_SVG_TAGS.has(tag);
      const el = isSvgTag
        ? outDoc.createElementNS('http://www.w3.org/2000/svg', tag)
        : outDoc.createElement(tag);

      for (const attr of Array.from(node.attributes)) {
        const name = attr.name.toLowerCase();
        const val = String(attr.value || '').trim();
        if (name.startsWith('on') || name === 'style' || name === 'id' || name === 'name' || name === 'srcdoc' || name === 'srcset' || name === 'formaction' || name === 'xlink:href') continue;
        if (!_FALLBACK_ALLOWED_ATTRS.has(name)) continue;
        if (name === 'href') {
          if (!/^(https?:|mailto:|#)/i.test(val)) continue;
        }
        if (name === 'src') {
          if (tag !== 'img') continue;
          if (!/^(https?:|data:image\/(png|jpeg|jpg|webp|gif);base64,)/i.test(val)) continue;
        }
        if (name === 'type' && tag === 'input' && !['checkbox', 'range'].includes(val.toLowerCase())) continue;
        if (name === 'target') {
          if (val !== '_blank') continue;
          el.setAttribute('rel', 'noopener noreferrer');
        }
        el.setAttribute(attr.name === 'viewBox' ? 'viewBox' : name, val);
      }

      for (const ch of Array.from(node.childNodes)) {
        const safeCh = cloneSafe(ch);
        if (safeCh) el.appendChild(safeCh);
      }
      return el;
    }

    for (const ch of Array.from(doc.body.childNodes)) {
      const safeCh = cloneSafe(ch);
      if (safeCh) root.appendChild(safeCh);
    }
    return root.innerHTML;
  }

  function sanitizeHtml(dirtyHtml) {
    if (window.DOMPurify && typeof window.DOMPurify.sanitize === 'function') {
      return window.DOMPurify.sanitize(dirtyHtml, {
        USE_PROFILES: { html: true, svg: true },
        FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'foreignObject', 'form', 'base', 'meta', 'link', 'noscript', 'template'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'srcdoc', 'formaction'],
        ADD_ATTR: ['target', 'rel', 'data-copy-code', 'data-dl-code', 'data-wrap-code', 'data-expand-code', 'data-fold-code', 'data-open-ide', 'data-toggle-art', 'data-chart-card', 'data-chart-type', 'data-chart-sort', 'data-dl-chart', 'data-dl-chart-png', 'data-viz-tip', 'data-dl-csv', 'data-sort-col', 'data-toggle-task', 'data-quiz', 'data-qitem', 'data-ans', 'data-qopt', 'data-fc', 'data-fc-flip', 'data-fc-nav', 'data-fc-mark', 'data-live-code-scroll', 'data-viz-zoom', 'data-calc-id', 'data-calc-var', 'data-calc-res', 'data-stepper-nav', 'data-stepper-done', 'data-calc-val', 'data-calc-out', 'data-stepper', 'data-st-role', 'min', 'max', 'step', 'value', 'data-viz-zoom', 'data-calc-id', 'data-calc-var', 'data-calc-res', 'data-stepper-nav', 'data-stepper-done', 'data-calc-val', 'data-calc-out', 'data-stepper', 'data-st-role', 'min', 'max', 'step', 'value']
      });
    }
    return _strictFallbackSanitize(dirtyHtml, false);
  }

  function sanitizeSvg(dirtySvg) {
    if (window.DOMPurify && typeof window.DOMPurify.sanitize === 'function') {
      return window.DOMPurify.sanitize(dirtySvg, {
        USE_PROFILES: { svg: true },
        FORBID_TAGS: ['script', 'style', 'foreignObject', 'iframe', 'object', 'embed', 'animate', 'set', 'use'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'href', 'xlink:href']
      });
    }
    return _strictFallbackSanitize(dirtySvg, true);
  }

  /* ==================== STORAGE: INDEXEDDB + LOCALSTORAGE MIGRATION ==================== */
  function lsGet(key, fallback) {
    try { const raw = window.localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
  }
  function lsSet(key, val) {
    try { window.localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) {
      if (e && e.name === 'QuotaExceededError') showToast('Локальное хранилище переполнено');
      return false;
    }
  }

  const FoxDB = (() => {
    const DB_NAME = 'foxai_db_v1', STORE = 'kv';
    let db = null;
    function open() {
      return new Promise(resolve => {
        if (!window.indexedDB) { resolve(null); return; }
        try {
          const req = window.indexedDB.open(DB_NAME, 1);
          req.onupgradeneeded = e => {
            const d = e.target.result;
            if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE);
          };
          req.onsuccess = e => { db = e.target.result; resolve(db); };
          req.onerror = () => resolve(null);
        } catch (e) { resolve(null); }
      });
    }
    function get(key) {
      return new Promise(resolve => {
        if (!db) { resolve(undefined); return; }
        try {
          const tx = db.transaction(STORE, 'readonly');
          const req = tx.objectStore(STORE).get(key);
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => resolve(undefined);
        } catch (e) { resolve(undefined); }
      });
    }
    function set(key, val) {
      return new Promise(resolve => {
        if (!db) { resolve(false); return; }
        try {
          const tx = db.transaction(STORE, 'readwrite');
          tx.objectStore(STORE).put(val, key);
          tx.oncomplete = () => resolve(true);
          tx.onerror = e => {
            const err = e && e.target && e.target.error;
            if (err && err.name === 'QuotaExceededError') showToast('Хранилище устройства переполнено — удалите лишние вложения');
            else showToast('Ошибка сохранения данных в IndexedDB');
            resolve(false);
          };
        } catch (e) { showToast('Не удалось сохранить данные'); resolve(false); }
      });
    }
    return { open, get, set, isReady: () => !!db };
  })();

  /* ==================== STATE ==================== */
  const state = {
    chats: [],
    activeChatId: lsGet(LS_KEYS.ACTIVE, null),
    incognito: false,
    incognitoChat: null,
    memory: [],
    bookmarks: [],
    prompts: DEFAULT_PROMPTS,
    drafts: lsGet(LS_KEYS.DRAFTS, {}),
    quota: lsGet(LS_KEYS.QUOTA, { date: todayKey(), count: 0 }),
    theme: lsGet(LS_KEYS.THEME, 'dark'),
    settings: Object.assign({}, DEFAULT_SETTINGS, lsGet(LS_KEYS.SETTINGS, {})),
    folder: 'Все',
    sortBy: 'date', // 'date' | 'title'
    bulkMode: false,
    selectedChatIds: new Set(),
    historyQuery: '',
    mode: 'fast', formatPreset: 'default', contentFilter: 'all', projects: [], flashDeck: [],
    pendingAttachments: [],
    replyQuote: null,
    queue: [], // { id, chatId, chatTitle, text, attachments, quote, status }
    isStreaming: false,
    activeGenChatId: null,
    abortController: null,
    chargedGenIds: new Set(),
    searchOpen: false,
    searchMatches: [],
    searchIdx: -1,
    suggestedMemory: null,
    ttsMsgId: null,
    deferredPwaPrompt: null,
    readerFontSize: 16,
    readerRawText: '',
    viewerRawText: '',
    calcVal: '',
    tocTab: 'questions',
    visibleWindowCount: MSG_WINDOW_STEP,
    ide: { html: '', css: '', js: '', activeFile: 'html', origHtml: '', origCss: '', origJs: '', darkBg: false, logs: [], msgId: null, originalBlock: '' },
    photoEdit: { idx: -1, img: null, rot: 0, crop: 'orig', qual: 0.72 }
  };

  const codeStore = new Map();
  const chartStore = new Map();
  const tableStore = new Map();
  const cardStore = new Map();
  let codeCounter = 0, chartCounter = 0, tableCounter = 0;

  /* ==================== DOM REFS ==================== */
  const $ = id => document.getElementById(id);
  const elApp = $('app'), elSplash = $('splash'), elChatScroll = $('chatScroll'), elChatContainer = $('chatContainer');
  const elComposer = $('composerInput'), elBtnSend = $('btnSend'), elSendIcon = $('sendIcon');
  const elDrawer = $('drawer'), elDrawerBackdrop = $('drawerBackdrop'), elChatList = $('chatList');
  const elHeaderTitle = $('headerTitle'), elQuotaText = $('quotaText'), elQuotaFill = $('quotaFill');
  const elAttPreview = $('attPreviewBar'), elQuoteBar = $('quoteBar'), elQuoteBarText = $('quoteBarText');
  const elQueueBar = $('queueBar'), elQueueList = $('queueList'), elMemSuggestBar = $('memorySuggestBar');
  const elMemSuggestText = $('memorySuggestText'), elSlashMenu = $('slashMenu'), elCalcBar = $('calcBar'), elToast = $('toast');

  /* ==================== UTILITIES ==================== */
  function uid() { return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8); }
  function todayKey() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function haptic(ms) { if (state.settings.haptic && navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) { try { navigator.vibrate(ms || 10); } catch (e) {} } }
  let toastTimer = null;
  function showToast(msg) { elToast.textContent = msg; elToast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => elToast.classList.remove('show'), 2500); }
  function copyText(text, triggerBtn) {
    const onDone = () => {
      haptic(12); showToast('Скопировано');
      if (triggerBtn) { const orig = triggerBtn.innerHTML; triggerBtn.innerHTML = ICONS.check; setTimeout(() => { triggerBtn.innerHTML = orig; }, 1400); }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(onDone).catch(() => fallbackCopy(text, onDone));
    else fallbackCopy(text, onDone);
  }
  function fallbackCopy(text, onDone) {
    const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); if (onDone) onDone(); } catch (e) { showToast('Не удалось скопировать'); }
    document.body.removeChild(ta);
  }
  function downloadFile(filename, content, mime) {
    const blob = new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function isNearBottom() { return (elChatScroll.scrollHeight - elChatScroll.scrollTop - elChatScroll.clientHeight) < 120; }

  /* ==================== PERSISTENCE & INTEGRITY ==================== */
  function validateChatStructure(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
    const rawMsgs = Array.isArray(raw.messages) ? raw.messages.slice(-MAX_BACKUP_MSGS_PER_CHAT) : [];
    const msgs = rawMsgs.filter(m => m && typeof m === 'object').map(m => {
      // Support both v4+ versions[] and legacy flat { text, attachments, quote } backups
      const rawVers = (Array.isArray(m.versions) && m.versions.length)
        ? m.versions.slice(-20)
        : [{ text: typeof m.text === 'string' ? m.text : '', think: typeof m.think === 'string' ? m.think : '', attachments: Array.isArray(m.attachments) ? m.attachments : [], quote: typeof m.quote === 'string' ? m.quote : null, ts: Number(m.ts) || Date.now() }];
      const cleanVers = rawVers.filter(v => v && typeof v === 'object').map(v => ({
        text: typeof v.text === 'string' ? v.text.slice(0, 200000) : '',
        think: typeof v.think === 'string' ? v.think.slice(0, 100000) : '',
        attachments: Array.isArray(v.attachments) ? v.attachments.slice(0, MAX_ATTACHMENTS_PER_MSG).map(sanitizeAttachment).filter(Boolean) : [],
        quote: typeof v.quote === 'string' ? v.quote.slice(0, 600) : null,
        ts: Number(v.ts) || Date.now(),
        isError: !!v.isError,
        statusText: typeof v.statusText === 'string' ? v.statusText.slice(0, 120) : ''
      }));
      if (!cleanVers.length) return null;
      return {
        id: safeId(m.id),
        role: m.role === 'user' ? 'user' : 'assistant',
        activeVersion: Math.max(0, Math.min(Number(m.activeVersion) || 0, cleanVers.length - 1)),
        versions: cleanVers
      };
    }).filter(Boolean);
    return {
      id: safeId(raw.id),
      title: String(raw.title || 'Новый чат').replace(/[\u0000-\u001f]/g, '').slice(0, 120),
      folder: FOLDERS.includes(raw.folder) && raw.folder !== 'Архив' && raw.folder !== 'Избранное' ? raw.folder : 'Все',
      projectId: typeof raw.projectId === 'string' && raw.projectId ? safeId(raw.projectId) : null,
      pinned: !!raw.pinned,
      favorite: !!raw.favorite,
      archived: !!raw.archived,
      createdAt: Number(raw.createdAt) || Date.now(),
      updatedAt: Number(raw.updatedAt) || Date.now(),
      messages: msgs
    };
  }

  let saveTimer = null;
  let saveChain = Promise.resolve();
  let saveDirty = false;
  function persistChatsNow() {
    if (state.incognito) return saveChain;
    saveDirty = false;
    lsSet(LS_KEYS.ACTIVE, state.activeChatId);
    const snapshot = state.chats;
    saveChain = saveChain.then(async () => {
      const ok = await FoxDB.set('chats', snapshot);
      if (!ok) {
        const lite = snapshot.map(c => ({ ...c, messages: c.messages.map(m => ({ ...m, versions: m.versions.map(v => ({ ...v, attachments: (v.attachments || []).filter(a => a.kind !== 'image') })) })) }));
        lsSet(LS_KEYS.CHATS, lite);
      }
    }).catch(() => {});
    return saveChain;
  }
  function saveChats(immediate) {
    broadcastSync('chats');
    if (state.incognito) return;
    saveDirty = true;
    lsSet(LS_KEYS.ACTIVE, state.activeChatId);
    if (immediate) { clearTimeout(saveTimer); saveTimer = null; persistChatsNow(); }
    else { clearTimeout(saveTimer); saveTimer = setTimeout(() => { saveTimer = null; persistChatsNow(); }, 150); }
  }
  window.addEventListener('pagehide', () => { if (saveDirty) { clearTimeout(saveTimer); persistChatsNow(); } });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && saveDirty) { clearTimeout(saveTimer); persistChatsNow(); } });
  function saveMemory() {
    broadcastSync('memory'); FoxDB.set('memory', state.memory).then(ok => { if (!ok) lsSet(LS_KEYS.MEMORY, state.memory); }); }
  function saveBookmarks() { FoxDB.set('bookmarks', state.bookmarks).then(ok => { if (!ok) lsSet(LS_KEYS.BOOKMARKS, state.bookmarks); }); }
  function savePrompts() { FoxDB.set('prompts', state.prompts).then(ok => { if (!ok) lsSet(LS_KEYS.PROMPTS, state.prompts); }); }

  async function initStorage() {
    await FoxDB.open();
    const idbChats = await FoxDB.get('chats');
    if (Array.isArray(idbChats)) {
      state.chats = idbChats.map(validateChatStructure).filter(Boolean);
    } else {
      const legacyChats = lsGet(LS_KEYS.CHATS, []);
      state.chats = Array.isArray(legacyChats) ? legacyChats.map(validateChatStructure).filter(Boolean) : [];
      if (state.chats.length) await FoxDB.set('chats', state.chats);
    }

    const idbMem = await FoxDB.get('memory');
    state.memory = Array.isArray(idbMem) ? idbMem : lsGet(LS_KEYS.MEMORY, []);
    if (!Array.isArray(idbMem) && state.memory.length) await FoxDB.set('memory', state.memory);

    const idbBm = await FoxDB.get('bookmarks');
    state.bookmarks = Array.isArray(idbBm) ? idbBm : lsGet(LS_KEYS.BOOKMARKS, []);
    const savedProjs = await FoxDB.get('projects'); state.projects = Array.isArray(savedProjs) ? savedProjs : [];
    const savedDeck = await FoxDB.get('flashDeck'); state.flashDeck = Array.isArray(savedDeck) ? savedDeck : [];
    if (!Array.isArray(idbBm) && state.bookmarks.length) await FoxDB.set('bookmarks', state.bookmarks);

    const idbPr = await FoxDB.get('prompts');
    state.prompts = Array.isArray(idbPr) && idbPr.length ? idbPr : lsGet(LS_KEYS.PROMPTS, DEFAULT_PROMPTS);
    if (!Array.isArray(idbPr)) await FoxDB.set('prompts', state.prompts);
  }

  /* ==================== LOCAL QUOTA (50 / DAY, ZERO DOUBLE-CHARGE) ==================== */
  function syncQuota() {
    const today = todayKey();
    if (!state.quota || state.quota.date !== today) {
      state.quota = { date: today, count: 0 };
      lsSet(LS_KEYS.QUOTA, state.quota);
    }
    const count = Math.max(0, Math.min(DAILY_LIMIT, Number(state.quota.count) || 0));
    state.quota.count = count;
    const rem = Math.max(0, DAILY_LIMIT - count);
    elQuotaText.textContent = count + ' / ' + DAILY_LIMIT;
    $('quotaRemainLabel').textContent = `Осталось: ${rem} из ${DAILY_LIMIT}`; const dqs = $('drawerQuotaSub'); if (dqs) dqs.textContent = state.incognito ? 'Инкогнито · Настройки' : `Настройки · ${Math.max(0, DAILY_LIMIT - state.quota.count)} / ${DAILY_LIMIT}`;
    elQuotaFill.style.width = Math.round((count / DAILY_LIMIT) * 100) + '%';
  }
  function canUseQuota() {
    syncQuota();
    if (state.quota.count >= DAILY_LIMIT) { showToast('Локальный дневной лимит (50 запросов) исчерпан до завтра'); return false; }
    return true;
  }
  function consumeQuotaOnce(genId) {
    if (state.chargedGenIds.has(genId)) return;
    state.chargedGenIds.add(genId);
    syncQuota();
    state.quota.count = Math.min(DAILY_LIMIT, state.quota.count + 1);
    lsSet(LS_KEYS.QUOTA, state.quota);
    syncQuota();
  }

  /* ==================== THEME & 8-CATEGORY SETTINGS ==================== */
  function applyTheme(theme) {
    state.theme = ['dark', 'graphite', 'terminal', 'nightpaper', 'light', 'paper', 'winter'].includes(theme) ? theme : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    const colors = { dark: '#000000', graphite: '#121316', terminal: '#050806', nightpaper: '#181512', light: '#ffffff', paper: '#f5f0e6', winter: '#050a14' };
    const meta = $('metaThemeColor'); if (meta) meta.setAttribute('content', colors[state.theme]);
    lsSet(LS_KEYS.THEME, state.theme);
    $('themeIcon').innerHTML = state.theme === 'dark'
      ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>'
      : (state.theme === 'light'
        ? '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
        : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>');
    syncSettingsUi();
  }

  function applySettings() {
    const s = state.settings;
    document.documentElement.setAttribute('data-font', s.font || 'md');
    document.documentElement.setAttribute('data-font-family', s.fontFamily || 'sans');
    document.documentElement.setAttribute('data-radius', s.radius || 'normal');
    document.documentElement.setAttribute('data-density', s.density || 'normal');
    document.documentElement.setAttribute('data-accent', s.accent || 'mono');
    const yaUser = (typeof getYandexAuth === 'function' && getYandexAuth()?.user) || null;
    const uname = (s.userName && s.userName.trim()) ? s.userName.trim() : ((yaUser && yaUser.displayName) ? yaUser.displayName : 'Пользователь');
    $('profileName').textContent = uname;
    if (typeof renderAvatarInto === 'function') renderAvatarInto($('profileAvatar'), uname, yaUser && yaUser.avatarUrl);
    else $('profileAvatar').textContent = uname.charAt(0).toUpperCase();
    lsSet(LS_KEYS.SETTINGS, s);
    syncSettingsUi();
  }

  function syncSettingsUi() {
    const s = state.settings;
    document.querySelectorAll('[data-set-theme]').forEach(b => b.classList.toggle('active', b.dataset.setTheme === state.theme));
    document.querySelectorAll('[data-set-accent]').forEach(b => b.classList.toggle('active', b.dataset.setAccent === (s.accent || 'mono')));
    document.querySelectorAll('[data-set-ff]').forEach(b => b.classList.toggle('active', b.dataset.setFf === s.fontFamily));
    document.querySelectorAll('[data-set-font]').forEach(b => b.classList.toggle('active', b.dataset.setFont === s.font));
    document.querySelectorAll('[data-set-radius]').forEach(b => b.classList.toggle('active', b.dataset.setRadius === s.radius));
    document.querySelectorAll('[data-set-density]').forEach(b => b.classList.toggle('active', b.dataset.setDensity === s.density));
    document.querySelectorAll('[data-set-tone]').forEach(b => b.classList.toggle('active', b.dataset.setTone === s.tone));
    document.querySelectorAll('[data-set-rate]').forEach(b => b.classList.toggle('active', Number(b.dataset.setRate) === Number(s.ttsRate)));
    document.querySelectorAll('[data-set-vframes]').forEach(b => b.classList.toggle('active', Number(b.dataset.setVframes) === Number(s.videoFrames || 4)));
    $('setUserName').value = s.userName || '';
    $('setCustomPrompt').value = s.customPrompt || '';
    setSwitch('swFollowups', s.showFollowups);
    setSwitch('swShowThink', s.showThink);
    setSwitch('swCodeLines', s.codeLines);
    setSwitch('swAutoMem', s.autoMemory);
    setSwitch('swHaptic', s.haptic);
    setSwitch($('swFoxCompanion'), state.settings.foxCompanion !== false); updateDeckBadge();
    setSwitch('swAutoTts', s.autoTts);
    setSwitch('swEnterSend', s.enterToSend);
    const totalMsgs = state.chats.reduce((acc, c) => acc + c.messages.length, 0);
    $('aboutStats').textContent = `Чатов: ${state.chats.length} · Сообщений: ${totalMsgs} · Хранилище: ${FoxDB.isReady() ? 'IndexedDB' : 'localStorage'} · Локальный дневной лимит: 50 запросов в сутки.`;
  }
  function setSwitch(id, on) { const el = $(id); if (!el) return; el.classList.toggle('on', !!on); el.setAttribute('aria-checked', on ? 'true' : 'false'); }

  let activeSettingsCat = null;

  function updateDiagnostics() {
    const diag = $('diagStatus');
    if (!diag) return;
    const idbOk = typeof indexedDB !== 'undefined' && (typeof idbReady === 'undefined' ? true : !!idbReady);
    const purifyOk = typeof window.DOMPurify !== 'undefined';
    const pdfOk = typeof window.pdfjsLib !== 'undefined';
    const katexOk = typeof window.katex !== 'undefined';
    const zipOk = typeof window.JSZip !== 'undefined';
    const onlineOk = navigator.onLine;
    const totalChats = state.chats.length;
    const totalMsgs = state.chats.reduce((s, c) => s + (c.messages ? c.messages.length : 0), 0);
    diag.innerHTML = [
      `Хранилище IndexedDB: <strong>${idbOk ? 'активно' : 'резервный режим'}</strong>`,
      `Защита XSS (DOMPurify): <strong>${purifyOk ? 'CDN' : 'встроенный санитайзер'}</strong>`,
      `Формулы (KaTeX): <strong>${katexOk ? 'загружен' : 'офлайн-резерв'}</strong> · PDF.js: <strong>${pdfOk ? 'да' : 'резерв'}</strong> · DOCX/XLSX: <strong>${zipOk ? 'да' : 'офлайн'}</strong>`,
      `Сеть: <strong>${onlineOk ? 'онлайн' : 'офлайн'}</strong> · Чатов: <strong>${totalChats}</strong> (сообщений: ${totalMsgs})`
    ].join('<br>');
  }

  function openSettingsRoot() {
    activeSettingsCat = null;
    $('settingsTitle').textContent = 'Настройки';
    $('btnSettingsBack').classList.remove('show');
    $('settingsSearch').style.display = '';
    $('settingsSearch').value = '';
    $('settingsRootList').classList.remove('hidden');
    document.querySelectorAll('#settingsModal [data-section]').forEach(sec => {
      sec.classList.add('hidden');
      sec.querySelectorAll('.settings-row').forEach(r => r.classList.remove('hidden-search'));
    });
    const emptyEl = $('settingsSearchEmpty');
    if (emptyEl) emptyEl.classList.add('hidden');
    setSwitch($('swSetIncognito'), state.incognito);
    updateDiagnostics();
  }

  function openSettingsCategory(catId, title) {
    activeSettingsCat = catId;
    $('settingsTitle').textContent = title || 'Настройки';
    $('btnSettingsBack').classList.add('show');
    $('settingsSearch').style.display = 'none';
    $('settingsRootList').classList.add('hidden');
    document.querySelectorAll('#settingsModal [data-section]').forEach(sec => {
      const match = sec.dataset.section === catId;
      sec.classList.toggle('hidden', !match);
      sec.querySelectorAll('.settings-row').forEach(r => r.classList.remove('hidden-search'));
    });
    const emptyEl = $('settingsSearchEmpty');
    if (emptyEl) emptyEl.classList.add('hidden');
    if (catId === 'privacy') setSwitch($('swSetIncognito'), state.incognito);
    if (catId === 'about') updateDiagnostics();
  }

  function filterSettings(group, query) {
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      if (group && group !== 'all') {
        const btn = document.querySelector(`#settingsRootList [data-scat="${group}"]`);
        openSettingsCategory(group, btn ? btn.dataset.scatTitle : 'Настройки');
      } else {
        openSettingsRoot();
      }
      return;
    }
    $('settingsRootList').classList.add('hidden');
    let anySecVisible = false;
    document.querySelectorAll('#settingsModal [data-section]').forEach(sec => {
      let anyVisibleRow = false;
      sec.querySelectorAll('.settings-row').forEach(row => {
        const text = (row.textContent + ' ' + (row.dataset.skeys || '')).toLowerCase();
        const show = text.includes(q);
        row.classList.toggle('hidden-search', !show);
        if (show) anyVisibleRow = true;
      });
      sec.classList.toggle('hidden', !anyVisibleRow);
      if (anyVisibleRow) anySecVisible = true;
    });
    const emptyEl = $('settingsSearchEmpty');
    if (emptyEl) emptyEl.classList.toggle('hidden', anySecVisible);
  }

  function toggleManualFullscreen() {
    const el = document.documentElement;
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen().catch(() => showToast('Не удалось выйти из полноэкранного режима'));
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        showToast('Полноэкранный режим выключен');
      } else {
        if (el.requestFullscreen) el.requestFullscreen().then(() => showToast('Полноэкранный режим включён')).catch(() => showToast('Полноэкранный режим не поддерживается этим браузером'));
        else if (el.webkitRequestFullscreen) { el.webkitRequestFullscreen(); showToast('Полноэкранный режим включён'); }
        else showToast('Полноэкранный режим не поддерживается этим браузером');
      }
    } catch (e) { showToast('Полноэкранный режим недоступен'); }
  }

  /* ==================== CHAT MODEL & DRAFTS ==================== */
  function createChatObj(isIncog) {
    return { id: uid(), title: isIncog ? 'Инкогнито' : 'Новый чат', folder: 'Все', pinned: false, favorite: false, archived: false, createdAt: Date.now(), updatedAt: Date.now(), messages: [] };
  }
  function getActiveChat() {
    if (state.incognito) { if (!state.incognitoChat) state.incognitoChat = createChatObj(true); return state.incognitoChat; }
    let chat = state.chats.find(c => c.id === state.activeChatId && !c.archived);
    if (!chat) chat = state.chats.find(c => c.id === state.activeChatId);
    if (!chat) {
      chat = state.chats.find(c => !c.archived) || createChatObj(false);
      if (!state.chats.includes(chat)) state.chats.unshift(chat);
      state.activeChatId = chat.id;
      saveChats();
    }
    return chat;
  }
  function getMsgVersion(msg) { return msg.versions[Math.max(0, Math.min(msg.activeVersion || 0, msg.versions.length - 1))]; }
  function autoDetectFolder(text) {
    const t = text.toLowerCase();
    if (/(```|function |const |class |html|css|javascript|python|sql|код|скрипт|ошибк|баг|алгоритм)/i.test(t)) return 'Код';
    if (/(учёб|учеб|экзамен|реферат|формул|задач|теорем|конспект|курс|урок|тест|квиз)/i.test(t)) return 'Учёба';
    if (/(идея|идеи|придумай|концепт|сюжет|название|сценарий)/i.test(t)) return 'Идеи';
    if (/(работ|резюме|письмо|отчёт|отчет|проект|план|клиент|бизнес)/i.test(t)) return 'Работа';
    return 'Все';
  }
  function saveCurrentDraft() {
    if (state.incognito) return;
    const id = getActiveChat().id, v = elComposer.value;
    if (v) state.drafts[id] = v; else delete state.drafts[id];
    lsSet(LS_KEYS.DRAFTS, state.drafts);
  }
  function restoreCurrentDraft() {
    if (state.incognito) { elComposer.value = ''; autoResizeComposer(); return; }
    elComposer.value = state.drafts[getActiveChat().id] || '';
    autoResizeComposer(); setSendButtonState(); updateLocalCalc();
  }

  /* ==================== LOCAL CALCULATOR (0 API) ==================== */
  function updateLocalCalc() {
    const raw = elComposer.value.trim();
    if (!raw.startsWith('=') || raw.length < 3) { elCalcBar.classList.remove('show'); state.calcVal = ''; return; }
    const expr = raw.slice(1).replace(/,/g, '.').replace(/×/g, '*').replace(/÷/g, '/').trim();
    if (!/^[0-9+\-*/().%\s^]+$/.test(expr)) { elCalcBar.classList.remove('show'); state.calcVal = ''; return; }
    try {
      const safe = expr.replace(/\^/g, '**').replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
      const val = Function('"use strict"; return (' + safe + ')')();
      if (typeof val === 'number' && isFinite(val)) {
        state.calcVal = Number.isInteger(val) ? String(val) : String(Number(val.toFixed(6)));
        $('calcResult').textContent = '= ' + state.calcVal;
        elCalcBar.classList.add('show');
        return;
      }
    } catch (e) {}
    elCalcBar.classList.remove('show'); state.calcVal = '';
  }

  /* ==================== BOOKMARKS, PROMPTS, TOC, FILES LIBRARY & SHARE ==================== */
  function isBookmarked(msgId) { return state.bookmarks.some(b => b.msgId === msgId); }
  function toggleBookmark(msg) {
    const idx = state.bookmarks.findIndex(b => b.msgId === msg.id);
    if (idx !== -1) { state.bookmarks.splice(idx, 1); saveBookmarks(); showToast('Убрано из закладок'); }
    else {
      const v = getMsgVersion(msg), vis = msg.role === 'assistant' ? parseThinkText(v.text, '').visible : v.text;
      state.bookmarks.unshift({ id: uid(), msgId: msg.id, chatTitle: getActiveChat().title || 'Fox AI', text: vis || v.text || '', ts: Date.now() });
      saveBookmarks(); haptic(12); showToast('Сохранено в закладки');
    }
    renderMessages(); renderBookmarksList();
  }
  function renderBookmarksList() {
    const box = $('bookmarksList');
    if (!state.bookmarks.length) { box.innerHTML = '<div style="font-size:13px;color:var(--text-dim);padding:18px 4px;text-align:center;">Закладок пока нет</div>'; return; }
    box.innerHTML = state.bookmarks.map(b => `<div class="bm-card"><div class="bm-text">${escapeHtml(b.text)}</div><div class="bm-meta"><span>${escapeHtml(b.chatTitle)}</span><div style="display:flex;gap:6px;"><button class="code-btn" data-bm-read="${escapeHtml(b.id)}">Читать</button><button class="code-btn" data-bm-copy="${escapeHtml(b.id)}">Копировать</button><button class="code-btn" data-bm-del="${escapeHtml(b.id)}" aria-label="Удалить">×</button></div></div></div>`).join('');
  }
  function renderPromptsList() {
    $('promptsList').innerHTML = state.prompts.map(p => `<div class="mem-item"><div style="min-width:0;flex:1;"><div style="font-family:var(--font-mono);font-weight:700;font-size:12.5px;">${escapeHtml(p.cmd)}</div><div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${escapeHtml(p.text)}</div></div><button class="icon-btn" data-del-prompt="${escapeHtml(p.id)}" style="min-width:34px;min-height:34px;width:34px;height:34px;" aria-label="Удалить команду">×</button></div>`).join('');
  }
  function updateSlashMenu() {
    const val = elComposer.value;
    if (!val.startsWith('/') || val.includes('\n')) { elSlashMenu.classList.remove('open'); return; }
    const q = val.toLowerCase(), matches = state.prompts.filter(p => p.cmd.toLowerCase().startsWith(q));
    if (!matches.length) { elSlashMenu.classList.remove('open'); return; }
    elSlashMenu.innerHTML = matches.map(p => `<button class="slash-item" data-use-prompt="${escapeHtml(p.id)}"><span class="slash-cmd">${escapeHtml(p.cmd)}</span><span class="slash-desc">${escapeHtml(p.text)}</span></button>`).join('');
    elSlashMenu.classList.add('open');
  }

  function renderTocList() {
    const chat = getActiveChat(), box = $('tocList'), tab = state.tocTab || 'questions';
    let items = [];
    if (tab === 'questions') {
      items = chat.messages.filter(m => m.role === 'user').map((m, i) => ({ id: m.id, label: `${i + 1}. ${(getMsgVersion(m).text || '[Файлы]').replace(/\s+/g, ' ').trim()}` }));
    } else if (tab === 'code') {
      chat.messages.forEach(m => {
        const t = getMsgVersion(m).text || '';
        [...t.matchAll(/```([\w+-]*)[^\n]*\n/g)].filter(x => !['chart','kpi','timeline','quiz','cards','compare'].includes((x[1]||'').toLowerCase()))
          .forEach(x => items.push({ id: m.id, label: `[${(x[1] || 'code').toUpperCase()}] Блок кода` }));
      });
    } else {
      chat.messages.forEach(m => {
        const t = getMsgVersion(m).text || '';
        [...t.matchAll(/```(chart|kpi|timeline|mermaid|svg|cards|compare)[^\n]*\n/gi)]
          .forEach(x => items.push({ id: m.id, label: `[${x[1].toUpperCase()}] Визуализация` }));
      });
    }
    box.innerHTML = items.length
      ? items.map(it => `<button class="sheet-row-btn" data-toc-jump="${escapeHtml(it.id)}"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(it.label)}</span></button>`).join('')
      : '<div style="font-size:13px;color:var(--text-dim);padding:18px 4px;text-align:center;">Ничего не найдено</div>';
  }

  function renderFilesLibrary() {
    const q = ($('filesLibSearch').value || '').trim().toLowerCase();
    const items = [];
    state.chats.forEach(c => {
      c.messages.forEach(m => {
        const v = getMsgVersion(m);
        (v.attachments || []).forEach((att, aIdx) => {
          if (q && !String(att.name || '').toLowerCase().includes(q)) return;
          items.push({ chatId: c.id, chatTitle: c.title, msgId: m.id, aIdx, att });
        });
      });
    });
    const box = $('filesLibList');
    if (!items.length) {
      box.innerHTML = '<div style="font-size:13px;color:var(--text-dim);padding:18px 4px;text-align:center;">Вложений не найдено</div>';
      return;
    }
    box.innerHTML = items.map(it => {
      const safeThumbUrl = it.att.kind === 'image' ? sanitizeImageDataUrl(it.att.dataUrl) : '';
      const thumb = safeThumbUrl
        ? `<img src="${escapeHtml(safeThumbUrl)}" alt="${escapeHtml(it.att.name)}" style="width:40px;height:40px;object-fit:cover;border-radius:8px;flex-shrink:0;">`
        : `<div style="width:40px;height:40px;border-radius:8px;background:var(--surface-2);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;">${escapeHtml((it.att.kind || 'DOC').toUpperCase())}</div>`;
      const meta = it.att.metaNote ? ` · ${escapeHtml(it.att.metaNote)}` : '';
      return `
        <div class="mem-item">
          <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
            ${thumb}
            <div style="min-width:0;">
              <div style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(it.att.name)}</div>
              <div style="font-size:11px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(it.chatTitle)}${meta}</div>
            </div>
          </div>
          <div style="display:flex;gap:4px;flex-shrink:0;">
            <button class="code-btn" data-flib-open="${escapeHtml(it.chatId)}:${escapeHtml(it.msgId)}:${it.aIdx}">Открыть</button>
            <button class="code-btn" data-flib-del="${escapeHtml(it.chatId)}:${escapeHtml(it.msgId)}:${it.aIdx}" aria-label="Удалить вложение">×</button>
          </div>
        </div>
      `;
    }).join('');
  }

  function shareTextNative(text) {
    if (navigator.share) navigator.share({ title: 'Fox AI', text }).catch(err => { if (err && err.name !== 'AbortError') copyText(text); });
    else copyText(text);
  }

  function openBranchDiff(msg) {
    const curIdx = msg.activeVersion || 0, prevIdx = curIdx > 0 ? curIdx - 1 : (msg.versions.length > 1 ? 1 : 0);
    const oldLines = (parseThinkText(msg.versions[prevIdx].text, '').visible || '').split('\n');
    const newLines = (parseThinkText(msg.versions[curIdx].text, '').visible || '').split('\n');
    const oldSet = new Set(oldLines), newSet = new Set(newLines), diffOut = [];
    for (const l of oldLines) if (!newSet.has(l)) diffOut.push('<span class="diff-line diff-del">- ' + escapeHtml(l) + '</span>');
    for (const l of newLines) diffOut.push(!oldSet.has(l) ? '<span class="diff-line diff-add">+ ' + escapeHtml(l) + '</span>' : '<span class="diff-line">  ' + escapeHtml(l) + '</span>');
    $('diffTitle').textContent = `Сравнение: v${prevIdx + 1} → v${curIdx + 1}`;
    $('diffContent').innerHTML = diffOut.join('') || '<span class="diff-line">Версии совпадают</span>';
    openModal('diffModal');
  }

  /* ==================== LOCAL SMART MEMORY ==================== */
  const MEMORY_PATTERNS = [
    { re: /(?:меня зовут|моё имя|мое имя)\s+([А-ЯЁA-Zа-яёa-z-]{2,24})/i, fmt: m => 'Имя пользователя: ' + m[1] },
    { re: /(?:я работаю|работаю)\s+([^.,!?\n]{3,55})/i, fmt: m => 'Работает ' + m[1].trim() },
    { re: /(?:я учусь|учусь)\s+([^.,!?\n]{3,55})/i, fmt: m => 'Учится ' + m[1].trim() },
    { re: /(?:я живу в|живу в)\s+([^.,!?\n]{2,40})/i, fmt: m => 'Живёт в ' + m[1].trim() },
    { re: /(?:я программирую на|пишу на|использую язык)\s+([^.,!?\n]{2,45})/i, fmt: m => 'Пишет на ' + m[1].trim() },
    { re: /(?:мне нравится|я люблю|предпочитаю)\s+([^.,!?\n]{3,55})/i, fmt: m => 'Предпочитает: ' + m[1].trim() },
    { re: /(?:запомни(?:,?\s*что)?)\s+([^.!?\n]{4,90})/i, fmt: m => m[1].trim() }
  ];
  function detectMemoryFact(text) {
    if (state.incognito || !state.settings.autoMemory || !text || text.length < 6) return;
    for (const p of MEMORY_PATTERNS) {
      const m = text.match(p.re);
      if (m) {
        const fact = p.fmt(m);
        if (!state.memory.some(item => item.text.toLowerCase() === fact.toLowerCase())) {
          state.suggestedMemory = fact; elMemSuggestText.innerHTML = 'Запомнить: <strong>' + escapeHtml(fact) + '</strong>?'; elMemSuggestBar.classList.add('show'); return;
        }
      }
    }
  }
  function addMemoryFact(fact) {
    const clean = String(fact || '').trim(); if (!clean) return;
    if (state.memory.some(m => m.text.toLowerCase() === clean.toLowerCase())) { showToast('Уже есть в памяти'); return; }
    state.memory.unshift({ id: uid(), text: clean, ts: Date.now() }); saveMemory(); renderMemoryList(); showToast('Сохранено в память Fox AI');
  }
  function renderMemoryList() {
    const list = $('memoryList');
    if (!state.memory.length) { list.innerHTML = '<div style="font-size:13px;color:var(--text-dim);padding:12px 4px;text-align:center;">Пока нет сохранённых фактов</div>'; return; }
    list.innerHTML = state.memory.map(item => `<div class="mem-item"><span>${escapeHtml(item.text)}</span><button class="icon-btn" data-del-mem="${escapeHtml(item.id)}" style="min-width:34px;min-height:34px;width:34px;height:34px;" aria-label="Удалить факт">×</button></div>`).join('');
  }

  /* ==================== SECURE SERVER API ROUTING (v7.0) ==================== */
  function buildClientPayload(chat, allowVision, isContinue, existingText) {
    const msgs = chat.messages;
    let startIdx = 0, summary = '';
    if (msgs.length > 12) {
      const older = msgs.slice(0, msgs.length - 10), summaryLines = [];
      for (const m of older) {
        const v = getMsgVersion(m), clean = (v.text || '').replace(/```[\s\S]*?```/g, '[код]').replace(/\s+/g, ' ').trim();
        if (clean) summaryLines.push((m.role === 'user' ? 'Пользователь: ' : 'Fox AI: ') + (clean.length > 120 ? clean.slice(0, 120) + '…' : clean));
      }
      if (summaryLines.length) summary = summaryLines.slice(-16).join('\n');
      startIdx = msgs.length - 10;
    }

    const outMsgs = [];
    for (let i = startIdx; i < msgs.length; i++) {
      const m = msgs[i], v = getMsgVersion(m);
      let textPart = v.text || '';
      const qStr = (typeof v.quote === 'string' && v.quote) ? v.quote : (typeof m.quote === 'string' ? m.quote : '');
      if (m.role === 'user' && qStr) textPart = `> ${qStr.slice(0, 300)}\n\n` + textPart;
      const atts = (Array.isArray(v.attachments) && v.attachments.length) ? v.attachments : (Array.isArray(m.attachments) ? m.attachments : []);
      if (m.role === 'user' && atts.length) {
        const docNotes = [];
        const imgParts = [];
        for (const a of atts.slice(0, MAX_ATTACHMENTS_PER_MSG)) {
          const kind = a.kind || a.type || 'text';
          const safeImg = kind === 'image' ? sanitizeImageDataUrl(a.dataUrl) : '';
          const docText = typeof a.content === 'string' ? a.content : (typeof a.extractedText === 'string' ? a.extractedText : '');
          if (safeImg && allowVision) imgParts.push({ type: 'image_url', image_url: { url: safeImg } });
          else if (docText) docNotes.push(`[Файл: ${a.name}${a.metaNote ? ' (' + a.metaNote + ')' : ''}]\n${docText.slice(0, 14000)}`);
          else if (kind === 'image') docNotes.push(`[Изображение: ${a.name}]`);
        }
        if (docNotes.length) textPart = (textPart ? textPart + '\n\n' : '') + docNotes.join('\n\n');
        if (imgParts.length) {
          outMsgs.push({ role: 'user', content: [{ type: 'text', text: textPart || 'Проанализируй вложение.' }, ...imgParts] });
          continue;
        }
      }
      if (textPart.trim()) outMsgs.push({ role: m.role, content: textPart });
    }

    if (isContinue) {
      const tail = String(existingText || '').slice(-220);
      const insideCode = hasUnclosedCodeFence(existingText);
      const fence = '`' + '`' + '`';
      const contInstr = insideCode
        ? 'Продолжи код СТРОГО со следующего символа сразу после фрагмента ниже. НЕ повторяй уже написанные строки и НЕ открывай заново блок ' + fence + '. Закрой блок ' + fence + ' в самом конце, когда код будет полностью завершён.\n\nКонец предыдущего фрагмента:\n' + tail
        : 'Продолжи предыдущий ответ точно с того места, где он прервался. Не повторяй уже написанное.\n\nКонец предыдущего фрагмента:\n' + tail;
      outMsgs.push({ role: 'user', content: contInstr });
    }

    let projectContext = '';
    if (chat && chat.projectId) {
      const proj = state.projects.find(p => p.id === chat.projectId);
      if (proj) {
        projectContext = `Активный проект «${proj.name}»:`;
        if (proj.instructions) projectContext += '\nИнструкции проекта: ' + proj.instructions;
        if (proj.files && proj.files.length) {
          projectContext += '\nФайлы базы знаний проекта:\n' + proj.files.map(f => `--- ${f.name} ---\n${(f.content || '').slice(0, 4000)}`).join('\n\n');
        }
      }
    }

    return {
      taskType: detectTaskType(chat),
      mode: state.mode,
      tone: state.settings.tone,
      formatPreset: state.formatPreset,
      customPrompt: (state.settings.customPrompt || '').trim(),
      projectContext,
      memory: (!state.incognito && state.memory.length) ? state.memory.slice(0, 15).map(m => m.text) : [],
      summary,
      messages: outMsgs,
      isContinuation: !!isContinue
    };
  }

  function detectTaskType(chat) {
    const lastUser = [...chat.messages].reverse().find(m => m.role === 'user');
    const lastAtts = lastUser ? (getMsgVersion(lastUser).attachments || lastUser.attachments || []) : [];
    if (lastAtts.some(a => (a.kind || a.type) === 'image' && sanitizeImageDataUrl(a.dataUrl))) return 'vision';
    const txt = (lastUser ? (getMsgVersion(lastUser).text || '') : '').toLowerCase();
    if (state.mode === 'deep' || /\b(код|code|html|css|js|javascript|python|sql|react|vue|алгоритм|рефактор|ошибк|баг|api|json|svg|график|таблиц|сравн|квиз)\b/.test(txt)) return 'code';
    return 'fast';
  }

  function hasUnclosedCodeFence(text) {
    const matches = String(text || '').match(/^```/gm);
    return !!(matches && matches.length % 2 === 1);
  }

  function mergeContinuationText(existing, addition) {
    if (!addition) return existing;
    if (!existing) return addition;
    let add = addition;
    if (hasUnclosedCodeFence(existing)) {
      add = add.replace(/^\s*```[\w+-]*\s*\n/, '');
    }
    const maxCheck = Math.min(160, existing.length, add.length);
    for (let len = maxCheck; len >= 12; len--) {
      if (existing.endsWith(add.slice(0, len))) return existing + add.slice(len);
    }
    return existing + add;
  }

  async function streamCompletion(chat, onChunk, signal, isContinue, existingText) {
    const taskType = detectTaskType(chat);
    const payload = buildClientPayload(chat, taskType === 'vision', isContinue, existingText);
    const res = await fetch(FOX_API_ENDPOINT, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify(payload)
    });

    if (res.status === 401) {
      window.__foxAuthUser = null;
      syncYandexAuthUi();
      showAuthGate('Сессия истекла — войдите через Яндекс ID снова', true);
      throw new Error('UNAUTHORIZED');
    }
    if (res.status === 429) {
      let msg = 'Превышен лимит запросов. Попробуйте позже.';
      try { const j = await res.json(); if (j && j.message) msg = j.message; } catch {}
      showToast(msg);
      throw new Error('RATE_LIMIT');
    }
    if (!res.ok || !res.body) {
      let srvMsg = '';
      try { const j = await res.json(); if (j && j.message) srvMsg = String(j.message); } catch {}
      const err = new Error(srvMsg || ('HTTP_' + res.status));
      err.userMessage = srvMsg;
      throw err;
    }

    const qUsed = Number(res.headers.get('X-Fox-Quota-Used'));
    if (Number.isFinite(qUsed) && qUsed >= 0) {
      state.quota.count = Math.min(DAILY_LIMIT, qUsed);
      lsSet(LS_KEYS.QUOTA, state.quota);
      syncQuota();
    }

    const reader = res.body.getReader(), decoder = new TextDecoder('utf-8');
    let buffer = '', gotAnyToken = false, finishReason = null;

    const processLine = rawLine => {
      const line = rawLine.trim(); if (!line || !line.startsWith('data:')) return;
      const dataStr = line.slice(5).trim(); if (dataStr === '[DONE]') return;
      try {
        const json = JSON.parse(dataStr); if (json.error) throw new Error('API_ERR');
        const choice = json.choices && json.choices[0];
        if (!choice) return;
        if (choice.finish_reason) finishReason = choice.finish_reason;
        const delta = choice.delta; if (!delta) return;
        const reasoning = delta.reasoning || delta.reasoning_content || '', content = delta.content || '';
        if (reasoning || content) { gotAnyToken = true; onChunk({ content, reasoning }); }
      } catch (e) { if (e.message === 'API_ERR') throw e; }
    };

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        buffer += decoder.decode();
        if (buffer.trim()) processLine(buffer);
        break;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n'); buffer = lines.pop() || '';
      for (const rawLine of lines) processLine(rawLine);
    }
    if (!gotAnyToken) throw new Error('EMPTY_STREAM');
    return { finishReason };
  }

  function parseThinkText(rawText, extraThink) {
    let thinkParts = []; if (extraThink) thinkParts.push(extraThink);
    let visible = rawText || '', isThinkingOpen = false;
    const closedRe = /<\s*(?:re)?(?:think|thought|reasoning)\s*>([\s\S]*?)<\s*\/\s*(?:re)?(?:think|thought|reasoning)\s*>/gi;
    visible = visible.replace(closedRe, (_, inner) => { if (inner.trim()) thinkParts.push(inner.trim()); return ''; });
    const openMatch = visible.match(/<\s*(?:re)?(?:think|thought|reasoning)\s*>/i);
    if (openMatch) {
      isThinkingOpen = true;
      const tail = visible.slice(openMatch.index + openMatch[0].length);
      if (tail.trim()) thinkParts.push(tail.trim());
      visible = visible.slice(0, openMatch.index);
    }
    visible = visible.replace(/<\s*\/?\s*(?:re)?(?:think|thought|reasoning)\s*>/gi, '');
    return { visible: visible.replace(/^\s+/, ''), think: thinkParts.join('\n\n').trim(), isThinkingOpen };
  }

  /* ==================== CHARTS (6 TYPES + MULTI-SERIES + PNG EXPORT) ==================== */
  function renderChartSvg(cfg, overrideType, sorted) {
    const type = (overrideType || cfg.type || 'bar').toLowerCase();
    const unit = cfg.unit ? String(cfg.unit) : '';
    const hasSeries = Array.isArray(cfg.series) && cfg.series.length > 1;
    const rawLabels = Array.isArray(cfg.labels) ? cfg.labels.map(String) : [];
    if (!rawLabels.length) return '';

    if (hasSeries && (type === 'bar' || type === 'line' || type === 'area')) {
      const series = cfg.series.slice(0, 3).map(sr => ({ name: String(sr.name || 'Ряд'), values: rawLabels.map((_, i) => Number((sr.values || [])[i]) || 0) }));
      const maxVal = Math.max(...series.flatMap(sr => sr.values), 1);
      const W = 440, H = 250, padL = 38, padR = 18, padT = 22, padB = 54, plotW = W - padL - padR, plotH = H - padT - padB;
      let grid = '', body = '', legend = '';
      for (let i = 0; i <= 4; i++) {
        const y = padT + (plotH / 4) * i;
        grid += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="var(--border)" stroke-dasharray="3,3" stroke-width="1"/><text x="${padL - 6}" y="${y + 4}" text-anchor="end" fill="var(--text-dim)" font-size="10" font-family="sans-serif">${Math.round(maxVal * (1 - i / 4))}</text>`;
      }
      const opacities = [0.95, 0.55, 0.3], dashes = ['', '5,3', '2,3'];
      if (type === 'bar') {
        const slot = plotW / rawLabels.length, grpW = Math.min(48, slot * 0.72), bw = Math.max(6, (grpW - (series.length - 1) * 3) / series.length);
        rawLabels.forEach((lbl, li) => {
          const gx = padL + li * slot + (slot - grpW) / 2;
          series.forEach((sr, si) => {
            const v = sr.values[li], bh = Math.max(3, (Math.max(0, v) / maxVal) * plotH), x = gx + si * (bw + 3), y = padT + plotH - bh;
            body += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="var(--text)" fill-opacity="${opacities[si]}" style="cursor:pointer;" data-viz-tip="${escapeHtml(`${lbl} · ${sr.name}: ${v}${unit}`)}"/>`;
          });
          body += `<text x="${(gx + grpW / 2).toFixed(1)}" y="${padT + plotH + 16}" text-anchor="middle" fill="var(--text-muted)" font-size="10.5" font-family="sans-serif">${escapeHtml(lbl.slice(0, 9))}</text>`;
        });
      } else {
        const step = rawLabels.length > 1 ? plotW / (rawLabels.length - 1) : plotW / 2;
        series.forEach((sr, si) => {
          const pts = sr.values.map((v, i) => ({ x: padL + (rawLabels.length > 1 ? i * step : plotW / 2), y: padT + plotH - (Math.max(0, v) / maxVal) * plotH, v, lbl: rawLabels[i] }));
          if (type === 'area') body += `<path d="M${pts[0].x.toFixed(1)},${padT + plotH} ${pts.map(pt => `L${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' ')} L${pts[pts.length - 1].x.toFixed(1)},${padT + plotH} Z" fill="var(--text)" fill-opacity="${0.08 + (2 - si) * 0.03}"/>`;
          body += `<polyline points="${pts.map(pt => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' ')}" fill="none" stroke="var(--text)" stroke-opacity="${opacities[si]}" stroke-width="2" ${dashes[si] ? `stroke-dasharray="${dashes[si]}"` : ''}/>`;
          pts.forEach(pt => { body += `<circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="4" fill="var(--bg)" stroke="var(--text)" stroke-opacity="${opacities[si]}" stroke-width="1.8" style="cursor:pointer;" data-viz-tip="${escapeHtml(`${pt.lbl} · ${sr.name}: ${pt.v}${unit}`)}"/>`; });
        });
        rawLabels.forEach((lbl, i) => { body += `<text x="${(padL + (rawLabels.length > 1 ? i * step : plotW / 2)).toFixed(1)}" y="${padT + plotH + 16}" text-anchor="middle" fill="var(--text-muted)" font-size="10.5" font-family="sans-serif">${escapeHtml(lbl.slice(0, 9))}</text>`; });
      }
      const legStep = Math.min(130, plotW / series.length);
      series.forEach((sr, si) => { const lx = padL + si * legStep; legend += `<rect x="${lx}" y="${H - 18}" width="10" height="10" rx="2" fill="var(--text)" fill-opacity="${opacities[si]}"/><text x="${lx + 15}" y="${H - 9}" fill="var(--text-muted)" font-size="11" font-family="sans-serif">${escapeHtml(sr.name.slice(0, 14))}</text>`; });
      return `<svg viewBox="0 0 ${W} ${H}">${grid}${body}${legend}</svg>`;
    }

    const baseVals = hasSeries ? (cfg.series[0].values || []) : (cfg.values || []);
    let pairs = rawLabels.map((l, i) => ({ label: l, val: Number(baseVals[i]) || 0 }));
    if (sorted) pairs = [...pairs].sort((a, b) => b.val - a.val);
    const values = pairs.map(p => p.val), total = values.reduce((s, v) => s + Math.max(0, v), 0) || 1, maxVal = Math.max(...values, 1);
    const W = 440, H = type === 'hbar' ? Math.max(180, pairs.length * 34 + 30) : 230;

    if (type === 'donut' || type === 'pie') {
      const cx = 115, cy = 115, R = 80, rIn = type === 'donut' ? 46 : 0, shades = ['var(--text)', '#b8b8b8', '#8a8a8a', '#636363', '#424242', '#2a2a2a'];
      let angle = -Math.PI / 2, paths = '', legend = '';
      pairs.forEach((p, idx) => {
        const v = Math.max(0, p.val), pct = Math.round((v / total) * 100), slice = (v / total) * Math.PI * 2;
        const x1 = cx + R * Math.cos(angle), y1 = cy + R * Math.sin(angle), x3 = cx + rIn * Math.cos(angle), y3 = cy + rIn * Math.sin(angle);
        angle += slice;
        const x2 = cx + R * Math.cos(angle), y2 = cy + R * Math.sin(angle), x4 = cx + rIn * Math.cos(angle), y4 = cy + rIn * Math.sin(angle);
        const lg = slice > Math.PI ? 1 : 0, fill = shades[idx % shades.length], tip = escapeHtml(`${p.label}: ${p.val}${unit} (${pct}%)`);
        const d = rIn > 0 ? `M${x1.toFixed(1)},${y1.toFixed(1)} A${R},${R} 0 ${lg},1 ${x2.toFixed(1)},${y2.toFixed(1)} L${x4.toFixed(1)},${y4.toFixed(1)} A${rIn},${rIn} 0 ${lg},0 ${x3.toFixed(1)},${y3.toFixed(1)} Z` : `M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${R},${R} 0 ${lg},1 ${x2.toFixed(1)},${y2.toFixed(1)} Z`;
        paths += `<path d="${d}" fill="${fill}" stroke="var(--bg)" stroke-width="2" style="cursor:pointer;" data-viz-tip="${tip}"/>`;
        if (idx < 7) { const ly = 38 + idx * 24; legend += `<g style="cursor:pointer;" data-viz-tip="${tip}"><rect x="218" y="${ly - 10}" width="11" height="11" rx="2.5" fill="${fill}" stroke="var(--border-strong)" stroke-width="0.8"/><text x="236" y="${ly}" fill="var(--text)" font-size="11.5" font-family="sans-serif">${escapeHtml(p.label.slice(0, 14))}: ${p.val}${escapeHtml(unit)}</text></g>`; }
      });
      return `<svg viewBox="0 0 ${W} ${H}">${paths}${type === 'donut' ? `<text x="${cx}" y="${cy + 4}" text-anchor="middle" fill="var(--text)" font-size="14" font-weight="700" font-family="sans-serif">${Math.round(total)}${escapeHtml(unit)}</text>` : ''}${legend}</svg>`;
    }

    if (type === 'radar') {
      const cx = 220, cy = 115, R = 82, n = Math.max(3, pairs.length); let web = '', axes = '', dots = ''; const polyPts = [];
      for (let ring = 1; ring <= 4; ring++) { const rr = (R / 4) * ring, pts = []; for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`); } web += `<polygon points="${pts.join(' ')}" fill="none" stroke="var(--border)" stroke-width="1"/>`; }
      pairs.forEach((p, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / n, ax = cx + R * Math.cos(a), ay = cy + R * Math.sin(a), vr = (Math.max(0, p.val) / maxVal) * R, px = cx + vr * Math.cos(a), py = cy + vr * Math.sin(a);
        polyPts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
        axes += `<line x1="${cx}" y1="${cy}" x2="${ax.toFixed(1)}" y2="${ay.toFixed(1)}" stroke="var(--border)" stroke-width="1"/><text x="${(cx + (R + 18) * Math.cos(a)).toFixed(1)}" y="${(cy + (R + 14) * Math.sin(a) + 4).toFixed(1)}" text-anchor="middle" fill="var(--text-muted)" font-size="10.5" font-family="sans-serif">${escapeHtml(p.label.slice(0, 10))}</text>`;
        dots += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4.5" fill="var(--bg)" stroke="var(--text)" stroke-width="2" style="cursor:pointer;" data-viz-tip="${escapeHtml(`${p.label}: ${p.val}${unit}`)}"/>`;
      });
      return `<svg viewBox="0 0 ${W} ${H}">${web}${axes}<polygon points="${polyPts.join(' ')}" fill="var(--text)" fill-opacity="0.16" stroke="var(--text)" stroke-width="2"/>${dots}</svg>`;
    }

    if (type === 'hbar') {
      const padL = 96, padR = 50, padT = 16, plotW = W - padL - padR; let rows = '';
      pairs.forEach((p, i) => {
        const y = padT + i * 34, bw = Math.max(4, (Math.max(0, p.val) / maxVal) * plotW), tip = escapeHtml(`${p.label}: ${p.val}${unit} (${Math.round((Math.max(0, p.val) / total) * 100)}%)`);
        rows += `<g style="cursor:pointer;" data-viz-tip="${tip}"><text x="${padL - 8}" y="${y + 16}" text-anchor="end" fill="var(--text-muted)" font-size="11.5" font-family="sans-serif">${escapeHtml(p.label.slice(0, 12))}</text><rect x="${padL}" y="${y + 3}" width="${plotW}" height="18" rx="5" fill="var(--surface-2)"/><rect x="${padL}" y="${y + 3}" width="${bw.toFixed(1)}" height="18" rx="5" fill="var(--text)" fill-opacity="${0.92 - (i % 3) * 0.14}"/><text x="${(padL + bw + 6).toFixed(1)}" y="${y + 16}" fill="var(--text)" font-size="11" font-weight="600" font-family="sans-serif">${p.val}${escapeHtml(unit)}</text></g>`;
      });
      return `<svg viewBox="0 0 ${W} ${H}">${rows}</svg>`;
    }

    const padL = 38, padR = 18, padT = 22, padB = 34, plotW = W - padL - padR, plotH = H - padT - padB; let grid = '';
    for (let i = 0; i <= 4; i++) { const y = padT + (plotH / 4) * i; grid += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="var(--border)" stroke-dasharray="3,3" stroke-width="1"/><text x="${padL - 6}" y="${y + 4}" text-anchor="end" fill="var(--text-dim)" font-size="10" font-family="sans-serif">${Math.round(maxVal * (1 - i / 4))}</text>`; }
    if (type === 'line' || type === 'area') {
      const step = pairs.length > 1 ? plotW / (pairs.length - 1) : plotW / 2;
      const pts = pairs.map((p, i) => ({ x: padL + (pairs.length > 1 ? i * step : plotW / 2), y: padT + plotH - (Math.max(0, p.val) / maxVal) * plotH, p }));
      const polyPts = pts.map(pt => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' ');
      const areaD = `M${pts[0].x.toFixed(1)},${padT + plotH} ${pts.map(pt => `L${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' ')} L${pts[pts.length - 1].x.toFixed(1)},${padT + plotH} Z`;
      const dots = pts.map(pt => `<g style="cursor:pointer;" data-viz-tip="${escapeHtml(`${pt.p.label}: ${pt.p.val}${unit}`)}"><circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="5" fill="var(--bg)" stroke="var(--text)" stroke-width="2"/><text x="${pt.x.toFixed(1)}" y="${(pt.y - 9).toFixed(1)}" text-anchor="middle" fill="var(--text)" font-size="10.5" font-weight="600" font-family="sans-serif">${pt.p.val}${escapeHtml(unit)}</text><text x="${pt.x.toFixed(1)}" y="${H - 10}" text-anchor="middle" fill="var(--text-muted)" font-size="10.5" font-family="sans-serif">${escapeHtml(pt.p.label.slice(0, 9))}</text></g>`).join('');
      return `<svg viewBox="0 0 ${W} ${H}">${grid}${type === 'area' ? `<path d="${areaD}" fill="var(--text)" fill-opacity="0.14"/>` : ''}<polyline points="${polyPts}" fill="none" stroke="var(--text)" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
    }
    const slot = plotW / pairs.length, barW = Math.min(40, Math.max(14, slot * 0.56)); let bars = '';
    pairs.forEach((p, i) => {
      const bh = Math.max(3, (Math.max(0, p.val) / maxVal) * plotH), x = padL + i * slot + (slot - barW) / 2, y = padT + plotH - bh;
      bars += `<g style="cursor:pointer;" data-viz-tip="${escapeHtml(`${p.label}: ${p.val}${unit} (${Math.round((Math.max(0, p.val) / total) * 100)}%)`)}"><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" rx="5" fill="var(--text)" fill-opacity="${0.92 - (i % 3) * 0.14}"/><text x="${(x + barW / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle" fill="var(--text)" font-size="10.5" font-weight="600" font-family="sans-serif">${p.val}${escapeHtml(unit)}</text><text x="${(x + barW / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle" fill="var(--text-muted)" font-size="10.5" font-family="sans-serif">${escapeHtml(p.label.slice(0, 9))}</text></g>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}">${grid}${bars}</svg>`;
  }

  function exportChartPng(chId) {
    const svgEl = $('chartBody_' + chId)?.querySelector('svg'); if (!svgEl) return;
    const cs = getComputedStyle(document.documentElement);
    let svgStr = svgEl.outerHTML;
    ['--bg','--surface','--surface-2','--border','--border-strong','--text','--text-muted','--text-dim'].forEach(v => {
      svgStr = svgStr.replace(new RegExp('var\\(' + v + '\\)', 'g'), cs.getPropertyValue(v).trim() || '#888');
    });
    if (!svgStr.includes('xmlns=')) svgStr = svgStr.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    const img = new Image(), url = URL.createObjectURL(new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' }));
    img.onload = () => {
      const vb = (svgEl.getAttribute('viewBox') || '0 0 440 230').split(/\s+/).map(Number);
      const c = document.createElement('canvas'); c.width = (vb[2] || 440) * 2; c.height = (vb[3] || 230) * 2;
      const ctx = c.getContext('2d'); ctx.fillStyle = cs.getPropertyValue('--bg').trim() || '#000'; ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
      c.toBlob(b => { if (!b) return; const pu = URL.createObjectURL(b), a = document.createElement('a'); a.href = pu; a.download = 'fox-ai-chart.png'; document.body.appendChild(a); a.click(); document.body.removeChild(a); setTimeout(() => URL.revokeObjectURL(pu), 1000); showToast('График сохранён (.png)'); }, 'image/png');
    };
    img.src = url;
  }

  /* ==================== SYNTAX, MERMAID, MATH & SANITIZED MARKDOWN ==================== */
  function highlightCode(code, lang, withLines) {
    const l = (lang || '').toLowerCase();
    if (l === 'diff' || l === 'patch') {
      return code.split('\n').map(line => {
        const esc = escapeHtml(line);
        if (line.startsWith('+++') || line.startsWith('---') || line.startsWith('@@')) return '<span class="diff-line diff-hunk">' + esc + '</span>';
        if (line.startsWith('+')) return '<span class="diff-line diff-add">' + esc + '</span>';
        if (line.startsWith('-')) return '<span class="diff-line diff-del">' + esc + '</span>';
        return '<span class="diff-line">' + esc + '</span>';
      }).join('');
    }
    const esc = escapeHtml(code), tokens = [];
    const hold = html => { const idx = tokens.length; tokens.push(html); return '\u0000TOK' + idx + '\u0000'; };
    let out = esc
      .replace(/(\/\*[\s\S]*?\*\/|\/\/[^\n]*|#[^\n]*)/g, m => hold('<span class="tok-com">' + m + '</span>'))
      .replace(/(&quot;(?:\\.|[^&])*?&quot;|&#39;(?:\\.|[^&])*?&#39;|`(?:\\.|[^`])*`)/g, m => hold('<span class="tok-str">' + m + '</span>'))
      .replace(/(&lt;\/?[a-zA-Z][\w-]*)/g, m => hold('<span class="tok-tag">' + m + '</span>'))
      .replace(/\b(const|let|var|function|return|if|else|for|while|switch|case|break|continue|class|extends|new|try|catch|finally|throw|async|await|import|export|from|default|def|elif|pass|with|as|lambda|yield|SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|JOIN|CREATE|TABLE|public|private|static|void|int|float|bool|string|struct|enum|interface|type|fun|val|data|object|override)\b/g, m => '<span class="tok-kw">' + m + '</span>')
      .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-num">$1</span>')
      .replace(/\u0000TOK(\d+)\u0000/g, (_, i) => tokens[Number(i)]);
    return withLines ? out.split('\n').map(line => '<span class="cl">' + (line || ' ') + '</span>').join('') : out;
  }

  function renderMermaidSvg(code) {
    const lines = code.trim().split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('%%'));
    if (!lines.length) return '';
    const first = lines[0].toLowerCase();
    if (first.startsWith('pie')) {
      const items = []; for (let i = 1; i < lines.length; i++) { const m = lines[i].match(/"([^"]+)"\s*:\s*([\d.]+)/); if (m) items.push({ label: m[1], val: parseFloat(m[2]) || 0 }); }
      return renderChartSvg({ type: 'donut', labels: items.map(x => x.label), values: items.map(x => x.val) }, 'donut');
    }
    const isLR = /\bLR\b/i.test(first), nodes = new Map(), edges = [];
    function registerNode(raw) {
      const m = raw.trim().match(/^([A-Za-z0-9_]+)(?:\s*(\[([^\]]+)\]|\(([^)]+)\)|\{([^}]+)\}))?/);
      if (!m) return null;
      const id = m[1], label = m[3] || m[4] || m[5] || id, shape = m[4] ? 'round' : (m[5] ? 'diamond' : 'rect');
      if (!nodes.has(id)) nodes.set(id, { id, label: label.replace(/^["']|["']$/g, ''), shape, level: 0 });
      else if (m[3] || m[4] || m[5]) { const n = nodes.get(id); n.label = label.replace(/^["']|["']$/g, ''); n.shape = shape; }
      return id;
    }
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i], match = line.match(/(-->|---|==>|-.->)(?:\|([^|]+)\|)?/);
      if (match) { const parts = line.split(match[0]); if (parts.length >= 2) { const from = registerNode(parts[0]), to = registerNode(parts[1]); if (from && to) edges.push({ from, to, label: (match[2] || '').trim() }); } }
      else registerNode(line);
    }
    const nodeArr = Array.from(nodes.values()); if (!nodeArr.length) return '';
    for (let pass = 0; pass < nodeArr.length; pass++) for (const e of edges) { const a = nodes.get(e.from), b = nodes.get(e.to); if (a && b && b.level <= a.level) b.level = a.level + 1; }
    const levels = new Map(); for (const n of nodeArr) { if (!levels.has(n.level)) levels.set(n.level, []); levels.get(n.level).push(n); }
    const nodeW = 136, nodeH = 42, gapX = 36, gapY = 54; let maxW = 0, maxH = 0;
    levels.forEach((arr, lvl) => arr.forEach((n, idx) => {
      if (isLR) { n.x = 24 + lvl * (nodeW + gapX); n.y = 24 + idx * (nodeH + 26); } else { n.x = 24 + idx * (nodeW + gapX); n.y = 24 + lvl * (nodeH + gapY); }
      maxW = Math.max(maxW, n.x + nodeW + 24); maxH = Math.max(maxH, n.y + nodeH + 24);
    }));
    let svgEdges = '', svgNodes = '';
    for (const e of edges) {
      const a = nodes.get(e.from), b = nodes.get(e.to); if (!a || !b) continue;
      const x1 = isLR ? a.x + nodeW : a.x + nodeW / 2, y1 = isLR ? a.y + nodeH / 2 : a.y + nodeH;
      const x2 = isLR ? b.x : b.x + nodeW / 2, y2 = isLR ? b.y + nodeH / 2 : b.y;
      svgEdges += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="1.5" marker-end="url(#foxArrow)"/>`;
      if (e.label) svgEdges += `<text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 4}" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.8">${escapeHtml(e.label)}</text>`;
    }
    for (const n of nodeArr) {
      const cx = n.x + nodeW / 2, cy = n.y + nodeH / 2;
      if (n.shape === 'diamond') svgNodes += `<polygon points="${cx},${n.y - 4} ${n.x + nodeW + 4},${cy} ${cx},${n.y + nodeH + 4} ${n.x - 4},${cy}" fill="var(--surface-2)" stroke="currentColor" stroke-width="1.5"/>`;
      else svgNodes += `<rect x="${n.x}" y="${n.y}" width="${nodeW}" height="${nodeH}" rx="${n.shape === 'round' ? 20 : 8}" fill="var(--surface-2)" stroke="currentColor" stroke-width="1.5"/>`;
      svgNodes += `<text x="${cx}" y="${cy + 4}" text-anchor="middle" fill="currentColor" font-size="12" font-family="sans-serif">${escapeHtml(n.label.slice(0, 18))}</text>`;
    }
    return `<svg viewBox="0 0 ${Math.max(240, maxW)} ${Math.max(120, maxH)}" width="${Math.max(240, maxW)}" height="${Math.max(120, maxH)}"><defs><marker id="foxArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor"/></marker></defs>${svgEdges}${svgNodes}</svg>`;
  }

  function renderMathExpr(expr, displayMode) {
    if (window.katex && typeof window.katex.renderToString === 'function') {
      try {
        return window.katex.renderToString(String(expr || '').trim(), { displayMode: !!displayMode, throwOnError: false, trust: false, strict: 'ignore' });
      } catch (e) {}
    }
    let s = escapeHtml(expr.trim());
    const greek = { '\\\\alpha':'α','\\\\beta':'β','\\\\gamma':'γ','\\\\delta':'δ','\\\\epsilon':'ε','\\\\theta':'θ','\\\\lambda':'λ','\\\\mu':'μ','\\\\pi':'π','\\\\sigma':'σ','\\\\phi':'φ','\\\\omega':'ω','\\\\Delta':'Δ','\\\\Sigma':'Σ','\\\\Omega':'Ω','\\\\infty':'∞','\\\\pm':'±','\\\\times':'×','\\\\cdot':'·','\\\\div':'÷','\\\\leq':'≤','\\\\geq':'≥','\\\\neq':'≠','\\\\approx':'≈','\\\\to':'→','\\\\sum':'∑','\\\\int':'∫' };
    for (const [k, v] of Object.entries(greek)) s = s.replace(new RegExp(k + '\\b', 'g'), v);
    s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '<span class="math-frac"><span class="math-frac-num">$1</span><span class="math-frac-den">$2</span></span>');
    s = s.replace(/\\sqrt\{([^{}]+)\}/g, '<span class="math-sqrt">√<span class="math-sqrt-body">$1</span></span>');
    s = s.replace(/\^\{([^{}]+)\}/g, '<sup>$1</sup>').replace(/\^([a-zA-Z0-9+-])/g, '<sup>$1</sup>');
    s = s.replace(/_\{([^{}]+)\}/g, '<sub>$1</sub>').replace(/_([a-zA-Z0-9+-])/g, '<sub>$1</sub>');
    return s;
  }

  function replaceInlineMath(str) {
    if (!str || str.indexOf('$') === -1) return str;
    let out = '', i = 0, n = str.length;
    while (i < n) {
      const ch = str[i];
      if (ch === '\\' && i + 1 < n && str[i + 1] === '$') {
        out += '$'; i += 2; continue;
      }
      if (ch === '$') {
        if (i + 1 < n && str[i + 1] === '$') { out += '$$'; i += 2; continue; }
        const prev = i > 0 ? str[i - 1] : '';
        const next = i + 1 < n ? str[i + 1] : '';
        if (!next || next === ' ' || next === '\t' || next === '\n' || prev === '$') {
          out += ch; i++; continue;
        }
        let j = i + 1, found = -1;
        while (j < n && str[j] !== '\n') {
          if (str[j] === '\\' && j + 1 < n) { j += 2; continue; }
          if (str[j] === '$') {
            if (j + 1 < n && str[j + 1] === '$') { found = -1; break; }
            found = j; break;
          }
          j++;
        }
        if (found > i + 1) {
          const expr = str.slice(i + 1, found);
          const trimmedEnds = expr[0] !== ' ' && expr[expr.length - 1] !== ' ';
          const looksLikeCurrency = /^\d+[\d.,]*\s+[а-яА-ЯёЁa-zA-Z]{2,}/.test(expr);
          if (trimmedEnds && !looksLikeCurrency) {
            out += '<span class="math-inline">' + renderMathExpr(expr) + '</span>';
            i = found + 1;
            continue;
          }
        }
      }
      out += ch; i++;
    }
    return out;
  }

  function renderMarkdown(md, msgId, isLiveStreaming) {
    if (!md) return '';
    const blocks = [], safeMid = safeId(msgId);
    let localCodeIdx = 0, localChartIdx = 0, localTableIdx = 0, localCardIdx = 0;
    const hold = html => { const i = blocks.length; blocks.push(html); return '\n@@BLOCK_' + i + '@@\n'; };

    const buildCodeWindow = (langRaw, codeRaw, isOpenLive, isUnclosed) => {
      const lang = (langRaw || 'code').toLowerCase().replace(/[^a-z0-9+-]/g, '');
      const cleanCode = codeRaw.replace(/\n$/, ''), lineCount = cleanCode ? cleanCode.split('\n').length : 0;
      const cid = 'c_' + safeMid + '_' + (++localCodeIdx);
      codeStore.set(cid, { code: cleanCode, lang, msgId: safeMid });

      if (!isOpenLive && lang === 'chart') {
        try {
          const cfg = JSON.parse(cleanCode), chId = 'ch_' + safeMid + '_' + (++localChartIdx), curType = (cfg.type || 'bar').toLowerCase();
          chartStore.set(chId, { cfg, type: curType, sorted: false });
          const svg = renderChartSvg(cfg, curType, false);
          if (svg) {
            const types = [['bar','Столбцы'],['hbar','Полосы'],['line','Линия'],['area','Область'],['donut','Кольцо'],['radar','Радар']];
            return hold(`<div class="viz-card" data-chart-card="${chId}"><div class="viz-head"><span class="viz-title">${ICONS.chart}<span>${escapeHtml(cfg.title || 'Визуализация')}</span></span><div class="code-tools"><button class="code-btn" data-chart-sort="${chId}" aria-label="Сортировать">${ICONS.sort}</button><button class="code-btn" data-viz-zoom="chart:${chId}">Зум</button><button class="code-btn" data-dl-chart-png="${chId}">PNG</button><button class="code-btn" data-dl-chart="${chId}" aria-label="Скачать SVG">${ICONS.download}</button></div></div><div class="viz-type-bar" id="chartTabs_${chId}">${types.map(([t, l]) => `<button class="viz-pill ${curType === t ? 'active' : ''}" data-chart-type="${chId}:${t}">${l}</button>`).join('')}</div><div class="viz-body" id="chartBody_${chId}">${svg}</div><div class="viz-tooltip" id="chartTip_${chId}">Нажмите на элемент графика</div></div>`);
          }
        } catch (e) {}
      }

      if (!isOpenLive && lang === 'cards') {
        try {
          const fc = JSON.parse(cleanCode), arr = fc.cards || (Array.isArray(fc) ? fc : []);
          if (arr.length) {
            const fcid = 'fc_' + safeMid + '_' + (++localCardIdx);
            cardStore.set(fcid, { cards: arr, idx: 0, flipped: false, known: new Set() });
            return hold(`<div class="fc-card" data-fc="${fcid}"><div class="fc-head"><span>${escapeHtml(fc.title || 'Флеш-карточки')}</span><div style="display:flex;align-items:center;gap:8px;"><span id="fcMeta_${fcid}" style="color:var(--text-muted);font-weight:500;">1 / ${arr.length} · Знаю 0</span><button class="code-btn" data-save-deck="${fcid}" style="height:24px;font-size:11px;padding:0 8px;">В колоду SM-2</button></div></div><div class="fc-stage" data-fc-flip="${fcid}"><span class="fc-side-tag" id="fcSide_${fcid}">Вопрос · нажмите, чтобы перевернуть</span><div class="fc-text" id="fcTxt_${fcid}">${escapeHtml(arr[0].front || '')}</div></div><div class="fc-foot"><div style="display:flex;gap:5px;"><button class="code-btn" data-fc-nav="${fcid}:-1" aria-label="Назад">‹</button><button class="code-btn" data-fc-nav="${fcid}:1" aria-label="Вперёд">›</button></div><div style="display:flex;gap:5px;"><button class="code-btn" data-fc-mark="${fcid}:0">Повторить</button><button class="code-btn primary" data-fc-mark="${fcid}:1">Знаю</button></div></div></div>`);
          }
        } catch (e) {}
      }

      if (!isOpenLive && lang === 'compare') {
        try {
          const cmp = JSON.parse(cleanCode), L = cmp.left || [], R = cmp.right || [];
          if (L.length || R.length) {
            return hold(`<div class="cmp-card">${cmp.title ? `<div class="cmp-title">${escapeHtml(cmp.title)}</div>` : ''}<div class="cmp-grid"><div class="cmp-col"><div class="cmp-col-head">${escapeHtml(cmp.leftTitle || 'Плюсы')}</div>${L.map(x => `<div class="cmp-item"><span class="cmp-mark">+</span><span>${escapeHtml(x)}</span></div>`).join('')}</div><div class="cmp-col"><div class="cmp-col-head">${escapeHtml(cmp.rightTitle || 'Минусы')}</div>${R.map(x => `<div class="cmp-item"><span class="cmp-mark">−</span><span>${escapeHtml(x)}</span></div>`).join('')}</div></div></div>`);
          }
        } catch (e) {}
      }

      if (!isOpenLive && lang === 'kpi') {
        try {
          const items = JSON.parse(cleanCode);
          if (Array.isArray(items) && items.length) return hold('<div class="kpi-grid">' + items.map(it => `<div class="kpi-tile"><span class="kpi-label">${escapeHtml(it.label || '')}</span><span class="kpi-val">${escapeHtml(it.value || '')}</span>${it.delta ? `<span class="kpi-delta">${escapeHtml(it.delta)}</span>` : ''}</div>`).join('') + '</div>');
        } catch (e) {}
      }

      if (!isOpenLive && lang === 'timeline') {
        try {
          const tl = JSON.parse(cleanCode), items = Array.isArray(tl) ? tl : (tl.items || []);
          if (items.length) return hold(`<div class="tl-card">${tl.title ? `<div class="tl-title">${escapeHtml(tl.title)}</div>` : ''}<div class="tl-list">${items.map(it => `<div class="tl-item">${it.date ? `<div class="tl-date">${escapeHtml(it.date)}</div>` : ''}<div class="tl-head">${escapeHtml(it.title || '')}</div>${it.desc ? `<div class="tl-desc">${escapeHtml(it.desc)}</div>` : ''}</div>`).join('')}</div></div>`);
        } catch (e) {}
      }

      if (!isOpenLive && lang === 'quiz') {
        try {
          const qz = JSON.parse(cleanCode), qs = qz.questions || [];
          if (qs.length) {
            const qid = 'qz_' + (++codeCounter);
            return hold(`<div class="quiz-card" data-quiz="${qid}"><div class="quiz-head"><span>${escapeHtml(qz.title || 'Мини-тест')}</span><span id="qscore_${qid}" style="font-size:12px;color:var(--text-muted);">0 / ${qs.length}</span></div><div class="quiz-body">${qs.map((q, qi) => `<div data-qitem="${qid}:${qi}" data-ans="${Number(q.answer) || 0}"><div class="quiz-q">${qi + 1}. ${escapeHtml(q.q || '')}</div><div class="quiz-opts">${(q.options || []).map((opt, oi) => `<button class="quiz-opt" data-qopt="${qid}:${qi}:${oi}">${escapeHtml(opt)}</button>`).join('')}</div>${q.explain ? `<div class="quiz-explain" id="qexp_${qid}_${qi}">${escapeHtml(q.explain)}</div>` : ''}</div>`).join('')}</div></div>`);
          }
        } catch (e) {}
      }

      if (!isOpenLive && lang === 'calc') {
        try {
          const cfg = JSON.parse(cleanCode);
          const inputs = Array.isArray(cfg.inputs) ? cfg.inputs.slice(0, 8) : [];
          const outputs = Array.isArray(cfg.outputs) ? cfg.outputs.slice(0, 6) : [];
          if (inputs.length && outputs.length) {
            const calcId = 'calc_' + safeMid + '_' + (++codeCounter);
            const initVars = {};
            inputs.forEach(inp => { initVars[String(inp.id || 'x')] = Number(inp.value ?? inp.min ?? 0); });
            window.__foxCalcStore = window.__foxCalcStore || new Map();
            window.__foxCalcStore.set(calcId, { inputs, outputs, vars: initVars });
            const rowsHtml = inputs.map(inp => {
              const vid = escapeHtml(String(inp.id || 'x'));
              const mn = Number(inp.min ?? 0), mx = Number(inp.max ?? 100), st = Number(inp.step ?? 1), vl = Number(inp.value ?? mn);
              const unit = inp.unit ? ' ' + escapeHtml(String(inp.unit)) : '';
              return `<div class="calc-row"><div class="calc-row-top"><span class="calc-row-label">${escapeHtml(inp.label || vid)}</span><span class="calc-row-val" data-calc-val="${vid}">${vl}${unit}</span></div><input type="range" class="calc-slider" data-calc-id="${calcId}" data-calc-var="${vid}" min="${mn}" max="${mx}" step="${st}" value="${vl}"></div>`;
            }).join('');
            const resHtml = outputs.map((out, oi) => {
              const val = evalSafeCalcFormula(out.formula || '0', initVars);
              const fmtVal = Number.isFinite(val) ? (Math.round(val * 100) / 100).toLocaleString('ru-RU') : '—';
              const unit = out.unit ? ' ' + escapeHtml(String(out.unit)) : '';
              return `<div class="calc-res-tile"><div class="calc-res-label">${escapeHtml(out.label || 'Результат')}</div><div class="calc-res-val" data-calc-out="${oi}">${fmtVal}${unit}</div></div>`;
            }).join('');
            return hold(`<div class="calc-card" data-calc-id="${calcId}"><div class="calc-head"><span>${escapeHtml(cfg.title || 'Калькулятор')}</span><span style="font-size:11px;color:var(--text-muted);font-weight:500;">Интерактивный расчёт</span></div><div class="calc-body">${rowsHtml}<div class="calc-results">${resHtml}</div></div></div>`);
          }
        } catch (e) {}
      }

      if (!isOpenLive && lang === 'stepper') {
        try {
          const st = JSON.parse(cleanCode);
          const steps = Array.isArray(st) ? st : (Array.isArray(st.steps) ? st.steps : []);
          if (steps.length) {
            const sid = 'st_' + safeMid + '_' + (++codeCounter);
            window.__foxStepperStore = window.__foxStepperStore || new Map();
            window.__foxStepperStore.set(sid, { title: st.title || 'Пошаговый гайд', steps, idx: 0, done: new Set() });
            const first = steps[0] || {};
            return hold(`<div class="stepper-card" data-stepper="${sid}"><div class="stepper-head"><span>${escapeHtml(st.title || 'Пошаговый гайд')}</span><span data-st-role="meta" style="font-size:11.5px;color:var(--text-muted);font-weight:500;">Шаг 1 из ${steps.length}</span></div><div class="stepper-bar"><div class="stepper-bar-fill" data-st-role="fill" style="width:${Math.round(100 / steps.length)}%;"></div></div><div class="stepper-body"><div class="stepper-step-num" data-st-role="num">Шаг 1</div><div class="stepper-step-title" data-st-role="title">${escapeHtml(first.title || '')}</div><div class="stepper-step-desc" data-st-role="desc">${escapeHtml(first.desc || '')}</div></div><div class="stepper-foot"><div style="display:flex;gap:6px;"><button class="code-btn" data-stepper-nav="${sid}:-1">Назад</button><button class="code-btn" data-stepper-nav="${sid}:1">Далее</button></div><button class="code-btn primary" data-stepper-done="${sid}" data-st-role="done">Выполнено</button></div></div>`);
          }
        } catch (e) {}
      }

      if (!isOpenLive && lang === 'diff') {
        const diffLines = cleanCode.split('\n').map(line => {
          const cls = line.startsWith('+') && !line.startsWith('+++') ? 'add'
            : (line.startsWith('-') && !line.startsWith('---') ? 'del'
              : (line.startsWith('@@') ? 'hunk' : ''));
          return `<div class="diff-line ${cls}">${escapeHtml(line)}</div>`;
        }).join('');
        return hold(`<div class="diff-card"><div class="diff-head"><span>Изменения (Diff)</span><button class="code-btn" data-copy-code="${cid}" aria-label="Копировать">${ICONS.copy}</button></div><div class="diff-lines">${diffLines}</div></div>`);
      }

      if (!isOpenLive && lang === 'mermaid') {
        const svg = renderMermaidSvg(cleanCode);
        if (svg) return hold(`<div class="diagram-card"><div class="code-win-bar"><div class="code-win-left"><span class="code-win-dots"><i></i><i></i><i></i></span><span class="code-win-meta">MERMAID</span></div><div class="code-tools"><button class="code-btn" data-viz-zoom="card">Зум</button><button class="code-btn" data-copy-code="${cid}" aria-label="Копировать">${ICONS.copy}</button><button class="code-btn" data-dl-code="${cid}" aria-label="Скачать">${ICONS.download}</button></div></div><div class="diagram-canvas">${svg}</div></div>`);
      }

      if (!isOpenLive && lang === 'svg' && /<svg[\s\S]*<\/svg>/i.test(cleanCode)) {
        const safeSvg = sanitizeSvg(cleanCode);
        return hold(`<div class="diagram-card"><div class="code-win-bar"><div class="code-win-left"><span class="code-win-dots"><i></i><i></i><i></i></span><span class="code-win-meta">SVG</span></div><div class="code-tools"><button class="code-btn" data-viz-zoom="card">Зум</button><button class="code-btn primary" data-open-ide="${cid}">${ICONS.play}<span>IDE</span></button><button class="code-btn" data-copy-code="${cid}" aria-label="Копировать">${ICONS.copy}</button><button class="code-btn" data-dl-code="${cid}" aria-label="Скачать">${ICONS.download}</button></div></div><div class="diagram-canvas" style="filter:grayscale(1);">${safeSvg}</div></div>`);
      }

      const canPreview = ['html', 'htm', 'svg', 'widget'].includes(lang);
      const showLn = state.settings.codeLines && lang !== 'diff' && lang !== 'patch';
      const highlighted = highlightCode(cleanCode, lang, showLn);
      const isLongCode = !isOpenLive && lineCount > 16;
      const liveBadge = isOpenLive ? '<span class="code-win-live-tag">Пишет код…</span>' : (isUnclosed ? `<span class="code-win-cut-tag">${lineCount} стр. · не завершён</span>` : `<span class="code-win-meta">${lineCount} стр.</span>`);
      return hold(`
        <div class="code-window ${isOpenLive ? 'live-writing' : ''} ${isLongCode ? 'long-collapsed' : ''}" id="cw_${cid}">
          <div class="code-win-bar">
            <div class="code-win-left"><span class="code-win-dots"><i></i><i></i><i></i></span><span class="code-lang">${escapeHtml(lang)}</span>${liveBadge}</div>
            <div class="code-tools">
              ${canPreview && !isOpenLive ? `<button class="code-btn primary" data-open-ide="${cid}">${ICONS.play}<span>IDE</span></button>` : ''}
              <button class="code-btn" data-fold-code="${cid}" aria-label="Свернуть код">${ICONS.fold}</button>
              <button class="code-btn" data-expand-code="${cid}" aria-label="Открыть код на весь экран">${ICONS.reader}</button>
              <button class="code-btn" data-wrap-code="${cid}" aria-label="Перенос строк">${ICONS.wrap}</button>
              <button class="code-btn" data-copy-code="${cid}" aria-label="Копировать код">${ICONS.copy}</button>
              <button class="code-btn" data-dl-code="${cid}" aria-label="Скачать код">${ICONS.download}</button>
            </div>
          </div>
          <div class="code-win-body" ${isOpenLive ? 'data-live-code-scroll="1"' : ''}><pre class="code-pre ${showLn ? 'show-ln' : ''}" id="pre_${cid}"><code>${highlighted}</code></pre></div>
          ${isLongCode ? `<button class="code-expand-long-btn" data-expand-long="${cid}">Развернуть полностью (${lineCount} стр.)</button>` : ''}
        </div>
      `);
    };

    let text = md.replace(/```([\w+-]*)[^\n]*\n([\s\S]*?)```/g, (_, langRaw, code) => buildCodeWindow(langRaw, code, false));
    text = text.replace(/```([\w+-]*)[^\n]*\n([\s\S]*)$/, (_, langRaw, code) => buildCodeWindow(langRaw, code, !!isLiveStreaming, true));
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) => hold('<div class="math-block">' + renderMathExpr(expr, true) + '</div>'));
    text = escapeHtml(text);
    text = replaceInlineMath(text);
    text = text.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');

    text = text.replace(/((?:^\|.+\|\s*\n)+)/gm, tableBlock => {
      const rows = tableBlock.trim().split('\n').map(r => r.trim());
      if (rows.length < 2 || !/^\|[\s:|-]+\|$/.test(rows[1])) return tableBlock;
      const parseRow = r => r.slice(1, -1).split('|').map(c => c.trim());
      const headers = parseRow(rows[0]), bodyRows = rows.slice(2).map(parseRow);
      const tid = 'tb_' + safeMid + '_' + (++localTableIdx);
      tableStore.set(tid, [headers, ...bodyRows].map(r => r.map(c => '"' + c.replace(/"/g, '""') + '"').join(',')).join('\n'));
      let html = `<div class="table-card"><div class="table-bar"><span>Таблица · ${bodyRows.length} строк</span><button class="code-btn" data-dl-csv="${tid}" style="height:22px;font-size:10.5px;">CSV</button></div><div class="md-table-wrap"><table class="md-table"><thead><tr>` +
        headers.map((h, hi) => `<th data-sort-col="${hi}">${formatInline(h)}<span class="sort-ind"></span></th>`).join('') + '</tr></thead><tbody>';
      for (const r of bodyRows) html += '<tr>' + headers.map((_, idx) => '<td>' + formatInline(r[idx] || '') + '</td>').join('') + '</tr>';
      return hold(html + '</tbody></table></div></div>');
    });

    const lines = text.split('\n');
    let htmlParts = [], inUl = false, inOl = false, taskCounter = 0;
    const closeLists = () => { if (inUl) { htmlParts.push('</ul>'); inUl = false; } if (inOl) { htmlParts.push('</ol>'); inOl = false; } };
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^@@BLOCK_\d+@@$/.test(line.trim())) { closeLists(); htmlParts.push(line.trim()); continue; }
      if (/^---+$/.test(line.trim())) { closeLists(); htmlParts.push('<hr>'); continue; }
      const hm = line.match(/^(#{1,4})\s+(.+)$/); if (hm) { closeLists(); htmlParts.push(`<h${hm[1].length}>${formatInline(hm[2])}</h${hm[1].length}>`); continue; }
      if (/^&gt;\s?/.test(line)) { closeLists(); htmlParts.push('<blockquote>' + formatInline(line.replace(/^&gt;\s?/, '')) + '</blockquote>'); continue; }
      const tm = line.match(/^[-*]\s+\[([ xX])\]\s+(.+)$/);
      if (tm) {
        if (inOl) { htmlParts.push('</ol>'); inOl = false; } if (!inUl) { htmlParts.push('<ul>'); inUl = true; }
        const checked = tm[1].toLowerCase() === 'x';
        htmlParts.push(`<li class="task-item ${checked ? 'checked' : ''}" data-toggle-task="${safeMid}:${taskCounter++}"><span class="task-box">${checked ? ICONS.check : ''}</span><span class="task-txt">${formatInline(tm[2])}</span></li>`);
        continue;
      }
      const ulm = line.match(/^[-*]\s+(.+)$/); if (ulm) { if (inOl) { htmlParts.push('</ol>'); inOl = false; } if (!inUl) { htmlParts.push('<ul>'); inUl = true; } htmlParts.push('<li>' + formatInline(ulm[1]) + '</li>'); continue; }
      const olm = line.match(/^\d+\.\s+(.+)$/); if (olm) { if (inUl) { htmlParts.push('</ul>'); inUl = false; } if (!inOl) { htmlParts.push('<ol>'); inOl = true; } htmlParts.push('<li>' + formatInline(olm[1]) + '</li>'); continue; }
      if (!line.trim()) { closeLists(); continue; }
      closeLists();
      htmlParts.push('<p>' + formatInline(line) + '</p>');
    }
    closeLists();
    const rawHtml = htmlParts.join('').replace(/@@BLOCK_(\d+)@@/g, (_, idx) => blocks[Number(idx)] || '');
    return sanitizeHtml(rawHtml);
  }

  function formatInline(str) {
    return str
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/~~(.+?)~~/g, '<del>$1</del>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => `<a href="${escapeHtml(sanitizeUrl(url))}" target="_blank" rel="noopener noreferrer">${label}</a>`);
  }

  /* ==================== RENDERING (WINDOWED FOR LONG CHATS) ==================== */
  function renderAll() { renderHeader(); renderDrawerList(); renderMessages(); renderAttachments(); renderQueue(); syncQuota(); }
  function renderHeader() {
    const chat = getActiveChat();
    elHeaderTitle.textContent = state.incognito ? 'Fox AI' : (chat.title && chat.title !== 'Новый чат' ? chat.title : 'Fox AI');
    elApp.classList.toggle('incognito', state.incognito);
    const pChip = $('projectActiveChip'), curChat = getActiveChat();
    const curProj = curChat && curChat.projectId ? state.projects.find(p => p.id === curChat.projectId) : null;
    if (pChip) { pChip.classList.toggle('show', !!curProj); if (curProj && $('projectActiveLabel')) $('projectActiveLabel').textContent = 'Проект: ' + curProj.name; }
    $('btnIncognito').classList.toggle('active', state.incognito);
  }
  function getDateGroupLabel(ts) {
    const now = new Date(), startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    if (ts >= startToday) return 'Сегодня';
    if (ts >= startToday - 86400000) return 'Вчера';
    if (ts >= startToday - 86400000 * 7) return 'За 7 дней';
    return 'Ранее';
  }

  function renderDrawerList() {
    const q = state.historyQuery.trim().toLowerCase();
    const filtered = state.chats.filter(c => {
      if (state.folder === 'Архив') { if (!c.archived) return false; }
      else { if (c.archived) return false; }
      if (state.folder === 'Избранное' && !c.favorite) return false;
      else if (!['Все', 'Избранное', 'Архив'].includes(state.folder) && c.folder !== state.folder) return false;
      if (state.contentFilter === 'code' && !c.messages.some(m => (getMsgVersion(m).text || '').includes('```'))) return false;
      if (state.contentFilter === 'files' && !c.messages.some(m => (getMsgVersion(m).attachments || []).length > 0)) return false;
      if (state.contentFilter === 'charts' && !c.messages.some(m => /```(?:chart|mermaid|svg)/i.test(getMsgVersion(m).text || ''))) return false;
      if (!q) return true;
      if ((c.title || '').toLowerCase().includes(q)) return true;
      return c.messages.some(m => (getMsgVersion(m).text || '').toLowerCase().includes(q));
    }).sort((a, b) => {
      if (b.pinned !== a.pinned) return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
      if (state.sortBy === 'title') return (a.title || '').localeCompare(b.title || '', 'ru');
      return (b.updatedAt || 0) - (a.updatedAt || 0);
    });

    $('bulkBar').classList.toggle('show', state.bulkMode);
    $('bulkCount').textContent = 'Выбрано: ' + state.selectedChatIds.size;
    $('btnSortChats').textContent = state.sortBy === 'date' ? 'По дате ↓' : 'По имени А-Я';
    $('btnBulkMode').classList.toggle('primary', state.bulkMode);

    if (!filtered.length) { elChatList.innerHTML = '<div style="text-align:center;color:var(--text-dim);font-size:13px;padding:24px 8px;">Чаты не найдены</div>'; return; }
    const activeId = state.incognito ? null : state.activeChatId;
    let lastGroup = ''; const html = [];
    for (const c of filtered) {
      const grp = state.sortBy === 'title' ? (c.pinned ? 'Закреплённые' : 'По алфавиту') : (c.pinned ? 'Закреплённые' : getDateGroupLabel(c.updatedAt || c.createdAt || Date.now()));
      if (grp !== lastGroup) { lastGroup = grp; html.push(`<div class="chat-group-label">${grp}</div>`); }
      const pinSvg = c.pinned ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3l5 5-4 4v5l-2 2-4-4-6 6-2-2 6-6-4-4 2-2h5l4-4z"/></svg>' : '';
      const favSvg = c.favorite ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' : '';
      const tag = c.folder && c.folder !== 'Все' ? `<span>${escapeHtml(c.folder)}</span>` : '';
      let snippetHtml = '', matchMsgId = '';
      if (q) {
        const matchMsg = c.messages.find(m => (getMsgVersion(m).text || '').toLowerCase().includes(q));
        if (matchMsg) {
          matchMsgId = matchMsg.id;
          const txt = getMsgVersion(matchMsg).text || '', pos = txt.toLowerCase().indexOf(q);
          const snip = txt.slice(Math.max(0, pos - 24), pos + 64).replace(/\s+/g, ' ');
          snippetHtml = `<div class="chat-item-snippet">…${escapeHtml(snip)}…</div>`;
        }
      }
      const checked = state.selectedChatIds.has(c.id);
      const checkHtml = state.bulkMode ? `<span class="chat-item-check ${checked ? 'checked' : ''}">${checked ? ICONS.check : ''}</span>` : '';
      html.push(`<div class="chat-item ${c.id === activeId ? 'active' : ''}" data-open-chat="${escapeHtml(c.id)}" data-jump-msg="${escapeHtml(matchMsgId)}">${checkHtml}<div class="chat-item-main"><div class="chat-item-title">${pinSvg}${favSvg}<span>${escapeHtml(c.title)}</span></div><div class="chat-item-meta">${tag}<span>${c.messages.length} сообщ.</span></div>${snippetHtml}</div>${state.bulkMode ? '' : `<button class="chat-item-more" data-chat-menu="${escapeHtml(c.id)}" aria-label="Меню чата"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg></button>`}</div>`);
    }
    elChatList.innerHTML = html.join('');
  }

  const msgRenderCache = new Map();
  let lastRenderedChatId = null;

  function purgeMsgStores(msgId) {
    const safeMid = safeId(msgId);
    const prefixes = ['c_' + safeMid + '_', 'ch_' + safeMid + '_', 'tb_' + safeMid + '_', 'fc_' + safeMid + '_'];
    for (const k of codeStore.keys()) if (k.startsWith(prefixes[0])) codeStore.delete(k);
    for (const k of chartStore.keys()) if (k.startsWith(prefixes[1])) chartStore.delete(k);
    for (const k of tableStore.keys()) if (k.startsWith(prefixes[2])) tableStore.delete(k);
    for (const k of cardStore.keys()) if (k.startsWith(prefixes[3])) cardStore.delete(k);
  }

  function getMsgRenderKey(msg, idx, total, chatId) {
    const v = getMsgVersion(msg);
    const isLast = idx === total - 1;
    const isStreamingThis = state.isStreaming && state.activeGenChatId === chatId && isLast && msg.role !== 'user';
    const attLen = v.attachments ? v.attachments.length : 0;
    return [
      chatId, msg.id, msg.activeVersion || 0, msg.versions.length,
      v.text ? v.text.length + ':' + v.text.slice(0, 32) + ':' + v.text.slice(-32) : '',
      v.think ? v.think.length : 0,
      v.isError ? 1 : 0, v.statusText || '', v.quote || '', attLen,
      isLast ? 1 : 0, isStreamingThis ? 1 : 0,
      state.settings.showThink ? 1 : 0, state.settings.codeLines ? 1 : 0,
      state.settings.showFollowups ? 1 : 0,
      state.ttsMsgId === msg.id ? 1 : 0,
      isBookmarked(msg.id) ? 1 : 0
    ].join('|');
  }

  function getCachedMessageHtml(msg, idx, total, chatId) {
    const key = getMsgRenderKey(msg, idx, total, chatId);
    const isLast = idx === total - 1;
    const isStreamingThis = state.isStreaming && state.activeGenChatId === chatId && isLast && msg.role !== 'user';
    const cached = msgRenderCache.get(msg.id);
    if (!isStreamingThis && cached && cached.key === key) return { key, html: cached.html };
    purgeMsgStores(msg.id);
    const html = buildMessageHtml(msg, idx, total, chatId);
    if (!isStreamingThis) msgRenderCache.set(msg.id, { key, html });
    else msgRenderCache.delete(msg.id);
    return { key, html };
  }

  function htmlToElement(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function renderMessages(scrollToBottom) {
    const chat = getActiveChat();

    if (!chat.messages.length) {
      codeStore.clear(); chartStore.clear(); tableStore.clear(); cardStore.clear();
      msgRenderCache.clear();
      lastRenderedChatId = chat.id;
      elChatContainer.innerHTML = `
        <div class="welcome">
          <div class="fox-stage" id="foxMascotStage" aria-label="Интерактивная 2D-лиса Fox AI">
            <div class="fox-shadow" id="foxShadow"></div>
            <div class="fox-actor" id="foxActor" role="button" tabindex="0" aria-label="Погладить лису Fox AI" title="Нажмите на лису или на любую букву"><svg class="fox-santa-hat" viewBox="0 0 32 24" aria-hidden="true"><path d="M4 18 C7 6, 19 3, 27 11 L24 14 C19 9, 11 11, 9 18 Z" fill="#dc2626"/><rect x="3" y="16" width="22" height="5" rx="2.5" fill="#ffffff"/><circle cx="27" cy="12" r="3" fill="#ffffff"/></svg>
              <div class="fox-sprite-wrap" id="foxSpriteWrap">
                <img class="fox-sprite-img active" id="foxImg_walk1" src="data:image/webp;base64,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" alt="" draggable="false">
                <img class="fox-sprite-img" id="foxImg_walk2" src="data:image/webp;base64,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" alt="" draggable="false">
                <img class="fox-sprite-img" id="foxImg_walk3" src="data:image/webp;base64,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" alt="" draggable="false">
                <img class="fox-sprite-img" id="foxImg_hop" src="data:image/webp;base64,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" alt="" draggable="false">
                <img class="fox-sprite-img" id="foxImg_sit" src="data:image/webp;base64,UklGRvIJAABXRUJQVlA4WAoAAAAQAAAAjwAAdQAAQUxQSP0DAAABoAVr2yFJ+rPaGmNt27Zt27Zt294r27Ztc2z7jy+++OK5KHRmVn7r3YiICQj/G3OuM/v/vug3kUEdNbQs6F7jN0znpmqLj2Al785DUGartCTo/c4thIBwc4WFUWFIg2vJy6aAac8QQtd4UyO2uLYSAiDsFELyAgJGb9deMi1TXg3hUAQQ5vJsNpSKxlwLI1SYz7PTkGojolmZMo9jTaOwSrUq8zq2FEJ1s2pzOHZmTdWNfn4ln6LdM6zTr7aIpTGx5Nd8KCmqrenX2sQ0zFjYrS3TwWxim1dbIKkgXODVBmlh2unULqkJWzn1EprabT71xEjZ+Kbk0iZIelObXbomPZTFPWoai6VnP/R2aF2E9I2p2zR5k3xslgEGQ06czZedUDI1AXb3ZAmUrC3qx56sPEgtK5TTPQkroVmZzuzryoXErCJ7BVdXMTKOPFfyJcwzxCw1MxHeaw3ero6kI6IAlzQHd5dJq/zzE+cJDh+YisElmyzYUQoeJx+gaciSwe1lUbpvDErcSj6wNDDp6dYOCGkKe3k1p4ilYgxq8KnHKDPSFdZzqfUrlJSVDxOHuj5GSV2Zx5/FRqGkL3a4N6XDQclQecmZPs+iRpZmoxo9STaPCNkawzzp/Qgo2Rrf9Ax+rhkRI2Pl/uDnYZiSuXC9H2ciRvbRdnfjLCJ5FBbxYmsieTSGNDgxkGi5iBwbfExeRsmjqnU5sQ5CTrcMPpZ+MM2D8nq/4OQqCHkUVg9e3mf5MHp70R7N8mB8UfJiNYQ8KncHL8/LiXB6UTXNtuxG2229zjL9G6u8iuZkh0LqufVjE6k66r7tBiYhNIzAcrJqAQ24BkAlxihiAG9u3jaHGTmZr3CaTweLalQ1jQZxDDlVZiua+QahQrc1klulb8EsApFUzfJi9CyY1Uyoa0M7CmYDtN6mtxbL7Cj1pu2FknxYdxg9C2UNhPq0GpS+RZK8Z1ontSoLFsn8GHX6aw3CukVyIFoXws6lb7BquxbJC2p1YRy/6oha7iwSpQhNtkqKY8OHsfpQqQXjyfbCCAsh9dHdmTydFEYfrE4kRq2BSJ/CaJ6M1Ue5VlGlQMJLaG5MRNXKNXLiJpvchIiZqcDEw5Li2BfJTe1HhhDCsVQ+araWUKAdM9XyYUy94aq7X/rqp1Fjv3p426QsrHLPr+N/fXqDULAnITkZP3sIISSlhoZSqLHU2BAKt3mYah5MpzaXubgkotnZTO4puRHWBclKlatKwdHFRyGahQnsEHxtvRxELSUVeGn24O6iLwEiZt0wicAXayTB4WSxmyg3VVUzU1Wl/MnVSsHrjrUveWc6tf961YY9gu+lrqW2Pum2e55+7sn7bj52nYFN4Z+QAFZQOCDOBQAAkB4AnQEqkAB2AD55OJhJJKMiISZTejCQDwlpANWEQW/o3az/gv5R+wvW8+jva7OR/cL9Hwm7W28fcq/qnFH9SfMv/4XHXd5ewB/LP7D/0PUMzwvRv/m9wn+Tf1P/o/3TtZE9ZaLjLRcZQPFR4V2S7Jo0dRnrayTfgsTPczx3g4T9nlTLmcrzw0fuq+8Ecss5YuExkUSjvTzEr9v4olSPA7mT1RXFeci9oVfRwb1q03f8lCS0kdxRgqdpmCacJwL0/Jysf/niQhBTNQt8T2YvNRFqOFZpcntHPHC9xigvBg+5Ky0OQu+gL/5ODkWrfP/N/MqdLuvVXgI6yDREAAD+/FzSycVlAp20Ksv/P9pYU1MYSZoPTgA7osNTmNA+kGk+K6XKDa2KB4PpiJfjR+TpfiedK6Kjk2AjwbBbu4kQ3drsvgL8Uqqpn/qCLyPLYqe1v8HFTTGrX20jH4j+OwYE2B6k0vWyjQyWUk0JFiYrT1O1k4yePmkmhbCOJjjU9HdFifyFoE8+gl0Q7JLT1Cu8jnUYG4v3ium4olt0pAlyBQ0jD4cXYDZuoKG6wASLMARHmULKv5NQZjAdVmkFKmzJ1mGriQb2y/GdmOEkBmhv7M6JP13mKensazCLld6wR8/tCKM7P+VJtvREtJHTEG378AQJvfPVyRiYeiA58d31tVSgbecBdxZpCJNuWsPXyFAGGidaKpqO9i8s0fn12LPPICd570SxJhbjiS+uSeAiwuzHx67ONGIijiF0R8Wj9qi5IeMq9amubgT800gy12+QUYZKlmDlaTawrCkmqKuL8B0hIMvLhbxhcQnSDx5Rf9kXVMi+f6sf4pz7kffvwLv4wm2kNqAVLK5LOhupGKpm6tF3geak0TbhD0qpk0t3nAK/Nv0c/ZQdspUCvnI+z9KsHIMWGDK0SWuT1jSIicLEThpXzuVhesNFRTq3MjK9BHJeh27CXIcSZvGNyGVnXcJXNSO1KR/nEWsI1lLxU/h5fKug/jnX+7talv2RgRWhr+pTBGgY8tB5Uf4+T/5cj94GQ7+DGzOWN4VSmzyNBctf4JS71hjkwsrs3YvbgAeWbBpkp0+4v6XEaJVLEKgUVlWKqG5l3MOOYJFV8pekTMdBqoX7N26j9VdkrpsN1c00GrU55QoCEj1JPfzXlu+7mMlpO2sszQ66aZOMwA2RSCjoYn7cWTCyUJ6Puxw7tC8cMpQ/I9Qba3dU1/8vKovvM94Wuie96BXN/W/HelgOS4iaXl8VE+cHvP0P/tRLiOvpgKXY1b/An6FnDywf16T+G4TxkgjFcXTf9QXfJObdMu9dfwGRZ8FmFeV2GHPZGwHieUZ8UFMx4kv3YL3/Nwv0SibMdlQHoP95yVYq7f4gdL3uDhJu5naUvq0gkC97nB0rcCsIdHrV6S/3DgrdwRrYfv9xdNDxA3MbHTQlVima4o+WFTuW2+LLsBHLPYdjVsHwwmL9F/pHCRxfs4YXd8nYpNnPSw6vMzLD939HQ6lLLXqsD+AR453v3iNqZduglaP5XFaC1YtlMS6h0ROnS9KuV8AKdGj2drA+Khga9Uyv2DWFjD3TdTBwOXb/6OWUpafSUzewM7V+lVvjjPVC3jQLSBu5EIplTA8m/Y3Qcje2N/YLfp/pRcwbR38U5m3wtVeUOCzotwkmebqiI0dJWbl2QtJH8pSiJBI4UHbEjbrvRaZthvpVzvcHxtbvL6W86I0ThEAJJjJe0Oi01laAfhg4iY9YNl2k62H1juOdj8h8X30OD3gyzyN6063Gb/oeN5INfsd5GwhZvjoroDnE1KdB3x4hx+CveAL6iTyG5MvOgT9Rn5AWpGE/hu/RT+N3Q8FO3VG/A6AnhSar0ionJ74AYdU+Qn7bafoUZ/VAGialfL4DUpBxSMSTPnQUblz9UEIAZzCCtcRsdJ1nJkLonl1rcOVH/iGldZi41EL7zIZeVAKFwoVjavWQPP/YggAAAAAAAA==" alt="" draggable="false">
                <img class="fox-sprite-img" id="foxImg_stretch" src="data:image/webp;base64,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" alt="" draggable="false">
                <img class="fox-sprite-img" id="foxImg_happy" src="data:image/webp;base64,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" alt="" draggable="false">
                <img class="fox-sprite-img" id="foxImg_groom" src="data:image/webp;base64,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" alt="" draggable="false">
                <img class="fox-sprite-img" id="foxImg_sleep" src="data:image/webp;base64,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" alt="" draggable="false">
                <svg class="fox-z-layer" viewBox="0 0 36 28" fill="none">
                  <text class="fox-z fox-z1" x="6" y="22" font-size="11">z</text>
                  <text class="fox-z fox-z2" x="15" y="14" font-size="14">Z</text>
                  <text class="fox-z fox-z3" x="24" y="8" font-size="10">z</text>
                </svg>
              </div>
            </div>
            <div class="fox-word" id="foxWord">
              <span class="fox-letter" data-fl="0">F</span><span class="fox-letter" data-fl="1">o</span><span class="fox-letter" data-fl="2">x</span><span class="fox-letter-gap"></span><span class="fox-letter" data-fl="3">A</span><span class="fox-letter" data-fl="4">I</span>
            </div>
          </div>
          <p class="welcome-sub">${state.incognito ? 'Режим Инкогнито · Чем помочь?' : 'Чем помочь?'}</p>
          <div class="ny-countdown-pill" id="nyCountdownPill"><span id="nyCountdownText">${getNewYearCountdownText()}</span></div>
          <div class="welcome-cards-grid" id="welcomeGlassCards">
            <button type="button" class="welcome-glass-card" data-quick-prompt="Придумай 7 оригинальных и небанальных идей подарков на Новый год"><span class="wgc-title">Идеи подарков</span><span class="wgc-sub">Подборка на Новый год</span></button>
            <button type="button" class="welcome-glass-card" data-quick-prompt="Помоги подвести личные итоги года и составить план на следующий год по шагам"><span class="wgc-title">Итоги и план года</span><span class="wgc-sub">Пошаговый разбор</span></button>
            <button type="button" class="welcome-glass-card" data-quick-prompt="Напиши красивый интерактивный мини-сайт с новогодним таймером и снегом в одном HTML"><span class="wgc-title">Собрать сайт в IDE</span><span class="wgc-sub">HTML + CSS + JS сразу в превью</span></button>
            <button type="button" class="welcome-glass-card" data-quick-prompt="Объясни сложную тему простыми словами с примерами и мини-тестом"><span class="wgc-title">Разобрать тему</span><span class="wgc-sub">Объяснение + квиз</span></button>
          </div>
        <div class="fox-mood-pill" id="foxMoodPill"><span class="fox-mood-dot"></span><span id="foxMoodText">Лиса готова к работе</span></div>
          <div class="quick-grid">
            <button class="quick-card" data-quick="Построй визуализацию (блок chart JSON) и KPI-карточки (блок kpi JSON) по трендам технологий 2026"><div class="quick-card-head">${ICONS.chart}<span class="quick-card-title">График и KPI</span></div></button>
            <button class="quick-card" data-quick="Напиши минималистичный интерактивный HTML-таймер Помодоро в чёрно-белом стиле"><div class="quick-card-head"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg><span class="quick-card-title">Код и IDE</span></div></button>
            <button class="quick-card" data-quick="Создай интерактивный мини-тест (блок quiz JSON) из 3 вопросов по космосу"><div class="quick-card-head"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span class="quick-card-title">Мини-квиз</span></div></button>
            <button class="quick-card" data-quick="Составь таймлайн запуска мобильного приложения (блок timeline JSON) и чек-лист (- [ ])"><div class="quick-card-head"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg><span class="quick-card-title">План и таймлайн</span></div></button>
          </div>
          
        </div>
      `;
      startFoxMascot();
      return;
    }
    stopFoxMascot();

    const total = chat.messages.length;
    const startIdx = Math.max(0, total - state.visibleWindowCount);
    const slice = chat.messages.slice(startIdx);
    const sameChatDom = lastRenderedChatId === chat.id && !!elChatContainer.querySelector('.msg-wrapper');

    if (!sameChatDom) {
      if (lastRenderedChatId !== chat.id) {
        codeStore.clear(); chartStore.clear(); tableStore.clear(); cardStore.clear();
        msgRenderCache.clear();
      }
      lastRenderedChatId = chat.id;
      const frag = document.createDocumentFragment();
      if (startIdx > 0) {
        const btn = htmlToElement(`<button class="load-older-btn" id="btnLoadOlder">Показать ранние сообщения (скрыто: ${startIdx})</button>`);
        if (btn) frag.appendChild(btn);
      }
      slice.forEach((msg, i) => {
        const { key, html } = getCachedMessageHtml(msg, startIdx + i, total, chat.id);
        const node = htmlToElement(html);
        if (node) { node.dataset.renderKey = key; frag.appendChild(node); }
      });
      elChatContainer.innerHTML = '';
      elChatContainer.appendChild(frag);
    } else {
      const existingOlderBtn = $('btnLoadOlder');
      if (startIdx > 0) {
        const txt = `Показать ранние сообщения (скрыто: ${startIdx})`;
        if (existingOlderBtn) { if (existingOlderBtn.textContent !== txt) existingOlderBtn.textContent = txt; }
        else {
          const btn = htmlToElement(`<button class="load-older-btn" id="btnLoadOlder">${txt}</button>`);
          if (btn) elChatContainer.prepend(btn);
        }
      } else if (existingOlderBtn) {
        existingOlderBtn.remove();
      }

      const existingMap = new Map();
      elChatContainer.querySelectorAll(':scope > .msg-wrapper[data-msg-id]').forEach(el => {
        existingMap.set(el.getAttribute('data-msg-id'), el);
      });
      const keepIds = new Set();
      let anchor = $('btnLoadOlder');

      slice.forEach((msg, i) => {
        const mid = msg.id;
        keepIds.add(mid);
        const key = getMsgRenderKey(msg, startIdx + i, total, chat.id);
        const curNode = existingMap.get(mid);
        if (curNode && curNode.dataset.renderKey === key) {
          const expectedPrev = anchor;
          if (curNode.previousElementSibling !== expectedPrev) {
            if (expectedPrev) expectedPrev.after(curNode);
            else elChatContainer.prepend(curNode);
          }
          anchor = curNode;
        } else {
          const { html } = getCachedMessageHtml(msg, startIdx + i, total, chat.id);
          const fresh = htmlToElement(html);
          if (fresh) {
            fresh.dataset.renderKey = key;
            if (curNode) curNode.replaceWith(fresh);
            else if (anchor) anchor.after(fresh);
            else elChatContainer.prepend(fresh);
            anchor = fresh;
          }
        }
      });

      existingMap.forEach((node, mid) => {
        if (!keepIds.has(mid)) {
          node.remove();
          msgRenderCache.delete(mid);
          purgeMsgStores(mid);
        }
      });
    }

    if (state.searchOpen) runInChatSearch();
    if (scrollToBottom) elChatScroll.scrollTop = elChatScroll.scrollHeight;
    updateChatMinimap(); updateTocPill();
  }

  function buildMessageHtml(msg, idx, total, chatId) {
    const v = getMsgVersion(msg), isUser = msg.role === 'user', isLast = idx === total - 1;
    const isStreamingThis = state.isStreaming && state.activeGenChatId === chatId && isLast && !isUser;
    const parsed = isUser ? { visible: v.text, think: '', isThinkingOpen: false } : parseThinkText(v.text, v.think);
    const mid = escapeHtml(msg.id);

    let thinkHtml = '';
    if (!isUser) {
      if (isStreamingThis) {
        thinkHtml = `<div class="gen-status-row" id="liveGenStatus"><span class="gen-dot"></span><span id="liveGenStatusText">Подготовка запроса…</span></div><div class="think-box" id="liveThinkBox" data-think-box="${mid}" style="display:none;"><button class="think-toggle" data-toggle-think="${mid}"><span>Дополнительные рассуждения</span><svg class="think-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></button><div class="think-content" id="liveThinkContent"></div></div>`;
      } else if (state.settings.showThink && parsed.think) {
        thinkHtml = `<div class="think-box" data-think-box="${mid}"><button class="think-toggle" data-toggle-think="${mid}"><span>Дополнительные рассуждения</span><svg class="think-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></button><div class="think-content">${escapeHtml(parsed.think)}</div></div>`;
      }
    }

    const quoteHtml = v.quote ? `<div class="msg-quote-ref">${escapeHtml(v.quote)}</div>` : '';
    let attHtml = '';
    if (v.attachments && v.attachments.length) {
      attHtml = '<div class="msg-attachments">' + v.attachments.map((a, aIdx) => {
        const safeImg = a.kind === 'image' ? sanitizeImageDataUrl(a.dataUrl) : '';
        return safeImg
          ? `<img class="msg-att-img" src="${escapeHtml(safeImg)}" alt="${escapeHtml(a.name)}" data-lightbox-ref="${mid}:${aIdx}">`
          : `<button class="msg-att-chip" data-view-file="${mid}:${aIdx}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><span>${escapeHtml(a.name)}</span></button>`;
      }).join('') + '</div>';
    }

    const bodyContent = isUser
      ? `<div class="md-body">${escapeHtml(v.text || '').replace(/\n/g, '<br>')}</div>`
      : (isStreamingThis
        ? `<div class="md-body stream-fade" id="liveStreamBody"><div class="skeleton-wrap" id="liveSkeleton"><div class="skeleton-line w1"></div><div class="skeleton-line w2"></div><div class="skeleton-line w3"></div></div></div>`
        : (() => {
            if (v.isError) return `<div class="msg-error-card"><span>${escapeHtml(parsed.visible)}</span><button class="code-btn primary" data-regen-msg="${mid}">Повторить</button></div>`;
            const rendered = renderMarkdown(parsed.visible, msg.id, false);
            const msgCodes = Array.from(codeStore.values()).filter(c => c.msgId === safeId(msg.id));
            const hasHtml = msgCodes.some(c => c.lang === 'html' || c.lang === 'htm');
            const hasCssOrJs = msgCodes.some(c => ['css', 'js', 'javascript'].includes(c.lang));
            const bundleBtn = (hasHtml && hasCssOrJs) ? `<button class="bundle-run-btn" data-run-bundle="${mid}">${ICONS.play}<span>Запустить HTML + CSS + JS вместе</span></button>` : '';
            return `<div class="md-body">${rendered}</div>${bundleBtn}`;
          })());

    let branchHtml = '';
    if (msg.versions.length > 1) {
      const cur = (msg.activeVersion || 0) + 1, len = msg.versions.length;
      branchHtml = `<div class="branch-nav"><button class="branch-btn" data-branch-prev="${mid}" ${cur <= 1 ? 'disabled' : ''} aria-label="Предыдущая версия">‹</button><span>${cur} / ${len}</span><button class="branch-btn" data-branch-next="${mid}" ${cur >= len ? 'disabled' : ''} aria-label="Следующая версия">›</button></div>${!isUser ? `<button class="msg-icon-btn" data-diff-msg="${mid}" aria-label="Сравнить версии" title="Сравнить">${ICONS.diff}</button>` : ''}`;
    }

    let actionsHtml = '';
    if (!isStreamingThis) {
      if (isUser) {
        actionsHtml = `<div class="msg-footer">${branchHtml}<button class="msg-icon-btn" data-copy-msg="${mid}" aria-label="Копировать" title="Копировать">${ICONS.copy}</button><button class="msg-icon-btn" data-ctx-msg="${mid}" aria-label="Ещё действия" title="Ещё">${ICONS.more}</button></div>`;
      } else {
        actionsHtml = `<div class="msg-footer">${branchHtml}<button class="msg-icon-btn" data-copy-msg="${mid}" aria-label="Копировать" title="Копировать">${ICONS.copy}</button><button class="msg-icon-btn" data-regen-msg="${mid}" aria-label="Сгенерировать заново" title="Ещё раз">${ICONS.regen}</button>${isLast ? `<button class="msg-icon-btn highlight" data-continue-msg="${mid}" aria-label="Продолжить ответ" title="Продолжить">${ICONS.cont}</button>` : ''}<button class="msg-icon-btn" data-ctx-msg="${mid}" aria-label="Ещё действия" title="Ещё">${ICONS.more}</button></div>`;
      }
    }

    const followupHtml = (!isUser && isLast && !isStreamingThis && !v.isError && state.settings.showFollowups && parsed.visible)
      ? '<div class="followup-chips">' + FOLLOWUP_PRESETS.map(p => `<button class="followup-chip" data-followup="${escapeHtml(p)}">${escapeHtml(p)}</button>`).join('') + '</div>' : '';

    const statusBadge = !isUser && v.statusText ? `<span class="status-badge">${escapeHtml(v.statusText)}</span>` : '';
    const headerHtml = isUser ? '' : `<div class="msg-header"><span class="msg-avatar"><img class="fox-avatar-img" src="/fox-avatar.webp" alt="Fox AI"></span><span>Fox AI</span>${statusBadge}</div>`;

    const statsHtml = (!isUser && !isStreamingThis && !v.isError && parsed.visible)
      ? (() => {
          const words = parsed.visible.trim().split(/\s+/).filter(Boolean).length;
          const secStr = v.genMs ? ((v.genMs / 1000).toFixed(1) + ' с · ') : '';
          return `<div class="msg-stats-line">${secStr}${words} сл.</div>`;
        })()
      : '';
    return `<div class="msg-wrapper ${msg.role}" data-msg-id="${mid}"><div class="swipe-reply-indicator">${ICONS.quote}</div><div class="msg-inner">${headerHtml}<div class="msg-bubble">${quoteHtml}${attHtml}${thinkHtml}${bodyContent}</div>${statsHtml}${actionsHtml}${followupHtml}</div></div>`;
  }

  function renderAttachments() {
    if (!state.pendingAttachments.length) { elAttPreview.classList.remove('show'); elAttPreview.innerHTML = ''; return; }
    elAttPreview.classList.add('show');
    elAttPreview.innerHTML = state.pendingAttachments.map((a, idx) => {
      const safeImg = a.kind === 'image' ? sanitizeImageDataUrl(a.dataUrl) : '';
      return safeImg
      ? `<div class="att-thumb img-thumb" data-edit-photo="${idx}"><img src="${escapeHtml(safeImg)}" alt="${escapeHtml(a.name)}"><span class="att-edit-badge">Ред.</span><button class="att-remove" data-rm-att="${idx}" aria-label="Удалить">×</button></div>`
      : `<div class="att-thumb file-thumb" data-view-pending="${idx}"><span>${escapeHtml(a.name)}</span><button class="att-remove" data-rm-att="${idx}" aria-label="Удалить">×</button></div>`;
    }).join('');
  }

  function renderQueue() {
    if (!state.queue.length) { elQueueBar.classList.remove('show'); elQueueList.innerHTML = ''; return; }
    elQueueBar.classList.add('show');
    $('queueHead').textContent = `Очередь (${state.queue.length})`;
    elQueueList.innerHTML = state.queue.map((q, idx) => `
      <div class="queue-item">
        <div class="queue-item-meta">
          <span class="queue-item-text">${escapeHtml(q.text || '[Файлы]')}</span>
          <span class="queue-item-sub">${escapeHtml(q.chatTitle || 'Чат')} · ${escapeHtml(q.status || 'Ожидает')}</span>
        </div>
        ${(q.status === 'Ошибка' || q.status === 'Нет сети') ? `<button class="icon-btn" data-retry-queue="${idx}" style="min-width:30px;min-height:30px;width:30px;height:30px;" aria-label="Повторить отправку" title="Повторить">↻</button>` : ''}
        <button class="icon-btn" data-rm-queue="${idx}" style="min-width:30px;min-height:30px;width:30px;height:30px;" aria-label="Удалить из очереди">×</button>
      </div>
    `).join('');
  }

  function setSendButtonState() {
    const stBar = $('composerStatus');
    if (stBar) stBar.classList.toggle('show', state.isStreaming);
    if (state.isStreaming) {
      const hasInput = elComposer.value.trim().length > 0 || state.pendingAttachments.length > 0;
      elBtnSend.title = hasInput ? 'Добавить в очередь' : 'Остановить генерацию';
      elBtnSend.setAttribute('aria-label', elBtnSend.title);
      elSendIcon.innerHTML = hasInput ? '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>' : '<rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor" stroke="none"/>';
    } else {
      elBtnSend.title = 'Отправить';
      elBtnSend.setAttribute('aria-label', 'Отправить сообщение');
      elSendIcon.innerHTML = '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>';
    }
  }

  /* ==================== GENERATION & CHAT-SCOPED QUEUE (SECTIONS 3.1 & 3.2) ==================== */
  async function handleSendAction() {
    elSlashMenu.classList.remove('open'); elCalcBar.classList.remove('show');
    const text = elComposer.value.trim(), hasPayload = text.length > 0 || state.pendingAttachments.length > 0;
    const targetChat = getActiveChat();

    if (state.isStreaming) {
      if (hasPayload) {
        state.queue.push({
          id: uid(), chatId: targetChat.id, isIncognito: state.incognito,
          chatTitle: state.incognito ? 'Инкогнито' : (targetChat.title || 'Новый чат'),
          text, attachments: [...state.pendingAttachments], quote: state.replyQuote, status: 'Ожидает'
        });
        elComposer.value = ''; autoResizeComposer(); saveCurrentDraft();
        state.pendingAttachments = []; clearQuote();
        renderAttachments(); renderQueue(); setSendButtonState();
        haptic(12); showToast('Добавлено в очередь');
      } else if (state.abortController) {
        state.abortController.abort();
      }
      return;
    }

    if (!hasPayload) return;
    if (!navigator.onLine) { showToast('Нет подключения к интернету'); return; }
    if (!canUseQuota()) return;
    haptic(10);

    const payload = { text, attachments: [...state.pendingAttachments], quote: state.replyQuote };
    elComposer.value = ''; autoResizeComposer(); saveCurrentDraft();
    state.pendingAttachments = []; clearQuote(); renderAttachments();
    await dispatchUserMessage(payload, targetChat);
  }

  async function dispatchUserMessage(payload, explicitChat, opts) {
    const chat = explicitChat || getActiveChat();
    if (!chat.messages.length && payload.text) {
      chat.title = payload.text.slice(0, 38) + (payload.text.length > 38 ? '…' : '');
      if (chat.folder === 'Все') chat.folder = autoDetectFolder(payload.text);
    }
    if (!state.incognito) detectMemoryFact(payload.text);
    const userMsg = { id: uid(), role: 'user', activeVersion: 0, versions: [{ text: payload.text, think: '', attachments: payload.attachments || [], quote: payload.quote || null, ts: Date.now() }] };
    const assistantMsg = { id: uid(), role: 'assistant', activeVersion: 0, versions: [{ text: '', think: '', attachments: [], quote: null, ts: Date.now(), isError: false, statusText: '' }] };
    chat.messages.push(userMsg, assistantMsg);
    chat.updatedAt = Date.now();
    saveChats(true);
    renderHeader(); renderDrawerList();
    const ok = await runGeneration(chat, assistantMsg, false);
    if (!ok && opts && opts.fromQueue) {
      const aVer = getMsgVersion(assistantMsg);
      if (aVer && aVer.isError) {
        chat.messages = chat.messages.filter(m => m.id !== userMsg.id && m.id !== assistantMsg.id);
        saveChats(true);
        if (getActiveChat().id === chat.id) renderMessages(false);
        renderDrawerList();
      }
    }
    return ok;
  }

  async function processNextQueueItem() {
    if (state.isStreaming) return;
    while (state.queue.length > 0) {
      const next = state.queue[0];
      const targetChat = next.isIncognito ? state.incognitoChat : state.chats.find(c => c.id === next.chatId);
      if (!targetChat) { state.queue.shift(); renderQueue(); continue; }
      if (!navigator.onLine) { next.status = 'Нет сети'; renderQueue(); return; }
      if (!canUseQuota()) { next.status = 'Лимит исчерпан'; renderQueue(); return; }
      if (next.status === 'Ошибка') return;
      next.status = 'Отправка…'; renderQueue();
      state.queue.shift(); renderQueue();
      let ok = false;
      try {
        ok = await dispatchUserMessage({ text: next.text, attachments: next.attachments, quote: next.quote }, targetChat, { fromQueue: true });
      } catch (err) {
        ok = false;
      }
      if (!ok) {
        next.retries = (next.retries || 0) + 1;
        next.status = !navigator.onLine ? 'Нет сети' : 'Ошибка';
        state.queue.unshift(next);
        renderQueue();
        showToast(next.status === 'Нет сети' ? 'Нет сети — сообщение сохранено в очереди' : 'Ошибка отправки — сообщение возвращено в очередь');
      }
      return;
    }
  }

  async function runGeneration(chat, assistantMsg, isContinue) {
    const genId = uid();
    consumeQuotaOnce(genId);
    const ac = new AbortController();
    state.isStreaming = true;
    document.body.classList.add('is-streaming');
    state.activeGenChatId = chat.id;
    state.abortController = ac;
    $('composerStatusText').textContent = 'Подготовка запроса…';
    startMiniFoxStreaming();
    setSendButtonState();
    if (getActiveChat().id === chat.id) renderMessages(true);

    const ver = getMsgVersion(assistantMsg);
    ver.isError = false;
    const genStartTs = performance.now();
    playUiSound('send');
    let shownVisibleLen = isContinue ? parseThinkText(ver.text, ver.think).visible.length : 0;
    let streamDone = false, rafId = null;

    const updateLiveDom = () => {
      if (getActiveChat().id !== chat.id) { if (!streamDone) rafId = requestAnimationFrame(updateLiveDom); return; }
      const parsed = parseThinkText(ver.text, ver.think);
      const statusEl = $('liveGenStatusText'), compStatus = $('composerStatusText');
      if (parsed.visible) {
        if (statusEl) statusEl.textContent = 'Генерация ответа · ' + ((performance.now() - genStartTs) / 1000).toFixed(1) + ' с';
        if (compStatus) compStatus.textContent = 'Генерация ответа…';
      } else if (parsed.think) {
        if (statusEl) statusEl.textContent = 'Думает · ' + ((performance.now() - genStartTs) / 1000).toFixed(1) + ' с';
        if (compStatus) compStatus.textContent = 'Обработка запроса…';
      }
      if (state.settings.showThink && parsed.think) {
        const tb = $('liveThinkBox'), tc = $('liveThinkContent');
        if (tb && tc) { tb.style.display = 'block'; tc.textContent = parsed.think; }
      }
      const bodyEl = $('liveStreamBody');
      if (bodyEl && parsed.visible && !parsed.isThinkingOpen) {
        const targetLen = parsed.visible.length;
        if (shownVisibleLen < targetLen) {
          const lag = targetLen - shownVisibleLen;
          const step = streamDone ? lag : Math.max(3, Math.ceil(lag * 0.3));
          shownVisibleLen = Math.min(targetLen, shownVisibleLen + step);
          const near = isNearBottom();
          bodyEl.innerHTML = renderMarkdown(parsed.visible.slice(0, shownVisibleLen), assistantMsg.id, true) + '<span class="stream-cursor"></span>';
          const liveCodeBox = bodyEl.querySelector('[data-live-code-scroll="1"]');
          if (liveCodeBox) liveCodeBox.scrollTop = liveCodeBox.scrollHeight;
          if (near) elChatScroll.scrollTop = elChatScroll.scrollHeight;
        }
      }
      if (!streamDone || shownVisibleLen < parsed.visible.length) rafId = requestAnimationFrame(updateLiveDom);
    };

    rafId = requestAnimationFrame(updateLiveDom);

    try {
      const MAX_AUTO_CONT = 2;
      let passContinue = isContinue;
      for (let pass = 0; pass <= MAX_AUTO_CONT; pass++) {
        let passAdded = '';
        const baseTextBeforePass = ver.text || '';
        const resMeta = await streamCompletion(chat, ({ content, reasoning }) => {
          if (reasoning) ver.think = (ver.think || '') + reasoning;
          if (content) {
            if (passContinue) {
              passAdded += content;
              ver.text = mergeContinuationText(baseTextBeforePass, passAdded);
            } else {
              ver.text = (ver.text || '') + content;
            }
          }
        }, ac.signal, passContinue, baseTextBeforePass);

        const truncatedByLen = resMeta && resMeta.finishReason === 'length';
        const unclosedCode = hasUnclosedCodeFence(parseThinkText(ver.text, ver.think).visible);
        if ((truncatedByLen || unclosedCode) && pass < MAX_AUTO_CONT && !ac.signal.aborted) {
          passContinue = true;
          const stEl = $('liveGenStatusText'), cpEl = $('composerStatusText');
          if (stEl) stEl.textContent = 'Дописываю код…';
          if (cpEl) cpEl.textContent = 'Дописываю код…';
          continue;
        }
        break;
      }
      ver.genMs = Math.round(performance.now() - genStartTs);
      ver.statusText = hasUnclosedCodeFence(parseThinkText(ver.text, ver.think).visible) ? 'Не завершён — нажмите «Продолжить»' : 'Ответ готов';
      playUiSound('done');
    } catch (err) {
      if (err && err.name === 'AbortError') {
        ver.statusText = 'Генерация остановлена';
        if (!ver.text) ver.text = '_Генерация остановлена._';
      } else if (err && err.isPartial) {
        ver.statusText = 'Прервано — можно продолжить';
        showToast('Соединение прервано — нажмите «Продолжить»');
      } else {
        ver.statusText = 'Ошибка соединения';
        if (!ver.text) { ver.isError = true; ver.text = (err && err.userMessage) ? err.userMessage : 'Ошибка соединения. Проверьте интернет и повторите запрос.'; }
        else showToast('Соединение прервано — нажмите «Продолжить»');
      }
    } finally {
      streamDone = true;
      if (rafId) cancelAnimationFrame(rafId);
      stopMiniFoxStreaming(!ver.isError);
      if (state.abortController === ac) {
        state.isStreaming = false;
        document.body.classList.remove('is-streaming');
        state.activeGenChatId = null;
        state.abortController = null;
      }
      chat.updatedAt = Date.now();
      saveChats(true);
      setSendButtonState();
      if (getActiveChat().id === chat.id) renderMessages(isNearBottom());
      renderDrawerList();

      const cleanVis = parseThinkText(ver.text, ver.think).visible;
      if (state.settings.autoTts && cleanVis && !ver.isError) speakText(assistantMsg.id, cleanVis);
      if (state.queue.length > 0 && !ver.isError && navigator.onLine) setTimeout(processNextQueueItem, 180);
    }
    return !ver.isError;
  }

  async function regenerateAssistantMessage(msgId) {
    if (state.isStreaming || !navigator.onLine || !canUseQuota()) return;
    haptic(12);
    const chat = getActiveChat(), idx = chat.messages.findIndex(m => m.id === msgId); if (idx === -1) return;
    const msg = chat.messages[idx];
    msg.versions.push({ text: '', think: '', attachments: [], quote: null, ts: Date.now(), isError: false, statusText: '' });
    msg.activeVersion = msg.versions.length - 1; saveChats(true);
    await runGeneration({ ...chat, messages: chat.messages.slice(0, idx) }, msg, false);
    chat.updatedAt = Date.now(); saveChats(true); renderDrawerList();
  }
  async function continueAssistantMessage(msgId) {
    if (state.isStreaming || !navigator.onLine || !canUseQuota()) return;
    haptic(12);
    const chat = getActiveChat(), msg = chat.messages.find(m => m.id === msgId); if (!msg) return;
    await runGeneration(chat, msg, true);
  }
  function editUserMessage(msgId) {
    if (state.isStreaming) return;
    const chat = getActiveChat(), idx = chat.messages.findIndex(m => m.id === msgId); if (idx === -1) return;
    const msg = chat.messages[idx], currentText = getMsgVersion(msg).text || '';
    openDialog('Редактировать сообщение', `<textarea class="field-textarea" id="editMsgTextarea">${escapeHtml(currentText)}</textarea>`, [
      { label: 'Отмена', cls: 'btn-secondary', onClick: () => closeModal('dialogModal') },
      { label: 'Сохранить', cls: 'btn-primary', onClick: async () => {
        const val = $('editMsgTextarea').value.trim(); closeModal('dialogModal');
        if (!val || !navigator.onLine || !canUseQuota()) return;
        const prevVer = getMsgVersion(msg);
        msg.versions.push({ text: val, think: '', attachments: prevVer.attachments || [], quote: prevVer.quote || null, ts: Date.now() });
        msg.activeVersion = msg.versions.length - 1;
        let nextMsg = chat.messages[idx + 1];
        if (nextMsg && nextMsg.role === 'assistant') { nextMsg.versions.push({ text: '', think: '', attachments: [], quote: null, ts: Date.now(), isError: false, statusText: '' }); nextMsg.activeVersion = nextMsg.versions.length - 1; }
        else { nextMsg = { id: uid(), role: 'assistant', activeVersion: 0, versions: [{ text: '', think: '', attachments: [], quote: null, ts: Date.now(), isError: false, statusText: '' }] }; chat.messages.splice(idx + 1, 0, nextMsg); }
        saveChats(true); await runGeneration({ ...chat, messages: chat.messages.slice(0, idx + 1) }, nextMsg, false);
      } }
    ]);
  }

  /* ==================== PDF.JS, VIDEO FRAMES (CONFIGURABLE), IMAGE RESIZE ==================== */
  function readImageResized(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const maxSide = 1280; let w = img.width, h = img.height;
          if (w > maxSide || h > maxSide) { const r = Math.min(maxSide / w, maxSide / h); w = Math.round(w * r); h = Math.round(h * r); }
          const c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(img, 0, 0, w, h); resolve(c.toDataURL('image/jpeg', 0.82));
        };
        img.onerror = reject; img.src = reader.result;
      };
      reader.onerror = reject; reader.readAsDataURL(file);
    });
  }

  function extractVideoFrames(file) {
    return new Promise((resolve, reject) => {
      if (file.size > MAX_VIDEO_BYTES) { reject(new Error('Видео превышает лимит 50 МБ')); return; }
      const maxFrames = Math.max(2, Math.min(8, Number(state.settings.videoFrames) || 4));
      const url = URL.createObjectURL(file), video = document.createElement('video');
      video.muted = true; video.playsInline = true; video.preload = 'auto'; video.src = url;
      const timeoutId = setTimeout(() => { URL.revokeObjectURL(url); reject(new Error('Превышено время декодирования видео')); }, 25000);
      video.onloadedmetadata = async () => {
        try {
          const dur = isFinite(video.duration) && video.duration > 0 ? video.duration : 2;
          const frames = [], c = document.createElement('canvas'), ctx = c.getContext('2d');
          const scale = Math.min(1, 768 / Math.max(video.videoWidth || 640, video.videoHeight || 360));
          c.width = Math.max(160, Math.round((video.videoWidth || 640) * scale));
          c.height = Math.max(120, Math.round((video.videoHeight || 360) * scale));
          for (let i = 0; i < maxFrames; i++) {
            const t = Math.min(dur - 0.05, Math.max(0.05, (dur / (maxFrames + 1)) * (i + 1)));
            await new Promise((res, rej) => { video.onseeked = res; video.onerror = () => rej(new Error('Ошибка кадра')); video.currentTime = t; });
            ctx.drawImage(video, 0, 0, c.width, c.height);
            frames.push({ kind: 'image', name: `${file.name} (кадр ${i + 1}/${maxFrames})`, dataUrl: c.toDataURL('image/jpeg', 0.78), metaNote: 'Без аудиодорожки' });
          }
          clearTimeout(timeoutId); URL.revokeObjectURL(url); resolve(frames);
        } catch (err) { clearTimeout(timeoutId); URL.revokeObjectURL(url); reject(err); }
      };
      video.onerror = () => { clearTimeout(timeoutId); URL.revokeObjectURL(url); reject(new Error('Не удалось декодировать видео')); };
    });
  }

  async function extractPdfWithPdfJs(file) {
    if (file.size > MAX_PDF_BYTES) throw new Error('PDF превышает лимит 15 МБ');
    const buf = await file.arrayBuffer();
    if (window.pdfjsLib && typeof window.pdfjsLib.getDocument === 'function') {
      try {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
        const pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
        const totalPages = pdf.numPages;
        let fullText = '', pagesRead = 0;
        for (let p = 1; p <= totalPages; p++) {
          const page = await pdf.getPage(p);
          const content = await page.getTextContent();
          const pageStr = content.items.map(it => it.str).join(' ').replace(/\s+/g, ' ').trim();
          if (pageStr) fullText += `\n--- Страница ${p} из ${totalPages} ---\n` + pageStr + '\n';
          pagesRead = p;
          if (fullText.length >= MAX_DOC_CHARS * 1.2) break;
        }
        fullText = fullText.trim();
        if (!fullText) return { content: '[В PDF не найден текстовый слой — возможно, это скан.]', metaNote: `${totalPages} стр., текст не найден` };
        const truncated = fullText.length > MAX_DOC_CHARS || pagesRead < totalPages;
        const finalContent = fullText.slice(0, MAX_DOC_CHARS);
        const note = truncated ? `Передана часть документа: стр. 1–${pagesRead} из ${totalPages} (${finalContent.length} симв.)` : `Прочитано полностью: ${totalPages} стр.`;
        return { content: finalContent, metaNote: note };
      } catch (e) {
        if (String(e && e.name) === 'InvalidPDFException') throw new Error('Файл PDF повреждён или защищён паролем');
      }
    }
    // Offline fallback if PDF.js CDN unavailable
    const latin = new TextDecoder('latin1').decode(new Uint8Array(buf)), chunks = [];
    const btRe = /BT([\s\S]*?)ET/g; let m;
    while ((m = btRe.exec(latin)) !== null) {
      const strRe = /\(([^()]*)\)\s*Tj|\[([^\]]+)\]\s*TJ/g; let sm;
      while ((sm = strRe.exec(m[1])) !== null) {
        if (sm[1]) chunks.push(sm[1]);
        else if (sm[2]) { const parts = sm[2].match(/\(([^()]*)\)/g); if (parts) chunks.push(parts.map(x => x.slice(1, -1)).join('')); }
      }
    }
    const cleaned = chunks.join(' ').replace(/\\n/g, '\n').replace(/\\([()\\])/g, '$1').replace(/\s+/g, ' ').trim();
    if (!cleaned) return { content: '[PDF.js недоступен офлайн, текстовый слой не извлечён.]', metaNote: 'Офлайн-разбор: текст не найден' };
    const truncated = cleaned.length > MAX_DOC_CHARS;
    return { content: cleaned.slice(0, MAX_DOC_CHARS), metaNote: truncated ? `Офлайн-разбор: передано ${MAX_DOC_CHARS} из ${cleaned.length} симв.` : 'Офлайн-разбор PDF' };
  }

  async function handleFilesSelected(files, typeHint) {
    closeModal('attachModal');
    for (const file of Array.from(files || [])) {
      if (state.pendingAttachments.length >= MAX_ATTACHMENTS_PER_MSG) {
        showToast(`Максимум ${MAX_ATTACHMENTS_PER_MSG} вложений в одном сообщении`);
        break;
      }
      try {
        const isSvgFile = /\.svg$/i.test(file.name) || file.type === 'image/svg+xml';
        if (!isSvgFile && (typeHint === 'image' || file.type.startsWith('image/'))) {
          if (file.size > MAX_IMAGE_BYTES) throw new Error('Изображение превышает лимит 15 МБ');
          const dataUrl = sanitizeImageDataUrl(await readImageResized(file));
          if (!dataUrl) throw new Error('Повреждённое или неподдерживаемое изображение');
          state.pendingAttachments.push({ kind: 'image', name: file.name.slice(0, 140), dataUrl });
        } else if (typeHint === 'video' || file.type.startsWith('video/')) {
          showToast('Извлечение кадров видео (без аудио)…');
          const frames = await extractVideoFrames(file);
          const room = Math.max(0, MAX_ATTACHMENTS_PER_MSG - state.pendingAttachments.length);
          state.pendingAttachments.push(...frames.slice(0, room));
          showToast(`Извлечено кадров: ${Math.min(frames.length, room)} (аудио не анализируется)`);
        } else if (typeHint === 'pdf' || /\.pdf$/i.test(file.name)) {
          showToast('Обработка PDF…');
          const { content, metaNote } = await extractPdfWithPdfJs(file);
          state.pendingAttachments.push({ kind: 'pdf', name: file.name.slice(0, 140), content, metaNote });
          showToast(metaNote);
        } else if (/\.docx$/i.test(file.name)) {
          showToast('Чтение DOCX…');
          const { content, metaNote } = await extractDocxFile(file);
          state.pendingAttachments.push({ kind: 'text', name: file.name.slice(0, 140), content, metaNote });
          showToast(metaNote);
        } else if (/\.xlsx$/i.test(file.name)) {
          showToast('Чтение XLSX…');
          const { content, metaNote } = await extractXlsxFile(file);
          state.pendingAttachments.push({ kind: 'text', name: file.name.slice(0, 140), content, metaNote });
          showToast(metaNote);
        } else if (/\.csv$/i.test(file.name)) {
          if (file.size > MAX_TEXT_BYTES) throw new Error('CSV превышает лимит 5 МБ');
          const raw = await file.text();
          const md = parseCsvToMarkdown(raw);
          state.pendingAttachments.push({ kind: 'text', name: file.name.slice(0, 140), content: md.slice(0, MAX_DOC_CHARS), metaNote: `CSV · ${raw.split(/\r?\n/).length} строк` });
        } else {
          if (file.size > MAX_TEXT_BYTES) throw new Error('Текстовый файл превышает лимит 5 МБ');
          const raw = await file.text();
          const truncated = raw.length > MAX_DOC_CHARS;
          state.pendingAttachments.push({ kind: 'text', name: file.name.slice(0, 140), content: raw.slice(0, MAX_DOC_CHARS), metaNote: truncated ? `Передано ${MAX_DOC_CHARS} из ${raw.length} симв.` : `${raw.length} симв.` });
        }
      } catch (e) { showToast(e && e.message ? e.message : ('Не удалось обработать: ' + file.name)); }
    }
    renderAttachments(); setSendButtonState();
  }

  /* ==================== SAFE EXPORT & VALIDATED IMPORT (SECTION 4.3) ==================== */
  function exportCurrentChat(ext) {
    const chat = getActiveChat(), lines = ext === 'md' ? ['# ' + chat.title, ''] : [chat.title, '========================', ''];
    for (const m of chat.messages) {
      const v = getMsgVersion(m), parsed = m.role === 'assistant' ? parseThinkText(v.text, '') : { visible: v.text };
      const who = m.role === 'user' ? (state.settings.userName || 'Вы') : 'Fox AI';
      if (ext === 'md') lines.push('### ' + who, '', parsed.visible || '', ''); else lines.push('[' + who + ']', parsed.visible || '', '');
    }
    downloadFile((chat.title || 'fox-ai-chat').replace(/[^\wА-Яа-яЁё-]+/g, '_').slice(0, 40) + '.' + ext, lines.join('\n'), ext === 'md' ? 'text/markdown;charset=utf-8' : 'text/plain;charset=utf-8');
    closeModal('exportModal'); showToast('Файл .' + ext + ' сохранён');
  }

  function exportBackupJson(selectedOnly) {
    const list = selectedOnly ? state.chats.filter(c => selectedOnly.has(c.id)) : state.chats;
    const payload = { app: 'Fox AI', version: 5, exportedAt: new Date().toISOString(), chats: list, memory: selectedOnly ? [] : state.memory, bookmarks: selectedOnly ? [] : state.bookmarks, prompts: selectedOnly ? [] : state.prompts, theme: state.theme, settings: state.settings };
    downloadFile(`fox-ai-backup-${todayKey()}.json`, JSON.stringify(payload, null, 2), 'application/json;charset=utf-8');
    closeModal('exportModal'); showToast(`Экспортировано чатов: ${list.length}`);
  }

  function openExportSelectedDialog() {
    closeModal('exportModal');
    const chosen = new Set(state.chats.map(c => c.id));
    const listHtml = state.chats.map(c => `<label class="sheet-row-btn" style="cursor:pointer;"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(c.title)}</span><input type="checkbox" checked data-exp-chk="${escapeHtml(c.id)}"></label>`).join('');
    openDialog('Выберите чаты для экспорта', `<div class="sheet-list" style="max-height:46dvh;overflow-y:auto;">${listHtml || 'Нет чатов'}</div>`, [
      { label: 'Отмена', cls: 'btn-secondary', onClick: () => closeModal('dialogModal') },
      { label: 'Скачать JSON', cls: 'btn-primary', onClick: () => {
        const picked = new Set();
        document.querySelectorAll('[data-exp-chk]:checked').forEach(el => picked.add(el.dataset.expChk));
        closeModal('dialogModal');
        if (!picked.size) { showToast('Не выбрано ни одного чата'); return; }
        exportBackupJson(picked);
      } }
    ]);
  }

  async function restoreBackupJson(file) {
    const inputEl = $('inputBackup');
    if (!file) { if (inputEl) inputEl.value = ''; return; }
    const fname = file.name || 'backup.json';
    try {
      if (file.size > 25 * 1024 * 1024) { showToast(`Файл «${fname}» слишком большой (макс. 25 МБ)`); return; }
      const raw = await file.text();
      let data;
      try { data = JSON.parse(raw); } catch { throw new Error('некорректный JSON'); }
      if (!data || typeof data !== 'object' || !Array.isArray(data.chats)) throw new Error('отсутствует обязательный массив chats');
      if (data.version && (typeof data.version !== 'number' || data.version > 10)) throw new Error('неподдерживаемая версия бэкапа');
      const cleanChats = data.chats.slice(0, MAX_BACKUP_CHATS).map(validateChatStructure).filter(Boolean);
      const cleanMemory = Array.isArray(data.memory) ? data.memory.slice(0, 200).filter(m => m && typeof m.text === 'string' && m.text.trim()).map(m => ({ id: safeId(m.id), text: m.text.trim().slice(0, 500), ts: Number(m.ts) || Date.now() })) : [];
      const cleanBookmarks = Array.isArray(data.bookmarks) ? data.bookmarks.slice(0, 300).filter(b => b && typeof b.text === 'string' && b.text.trim()).map(b => ({ id: safeId(b.id), msgId: safeId(b.msgId), chatTitle: String(b.chatTitle || 'Fox AI').slice(0, 120), text: b.text.slice(0, 2000), ts: Number(b.ts) || Date.now() })) : [];
      const cleanPrompts = Array.isArray(data.prompts) ? data.prompts.slice(0, 100).filter(p => p && typeof p.title === 'string' && typeof p.text === 'string').map(p => ({ id: safeId(p.id), title: p.title.slice(0, 100), text: p.text.slice(0, 3000) })) : [];
      const totalMsgs = cleanChats.reduce((s, c) => s + c.messages.length, 0);
      const memCount = cleanMemory.length;
      const bmCount = cleanBookmarks.length;

      closeModal('exportModal');
      openDialog('Предпросмотр импорта', `
        <div style="font-size:13.5px;color:var(--text-muted);line-height:1.55;margin-bottom:8px;">
          Найдено в файле:<br>
          • Чатов: <strong style="color:var(--text);">${cleanChats.length}</strong> (сообщений: ${totalMsgs})<br>
          • Фактов памяти: <strong style="color:var(--text);">${memCount}</strong> · Закладок: <strong style="color:var(--text);">${bmCount}</strong>
        </div>
      `, [
        { label: 'Отмена', cls: 'btn-secondary', onClick: () => closeModal('dialogModal') },
        { label: 'Объединить', cls: 'btn-secondary', onClick: () => {
          const existingIds = new Set(state.chats.map(c => c.id));
          for (const c of cleanChats) { if (existingIds.has(c.id)) c.id = uid(); state.chats.push(c); }
          if (cleanMemory.length) { for (const m of cleanMemory) if (!state.memory.some(x => x.text === m.text)) state.memory.push({ id: uid(), text: m.text, ts: m.ts }); saveMemory(); }
          if (cleanBookmarks.length) { for (const b of cleanBookmarks) state.bookmarks.push({ id: uid(), msgId: b.msgId, chatTitle: b.chatTitle, text: b.text, ts: b.ts }); saveBookmarks(); }
          if (cleanPrompts.length) { for (const p of cleanPrompts) if (!state.prompts.some(x => x.title === p.title && x.text === p.text)) state.prompts.push({ id: uid(), title: p.title, text: p.text }); savePrompts(); }
          saveChats(true); renderAll(); closeModal('dialogModal'); showToast('Данные объединены');
        } },
        { label: 'Заменить всё', cls: 'btn-primary', onClick: () => {
          state.chats = cleanChats.length ? cleanChats : [createChatObj(false)];
          if (cleanMemory.length) { state.memory = cleanMemory; saveMemory(); }
          if (cleanBookmarks.length) { state.bookmarks = cleanBookmarks; saveBookmarks(); }
          if (cleanPrompts.length) { state.prompts = cleanPrompts; savePrompts(); }
          if (data.settings && typeof data.settings === 'object') { state.settings = sanitizeSettingsObj(data.settings); applySettings(); }
          if (typeof data.theme === 'string') applyTheme(data.theme);
          state.activeChatId = state.chats[0].id;
          saveChats(true); renderAll(); closeModal('dialogModal'); showToast('История заменена');
        } }
      ]);
    } catch (err) {
      showToast(`Ошибка импорта «${fname}»: ` + (err && err.message ? err.message : 'неверный формат'));
    } finally {
      if (inputEl) inputEl.value = '';
    }
  }

  /* ==================== MINI-IDE 2.0 (SEPARATE HTML / CSS / JS + SANDBOX) ==================== */
  let ideAutoTimer = null;
  function splitHtmlToIde(raw, lang) {
    if (lang === 'css') return { html: '', css: raw, js: '' };
    if (lang === 'js' || lang === 'javascript') return { html: '', css: '', js: raw };
    let css = '', js = '', html = raw || '';
    html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, inner) => { css += (css ? '\n' : '') + inner.trim(); return ''; });
    html = html.replace(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi, (_, inner) => { js += (js ? '\n' : '') + inner.trim(); return ''; });
    return { html: html.trim(), css: css.trim(), js: js.trim() };
  }
  function openMiniIde(code, lang, msgId, explicitBundle) {
    const parts = explicitBundle || splitHtmlToIde(code, lang);
    state.ide = {
      html: parts.html, css: parts.css, js: parts.js, activeFile: 'html',
      origHtml: parts.html, origCss: parts.css, origJs: parts.js,
      darkBg: false, logs: [], msgId: msgId || null, originalBlock: code || ''
    };
    $('ideEditor').value = state.ide.html;
    selectIdeFile('html');
    $('idePreviewStage').classList.remove('dark-stage'); $('ideIframe').classList.remove('dark-frame');
    $('btnIdeBgToggle').textContent = 'Фон: Светлый';
    switchIdeTab('preview'); runIdePreview(); $('ideModal').classList.add('open');
  }
  function selectIdeFile(fileKey) {
    state.ide[state.ide.activeFile] = $('ideEditor').value;
    state.ide.activeFile = fileKey;
    $('ideEditor').value = state.ide[fileKey] || '';
    document.querySelectorAll('[data-ide-file]').forEach(b => b.classList.toggle('primary', b.dataset.ideFile === fileKey));
  }
  function createIdeRunToken() {
    const arr = new Uint8Array(16);
    if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(arr);
    else for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
    return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
  }
  function buildIdeCombinedHtml(runToken) {
    state.ide[state.ide.activeFile] = $('ideEditor').value;
    const bgCss = state.ide.darkBg ? 'html,body{background:#0a0a0a;color:#f5f5f5;}' : '';
    const tok = JSON.stringify(String(runToken || ''));
    const hook = `<script>(function(){const T=${tok};const s=(l,a)=>{try{parent.postMessage({__foxIde:true,token:T,level:l,msg:a.map(x=>typeof x==='object'?JSON.stringify(x):String(x)).join(' ').slice(0,2000)},'*');}catch(e){}};['log','warn','error','info'].forEach(f=>{const o=console[f];console[f]=function(...a){s(f,a);if(o)o.apply(console,a);};});window.addEventListener('error',e=>s('error',[e.message+(e.lineno?' (стр. '+e.lineno+')':'')]));window.addEventListener('unhandledrejection',e=>s('error',['Promise: '+(e.reason?.message||e.reason)]));})();<\/script>`;
    const styles = `<style>${bgCss}\n${state.ide.css || ''}</style>`;
    const script = state.ide.js ? `<script>${state.ide.js}<\/script>` : '';
    const rawHtml = state.ide.html || '';
    if (/<html|<body|<!doctype/i.test(rawHtml)) {
      let out = /<head[^>]*>/i.test(rawHtml) ? rawHtml.replace(/<head[^>]*>/i, m => m + hook + styles) : (hook + styles + rawHtml);
      return /<\/body>/i.test(out) ? out.replace(/<\/body>/i, script + '</body>') : (out + script);
    }
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">${hook}${styles}</head><body>${rawHtml}${script}</body></html>`;
  }
  function runIdePreview() {
    state.ide.logs = [];
    state.ide.runToken = createIdeRunToken();
    renderIdeConsole();
    $('ideIframe').srcdoc = buildIdeCombinedHtml(state.ide.runToken);
  }
  function switchIdeTab(tab) {
    document.querySelectorAll('[data-ide-tab]').forEach(b => b.classList.toggle('active', b.dataset.ideTab === tab));
    $('ideBody').classList.toggle('split-mode', tab === 'split');
    $('idePanePreview').classList.toggle('active', tab === 'preview' || tab === 'split');
    $('idePaneCode').classList.toggle('active', tab === 'code' || tab === 'split');
    $('idePaneConsole').classList.toggle('active', tab === 'console');
    $('ideFileTabs').classList.toggle('show', tab === 'code' || tab === 'split');
    $('idePreviewControls').style.display = (tab === 'preview' || tab === 'split') ? 'flex' : 'none';
    $('btnIdeCopy').style.display = (tab === 'code' || tab === 'split') ? 'inline-flex' : 'none';
    $('btnIdeReset').style.display = (tab === 'code' || tab === 'split') ? 'inline-flex' : 'none';
    $('btnIdeSaveToChat').style.display = ((tab === 'code' || tab === 'split') && state.ide.msgId) ? 'inline-flex' : 'none';
    $('btnIdeClearConsole').style.display = tab === 'console' ? 'inline-flex' : 'none';
    if (tab === 'preview' || tab === 'split') runIdePreview();
  }
  function renderIdeConsole() {
    $('ideConsoleBadge').textContent = state.ide.logs.length;
    const list = $('ideConsoleList');
    if (!state.ide.logs.length) { list.innerHTML = '<div style="color:var(--text-dim);text-align:center;padding:24px;">Консоль пуста</div>'; return; }
    list.innerHTML = state.ide.logs.map(l => `<div class="ide-log ${escapeHtml(l.level)}">[${escapeHtml(l.level.toUpperCase())}] ${escapeHtml(l.msg)}</div>`).join('');
  }
  window.addEventListener('message', e => {
    const iframe = $('ideIframe');
    if (!iframe || e.source !== iframe.contentWindow) return;
    if (e.origin !== 'null' && e.origin !== window.location.origin) return;
    const d = e.data;
    if (!d || typeof d !== 'object' || d.__foxIde !== true) return;
    if (!state.ide.runToken || d.token !== state.ide.runToken) return;
    if (state.ide.logs.length >= 300) return;
    const allowedLevels = { log: 1, warn: 1, error: 1, info: 1 };
    const level = allowedLevels[d.level] ? d.level : 'log';
    state.ide.logs.push({ level, msg: String(d.msg || '').slice(0, 2000) });
    renderIdeConsole();
  });

  /* ==================== CONTEXT SHEET, READER, VIEWER, PHOTO EDITOR, TTS ==================== */
  function openContextSheet(msgId) {
    const chat = getActiveChat(), msg = chat.messages.find(m => m.id === msgId); if (!msg) return;
    haptic(16);
    const v = getMsgVersion(msg), cleanText = msg.role === 'assistant' ? (parseThinkText(v.text, '').visible || v.text) : v.text;
    const bm = isBookmarked(msg.id), isSpeaking = state.ttsMsgId === msg.id, box = $('contextActions');
    box.innerHTML = `
      ${msg.role === 'user' ? '<button class="sheet-row-btn" data-ctx="edit"><span>Редактировать сообщение</span></button>' : `<button class="sheet-row-btn" data-ctx="tts"><span>${isSpeaking ? 'Остановить озвучку' : 'Озвучить ответ'}</span></button>`}
      <button class="sheet-row-btn" data-ctx="fork"><span>Ответвить диалог отсюда (Fork)</span></button>
      <button class="sheet-row-btn" data-ctx="bm"><span>${bm ? 'Убрать из закладок' : 'Сохранить в закладки'}</span></button>
      <button class="sheet-row-btn" data-ctx="read"><span>Режим чтения (на весь экран)</span></button>
      <button class="sheet-row-btn" data-ctx="share"><span>Поделиться текстом</span></button>
      <button class="sheet-row-btn" data-ctx="share-card"><span>Поделиться карточкой PNG</span></button>
      <button class="sheet-row-btn" data-ctx="select"><span>Копировать часть текста</span></button>
      <button class="sheet-row-btn" data-ctx="quote"><span>Цитировать</span></button>
      <button class="sheet-row-btn" data-ctx="copy"><span>Копировать полностью</span></button>
      <button class="sheet-row-btn" data-ctx="delete" style="border-color:var(--border-strong);font-weight:600;"><span>Удалить сообщение</span></button>
    `;
    box.onclick = e => {
      const btn = e.target.closest('[data-ctx]'); if (!btn) return;
      const act = btn.dataset.ctx; closeModal('contextModal');
      if (act === 'edit') editUserMessage(msg.id);
      else if (act === 'tts') speakText(msg.id, cleanText);
      else if (act === 'fork') forkChatAtMessage(msg.id);
      else if (act === 'bm') toggleBookmark(msg);
      else if (act === 'read') openReaderMode(cleanText);
      else if (act === 'share') shareTextNative(cleanText);
      else if (act === 'select') openDialog('Выделить и скопировать фрагмент', `<textarea class="field-textarea" readonly style="min-height:180px;">${escapeHtml(cleanText)}</textarea>`, [{ label: 'Копировать всё', cls: 'btn-secondary', onClick: () => { copyText(cleanText); closeModal('dialogModal'); } }, { label: 'Закрыть', cls: 'btn-primary', onClick: () => closeModal('dialogModal') }]);
      else if (act === 'quote') setQuote(cleanText);
      else if (act === 'copy') copyText(cleanText);
      else if (act === 'delete') { chat.messages = chat.messages.filter(m => m.id !== msgId); saveChats(true); renderMessages(); renderDrawerList(); showToast('Сообщение удалено'); }
    };
    openModal('contextModal');
  }
  function openReaderMode(mdText) { state.readerRawText = mdText || ''; $('readerBody').style.fontSize = state.readerFontSize + 'px'; $('readerBody').innerHTML = renderMarkdown(state.readerRawText, null, false); $('readerModal').classList.add('open'); }
  function renderFileViewerHighlighted() {
    const q = $('fileViewerSearch').value.trim(), raw = state.viewerRawText || '';
    if (!q) { $('fileViewerContent').textContent = raw; return; }
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    $('fileViewerContent').innerHTML = escapeHtml(raw).replace(re, m => `<mark class="search-hit">${m}</mark>`);
  }
  function openFileViewer(name, content) { state.viewerRawText = content || ''; $('fileViewerTitle').textContent = name || 'Файл'; $('fileViewerSearch').value = ''; renderFileViewerHighlighted(); $('btnFileViewerCopy').onclick = () => copyText(state.viewerRawText); openModal('fileViewerModal'); }
  function openPhotoEditor(attIdx) {
    const att = state.pendingAttachments[attIdx]; if (!att || att.kind !== 'image') return;
    const img = new Image();
    img.onload = () => {
      state.photoEdit = { idx: attIdx, img, rot: 0, crop: 'orig', qual: 0.72 };
      document.querySelectorAll('#photoCropSeg [data-crop]').forEach(b => b.classList.toggle('active', b.dataset.crop === 'orig'));
      document.querySelectorAll('#photoQualSeg [data-qual]').forEach(b => b.classList.toggle('active', b.dataset.qual === '0.72'));
      renderPhotoEditorCanvas(); openModal('photoEditorModal');
    };
    const safePeUrl = sanitizeImageDataUrl(att.dataUrl); if (!safePeUrl) { showToast('Некорректное изображение'); return; } img.src = safePeUrl;
  }
  function renderPhotoEditorCanvas() {
    const pe = state.photoEdit; if (!pe.img) return;
    const img = pe.img, swap = (Math.abs(pe.rot) % 180) === 90, rw = swap ? img.height : img.width, rh = swap ? img.width : img.height;
    const tmp = document.createElement('canvas'); tmp.width = rw; tmp.height = rh;
    const tctx = tmp.getContext('2d'); tctx.translate(rw / 2, rh / 2); tctx.rotate((pe.rot * Math.PI) / 180); tctx.drawImage(img, -img.width / 2, -img.height / 2);
    let cw = rw, ch = rh;
    if (pe.crop !== 'orig') { const [ax, ay] = pe.crop.split(':').map(Number), target = ax / ay; if (rw / rh > target) cw = Math.round(rh * target); else ch = Math.round(rw / target); }
    const out = $('photoEditorCanvas'); out.width = cw; out.height = ch;
    out.getContext('2d').drawImage(tmp, Math.round((rw - cw) / 2), Math.round((rh - ch) / 2), cw, ch, 0, 0, cw, ch);
    const dataUrl = out.toDataURL('image/jpeg', pe.qual);
    $('photoSizeLabel').textContent = `~${Math.round((dataUrl.length * 3) / 4 / 1024)} КБ (${cw}×${ch})`;
    pe.resultDataUrl = dataUrl;
  }
  function speakText(msgId, text) {
    if (!window.speechSynthesis) { showToast('Озвучка не поддерживается браузером'); return; }
    try { window.speechSynthesis.cancel(); window.speechSynthesis.resume(); } catch (e) {}
    const clean = (text || '').replace(/```[\s\S]*?```/g, 'Блок кода.').replace(/[#*_`>~]/g, '').trim(); if (!clean) return;
    const utter = new SpeechSynthesisUtterance(clean); utter.lang = 'ru-RU'; utter.rate = Number(state.settings.ttsRate) || 1;
    const ruVoice = (window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : []).find(v => /^ru/i.test(v.lang));
    if (ruVoice) utter.voice = ruVoice;
    utter.onend = utter.onerror = () => { state.ttsMsgId = null; renderMessages(); };
    state.ttsMsgId = msgId; renderMessages(); window.speechSynthesis.speak(utter);
  }
  function toggleTts(msgId, text) {
    if (state.ttsMsgId === msgId) { if (window.speechSynthesis) window.speechSynthesis.cancel(); state.ttsMsgId = null; renderMessages(); return; }
    speakText(msgId, text);
  }

  /* ==================== IN-CHAT SEARCH & SIMPLIFIED GESTURES (SECTION 7.2) ==================== */
  function runInChatSearch() {
    const q = $('chatSearchInput').value.trim();
    elChatContainer.querySelectorAll('mark.search-hit').forEach(m => m.replaceWith(document.createTextNode(m.textContent)));
    state.searchMatches = []; state.searchIdx = -1;
    if (!q) { $('chatSearchCount').textContent = '0/0'; return; }
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const walker = document.createTreeWalker(elChatContainer, NodeFilter.SHOW_TEXT, null);
    const nodes = []; let n;
    while ((n = walker.nextNode())) { if (n.parentElement && !n.parentElement.closest('script,style,button') && re.test(n.nodeValue)) nodes.push(n); re.lastIndex = 0; }
    for (const tn of nodes) {
      const frag = document.createDocumentFragment(); let last = 0, m; re.lastIndex = 0;
      while ((m = re.exec(tn.nodeValue)) !== null) {
        if (m.index > last) frag.appendChild(document.createTextNode(tn.nodeValue.slice(last, m.index)));
        const mark = document.createElement('mark'); mark.className = 'search-hit'; mark.textContent = m[0];
        frag.appendChild(mark); state.searchMatches.push(mark); last = m.index + m[0].length;
      }
      if (last < tn.nodeValue.length) frag.appendChild(document.createTextNode(tn.nodeValue.slice(last)));
      tn.parentNode.replaceChild(frag, tn);
    }
    if (state.searchMatches.length) jumpToSearchHit(0); else $('chatSearchCount').textContent = '0/0';
  }
  function jumpToSearchHit(idx) {
    if (!state.searchMatches.length) return;
    state.searchMatches.forEach(m => m.classList.remove('current'));
    state.searchIdx = (idx + state.searchMatches.length) % state.searchMatches.length;
    const hit = state.searchMatches[state.searchIdx];
    hit.classList.add('current'); hit.scrollIntoView({ behavior: 'smooth', block: 'center' });
    $('chatSearchCount').textContent = (state.searchIdx + 1) + '/' + state.searchMatches.length;
  }

  function setQuote(text) { const clean = (text || '').replace(/\s+/g, ' ').trim().slice(0, 140); if (!clean) return; state.replyQuote = clean; elQuoteBarText.textContent = clean; elQuoteBar.classList.add('show'); haptic(14); elComposer.focus(); }
  function clearQuote() { state.replyQuote = null; elQuoteBar.classList.remove('show'); }

  let touchStartX = 0, touchStartY = 0, swipingMsgEl = null, swipingInner = null, swipingInd = null, edgeSwipe = false, longPressTimer = null;
  document.addEventListener('touchstart', e => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0]; touchStartX = t.clientX; touchStartY = t.clientY;
    // Safe non-conflicting zone for drawer edge swipe (14px..36px from left avoids Android system back edge)
    edgeSwipe = touchStartX >= 14 && touchStartX <= 38 && !elDrawer.classList.contains('open');
    const wrapper = e.target.closest('.msg-wrapper');
    if (wrapper && !edgeSwipe && !e.target.closest('pre, .md-table-wrap, .diagram-canvas, .viz-card, .code-window, button')) {
      swipingMsgEl = wrapper; swipingInner = wrapper.querySelector('.msg-inner'); swipingInd = wrapper.querySelector('.swipe-reply-indicator');
      clearTimeout(longPressTimer);
      longPressTimer = setTimeout(() => { if (swipingMsgEl) openContextSheet(swipingMsgEl.dataset.msgId); swipingMsgEl = null; }, 480);
    } else swipingMsgEl = null;
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    if (e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - touchStartX, dy = e.touches[0].clientY - touchStartY;
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) clearTimeout(longPressTimer);
    if (edgeSwipe && dx > 10 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      const w = elDrawer.offsetWidth || 300;
      elDrawer.classList.add('dragging'); elDrawerBackdrop.classList.add('dragging');
      elDrawer.style.transform = `translateX(${Math.min(0, -w + dx)}px)`;
      elDrawerBackdrop.style.visibility = 'visible'; elDrawerBackdrop.style.opacity = Math.min(1, dx / w);
      return;
    }
    if (elDrawer.classList.contains('open') && dx < -10 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      const w = elDrawer.offsetWidth || 300;
      elDrawer.classList.add('dragging'); elDrawerBackdrop.classList.add('dragging');
      elDrawer.style.transform = `translateX(${Math.max(-w, dx)}px)`;
      elDrawerBackdrop.style.opacity = Math.max(0, 1 + dx / w);
      return;
    }
    if (swipingMsgEl && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      const clamped = dx > 0 ? Math.min(72, dx * 0.65) : Math.max(-72, dx * 0.65);
      swipingInner.classList.add('swiping'); swipingInner.style.transform = `translateX(${clamped}px)`;
      if (dx > 0) {
        const prog = Math.min(1, clamped / 52);
        swipingInd.style.opacity = prog; swipingInd.style.transform = `translateY(-50%) scale(${0.6 + prog * 0.4})`;
      }
    }
  }, { passive: true });

  document.addEventListener('touchend', e => {
    clearTimeout(longPressTimer);
    const endX = e.changedTouches[0] ? e.changedTouches[0].clientX : touchStartX;
    if (elDrawer.classList.contains('dragging')) {
      const dxD = endX - touchStartX, w = elDrawer.offsetWidth || 300;
      elDrawer.classList.remove('dragging'); elDrawerBackdrop.classList.remove('dragging');
      elDrawer.style.transform = ''; elDrawerBackdrop.style.opacity = ''; elDrawerBackdrop.style.visibility = '';
      if (edgeSwipe && dxD > w * 0.28) openDrawer();
      else if (elDrawer.classList.contains('open') && dxD < -w * 0.25) closeDrawer();
      edgeSwipe = false;
    }
    if (!swipingMsgEl) return;
    swipingInner.classList.remove('swiping'); swipingInner.style.transform = ''; swipingInd.style.opacity = 0;
    if (endX - touchStartX > 64) {
      const msg = getActiveChat().messages.find(m => m.id === swipingMsgEl.dataset.msgId);
      if (msg) setQuote(parseThinkText(getMsgVersion(msg).text, '').visible || getMsgVersion(msg).text);
    } else if (endX - touchStartX < -64) {
      const msg = getActiveChat().messages.find(m => m.id === swipingMsgEl.dataset.msgId);
      if (msg) { haptic(16); toggleBookmark(msg.id); }
    }
    swipingMsgEl = null;
  }, { passive: true });

  elChatContainer.addEventListener('contextmenu', e => { const wrapper = e.target.closest('.msg-wrapper'); if (wrapper) { e.preventDefault(); openContextSheet(wrapper.dataset.msgId); } });

  /* ==================== MODALS, CHAT MENU & BULK ACTIONS (SECTION 8) ==================== */
  function openDrawer() { elDrawer.classList.add('open'); elDrawerBackdrop.classList.add('open'); }
  function closeDrawer() { elDrawer.classList.remove('open'); elDrawerBackdrop.classList.remove('open'); }
  function openModal(id) { $(id).classList.add('open'); }
  function closeModal(id) { $(id).classList.remove('open'); }

  function openDialog(title, bodyHtml, buttons) {
    $('dialogTitle').textContent = title; $('dialogBody').innerHTML = bodyHtml;
    const btnRow = $('dialogBtns'); btnRow.innerHTML = '';
    buttons.forEach(b => { const btn = document.createElement('button'); btn.className = b.cls || 'btn-secondary'; btn.textContent = b.label; btn.addEventListener('click', b.onClick); btnRow.appendChild(btn); });
    openModal('dialogModal');
  }

  function deleteChatsByIds(idSet) {
    state.chats = state.chats.filter(c => !idSet.has(c.id));
    state.queue = state.queue.filter(q => !idSet.has(q.chatId));
    if (idSet.has(state.activeChatId)) state.activeChatId = (state.chats.find(c => !c.archived) || state.chats[0])?.id || null;
    state.selectedChatIds.clear();
    saveChats(true); renderAll();
  }

  function openChatMenu(chatId) {
    const chat = state.chats.find(c => c.id === chatId); if (!chat) return;
    $('chatMenuTitle').textContent = chat.title;
    const box = $('chatMenuActions'), folderTags = FOLDERS.filter(f => !['Все', 'Избранное', 'Архив'].includes(f));
    box.innerHTML = `
      <button class="sheet-row-btn" data-cm="pin"><span>${chat.pinned ? 'Открепить чат' : 'Закрепить чат'}</span></button>
      <button class="sheet-row-btn" data-cm="fav"><span>${chat.favorite ? 'Убрать из Избранного' : 'В Избранное'}</span></button>
      <button class="sheet-row-btn" data-cm="archive"><span>${chat.archived ? 'Восстановить из архива' : 'Архивировать чат'}</span></button>
      <button class="sheet-row-btn" data-cm="rename"><span>Переименовать</span></button>
      <div style="padding:6px 2px;font-size:12px;color:var(--text-muted);">Папка / тег:</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;">${['Все', ...folderTags].map(f => `<button class="folder-chip ${chat.folder === f ? 'active' : ''}" data-cm-folder="${f}">${f}</button>`).join('')}</div>
      <button class="sheet-row-btn" data-cm="delete" style="border-color:var(--text);font-weight:600;"><span>Удалить чат</span></button>
    `;
    box.onclick = ev => {
      const act = ev.target.closest('[data-cm]'), fld = ev.target.closest('[data-cm-folder]');
      if (fld) { chat.folder = fld.dataset.cmFolder; saveChats(true); renderDrawerList(); closeModal('chatMenuModal'); showToast('Папка: ' + chat.folder); return; }
      if (!act) return;
      const type = act.dataset.cm; closeModal('chatMenuModal');
      if (type === 'pin') { chat.pinned = !chat.pinned; saveChats(true); renderDrawerList(); }
      else if (type === 'fav') { chat.favorite = !chat.favorite; saveChats(true); renderDrawerList(); }
      else if (type === 'archive') { chat.archived = !chat.archived; saveChats(true); renderAll(); showToast(chat.archived ? 'Чат в архиве' : 'Восстановлено из архива'); }
      else if (type === 'rename') openDialog('Переименовать чат', `<input type="text" class="field-input" id="renameInput" value="${escapeHtml(chat.title)}">`, [{ label: 'Отмена', cls: 'btn-secondary', onClick: () => closeModal('dialogModal') }, { label: 'Сохранить', cls: 'btn-primary', onClick: () => { const v = $('renameInput').value.trim(); if (v) { chat.title = v; saveChats(true); renderHeader(); renderDrawerList(); } closeModal('dialogModal'); } }]);
      else if (type === 'delete') openDialog('Удалить чат?', `<p style="margin:0 0 8px;font-size:14px;color:var(--text-muted);">Чат «${escapeHtml(chat.title)}» и его ожидающие запросы в очереди будут удалены.</p>`, [{ label: 'Отмена', cls: 'btn-secondary', onClick: () => closeModal('dialogModal') }, { label: 'Удалить', cls: 'btn-primary', onClick: () => { deleteChatsByIds(new Set([chatId])); closeModal('dialogModal'); showToast('Чат удалён'); } }]);
    };
    openModal('chatMenuModal');
  }

  /* ==================== PWA & OFFLINE SUPPORT (SECTION 11) ==================== */

  function forkChatAtMessage(msgId) {
    const chat = getActiveChat();
    const idx = chat.messages.findIndex(m => m.id === msgId);
    if (idx === -1) return;
    const clonedMsgs = JSON.parse(JSON.stringify(chat.messages.slice(0, idx + 1)));
    const forked = createChatObj(false);
    forked.title = (chat.title || 'Новый чат').replace(/\s*\(ветка\)$/, '') + ' (ветка)';
    forked.folder = chat.folder || 'Все';
    forked.messages = clonedMsgs;
    forked.updatedAt = Date.now();
    state.incognito = false;
    state.chats.unshift(forked);
    state.activeChatId = forked.id;
    state.visibleWindowCount = MSG_WINDOW_STEP;
    saveChats(true);
    renderAll();
    showToast('Создана ветка диалога');
  }

  function updateContextMeter() {
    const chat = getActiveChat();
    const total = chat.messages.length;
    const inWindow = Math.min(total, 16);
    const recent = chat.messages.slice(-16);
    const chars = recent.reduce((s, m) => s + ((getMsgVersion(m).text || '').length), 0);
    const kb = (chars / 1024).toFixed(1);
    const pct = Math.min(100, Math.round((inWindow / 16) * 100));
    if ($('ctxMeterLabel')) $('ctxMeterLabel').textContent = `Контекст: ${inWindow} из ${Math.max(16, total)} сообщ.`;
    if ($('ctxMeterSize')) $('ctxMeterSize').textContent = `~${kb} КБ`;
    if ($('ctxMeterFill')) $('ctxMeterFill').style.width = pct + '%';
  }

  function compressChatToNew() {
    closeModal('headerMoreModal');
    const chat = getActiveChat();
    if (!chat.messages.length) { showToast('Диалог пуст'); return; }
    const digest = chat.messages.slice(-24).map(m => {
      const role = m.role === 'user' ? 'Пользователь' : 'Fox AI';
      const txt = (parseThinkText(getMsgVersion(m).text, '').visible || getMsgVersion(m).text || '').trim().replace(/\s+/g, ' ');
      return `- ${role}: ${txt.slice(0, 260)}${txt.length > 260 ? '…' : ''}`;
    }).join('\n');
    startNewChat();
    elComposer.value = 'Кратко резюмируй контекст нашего прошлого диалога и подтверди, что готов продолжить:\n\n' + digest.slice(0, 3500);
    autoResizeComposer();
    setSendButtonState();
    elComposer.focus();
    showToast('Контекст сжат в новый чат — нажмите отправить');
  }

  function buildPrintableReportHtml(chat) {
    const body = chat.messages.map(m => {
      const v = getMsgVersion(m);
      const isUser = m.role === 'user';
      const txt = isUser ? escapeHtml(v.text || '').replace(/\n/g, '<br>') : renderMarkdown(parseThinkText(v.text, v.think).visible || v.text || '', m.id, false);
      return `<section class="rep-msg ${m.role}"><div class="rep-role">${isUser ? 'Вы' : 'Fox AI'}</div><div class="rep-body">${txt}</div></section>`;
    }).join('');
    return `<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>${escapeHtml(chat.title || 'Fox AI')}</title><style>
      body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:780px;margin:0 auto;padding:28px 20px;color:#111;background:#fff;line-height:1.6;}
      h1{font-size:22px;margin:0 0 6px;border-bottom:1px solid #ddd;padding-bottom:10px;}
      .rep-meta{font-size:12px;color:#666;margin-bottom:22px;}
      .rep-msg{margin:0 0 18px;padding:12px 14px;border-radius:12px;border:1px solid #e5e5e5;page-break-inside:avoid;}
      .rep-msg.user{background:#f5f5f5;}
      .rep-role{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#555;margin-bottom:6px;}
      pre{background:#f7f7f7;border:1px solid #e0e0e0;border-radius:8px;padding:10px;overflow-x:auto;font-size:12.5px;}
      table{width:100%;border-collapse:collapse;margin:10px 0;font-size:13px;}
      th,td{border:1px solid #ddd;padding:6px 8px;text-align:left;}
      th{background:#f3f3f3;}
      svg{max-width:100%;height:auto;}
      .code-tools,.code-expand-long-btn,.chart-toolbar,.table-bar button,.bundle-run-btn{display:none!important;}
      @media print{body{padding:0;}.rep-msg{border-color:#ccc;}}
    </style></head><body><h1>${escapeHtml(chat.title || 'Диалог Fox AI')}</h1><div class="rep-meta">Экспорт Fox AI · ${new Date().toLocaleString('ru-RU')} · Сообщений: ${chat.messages.length}</div>${body}</body></html>`;
  }

  function exportChatHtmlReport() {
    const chat = getActiveChat();
    if (!chat.messages.length) { showToast('Нет сообщений для экспорта'); return; }
    downloadFile((chat.title || 'fox-ai-report').replace(/[^a-zа-яё0-9_-]/gi, '_') + '.html', buildPrintableReportHtml(chat), 'text/html;charset=utf-8');
    closeModal('exportModal');
    showToast('HTML-отчёт скачан');
  }

  function exportChatPdfPrint() {
    const chat = getActiveChat();
    if (!chat.messages.length) { showToast('Нет сообщений для печати'); return; }
    closeModal('exportModal');
    const html = buildPrintableReportHtml(chat);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const w = window.open(blobUrl, '_blank', 'noopener,noreferrer');
    if (w) {
      setTimeout(() => { URL.revokeObjectURL(blobUrl); }, 60000);
    } else {
      URL.revokeObjectURL(blobUrl);
      downloadFile('fox-ai-print.html', html, 'text/html;charset=utf-8');
      showToast('Браузер заблокировал окно — сохранён HTML для печати');
    }
  }

  function assertSafeZipUncompressedSize(zip) {
    let total = 0;
    for (const entry of Object.values(zip.files || {})) {
      const uSize = entry && entry._data && Number(entry._data.uncompressedSize);
      if (Number.isFinite(uSize) && uSize > 0) total += uSize;
      if (total > MAX_ZIP_UNCOMPRESSED_BYTES) throw new Error('Архив документа слишком большой после распаковки (лимит 25 МБ)');
    }
  }
  async function extractDocxFile(file) {
    if (file.size > 15 * 1024 * 1024) throw new Error('DOCX слишком большой (макс. 15 МБ)');
    if (typeof window.JSZip === 'undefined') throw new Error('Для чтения .docx нужен интернет (JSZip)');
    const zip = await window.JSZip.loadAsync(await file.arrayBuffer());
    assertSafeZipUncompressedSize(zip);
    const xmlEntry = zip.file('word/document.xml');
    if (!xmlEntry) throw new Error('Повреждённый файл DOCX');
    const xmlStr = await xmlEntry.async('string');
    if (xmlStr.length > MAX_ZIP_UNCOMPRESSED_BYTES) throw new Error('Содержимое DOCX превышает безопасный лимит');
    const doc = new DOMParser().parseFromString(xmlStr, 'application/xml');
    if (doc.getElementsByTagName('parsererror').length) throw new Error('Повреждённая XML-структура DOCX');
    const paras = Array.from(doc.getElementsByTagName('w:p')).map(p =>
      Array.from(p.getElementsByTagName('w:t')).map(t => t.textContent).join('')
    ).filter(Boolean);
    const full = paras.join('\n');
    const truncated = full.length > MAX_DOC_CHARS;
    return {
      content: full.slice(0, MAX_DOC_CHARS),
      metaNote: `DOCX · ${paras.length} абз.` + (truncated ? ` (обрезано до ${MAX_DOC_CHARS} симв.)` : '')
    };
  }

  async function extractXlsxFile(file) {
    if (file.size > 15 * 1024 * 1024) throw new Error('XLSX слишком большой (макс. 15 МБ)');
    if (typeof window.JSZip === 'undefined') throw new Error('Для чтения .xlsx нужен интернет (JSZip)');
    const zip = await window.JSZip.loadAsync(await file.arrayBuffer());
    assertSafeZipUncompressedSize(zip);
    let shared = [];
    const ssEntry = zip.file('xl/sharedStrings.xml');
    if (ssEntry) {
      const ssDoc = new DOMParser().parseFromString(await ssEntry.async('string'), 'application/xml');
      shared = Array.from(ssDoc.getElementsByTagName('si')).map(si =>
        Array.from(si.getElementsByTagName('t')).map(t => t.textContent).join('')
      );
    }
    const sheetNames = Object.keys(zip.files).filter(n => /^xl\/worksheets\/sheet\d+\.xml$/i.test(n)).sort();
    if (!sheetNames.length) throw new Error('Листы не найдены в XLSX');
    const parts = [];
    for (let sIdx = 0; sIdx < Math.min(sheetNames.length, 4); sIdx++) {
      const sDoc = new DOMParser().parseFromString(await zip.file(sheetNames[sIdx]).async('string'), 'application/xml');
      const rows = Array.from(sDoc.getElementsByTagName('row')).slice(0, 80).map(r =>
        Array.from(r.getElementsByTagName('c')).map(c => {
          const t = c.getAttribute('t');
          const v = c.getElementsByTagName('v')[0]?.textContent || c.getElementsByTagName('t')[0]?.textContent || '';
          return t === 's' ? (shared[Number(v)] || '') : v;
        })
      ).filter(r => r.some(x => String(x).trim() !== ''));
      if (rows.length) {
        const md = rows.map((r, ri) => '| ' + r.map(x => String(x).replace(/\|/g, '/')).join(' | ') + ' |' + (ri === 0 ? '\n| ' + r.map(() => '---').join(' | ') + ' |' : '')).join('\n');
        parts.push(`### Лист ${sIdx + 1}\n` + md);
      }
    }
    const full = parts.join('\n\n');
    const truncated = full.length > MAX_DOC_CHARS;
    return {
      content: full.slice(0, MAX_DOC_CHARS),
      metaNote: `XLSX · листов: ${sheetNames.length}` + (truncated ? ` (обрезано до ${MAX_DOC_CHARS} симв.)` : '')
    };
  }

  function parseCsvToMarkdown(raw) {
    const lines = raw.trim().split(/\r?\n/).slice(0, 80);
    if (!lines.length) return '';
    const sep = lines[0].includes(';') && !lines[0].includes(',') ? ';' : ',';
    const rows = lines.map(l => l.split(sep).map(c => c.trim().replace(/^"|"$/g, '').replace(/\|/g, '/')));
    return rows.map((r, i) => '| ' + r.join(' | ') + ' |' + (i === 0 ? '\n| ' + r.map(() => '---').join(' | ') + ' |' : '')).join('\n');
  }

  const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('foxai_sync_v1') : null;
  const tabId = uid();
  function broadcastSync(kind) {
    if (syncChannel) { try { syncChannel.postMessage({ kind, from: tabId, ts: Date.now() }); } catch (e) {} }
  }
  if (syncChannel) {
    syncChannel.onmessage = async ev => {
      if (!ev.data || ev.data.from === tabId) return;
      const k = ev.data.kind;
      if (k === 'chats' && !state.isStreaming) {
        const fresh = await FoxDB.get('chats');
        if (Array.isArray(fresh) && fresh.length) { state.chats = fresh; renderDrawerList(); if (!state.incognito) renderMessages(false); }
      } else if (k === 'theme') {
        const th = lsGet(LS_KEYS.THEME, 'dark');
        document.documentElement.setAttribute('data-theme', th);
      } else if (k === 'quota') {
        state.quota = lsGet(LS_KEYS.QUOTA, { date: todayKey(), count: 0 });
        syncQuota();
      } else if (k === 'memory') {
        const mem = await FoxDB.get('memory');
        if (Array.isArray(mem)) { state.memory = mem; renderMemoryList(); }
      }
    };
  }


  /* ==================== 9-SPRITE STUDIO 2D FOX ANIMATION ENGINE ==================== */
  let foxRafId = null;
  let foxState = null;

  function stopFoxMascot() {
    if (foxRafId) { cancelAnimationFrame(foxRafId); foxRafId = null; }
  }

  function startFoxMascot() {
    stopFoxMascot();
    const stage = $('foxMascotStage');
    const actor = $('foxActor');
    const shadow = $('foxShadow');
    const word = $('foxWord');
    const wrap = $('foxSpriteWrap');
    if (!stage || !actor || !word || !wrap) return;

    const letters = Array.from(word.querySelectorAll('.fox-letter'));
    if (!letters.length) return;

    const poseKeys = ['walk1', 'walk2', 'walk3', 'hop', 'sit', 'stretch', 'happy', 'groom', 'sleep'];
    const imgs = {};
    poseKeys.forEach(k => { imgs[k] = $('foxImg_' + k); });

    let activePose = 'walk1';
    const setPose = pose => {
      if (pose === activePose || !imgs[pose]) return;
      if (imgs[activePose]) imgs[activePose].classList.remove('active');
      imgs[pose].classList.add('active');
      activePose = pose;
    };

    const getPerches = () => {
      const sr = stage.getBoundingClientRect();
      return letters.map((el, idx) => {
        const r = el.getBoundingClientRect();
        const ch = el.textContent.trim();
        const isLower = ch === 'o' || ch === 'x';
        const topOffset = isLower ? r.height * 0.27 : r.height * 0.06;
        return { idx, el, x: (r.left - sr.left) + r.width * 0.5, y: (r.top - sr.top) + topOffset };
      });
    };

    const spawnSparks = (x, y, count) => {
      for (let i = 0; i < count; i++) {
        const sp = document.createElement('span');
        sp.className = 'fox-spark';
        sp.style.left = x + 'px';
        sp.style.top = y + 'px';
        const ang = -Math.PI * (0.15 + Math.random() * 0.7);
        const dist = 12 + Math.random() * 16;
        sp.style.setProperty('--dx', (Math.cos(ang) * dist).toFixed(1) + 'px');
        sp.style.setProperty('--dy', (Math.sin(ang) * dist).toFixed(1) + 'px');
        stage.appendChild(sp);
        setTimeout(() => sp.remove(), 460);
      }
    };

    const pressLetter = idx => {
      const l = letters[idx];
      if (!l) return;
      l.classList.add('pressed');
      setTimeout(() => l.classList.remove('pressed'), 190);
    };

    let perches = getPerches();
    const startP = perches[1] || perches[0];
    foxState = {
      x: startP.x, y: startP.y,
      curIdx: startP.idx, targetIdx: 3, dir: 1,
      mode: 'walk', modeTimer: 0, modeDuration: 2.0, phase: 0, walkFramePhase: 0,
      hopProgress: 0, hopFromX: startP.x, hopFromY: startP.y, hopToX: startP.x, hopToY: startP.y,
      landSquash: 0
    };

    const walkSeq = ['walk1', 'walk2', 'walk3', 'walk2'];

    const pickNextAction = () => {
      perches = getPerches();
      const roll = Math.random();
      if (roll < 0.40) {
        let nextIdx = Math.floor(Math.random() * perches.length);
        if (nextIdx === foxState.curIdx) nextIdx = (foxState.curIdx + 1) % perches.length;
        foxState.targetIdx = nextIdx;
        const distIdx = Math.abs(nextIdx - foxState.curIdx);
        const crossesGap = (foxState.curIdx <= 2 && nextIdx >= 3) || (foxState.curIdx >= 3 && nextIdx <= 2);
        foxState.dir = perches[nextIdx].x >= foxState.x ? 1 : -1;
        if (crossesGap || distIdx >= 2 || Math.random() < 0.35) {
          foxState.mode = 'hop';
          foxState.hopProgress = 0;
          foxState.hopFromX = foxState.x; foxState.hopFromY = foxState.y;
          foxState.hopToX = perches[nextIdx].x; foxState.hopToY = perches[nextIdx].y;
          foxState.modeDuration = 0.54 + distIdx * 0.08;
        } else {
          foxState.mode = 'walk';
          foxState.modeDuration = 1.8;
        }
      } else if (roll < 0.56) {
        foxState.mode = 'sit'; foxState.modeDuration = 2.2 + Math.random() * 1.4;
      } else if (roll < 0.70) {
        foxState.mode = 'stretch'; foxState.modeDuration = 2.0 + Math.random() * 0.8;
      } else if (roll < 0.85) {
        foxState.mode = 'groom'; foxState.modeDuration = 2.2 + Math.random() * 1.2;
      } else {
        foxState.mode = 'sleep'; foxState.modeDuration = 3.8 + Math.random() * 2.0;
      }
      const hr = new Date().getHours();
      if ((hr >= 23 || hr < 6) && foxState.mode !== 'walk' && foxState.mode !== 'hop' && Math.random() < 0.55) {
        foxState.mode = 'sleep'; foxState.modeDuration = 5.0 + Math.random() * 2.5;
      }
      foxState.modeTimer = 0;
      actor.classList.toggle('is-sleeping', foxState.mode === 'sleep');
    };

    const triggerHappy = () => {
      haptic(10);
      foxState.mode = 'happy';
      foxState.modeTimer = 0;
      foxState.modeDuration = 1.6;
      actor.classList.remove('is-sleeping');
      pressLetter(foxState.curIdx);
      spawnSparks(foxState.x, foxState.y - 4, 6);
    };

    const goToLetter = idx => {
      perches = getPerches();
      if (!perches[idx]) return;
      haptic(8);
      if (idx === foxState.curIdx) { triggerHappy(); return; }
      foxState.targetIdx = idx;
      foxState.dir = perches[idx].x >= foxState.x ? 1 : -1;
      foxState.mode = 'hop';
      foxState.hopProgress = 0;
      foxState.hopFromX = foxState.x; foxState.hopFromY = foxState.y;
      foxState.hopToX = perches[idx].x; foxState.hopToY = perches[idx].y;
      foxState.modeDuration = 0.54;
      foxState.modeTimer = 0;
      actor.classList.remove('is-sleeping');
    };

    actor.addEventListener('click', e => { e.stopPropagation(); triggerHappy(); });
    actor.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerHappy(); } });
    word.addEventListener('click', e => {
      const fl = e.target.closest('.fox-letter');
      if (fl) goToLetter(Number(fl.dataset.fl));
    });

    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setPose('sit');
      actor.style.transform = `translate3d(${foxState.x.toFixed(1)}px, ${foxState.y.toFixed(1)}px, 0)`;
      if (shadow) shadow.style.transform = `translate3d(${foxState.x.toFixed(1)}px, ${(foxState.y - 2).toFixed(1)}px, 0)`;
      return;
    }

    let lastTs = performance.now();
    const tick = now => {
      if (!document.body.contains(stage)) { stopFoxMascot(); return; }
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      if (document.hidden) { foxRafId = requestAnimationFrame(tick); return; }

      foxState.phase += dt;
      foxState.modeTimer += dt;
      if (foxState.landSquash > 0) foxState.landSquash = Math.max(0, foxState.landSquash - dt * 5);

      let hopLift = 0, rot = 0, sx = 1, sy = 1, ty = 0;

      if (foxState.mode === 'walk') {
        perches = getPerches();
        const tgt = perches[foxState.targetIdx] || perches[0];
        const dx = tgt.x - foxState.x;
        const speed = 56;
        if (Math.abs(dx) <= speed * dt + 1.5) {
          foxState.x = tgt.x; foxState.y = tgt.y; foxState.curIdx = tgt.idx;
          foxState.landSquash = 0.6;
          pressLetter(tgt.idx);
          pickNextAction();
        } else {
          foxState.dir = dx >= 0 ? 1 : -1;
          foxState.x += Math.sign(dx) * speed * dt;
          let nearest = perches[0], bestD = 9999;
          for (const p of perches) { const d = Math.abs(p.x - foxState.x); if (d < bestD) { bestD = d; nearest = p; } }
          foxState.y += (nearest.y - foxState.y) * Math.min(1, dt * 14);
          foxState.walkFramePhase += dt * 7.5;
          const frameIdx = Math.floor(foxState.walkFramePhase) % walkSeq.length;
          setPose(walkSeq[frameIdx]);
          ty = -Math.abs(Math.sin(foxState.walkFramePhase * Math.PI * 0.5)) * 2.5;
          rot = Math.sin(foxState.walkFramePhase * Math.PI * 0.5) * 2.0;
        }
      } else if (foxState.mode === 'hop') {
        setPose('hop');
        foxState.hopProgress = Math.min(1, foxState.modeTimer / foxState.modeDuration);
        const t = foxState.hopProgress;
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        foxState.x = foxState.hopFromX + (foxState.hopToX - foxState.hopFromX) * ease;
        foxState.y = foxState.hopFromY + (foxState.hopToY - foxState.hopFromY) * ease;
        const peak = 30 + Math.min(14, Math.abs(foxState.hopToX - foxState.hopFromX) * 0.14);
        hopLift = Math.sin(t * Math.PI) * peak;
        rot = (0.5 - t) * -15;
        sy = 1 + Math.sin(t * Math.PI) * 0.08;
        sx = 1 - Math.sin(t * Math.PI) * 0.04;
        if (t >= 1) {
          foxState.curIdx = foxState.targetIdx;
          foxState.landSquash = 1.0;
          pressLetter(foxState.curIdx);
          spawnSparks(foxState.x, foxState.y - 2, 4);
          pickNextAction();
        }
      } else if (foxState.mode === 'sit') {
        setPose('sit');
        const br = Math.sin(foxState.phase * 2.6);
        sy = 1 + br * 0.022; sx = 1 - br * 0.012;
        if (foxState.modeTimer >= foxState.modeDuration) pickNextAction();
      } else if (foxState.mode === 'stretch') {
        setPose('stretch');
        const p = Math.sin(Math.min(1, foxState.modeTimer / foxState.modeDuration) * Math.PI);
        sx = 1 + p * 0.06; sy = 1 - p * 0.04;
        ty = p * 2;
        if (foxState.modeTimer >= foxState.modeDuration) pickNextAction();
      } else if (foxState.mode === 'groom') {
        setPose('groom');
        const nod = Math.sin(foxState.modeTimer * 6.5);
        rot = nod * 3.5;
        sy = 1 + Math.abs(nod) * 0.02;
        if (foxState.modeTimer >= foxState.modeDuration) pickNextAction();
      } else if (foxState.mode === 'sleep') {
        setPose('sleep');
        const br = Math.sin(foxState.phase * 2.0);
        sy = 1 + br * 0.038; sx = 1 - br * 0.02;
        ty = 2;
        if (foxState.modeTimer >= foxState.modeDuration) pickNextAction();
      } else if (foxState.mode === 'happy') {
        setPose('happy');
        const t = foxState.modeTimer;
        const bounce = Math.abs(Math.sin(t * 9.0)) * Math.max(0, 1 - t / foxState.modeDuration);
        hopLift = bounce * 13;
        rot = Math.sin(t * 14) * 5;
        sy = 1 + bounce * 0.07;
        if (foxState.modeTimer >= foxState.modeDuration) pickNextAction();
      }

      if (foxState.landSquash > 0) {
        sy *= (1 - foxState.landSquash * 0.13);
        sx *= (1 + foxState.landSquash * 0.11);
      }

      actor.style.transform = `translate3d(${foxState.x.toFixed(1)}px, ${(foxState.y - hopLift).toFixed(1)}px, 0) scaleX(${foxState.dir})`;
      wrap.style.transform = `translateY(${ty.toFixed(1)}px) rotate(${rot.toFixed(1)}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
      if (shadow) {
        const sScale = Math.max(0.45, 1 - hopLift / 48);
        shadow.style.transform = `translate3d(${foxState.x.toFixed(1)}px, ${(foxState.y - 2).toFixed(1)}px, 0) scaleX(${sScale.toFixed(2)})`;
        shadow.style.opacity = (0.16 * sScale).toFixed(2);
      }

      foxRafId = requestAnimationFrame(tick);
    };
    foxRafId = requestAnimationFrame(tick);
  }


  let miniFoxTimer = null;
  function startMiniFoxStreaming() {
    stopMiniFoxStreaming(false);
    const el = $('streamFoxMini');
    if (!el || state.settings.foxCompanion === false) return;
    const frames = ['foxImg_walk1', 'foxImg_walk2', 'foxImg_walk3', 'foxImg_walk2'].map(id => $(id)?.src).filter(Boolean);
    if (!frames.length) return;
    let fi = 0; el.src = frames[0]; el.classList.add('show');
    miniFoxTimer = setInterval(() => { fi = (fi + 1) % frames.length; el.src = frames[fi]; }, 170);
  }
  function stopMiniFoxStreaming(showHappy) {
    if (miniFoxTimer) { clearInterval(miniFoxTimer); miniFoxTimer = null; }
    const el = $('streamFoxMini'); if (!el) return;
    if (showHappy && state.settings.foxCompanion !== false && $('foxImg_happy')?.src) {
      el.src = $('foxImg_happy').src;
      setTimeout(() => el.classList.remove('show'), 900);
    } else el.classList.remove('show');
  }

  let projDraftFiles = [];
  function saveProjects() { FoxDB.set('projects', state.projects); }
  function renderProjectsList() {
    const box = $('projectsList'); if (!box) return;
    if (!state.projects.length) { box.innerHTML = '<div style="font-size:13px;color:var(--text-dim);text-align:center;padding:16px 8px;">Проектов пока нет — создайте первый выше</div>'; return; }
    const curPid = getActiveChat().projectId || null;
    box.innerHTML = state.projects.map(p => `
      <div class="art-item">
        <div class="art-item-top">
          <span>${escapeHtml(p.name)}${curPid === p.id ? ' · <span style="font-size:11px;color:var(--text-muted);">Активен</span>' : ''}</span>
          <span style="font-size:11.5px;color:var(--text-muted);">Файлов: ${(p.files || []).length}</span>
        </div>
        ${p.instructions ? `<div class="art-item-sub">${escapeHtml(p.instructions)}</div>` : ''}
        <div class="art-item-acts">
          <button class="code-btn primary" data-proj-use="${escapeHtml(p.id)}">Подключить к чату</button>
          <button class="code-btn" data-proj-new="${escapeHtml(p.id)}">Новый чат</button>
          <button class="code-btn" data-proj-del="${escapeHtml(p.id)}">Удалить</button>
        </div>
      </div>`).join('');
  }

  let artFilter = 'all', artifactsCache = [];
  function collectArtifacts() {
    const items = [];
    for (const c of state.chats) {
      if (c.archived) continue;
      for (const m of c.messages) {
        if (m.role !== 'assistant') continue;
        const txt = getMsgVersion(m).text || '';
        const reCode = /```([\w+-]*)[^\n]*\n([\s\S]*?)```/g;
        let match;
        while ((match = reCode.exec(txt)) !== null) {
          const lang = (match[1] || 'code').toLowerCase(), code = match[2].trim();
          if (!code) continue;
          items.push({ id: uid(), kind: ['chart', 'mermaid', 'svg'].includes(lang) ? 'chart' : 'code', lang, code, chatId: c.id, chatTitle: c.title || 'Чат', msgId: m.id, ts: c.updatedAt || 0 });
        }
        const reTbl = /((?:^\|.+\|\s*\n){3,})/gm;
        while ((match = reTbl.exec(txt)) !== null) {
          items.push({ id: uid(), kind: 'table', lang: 'table', code: match[1].trim(), chatId: c.id, chatTitle: c.title || 'Чат', msgId: m.id, ts: c.updatedAt || 0 });
        }
      }
    }
    artifactsCache = items.sort((a, b) => b.ts - a.ts);
    return artifactsCache;
  }
  function renderArtifactsGallery() {
    const all = collectArtifacts();
    const list = artFilter === 'all' ? all : all.filter(x => x.kind === artFilter);
    const box = $('artifactsList');
    if (!list.length) { box.innerHTML = '<div style="font-size:13px;color:var(--text-dim);text-align:center;padding:20px 8px;">Артефактов в этой категории пока нет</div>'; return; }
    box.innerHTML = list.slice(0, 60).map(item => `
      <div class="art-item">
        <div class="art-item-top"><span>${escapeHtml(item.lang.toUpperCase())} · ${escapeHtml(item.chatTitle)}</span><span style="font-size:11px;color:var(--text-dim);">${item.code.split('\n').length} стр.</span></div>
        <div class="art-item-sub">${escapeHtml(item.code.slice(0, 110))}</div>
        <div class="art-item-acts">
          ${['html','htm','css','js','javascript'].includes(item.lang) ? `<button class="code-btn primary" data-art-ide="${item.id}">В Мини-IDE</button>` : ''}
          <button class="code-btn" data-art-jump="${item.id}">К чату</button>
          <button class="code-btn" data-art-copy="${item.id}">Копировать</button>
        </div>
      </div>`).join('');
  }

  let deckFlipped = false, currentStudyCardId = null;
  function saveFlashDeck() { FoxDB.set('flashDeck', state.flashDeck); updateDeckBadge(); }
  function getDueCards() { const now = Date.now(); return state.flashDeck.filter(c => (c.nextReview || 0) <= now); }
  function updateDeckBadge() {
    const b = $('deckDueBadge'); if (!b) return;
    const due = getDueCards().length;
    b.textContent = due > 0 ? `К повторению: ${due}` : `Карточек: ${state.flashDeck.length}`;
  }
  function addCardsToSm2Deck(cards) {
    let added = 0;
    for (const c of cards) {
      const f = String(c.front || '').trim(), b = String(c.back || '').trim();
      if (!f || !b || state.flashDeck.some(x => x.front.toLowerCase() === f.toLowerCase())) continue;
      state.flashDeck.push({ id: uid(), front: f, back: b, interval: 0, reps: 0, ease: 2.5, nextReview: Date.now() });
      added++;
    }
    saveFlashDeck();
    showToast(added > 0 ? `Добавлено в колоду SM-2: ${added}` : 'Эти карточки уже есть в колоде');
  }
  function rateSm2Card(cardId, quality) {
    const card = state.flashDeck.find(c => c.id === cardId); if (!card) return;
    if (quality < 3) { card.reps = 0; card.interval = 1; }
    else {
      if (card.reps === 0) card.interval = 1;
      else if (card.reps === 1) card.interval = 4;
      else card.interval = Math.round(card.interval * (card.ease || 2.5));
      if (quality === 5) card.interval = Math.max(2, Math.round(card.interval * 1.35));
      card.reps = (card.reps || 0) + 1;
    }
    card.ease = Math.max(1.3, (card.ease || 2.5) + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    card.nextReview = Date.now() + card.interval * 86400000;
    deckFlipped = false; saveFlashDeck(); renderDeckModal();
    showToast(`Следующее повторение через ${card.interval} дн.`);
  }
  function renderDeckModal() {
    const area = $('deckStudyArea'), due = getDueCards();
    $('deckModalTitle').textContent = `Колода SM-2 (${due.length} на сегодня · всего ${state.flashDeck.length})`;
    if (!due.length) {
      currentStudyCardId = null;
      area.innerHTML = `<div style="text-align:center;padding:24px 10px;color:var(--text-muted);font-size:13.5px;">${state.flashDeck.length ? 'На сегодня все карточки повторены!' : 'Колода пока пуста. Добавьте карточку ниже или сохраните карточки из ответа ИИ.'}</div>`;
      return;
    }
    const card = due[0]; currentStudyCardId = card.id;
    area.innerHTML = `
      <div class="sm2-card-box" id="sm2FlipZone">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--text-dim);">${deckFlipped ? 'Ответ' : 'Вопрос · нажмите, чтобы перевернуть'}</div>
        <div style="font-size:15.5px;font-weight:500;color:var(--text);line-height:1.5;">${escapeHtml(deckFlipped ? card.back : card.front)}</div>
      </div>
      ${deckFlipped ? `<div class="sm2-rate-row">
        <button class="code-btn" data-sm2-rate="2" style="height:38px;justify-content:center;">Трудно (1д)</button>
        <button class="code-btn" data-sm2-rate="4" style="height:38px;justify-content:center;">Хорошо</button>
        <button class="code-btn primary" data-sm2-rate="5" style="height:38px;justify-content:center;">Легко</button>
      </div>` : `<button class="code-btn primary" id="btnSm2Reveal" style="width:100%;height:38px;justify-content:center;">Показать ответ</button>`}
      <div style="display:flex;justify-content:flex-end;margin-top:8px;">
        <button class="code-btn" data-sm2-del="${escapeHtml(card.id)}" style="height:28px;font-size:11.5px;">Удалить карточку</button>
      </div>`;
  }

  let diffFileA = null, diffFileB = null, lastDiffSummary = '';
  async function readAnyTextFile(file) {
    if (/\.pdf$/i.test(file.name)) return (await extractPdfWithPdfJs(file)).content;
    if (/\.docx$/i.test(file.name)) return (await extractDocxFile(file)).content;
    if (/\.xlsx$/i.test(file.name)) return (await extractXlsxFile(file)).content;
    if (/\.csv$/i.test(file.name)) return parseCsvToMarkdown(await file.text());
    return (await file.text()).slice(0, MAX_DOC_CHARS);
  }
  function computeLineDiff(textA, textB) {
    const a = textA.split(/\r?\n/), b = textB.split(/\r?\n/), setA = new Set(a), setB = new Set(b);
    const out = []; let added = 0, removed = 0;
    for (let i = 0; i < Math.min(Math.max(a.length, b.length), 300); i++) {
      const la = a[i], lb = b[i];
      if (la === lb && la !== undefined) out.push({ t: 'eq', v: la });
      else {
        if (la !== undefined && !setB.has(la)) { out.push({ t: 'del', v: '- ' + la }); removed++; }
        if (lb !== undefined && !setA.has(lb)) { out.push({ t: 'add', v: '+ ' + lb }); added++; }
      }
    }
    return { lines: out, added, removed };
  }
  function renderFileDiff() {
    if (!diffFileA || !diffFileB) return;
    const d = computeLineDiff(diffFileA.text, diffFileB.text);
    $('diffSummaryLine').textContent = `${diffFileA.name} → ${diffFileB.name} · Добавлено: +${d.added}, удалено: -${d.removed}`;
    const box = $('diffOutputBox'); box.style.display = 'block';
    box.innerHTML = d.lines.slice(0, 180).map(l => `<span class="diff-l-${l.t}">${escapeHtml(l.v)}</span>`).join('') || '<span class="diff-l-eq">Файлы идентичны</span>';
    lastDiffSummary = d.lines.filter(l => l.t !== 'eq').map(l => l.v).slice(0, 120).join('\n');
    $('btnDiffSendAi').style.display = 'inline-flex';
  }

  function isPwaInstalled() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
  }

  function makePwaIconPng(size) {
    try {
      const c = document.createElement('canvas');
      c.width = size; c.height = size;
      const ctx = c.getContext('2d');
      if (!ctx) return null;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, size, size);
      const s = size / 120;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 5.5 * s;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      const pts = [[22,52],[24,18],[50,38],[70,38],[96,18],[98,52],[84,82],[60,100],[36,82]];
      ctx.beginPath();
      ctx.moveTo(pts[0][0] * s, pts[0][1] * s);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0] * s, pts[i][1] * s);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(44 * s, 60 * s, 4.5 * s, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(76 * s, 60 * s, 4.5 * s, 0, Math.PI * 2); ctx.fill();
      return c.toDataURL('image/png');
    } catch (e) { return null; }
  }

  function syncPwaUi() {
    const installed = isPwaInstalled();
    const canPrompt = !!state.deferredPwaPrompt && !installed;
    const dismissed = lsGet('foxai_pwa_dismissed', false);
    const banner = $('pwaInstallBanner');
    if (banner) banner.classList.toggle('show', canPrompt && !dismissed);
    const headerBtn = $('btnInstallPwaHeader');
    if (headerBtn) headerBtn.style.display = installed ? 'none' : '';
    const badge = $('pwaSettingsBadge');
    if (badge) badge.textContent = installed ? 'Установлено ✓' : (canPrompt ? 'Установить сейчас' : 'Инструкция');
  }

  function downloadSwFile() {
    const swCode = [
      "const CACHE_NAME = 'fox-ai-static-v4';",
      "self.addEventListener('install', e => { self.skipWaiting(); });",
      "self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });",
      "self.addEventListener('fetch', e => {",
      "  const u = e.request.url;",
      "  if (e.request.method !== 'GET' || u.includes('/api/')) return;",
      "  e.respondWith(fetch(e.request).then(r => { if (r.ok && u.startsWith(self.location.origin)) { const cl = r.clone(); caches.open(CACHE_NAME).then(c => c.put(e.request, cl)); } return r; }).catch(() => caches.match(e.request)));",
      "});"
    ].join('\n');
    downloadFile('sw.js', swCode, 'application/javascript;charset=utf-8');
    showToast('Файл sw.js скачан — положите его рядом с index.html на HTTPS');
  }

  function initPwa() {
    try {
      const icon180 = makePwaIconPng(180);
      const icon192 = makePwaIconPng(192);
      const icon512 = makePwaIconPng(512);
      if (icon180) {
        const appleIcon = document.createElement('link');
        appleIcon.rel = 'apple-touch-icon'; appleIcon.sizes = '180x180'; appleIcon.href = icon180;
        document.head.appendChild(appleIcon);
      }
      if (icon192) {
        const fav = document.createElement('link');
        fav.rel = 'icon'; fav.type = 'image/png'; fav.sizes = '192x192'; fav.href = icon192;
        document.head.appendChild(fav);
      }
      const icons = [];
      if (icon192) icons.push({ src: icon192, sizes: '192x192', type: 'image/png', purpose: 'any' });
      if (icon512) {
        icons.push({ src: icon512, sizes: '512x512', type: 'image/png', purpose: 'any' });
        icons.push({ src: icon512, sizes: '512x512', type: 'image/png', purpose: 'maskable' });
      }
      const startUrl = (location.protocol === 'http:' || location.protocol === 'https:') ? location.href.split('#')[0] : './';
      const manifest = {
        id: './',
        name: 'Fox AI',
        short_name: 'Fox AI',
        description: 'Минималистичный мобильный ИИ-чат Fox AI',
        start_url: startUrl,
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons
      };
      const link = document.createElement('link'); link.rel = 'manifest';
      link.href = URL.createObjectURL(new Blob([JSON.stringify(manifest)], { type: 'application/manifest+json' }));
      document.head.appendChild(link);
    } catch (e) {}

    // Безопасная регистрация Service Worker: только реальный same-origin ./sw.js на HTTPS/localhost.
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
      fetch('./sw.js', { method: 'HEAD', cache: 'no-store' })
        .then(res => { if (res.ok) return navigator.serviceWorker.register('./sw.js'); })
        .catch(() => { /* SW опционален в однофайловом режиме */ });
    }

    const syncOnline = (forceOnline) => {
      const online = typeof forceOnline === 'boolean' ? forceOnline : navigator.onLine;
      $('offlineBanner').classList.toggle('show', !online);
    };
    window.addEventListener('online', () => { syncOnline(true); showToast('Подключение восстановлено'); state.queue.forEach(q => { if (q.status === 'Нет сети' || q.status === 'Ошибка') q.status = 'Ожидает'; }); renderQueue(); if (state.queue.length && !state.isStreaming) processNextQueueItem(); });
    window.addEventListener('offline', () => syncOnline(false));
    syncOnline();

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      state.deferredPwaPrompt = e;
      syncPwaUi();
    });
    window.addEventListener('appinstalled', () => {
      state.deferredPwaPrompt = null;
      syncPwaUi();
      showToast('Fox AI установлен как приложение');
    });
    syncPwaUi();
  }

  async function triggerPwaInstall() {
    closeDrawer();
    closeModal('headerMoreModal');
    closeModal('settingsModal');
    if (isPwaInstalled()) {
      showToast('Fox AI уже установлен как приложение');
      return;
    }
    if (state.deferredPwaPrompt) {
      const promptEv = state.deferredPwaPrompt;
      state.deferredPwaPrompt = null;
      try {
        await promptEv.prompt();
        const choice = await promptEv.userChoice;
        if (choice && choice.outcome === 'accepted') showToast('Установка Fox AI запущена');
      } catch (e) {}
      syncPwaUi();
      return;
    }
    const isLocalFile = location.protocol === 'file:' || location.protocol === 'content:';
    const localNote = isLocalFile
      ? '<p style="margin:0 0 10px;padding:10px 12px;border-radius:10px;background:var(--surface-2);font-size:12.5px;color:var(--text-muted);line-height:1.45;">Сейчас файл открыт локально. Для автоматической установки PWA в один клик откройте Fox AI по <strong>HTTPS</strong> (например, GitHub Pages / Netlify) вместе с файлом <code>sw.js</code>.</p>'
      : '';
    openDialog('Установка Fox AI (PWA)', `${localNote}<p style="margin:0 0 8px;font-size:13.5px;color:var(--text-muted);line-height:1.55;"><strong>Android (Chrome):</strong> меню браузера (⋮) → «Установить приложение» или «Добавить на главный экран».<br><br><strong>iPhone / iPad (Safari):</strong> кнопка «Поделиться» → «На экран “Домой”».<br><br><strong>ПК (Chrome / Edge):</strong> значок установки в правой части адресной строки.</p>`, [
      { label: 'Скачать sw.js', cls: 'btn-secondary', onClick: () => { downloadSwFile(); } },
      { label: 'Понятно', cls: 'btn-primary', onClick: () => closeModal('dialogModal') }
    ]);
  }
  function autoResizeComposer() { elComposer.style.height = 'auto'; elComposer.style.height = Math.min(140, elComposer.scrollHeight) + 'px'; }

  /* ==================== EVENT BINDINGS ==================== */
  function bindEvents() {
    if (window.visualViewport) {
      const syncViewport = () => {
        document.documentElement.style.setProperty('--vvh', window.visualViewport.height + 'px');
        if (window.visualViewport.offsetTop > 0) window.scrollTo(0, 0);
        if (document.activeElement === elComposer) setTimeout(() => { elChatScroll.scrollTop = elChatScroll.scrollHeight; }, 40);
      };
      window.visualViewport.addEventListener('resize', syncViewport);
      window.visualViewport.addEventListener('scroll', syncViewport);
      syncViewport();
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open, .full-modal.open, .lightbox.open').forEach(el => el.classList.remove('open'));
        closeDrawer();
        const csb = $('chatSearchBar');
        if (csb && csb.classList.contains('open')) { csb.classList.remove('open'); }
        return;
      }
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (elDrawer.classList.contains('open')) { $('drawerSearch').focus(); }
        else {
          const csb = $('chatSearchBar');
          if (csb) { csb.classList.add('open'); $('chatSearchInput').focus(); }
        }
      } else if (mod && e.shiftKey && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        createNewChat();
        showToast('Создан новый чат');
      }
    });

    $('btnMenu').addEventListener('click', openDrawer);
    elDrawerBackdrop.addEventListener('click', closeDrawer);
    $('btnHeaderTitle').addEventListener('click', () => { syncSettingsUi(); $('settingsSearch').value = ''; filterSettings('all', ''); openModal('settingsModal'); });
    $('btnHeaderMore').addEventListener('click', () => { $('incognitoMenuLabel').textContent = state.incognito ? 'Выключить Инкогнито' : 'Режим Инкогнито'; updateContextMeter(); syncPwaUi(); openModal('headerMoreModal'); });
    $('btnCompressChat').addEventListener('click', compressChatToNew);
    $('btnStopGenInline').addEventListener('click', () => { if (state.abortController) state.abortController.abort(); });

    $('btnToc').addEventListener('click', () => { closeModal('headerMoreModal'); renderTocList(); openModal('tocModal'); });
    $('tocFilterSeg').addEventListener('click', e => { const b = e.target.closest('[data-toc-tab]'); if (!b) return; state.tocTab = b.dataset.tocTab; $('tocFilterSeg').querySelectorAll('[data-toc-tab]').forEach(x => x.classList.toggle('active', x === b)); renderTocList(); });
    $('tocList').addEventListener('click', e => {
      const btn = e.target.closest('[data-toc-jump]'); if (!btn) return;
      closeModal('tocModal');
      const el = elChatContainer.querySelector(`[data-msg-id="${btn.dataset.tocJump}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    $('btnNewChatTop').addEventListener('click', startNewChat);
    $('btnNewChatDrawer').addEventListener('click', () => { startNewChat(); closeDrawer(); });
    $('btnThemeToggle').addEventListener('click', () => { haptic(8); const o = ['dark', 'light', 'paper']; applyTheme(o[(o.indexOf(state.theme) + 1) % o.length]); });
    $('btnIncognito').addEventListener('click', () => {
      closeModal('headerMoreModal'); haptic(10);
      state.incognito = !state.incognito;
      if (state.incognito) {
        state.incognitoChat = createChatObj(true);
        state.pendingAttachments = [];
      } else {
        // Section 9: Clear all temporary incognito data, attachments & memory suggestion banner on exit
        state.incognitoChat = null;
        state.pendingAttachments = [];
        state.queue = state.queue.filter(q => !q.isIncognito);
        state.suggestedMemory = null;
        if (elMemSuggestBar) elMemSuggestBar.classList.remove('show');
      }
      renderAll(); restoreCurrentDraft();
      showToast(state.incognito ? 'Режим Инкогнито включён' : 'Временные данные Инкогнито очищены');
    });

    elChatScroll.addEventListener('scroll', () => {
      const distBottom = elChatScroll.scrollHeight - elChatScroll.scrollTop - elChatScroll.clientHeight;
      $('btnScrollBottom').classList.toggle('show', distBottom > 180);
      $('btnScrollTop').classList.toggle('show', elChatScroll.scrollTop > 320);
    }, { passive: true });
    $('btnScrollBottom').addEventListener('click', () => elChatScroll.scrollTo({ top: elChatScroll.scrollHeight, behavior: 'smooth' }));
    $('btnScrollTop').addEventListener('click', () => elChatScroll.scrollTo({ top: 0, behavior: 'smooth' }));

    $('btnChatSearch').addEventListener('click', () => { closeModal('headerMoreModal'); state.searchOpen = !state.searchOpen; $('chatSearchBar').classList.toggle('open', state.searchOpen); if (state.searchOpen) $('chatSearchInput').focus(); else { $('chatSearchInput').value = ''; runInChatSearch(); } });
    $('btnSearchClose').addEventListener('click', () => { state.searchOpen = false; $('chatSearchBar').classList.remove('open'); $('chatSearchInput').value = ''; runInChatSearch(); });
    $('chatSearchInput').addEventListener('input', runInChatSearch);
    $('btnSearchPrev').addEventListener('click', () => jumpToSearchHit(state.searchIdx - 1));
    $('btnSearchNext').addEventListener('click', () => jumpToSearchHit(state.searchIdx + 1));

    // Drawer tools: search, sort, bulk select, folders
    $('drawerSearch').addEventListener('input', e => { state.historyQuery = e.target.value; renderDrawerList(); });
    $('btnSortChats').addEventListener('click', () => { state.sortBy = state.sortBy === 'date' ? 'title' : 'date'; renderDrawerList(); });
    $('btnBulkMode').addEventListener('click', () => { state.bulkMode = !state.bulkMode; state.selectedChatIds.clear(); renderDrawerList(); });
    $('btnBulkDelete').addEventListener('click', () => {
      if (!state.selectedChatIds.size) return;
      openDialog('Удалить выбранные чаты?', `<p style="margin:0 0 8px;font-size:14px;color:var(--text-muted);">Будет удалено чатов: ${state.selectedChatIds.size}.</p>`, [
        { label: 'Отмена', cls: 'btn-secondary', onClick: () => closeModal('dialogModal') },
        { label: 'Удалить', cls: 'btn-primary', onClick: () => { deleteChatsByIds(new Set(state.selectedChatIds)); state.bulkMode = false; closeModal('dialogModal'); showToast('Выбранные чаты удалены'); } }
      ]);
    });
    $('btnBulkArchive').addEventListener('click', () => {
      if (!state.selectedChatIds.size) return;
      const toArch = state.folder !== 'Архив';
      state.chats.forEach(c => { if (state.selectedChatIds.has(c.id)) c.archived = toArch; });
      state.selectedChatIds.clear(); state.bulkMode = false; saveChats(true); renderAll();
      showToast(toArch ? 'Перемещено в архив' : 'Восстановлено из архива');
    });
    $('btnBulkFolder').addEventListener('click', () => {
      if (!state.selectedChatIds.size) return;
      const tags = ['Все', 'Код', 'Учёба', 'Идеи', 'Работа'];
      openDialog('Переместить в папку', `<div style="display:flex;flex-wrap:wrap;gap:6px;">${tags.map(t => `<button class="folder-chip" data-bulk-set-fld="${t}">${t}</button>`).join('')}</div>`, [{ label: 'Отмена', cls: 'btn-secondary', onClick: () => closeModal('dialogModal') }]);
      $('dialogBody').onclick = ev => {
        const b = ev.target.closest('[data-bulk-set-fld]'); if (!b) return;
        state.chats.forEach(c => { if (state.selectedChatIds.has(c.id)) c.folder = b.dataset.bulkSetFld; });
        state.selectedChatIds.clear(); state.bulkMode = false; saveChats(true); renderDrawerList(); closeModal('dialogModal'); showToast('Перемещено в папку: ' + b.dataset.bulkSetFld);
      };
    });

    $('folderChips').addEventListener('click', e => { const btn = e.target.closest('.folder-chip'); if (!btn) return; state.folder = btn.dataset.folder; $('folderChips').querySelectorAll('.folder-chip').forEach(b => b.classList.toggle('active', b === btn)); renderDrawerList(); });
    elChatList.addEventListener('click', e => {
      const more = e.target.closest('[data-chat-menu]'); if (more) { e.stopPropagation(); openChatMenu(more.dataset.chatMenu); return; }
      const item = e.target.closest('[data-open-chat]'); if (!item) return;
      const cid = item.dataset.openChat;
      if (state.bulkMode) {
        if (state.selectedChatIds.has(cid)) state.selectedChatIds.delete(cid); else state.selectedChatIds.add(cid);
        renderDrawerList(); return;
      }
      saveCurrentDraft(); state.incognito = false; state.activeChatId = cid; state.visibleWindowCount = MSG_WINDOW_STEP;
      saveChats(); renderAll(); restoreCurrentDraft(); closeDrawer();
      const jumpMid = item.dataset.jumpMsg;
      if (jumpMid && state.historyQuery.trim()) {
        setTimeout(() => {
          state.searchOpen = true; $('chatSearchBar').classList.add('open'); $('chatSearchInput').value = state.historyQuery.trim(); runInChatSearch();
          const el = elChatContainer.querySelector(`[data-msg-id="${jumpMid}"]`); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 60);
      }
    });

    $('btnDrawerFilters').addEventListener('click', () => {
      haptic(8);
      $('drawerFiltersPanel').classList.toggle('open');
    });
    $('modeActiveChip').addEventListener('click', () => { haptic(8); setMode('fast'); });

    const fmtLabels = { short: 'Кратко', steps: 'По шагам', table: 'Таблицей' };
    const setFormatPreset = fmt => {
      state.formatPreset = fmt || 'default';
      document.querySelectorAll('#formatPresetSeg [data-fmt]').forEach(b => b.classList.toggle('active', b.dataset.fmt === state.formatPreset));
      const fc = $('formatActiveChip');
      if (fc) {
        fc.classList.toggle('show', state.formatPreset !== 'default');
        if ($('formatActiveLabel') && fmtLabels[state.formatPreset]) $('formatActiveLabel').textContent = fmtLabels[state.formatPreset];
      }
    };
    $('formatPresetSeg').addEventListener('click', e => { const b = e.target.closest('[data-fmt]'); if (b) { haptic(8); setFormatPreset(b.dataset.fmt); } });
    $('formatActiveChip').addEventListener('click', () => { haptic(8); setFormatPreset('default'); });

    $('contentFilterRow').addEventListener('click', e => {
      const b = e.target.closest('[data-cfilter]');
      if (!b) return;
      haptic(8);
      state.contentFilter = b.dataset.cfilter;
      document.querySelectorAll('#contentFilterRow [data-cfilter]').forEach(x => x.classList.toggle('active', x.dataset.cfilter === state.contentFilter));
      renderDrawerList();
    });

    elComposer.addEventListener('paste', e => {
      const items = e.clipboardData && e.clipboardData.items ? Array.from(e.clipboardData.items) : [];
      const files = items.filter(it => it.kind === 'file').map(it => it.getAsFile()).filter(Boolean);
      if (files.length) {
        e.preventDefault();
        handleFilesSelected(files, 'auto');
        showToast(`Вставлено файлов из буфера: ${files.length}`);
      }
    });

    let dragDepth = 0;
    const dropOv = $('dropOverlay');
    window.addEventListener('dragenter', e => {
      if (e.dataTransfer && Array.from(e.dataTransfer.types || []).includes('Files')) {
        e.preventDefault();
        dragDepth++;
        dropOv.classList.add('show');
      }
    });
    window.addEventListener('dragover', e => {
      if (e.dataTransfer && Array.from(e.dataTransfer.types || []).includes('Files')) e.preventDefault();
    });
    window.addEventListener('dragleave', () => {
      dragDepth = Math.max(0, dragDepth - 1);
      if (dragDepth === 0) dropOv.classList.remove('show');
    });
    window.addEventListener('drop', e => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
        e.preventDefault();
        dragDepth = 0;
        dropOv.classList.remove('show');
        handleFilesSelected(e.dataTransfer.files, 'auto');
      }
    });

    $('btnInstallPwa').addEventListener('click', triggerPwaInstall);
    $('btnInstallPwaHeader').addEventListener('click', triggerPwaInstall);
    $('btnPwaBannerInstall').addEventListener('click', triggerPwaInstall);
    $('btnPwaBannerClose').addEventListener('click', () => { lsSet('foxai_pwa_dismissed', true); $('pwaInstallBanner').classList.remove('show'); });
    $('btnOpenSettings').addEventListener('click', () => { closeDrawer(); syncSettingsUi(); $('settingsSearch').value = ''; filterSettings('all', ''); openModal('settingsModal'); });

    // 8-Category Settings + Search
    $('settingsSearch').addEventListener('input', e => filterSettings('all', e.target.value));
    $('settingsRootList').addEventListener('click', e => {
      const row = e.target.closest('[data-scat]');
      if (row) { haptic(8); openSettingsCategory(row.dataset.scat, row.dataset.scatTitle); }
    });
    $('btnSettingsBack').addEventListener('click', () => { haptic(8); openSettingsRoot(); });
    $('swSetIncognito').addEventListener('click', () => {
      $('btnIncognito').click();
      setSwitch($('swSetIncognito'), state.incognito);
    });
    $('btnSetOpenArchive').addEventListener('click', () => {
      closeModal('settingsModal');
      state.folder = 'Архив';
      document.querySelectorAll('.folder-chip').forEach(c => c.classList.toggle('active', c.dataset.folder === 'Архив'));
      $('drawerFiltersPanel').classList.add('open');
      renderDrawerList();
      openDrawer();
    });
    $('btnSetManageChats').addEventListener('click', () => {
      closeModal('settingsModal');
      $('drawerFiltersPanel').classList.add('open');
      openDrawer();
    });
    
    $('swFoxCompanion').addEventListener('click', () => { haptic(8); state.settings.foxCompanion = state.settings.foxCompanion === false; applySettings(); });

    const selPop = $('selAskPop'); let lastSelectedQuote = '';
    const checkSelectionPop = () => {
      const sel = window.getSelection ? window.getSelection() : null, txt = sel ? sel.toString().trim() : '';
      if (!txt || txt.length < 4 || !sel.rangeCount) { selPop.classList.remove('show'); return; }
      const range = sel.getRangeAt(0), container = range.commonAncestorContainer.nodeType === 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
      if (!container || !container.closest('.msg-wrapper.assistant .md-body')) { selPop.classList.remove('show'); return; }
      const rect = range.getBoundingClientRect();
      if (!rect || (rect.width === 0 && rect.height === 0)) { selPop.classList.remove('show'); return; }
      lastSelectedQuote = txt.slice(0, 500);
      selPop.style.left = Math.max(96, Math.min(window.innerWidth - 96, rect.left + rect.width / 2)) + 'px';
      selPop.style.top = Math.max(58, rect.top - 8) + 'px';
      selPop.classList.add('show');
    };
    document.addEventListener('mouseup', () => setTimeout(checkSelectionPop, 20));
    document.addEventListener('touchend', () => setTimeout(checkSelectionPop, 60));
    elChatScroll.addEventListener('scroll', () => selPop.classList.remove('show'), { passive: true });
    $('btnSelAsk').addEventListener('click', () => { selPop.classList.remove('show'); if (lastSelectedQuote) { setQuote(lastSelectedQuote); elComposer.focus(); } window.getSelection()?.removeAllRanges(); });
    $('btnSelSimple').addEventListener('click', () => { selPop.classList.remove('show'); if (lastSelectedQuote) { setQuote(lastSelectedQuote); elComposer.value = 'Объясни этот фрагмент максимально просто и на примере:'; autoResizeComposer(); setSendButtonState(); elComposer.focus(); } window.getSelection()?.removeAllRanges(); });

    $('btnSetProjects').addEventListener('click', () => { closeModal('settingsModal'); renderProjectsList(); openModal('projectsModal'); });
    $('btnProjAddFiles').addEventListener('click', () => $('inputProjFiles').click());
    $('inputProjFiles').addEventListener('change', async e => {
      for (const f of Array.from(e.target.files || []).slice(0, 5 - projDraftFiles.length)) {
        try { projDraftFiles.push({ name: f.name, content: (await readAnyTextFile(f)).slice(0, 12000) }); } catch (err) { showToast('Ошибка файла: ' + f.name); }
      }
      $('projDraftFilesCount').textContent = 'Файлов: ' + projDraftFiles.length; e.target.value = '';
    });
    $('btnProjCreate').addEventListener('click', () => {
      const name = $('projNameInput').value.trim(); if (!name) { showToast('Введите название проекта'); return; }
      state.projects.unshift({ id: uid(), name, instructions: $('projInstrInput').value.trim(), files: projDraftFiles.slice(0, 5), ts: Date.now() });
      saveProjects(); projDraftFiles = []; $('projNameInput').value = ''; $('projInstrInput').value = ''; $('projDraftFilesCount').textContent = 'Файлов: 0';
      renderProjectsList(); showToast('Проект создан');
    });
    $('projectsList').addEventListener('click', e => {
      const u = e.target.closest('[data-proj-use]'); if (u) { getActiveChat().projectId = u.dataset.projUse; saveChats(true); renderHeader(); closeModal('projectsModal'); showToast('Проект подключён к чату'); return; }
      const n = e.target.closest('[data-proj-new]'); if (n) { closeModal('projectsModal'); startNewChat(); getActiveChat().projectId = n.dataset.projNew; saveChats(true); renderHeader(); showToast('Открыт новый чат в проекте'); return; }
      const d = e.target.closest('[data-proj-del]'); if (d) { state.projects = state.projects.filter(p => p.id !== d.dataset.projDel); state.chats.forEach(c => { if (c.projectId === d.dataset.projDel) delete c.projectId; }); saveProjects(); saveChats(true); renderProjectsList(); renderHeader(); showToast('Проект удалён'); }
    });
    $('projectActiveChip').addEventListener('click', () => { delete getActiveChat().projectId; saveChats(true); renderHeader(); showToast('Проект отвязан от чата'); });

    $('btnSetArtifacts').addEventListener('click', () => { closeModal('settingsModal'); artFilter = 'all'; document.querySelectorAll('#artFilterSeg [data-art-tab]').forEach(b => b.classList.toggle('active', b.dataset.artTab === 'all')); renderArtifactsGallery(); openModal('artifactsModal'); });
    $('artFilterSeg').addEventListener('click', e => { const b = e.target.closest('[data-art-tab]'); if (!b) return; artFilter = b.dataset.artTab; document.querySelectorAll('#artFilterSeg [data-art-tab]').forEach(x => x.classList.toggle('active', x.dataset.artTab === artFilter)); renderArtifactsGallery(); });
    $('artifactsList').addEventListener('click', e => {
      const ideBtn = e.target.closest('[data-art-ide]'); if (ideBtn) { const it = artifactsCache.find(x => x.id === ideBtn.dataset.artIde); if (it) { closeModal('artifactsModal'); openIde(it.code, it.lang, it.msgId); } return; }
      const jmp = e.target.closest('[data-art-jump]'); if (jmp) { const it = artifactsCache.find(x => x.id === jmp.dataset.artJump); if (it) { closeModal('artifactsModal'); state.incognito = false; state.activeChatId = it.chatId; renderAll(); } return; }
      const cp = e.target.closest('[data-art-copy]'); if (cp) { const it = artifactsCache.find(x => x.id === cp.dataset.artCopy); if (it) copyText(it.code); }
    });

    $('btnSetDeck').addEventListener('click', () => { closeModal('settingsModal'); deckFlipped = false; renderDeckModal(); openModal('deckModal'); });
    $('deckStudyArea').addEventListener('click', e => {
      if (e.target.closest('#sm2FlipZone') || e.target.closest('#btnSm2Reveal')) { deckFlipped = !deckFlipped; renderDeckModal(); return; }
      const r = e.target.closest('[data-sm2-rate]'); if (r && currentStudyCardId) { rateSm2Card(currentStudyCardId, Number(r.dataset.sm2Rate)); return; }
      const del = e.target.closest('[data-sm2-del]'); if (del) { state.flashDeck = state.flashDeck.filter(c => c.id !== del.dataset.sm2Del); deckFlipped = false; saveFlashDeck(); renderDeckModal(); }
    });
    $('btnDeckAddCard').addEventListener('click', () => {
      const f = $('deckNewFront').value.trim(), b = $('deckNewBack').value.trim();
      if (!f || !b) { showToast('Заполните вопрос и ответ'); return; }
      addCardsToSm2Deck([{ front: f, back: b }]); $('deckNewFront').value = ''; $('deckNewBack').value = ''; renderDeckModal();
    });

    const openDiffModal = () => { closeModal('settingsModal'); closeModal('attachModal'); openModal('diffFilesModal'); };
    $('btnSetFileDiff').addEventListener('click', openDiffModal);
    $('btnAttachDiff').addEventListener('click', openDiffModal);
    $('btnPickDiffA').addEventListener('click', () => $('inputDiffA').click());
    $('btnPickDiffB').addEventListener('click', () => $('inputDiffB').click());
    $('inputDiffA').addEventListener('change', async e => { const f = e.target.files[0]; if (!f) return; try { diffFileA = { name: f.name, text: await readAnyTextFile(f) }; $('btnPickDiffA').textContent = 'A: ' + f.name.slice(0, 18); renderFileDiff(); } catch (err) { showToast('Ошибка файла A'); } e.target.value = ''; });
    $('inputDiffB').addEventListener('change', async e => { const f = e.target.files[0]; if (!f) return; try { diffFileB = { name: f.name, text: await readAnyTextFile(f) }; $('btnPickDiffB').textContent = 'B: ' + f.name.slice(0, 18); renderFileDiff(); } catch (err) { showToast('Ошибка файла B'); } e.target.value = ''; });
    $('btnDiffSendAi').addEventListener('click', () => {
      if (!diffFileA || !diffFileB) return;
      closeModal('diffFilesModal');
      elComposer.value = `Сравни две версии файла («${diffFileA.name}» и «${diffFileB.name}») и разбери ключевые изменения:\n\n\`\`\`diff\n${(lastDiffSummary || 'Файлы идентичны').slice(0, 4500)}\n\`\`\``;
      autoResizeComposer(); setSendButtonState(); elComposer.focus(); showToast('Diff подготовлен — нажмите отправить');
    });

    $('btnSetOpenIde').addEventListener('click', () => {
      closeModal('settingsModal');
      openIde('<h1>Fox AI</h1>\n<p>Готово к работе</p>', 'html', null);
    });
    $('btnManualFullscreen').addEventListener('click', toggleManualFullscreen);
    $('setThemeSeg').addEventListener('click', e => { const b = e.target.closest('[data-set-theme]'); if (b) { haptic(8); applyTheme(b.dataset.setTheme); } });
    $('setFontFamilySeg').addEventListener('click', e => { const b = e.target.closest('[data-set-ff]'); if (b) { haptic(8); state.settings.fontFamily = b.dataset.setFf; applySettings(); } });
    $('setFontSeg').addEventListener('click', e => { const b = e.target.closest('[data-set-font]'); if (b) { haptic(8); state.settings.font = b.dataset.setFont; applySettings(); } });
    $('setRadiusSeg').addEventListener('click', e => { const b = e.target.closest('[data-set-radius]'); if (b) { haptic(8); state.settings.radius = b.dataset.setRadius; applySettings(); } });
    $('setDensitySeg').addEventListener('click', e => { const b = e.target.closest('[data-set-density]'); if (b) { haptic(8); state.settings.density = b.dataset.setDensity; applySettings(); } });
    $('setToneSeg').addEventListener('click', e => { const b = e.target.closest('[data-set-tone]'); if (b) { haptic(8); state.settings.tone = b.dataset.setTone; applySettings(); } });
    $('setTtsRateSeg').addEventListener('click', e => { const b = e.target.closest('[data-set-rate]'); if (b) { haptic(8); state.settings.ttsRate = Number(b.dataset.setRate); applySettings(); } });
    $('setVideoFramesSeg').addEventListener('click', e => { const b = e.target.closest('[data-set-vframes]'); if (b) { haptic(8); state.settings.videoFrames = Number(b.dataset.setVframes); applySettings(); } });
    $('setUserName').addEventListener('input', e => { state.settings.userName = e.target.value; applySettings(); });
    $('setCustomPrompt').addEventListener('input', e => { state.settings.customPrompt = e.target.value; applySettings(); });

    const bindSwitch = (id, key, rerender) => { $(id).addEventListener('click', () => { haptic(8); state.settings[key] = !state.settings[key]; applySettings(); if (rerender) renderMessages(); }); };
    bindSwitch('swFollowups', 'showFollowups', true);
    bindSwitch('swShowThink', 'showThink', true);
    bindSwitch('swCodeLines', 'codeLines', true);
    bindSwitch('swAutoMem', 'autoMemory', false);
    bindSwitch('swHaptic', 'haptic', false);
    bindSwitch('swAutoTts', 'autoTts', false);
    bindSwitch('swEnterSend', 'enterToSend', false);

    $('btnSetPrompts').addEventListener('click', () => { closeModal('settingsModal'); renderPromptsList(); openModal('promptsModal'); });
    $('btnSetBookmarks').addEventListener('click', () => { closeModal('settingsModal'); renderBookmarksList(); openModal('bookmarksModal'); });
    $('btnSetFilesLib').addEventListener('click', () => { closeModal('settingsModal'); $('filesLibSearch').value = ''; renderFilesLibrary(); openModal('filesLibModal'); });
    $('btnSetMemory').addEventListener('click', () => { closeModal('settingsModal'); renderMemoryList(); openModal('memoryModal'); });
    $('btnSetExport').addEventListener('click', () => { closeModal('settingsModal'); openModal('exportModal'); });
    $('btnSetClearAll').addEventListener('click', () => {
      closeModal('settingsModal');
      openDialog('Очистить всю историю?', '<p style="margin:0 0 8px;font-size:14px;color:var(--text-muted);">Все сохранённые чаты будут удалены.</p>', [
        { label: 'Отмена', cls: 'btn-secondary', onClick: () => closeModal('dialogModal') },
        { label: 'Очистить', cls: 'btn-primary', onClick: () => { state.chats = [createChatObj(false)]; state.activeChatId = state.chats[0].id; state.queue = []; saveChats(true); renderAll(); closeModal('dialogModal'); showToast('История очищена'); } }
      ]);
    });

    // Files Library events
    $('filesLibSearch').addEventListener('input', renderFilesLibrary);
    $('filesLibList').addEventListener('click', e => {
      const openBtn = e.target.closest('[data-flib-open]');
      if (openBtn) {
        const [cid, mid, aidx] = openBtn.dataset.flibOpen.split(':');
        const msg = state.chats.find(c => c.id === cid)?.messages.find(m => m.id === mid);
        const att = msg && getMsgVersion(msg).attachments?.[Number(aidx)];
        if (att) {
          closeModal('filesLibModal');
          if (att.kind === 'image') { const su = sanitizeImageDataUrl(att.dataUrl); if (su) { $('lightboxImg').src = su; $('lightbox').classList.add('open'); } }
          else openFileViewer(att.name, (att.metaNote ? `[${att.metaNote}]\n\n` : '') + (att.content || ''));
        }
        return;
      }
      const delBtn = e.target.closest('[data-flib-del]');
      if (delBtn) {
        const [cid, mid, aidx] = delBtn.dataset.flibDel.split(':');
        const msg = state.chats.find(c => c.id === cid)?.messages.find(m => m.id === mid);
        if (msg) { getMsgVersion(msg).attachments.splice(Number(aidx), 1); saveChats(true); renderFilesLibrary(); renderMessages(); showToast('Вложение удалено'); }
      }
    });

    $('bookmarksList').addEventListener('click', e => {
      const read = e.target.closest('[data-bm-read]'); if (read) { const b = state.bookmarks.find(x => x.id === read.dataset.bmRead); if (b) { closeModal('bookmarksModal'); openReaderMode(b.text); } return; }
      const cp = e.target.closest('[data-bm-copy]'); if (cp) { const b = state.bookmarks.find(x => x.id === cp.dataset.bmCopy); if (b) copyText(b.text); return; }
      const dl = e.target.closest('[data-bm-del]'); if (dl) { state.bookmarks = state.bookmarks.filter(x => x.id !== dl.dataset.bmDel); saveBookmarks(); renderBookmarksList(); renderMessages(); }
    });

    $('btnAddPrompt').addEventListener('click', () => {
      let cmd = $('newPromptCmd').value.trim(); const txt = $('newPromptText').value.trim();
      if (!cmd || !txt) { showToast('Заполните команду и текст'); return; }
      if (!cmd.startsWith('/')) cmd = '/' + cmd;
      state.prompts.unshift({ id: uid(), cmd, text: txt }); savePrompts();
      $('newPromptCmd').value = ''; $('newPromptText').value = ''; renderPromptsList(); showToast('Команда добавлена');
    });
    $('promptsList').addEventListener('click', e => { const dl = e.target.closest('[data-del-prompt]'); if (!dl) return; state.prompts = state.prompts.filter(p => p.id !== dl.dataset.delPrompt); savePrompts(); renderPromptsList(); });
    elSlashMenu.addEventListener('click', e => { const item = e.target.closest('[data-use-prompt]'); if (!item) return; const p = state.prompts.find(x => x.id === item.dataset.usePrompt); if (p) { elComposer.value = p.text; elSlashMenu.classList.remove('open'); autoResizeComposer(); setSendButtonState(); elComposer.focus(); } });

    $('btnCalcCopy').addEventListener('click', () => { if (state.calcVal) copyText(state.calcVal); });
    $('btnCalcInsert').addEventListener('click', () => { if (state.calcVal) { elComposer.value = state.calcVal; elCalcBar.classList.remove('show'); autoResizeComposer(); elComposer.focus(); } });
    $('btnClearQueue').addEventListener('click', () => { state.queue = []; renderQueue(); showToast('Очередь очищена'); });

    $('btnMemAccept').addEventListener('click', () => { if (state.suggestedMemory) addMemoryFact(state.suggestedMemory); state.suggestedMemory = null; elMemSuggestBar.classList.remove('show'); });
    $('btnMemDismiss').addEventListener('click', () => { state.suggestedMemory = null; elMemSuggestBar.classList.remove('show'); });
    $('btnAddMemory').addEventListener('click', () => { const inp = $('newMemoryInput'); if (inp.value.trim()) { addMemoryFact(inp.value.trim()); inp.value = ''; } });
    $('memoryList').addEventListener('click', e => { const del = e.target.closest('[data-del-mem]'); if (!del) return; state.memory = state.memory.filter(m => m.id !== del.dataset.delMem); saveMemory(); renderMemoryList(); });

    $('btnExportPdf').addEventListener('click', exportChatPdfPrint);
    $('btnExportHtml').addEventListener('click', exportChatHtmlReport);
    $('btnExportMd').addEventListener('click', () => exportCurrentChat('md'));
    $('btnExportTxt').addEventListener('click', () => exportCurrentChat('txt'));
    $('btnBackupJson').addEventListener('click', () => exportBackupJson(null));
    $('btnExportSelected').addEventListener('click', openExportSelectedDialog);
    $('btnRestoreJson').addEventListener('click', () => $('inputBackup').click());
    $('inputBackup').addEventListener('change', e => { if (e.target.files[0]) restoreBackupJson(e.target.files[0]); e.target.value = ''; });

    elComposer.addEventListener('input', () => { autoResizeComposer(); setSendButtonState(); updateSlashMenu(); updateLocalCalc(); saveCurrentDraft(); if (foxState && elComposer.value.trim()) { if (foxState.mode === 'sleep') { foxState.mode = 'sit'; foxState.modeTimer = 0; foxState.modeDuration = 2.0; $('foxActor')?.classList.remove('is-sleeping'); } foxState.dir = foxState.x > 110 ? -1 : 1; } });
    elComposer.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && (state.settings.enterToSend || window.innerWidth > 768)) { e.preventDefault(); handleSendAction(); } });
    elBtnSend.addEventListener('click', handleSendAction);
    $('btnQuoteClose').addEventListener('click', clearQuote);
    $('btnModeFast').addEventListener('click', () => { haptic(8); setMode('fast'); });
    $('btnModeDeep').addEventListener('click', () => { haptic(8); setMode('deep'); });

    $('btnAttach').addEventListener('click', () => openModal('attachModal'));
    $('pickPhoto').addEventListener('click', () => $('inputPhoto').click());
    $('pickCamera').addEventListener('click', () => $('inputCamera').click());
    $('pickVideo').addEventListener('click', () => $('inputVideo').click());
    $('pickPdf').addEventListener('click', () => $('inputPdf').click());
    $('pickCode').addEventListener('click', () => $('inputCode').click());
    $('pickAnyFile').addEventListener('click', () => $('inputCode').click());
    $('inputPhoto').addEventListener('change', e => { handleFilesSelected(e.target.files, 'image'); e.target.value = ''; });
    $('inputCamera').addEventListener('change', e => { handleFilesSelected(e.target.files, 'image'); e.target.value = ''; });
    $('inputVideo').addEventListener('change', e => { handleFilesSelected(e.target.files, 'video'); e.target.value = ''; });
    $('inputPdf').addEventListener('change', e => { handleFilesSelected(e.target.files, 'pdf'); e.target.value = ''; });
    $('inputCode').addEventListener('change', e => { handleFilesSelected(e.target.files, 'text'); e.target.value = ''; });

    elAttPreview.addEventListener('click', e => {
      const rm = e.target.closest('[data-rm-att]'); if (rm) { state.pendingAttachments.splice(Number(rm.dataset.rmAtt), 1); renderAttachments(); setSendButtonState(); return; }
      const editPhoto = e.target.closest('[data-edit-photo]'); if (editPhoto) { openPhotoEditor(Number(editPhoto.dataset.editPhoto)); return; }
      const vp = e.target.closest('[data-view-pending]'); if (vp) { const a = state.pendingAttachments[Number(vp.dataset.viewPending)]; if (a) openFileViewer(a.name, (a.metaNote ? `[${a.metaNote}]\n\n` : '') + (a.content || '')); }
    });

    $('fileViewerSearch').addEventListener('input', renderFileViewerHighlighted);
    $('btnPhotoRotL').addEventListener('click', () => { state.photoEdit.rot -= 90; renderPhotoEditorCanvas(); });
    $('btnPhotoRotR').addEventListener('click', () => { state.photoEdit.rot += 90; renderPhotoEditorCanvas(); });
    $('photoCropSeg').addEventListener('click', e => { const b = e.target.closest('[data-crop]'); if (!b) return; state.photoEdit.crop = b.dataset.crop; $('photoCropSeg').querySelectorAll('[data-crop]').forEach(x => x.classList.toggle('active', x === b)); renderPhotoEditorCanvas(); });
    $('photoQualSeg').addEventListener('click', e => { const b = e.target.closest('[data-qual]'); if (!b) return; state.photoEdit.qual = Number(b.dataset.qual); $('photoQualSeg').querySelectorAll('[data-qual]').forEach(x => x.classList.toggle('active', x === b)); renderPhotoEditorCanvas(); });
    $('btnPhotoApply').addEventListener('click', () => { const pe = state.photoEdit; if (pe.idx >= 0 && state.pendingAttachments[pe.idx] && pe.resultDataUrl) { state.pendingAttachments[pe.idx].dataUrl = pe.resultDataUrl; renderAttachments(); showToast('Фото обновлено'); } closeModal('photoEditorModal'); });

    elQueueList.addEventListener('click', e => {
      const retry = e.target.closest('[data-retry-queue]');
      if (retry) {
        const idx = Number(retry.dataset.retryQueue);
        if (state.queue[idx]) { state.queue[idx].status = 'Ожидает'; renderQueue(); if (!state.isStreaming) processNextQueueItem(); }
        return;
      }
      const rm = e.target.closest('[data-rm-queue]');
      if (rm) { state.queue.splice(Number(rm.dataset.rmQueue), 1); renderQueue(); }
    });

    // Delegated clicks inside chat container
    elChatContainer.addEventListener('click', e => {
      if (e.target.id === 'btnLoadOlder') { state.visibleWindowCount += MSG_WINDOW_STEP; renderMessages(false); return; }
      const quick = e.target.closest('[data-quick]'); if (quick) { elComposer.value = quick.dataset.quick; autoResizeComposer(); handleSendAction(); return; }
      const followup = e.target.closest('[data-followup]'); if (followup) { elComposer.value = followup.dataset.followup; autoResizeComposer(); handleSendAction(); return; }
      const thinkToggle = e.target.closest('[data-toggle-think]'); if (thinkToggle) { const box = elChatContainer.querySelector(`[data-think-box="${thinkToggle.dataset.toggleThink}"]`); if (box) box.classList.toggle('expanded'); return; }
      const lbRef = e.target.closest('[data-lightbox-ref]');
      if (lbRef) {
        const [mid, aIdx] = lbRef.dataset.lightboxRef.split(':');
        const msg = findMsg(mid);
        const att = msg && getMsgVersion(msg).attachments && getMsgVersion(msg).attachments[Number(aIdx)];
        const safeUrl = att ? sanitizeImageDataUrl(att.dataUrl) : '';
        if (safeUrl) { $('lightboxImg').src = safeUrl; $('lightbox').classList.add('open'); }
        return;
      }
      const lb = e.target.closest('[data-lightbox]'); if (lb) { const safeUrl = sanitizeImageDataUrl(lb.dataset.lightbox); if (safeUrl) { $('lightboxImg').src = safeUrl; $('lightbox').classList.add('open'); } return; }

      const vizTip = e.target.closest('[data-viz-tip]');
      if (vizTip) { const card = vizTip.closest('[data-chart-card]'); const tipEl = card && $('chartTip_' + card.dataset.chartCard); if (tipEl) { tipEl.textContent = vizTip.dataset.vizTip; tipEl.classList.add('show'); haptic(6); } return; }
      const chType = e.target.closest('[data-chart-type]');
      if (chType) { const [chId, type] = chType.dataset.chartType.split(':'), entry = chartStore.get(chId), body = $('chartBody_' + chId); if (entry && body) { entry.type = type; body.innerHTML = renderChartSvg(entry.cfg, entry.type, entry.sorted); $('chartTabs_' + chId)?.querySelectorAll('.viz-pill').forEach(b => b.classList.toggle('active', b === chType)); haptic(6); } return; }
      const chSort = e.target.closest('[data-chart-sort]');
      if (chSort) { const chId = chSort.dataset.chartSort, entry = chartStore.get(chId), body = $('chartBody_' + chId); if (entry && body) { entry.sorted = !entry.sorted; body.innerHTML = renderChartSvg(entry.cfg, entry.type, entry.sorted); showToast(entry.sorted ? 'По убыванию' : 'Исходный порядок'); } return; }
      const dlPng = e.target.closest('[data-dl-chart-png]'); if (dlPng) { exportChartPng(dlPng.dataset.dlChartPng); return; }
      const dlCh = e.target.closest('[data-dl-chart]'); if (dlCh) { const body = $('chartBody_' + dlCh.dataset.dlChart); if (body) { downloadFile('fox-ai-chart.svg', body.innerHTML, 'image/svg+xml;charset=utf-8'); showToast('График сохранён (.svg)'); } return; }
      const dlCsv = e.target.closest('[data-dl-csv]'); if (dlCsv) { const csv = tableStore.get(dlCsv.dataset.dlCsv); if (csv) { downloadFile('fox-ai-table.csv', '\uFEFF' + csv, 'text/csv;charset=utf-8'); showToast('Таблица сохранена (.csv)'); } return; }

      const fcFlip = e.target.closest('[data-fc-flip]');
      if (fcFlip) { const id = fcFlip.dataset.fcFlip, st = cardStore.get(id); if (st) { st.flipped = !st.flipped; const cur = st.cards[st.idx]; $('fcSide_' + id).textContent = st.flipped ? 'Ответ · нажмите, чтобы вернуть' : 'Вопрос · нажмите, чтобы перевернуть'; $('fcTxt_' + id).textContent = st.flipped ? (cur.back || '') : (cur.front || ''); haptic(6); } return; }
      const fcNav = e.target.closest('[data-fc-nav]');
      if (fcNav) { const [id, d] = fcNav.dataset.fcNav.split(':'), st = cardStore.get(id); if (st) { st.idx = (st.idx + Number(d) + st.cards.length) % st.cards.length; st.flipped = false; $('fcSide_' + id).textContent = 'Вопрос · нажмите, чтобы перевернуть'; $('fcTxt_' + id).textContent = st.cards[st.idx].front || ''; $('fcMeta_' + id).textContent = `${st.idx + 1} / ${st.cards.length} · Знаю ${st.known.size}`; } return; }
      const fcMark = e.target.closest('[data-fc-mark]');
      if (fcMark) { const [id, ok] = fcMark.dataset.fcMark.split(':'), st = cardStore.get(id); if (st) { if (ok === '1') st.known.add(st.idx); else st.known.delete(st.idx); st.idx = (st.idx + 1) % st.cards.length; st.flipped = false; $('fcSide_' + id).textContent = 'Вопрос · нажмите, чтобы перевернуть'; $('fcTxt_' + id).textContent = st.cards[st.idx].front || ''; $('fcMeta_' + id).textContent = `${st.idx + 1} / ${st.cards.length} · Знаю ${st.known.size}`; haptic(10); } return; }

      const thSort = e.target.closest('th[data-sort-col]');
      if (thSort) {
        const col = Number(thSort.dataset.sortCol), tbl = thSort.closest('table'), tbody = tbl?.querySelector('tbody');
        if (tbody) {
          const dir = thSort.dataset.dir === 'asc' ? 'desc' : 'asc';
          tbl.querySelectorAll('th').forEach(th => { th.dataset.dir = ''; const sp = th.querySelector('.sort-ind'); if (sp) sp.textContent = ''; });
          thSort.dataset.dir = dir; const sp = thSort.querySelector('.sort-ind'); if (sp) sp.textContent = dir === 'asc' ? '↑' : '↓';
          const rows = Array.from(tbody.querySelectorAll('tr'));
          rows.sort((a, b) => {
            const av = (a.children[col]?.textContent || '').trim(), bv = (b.children[col]?.textContent || '').trim();
            const an = parseFloat(av.replace(/[^\d.-]/g, '')), bn = parseFloat(bv.replace(/[^\d.-]/g, ''));
            const cmp = (!isNaN(an) && !isNaN(bn)) ? (an - bn) : av.localeCompare(bv, 'ru');
            return dir === 'asc' ? cmp : -cmp;
          });
          rows.forEach(r => tbody.appendChild(r)); haptic(6);
        }
        return;
      }

      const taskEl = e.target.closest('[data-toggle-task]');
      if (taskEl) {
        const [mid, tidxStr] = taskEl.dataset.toggleTask.split(':'), targetIdx = Number(tidxStr);
        const msg = getActiveChat().messages.find(m => safeId(m.id) === mid);
        if (msg) {
          const ver = getMsgVersion(msg); let seen = 0;
          ver.text = (ver.text || '').replace(/^([-*]\s+\[)([ xX])(\]\s+)/gm, (full, p1, ch, p3) => seen++ === targetIdx ? (p1 + (ch.toLowerCase() === 'x' ? ' ' : 'x') + p3) : full);
          saveChats(true); renderMessages(); haptic(8);
        }
        return;
      }

      const qOpt = e.target.closest('[data-qopt]');
      if (qOpt) {
        const [qid, qi, oi] = qOpt.dataset.qopt.split(':'), qBox = elChatContainer.querySelector(`[data-qitem="${qid}:${qi}"]`);
        if (!qBox || qBox.dataset.answered) return;
        qBox.dataset.answered = '1';
        const correctIdx = Number(qBox.dataset.ans), chosen = Number(oi);
        qBox.querySelectorAll('.quiz-opt').forEach((b, idx) => { if (idx === correctIdx) b.classList.add('correct'); else if (idx === chosen) b.classList.add('wrong'); });
        const exp = $(`qexp_${qid}_${qi}`); if (exp) exp.classList.add('show');
        const card = elChatContainer.querySelector(`[data-quiz="${qid}"]`);
        if (card) {
          const totalQ = card.querySelectorAll('[data-qitem]').length; let score = 0;
          card.querySelectorAll('[data-qitem]').forEach(qb => { if (qb.dataset.answered && !qb.querySelector('.quiz-opt.wrong')) score++; });
          const scEl = $('qscore_' + qid); if (scEl) scEl.textContent = `${score} / ${totalQ}`;
        }
        haptic(chosen === correctIdx ? 14 : 6); return;
      }

      const runBundle = e.target.closest('[data-run-bundle]');
      if (runBundle) {
        const mid = safeId(runBundle.dataset.runBundle), blocks = Array.from(codeStore.values()).filter(c => c.msgId === mid);
        openMiniIde('', 'html', null, {
          html: blocks.filter(c => c.lang === 'html' || c.lang === 'htm').map(c => c.code).join('\n'),
          css: blocks.filter(c => c.lang === 'css').map(c => c.code).join('\n'),
          js: blocks.filter(c => c.lang === 'js' || c.lang === 'javascript').map(c => c.code).join('\n')
        });
        return;
      }

      const saveDeckBtn = e.target.closest('[data-save-deck]'); if (saveDeckBtn) { const fc = cardStore.get(saveDeckBtn.dataset.saveDeck); if (fc && fc.cards) addCardsToSm2Deck(fc.cards); return; }
      const expLong = e.target.closest('[data-expand-long]'); if (expLong) { const cw = $('cw_' + expLong.dataset.expandLong); if (cw) { const nowCollapsed = cw.classList.toggle('long-collapsed'); expLong.textContent = nowCollapsed ? 'Развернуть полностью' : 'Свернуть код'; } return; }
      const foldCode = e.target.closest('[data-fold-code]'); if (foldCode) { $('cw_' + foldCode.dataset.foldCode)?.classList.toggle('collapsed'); return; }
      const vf = e.target.closest('[data-view-file]');
      if (vf) { const [mid, aidx] = vf.dataset.viewFile.split(':'), msg = getActiveChat().messages.find(m => m.id === mid), att = msg && getMsgVersion(msg).attachments?.[Number(aidx)]; if (att) openFileViewer(att.name, (att.metaNote ? `[${att.metaNote}]\n\n` : '') + (att.content || '')); return; }

      const copyCodeBtn = e.target.closest('[data-copy-code]'); if (copyCodeBtn) { const item = codeStore.get(copyCodeBtn.dataset.copyCode); if (item) copyText(item.code, copyCodeBtn); return; }
      const dlCodeBtn = e.target.closest('[data-dl-code]'); if (dlCodeBtn) { const item = codeStore.get(dlCodeBtn.dataset.dlCode); if (item) { const extMap = { javascript:'js', typescript:'ts', python:'py', html:'html', css:'css', svg:'svg', mermaid:'mmd', json:'json', sql:'sql', diff:'diff', kotlin:'kt' }; downloadFile('fox-ai-code.' + (extMap[item.lang] || item.lang || 'txt'), item.code); showToast('Код скачан'); } return; }
      const expandCodeBtn = e.target.closest('[data-expand-code]'); if (expandCodeBtn) { const item = codeStore.get(expandCodeBtn.dataset.expandCode); if (item) openFileViewer(item.lang.toUpperCase() + ' · Код', item.code); return; }
      const wrapBtn = e.target.closest('[data-wrap-code]'); if (wrapBtn) { $('pre_' + wrapBtn.dataset.wrapCode)?.classList.toggle('wrap'); return; }
      const ideBtn = e.target.closest('[data-open-ide]'); if (ideBtn) { const item = codeStore.get(ideBtn.dataset.openIde); if (item) openMiniIde(item.code, item.lang, item.msgId); return; }

      const chat = getActiveChat(), findMsg = id => chat.messages.find(m => m.id === id);
      const ctxMsg = e.target.closest('[data-ctx-msg]'); if (ctxMsg) { openContextSheet(ctxMsg.dataset.ctxMsg); return; }
      const copyMsg = e.target.closest('[data-copy-msg]'); if (copyMsg) { const m = findMsg(copyMsg.dataset.copyMsg); if (m) copyText(parseThinkText(getMsgVersion(m).text, '').visible || getMsgVersion(m).text, copyMsg); return; }
      const quoteMsg = e.target.closest('[data-quote-msg]'); if (quoteMsg) { const m = findMsg(quoteMsg.dataset.quoteMsg); if (m) setQuote(parseThinkText(getMsgVersion(m).text, '').visible || getMsgVersion(m).text); return; }
      const editMsg = e.target.closest('[data-edit-msg]'); if (editMsg) { editUserMessage(editMsg.dataset.editMsg); return; }
      const regenMsg = e.target.closest('[data-regen-msg]'); if (regenMsg) { regenerateAssistantMessage(regenMsg.dataset.regenMsg); return; }
      const contMsg = e.target.closest('[data-continue-msg]'); if (contMsg) { continueAssistantMessage(contMsg.dataset.continueMsg); return; }
      const ttsMsg = e.target.closest('[data-tts-msg]'); if (ttsMsg) { const m = findMsg(ttsMsg.dataset.ttsMsg); if (m) toggleTts(m.id, parseThinkText(getMsgVersion(m).text, '').visible); return; }
      const bmMsg = e.target.closest('[data-bm-msg]'); if (bmMsg) { const m = findMsg(bmMsg.dataset.bmMsg); if (m) toggleBookmark(m); return; }
      const readMsg = e.target.closest('[data-read-msg]'); if (readMsg) { const m = findMsg(readMsg.dataset.readMsg); if (m) openReaderMode(parseThinkText(getMsgVersion(m).text, '').visible || getMsgVersion(m).text); return; }
      const shareMsg = e.target.closest('[data-share-msg]'); if (shareMsg) { const m = findMsg(shareMsg.dataset.shareMsg); if (m) shareTextNative(parseThinkText(getMsgVersion(m).text, '').visible || getMsgVersion(m).text); return; }
      const diffMsg = e.target.closest('[data-diff-msg]'); if (diffMsg) { const m = findMsg(diffMsg.dataset.diffMsg); if (m) openBranchDiff(m); return; }
      const bPrev = e.target.closest('[data-branch-prev]'); if (bPrev) { const m = findMsg(bPrev.dataset.branchPrev); if (m && m.activeVersion > 0) { m.activeVersion--; saveChats(true); renderMessages(); } return; }
      const bNext = e.target.closest('[data-branch-next]'); if (bNext) { const m = findMsg(bNext.dataset.branchNext); if (m && m.activeVersion < m.versions.length - 1) { m.activeVersion++; saveChats(true); renderMessages(); } return; }
    });

    $('btnReaderClose').addEventListener('click', () => $('readerModal').classList.remove('open'));
    $('btnReaderDec').addEventListener('click', () => { state.readerFontSize = Math.max(12, state.readerFontSize - 2); $('readerBody').style.fontSize = state.readerFontSize + 'px'; });
    $('btnReaderInc').addEventListener('click', () => { state.readerFontSize = Math.min(26, state.readerFontSize + 2); $('readerBody').style.fontSize = state.readerFontSize + 'px'; });
    $('btnReaderCopy').addEventListener('click', () => copyText(state.readerRawText));

    // Mini-IDE 2.0 events
    $('btnIdeClose').addEventListener('click', () => $('ideModal').classList.remove('open'));
    document.querySelectorAll('[data-ide-tab]').forEach(btn => btn.addEventListener('click', () => switchIdeTab(btn.dataset.ideTab)));
    $('ideFileTabs').addEventListener('click', e => { const b = e.target.closest('[data-ide-file]'); if (b) selectIdeFile(b.dataset.ideFile); });
    $('ideEditor').addEventListener('input', () => { state.ide[state.ide.activeFile] = $('ideEditor').value; clearTimeout(ideAutoTimer); ideAutoTimer = setTimeout(runIdePreview, 420); });
    $('btnIdeMobile').addEventListener('click', () => { $('ideIframe').classList.add('mobile-mode'); $('btnIdeMobile').classList.add('primary'); $('btnIdeDesktop').classList.remove('primary'); });
    $('btnIdeDesktop').addEventListener('click', () => { $('ideIframe').classList.remove('mobile-mode'); $('btnIdeDesktop').classList.add('primary'); $('btnIdeMobile').classList.remove('primary'); });
    $('btnIdeBgToggle').addEventListener('click', () => { state.ide.darkBg = !state.ide.darkBg; $('idePreviewStage').classList.toggle('dark-stage', state.ide.darkBg); $('ideIframe').classList.toggle('dark-frame', state.ide.darkBg); $('btnIdeBgToggle').textContent = state.ide.darkBg ? 'Фон: Тёмный' : 'Фон: Светлый'; runIdePreview(); });
    $('btnIdeReload').addEventListener('click', runIdePreview);
    $('btnIdeCopy').addEventListener('click', () => copyText($('ideEditor').value));
    $('btnIdeReset').addEventListener('click', () => { state.ide.html = state.ide.origHtml; state.ide.css = state.ide.origCss; state.ide.js = state.ide.origJs; $('ideEditor').value = state.ide[state.ide.activeFile]; runIdePreview(); showToast('Исходный код восстановлен'); });
    $('btnIdeClearConsole').addEventListener('click', () => { state.ide.logs = []; renderIdeConsole(); });
    $('btnIdeSaveToChat').addEventListener('click', () => {
      const combined = buildIdeCombinedHtml(), msg = getActiveChat().messages.find(m => safeId(m.id) === state.ide.msgId);
      if (msg && state.ide.originalBlock) {
        const ver = getMsgVersion(msg);
        if (ver.text && ver.text.includes(state.ide.originalBlock)) {
          ver.text = ver.text.replace(state.ide.originalBlock, combined);
          state.ide.originalBlock = combined;
          saveChats(true); renderMessages();
          showToast('Правки сохранены в сообщение');
          return;
        }
      }
      if (msg) {
        openDialog('Обновить код в чате', '<p style="margin:0 0 8px;font-size:13.5px;color:var(--text-muted);line-height:1.5;">Исходный фрагмент кода изменился и не совпал точно. Вы можете добавить обновлённый HTML новой версией в эту же ветку сообщения или скопировать его в буфер обмена.</p>', [
          { label: 'Скопировать HTML', cls: 'btn-secondary', onClick: () => { copyText(combined); closeModal('dialogModal'); showToast('HTML скопирован в буфер обмена'); } },
          { label: 'Добавить новой версией', cls: 'btn-primary', onClick: () => {
            const fenced = '```html\n' + combined + '\n```';
            msg.versions.push({ text: fenced, think: '', attachments: [], quote: null, ts: Date.now(), isError: false, statusText: 'Обновлено из Мини-IDE' });
            msg.activeVersion = msg.versions.length - 1;
            state.ide.originalBlock = combined;
            saveChats(true); renderMessages();
            closeModal('dialogModal');
            showToast('Код добавлен новой версией в сообщение');
          } }
        ]);
        return;
      }
      copyText(combined);
      showToast('Исходное сообщение не найдено — HTML скопирован в буфер');
    });
    $('btnIdeDownload').addEventListener('click', () => { downloadFile('fox-ai-project.html', buildIdeCombinedHtml(), 'text/html;charset=utf-8'); showToast('Проект скачан (.html)'); });

    document.querySelectorAll('[data-close-modal]').forEach(b => b.addEventListener('click', () => closeModal(b.dataset.closeModal)));
    document.querySelectorAll('.modal-backdrop').forEach(bd => bd.addEventListener('click', e => { if (e.target === bd) bd.classList.remove('open'); }));
    $('lightbox').addEventListener('click', () => $('lightbox').classList.remove('open'));
  }

  function setMode(mode) {
    state.mode = mode;
    $('btnModeFast').classList.toggle('active', mode === 'fast');
    $('btnModeDeep').classList.toggle('active', mode === 'deep');
    const chip = $('modeActiveChip');
    if (chip) chip.classList.toggle('show', mode === 'deep');
  }
  function startNewChat() {
    saveCurrentDraft();
    if (state.isStreaming && state.abortController) state.abortController.abort();
    state.visibleWindowCount = MSG_WINDOW_STEP;
    if (state.incognito) state.incognitoChat = createChatObj(true);
    else { const chat = createChatObj(false); state.chats.unshift(chat); state.activeChatId = chat.id; saveChats(true); }
    state.pendingAttachments = []; clearQuote(); renderAll(); restoreCurrentDraft();
  }


  /* ==================== YANDEX ID SERVER AUTH (v7.0, HTTPONLY COOKIE + CSRF) ==================== */
  window.__foxAuthUser = null;

  function getYandexAuth() {
    return window.__foxAuthUser ? { user: window.__foxAuthUser } : null;
  }

  function renderAvatarInto(el, name, avatarUrl) {
    if (!el) return;
    const initial = ((name || 'П').trim().charAt(0) || 'П').toUpperCase();
    el.innerHTML = '';
    if (avatarUrl && /^https:\/\//.test(avatarUrl)) {
      const img = document.createElement('img');
      img.src = avatarUrl;
      img.alt = name || 'Аватар';
      img.referrerPolicy = 'no-referrer';
      img.onerror = () => { el.textContent = initial; };
      el.appendChild(img);
    } else {
      el.textContent = initial;
    }
  }

  function setAuthGateStatus(msg, isError) {
    const st = $('authGateStatus');
    if (!st) return;
    st.textContent = msg || '';
    st.classList.toggle('error', !!isError);
  }

  function showAuthGate(msg, isError) {
    const gate = $('authGate');
    if (gate) gate.classList.remove('hidden');
    const btn = $('btnYandexLogin');
    if (btn) btn.disabled = false;
    const txt = $('btnYandexLoginText');
    if (txt) txt.textContent = 'Войти с Яндекс ID';
    setAuthGateStatus(msg || '', !!isError);
  }

  function hideAuthGate() {
    const gate = $('authGate');
    if (gate) gate.classList.add('hidden');
  }

  function syncYandexAuthUi() {
    const u = window.__foxAuthUser;
    const card = $('yaAccountCard');
    if (!u) {
      if (card) card.classList.add('hidden');
      return;
    }
    const displayName = (state.settings.userName && state.settings.userName.trim()) ? state.settings.userName.trim() : (u.displayName || 'Пользователь');
    if ($('profileName')) $('profileName').textContent = displayName;
    renderAvatarInto($('profileAvatar'), displayName, u.avatarUrl);
    if (card) {
      card.classList.remove('hidden');
      if ($('yaAccountName')) $('yaAccountName').textContent = u.displayName || displayName;
      if ($('yaAccountSub')) $('yaAccountSub').textContent = u.email || (u.login ? '@' + u.login : 'Яндекс ID');
      renderAvatarInto($('yaAccountAvatar'), u.displayName || displayName, u.avatarUrl);
    }
  }

  function bindYandexAuthEvents() {
    const btnLogin = $('btnYandexLogin');
    if (btnLogin && !btnLogin.dataset.boundYa) {
      btnLogin.dataset.boundYa = '1';
      btnLogin.addEventListener('click', () => {
        btnLogin.disabled = true;
        const txt = $('btnYandexLoginText');
        if (txt) txt.textContent = 'Переход в Яндекс ID…';
        setAuthGateStatus('', false);
        window.location.assign('/api/auth/login');
      });
    }
    const btnLogout = $('btnYandexLogout');
    if (btnLogout && !btnLogout.dataset.boundYa) {
      btnLogout.dataset.boundYa = '1';
      btnLogout.addEventListener('click', () => {
        openDialog(
          'Выйти из Яндекс ID?',
          '<p style="font-size:13.5px;color:var(--text-muted);line-height:1.5;margin:0;">Сессия на сервере будет закрыта, и вы вернётесь на экран входа. Локальные чаты останутся на устройстве.</p>',
          [
            { label: 'Отмена', cls: 'btn-secondary', onClick: () => closeModal('dialogModal') },
            { label: 'Выйти', cls: 'btn-danger', onClick: async () => {
              closeModal('dialogModal');
              closeModal('settingsModal');
              closeDrawer();
              try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' }); } catch {}
              window.__foxAuthUser = null;
              syncYandexAuthUi();
              showAuthGate('Вы вышли из аккаунта', false);
            } }
          ]
        );
      });
    }
  }

  async function initYandexAuth() {
    bindYandexAuthEvents();
    const params = new URLSearchParams(window.location.search || '');
    const authErr = params.get('auth_error');
    if (authErr) {
      try { window.history.replaceState(null, '', window.location.pathname); } catch {}
      const errMap = {
        access_denied: 'Вход отменён. Нажмите кнопку выше, чтобы войти через Яндекс ID.',
        invalid_state: 'Проверка безопасности не пройдена. Попробуйте войти снова.',
        server_config: 'На сервере не завершена настройка ключей Яндекс ID.'
      };
      showAuthGate(errMap[authErr] || ('Ошибка входа Яндекс ID: ' + authErr), true);
      return false;
    }

    try {
      const res = await fetch('/api/auth/me', { method: 'GET', credentials: 'same-origin', cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.authenticated && data.user) {
          window.__foxAuthUser = data.user;
          if (data.quota && Number.isFinite(data.quota.used)) {
            state.quota.count = Math.min(DAILY_LIMIT, data.quota.used);
            lsSet(LS_KEYS.QUOTA, state.quota);
            syncQuota();
          }
          syncYandexAuthUi();
          hideAuthGate();
          return true;
        }
      }
    } catch {}

    window.__foxAuthUser = null;
    syncYandexAuthUi();
    showAuthGate('', false);
    return false;
  }

  /* ==================== CONSOLE & DEVTOOLS PROTECTION (v6.3) ==================== */
  (function initConsoleGuard() {
    if (window.__foxConsoleGuard) return;
    window.__foxConsoleGuard = true;
    // Block DevTools & View-Source keyboard shortcuts (keep Ctrl+C/V/A/Z working)
    document.addEventListener('keydown', function(e) {
      const k = (e.key || '').toLowerCase();
      const code = e.code || '';
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;
      const alt = e.altKey;
      const isF12 = k === 'f12' || code === 'F12' || e.keyCode === 123;
      const isInspect = (ctrl && shift && (k === 'i' || k === 'j' || k === 'c' || k === 'k' || k === 'e' || code === 'KeyI' || code === 'KeyJ' || code === 'KeyC' || code === 'KeyK'))
        || (e.metaKey && alt && (k === 'i' || k === 'j' || k === 'c' || k === 'u' || code === 'KeyI' || code === 'KeyJ' || code === 'KeyC' || code === 'KeyU'));
      const isViewSource = ctrl && !shift && !alt && (k === 'u' || code === 'KeyU');
      if (isF12 || isInspect || isViewSource) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);

    // Block browser context menu everywhere except editable inputs (message bubbles already use custom sheet)
    document.addEventListener('contextmenu', function(e) {
      const t = e.target;
      if (t && (t.closest('textarea, input, [contenteditable="true"]') || t.closest('.msg-wrapper'))) return;
      e.preventDefault();
    }, true);

    // Silence browser console output in production
    try {
      const noop = function() {};
      if (window.console) {
        ['log', 'info', 'warn', 'error', 'debug', 'trace', 'dir', 'dirxml', 'table', 'group', 'groupCollapsed', 'groupEnd'].forEach(fn => {
          try { window.console[fn] = noop; } catch {}
        });
        try { if (typeof window.console.clear === 'function') window.console.clear(); } catch {}
      }
    } catch {}

    // Desktop DevTools open detector (docked panel threshold; skips mobile touch keyboards & automated headless checks)
    const isDesktopPointer = () => {
      try { return window.matchMedia && window.matchMedia('(pointer: fine)').matches && !navigator.webdriver; } catch { return false; }
    };
    const checkDevToolsOpen = () => {
      if (!isDesktopPointer()) return;
      const wDiff = (window.outerWidth || 0) - (window.innerWidth || 0);
      const hDiff = (window.outerHeight || 0) - (window.innerHeight || 0);
      const isOpen = (window.outerWidth > 0 && window.innerWidth > 0) && (wDiff > 200 || hDiff > 220);
      const blk = document.getElementById('devtoolsBlocker');
      if (blk) blk.classList.toggle('active', isOpen);
    };
    window.addEventListener('resize', checkDevToolsOpen, { passive: true });
    setInterval(checkDevToolsOpen, 1500);
  })();


  /* ==================== FOX AI v8.0 VISUAL & UX SUITE (15 FEATURES) ==================== */
  // Feature 6: Safe zero-eval recursive math parser for ```calc widgets
  function evalSafeCalcFormula(expr, vars) {
    const s = String(expr || '').replace(/\s+/g, '');
    let pos = 0;
    const peek = () => s[pos] || '';
    const consume = ch => { if (s[pos] === ch) { pos++; return true; } return false; };
    function parseExpr() {
      let val = parseTerm();
      while (peek() === '+' || peek() === '-') {
        const op = s[pos++];
        const r = parseTerm();
        val = op === '+' ? val + r : val - r;
      }
      return val;
    }
    function parseTerm() {
      let val = parsePow();
      while (peek() === '*' || peek() === '/') {
        const op = s[pos++];
        const r = parsePow();
        val = op === '*' ? val * r : (r === 0 ? 0 : val / r);
      }
      return val;
    }
    function parsePow() {
      let base = parseUnary();
      if (peek() === '^') { pos++; base = Math.pow(base, parsePow()); }
      return base;
    }
    function parseUnary() {
      if (consume('+')) return parseUnary();
      if (consume('-')) return -parseUnary();
      return parsePrimary();
    }
    function parsePrimary() {
      if (consume('(')) { const v = parseExpr(); consume(')'); return v; }
      const numM = s.slice(pos).match(/^\d+(?:\.\d+)?/);
      if (numM) { pos += numM[0].length; return parseFloat(numM[0]); }
      const idM = s.slice(pos).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
      if (idM) {
        pos += idM[0].length;
        const name = idM[0];
        if (consume('(')) {
          const args = [];
          if (peek() !== ')') {
            args.push(parseExpr());
            while (consume(',')) args.push(parseExpr());
          }
          consume(')');
          const fns = { round: Math.round, floor: Math.floor, ceil: Math.ceil, sqrt: Math.sqrt, abs: Math.abs, min: Math.min, max: Math.max, pow: Math.pow };
          return fns[name] ? fns[name](...args) : 0;
        }
        return Object.prototype.hasOwnProperty.call(vars, name) ? Number(vars[name]) : 0;
      }
      return 0;
    }
    try { return parseExpr(); } catch { return NaN; }
  }

  // Feature 2: Contextual Fox Mood Indicator
  function updateFoxMood(customMsg) {
    const el = $('foxMoodText');
    if (!el) return;
    if (customMsg) { el.textContent = customMsg; return; }
    const hr = new Date().getHours();
    if (state.mode === 'deep') el.textContent = 'Глубокий фокус · режим анализа';
    else if (hr >= 23 || hr < 6) el.textContent = 'Ночной режим · тихая работа';
    else el.textContent = 'Лиса готова к работе';
  }

  // Feature 4: Chat Minimap / Timeline Scrubber
  function updateChatMinimap() {
    const mm = $('chatMinimap');
    if (!mm) return;
    const chat = getActiveChat();
    const msgs = chat ? chat.messages : [];
    if (msgs.length < 4) { mm.classList.remove('show'); mm.innerHTML = ''; return; }
    const bmIds = new Set(state.bookmarks.map(b => b.msgId));
    const slice = msgs.slice(-28);
    mm.innerHTML = slice.map(m => {
      const v = getMsgVersion(m);
      const isCode = m.role === 'assistant' && /```/.test(v.text || '');
      const isBm = bmIds.has(m.id);
      const cls = isBm ? 'bm' : (isCode ? 'code' : (m.role === 'user' ? 'user' : ''));
      const title = escapeHtml((v.text || '').replace(/\s+/g, ' ').slice(0, 48));
      return `<button type="button" class="mm-dot ${cls}" data-mm-jump="${escapeHtml(m.id)}" title="${title}" aria-label="${title || 'Сообщение'}"></button>`;
    }).join('');
    mm.classList.add('show');
  }

  // Feature 11: Floating TOC Pill for Long Answers
  function updateTocPill() {
    const wrap = $('tocPillWrap'), dd = $('tocDropdown'), lbl = $('tocPillLabel');
    if (!wrap || !dd || !lbl) return;
    const chat = getActiveChat();
    const lastAssist = chat ? [...chat.messages].reverse().find(m => m.role === 'assistant') : null;
    if (!lastAssist) { wrap.classList.remove('show'); dd.classList.remove('open'); return; }
    const domEl = elChatContainer.querySelector(`[data-msg-id="${CSS.escape(lastAssist.id)}"]`);
    const heads = domEl ? Array.from(domEl.querySelectorAll('.md-body h1, .md-body h2, .md-body h3')) : [];
    if (heads.length < 2) { wrap.classList.remove('show'); dd.classList.remove('open'); return; }
    heads.forEach((h, i) => { h.dataset.tocIdx = String(i); });
    lbl.textContent = `Разделы (${heads.length})`;
    dd.innerHTML = heads.map((h, i) => `<button type="button" class="toc-item" data-toc-go="${i}">${escapeHtml(h.textContent.trim().slice(0, 64))}</button>`).join('');
    wrap.classList.add('show');
  }

  // Feature 15: Activity Dashboard & 49-day Heatmap
  function renderActivityDashboard() {
    const heat = $('actHeatmap');
    if (!heat) return;
    const countsByDay = new Map();
    let totalMsgs = 0;
    for (const c of state.chats) {
      for (const m of (c.messages || [])) {
        totalMsgs++;
        const ts = Number(getMsgVersion(m).ts || c.updatedAt || Date.now());
        const d = new Date(ts);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        countsByDay.set(key, (countsByDay.get(key) || 0) + 1);
      }
    }
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if ((countsByDay.get(key) || 0) > 0) streak++;
      else if (i > 0) break;
    }
    if ($('actStatChats')) $('actStatChats').textContent = String(state.chats.length);
    if ($('actStatMsgs')) $('actStatMsgs').textContent = String(totalMsgs);
    if ($('actStatDeck')) $('actStatDeck').textContent = String((state.flashDeck || []).length);
    if ($('actStreakLabel')) $('actStreakLabel').textContent = `Серия: ${streak} дн.`;
    const cells = [];
    for (let i = 48; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const cnt = countsByDay.get(key) || 0;
      const lvl = cnt === 0 ? '' : (cnt <= 2 ? 'l1' : (cnt <= 6 ? 'l2' : 'l3'));
      cells.push(`<div class="act-cell ${lvl}" title="${key}: ${cnt} сообщ."></div>`);
    }
    heat.innerHTML = cells.join('');
  }

  // Feature 17: Share Answer as Styled PNG Card
  async function shareMessageAsPngCard(msgId) {
    const msg = findMsg(msgId);
    if (!msg) return;
    const v = getMsgVersion(msg);
    const raw = (msg.role === 'assistant' ? (parseThinkText(v.text, '').visible || v.text) : v.text) || '';
    const clean = raw.replace(/```[\s\S]*?```/g, '[блок кода]').replace(/[#*_`>]/g, '').trim().slice(0, 900);
    const cs = getComputedStyle(document.documentElement);
    const bg = cs.getPropertyValue('--bg').trim() || '#000000';
    const surface = cs.getPropertyValue('--surface').trim() || '#0d0d0d';
    const border = cs.getPropertyValue('--border-strong').trim() || '#2a2a2a';
    const textCol = cs.getPropertyValue('--text').trim() || '#f5f5f5';
    const mutedCol = cs.getPropertyValue('--text-muted').trim() || '#a0a0a0';

    const W = 1080, pad = 72, cardW = W - pad * 2;
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    ctx.font = '400 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const words = clean.split(/\s+/);
    const lines = [];
    let cur = '';
    for (const w of words) {
      const test = cur ? cur + ' ' + w : w;
      if (ctx.measureText(test).width > cardW - 96 && cur) { lines.push(cur); cur = w; }
      else cur = test;
      if (lines.length >= 22) break;
    }
    if (cur && lines.length < 22) lines.push(cur);
    const H = Math.max(540, 260 + lines.length * 48 + 110);
    c.width = W; c.height = H;

    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = surface; ctx.strokeStyle = border; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(pad, pad, cardW, H - pad * 2, 32); ctx.fill(); ctx.stroke();

    ctx.fillStyle = textCol;
    ctx.font = '700 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const isWin = document.body.classList.contains('winter-mode');
    if (isWin) {
      ctx.strokeStyle = 'rgba(125,211,252,0.45)'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(pad + 10, pad + 10, cardW - 20, H - pad * 2 - 20, 26); ctx.stroke();
      ctx.fillStyle = 'rgba(251,191,36,0.75)';
      for (let sx = pad + 60; sx < W - pad - 40; sx += 90) { ctx.beginPath(); ctx.arc(sx, pad + 26, 3.5, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.fillStyle = textCol;
    ctx.fillText(isWin ? 'Fox AI · Winter Edition' : 'Fox AI', pad + 48, pad + 78);
    ctx.fillStyle = mutedCol;
    ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(new Date().toLocaleDateString('ru-RU'), W - pad - 170, pad + 76);

    ctx.strokeStyle = border; ctx.beginPath(); ctx.moveTo(pad + 48, pad + 112); ctx.lineTo(W - pad - 48, pad + 112); ctx.stroke();

    ctx.fillStyle = textCol;
    ctx.font = '400 31px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    lines.forEach((ln, idx) => ctx.fillText(ln, pad + 48, pad + 178 + idx * 48));

    c.toBlob(async blob => {
      if (!blob) return;
      const file = new File([blob], 'fox-ai-card.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try { await navigator.share({ files: [file], title: 'Fox AI' }); return; } catch {}
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'fox-ai-card.png'; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast('Карточка fox-ai-card.png сохранена');
    }, 'image/png');
  }

  // Feature 5: Fullscreen Viz/SVG Zoom Viewer
  const vizZoomState = { scale: 1, tx: 0, ty: 0, dragging: false, sx: 0, sy: 0, svgMarkup: '' };
  function applyVizZoomTransform() {
    const inner = $('vizZoomInner');
    if (inner) inner.style.transform = `translate(${vizZoomState.tx}px, ${vizZoomState.ty}px) scale(${vizZoomState.scale})`;
    if ($('btnVizZoomReset')) $('btnVizZoomReset').textContent = Math.round(vizZoomState.scale * 100) + '%';
  }
  function openVizZoom(svgEl) {
    if (!svgEl) return;
    vizZoomState.scale = 1; vizZoomState.tx = 0; vizZoomState.ty = 0;
    vizZoomState.svgMarkup = svgEl.outerHTML;
    $('vizZoomInner').innerHTML = sanitizeSvg(vizZoomState.svgMarkup);
    applyVizZoomTransform();
    $('vizZoomModal').classList.add('open');
  }

  // Feature 12: Zen / Focus Mode
  function toggleZenMode(force) {
    const on = typeof force === 'boolean' ? force : !document.body.classList.contains('zen-mode');
    document.body.classList.toggle('zen-mode', on);
    if ($('zenMenuStatus')) $('zenMenuStatus').textContent = on ? 'Вкл' : 'Выкл';
    closeModal('headerMenuModal');
  }

  function bindV8VisualEvents() {
    // Accent buttons (Feature 13)
    document.querySelectorAll('[data-set-accent]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.settings.accent = btn.dataset.setAccent;
        applySettings();
      });
    });

    // Zen Mode triggers (Feature 12)
    if ($('btnMenuZen')) $('btnMenuZen').addEventListener('click', () => toggleZenMode());
    if ($('btnZenExit')) $('btnZenExit').addEventListener('click', () => toggleZenMode(false));
    document.addEventListener('keydown', e => { if (e.altKey && (e.key === 'z' || e.key === 'Z' || e.key === 'я' || e.key === 'Я')) { e.preventDefault(); toggleZenMode(); } });

    // Mini-IDE Tablet button (Feature 16)
    if ($('btnIdeTablet')) {
      $('btnIdeTablet').addEventListener('click', () => {
        $('ideIframe').classList.remove('mobile-frame');
        $('ideIframe').classList.add('tablet-frame');
        $('btnIdeTablet').classList.add('primary');
        $('btnIdeMobile').classList.remove('primary');
        $('btnIdeDesktop').classList.remove('primary');
      });
    }
    if ($('btnIdeMobile')) $('btnIdeMobile').addEventListener('click', () => { $('ideIframe').classList.remove('tablet-frame'); if ($('btnIdeTablet')) $('btnIdeTablet').classList.remove('primary'); });
    if ($('btnIdeDesktop')) $('btnIdeDesktop').addEventListener('click', () => { $('ideIframe').classList.remove('tablet-frame'); if ($('btnIdeTablet')) $('btnIdeTablet').classList.remove('primary'); });

    // Voice Input with Animated Wave (Feature 9)
    const micBtn = $('btnVoiceInput');
    if (micBtn) {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      let rec = null, isRec = false;
      micBtn.addEventListener('click', () => {
        if (!SR) { showToast('Голосовой ввод не поддерживается этим браузером'); return; }
        if (isRec && rec) { try { rec.stop(); } catch {} return; }
        rec = new SR();
        rec.lang = 'ru-RU'; rec.interimResults = true; rec.continuous = false;
        const baseText = elComposer.value ? (elComposer.value.trimEnd() + ' ') : '';
        rec.onstart = () => { isRec = true; micBtn.classList.add('recording'); haptic(12); };
        rec.onresult = ev => {
          let spoken = '';
          for (let i = 0; i < ev.results.length; i++) spoken += ev.results[i][0].transcript;
          elComposer.value = baseText + spoken;
          autoResizeComposer(); setSendButtonState();
        };
        rec.onerror = () => { isRec = false; micBtn.classList.remove('recording'); };
        rec.onend = () => { isRec = false; micBtn.classList.remove('recording'); };
        try { rec.start(); } catch { showToast('Не удалось запустить микрофон'); }
      });
    }

    // Minimap Jump (Feature 4)
    if ($('chatMinimap')) {
      $('chatMinimap').addEventListener('click', e => {
        const dot = e.target.closest('[data-mm-jump]');
        if (!dot) return;
        const target = elChatContainer.querySelector(`[data-msg-id="${CSS.escape(dot.dataset.mmJump)}"]`);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }

    // Floating TOC Pill (Feature 11)
    if ($('btnTocToggle')) $('btnTocToggle').addEventListener('click', () => $('tocDropdown').classList.toggle('open'));
    if ($('tocDropdown')) {
      $('tocDropdown').addEventListener('click', e => {
        const it = e.target.closest('[data-toc-go]');
        if (!it) return;
        const h = elChatContainer.querySelector(`[data-toc-idx="${CSS.escape(it.dataset.tocGo)}"]`);
        if (h) h.scrollIntoView({ behavior: 'smooth', block: 'start' });
        $('tocDropdown').classList.remove('open');
      });
    }

    // Viz Zoom Modal Controls & Drag (Feature 5)
    if ($('btnVizZoomIn')) $('btnVizZoomIn').addEventListener('click', () => { vizZoomState.scale = Math.min(4, vizZoomState.scale + 0.35); applyVizZoomTransform(); });
    if ($('btnVizZoomOut')) $('btnVizZoomOut').addEventListener('click', () => { vizZoomState.scale = Math.max(0.5, vizZoomState.scale - 0.35); applyVizZoomTransform(); });
    if ($('btnVizZoomReset')) $('btnVizZoomReset').addEventListener('click', () => { vizZoomState.scale = 1; vizZoomState.tx = 0; vizZoomState.ty = 0; applyVizZoomTransform(); });
    if ($('btnVizZoomClose')) $('btnVizZoomClose').addEventListener('click', () => $('vizZoomModal').classList.remove('open'));
    if ($('btnVizZoomSvg')) $('btnVizZoomSvg').addEventListener('click', () => { if (vizZoomState.svgMarkup) downloadFile('fox-ai-diagram.svg', vizZoomState.svgMarkup, 'image/svg+xml;charset=utf-8'); });
    if ($('btnVizZoomPng')) $('btnVizZoomPng').addEventListener('click', () => {
      const svgEl = $('vizZoomInner').querySelector('svg');
      if (!svgEl) return;
      const xml = new XMLSerializer().serializeToString(svgEl);
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas'); c.width = Math.max(800, img.width * 2); c.height = Math.max(500, img.height * 2);
        const ctx = c.getContext('2d'); ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#000'; ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        c.toBlob(b => { if (!b) return; const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = 'fox-ai-diagram.png'; a.click(); setTimeout(() => URL.revokeObjectURL(u), 1000); });
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(xml)));
    });
    const zStage = $('vizZoomStage');
    if (zStage) {
      zStage.addEventListener('pointerdown', e => { vizZoomState.dragging = true; vizZoomState.sx = e.clientX - vizZoomState.tx; vizZoomState.sy = e.clientY - vizZoomState.ty; });
      window.addEventListener('pointermove', e => { if (!vizZoomState.dragging) return; vizZoomState.tx = e.clientX - vizZoomState.sx; vizZoomState.ty = e.clientY - vizZoomState.sy; applyVizZoomTransform(); });
      window.addEventListener('pointerup', () => { vizZoomState.dragging = false; });
    }

    // Interactive ```calc slider updates (Feature 6)
    elChatContainer.addEventListener('input', e => {
      const sl = e.target.closest('.calc-slider');
      if (!sl) return;
      const cid = sl.dataset.calcId, vid = sl.dataset.calcVar;
      const store = window.__foxCalcStore && window.__foxCalcStore.get(cid);
      if (!store) return;
      const val = Number(sl.value);
      store.vars[vid] = val;
      const inpDef = store.inputs.find(x => String(x.id) === vid);
      const card = sl.closest('.calc-card');
      const lblEl = card && card.querySelector(`[data-calc-val="${CSS.escape(vid)}"]`);
      if (lblEl) lblEl.textContent = val + (inpDef && inpDef.unit ? ' ' + inpDef.unit : '');
      store.outputs.forEach((out, oi) => {
        const resEl = card && card.querySelector(`[data-calc-out="${oi}"]`);
        if (!resEl) return;
        const r = evalSafeCalcFormula(out.formula || '0', store.vars);
        const fmt = Number.isFinite(r) ? (Math.round(r * 100) / 100).toLocaleString('ru-RU') : '—';
        resEl.textContent = fmt + (out.unit ? ' ' + out.unit : '');
      });
    });

    // Interactive ```stepper & Viz Zoom button clicks (Features 5, 8)
    elChatContainer.addEventListener('click', e => {
      const zBtn = e.target.closest('[data-viz-zoom]');
      if (zBtn) {
        const card = zBtn.closest('.viz-card, .diagram-card');
        const svgEl = card ? card.querySelector('svg') : null;
        if (svgEl) openVizZoom(svgEl);
        return;
      }
      const stNav = e.target.closest('[data-stepper-nav]');
      if (stNav) {
        const [sid, delta] = stNav.dataset.stepperNav.split(':');
        const st = window.__foxStepperStore && window.__foxStepperStore.get(sid);
        if (!st) return;
        st.idx = Math.max(0, Math.min(st.steps.length - 1, st.idx + Number(delta)));
        const cur = st.steps[st.idx] || {};
        const sCard = stNav.closest(".stepper-card"); if (sCard && sCard.querySelector('[data-st-role="meta"]')) sCard.querySelector('[data-st-role="meta"]').textContent = `Шаг ${st.idx + 1} из ${st.steps.length}`;
        if (sCard && sCard.querySelector('[data-st-role="fill"]')) sCard.querySelector('[data-st-role="fill"]').style.width = `${Math.round(((st.idx + 1) / st.steps.length) * 100)}%`;
        if (sCard && sCard.querySelector('[data-st-role="num"]')) sCard.querySelector('[data-st-role="num"]').textContent = `Шаг ${st.idx + 1}` + (st.done.has(st.idx) ? ' · выполнено' : '');
        if (sCard && sCard.querySelector('[data-st-role="title"]')) sCard.querySelector('[data-st-role="title"]').textContent = cur.title || '';
        if (sCard && sCard.querySelector('[data-st-role="desc"]')) sCard.querySelector('[data-st-role="desc"]').textContent = cur.desc || '';
        return;
      }
      const stDone = e.target.closest('[data-stepper-done]');
      if (stDone) {
        const sid = stDone.dataset.stepperDone;
        const st = window.__foxStepperStore && window.__foxStepperStore.get(sid);
        if (!st) return;
        st.done.add(st.idx);
        haptic(14);
        if (st.idx < st.steps.length - 1) st.idx++;
        const cur = st.steps[st.idx] || {};
        const sCard = stDone.closest(".stepper-card"); if (sCard && sCard.querySelector('[data-st-role="meta"]')) sCard.querySelector('[data-st-role="meta"]').textContent = `Шаг ${st.idx + 1} из ${st.steps.length}`;
        if (sCard && sCard.querySelector('[data-st-role="fill"]')) sCard.querySelector('[data-st-role="fill"]').style.width = `${Math.round(((st.idx + 1) / st.steps.length) * 100)}%`;
        if (sCard && sCard.querySelector('[data-st-role="num"]')) sCard.querySelector('[data-st-role="num"]').textContent = `Шаг ${st.idx + 1}` + (st.done.has(st.idx) ? ' · выполнено' : '');
        if (sCard && sCard.querySelector('[data-st-role="title"]')) sCard.querySelector('[data-st-role="title"]').textContent = cur.title || '';
        if (sCard && sCard.querySelector('[data-st-role="desc"]')) sCard.querySelector('[data-st-role="desc"]').textContent = cur.desc || '';
        if (st.done.size >= st.steps.length) { showToast('Все шаги выполнены!'); updateFoxMood('Отличная работа!'); }
      }
    });

    // Context Menu -> Share PNG Card (Feature 17)
    if ($('contextActions')) {
      $('contextActions').addEventListener('click', e => {
        const btn = e.target.closest('[data-ctx="share-card"]');
        if (!btn) return;
        const mid = state.contextMsgId;
        closeModal('contextModal');
        if (mid) shareMessageAsPngCard(mid);
      });
    }

    // Swipe-down to dismiss bottom sheets (Feature 3)
    let shStartY = 0, shEl = null, shModal = null;
    document.addEventListener('touchstart', e => {
      if (e.touches.length !== 1) return;
      const handle = e.target.closest('.sheet-handle, .sheet-title, .settings-header');
      if (!handle) return;
      const sheet = handle.closest('.sheet');
      const modal = sheet && sheet.closest('.modal-backdrop.open');
      if (sheet && modal && sheet.scrollTop <= 2) {
        shEl = sheet; shModal = modal; shStartY = e.touches[0].clientY;
        shEl.classList.add('sheet-dragging');
      }
    }, { passive: true });
    document.addEventListener('touchmove', e => {
      if (!shEl || e.touches.length !== 1) return;
      const dy = e.touches[0].clientY - shStartY;
      if (dy > 0) shEl.style.transform = `translateY(${Math.min(320, dy)}px)`;
    }, { passive: true });
    document.addEventListener('touchend', e => {
      if (!shEl) return;
      const dy = (e.changedTouches[0] ? e.changedTouches[0].clientY : shStartY) - shStartY;
      shEl.classList.remove('sheet-dragging');
      shEl.style.transform = '';
      if (dy > 95 && shModal) shModal.classList.remove('open');
      shEl = null; shModal = null;
    }, { passive: true });

    // Refresh Activity Dashboard when Settings opens (Feature 15)
    if ($('btnOpenSettings')) $('btnOpenSettings').addEventListener('click', () => setTimeout(renderActivityDashboard, 30));
  }


  /* ==================== CLOUD SYNC CLIENT (v9.0, /api/sync) ==================== */
  function bindCloudSyncEvents() {
    const stEl = $('cloudSyncStatus');
    const btnPush = $('btnCloudPush');
    const btnPull = $('btnCloudPull');
    if (btnPush && !btnPush.dataset.boundSync) {
      btnPush.dataset.boundSync = '1';
      btnPush.addEventListener('click', async () => {
        btnPush.disabled = true;
        if (stEl) stEl.textContent = 'Сохранение…';
        try {
          const payload = {
            version: 9,
            updatedAt: Date.now(),
            chats: state.chats.slice(0, 120).map(c => ({
              ...c,
              messages: (c.messages || []).map(m => ({
                ...m,
                versions: (m.versions || []).map(v => ({
                  ...v,
                  attachments: (v.attachments || []).filter(a => a.kind !== 'image')
                }))
              }))
            })),
            memory: state.memory.slice(0, 200),
            bookmarks: state.bookmarks.slice(0, 300),
            prompts: state.prompts.slice(0, 100),
            projects: (state.projects || []).slice(0, 20),
            flashDeck: (state.flashDeck || []).slice(0, 300),
            theme: state.theme,
            settings: state.settings
          };
          const res = await fetch('/api/sync', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const data = await res.json().catch(() => ({}));
          if (res.status === 401) { showAuthGate('Сессия истекла — войдите снова', true); return; }
          if (!res.ok) {
            if (stEl) stEl.textContent = 'Не подключено';
            showToast(data.message || 'Облачная синхронизация недоступна');
            return;
          }
          if (stEl) stEl.textContent = 'Синхронизировано';
          showToast('История сохранена в облако');
        } catch {
          if (stEl) stEl.textContent = 'Ошибка сети';
          showToast('Не удалось сохранить в облако');
        } finally {
          btnPush.disabled = false;
        }
      });
    }
    if (btnPull && !btnPull.dataset.boundSync) {
      btnPull.dataset.boundSync = '1';
      btnPull.addEventListener('click', async () => {
        btnPull.disabled = true;
        if (stEl) stEl.textContent = 'Загрузка…';
        try {
          const res = await fetch('/api/sync', { method: 'GET', credentials: 'same-origin', cache: 'no-store' });
          const data = await res.json().catch(() => ({}));
          if (res.status === 401) { showAuthGate('Сессия истекла — войдите снова', true); return; }
          if (!res.ok) {
            if (stEl) stEl.textContent = 'Не подключено';
            showToast(data.message || 'Облачная синхронизация недоступна');
            return;
          }
          if (!data.snapshot || !Array.isArray(data.snapshot.chats)) {
            if (stEl) stEl.textContent = 'Облако пусто';
            showToast('В облаке пока нет сохранённой копии');
            return;
          }
          const snap = data.snapshot;
          const cleanChats = snap.chats.slice(0, MAX_BACKUP_CHATS).map(validateChatStructure).filter(Boolean);
          if (cleanChats.length) { state.chats = cleanChats; state.activeChatId = cleanChats[0].id; }
          if (Array.isArray(snap.memory)) { state.memory = snap.memory.slice(0, 200).filter(m => m && typeof m.text === 'string').map(m => ({ id: safeId(m.id), text: m.text.slice(0, 500), ts: Number(m.ts) || Date.now() })); saveMemory(); }
          if (Array.isArray(snap.bookmarks)) { state.bookmarks = snap.bookmarks.slice(0, 300).filter(b => b && typeof b.text === 'string').map(b => ({ id: safeId(b.id), msgId: safeId(b.msgId), chatTitle: String(b.chatTitle || 'Fox AI').slice(0, 120), text: b.text.slice(0, 2000), ts: Number(b.ts) || Date.now() })); saveBookmarks(); }
          if (Array.isArray(snap.prompts)) { state.prompts = snap.prompts.slice(0, 100).filter(p => p && typeof p.title === 'string' && typeof p.text === 'string').map(p => ({ id: safeId(p.id), title: p.title.slice(0, 100), text: p.text.slice(0, 3000) })); savePrompts(); }
          if (snap.settings && typeof snap.settings === 'object') { state.settings = sanitizeSettingsObj(snap.settings); applySettings(); }
          if (typeof snap.theme === 'string') applyTheme(snap.theme);
          saveChats(true);
          renderAll();
          renderActivityDashboard();
          if (stEl) stEl.textContent = 'Загружено';
          showToast(`Загружено чатов из облака: ${cleanChats.length}`);
        } catch {
          if (stEl) stEl.textContent = 'Ошибка сети';
          showToast('Не удалось загрузить из облака');
        } finally {
          btnPull.disabled = false;
        }
      });
    }
  }


  /* ==================== FOX AI v11.0 NEW YEAR & VISUAL ENGINE ==================== */
  // 13. Subtle Web Audio UI Sounds (zero external MP3s, soft & unobtrusive)
  let _audioCtx = null;
  function playUiSound(kind) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!_audioCtx) _audioCtx = new AC();
      if (_audioCtx.state === 'suspended') _audioCtx.resume().catch(() => {});
      const now = _audioCtx.currentTime;
      const osc = _audioCtx.createOscillator();
      const gain = _audioCtx.createGain();
      osc.connect(gain); gain.connect(_audioCtx.destination);
      if (kind === 'send') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(520, now); osc.frequency.exponentialRampToValueAtTime(760, now + 0.06);
        gain.gain.setValueAtTime(0.03, now); gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.07);
        osc.start(now); osc.stop(now + 0.08);
      } else if (kind === 'done') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(660, now); osc.frequency.setValueAtTime(880, now + 0.07);
        gain.gain.setValueAtTime(0.025, now); gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.22);
        osc.start(now); osc.stop(now + 0.23);
      } else if (kind === 'spark') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(980, now); osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
        gain.gain.setValueAtTime(0.02, now); gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.09);
        osc.start(now); osc.stop(now + 0.1);
      }
    } catch {}
  }

  // 10. Micro-particles burst (bookmarks, code copy, fox pet, quiz win, New Year fireworks)
  function spawnSparkBurst(x, y, count = 12, winterColors = false) {
    const cx = Number.isFinite(x) ? x : window.innerWidth / 2;
    const cy = Number.isFinite(y) ? y : window.innerHeight / 2;
    const palette = winterColors
      ? ['#fbbf24', '#7dd3fc', '#ffffff', '#f59e0b']
      : ['var(--accent)', 'var(--text)', 'var(--text-muted)'];
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('span');
      dot.className = 'fox-spark';
      dot.style.left = cx + 'px';
      dot.style.top = cy + 'px';
      dot.style.background = palette[i % palette.length];
      document.body.appendChild(dot);
      const ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const dist = 26 + Math.random() * 42;
      requestAnimationFrame(() => {
        dot.style.transform = `translate(${Math.round(Math.cos(ang) * dist)}px, ${Math.round(Math.sin(ang) * dist)}px) scale(0.2)`;
        dot.style.opacity = '0';
      });
      setTimeout(() => dot.remove(), 700);
    }
  }

  // 1. Lightweight Parallax Canvas Snowfall (auto-pauses when tab hidden or winterMode off)
  let _snowRaf = null;
  function syncWinterMode() {
    const on = state.settings.winterMode !== false;
    document.body.classList.toggle('winter-mode', on);
    const sw = $('swWinterMode');
    if (sw) { sw.classList.toggle('on', on); sw.setAttribute('aria-checked', String(on)); }
    const canvas = $('snowCanvas');
    if (!canvas) return;
    if (!on) {
      if (_snowRaf) { cancelAnimationFrame(_snowRaf); _snowRaf = null; }
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    if (_snowRaf) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth, H = canvas.height = window.innerHeight;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize, { passive: true });
    const count = Math.min(48, Math.max(24, Math.floor(W / 14)));
    const flakes = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 0.9 + Math.random() * 2.1,
      vy: 0.35 + Math.random() * 0.85,
      vx: (Math.random() - 0.5) * 0.45,
      a: 0.18 + Math.random() * 0.45
    }));
    const tick = () => {
      if (!document.body.classList.contains('winter-mode')) { _snowRaf = null; return; }
      if (document.visibilityState === 'visible') {
        ctx.clearRect(0, 0, W, H);
        const isLight = state.theme === 'light' || state.theme === 'paper';
        for (const f of flakes) {
          f.y += f.vy; f.x += f.vx + Math.sin(f.y * 0.015) * 0.25;
          if (f.y > H + 6) { f.y = -6; f.x = Math.random() * W; }
          if (f.x > W + 6) f.x = -6; else if (f.x < -6) f.x = W + 6;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? `rgba(100,130,170,${f.a * 0.65})` : `rgba(226,240,255,${f.a})`;
          ctx.fill();
        }
      }
      _snowRaf = requestAnimationFrame(tick);
    };
    _snowRaf = requestAnimationFrame(tick);
  }

  // 5. New Year Countdown & NYE Firework Burst
  function getNewYearCountdownText() {
    const now = new Date();
    const targetYear = (now.getMonth() === 0 && now.getDate() <= 2) ? now.getFullYear() : (now.getFullYear() + 1);
    const target = new Date(targetYear, 0, 1, 0, 0, 0);
    const diff = target - now;
    if (diff <= 0) return `С Новым ${now.getFullYear()} годом!`;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return `До Нового года: ${d} дн. ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
  function initNewYearCountdown() {
    const update = () => {
      const el = $('nyCountdownText');
      if (el) el.textContent = getNewYearCountdownText();
    };
    update();
    setInterval(update, 30000);
    // Celebratory subtle burst on Dec 31 / Jan 1
    const now = new Date();
    if ((now.getMonth() === 11 && now.getDate() === 31) || (now.getMonth() === 0 && now.getDate() === 1)) {
      setTimeout(() => spawnSparkBurst(window.innerWidth * 0.5, window.innerHeight * 0.3, 22, true), 900);
    }
  }

  function bindV11VisualEvents() {
    // Only 1 toggle: Winter Mode
    const swWin = $('swWinterMode');
    if (swWin) {
      swWin.addEventListener('click', () => {
        state.settings.winterMode = !(state.settings.winterMode !== false);
        applySettings();
        syncWinterMode();
      });
    }

    // 14 & 2. Delegated Welcome Glass Prompt Cards + Fox Sparkles
    if (elChatContainer) {
      elChatContainer.addEventListener('click', e => {
        const card = e.target.closest('[data-quick-prompt]');
        if (card) {
          elComposer.value = card.dataset.quickPrompt;
          autoResizeComposer(); setSendButtonState();
          elComposer.focus();
          return;
        }
        if (e.target.closest('#foxActor')) {
          spawnSparkBurst(e.clientX, e.clientY, 14, document.body.classList.contains('winter-mode'));
          playUiSound('spark');
        }
      });
    }
    document.addEventListener('click', e => {
      if (e.target.closest('[data-copy-code], [data-ctx="bm"]')) {
        spawnSparkBurst(e.clientX, e.clientY, 10, document.body.classList.contains('winter-mode'));
        playUiSound('spark');
      }
    });

    // 12. Auto-hide Topbar on scroll down, reveal on scroll up
    let lastScrollTop = 0;
    if (elChatScroll) {
      elChatScroll.addEventListener('scroll', () => {
        const st = elChatScroll.scrollTop;
        if (st > 90 && st > lastScrollTop + 14) document.body.classList.add('topbar-hidden');
        else if (st < lastScrollTop - 10 || st <= 40) document.body.classList.remove('topbar-hidden');
        lastScrollTop = st;
      }, { passive: true });
    }

    syncWinterMode();
    initNewYearCountdown();
  }

  /* ==================== REAL ASYNC INIT (ZERO ARTIFICIAL DELAY, SECTION 7.4) ==================== */
  async function bootstrap() {
    applyTheme(state.theme);
    applySettings();
    await initStorage();
    initPwa();
    bindEvents();
    bindV8VisualEvents();
    bindCloudSyncEvents();
    bindV11VisualEvents();
    renderAll();
    updateFoxMood();
    updateDeckBadge();
    restoreCurrentDraft();
    await initYandexAuth();
    window.__foxAppReady = true;
    elSplash.classList.add('hidden');
  }

  bootstrap();
})();