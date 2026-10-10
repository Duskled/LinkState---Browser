'use strict';

const MAX_WEBSITE_SIZE = 5 * 1024 * 1024;
const TEXT_EXTENSIONS = new Set([
    'html', 'htm', 'css', 'js', 'mjs', 'cjs', 'json', 'txt',
    'svg', 'xml', 'md', 'csv', 'webmanifest', 'map'
]);

const MIME_TYPES = {
    html: 'text/html;charset=utf-8',
    htm: 'text/html;charset=utf-8',
    css: 'text/css;charset=utf-8',
    js: 'text/javascript;charset=utf-8',
    mjs: 'text/javascript;charset=utf-8',
    cjs: 'text/javascript;charset=utf-8',
    json: 'application/json;charset=utf-8',
    txt: 'text/plain;charset=utf-8',
    svg: 'image/svg+xml;charset=utf-8',
    xml: 'application/xml;charset=utf-8',
    webmanifest: 'application/manifest+json;charset=utf-8',
    map: 'application/json;charset=utf-8',
    csv: 'text/csv;charset=utf-8',
    md: 'text/markdown;charset=utf-8',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
    avif: 'image/avif',
    ico: 'image/x-icon',
    bmp: 'image/bmp',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    mp4: 'video/mp4',
    webm: 'video/webm',
    pdf: 'application/pdf',
    woff: 'font/woff',
    woff2: 'font/woff2',
    ttf: 'font/ttf',
    otf: 'font/otf'
};

/* =========================================================
   ELEMENTS
========================================================= */

const elements = {
    linkInput: document.getElementById('linkInput'),
    clearInputButton: document.getElementById('clearInputButton'),
    openButton: document.getElementById('openButton'),
    topSuggestions: document.getElementById('topSuggestions'),

    backButton: document.querySelector('.nav-group button:nth-child(1)'),
    forwardButton: document.querySelector('.nav-group button:nth-child(2)'),
    refreshButton: document.querySelector('.nav-group button:nth-child(3)'),
    
    braveMenuButton: document.getElementById('braveMenuButton'),
    browserMenu: document.getElementById('browserMenu'),
    menuNewTab: document.getElementById('menuNewTab'),
    menuHistoryPage: document.getElementById('menuHistoryPage'),
    menuDownloadsPage: document.getElementById('menuDownloadsPage'),
    menuOpenOnestate: document.getElementById('menuOpenOnestate'),
    onestateFileInput: document.getElementById('onestateFileInput'),
    menuClearData: document.getElementById('menuClearData'),
    menuExit: document.getElementById('menuExit'),
    
    historyListMini: document.getElementById('historyListMini'),
    downloadsListMini: document.getElementById('downloadsListMini'),
    
    historyState: document.getElementById('historyState'),
    downloadsState: document.getElementById('downloadsState'),
    fullHistoryList: document.getElementById('fullHistoryList'),
    fullDownloadsList: document.getElementById('fullDownloadsList'),
    clearHistoryPageBtn: document.getElementById('clearHistoryPageBtn'),
    clearDownloadsPageBtn: document.getElementById('clearDownloadsPageBtn'),

    toolbarDownloadBtn: document.getElementById('toolbarDownloadBtn'),
    extractPopover: document.getElementById('extractPopover'),
    dismissPopoverBtn: document.getElementById('dismissPopoverBtn'),
    neverShowPopoverCheck: document.getElementById('neverShowPopoverCheck'),
    
    downloadsPopover: document.getElementById('downloadsPopover'),
    closeDownloadsPopover: document.getElementById('closeDownloadsPopover'),
    downloadsPopoverList: document.getElementById('downloadsPopoverList'),
    openFullDownloadsBtn: document.getElementById('openFullDownloadsBtn'),

    heroLinkInput: document.getElementById('heroLinkInput'),
    heroOpenButton: document.getElementById('heroOpenButton'),
    openGenerateView: document.getElementById('openGenerateView'),
    heroSuggestions: document.getElementById('heroSuggestions'),

    homeButton: document.getElementById('homeButton'),
    recoverButton: document.getElementById('recoverButton'),
    activeTabTitle: document.getElementById('activeTabTitle'),

    statusBar: document.getElementById('statusBar'),
    statusText: document.getElementById('statusText'),

    ambientCanvas: document.getElementById('ambientCanvas'),

    emptyState: document.getElementById('emptyState'),
    generateState: document.getElementById('generateState'),
    loadingState: document.getElementById('loadingState'),
    loadingTitle: document.getElementById('loadingTitle'),
    loadingMessage: document.getElementById('loadingMessage'),
    websiteFrame: document.getElementById('websiteFrame'),
    standardWebFrame: document.getElementById('standardWebFrame'),
    errorState: document.getElementById('errorState'),
    errorMessage: document.getElementById('errorMessage'),
    errorBackButton: document.getElementById('errorBackButton'),

    genActionContainer: document.getElementById('genActionContainer'),
    genResultContainer: document.getElementById('genResultContainer'),
    genFolderInput: document.getElementById('genFolderInput'),
    genFileInput: document.getElementById('genFileInput'),
    genBackButton: document.getElementById('genBackButton'),
    genResultLink: document.getElementById('genResultLink'),
    genCopyButton: document.getElementById('genCopyButton'),
    genDownloadButton: document.getElementById('genDownloadButton'),
    genOpenButton: document.getElementById('genOpenButton'),
    genResetButton: document.getElementById('genResetButton'),
    genFooterDivider: document.getElementById('genFooterDivider'),
    genDescription: document.getElementById('genDescription'),

    runtimeStatus: document.getElementById('runtimeStatus'),
    projectInformation: document.getElementById('projectInformation'),
    projectName: document.getElementById('projectName'),
    projectFileCount: document.getElementById('projectFileCount'),

    recoveryOverlay: document.getElementById('recoveryOverlay'),
    closeRecoveryButton: document.getElementById('closeRecoveryButton'),
    recoveryProjectName: document.getElementById('recoveryProjectName'),
    recoveryProjectMeta: document.getElementById('recoveryProjectMeta'),
    recoveryFiles: document.getElementById('recoveryFiles'),
    downloadProjectButton: document.getElementById('downloadProjectButton'),

    menuPersonalizationPage: document.getElementById('menuPersonalizationPage'),
    personalizationState: document.getElementById('personalizationState'),
    themeGrid: document.getElementById('themeGrid'),
    uploadWallpaperBtn: document.getElementById('uploadWallpaperBtn'),
    clearWallpaperBtn: document.getElementById('clearWallpaperBtn'),
    wallpaperInput: document.getElementById('wallpaperInput'),
    recentWallpapersGrid: document.getElementById('recentWallpapersGrid'),

    customColorPickerBtn: document.getElementById('customColorPickerBtn'),
    customColorInput: document.getElementById('customColorInput'),

    menuSavedStatesPage: document.getElementById('menuSavedStatesPage'),
    savedStatesState: document.getElementById('savedStatesState'),
    fullSavedStatesList: document.getElementById('fullSavedStatesList'),
    saveStateBtn: document.getElementById('saveStateBtn'),
    saveModal: document.getElementById('saveModal'),
    saveNameInput: document.getElementById('saveNameInput'),
    confirmSaveBtn: document.getElementById('confirmSaveBtn'),
    cancelSaveBtn: document.getElementById('cancelSaveBtn'),

    menuAboutBrowser: document.getElementById('menuAboutBrowser'),
    aboutState: document.getElementById('aboutState')
};

/* =========================================================
   STATE
========================================================= */

let activePackageData = null;
let activePagePath = null;
let historyStack = [];
let historyIndex = -1;
let isNavigatingHistory = false;

/* =========================================================
   START
========================================================= */

initialize();

function initialize() {
    bindEvents();
    initAmbientBackground();
    setView('empty');
    updateClearButton();
    disableNavigationButtons();
    setTabTitle('New LINKSTATE');
    renderMiniHistory();
    renderMiniDownloads();
    renderPopoverDownloads();
    restorePersonalization();

    window.setTimeout(() => {
        elements.heroLinkInput?.focus();
    }, 120);
    
    if (window.electronAPI) {
        window.electronAPI.onOpenFile((content) => {
            if (elements.linkInput) elements.linkInput.value = content;
            if (elements.heroLinkInput) elements.heroLinkInput.value = content;
            openLinkstate();
        });

        if (window.electronAPI.onDownloadStarted) {
            window.electronAPI.onDownloadStarted((filename) => {
                showStatus(`Downloading ${filename}...`);
                triggerDownloadAnimation();
            });
        }
        
        if (window.electronAPI.onDownloadProgress) {
            window.electronAPI.onDownloadProgress((data) => {
                updateLiveDownloadUI(data);
            });
        }

        if (window.electronAPI.onDownloadCompleted) {
            window.electronAPI.onDownloadCompleted((filename) => {
                const liveItem = document.getElementById(`live-dl-${filename}`);
                if (liveItem) liveItem.remove();
                if (typeof recordDownload === 'function') recordDownload(filename);
                showStatus(`${filename} download complete.`);
                triggerDownloadAnimation();
                checkRemainingDownloads();
            });
        }

        if (window.electronAPI.onDownloadCancelled) {
            window.electronAPI.onDownloadCancelled((filename) => {
                const liveItem = document.getElementById(`live-dl-${filename}`);
                if (liveItem) liveItem.remove();
                checkRemainingDownloads();
            });
        }
    }
}

function checkRemainingDownloads() {
    const list = elements.downloadsPopoverList;
    const remainingLive = list ? list.querySelectorAll('.active-download').length : 0;
    if (remainingLive === 0 && elements.toolbarDownloadBtn) {
        elements.toolbarDownloadBtn.classList.remove('is-downloading');
        const ring = document.querySelector('.dl-ring-fill');
        if (ring) ring.style.strokeDashoffset = '62.8318';
    }
}

/* =========================================================
   LIVE DOWNLOAD UI LOGIC
========================================================= */

function updateLiveDownloadUI(data) {
    const list = elements.downloadsPopoverList;
    if (!list) return;

    let liveItem = document.getElementById(`live-dl-${data.filename}`);
    
    if (!liveItem) {
        if (list.innerHTML.includes('No recent downloads')) list.innerHTML = '';
        
        liveItem = document.createElement('div');
        liveItem.id = `live-dl-${data.filename}`;
        liveItem.className = 'internal-list-item active-download';
        liveItem.style.cursor = 'default';
        
        liveItem.innerHTML = `
            <div class="item-icon">
                <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </div>
            <div class="item-details" style="width: 100%; min-width: 0;">
                <div style="position: relative;">
                    <span class="item-title">${data.filename}</span>
                    <div class="dl-actions">
                        <button class="dl-action-btn dl-pause" title="Pause">
                            <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        </button>
                        <button class="dl-action-btn dl-cancel" title="Cancel">
                            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
                <span class="item-url" id="live-text-${data.filename}" style="color: var(--text-primary); margin-top: 2px;">Starting...</span>
                <div class="download-progress-container">
                    <div class="download-progress-bar" id="live-bar-${data.filename}"></div>
                </div>
            </div>
        `;
        list.prepend(liveItem);

        const pauseBtn = liveItem.querySelector('.dl-pause');
        const cancelBtn = liveItem.querySelector('.dl-cancel');
        
        pauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isPaused = pauseBtn.classList.contains('is-paused');
            window.electronAPI.downloadAction({ action: isPaused ? 'resume' : 'pause', filename: data.filename });
            if (isPaused) {
                pauseBtn.classList.remove('is-paused');
                pauseBtn.innerHTML = '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
                pauseBtn.title = "Pause";
            } else {
                pauseBtn.classList.add('is-paused');
                pauseBtn.innerHTML = '<svg viewBox="0 0 24 24" style="fill: currentColor; stroke: none;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
                pauseBtn.title = "Resume";
            }
        });

        cancelBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.electronAPI.downloadAction({ action: 'cancel', filename: data.filename });
            liveItem.remove();
            checkRemainingDownloads();
        });
    }

    const text = document.getElementById(`live-text-${data.filename}`);
    if (data.state === 'interrupted') {
        if (text) text.textContent = 'Paused / Interrupted';
        return;
    }

    const receivedMB = (data.received / (1024 * 1024)).toFixed(1);
    const totalMB = (data.total / (1024 * 1024)).toFixed(1);
    const percent = Math.round((data.received / data.total) * 100) || 0;
    
    const elapsedSecs = Math.max((Date.now() - data.startTime) / 1000, 0.1); 
    const speedBps = data.received / elapsedSecs;
    const remainingSecs = Math.round((data.total - data.received) / speedBps) || 0;

    let timeText = '';
    if (remainingSecs >= 3600) { timeText = `${Math.floor(remainingSecs / 3600)} hours left`; } 
    else if (remainingSecs >= 60) { timeText = `${Math.floor(remainingSecs / 60)} minutes left`; } 
    else { timeText = `${remainingSecs} seconds left`; }

    const bar = document.getElementById(`live-bar-${data.filename}`);
    if (bar) bar.style.width = `${percent}%`;
    
    if (text) text.textContent = `↓ ${receivedMB}/${totalMB} MB • ${timeText}`;

    const btn = elements.toolbarDownloadBtn;
    if (btn) {
        btn.classList.add('is-downloading');
        const ring = document.querySelector('.dl-ring-fill');
        if (ring) {
            const circumference = 2 * Math.PI * 10;
            const offset = circumference - (percent / 100) * circumference;
            ring.style.strokeDashoffset = offset;
        }
    }
}

