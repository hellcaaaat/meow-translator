const catWords = ["meow","mrrp","mraw","purr","nya","meoww","prrt","miau","nyan","mreow","rrrow","mew"];
const humanWords = ["feed","human","now","pet","me","serve","hungry","sleep","attention","gimme","want","more","food","play","cuddle","outside"];

// ── CAT LANGUAGE VALIDATION ─────────────────────────────────
function isValidCatLanguage(text) {
    const words = text.toLowerCase().trim().split(/\s+/);
    for (let word of words) {
        const cleanWord = word.replace(/[.,!?;:'")\]]+$/g, '');
        if (cleanWord && !catWords.includes(cleanWord)) {
            return false;
        }
    }
    return true;
}

// ── MEOW MODE STATE MAP ──────────────────────────────────────
const meowUI = {
    "site-title":    ["=₍^. ̫ .^₎⟆ Cat Translator",  "MEOW MEOW 🔋 ₍^. ̫ .^₎⟆ MEOW MEOW"],
    "warning-text":  ["!! WARNING: LIVE ACOUSTIC SYNC ENGINE RUNNING !!",  "!! MEOW: MEOW MEOW MEOW MEOW MEOW MEOW !!"],
    "marquee-text":  ["+++ [CAT_OS_ONLINE] +++ WORD-FOR-WORD TRANSLATION ACTIVE +++ TYPE ANYTHING TO HEAR THE FELINE DIALECT STREAM LIVE v3.0.3 +++",
                      "+++ [MEOW_OS_MEOW] +++ MEOW-FOR-MEOW MEOW MEOW +++ MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW v3.MEOW +++"],
    "label-human":   ["HUMAN TALK AREA [BOX 1]",  "MEOW MEOW MEOW [MEOW 1]"],
    "label-cat":     ["CAT SPEAK DIALECT [BOX 2]", "MEOW MEOW MEOW [MEOW 2]"],
    "edu-title-text":["(=^･ｪ･^=) LEN-BASED ARRAYS", "(=^･ｪ･^=) MEOW-MEOW MEOW"],
    "edu-desc":      ["This engine maps each human word to a cat vocable using character-level hashing — same word always gives same sound.",
                      "Meow meow meow meow meow meow meow meow meow meow meow — meow meow meow meow meow."],
    "edu-desc2":     ["1 word human = 1 cat vocable. Punctuation preserved.", "1 meow meow = 1 meow meow. Meow meow."],
    "gallery-label": ["[[ LIVE CAT FEED — REFRESHES ON TRANSLATE ]]", "[[ MEOW MEOW MEOW — MEOW MEOW MEOW ]]"],
    "footer-text":   ["made by hellcaaaat", "meow by hellcaaaat"],
    "meow-toggle":   ["[ MEOW MODE ]", "[ MEOW MEOW ]"],
};

let meowModeOn = false;

function toggleMeowMode() {
    meowModeOn = !meowModeOn;
    document.body.classList.toggle('meow-mode', meowModeOn);
    document.getElementById('meow-toggle').classList.toggle('active', meowModeOn);
    document.getElementById('meow-status').textContent = meowModeOn ? 'STATUS: MEOW 🐾' : 'STATUS: OFF';

    const idx = meowModeOn ? 1 : 0;
    for (const [id, vals] of Object.entries(meowUI)) {
        const el = document.getElementById(id);
        if (el) el.textContent = vals[idx];
    }

    const htx = document.getElementById('human-text');
    const ctx = document.getElementById('cat-text');
    if (meowModeOn) {
        htx.placeholder = "Meow meow meow meow meow... (meow: meow meow meow meow)";
        ctx.placeholder = "Meow meow meow meow 'meow mrrp nya' meow...";
        document.getElementById('dict-display').innerHTML =
            'MEOW_MEOW = ["meow","mrrp","mraw","purr","nya","meoww","prrt","miau","nyan","mreow","rrrow","mew"]<br><br>MEOW_MEOW = ["meow","meow","meow","meow","meow","meow","meow","meow","meow","meow","meow","meow","meow","meow","meow","meow"]';
    } else {
        htx.placeholder = "Type regular human sentences... (ex: i want food now)";
        ctx.placeholder = "Or type cat words like 'meow mrrp nya' here...";
        document.getElementById('dict-display').innerHTML =
            'CAT_DICT = ["meow","mrrp","mraw","purr","nya","meoww","prrt","miau","nyan","mreow","rrrow","mew"]<br><br>HUMAN_DICT = ["feed","human","now","pet","me","serve","hungry","sleep","attention","gimme","want","more","food","play","cuddle","outside"]';
    }
}

// ── CAT IMAGE FETCH ENGINE ──────────────────────────────────
let catSeeds = [10, 20, 30, 40];
let typingTimer = null;
let lastWordCount = 0;

function getCatUrl(seed) {
    return `https://cataas.com/cat?width=150&height=150&t=${seed}`;
}

function refreshCat(index, seed) {
    const img = document.getElementById(`cat-img-${index}`);
    const label = document.getElementById(`cat-label-${index}`);
    img.classList.add('loading');
    
    const newSrc = getCatUrl(seed);
    const tmp = new Image();
    
    tmp.onload = () => {
        img.src = newSrc;
        img.classList.remove('loading');
        label.textContent = `[CAT_FILE_0${index+1}.JPG]`;
    };
    tmp.onerror = () => {
        // Safe, clean programmatic error state display
        img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 100 100"><rect width="100" stroke="%23ff00ff" stroke-width="4" fill="%23000" height="100"/><text x="50" y="55" font-family="monospace" font-weight="bold" font-size="11" fill="%2300ff00" text-anchor="middle">🐱 TIMEOUT</text></svg>`;
        img.classList.remove('loading');
    };
    tmp.src = newSrc;
}

function refreshAllCats() {
    catSeeds = catSeeds.map(() => Math.floor(Math.random() * 9999999));
    catSeeds.forEach((seed, i) => refreshCat(i, seed));
}

// Initial API Boot
refreshAllCats();

function maybeRefreshCatOnType(text) {
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    if (wordCount !== lastWordCount) {
        lastWordCount = wordCount;
        const slot = Math.floor(Math.random() * 4);
        catSeeds[slot] = Math.floor(Math.random() * 9999999);
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => refreshCat(slot, catSeeds[slot]), 300);
    }
}

// ── TRANSLATION INTERPOLATION ────────────────────────────────
function hashWord(word) {
    let h = 0;
    for (let i = 0; i < word.length; i++) {
        h = (h * 31 + word.charCodeAt(i)) & 0xfffffff;
    }
    return h;
}

function splitPunct(token) {
    const m = token.match(/^(.*?)([.,!?;:'")\]]+)$/);
    return m ? [m[1], m[2]] : [token, ""];
}

function translateText(text, dict) {
    return text.replace(/(\S+)/g, (token) => {
        const [core, punct] = splitPunct(token);
        if (!core) return token;
        const isAllCaps = core === core.toUpperCase() && core.length > 1 && /[A-Z]/.test(core);
        const isCapFirst = /^[A-Z]/.test(core) && !isAllCaps;
        const key = core.toLowerCase();
        const idx = hashWord(key) % dict.length;
        
        let result = dict[idx];
        if (isAllCaps) result = result.toUpperCase();
        else if (isCapFirst) result = result.charAt(0).toUpperCase() + result.slice(1);
        return result + punct;
    });
}

let fromHuman = false;
let fromCat = false;

function syncTranslate(source) {
    if (source === 'human' && !fromCat) {
        fromHuman = true;
        const val = document.getElementById('human-text').value;
        document.getElementById('cat-text').value = val.trim() === '' ? '' : translateText(val, catWords);
        fromHuman = false;
        maybeRefreshCatOnType(val);
    } else if (source === 'cat' && !fromHuman) {
        fromCat = true;
        const val = document.getElementById('cat-text').value;
        
        if (val.trim() !== '' && !isValidCatLanguage(val)) {
            document.getElementById('human-text').value = '❌ THAT\'S NOT MEOW LANGUAGE!';
        } else {
            document.getElementById('human-text').value = val.trim() === '' ? '' : translateText(val, humanWords);
        }
        
        fromCat = false;
        maybeRefreshCatOnType(val);
    }
}

// ── HIT COUNTER TICKER ───────────────────────────────────────
let hits = 43521;
setInterval(() => {
    hits += Math.floor(Math.random() * 3);
    document.getElementById('hit-counter').textContent = String(hits).padStart(8, '0');
}, 4000);