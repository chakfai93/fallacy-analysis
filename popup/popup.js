document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const textInput = document.getElementById('textInput');
    const results = document.getElementById('results');

    const fallacies = {
        'ad hominem': '人身攻擊',
        'strawman': '稻草人',
        'slippery slope': '滑坡謬誤',
        'begging the question': '循環論證'
    };

    analyzeBtn.addEventListener('click', function() {
        const text = textInput.value.toLowerCase();
        const found = [];
        
        for (const [key, value] of Object.entries(fallacies)) {
            if (text.includes(key)) found.push(value);
        }
        
        results.innerHTML = found.length > 0 ? 
            found.map(f => `<div>📍 ${f}</div>`).join('') : 
            '✅ 未檢測到謬誤';
    });

    clearBtn.addEventListener('click', function() {
        textInput.value = '';
        results.innerHTML = '';
    });
});