function triggerDownloadAnimation() {
    const btn = elements.toolbarDownloadBtn;
    if (!btn) return;
    btn.classList.remove('downloading-active');
    requestAnimationFrame(() => { requestAnimationFrame(() => { btn.classList.add('downloading-active'); }); });
    setTimeout(() => { if (btn) btn.classList.remove('downloading-active'); }, 750);
}

/* =========================================================
   AMBIENT INTERACTIVE BACKGROUND ENGINE
========================================================= */

function initAmbientBackground() {
    const canvas = elements.ambientCanvas;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0; let height = 0; let dpr = 1; let animationFrameId = null;

    const particles = [];
    const PARTICLE_COUNT = 45; const MAX_DISTANCE = 130; const MOUSE_RADIUS = 150;
    const mouse = { x: null, y: null };

    function resize() {
        dpr = window.devicePixelRatio || 1;
        width = canvas.parentElement?.clientWidth || window.innerWidth;
        height = canvas.parentElement?.clientHeight || window.innerHeight;
        canvas.width = width * dpr; canvas.height = height * dpr;
        canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        createParticles();
    }

    function createParticles() {
        particles.length = 0;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width, y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
                radius: Math.random() * 1.5 + 1.2
            });
        }
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

    function render() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy;

            if (p.x < 0) p.x = width; else if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height; else if (p.y > height) p.y = 0;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = p.x - mouse.x; const dy = p.y - mouse.y; const dist = Math.hypot(dx, dy);
                if (dist < MOUSE_RADIUS && dist > 0) {
                    const force = (1 - dist / MOUSE_RADIUS) * 1.2;
                    p.x += (dx / dist) * force; p.y += (dy / dist) * force;
                }
            }

            ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(138, 180, 248, 0.18)'; ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x; const dy = p.y - p2.y; const dist = Math.hypot(dx, dy);
                if (dist < MAX_DISTANCE) {
                    const alpha = (1 - dist / MAX_DISTANCE) * 0.08;
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(138, 180, 248, ${alpha})`; ctx.lineWidth = 1; ctx.stroke();
                }
            }
        }
        animationFrameId = requestAnimationFrame(render);
    }
    resize(); render();
}

/* =========================================================
   SEARCH SUGGESTIONS LOGIC
========================================================= */

function handleSearchInput(e, suggestionsEl) {
    const query = e.target.value.trim().toLowerCase();
    
    if (!query || query.includes('http') || query.includes('.')) { 
        if(suggestionsEl) suggestionsEl.hidden = true; 
        return; 
    }

    let saved = {};
    try { saved = JSON.parse(localStorage.getItem('linkstate_saved_aliases')) || {}; } catch(err){}

    // Match query against saved aliases, ensuring it strictly STARTS WITH the typed text
    const matches = Object.keys(saved).filter(key => {
        const cleanKey = key.replace('.linkstate', '');
        return cleanKey.startsWith(query);
    });

    if (matches.length === 0) {
        if(suggestionsEl) suggestionsEl.hidden = true;
        return;
    }

    if(suggestionsEl) {
        suggestionsEl.innerHTML = '';
        matches.slice(0, 5).forEach(match => {
            const cleanName = match.replace('.linkstate', '');
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerHTML = `<svg class="suggestion-icon" viewBox="0 0 24 24" style="width:16px;height:16px;"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                             <span>${cleanName}</span><span style="color:var(--text-muted); font-size:0.75rem; margin-left:auto;">.linkstate</span>`;
            
            div.onclick = () => {
                if(elements.linkInput) elements.linkInput.value = match;
                if(elements.heroLinkInput) elements.heroLinkInput.value = match;
                suggestionsEl.hidden = true;
                openLinkstate();
            };
            suggestionsEl.appendChild(div);
        });
        suggestionsEl.hidden = false;
    }
}

/* =========================================================
   EVENTS
========================================================= */

function bindEvents() {

    document.addEventListener('dragover', (e) => e.preventDefault());
    document.addEventListener('drop', (e) => e.preventDefault());

    elements.openButton?.addEventListener('click', () => { openLinkstate(); });
    
    elements.linkInput?.addEventListener('keydown', (event) => { 
        if (event.key === 'Enter') { 
            event.preventDefault(); 
            if(elements.topSuggestions) elements.topSuggestions.hidden = true;
            openLinkstate(); 
        } 
    });
    
    elements.linkInput?.addEventListener('input', (e) => { 
        syncInputsFromTop(); 
        updateClearButton(); 
        handleSearchInput(e, elements.topSuggestions);
    });

    elements.heroOpenButton?.addEventListener('click', () => { syncInputsFromHero(); openLinkstate(); });
    
    elements.heroLinkInput?.addEventListener('keydown', (event) => { 
        if (event.key === 'Enter') { 
            event.preventDefault(); 
            syncInputsFromHero(); 
            if(elements.heroSuggestions) elements.heroSuggestions.hidden = true;
            openLinkstate(); 
        } 
    });
    
    elements.heroLinkInput?.addEventListener('input', (e) => { 
        syncInputsFromHero(); 
        updateClearButton(); 
        handleSearchInput(e, elements.heroSuggestions);
    });
    
    elements.clearInputButton?.addEventListener('click', () => {
        if (elements.linkInput) elements.linkInput.value = '';
        if (elements.heroLinkInput) elements.heroLinkInput.value = '';
        updateClearButton();
        if(elements.topSuggestions) elements.topSuggestions.hidden = true;
        if(elements.heroSuggestions) elements.heroSuggestions.hidden = true;
        if (elements.emptyState && !elements.emptyState.hidden) elements.heroLinkInput?.focus();
        else elements.linkInput?.focus();
    });

    elements.homeButton?.addEventListener('click', returnHome);
    elements.errorBackButton?.addEventListener('click', returnHome);

    elements.openGenerateView?.addEventListener('click', () => setView('generate'));
    elements.genBackButton?.addEventListener('click', returnHome);
    elements.genFolderInput?.addEventListener('change', handleFileInputChange);
    elements.genFileInput?.addEventListener('change', handleFileInputChange);

    elements.toolbarDownloadBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.downloadsPopover.hidden = !elements.downloadsPopover.hidden;
    });

    elements.closeDownloadsPopover?.addEventListener('click', () => {
        elements.downloadsPopover.hidden = true;
    });

    elements.openFullDownloadsBtn?.addEventListener('click', () => {
        elements.downloadsPopover.hidden = true;
        openDownloadsPage();
    });

    elements.dismissPopoverBtn?.addEventListener('click', () => {
        if (elements.neverShowPopoverCheck?.checked) {
            localStorage.setItem('linkstate_hide_tooltip', 'true');
        }
        if (elements.extractPopover) elements.extractPopover.hidden = true;
    });

    if (elements.genActionContainer) {
        elements.genActionContainer.addEventListener('dragenter', (e) => {
            e.preventDefault();
            e.stopPropagation();
            elements.genActionContainer.classList.add('drag-over');
        });
        elements.genActionContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            elements.genActionContainer.classList.add('drag-over');
        });
        elements.genActionContainer.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!elements.genActionContainer.contains(e.relatedTarget)) {
                elements.genActionContainer.classList.remove('drag-over');
            }
        });
        elements.genActionContainer.addEventListener('drop', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            elements.genActionContainer.classList.remove('drag-over');
            try {
                const files = await readDroppedItems(e.dataTransfer);
                await processAndPackageFiles(files);
            } catch (err) {
                console.error(err);
                showStatus(err.message || 'The dropped files could not be read.');
            }
        });
    }
    
    elements.genCopyButton?.addEventListener('click', () => {
        const linkInput = elements.genResultLink;
        linkInput.select();
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(linkInput.value).then(() => { showStatus('Link copied to clipboard!'); }).catch(() => { document.execCommand('copy'); showStatus('Link copied to clipboard!'); });
        } else {
            document.execCommand('copy');
            showStatus('Link copied to clipboard!');
        }
    });
    
    elements.genDownloadButton?.addEventListener('click', () => {
        const link = elements.genResultLink?.value;
        if (!link) return;
        const blob = new Blob([link], { type: 'text/plain' });
        const filename = elements.genDownloadButton.dataset.filename || 'linkstate.onestate';
        downloadBlob(blob, filename);
        showStatus('.onestate file downloaded successfully.');
    });
    
    elements.genOpenButton?.addEventListener('click', () => { openLinkstate(); });
    
    elements.genResetButton?.addEventListener('click', () => {
        if (elements.genResultContainer) elements.genResultContainer.style.display = 'none';
        if (elements.genActionContainer) elements.genActionContainer.style.display = 'flex';
        if (elements.genDescription) elements.genDescription.textContent = 'Package a static website into a single portable link.';
        if (elements.genResetButton) elements.genResetButton.style.display = 'none';
        if (elements.genFooterDivider) elements.genFooterDivider.style.display = 'none';
        if (elements.genResultLink) elements.genResultLink.value = '';
        if (elements.genFolderInput) elements.genFolderInput.value = '';
        if (elements.genFileInput) elements.genFileInput.value = '';
        if (elements.heroLinkInput) elements.heroLinkInput.value = '';
        if (elements.linkInput) elements.linkInput.value = '';
        if (elements.genDownloadButton) elements.genDownloadButton.dataset.filename = '';
        hideStatus();
    });

    elements.backButton?.addEventListener('click', () => {
        const isWeb = elements.standardWebFrame && !elements.standardWebFrame.hidden;
        if (isWeb) {
            if (elements.standardWebFrame.canGoBack()) elements.standardWebFrame.goBack();
        } else if (historyIndex > 0) {
            historyIndex--;
            isNavigatingHistory = true;
            renderViewerPage(historyStack[historyIndex]).then(() => { isNavigatingHistory = false; });
        }
    });

    elements.forwardButton?.addEventListener('click', () => {
        const isWeb = elements.standardWebFrame && !elements.standardWebFrame.hidden;
        if (isWeb) {
            if (elements.standardWebFrame.canGoForward()) elements.standardWebFrame.goForward();
        } else if (historyIndex < historyStack.length - 1) {
            historyIndex++;
            isNavigatingHistory = true;
            renderViewerPage(historyStack[historyIndex]).then(() => { isNavigatingHistory = false; });
        }
    });

    elements.refreshButton?.addEventListener('click', () => {
        const isWeb = elements.standardWebFrame && !elements.standardWebFrame.hidden;
        if (isWeb) {
            if (elements.refreshButton.dataset.state === 'stop') {
                elements.standardWebFrame.stop();
            } else {
                elements.standardWebFrame.reload();
            }
        } else if (historyIndex >= 0) {
            isNavigatingHistory = true;
            renderViewerPage(historyStack[historyIndex]).then(() => {
                isNavigatingHistory = false;
                showStatus('Page reloaded locally.');
            });
        }
    });

    elements.recoverButton?.addEventListener('click', openRecoveryPanel);
    elements.closeRecoveryButton?.addEventListener('click', closeRecoveryPanel);
    elements.downloadProjectButton?.addEventListener('click', downloadEntireProject);
    elements.recoveryOverlay?.addEventListener('click', (event) => { if (event.target === elements.recoveryOverlay) closeRecoveryPanel(); });

    window.addEventListener('message', handleViewerMessage);

    elements.braveMenuButton?.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.browserMenu.hidden = !elements.browserMenu.hidden;
    });

    document.addEventListener('click', (e) => {
        if (elements.browserMenu && !elements.browserMenu.contains(e.target) && e.target !== elements.braveMenuButton) {
            elements.browserMenu.hidden = true;
        }
        if (elements.downloadsPopover && !elements.downloadsPopover.contains(e.target) && e.target !== elements.toolbarDownloadBtn) {
            elements.downloadsPopover.hidden = true;
        }
        if (!e.target.closest('.address-bar-shell') && elements.topSuggestions) {
            elements.topSuggestions.hidden = true;
        }
        if (!e.target.closest('.hero-search-shell') && elements.heroSuggestions) {
            elements.heroSuggestions.hidden = true;
        }
    });

    elements.menuNewTab?.addEventListener('click', () => {
        elements.browserMenu.hidden = true;
        document.getElementById('newTabBtn')?.click();
    });

    elements.menuHistoryPage?.addEventListener('click', () => {
        elements.browserMenu.hidden = true;
        openHistoryPage();
    });
    
    elements.menuDownloadsPage?.addEventListener('click', () => {
        elements.browserMenu.hidden = true;
        openDownloadsPage();
    });

    elements.menuSavedStatesPage?.addEventListener('click', () => {
        elements.browserMenu.hidden = true;
        openSavedStatesPage();
    });

    elements.menuPersonalizationPage?.addEventListener('click', () => {
        elements.browserMenu.hidden = true;
        openPersonalizationPage();
    });

    elements.menuAboutBrowser?.addEventListener('click', () => {
        elements.browserMenu.hidden = true;
        createTab();
        if (elements.linkInput) elements.linkInput.value = 'linkstate://about';
        openLinkstate();
    });

    elements.menuOpenOnestate?.addEventListener('click', () => {
        elements.browserMenu.hidden = true;
        elements.onestateFileInput?.click();
    });

    elements.onestateFileInput?.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        try {
            const content = await file.text();
            if (elements.linkInput) elements.linkInput.value = content;
            if (elements.heroLinkInput) elements.heroLinkInput.value = content;
            openLinkstate();
        } catch (e) {
            showError("Could not read the .onestate file.");
        }
        event.target.value = ''; 
    });

    elements.menuClearData?.addEventListener('click', () => {
        elements.browserMenu.hidden = true;
        localStorage.removeItem('linkstate_history');
        localStorage.removeItem('linkstate_downloads');
        renderMiniHistory();
        renderMiniDownloads();
        renderPopoverDownloads();
        if (!elements.historyState.hidden) renderFullHistory();
        if (!elements.downloadsState.hidden) renderFullDownloads();
        showStatus('Browsing data cleared.');
    });
    
    elements.clearHistoryPageBtn?.addEventListener('click', () => {
        localStorage.removeItem('linkstate_history');
        renderMiniHistory();
        renderFullHistory();
        showStatus('History cleared.');
    });

    elements.clearDownloadsPageBtn?.addEventListener('click', () => {
        localStorage.removeItem('linkstate_downloads');
        renderMiniDownloads();
        renderPopoverDownloads();
        renderFullDownloads();
        showStatus('Downloads cleared.');
    });

    elements.menuExit?.addEventListener('click', () => {
        window.close();
    });

    /* =====================================================
       SAVE ALIAS LOGIC
    ====================================================== */
    
    elements.saveStateBtn?.addEventListener('click', () => {
        if (elements.saveModal) elements.saveModal.hidden = false;
        elements.saveNameInput?.focus();
    });

    elements.cancelSaveBtn?.addEventListener('click', () => {
        if (elements.saveModal) elements.saveModal.hidden = true;
        elements.saveNameInput.value = '';
    });

    elements.confirmSaveBtn?.addEventListener('click', () => {
        let name = elements.saveNameInput.value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
        if (!name) return showError("Please enter a valid name.");
        
        if (!name.endsWith('.linkstate')) name += '.linkstate';
        
        let saved = {};
        try { saved = JSON.parse(localStorage.getItem('linkstate_saved_aliases')) || {}; } catch(e){}
        
        if (saved[name]) {
            showStatus("That name is already taken!");
            return;
        }
        
        saved[name] = elements.linkInput.value;
        localStorage.setItem('linkstate_saved_aliases', JSON.stringify(saved));
        
        elements.saveModal.hidden = true;
        elements.saveNameInput.value = '';
        showStatus(`Saved! You can now type ${name} in the search bar.`);
        
        if (elements.savedStatesState && !elements.savedStatesState.hidden) {
            renderFullSavedStates();
        }
    });

    /* =====================================================
       PERSONALIZATION (THEME & WALLPAPER)
    ====================================================== */

    elements.themeGrid?.addEventListener('click', (e) => {
        const swatch = e.target.closest('.brave-swatch');
        if (swatch) {
            if (swatch.id === 'customColorPickerBtn') return; 
            setAccentColor(swatch.dataset.accent);
            document.querySelectorAll('.brave-swatch').forEach(el => el.classList.remove('active-swatch'));
            swatch.classList.add('active-swatch');
        }
    });

    elements.customColorPickerBtn?.addEventListener('click', () => {
        elements.customColorInput?.click();
    });

    elements.customColorInput?.addEventListener('input', (e) => {
        const color = e.target.value;
        setAccentColor('custom', color);
        document.querySelectorAll('.brave-swatch').forEach(el => el.classList.remove('active-swatch'));
        elements.customColorPickerBtn.classList.add('active-swatch');
        elements.customColorPickerBtn.querySelector('.swatch-circle').style.background = color;
    });

    elements.uploadWallpaperBtn?.addEventListener('click', () => {
        elements.wallpaperInput?.click();
    });
    
    elements.wallpaperInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            saveWallpaper(event.target.result);
        };
        reader.readAsDataURL(file);
    });

    elements.clearWallpaperBtn?.addEventListener('click', () => {
        removeWallpaper();
        renderRecentWallpapers();
    });

    /* =====================================================
       GLOBAL KEYBOARD SHORTCUTS
    ====================================================== */
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && elements.recoveryOverlay && !elements.recoveryOverlay.hidden) {
            closeRecoveryPanel();
            return;
        }

        const isCtrl = event.ctrlKey || event.metaKey;

        if (isCtrl && event.key.toLowerCase() === 'l') {
            event.preventDefault();
            elements.linkInput?.focus();
            elements.linkInput?.select();
        }

        if (isCtrl && event.key.toLowerCase() === 't') {
            event.preventDefault();
            createTab();
        }
        
        if (isCtrl && event.key.toLowerCase() === 'h') {
            event.preventDefault();
            openHistoryPage();
        }

        if (isCtrl && event.key.toLowerCase() === 'j') {
            event.preventDefault();
            openDownloadsPage();
        }

        if (isCtrl && event.key.toLowerCase() === 'w') {
            event.preventDefault();
            if (activeTabId) closeTab(activeTabId);
        }

        if ((isCtrl && event.key.toLowerCase() === 'r') || event.key === 'F5') {
            event.preventDefault();
            elements.refreshButton?.click();
        }

        if (isCtrl && event.key === 'Tab') {
            event.preventDefault();
            if (appTabs.length > 1) {
                const currentIndex = appTabs.findIndex(t => t.id === activeTabId);
                const nextIndex = (currentIndex + 1) % appTabs.length;
                switchTab(appTabs[nextIndex].id);
            }
        }

        if (event.key === 'F12') {
            event.preventDefault();
            if (elements.standardWebFrame && !elements.standardWebFrame.hidden) {
                if (elements.standardWebFrame.isDevToolsOpened()) {
                    elements.standardWebFrame.closeDevTools();
                } else {
                    elements.standardWebFrame.openDevTools();
                }
            }
        }
    });
}

function setRefreshIconState(state) {
    if (!elements.refreshButton) return;
    elements.refreshButton.dataset.state = state;
    
    if (state === 'stop') {
        elements.refreshButton.innerHTML = `<svg viewBox="0 0 24 24"><path d="M18 6L6 18"></path><path d="M6 6L18 18"></path></svg>`;
        elements.refreshButton.title = 'Stop loading';
    } else {
        elements.refreshButton.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 11A8 8 0 1 0 18 16"></path><path d="M20 5V11H14"></path></svg>`;
        elements.refreshButton.title = 'Refresh';
    }
}

