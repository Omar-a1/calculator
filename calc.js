const display = document.getElementById("display");

// Translations Dictionary
const translations = {
    en: {
        title: "Standard",
        langBtn: "🌐 AR",
        error: "Error"
    },
    ar: {
        title: "قياسي",
        langBtn: "🌐 EN",
        error: "خطأ"
    }
};

let currentLang = localStorage.getItem("calculator-lang") || "en";

function updateLanguageUI() {
    const calcType = document.getElementById("calcType");
    const langToggle = document.getElementById("langToggle");
    const t = translations[currentLang];
    
    if (calcType) calcType.textContent = t.title;
    if (langToggle) langToggle.textContent = t.langBtn;
    
    document.documentElement.lang = currentLang;
}

function toggleLanguage() {
    currentLang = currentLang === "en" ? "ar" : "en";
    localStorage.setItem("calculator-lang", currentLang);
    updateLanguageUI();
}

function appendNumber(number) {
    const errText = translations[currentLang].error;
    if (display.value === "0" || display.value === errText) {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    const errText = translations[currentLang].error;
    if (display.value === errText) return;
    const lastChar = display.value.slice(-1);
    if (["+", "-", "*", "/"].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

function calculate() {
    const errText = translations[currentLang].error;
    try {
        if (!display.value || display.value === errText) return;
        let expr = display.value;
        let result = eval(expr);
        if (typeof result === "number" && !Number.isInteger(result)) {
            result = parseFloat(result.toFixed(8));
        }
        display.value = result;
    } catch (error) {
        display.value = errText;
        setTimeout(() => {
            display.value = "0";
        }, 1500);
    }
}

function clearDisplay() {
    display.value = "0";
}

function clearEntry() {
    display.value = "0";
}

function deleteDigit() {
    const errText = translations[currentLang].error;
    if (display.value === errText) {
        display.value = "0";
        return;
    }
    if (display.value.length <= 1) {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function percentage() {
    try {
        let val = eval(display.value);
        display.value = (val / 100).toString();
    } catch (e) {
        display.value = translations[currentLang].error;
    }
}

function reciprocal() {
    try {
        let val = eval(display.value);
        if (val === 0) {
            display.value = translations[currentLang].error;
            return;
        }
        display.value = (1 / val).toString();
    } catch (e) {
        display.value = translations[currentLang].error;
    }
}

function square() {
    try {
        let val = eval(display.value);
        display.value = Math.pow(val, 2).toString();
    } catch (e) {
        display.value = translations[currentLang].error;
    }
}

function sqrt() {
    try {
        let val = eval(display.value);
        if (val < 0) {
            display.value = translations[currentLang].error;
            return;
        }
        display.value = Math.sqrt(val).toString();
    } catch (e) {
        display.value = translations[currentLang].error;
    }
}

function toggleSign() {
    const errText = translations[currentLang].error;
    try {
        if (display.value === "0" || display.value === errText) return;
        if (display.value.startsWith("-")) {
            display.value = display.value.substring(1);
        } else {
            display.value = "-" + display.value;
        }
    } catch (e) {
        display.value = errText;
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    const toggleIcon = document.getElementById("themeToggle");
    if (toggleIcon) {
        toggleIcon.textContent = isDark ? "🌙" : "☀️";
    }
    localStorage.setItem("calculator-theme", isDark ? "dark" : "light");
}

// Initialize theme and language on load
(function init() {
    updateLanguageUI();
    const savedTheme = localStorage.getItem("calculator-theme");
    const toggleIcon = document.getElementById("themeToggle");
    if (savedTheme === "light") {
        document.body.classList.remove("dark-mode");
        if (toggleIcon) toggleIcon.textContent = "☀️";
    } else {
        document.body.classList.add("dark-mode");
        if (toggleIcon) toggleIcon.textContent = "🌙";
    }
})();