function syncInputsFromTop() { if (elements.linkInput && elements.heroLinkInput) elements.heroLinkInput.value = elements.linkInput.value; }
function syncInputsFromHero() { if (elements.linkInput && elements.heroLinkInput) elements.linkInput.value = elements.heroLinkInput.value; }

function updateNavigationButtons() {
    const isWeb = elements.standardWebFrame && !elements.standardWebFrame.hidden;

    if (isWeb) {
        const canGoBack = elements.standardWebFrame.canGoBack();
        const canGoForward = elements.standardWebFrame.canGoForward();
        
        if (elements.backButton) {
            elements.backButton.disabled = !canGoBack;
            elements.backButton.title = canGoBack ? 'Back' : 'Back unavailable';
            elements.backButton.setAttribute('aria-label', canGoBack ? 'Back' : 'Back unavailable');
        }
        if (elements.forwardButton) {
            elements.forwardButton.disabled = !canGoForward;
            elements.forwardButton.title = canGoForward ? 'Forward' : 'Forward unavailable';
            elements.forwardButton.setAttribute('aria-label', canGoForward ? 'Forward' : 'Forward unavailable');
        }
        if (elements.refreshButton) {
            elements.refreshButton.disabled = false;
        }
    } else if (!activePackageData) {
        disableNavigationButtons();
    } else {
        if (elements.backButton) {
            const canGoBack = historyIndex > 0;
            elements.backButton.disabled = !canGoBack;
            elements.backButton.title = canGoBack ? 'Back' : 'Back unavailable';
        }
        if (elements.forwardButton) {
            const canGoForward = historyIndex < historyStack.length - 1;
            elements.forwardButton.disabled = !canGoForward;
            elements.forwardButton.title = canGoForward ? 'Forward' : 'Forward unavailable';
        }
        if (elements.refreshButton) {
            elements.refreshButton.disabled = false;
        }
    }
}

function disableNavigationButtons() {
    if (elements.backButton) { elements.backButton.disabled = true; elements.backButton.title = 'Back unavailable'; }
    if (elements.forwardButton) { elements.forwardButton.disabled = true; elements.forwardButton.title = 'Forward unavailable'; }
    if (elements.refreshButton) { elements.refreshButton.disabled = true; elements.refreshButton.title = 'Refresh unavailable'; }
}

async function openLinkstate() {
    let input = elements.linkInput?.value.trim() || elements.heroLinkInput?.value.trim() || '';

    if (!input) {
        showStatus('Paste a LINKSTATE or Web URL first.');
        if (elements.emptyState && !elements.emptyState.hidden) elements.heroLinkInput?.focus();
        else elements.linkInput?.focus();
        return;
    }

    let saved = {};
    try { saved = JSON.parse(localStorage.getItem('linkstate_saved_aliases')) || {}; } catch(e){}
    
    if (input.toLowerCase().endsWith('.linkstate') && saved[input.toLowerCase()]) {
        input = saved[input.toLowerCase()];
    }

    const isLinkstate = input.includes('linkstate.local') || input.includes('#site=') || /^g\./.test(input) || /^u\./.test(input) || input.includes('"format":"onestate"');

    if (input === 'linkstate://history') { openHistoryPage(); return; }
    if (input === 'linkstate://downloads') { openDownloadsPage(); return; }
    if (input === 'linkstate://saved') { openSavedStatesPage(); return; }
    if (input === 'linkstate://personalization') { openPersonalizationPage(); return; }
    if (input === 'linkstate://about') { openAboutPage(); return; }

    if (!isLinkstate) {
        let targetUrl = input;
        
        if (input.includes(' ') || !input.includes('.')) {
            targetUrl = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
        } 
        else if (!/^https?:\/\//i.test(input)) {
            targetUrl = `https://${input}`;
        }

        if (elements.linkInput) elements.linkInput.value = targetUrl;
        if (elements.heroLinkInput) elements.heroLinkInput.value = targetUrl;

        setTabTitle('Loading...');
        showStatus('Navigating...');
        
        if (elements.runtimeStatus) elements.runtimeStatus.textContent = 'Live Web Browsing';
        if (elements.recoverButton) elements.recoverButton.disabled = true; 
        if (elements.extractPopover) elements.extractPopover.hidden = true; 
        
        activePackageData = null;
        updateProjectInformation(); 
        historyStack = [];
        historyIndex = -1;
        updateNavigationButtons();

        setView('viewer-web');
        setTimeout(() => { if (elements.standardWebFrame) elements.standardWebFrame.src = targetUrl; }, 50);
        return;
    }

    if (elements.linkInput) elements.linkInput.value = input;
    if (elements.heroLinkInput) elements.heroLinkInput.value = input;

    setTabTitle('Opening LINKSTATE...');
    setLoading('Decoding LINKSTATE', 'Reading the portable website data locally...');
    showStatus('Decoding locally...');

    if (elements.openButton) elements.openButton.disabled = true;
    if (elements.heroOpenButton) elements.heroOpenButton.disabled = true;

    try {
        await wait(40);
        const payload = extractPayload(input);
        const packageData = await decodePackage(payload);
        validatePackage(packageData);

        activePackageData = packageData;
        activePagePath = normalizePath(packageData.entry);

        setLoading('Rebuilding website', 'Preparing HTML, CSS, JavaScript and local assets...');
        await wait(20);

        historyStack = [];
        historyIndex = -1;
        await renderViewerPage(activePagePath);

        if (elements.recoverButton) elements.recoverButton.disabled = false;
        
        if (localStorage.getItem('linkstate_hide_tooltip') !== 'true') {
            if (elements.extractPopover) elements.extractPopover.hidden = false;
        }

        updateProjectInformation();
        const projectName = packageData.name || 'LINKSTATE';
        setTabTitle(projectName);
        showStatus(`${projectName} opened locally.`);
        if (elements.runtimeStatus) elements.runtimeStatus.textContent = 'Decoded locally';
        
        recordHistory('local', projectName, input);

    } catch (error) {
        console.error('[LINKSTATE] open failed:', error);
        activePackageData = null;
        activePagePath = null;
        if (elements.recoverButton) elements.recoverButton.disabled = true;
        setTabTitle('LINKSTATE Error');
        showError(error?.message || 'This LINKSTATE could not be decoded.');
        showStatus('Could not open LINKSTATE.');
    } finally {
        if (elements.openButton) elements.openButton.disabled = false;
        if (elements.heroOpenButton) elements.heroOpenButton.disabled = false;
    }
}

function extractPayload(value) {
    const input = String(value || '').trim();
    if (!input) throw new Error('Paste a LINKSTATE first.');
    if (/^[gu]\.[A-Za-z0-9_-]+$/.test(input)) return input;
    let url;
    try { url = new URL(input, window.location.href); } catch { throw new Error('Enter a valid LINKSTATE.'); }
    const hashParameters = new URLSearchParams(url.hash.startsWith('#') ? url.hash.slice(1) : url.hash);
    let payload = hashParameters.get('site');
    if (!payload) payload = url.searchParams.get('site');
    if (!payload) throw new Error('This does not contain LINKSTATE website data.');
    return payload;
}

async function decodePackage(payload) {
    if (payload.startsWith('{') && payload.includes('"format"')) {
        try { return JSON.parse(payload); } catch(e) {}
    }

    const separatorIndex = payload.indexOf('.');
    if (separatorIndex === -1) throw new Error('Unsupported LINKSTATE data format.');
    const mode = payload.slice(0, separatorIndex);
    const encodedData = payload.slice(separatorIndex + 1);
    if (!encodedData) throw new Error('The LINKSTATE data is incomplete.');

    let encodedBytes;
    try { encodedBytes = base64UrlToBytes(encodedData); } catch { throw new Error('The LINKSTATE data is damaged or incomplete.'); }

    let jsonBytes;
    if (mode === 'g') {
        if (!('DecompressionStream' in window)) throw new Error('This LINKSTATE Browser build cannot decompress gzip data.');
        try { jsonBytes = await transformBytes(encodedBytes, new DecompressionStream('gzip')); } catch { throw new Error('The compressed LINKSTATE is incomplete or damaged.'); }
    } else if (mode === 'u') {
        jsonBytes = encodedBytes;
    } else {
        throw new Error('Unknown LINKSTATE encoding mode.');
    }

    try {
        const json = new TextDecoder().decode(jsonBytes);
        return JSON.parse(json);
    } catch {
        throw new Error('The LINKSTATE package could not be read.');
    }
}

async function transformBytes(bytes, transformStream) {
    const stream = new Blob([bytes]).stream().pipeThrough(transformStream);
    const reader = stream.getReader();
    const chunks = [];
    let totalLength = 0;

    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = value instanceof Uint8Array ? value : new Uint8Array(value);
            chunks.push(chunk);
            totalLength += chunk.byteLength;
        }
    } finally {
        reader.releaseLock();
    }

    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return result;
}

function validatePackage(packageData) {
    const valid = packageData && (packageData.format === 'linkstate' || packageData.format === 'onestate') && packageData.version === 1 && Array.isArray(packageData.files) && typeof packageData.entry === 'string';
    if (!valid) throw new Error('This is not a valid LINKSTATE or ONESTATE package.');
    if (!packageData.files.length) throw new Error('This LINKSTATE contains no project files.');

    for (const record of packageData.files) {
        if (!record || typeof record.path !== 'string' || !['text', 'base64'].includes(record.encoding) || typeof record.data !== 'string') {
            throw new Error('One or more LINKSTATE files are invalid.');
        }
        const safePath = normalizePath(record.path);
        if (!safePath || isUnsafeProjectPath(record.path)) throw new Error('The LINKSTATE contains an unsafe file path.');
    }

    const entry = normalizePath(packageData.entry);
    const entryRecord = packageData.files.find((record) => normalizePath(record.path) === entry);

    if (!entryRecord || entryRecord.encoding !== 'text' || !isHtmlFile(entry)) throw new Error('The LINKSTATE is missing its entry HTML file.');
}

function isUnsafeProjectPath(value) {
    const path = String(value || '').replace(/\\/g, '/');
    return (path.startsWith('/') || /^[A-Za-z]:\//.test(path) || path.split('/').includes('..'));
}

async function renderViewerPage(pagePath) {
    if (!activePackageData || !elements.websiteFrame) return;

    const fileMap = createFileMap(activePackageData);
    const targetPath = findHtmlTarget(pagePath, fileMap);

    if (!targetPath) throw new Error(`The page "${pagePath}" was not found inside this LINKSTATE.`);

    const html = await buildStandaloneWebsite(activePackageData, targetPath);
    activePagePath = targetPath;
        
    if (!isNavigatingHistory) {
        historyStack = historyStack.slice(0, historyIndex + 1);
        historyStack.push(targetPath);
        historyIndex++;
    }
    updateNavigationButtons();

    setView('viewer');

    await new Promise((resolve) => {
        let finished = false;
        const finish = () => { if (finished) return; finished = true; resolve(); };
        elements.websiteFrame.addEventListener('load', finish, { once: true });
        elements.websiteFrame.srcdoc = html;
        window.setTimeout(finish, 1500);
    });
}

function createFileMap(packageData) {
    return new Map(packageData.files.map((record) => [normalizePath(record.path), record]));
}

async function handleViewerMessage(event) {
    if (!elements.websiteFrame || event.source !== elements.websiteFrame.contentWindow || !event.data) return;

    if (event.data.type === 'linkstate:navigate') {
        try {
            showStatus('Opening internal page...');
            await renderViewerPage(normalizePath(event.data.path));
            showStatus('Page loaded locally.');
        } catch (error) {
            console.error('[LINKSTATE] navigation failed:', error);
            showStatus(error?.message || 'Could not open that page.');
        }
        return;
    }
    if (event.data.type === 'linkstate:external-blocked') {
        showStatus('External browsing is disabled in LINKSTATE Browser.');
    }
}

async function buildStandaloneWebsite(packageData, requestedEntryPath = packageData.entry) {
    const fileMap = new Map(packageData.files.map((record) => [normalizePath(record.path), record]));
    const entryPath = normalizePath(requestedEntryPath);
    const entryRecord = fileMap.get(entryPath);

    if (!entryRecord || entryRecord.encoding !== 'text') throw new Error(`The page "${entryPath}" is missing or unreadable.`);

    const parser = new DOMParser();
    const documentObject = parser.parseFromString(entryRecord.data, 'text/html');

    documentObject.querySelectorAll('base').forEach((element) => element.remove());
    documentObject.querySelectorAll('meta[http-equiv]').forEach((meta) => {
        const value = meta.getAttribute('http-equiv')?.toLowerCase();
        if (value === 'content-security-policy') meta.remove();
    });

    await inlineStylesheets(documentObject, entryPath, fileMap);
    await inlineScripts(documentObject, entryPath, fileMap);
    await inlineMediaAttributes(documentObject, entryPath, fileMap);
    await rewriteInlineStyles(documentObject, entryPath, fileMap);
    rewriteHtmlPageLinks(documentObject, entryPath, fileMap);

    const marker = documentObject.createComment(' Opened locally through LINKSTATE. Server-side features are unavailable. ');
    documentObject.documentElement.insertBefore(marker, documentObject.head);

    return '<!DOCTYPE html>\n' + documentObject.documentElement.outerHTML;
}

function rewriteHtmlPageLinks(documentObject, entryPath, fileMap) {
    const links = Array.from(documentObject.querySelectorAll('a[href]'));
    for (const link of links) {
        const href = link.getAttribute('href');
        const resolvedPath = resolveInternalPath(entryPath, href);
        if (!resolvedPath) continue;
        const targetPath = findHtmlTarget(resolvedPath, fileMap);
        if (!targetPath) continue;
        link.setAttribute('data-linkstate-path', targetPath);
        link.setAttribute('href', '#');
        link.removeAttribute('target');
    }
    injectNavigationRuntime(documentObject);
}

function injectNavigationRuntime(documentObject) {
    const oldRuntime = documentObject.querySelector('[data-linkstate-runtime]');
    if (oldRuntime) oldRuntime.remove();
    const runtimeScript = documentObject.createElement('script');
    runtimeScript.setAttribute('data-linkstate-runtime', '');
    runtimeScript.textContent = `
        document.addEventListener('click', function (event) {
            const link = event.target.closest('a[data-linkstate-path]');
            if (!link) return;
            event.preventDefault();
            window.parent.postMessage({ type: 'linkstate:navigate', path: link.dataset.linkstatePath }, '*');
        });
    `;
    documentObject.body.appendChild(runtimeScript);
}

function findHtmlTarget(requestedPath, fileMap) {
    const normalizedPath = normalizePath(requestedPath);
    if (fileMap.has(normalizedPath) && isHtmlFile(normalizedPath)) return normalizedPath;
    const directoryIndex = normalizePath(`${normalizedPath}/index.html`);
    if (normalizedPath && fileMap.has(directoryIndex)) return directoryIndex;
    if (!normalizedPath && fileMap.has('index.html')) return 'index.html';
    return null;
}

async function inlineStylesheets(documentObject, entryPath, fileMap) {
    const links = Array.from(documentObject.querySelectorAll('link[rel~="stylesheet"][href]'));
    for (const link of links) {
        const resolvedPath = resolveInternalPath(entryPath, link.getAttribute('href'));
        if (!resolvedPath || !fileMap.has(resolvedPath)) continue;
        const record = fileMap.get(resolvedPath);
        if (record.encoding !== 'text') continue;
        const cssText = await rewriteCss(record.data, resolvedPath, fileMap, new Set());
        const style = documentObject.createElement('style');
        style.setAttribute('data-linkstate-source', resolvedPath);
        style.textContent = cssText.replace(/<\/style/gi, '<\\/style');
        link.replaceWith(style);
    }
}

async function inlineScripts(documentObject, entryPath, fileMap) {
    const scripts = Array.from(documentObject.querySelectorAll('script[src]'));
    for (const script of scripts) {
        const resolvedPath = resolveInternalPath(entryPath, script.getAttribute('src'));
        if (!resolvedPath || !fileMap.has(resolvedPath)) continue;
        const record = fileMap.get(resolvedPath);
        if (record.encoding !== 'text') continue;
        script.removeAttribute('src');
        script.setAttribute('data-linkstate-source', resolvedPath);
        script.textContent = record.data.replace(/<\/script/gi, '<\\/script');
        if (script.hasAttribute('defer')) {
            script.removeAttribute('defer');
            documentObject.body.appendChild(script);
        }
    }
}

async function inlineMediaAttributes(documentObject, entryPath, fileMap) {
    const rules = [
        ['img[src]', 'src'], ['source[src]', 'src'], ['video[src]', 'src'],
        ['video[poster]', 'poster'], ['audio[src]', 'src'], ['track[src]', 'src'],
        ['embed[src]', 'src'], ['object[data]', 'data'], ['input[type="image"][src]', 'src'],
        ['link[rel~="icon"][href]', 'href']
    ];
    for (const [selector, attribute] of rules) {
        const nodes = documentObject.querySelectorAll(selector);
        for (const node of nodes) {
            const value = node.getAttribute(attribute);
            const resolvedPath = resolveInternalPath(entryPath, value);
            if (!resolvedPath || !fileMap.has(resolvedPath)) continue;
            node.setAttribute(attribute, recordToDataUrl(fileMap.get(resolvedPath)));
        }
    }
    await rewriteSrcsetAttributes(documentObject, entryPath, fileMap);
}

async function rewriteSrcsetAttributes(documentObject, entryPath, fileMap) {
    const nodes = documentObject.querySelectorAll('[srcset]');
    for (const node of nodes) {
        const srcset = node.getAttribute('srcset');
        const rewritten = srcset.split(',').map((candidate) => {
            const trimmed = candidate.trim();
            if (!trimmed) return trimmed;
            const firstSpace = trimmed.search(/\s/);
            const source = firstSpace === -1 ? trimmed : trimmed.slice(0, firstSpace);
            const descriptor = firstSpace === -1 ? '' : trimmed.slice(firstSpace);
            const resolvedPath = resolveInternalPath(entryPath, source);
            if (!resolvedPath || !fileMap.has(resolvedPath)) return trimmed;
            return recordToDataUrl(fileMap.get(resolvedPath)) + descriptor;
        }).join(', ');
        node.setAttribute('srcset', rewritten);
    }
}

async function rewriteInlineStyles(documentObject, entryPath, fileMap) {
    const styles = documentObject.querySelectorAll('style');
    for (const style of styles) {
        if (style.hasAttribute('data-linkstate-source')) continue;
        style.textContent = await rewriteCss(style.textContent, entryPath, fileMap, new Set());
    }
    const nodes = documentObject.querySelectorAll('[style]');
    for (const node of nodes) {
        node.setAttribute('style', await rewriteCss(node.getAttribute('style'), entryPath, fileMap, new Set()));
    }
}

async function rewriteCss(cssText, cssPath, fileMap, visitedPaths) {
    const visited = new Set(visitedPaths);
    visited.add(cssPath);
    let output = await replaceAsync(cssText, /@import\s+(?:url\()?\s*["']?([^"')\s;]+)["']?\s*\)?\s*;/gi, async (fullMatch, reference) => {
        const importedPath = resolveInternalPath(cssPath, reference);
        if (!importedPath || !fileMap.has(importedPath) || visited.has(importedPath)) return fullMatch;
        const record = fileMap.get(importedPath);
        if (record.encoding !== 'text') return fullMatch;
        return rewriteCss(record.data, importedPath, fileMap, visited);
    });
    output = await replaceAsync(output, /url\(\s*(["']?)([^"')]+)\1\s*\)/gi, async (fullMatch, quote, reference) => {
        const resolvedPath = resolveInternalPath(cssPath, reference.trim());
        if (!resolvedPath || !fileMap.has(resolvedPath)) return fullMatch;
        return `url("${recordToDataUrl(fileMap.get(resolvedPath))}")`;
    });
    return output;
}

function resolveInternalPath(baseFilePath, reference) {
    if (!reference) return null;
    const trimmed = reference.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//') || /^(?:data|blob|mailto|tel|javascript):/i.test(trimmed) || /^[a-z][a-z\d+.-]*:/i.test(trimmed)) {
        return null;
    }
    const cleanReference = trimmed.split('#')[0].split('?')[0];
    try {
        const baseUrl = new URL(normalizePath(baseFilePath), 'https://linkstate.local/');
        const resolvedUrl = new URL(cleanReference, baseUrl);
        return normalizePath(decodeURIComponent(resolvedUrl.pathname).replace(/^\//, ''));
    } catch {
        return null;
    }
}

function normalizePath(path) {
    const parts = String(path || '').replace(/\\/g, '/').split('/');
    const normalized = [];
    for (const part of parts) {
        if (!part || part === '.') continue;
        if (part === '..') { normalized.pop(); continue; }
        normalized.push(part);
    }
    return normalized.join('/');
}

function getExtension(path) {
    const fileName = normalizePath(path).split('/').pop() || '';
    const dot = fileName.lastIndexOf('.');
    if (dot === -1) return '';
    return fileName.slice(dot + 1).toLowerCase();
}

function isHtmlFile(path) {
    return ['html', 'htm'].includes(getExtension(path));
}

function getSelectionName(files, entryPath) {
    if (files.length === 1) return files[0].file.name.replace(/\.[^.]+$/, '') || 'Website';
    return entryPath.split('/').slice(-2, -1)[0] || 'Website folder';
}

function recordToBytes(record) {
    if (record.encoding === 'text') return new TextEncoder().encode(record.data);
    if (record.encoding === 'base64') return base64ToBytes(record.data);
    throw new Error(`Unsupported file encoding: ${record.encoding}`);
}

function recordToDataUrl(record) {
    const extension = getExtension(record.path);
    const mimeType = record.type || MIME_TYPES[extension] || 'application/octet-stream';
    if (record.encoding === 'base64') return `data:${mimeType};base64,${record.data}`;
    const bytes = new TextEncoder().encode(record.data);
    return `data:${mimeType};base64,${bytesToBase64(bytes)}`;
}

function openRecoveryPanel() {
    if (!activePackageData) { showStatus('Open a LINKSTATE before recovering files.'); return; }
    renderRecoveryFiles();
    if (elements.recoveryOverlay) elements.recoveryOverlay.hidden = false;
}

function closeRecoveryPanel() {
    if (elements.recoveryOverlay) elements.recoveryOverlay.hidden = true;
}

function renderRecoveryFiles() {
    const packageData = activePackageData;
    if (!packageData || !elements.recoveryFiles) return;

    const records = packageData.files.slice().sort((first, second) => normalizePath(first.path).localeCompare(normalizePath(second.path)));
    let totalBytes = 0;
    for (const record of records) totalBytes += recordToBytes(record).byteLength;

    if (elements.recoveryProjectName) elements.recoveryProjectName.textContent = packageData.name || 'LINKSTATE Project';
    if (elements.recoveryProjectMeta) elements.recoveryProjectMeta.textContent = `${records.length} ${records.length === 1 ? 'file' : 'files'} · ${formatBytes(totalBytes)}`;

    elements.recoveryFiles.replaceChildren();
    for (const record of records) elements.recoveryFiles.appendChild(createRecoveryFileRow(record));
}

function createRecoveryFileRow(record) {
    const row = document.createElement('div');
    row.className = 'recovery-file';

    const details = document.createElement('div');
    details.className = 'recovery-file-details';

    const name = document.createElement('span');
    name.className = 'recovery-file-name';
    name.textContent = normalizePath(record.path);
    name.title = normalizePath(record.path);

    const size = document.createElement('span');
    size.className = 'recovery-file-size';
    size.textContent = formatBytes(recordToBytes(record).byteLength);

    details.append(name, size);

    const downloadButton = document.createElement('button');
    downloadButton.className = 'recovery-file-download';
    downloadButton.type = 'button';
    downloadButton.title = `Download ${normalizePath(record.path)}`;
    downloadButton.setAttribute('aria-label', `Download ${normalizePath(record.path)}`);
    downloadButton.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3V15"></path><path d="M7.5 10.5L12 15L16.5 10.5"></path><path d="M4 19H20"></path></svg>`;

    downloadButton.addEventListener('click', () => { downloadRecoveredFile(record); });
    row.append(details, downloadButton);
    return row;
}

function downloadRecoveredFile(record) {
    try {
        const bytes = recordToBytes(record);
        const blob = new Blob([bytes], { type: record.type || 'application/octet-stream' });
        const filename = normalizePath(record.path).split('/').pop() || 'file';
        downloadBlob(blob, filename);
        showStatus(`Downloading ${filename}...`);
    } catch (error) {
        console.error('[LINKSTATE] file download failed:', error);
        showStatus('That file could not be recovered.');
    }
}

async function downloadEntireProject() {
    if (!activePackageData) return;
    const button = elements.downloadProjectButton;
    if (button) button.disabled = true;

    try {
        showStatus('Building project ZIP locally...');
        await wait(20);
        const zipBytes = createZipArchive(activePackageData.files, activePackageData.createdAt);
        const projectName = safeDownloadName(activePackageData.name || 'linkstate-project');
        const blob = new Blob([zipBytes], { type: 'application/zip' });
        downloadBlob(blob, `${projectName}.zip`);
        showStatus('Project ZIP created locally.');
    } catch (error) {
        console.error('[LINKSTATE] ZIP failed:', error);
        showStatus(error?.message || 'The project ZIP could not be created.');
    } finally {
        if (button) button.disabled = false;
    }
}

function createZipArchive(records, createdAt) {
    if (!Array.isArray(records) || !records.length) throw new Error('The project contains no files.');
    if (records.length > 65535) throw new Error('This project contains too many files.');

    const encoder = new TextEncoder();
    const date = createdAt ? new Date(createdAt) : new Date();
    const { dosTime, dosDate } = toDosDateTime(date);

    const prepared = records.map((record) => {
        const path = safeZipPath(record.path);
        if (!path) throw new Error('A project file has an invalid path.');
        const nameBytes = encoder.encode(path);
        const dataBytes = recordToBytes(record);
        return { nameBytes, dataBytes, crc: crc32(dataBytes), dosTime, dosDate, localOffset: 0 };
    });

    let localSize = 0, centralSize = 0;
    for (const file of prepared) localSize += 30 + file.nameBytes.length + file.dataBytes.length;
    for (const file of prepared) centralSize += 46 + file.nameBytes.length;

    const totalSize = localSize + centralSize + 22;
    const output = new Uint8Array(totalSize);
    const view = new DataView(output.buffer);
    let offset = 0;

    for (const file of prepared) {
        file.localOffset = offset;
        writeUint32(view, offset, 0x04034b50); offset += 4;
        writeUint16(view, offset, 20); offset += 2;
        writeUint16(view, offset, 0x0800); offset += 2;
        writeUint16(view, offset, 0); offset += 2;
        writeUint16(view, offset, file.dosTime); offset += 2;
        writeUint16(view, offset, file.dosDate); offset += 2;
        writeUint32(view, offset, file.crc); offset += 4;
        writeUint32(view, offset, file.dataBytes.length); offset += 4;
        writeUint32(view, offset, file.dataBytes.length); offset += 4;
        writeUint16(view, offset, file.nameBytes.length); offset += 2;
        writeUint16(view, offset, 0); offset += 2;
        output.set(file.nameBytes, offset); offset += file.nameBytes.length;
        output.set(file.dataBytes, offset); offset += file.dataBytes.length;
    }

    const centralOffset = offset;

    for (const file of prepared) {
        writeUint32(view, offset, 0x02014b50); offset += 4;
        writeUint16(view, offset, 20); offset += 2;
        writeUint16(view, offset, 20); offset += 2;
        writeUint16(view, offset, 0x0800); offset += 2;
        writeUint16(view, offset, 0); offset += 2;
        writeUint16(view, offset, file.dosTime); offset += 2;
        writeUint16(view, offset, file.dosDate); offset += 2;
        writeUint32(view, offset, file.crc); offset += 4;
        writeUint32(view, offset, file.dataBytes.length); offset += 4;
        writeUint32(view, offset, file.dataBytes.length); offset += 4;
        writeUint16(view, offset, file.nameBytes.length); offset += 2;
        writeUint16(view, offset, 0); offset += 2;
        writeUint16(view, offset, 0); offset += 2;
        writeUint16(view, offset, 0); offset += 2;
        writeUint16(view, offset, 0); offset += 2;
        writeUint32(view, offset, 0); offset += 4;
        writeUint32(view, offset, file.localOffset); offset += 4;
        output.set(file.nameBytes, offset); offset += file.nameBytes.length;
    }

    const centralLength = offset - centralOffset;

    writeUint32(view, offset, 0x06054b50); offset += 4;
    writeUint16(view, offset, 0); offset += 2;
    writeUint16(view, offset, 0); offset += 2;
    writeUint16(view, offset, prepared.length); offset += 2;
    writeUint16(view, offset, prepared.length); offset += 2;
    writeUint32(view, offset, centralLength); offset += 4;
    writeUint32(view, offset, centralOffset); offset += 4;
    writeUint16(view, offset, 0);

    return output;
}

function writeUint16(view, offset, value) { view.setUint16(offset, value >>> 0, true); }
function writeUint32(view, offset, value) { view.setUint32(offset, value >>> 0, true); }

function toDosDateTime(value) {
    const date = value instanceof Date && !Number.isNaN(value.getTime()) ? value : new Date();
    const year = Math.min(2107, Math.max(1980, date.getFullYear()));
    const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
    const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
    return { dosTime, dosDate };
}

const CRC32_TABLE = (function() {
    const table = new Uint32Array(256);
    for (let index = 0; index < 256; index += 1) {
        let value = index;
        for (let bit = 0; bit < 8; bit += 1) value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
        table[index] = value >>> 0;
    }
    return table;
})();

function crc32(bytes) {
    let crc = 0xffffffff;
    for (let index = 0; index < bytes.length; index += 1) crc = CRC32_TABLE[(crc ^ bytes[index]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => { URL.revokeObjectURL(url); }, 1500);
    
    if (typeof recordDownload === 'function') recordDownload(filename);
    
    triggerDownloadAnimation();
}

function safeZipPath(value) {
    const normalized = String(value || '').replace(/\\/g, '/').replace(/^\/+/, '');
    const parts = normalized.split('/').filter((part) => part && part !== '.');
    if (!parts.length || parts.includes('..')) return '';
    return parts.map((part) => part.replace(/[\x00-\x1f]/g, '_')).join('/');
}

function safeDownloadName(value) {
    return String(value || '').trim().replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').replace(/[. ]+$/g, '').slice(0, 100) || 'linkstate-project';
}

function base64UrlToBytes(value) {
    let base64 = String(value || '').replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    return base64ToBytes(base64);
}

function base64ToBytes(value) {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes;
}

function bytesToBase64(bytes) {
    const chunkSize = 0x8000;
    let binary = '';
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
        const chunk = bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length));
        binary += String.fromCharCode(...chunk);
    }
    return btoa(binary);
}

function bytesToBase64Url(bytes) {
    return bytesToBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function replaceAsync(text, regex, replacer) {
    const matches = [];
    text.replace(regex, (...argumentsList) => { matches.push(argumentsList); return argumentsList[0]; });
    const replacements = await Promise.all(matches.map((argumentsList) => replacer(...argumentsList)));
    let replacementIndex = 0;
    return text.replace(regex, () => replacements[replacementIndex++]);
}

function returnHome() {
    activePackageData = null;
    activePagePath = null;
    if (elements.websiteFrame) elements.websiteFrame.srcdoc = '';
    if (elements.standardWebFrame) elements.standardWebFrame.src = 'about:blank';
    if (elements.recoverButton) elements.recoverButton.disabled = true;
    if (elements.projectInformation) elements.projectInformation.hidden = true;
    if (elements.runtimeStatus) elements.runtimeStatus.textContent = 'Local LINKSTATE Runtime';
    if (elements.extractPopover) elements.extractPopover.hidden = true;
    if (elements.saveStateBtn) elements.saveStateBtn.disabled = true;
    
    setTabTitle('New LINKSTATE');
    closeRecoveryPanel();
    hideStatus();
    setView('empty');
    
    if (elements.linkInput) elements.linkInput.value = '';
    if (elements.heroLinkInput) elements.heroLinkInput.value = '';
    
    window.setTimeout(() => { elements.heroLinkInput?.focus(); elements.heroLinkInput?.select(); }, 60);

    historyStack = [];
    historyIndex = -1;
    disableNavigationButtons();

    if (elements.genResultContainer) elements.genResultContainer.style.display = 'none';
    if (elements.genActionContainer) elements.genActionContainer.style.display = 'flex';
    if (elements.genDescription) elements.genDescription.textContent = 'Package a static website into a single portable link.';
    if (elements.genResetButton) elements.genResetButton.style.display = 'none';
    if (elements.genFooterDivider) elements.genFooterDivider.style.display = 'none';
    if (elements.genResultLink) elements.genResultLink.value = '';
    if (elements.genFolderInput) elements.genFolderInput.value = '';
    if (elements.genFileInput) elements.genFileInput.value = '';
    if (elements.genDownloadButton) elements.genDownloadButton.dataset.filename = '';
}

function openHistoryPage() {
    activePackageData = null;
    activePagePath = null;
    if (elements.websiteFrame) elements.websiteFrame.srcdoc = '';
    if (elements.standardWebFrame) elements.standardWebFrame.src = 'about:blank';
    if (elements.linkInput) elements.linkInput.value = 'linkstate://history';
    if (elements.extractPopover) elements.extractPopover.hidden = true;
    setTabTitle('History');
    setView('history');
    renderFullHistory();
}

function openDownloadsPage() {
    activePackageData = null;
    activePagePath = null;
    if (elements.websiteFrame) elements.websiteFrame.srcdoc = '';
    if (elements.standardWebFrame) elements.standardWebFrame.src = 'about:blank';
    if (elements.linkInput) elements.linkInput.value = 'linkstate://downloads';
    if (elements.extractPopover) elements.extractPopover.hidden = true;
    setTabTitle('Downloads');
    setView('downloads');
    renderFullDownloads();
}

function openSavedStatesPage() {
    activePackageData = null;
    activePagePath = null;
    if (elements.websiteFrame) elements.websiteFrame.srcdoc = '';
    if (elements.standardWebFrame) elements.standardWebFrame.src = 'about:blank';
    if (elements.linkInput) elements.linkInput.value = 'linkstate://saved';
    if (elements.extractPopover) elements.extractPopover.hidden = true;
    setTabTitle('Saved Projects');
    setView('saved');
    renderFullSavedStates();
}

function openPersonalizationPage() {
    activePackageData = null;
    activePagePath = null;
    if (elements.websiteFrame) elements.websiteFrame.srcdoc = '';
    if (elements.standardWebFrame) elements.standardWebFrame.src = 'about:blank';
    if (elements.linkInput) elements.linkInput.value = 'linkstate://personalization';
    if (elements.extractPopover) elements.extractPopover.hidden = true;
    setTabTitle('Personalization');
    setView('personalization');
    renderRecentWallpapers();
}

function openAboutPage() {
    activePackageData = null;
    activePagePath = null;
    if (elements.websiteFrame) elements.websiteFrame.srcdoc = '';
    if (elements.standardWebFrame) elements.standardWebFrame.src = 'about:blank';
    if (elements.linkInput) elements.linkInput.value = 'linkstate://about';
    if (elements.extractPopover) elements.extractPopover.hidden = true;
    setTabTitle('About Browser');
    setView('about');
}

function setView(view) {
    if (elements.emptyState) elements.emptyState.hidden = view !== 'empty';
    if (elements.loadingState) elements.loadingState.hidden = view !== 'loading';
    if (elements.websiteFrame) elements.websiteFrame.hidden = view !== 'viewer';
    if (elements.standardWebFrame) elements.standardWebFrame.hidden = view !== 'viewer-web';
    if (elements.errorState) elements.errorState.hidden = view !== 'error';
    if (elements.generateState) elements.generateState.hidden = view !== 'generate';
    if (elements.historyState) elements.historyState.hidden = view !== 'history';
    if (elements.downloadsState) elements.downloadsState.hidden = view !== 'downloads';
    if (elements.savedStatesState) elements.savedStatesState.hidden = view !== 'saved';
    if (elements.personalizationState) elements.personalizationState.hidden = view !== 'personalization';
    if (elements.aboutState) elements.aboutState.hidden = view !== 'about';
}

function setLoading(title, message) {
    if (elements.loadingTitle) elements.loadingTitle.textContent = title;
    if (elements.loadingMessage) elements.loadingMessage.textContent = message;
    setView('loading');
}

function showError(message) {
    if (elements.errorMessage) elements.errorMessage.textContent = message;
    setView('error');
}

function setTabTitle(title) {
    if (elements.activeTabTitle) elements.activeTabTitle.textContent = title;
    document.title = title === 'New LINKSTATE' ? 'LINKSTATE Browser' : `${title} — LINKSTATE`;
}

function updateProjectInformation() {
    if (!activePackageData) {
        if (elements.projectInformation) elements.projectInformation.hidden = true;
        if (elements.saveStateBtn) elements.saveStateBtn.disabled = true;
        return;
    }
    const count = activePackageData.files.length;
    if (elements.projectName) elements.projectName.textContent = activePackageData.name || 'LINKSTATE Website';
    if (elements.projectFileCount) elements.projectFileCount.textContent = `${count} ${count === 1 ? 'file' : 'files'}`;
    if (elements.projectInformation) elements.projectInformation.hidden = false;
    if (elements.saveStateBtn) elements.saveStateBtn.disabled = false;
}

function updateClearButton() {
    if (!elements.clearInputButton || !elements.linkInput) return;
    elements.clearInputButton.hidden = !elements.linkInput.value.length;
}

function showStatus(message) {
    if (!elements.statusBar) return;
    if (elements.statusText) elements.statusText.textContent = message;
    elements.statusBar.hidden = false;
}

function hideStatus() {
    if (elements.statusBar) elements.statusBar.hidden = true;
}

function wait(milliseconds) {
    return new Promise((resolve) => { window.setTimeout(resolve, milliseconds); });
}

function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = bytes / (1024 ** unitIndex);
    const decimalPlaces = unitIndex === 0 ? 0 : value >= 10 ? 1 : 2;
    return `${value.toFixed(decimalPlaces)} ${units[unitIndex]}`;
}

async function handleFileInputChange(event) {
    const files = Array.from(event.target.files || []).map(file => ({
        file,
        path: file.webkitRelativePath || file.name
    }));
    await processAndPackageFiles(files);
    event.target.value = '';
}

async function processAndPackageFiles(files) {
    if (!files.length) return;

    try {
        const normalizedFiles = stripCommonRoot(
            files.map(({ file, path }) => ({
                file,
                path: normalizePath(path || file.name)
            }))
        );

        const validation = validateSelection(normalizedFiles);
        if (!validation.valid) {
            showError(validation.message);
            return;
        }

        setLoading('Packaging website', 'Reading local files...');
        const packageData = await createWebsitePackage(normalizedFiles, validation.entryPath);
        
        setLoading('Compressing LINKSTATE', 'Encoding portable data...');
        const payload = await encodePackage(packageData);
        
        const localLink = `https://linkstate.local/#site=${payload}`;
        if (elements.heroLinkInput) elements.heroLinkInput.value = localLink;
        if (elements.linkInput) elements.linkInput.value = localLink;
        
        if (elements.genDownloadButton) {
            elements.genDownloadButton.dataset.filename = safeDownloadName(packageData.name) + '.onestate';
        }

        setView('generate');
        if (elements.genActionContainer) elements.genActionContainer.style.display = 'none';
        if (elements.genResultContainer) elements.genResultContainer.style.display = 'flex';
        if (elements.genResetButton) elements.genResetButton.style.display = 'block';
        if (elements.genFooterDivider) elements.genFooterDivider.style.display = 'block';
        if (elements.genResultLink) elements.genResultLink.value = localLink;
        if (elements.genDescription) elements.genDescription.textContent = 'Your LINKSTATE is ready. It remains completely local until you share the link.';

        showStatus('LINKSTATE generated successfully.');

    } catch (error) {
        console.error('[LINKSTATE] generation failed:', error);
        showError(error.message || 'Could not generate LINKSTATE.');
    }
}

/* =========================================================
   RECURSIVE DRAG & DROP FOLDER READING
========================================================= */

async function readDroppedItems(dataTransfer) {
    const entries = Array.from(dataTransfer.items || [])
        .map(item => item.webkitGetAsEntry?.())
        .filter(Boolean);

    if (!entries.length) {
        return Array.from(dataTransfer.files || []).map(file => ({
            file,
            path: file.name
        }));
    }

    const files = [];
    for (const entry of entries) {
        await walkFileEntry(entry, '', files);
    }
    return files;
}

async function walkFileEntry(entry, parentPath, output) {
    const currentPath = normalizePath(parentPath ? `${parentPath}/${entry.name}` : entry.name);

    if (entry.isFile) {
        const file = await new Promise((resolve, reject) => {
            entry.file(resolve, reject);
        });
        output.push({ file, path: currentPath });
        return;
    }

    if (entry.isDirectory) {
        const reader = entry.createReader();
        const children = await readAllDirectoryEntries(reader);
        for (const child of children) {
            await walkFileEntry(child, currentPath, output);
        }
    }
}

async function readAllDirectoryEntries(reader) {
    const entries = [];
    while (true) {
        const batch = await new Promise((resolve, reject) => {
            reader.readEntries(resolve, reject);
        });
        if (!batch.length) return entries;
        entries.push(...batch);
    }
}

function validateSelection(files) {
    const totalSize = files.reduce((sum, item) => sum + item.file.size, 0);

    if (totalSize > MAX_WEBSITE_SIZE) {
        return { valid: false, message: `This website is ${formatBytes(totalSize)}. LINKSTATE currently accepts up to ${formatBytes(MAX_WEBSITE_SIZE)}.` };
    }

    const htmlFiles = files.filter(({ path }) => isHtmlFile(path));

    if (!htmlFiles.length) {
        return { valid: false, message: 'No HTML file was found. Select an index.html file or a static website folder.' };
    }

    let entryPath = htmlFiles.find(({ path }) => path.toLowerCase() === 'index.html')?.path;

    if (!entryPath && files.length === 1 && htmlFiles.length === 1) {
        entryPath = htmlFiles[0].path;
    }

    if (!entryPath) {
        const nestedIndexes = htmlFiles.filter(({ path }) => path.toLowerCase().endsWith('/index.html'));
        if (nestedIndexes.length === 1) {
            entryPath = nestedIndexes[0].path;
        }
    }

    if (!entryPath) {
        return { valid: false, message: 'The selected folder needs one clear index.html entry file.' };
    }

    return { valid: true, entryPath };
}

function stripCommonRoot(files) {
    if (files.length < 2) return files;

    const segments = files.map(({ path }) => normalizePath(path).split('/'));
    const firstRoot = segments[0][0];
    const sharedRoot = segments.every(parts => parts.length > 1 && parts[0] === firstRoot);

    if (!sharedRoot) return files;

    return files.map(({ file, path }) => ({
        file,
        path: normalizePath(path).split('/').slice(1).join('/')
    }));
}

async function createWebsitePackage(files, entryPath) {
    const records = [];
    let siteTitle = getSelectionName(files, entryPath);

    for (let index = 0; index < files.length; index += 1) {
        const { file, path } = files[index];
        const extension = getExtension(path);
        const mimeType = file.type || MIME_TYPES[extension] || 'application/octet-stream';
        const isText = TEXT_EXTENSIONS.has(extension) || mimeType.startsWith('text/');

        const dataText = isText ? await file.text() : null;
        const dataBase64 = !isText ? bytesToBase64(new Uint8Array(await file.arrayBuffer())) : null;

        if (path === entryPath && isText) {
            const match = dataText.match(/<title[^>]*>([^<]+)<\/title>/i);
            if (match && match[1]) {
                siteTitle = match[1].trim();
            }
        }

        records.push({
            path,
            type: mimeType,
            encoding: isText ? 'text' : 'base64',
            data: isText ? dataText : dataBase64
        });
    }

    return {
        format: 'onestate', 
        version: 1,
        createdAt: new Date().toISOString(),
        name: siteTitle,
        entry: entryPath,
        files: records
    };
}

async function encodePackage(packageData) {
    const sourceBytes = new TextEncoder().encode(JSON.stringify(packageData));

    if ('CompressionStream' in window) {
        const compressedBytes = await transformBytes(sourceBytes, new CompressionStream('gzip'));
        return 'g.' + bytesToBase64Url(compressedBytes);
    }

    return 'u.' + bytesToBase64Url(sourceBytes);
}

/* =========================================================
   HISTORY & DOWNLOADS ENGINE
========================================================= */

function recordHistory(type, title, url) {
    let history = [];
    try { history = JSON.parse(localStorage.getItem('linkstate_history')) || []; } catch(e){}
    
    if (history.length > 0 && history[0].url === url) return;

    history.unshift({ type, title, url, time: Date.now() });
    if (history.length > 150) history.pop();
    localStorage.setItem('linkstate_history', JSON.stringify(history));
    
    renderMiniHistory();
}

function recordDownload(filename) {
    let downloads = [];
    try { downloads = JSON.parse(localStorage.getItem('linkstate_downloads')) || []; } catch(e){}
    downloads.unshift({ filename, time: Date.now() });
    if (downloads.length > 100) downloads.pop();
    localStorage.setItem('linkstate_downloads', JSON.stringify(downloads));
    
    renderMiniDownloads();
    renderPopoverDownloads();
    
    if (elements.downloadsState && !elements.downloadsState.hidden) {
        renderFullDownloads();
    }
}

function renderPopoverDownloads() {
    const list = elements.downloadsPopoverList;
    if (!list) return;
    
    const activeDownloads = Array.from(list.querySelectorAll('.active-download'));
    
    list.replaceChildren();
    
    activeDownloads.forEach(el => list.appendChild(el));

    let downloads = [];
    try { downloads = JSON.parse(localStorage.getItem('linkstate_downloads')) || []; } catch(e){}

    if (downloads.length === 0 && activeDownloads.length === 0) {
        list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding: 20px 0; font-size: 0.75rem; margin:0;">No recent downloads.</p>`;
        return;
    }

    downloads.slice(0, 4).forEach(item => {
        const el = document.createElement('div');
        el.className = 'internal-list-item';
        el.style.cursor = 'pointer';
        
        const icon = document.createElement('div');
        icon.className = 'item-icon';
        icon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
        
        const details = document.createElement('div');
        details.className = 'item-details';
        
        const title = document.createElement('span');
        title.className = 'item-title';
        title.textContent = item.filename;
        
        const timeStr = document.createElement('span');
        timeStr.className = 'item-url'; 
        
        const msAgo = Date.now() - item.time;
        let agoStr = '';
        if (msAgo < 60000) agoStr = 'Just now';
        else if (msAgo < 3600000) agoStr = Math.floor(msAgo/60000) + ' mins ago';
        else if (msAgo < 86400000) agoStr = Math.floor(msAgo/3600000) + ' hours ago';
        else agoStr = new Date(item.time).toLocaleDateString();

        timeStr.textContent = `Local File • ${agoStr}`;
        
        details.append(title, timeStr);
        el.append(icon, details);
        
        el.addEventListener('click', () => {
            if (window.electronAPI && window.electronAPI.openFileLocation) {
                window.electronAPI.openFileLocation(item.filename);
            }
        });
        
        list.appendChild(el);
    });
}

function renderMiniHistory() {
    const list = elements.historyListMini;
    if (!list) return;
    list.replaceChildren();

    let history = [];
    try { history = JSON.parse(localStorage.getItem('linkstate_history')) || []; } catch(e){}

    if (history.length === 0) {
        list.innerHTML = `<div style="padding: 10px 16px; color: var(--text-muted); font-size: 0.75rem;">No history yet</div>`;
        return;
    }

    history.slice(0, 8).forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'mini-history-item';
        
        const icon = document.createElement('div');
        icon.className = 'mini-history-icon';
        icon.innerHTML = item.type === 'local' ? '<svg viewBox="0 0 24 24" style="width:10px;height:10px;"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' : '<svg viewBox="0 0 24 24" style="width:10px;height:10px;"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>';
        
        const title = document.createElement('span');
        title.className = 'mini-history-title';
        title.textContent = item.title || item.url;
        
        btn.append(icon, title);

        btn.addEventListener('click', () => {
            if(elements.browserMenu) elements.browserMenu.hidden = true;
            if (elements.linkInput) elements.linkInput.value = item.url;
            openLinkstate();
        });

        list.appendChild(btn);
    });
}

function renderMiniDownloads() {
    const list = elements.downloadsListMini;
    if (!list) return;
    list.replaceChildren();

    let downloads = [];
    try { downloads = JSON.parse(localStorage.getItem('linkstate_downloads')) || []; } catch(e){}

    if (downloads.length === 0) {
        list.innerHTML = `<div style="padding: 10px 16px; color: var(--text-muted); font-size: 0.75rem;">No recent downloads</div>`;
        return;
    }

    downloads.slice(0, 8).forEach(item => {
        const btn = document.createElement('div');
        btn.className = 'mini-history-item';
        btn.style.cursor = 'pointer';
        
        const icon = document.createElement('div');
        icon.className = 'mini-history-icon';
        icon.innerHTML = '<svg viewBox="0 0 24 24" style="width:10px;height:10px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
        
        const name = document.createElement('span');
        name.className = 'mini-history-title';
        name.textContent = item.filename;
        
        btn.append(icon, name);
        
        btn.addEventListener('click', () => {
            if (window.electronAPI && window.electronAPI.openFileLocation) {
                window.electronAPI.openFileLocation(item.filename);
            }
        });
        
        list.appendChild(btn);
    });
}

function renderFullHistory() {
    const list = elements.fullHistoryList;
    if (!list) return;
    list.replaceChildren();
    
    let history = [];
    try { history = JSON.parse(localStorage.getItem('linkstate_history')) || []; } catch(e){}
    
    if(history.length === 0) {
        list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding: 40px; font-size: 0.85rem;">No browsing history found.</p>`;
        return;
    }
    
    history.forEach(item => {
        const el = document.createElement('div');
        el.className = 'internal-list-item';
        
        const icon = document.createElement('div');
        icon.className = 'item-icon';
        icon.innerHTML = item.type === 'local' ? '<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' : '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>';
        
        const details = document.createElement('div');
        details.className = 'item-details';
        
        const title = document.createElement('span');
        title.className = 'item-title';
        title.textContent = item.title || item.url;
        
        const urlInfo = document.createElement('span');
        urlInfo.className = 'item-url';
        urlInfo.textContent = item.url;
        
        const time = document.createElement('span');
        time.className = 'item-time';
        const d = new Date(item.time);
        time.textContent = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        details.append(title, urlInfo);
        el.append(icon, details, time);
        
        el.addEventListener('click', () => {
            if (elements.linkInput) elements.linkInput.value = item.url;
            openLinkstate();
        });
        
        list.appendChild(el);
    });
}

function renderFullDownloads() {
    const list = elements.fullDownloadsList;
    if (!list) return;
    list.replaceChildren();
    
    let downloads = [];
    try { downloads = JSON.parse(localStorage.getItem('linkstate_downloads')) || []; } catch(e){}
    
    if(downloads.length === 0) {
        list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding: 40px; font-size: 0.85rem;">No recent downloads.</p>`;
        return;
    }
    
    downloads.forEach(item => {
        const el = document.createElement('div');
        el.className = 'internal-list-item';
        el.style.cursor = 'pointer';
        
        const icon = document.createElement('div');
        icon.className = 'item-icon';
        icon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
        
        const details = document.createElement('div');
        details.className = 'item-details';
        
        const title = document.createElement('span');
        title.className = 'item-title';
        title.textContent = item.filename;
        
        const time = document.createElement('span');
        time.className = 'item-time';
        const d = new Date(item.time);
        time.textContent = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        details.append(title);
        el.append(icon, details, time);
        
        el.addEventListener('click', () => {
            if (window.electronAPI && window.electronAPI.openFileLocation) {
                window.electronAPI.openFileLocation(item.filename);
            }
        });
        
        list.appendChild(el);
    });
}

/* =========================================================
   SAVED PROJECTS LOGIC
========================================================= */

function renderFullSavedStates() {
    const list = elements.fullSavedStatesList;
    if (!list) return;
    list.replaceChildren();
    
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem('linkstate_saved_aliases')) || {}; } catch(e){}
    
    const keys = Object.keys(saved);
    
    if(keys.length === 0) {
        list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding: 40px; font-size: 0.85rem;">No projects saved yet.</p>`;
        return;
    }
    
    keys.forEach(key => {
        const el = document.createElement('div');
        el.className = 'internal-list-item';
        
        const icon = document.createElement('div');
        icon.className = 'item-icon';
        icon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>';
        
        const details = document.createElement('div');
        details.className = 'item-details';
        
        const title = document.createElement('span');
        title.className = 'item-title';
        title.textContent = key;
        
        const urlInfo = document.createElement('span');
        urlInfo.className = 'item-url';
        urlInfo.textContent = 'Decodes locally';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'secondary-button';
        deleteBtn.style.cssText = 'margin: 0; padding: 6px 12px; color: var(--error); border-color: rgba(255,113,105,0.3); background: rgba(255,113,105,0.05);';
        deleteBtn.textContent = 'Remove';
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            delete saved[key];
            localStorage.setItem('linkstate_saved_aliases', JSON.stringify(saved));
            renderFullSavedStates();
            showStatus('Alias removed.');
        });
        
        details.append(title, urlInfo);
        el.append(icon, details, deleteBtn);
        
        el.addEventListener('click', () => {
            if (elements.linkInput) elements.linkInput.value = key;
            openLinkstate();
        });
        
        list.appendChild(el);
    });
}

/* =========================================================
   PERSONALIZATION ENGINE
========================================================= */

function setBaseTheme(mode) {
    if (mode === 'light') document.body.classList.add('theme-light');
    else document.body.classList.remove('theme-light');
    localStorage.setItem('linkstate_base_theme', mode);

    const btnLight = document.getElementById('modeBtnLight');
    const btnDark = document.getElementById('modeBtnDark');
    
    if (btnLight && btnDark) {
        if(mode === 'light') {
            btnLight.classList.add('active-mode');
            btnDark.classList.remove('active-mode');
        } else {
            btnDark.classList.add('active-mode');
            btnLight.classList.remove('active-mode');
        }
    }
}

function setAccentColor(accentName, customHex = null) {
    document.body.className = document.body.className.replace(/\baccent-\S+/g, '');
    
    if (accentName === 'custom' && customHex) {
        document.body.classList.add('accent-custom');
        document.documentElement.style.setProperty('--custom-accent', customHex);
        localStorage.setItem('linkstate_accent_color', 'custom');
        localStorage.setItem('linkstate_custom_hex', customHex);
    } else {
        if (accentName && accentName !== 'default') {
            document.body.classList.add(`accent-${accentName}`);
        }
        localStorage.setItem('linkstate_accent_color', accentName);
    }
}

function saveWallpaper(dataUrl) {
    const stage = document.querySelector('.browser-stage');
    stage.classList.add('custom-wallpaper');
    stage.style.backgroundImage = `url(${dataUrl})`;
    localStorage.setItem('onestate_wallpaper', dataUrl);
    
    if (elements.ambientCanvas) elements.ambientCanvas.style.display = 'none';

    let recents = [];
    try { recents = JSON.parse(localStorage.getItem('onestate_recent_wallpapers')) || []; } catch(e){}
    
    recents = recents.filter(w => w !== dataUrl);
    recents.unshift(dataUrl);
    if (recents.length > 10) recents.pop();
    
    localStorage.setItem('onestate_recent_wallpapers', JSON.stringify(recents));
    
    if (elements.personalizationState && !elements.personalizationState.hidden) {
        renderRecentWallpapers();
    }
}

function removeWallpaper() {
    const stage = document.querySelector('.browser-stage');
    stage.classList.remove('custom-wallpaper');
    stage.style.backgroundImage = 'none';
    localStorage.removeItem('onestate_wallpaper');
    if (elements.ambientCanvas) elements.ambientCanvas.style.display = 'block';
}

function restorePersonalization() {
    const savedTheme = localStorage.getItem('linkstate_base_theme');
    if (savedTheme === 'light') {
        document.body.classList.add('theme-light');
        const btnLight = document.getElementById('modeBtnLight');
        const btnDark = document.getElementById('modeBtnDark');
        if(btnLight && btnDark) {
            btnLight.classList.add('active-mode');
            btnDark.classList.remove('active-mode');
        }
    }
    
    const savedAccent = localStorage.getItem('linkstate_accent_color') || 'default';
    const savedCustomHex = localStorage.getItem('linkstate_custom_hex');
    
    setAccentColor(savedAccent, savedCustomHex);
    
    const activeSwatch = document.querySelector(`.brave-swatch[data-accent="${savedAccent}"]`);
    if (activeSwatch) {
        document.querySelectorAll('.brave-swatch').forEach(el => el.classList.remove('active-swatch'));
        activeSwatch.classList.add('active-swatch');
        if (savedAccent === 'custom' && savedCustomHex) {
            activeSwatch.querySelector('.swatch-circle').style.background = savedCustomHex;
        }
    }
    
    const savedWallpaper = localStorage.getItem('onestate_wallpaper');
    if (savedWallpaper) {
        const stage = document.querySelector('.browser-stage');
        stage.classList.add('custom-wallpaper');
        stage.style.backgroundImage = `url(${savedWallpaper})`;
        if (elements.ambientCanvas) elements.ambientCanvas.style.display = 'none';
    }
}

function renderRecentWallpapers() {
    const grid = elements.recentWallpapersGrid;
    if (!grid) return;
    
    let recents = [];
    try { recents = JSON.parse(localStorage.getItem('onestate_recent_wallpapers')) || []; } catch(e){}
    const current = localStorage.getItem('onestate_wallpaper');
    
    grid.replaceChildren();
    
    if (recents.length === 0) {
        grid.innerHTML = `<span style="color:var(--text-muted); font-size: 0.8rem; grid-column: 1 / -1;">No recent wallpapers uploaded.</span>`;
        return;
    }
    
    recents.forEach(dataUrl => {
        const thumb = document.createElement('div');
        thumb.className = 'wallpaper-thumb' + (current === dataUrl ? ' active-wallpaper' : '');
        thumb.style.backgroundImage = `url(${dataUrl})`;
        
        thumb.addEventListener('click', () => {
            saveWallpaper(dataUrl);
            document.querySelectorAll('.wallpaper-thumb').forEach(el => el.classList.remove('active-wallpaper'));
            thumb.classList.add('active-wallpaper');
        });
        
        grid.appendChild(thumb);
    });
}

/* =========================================================
   MULTI-TAB ENGINE
========================================================= */

const tabStripEl = document.getElementById('tabStrip');
const newTabBtnEl = document.getElementById('newTabBtn');
const viewportContainerEl = document.getElementById('viewportContainer');

let appTabs = [];
let activeTabId = null;
let tabCounter = 0;

const originalIframe = document.getElementById('websiteFrame');
const originalWebview = document.getElementById('standardWebFrame');

function attachWebviewEvents(wv) {
    wv.addEventListener('did-start-loading', () => {
        showStatus('Loading...');
        setRefreshIconState('stop');
    });
    wv.addEventListener('did-stop-loading', () => { 
        showStatus('Browsing Web'); 
        updateNavigationButtons(); 
        setRefreshIconState('reload');
    });
    wv.addEventListener('page-title-updated', (e) => setTabTitle(e.title));
    wv.addEventListener('did-navigate', (e) => { 
        if (e.url === 'about:blank') return; 
        if (elements.linkInput) elements.linkInput.value = e.url; 
        updateNavigationButtons(); 
        recordHistory('web', e.url, e.url);
    });
    wv.addEventListener('did-navigate-in-page', (e) => { 
        if (e.url === 'about:blank') return; 
        if (elements.linkInput) elements.linkInput.value = e.url; 
        updateNavigationButtons(); 
    });
}

function createTab() {
    const tabId = 'tab-' + (++tabCounter);
    
    const newTab = {
        id: tabId,
        url: '',
        title: 'New LINKSTATE',
        viewState: 'empty',
        activePackageData: null,
        activePagePath: null,
        historyStack: [],
        historyIndex: -1,
        isNavigatingHistory: false,
        iframe: null,
        webview: null
    };

    if (appTabs.length === 0) {
        newTab.iframe = originalIframe;
        newTab.webview = originalWebview;
    } else {
        newTab.iframe = document.createElement('iframe');
        newTab.iframe.className = 'website-frame';
        newTab.iframe.title = 'LINKSTATE website';
        newTab.iframe.sandbox = 'allow-scripts allow-forms allow-modals allow-popups allow-downloads';
        newTab.iframe.hidden = true;

        newTab.webview = document.createElement('webview');
        newTab.webview.className = 'website-frame';
        newTab.webview.hidden = true;
        
        viewportContainerEl.appendChild(newTab.iframe);
        viewportContainerEl.appendChild(newTab.webview);
    }
    
    attachWebviewEvents(newTab.webview);

    appTabs.push(newTab);
    switchTab(tabId);
    
    if (appTabs.length > 1) returnHome();
}

function switchTab(targetId) {

    if (activeTabId) {
        const currentTab = appTabs.find(t => t.id === activeTabId);
        if (currentTab) {
            currentTab.activePackageData = activePackageData;
            currentTab.activePagePath = activePagePath;
            currentTab.historyStack = [...historyStack];
            currentTab.historyIndex = historyIndex;
            currentTab.isNavigatingHistory = isNavigatingHistory;
            currentTab.url = elements.linkInput ? elements.linkInput.value : '';
            
            if (!elements.errorState.hidden) currentTab.viewState = 'error';
            else if (!elements.loadingState.hidden) currentTab.viewState = 'loading';
            else if (!elements.generateState.hidden) currentTab.viewState = 'generate';
            else if (!elements.historyState?.hidden) currentTab.viewState = 'history';
            else if (!elements.downloadsState?.hidden) currentTab.viewState = 'downloads';
            else if (!elements.savedStatesState?.hidden) currentTab.viewState = 'saved';
            else if (!elements.personalizationState?.hidden) currentTab.viewState = 'personalization';
            else if (!elements.aboutState?.hidden) currentTab.viewState = 'about';
            else if (!elements.emptyState.hidden) currentTab.viewState = 'empty';
            else if (!elements.websiteFrame.hidden) currentTab.viewState = 'viewer';
            else if (!elements.standardWebFrame.hidden) currentTab.viewState = 'viewer-web';

            currentTab.iframe.hidden = true;
            currentTab.webview.hidden = true;
        }
    }

    activeTabId = targetId;
    const incomingTab = appTabs.find(t => t.id === activeTabId);
    if (!incomingTab) return;

    activePackageData = incomingTab.activePackageData;
    activePagePath = incomingTab.activePagePath;
    historyStack = [...incomingTab.historyStack];
    historyIndex = incomingTab.historyIndex;
    isNavigatingHistory = incomingTab.isNavigatingHistory;
    
    if (elements.linkInput) elements.linkInput.value = incomingTab.url;
    
    elements.websiteFrame = incomingTab.iframe;
    elements.standardWebFrame = incomingTab.webview;

    setView(incomingTab.viewState);
    updateProjectInformation();
    updateNavigationButtons();
    updateClearButton();
    setTabTitle(incomingTab.title);
    
    if (incomingTab.viewState === 'history') renderFullHistory();
    if (incomingTab.viewState === 'downloads') renderFullDownloads();
    if (incomingTab.viewState === 'saved') renderFullSavedStates();
    if (incomingTab.viewState === 'personalization') renderRecentWallpapers();
    
    renderTabStrip();
}

function renderTabStrip() {
    tabStripEl.querySelectorAll('.tab').forEach(t => t.remove());

    for (let tab of appTabs) {
        const tabEl = document.createElement('div');
        tabEl.className = 'tab' + (tab.id === activeTabId ? ' active-tab' : '');
        tabEl.onclick = () => switchTab(tab.id);

        const titleEl = document.createElement('span');
        titleEl.className = 'tab-title';
        titleEl.textContent = tab.title;
        tabEl.appendChild(titleEl);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-tab-btn';
        closeBtn.type = 'button';
        closeBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 6L18 18"></path><path d="M18 6L6 18"></path></svg>';
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            closeTab(tab.id);
        };
        tabEl.appendChild(closeBtn);

        tabStripEl.insertBefore(tabEl, newTabBtnEl);
    }
}

function closeTab(tabId) {
    const index = appTabs.findIndex(t => t.id === tabId);
    if (index === -1) return;

    const tab = appTabs[index];
    if (tab.iframe && tab.iframe !== originalIframe) tab.iframe.remove();
    if (tab.webview && tab.webview !== originalWebview) tab.webview.remove();

    appTabs.splice(index, 1);

    if (appTabs.length === 0) {
        window.close(); 
    } else if (activeTabId === tabId) {
        const newActive = appTabs[Math.max(0, index - 1)];
        switchTab(newActive.id);
    } else {
        renderTabStrip();
    }
}

const originalSetTabTitle = setTabTitle;
setTabTitle = function(title) {
    originalSetTabTitle(title);
    const activeTab = appTabs.find(t => t.id === activeTabId);
    if (activeTab) {
        activeTab.title = title;
        const titleEl = tabStripEl.querySelector('.active-tab .tab-title');
        if (titleEl) titleEl.textContent = title;
    }
};

newTabBtnEl.addEventListener('click', createTab);
createTab();