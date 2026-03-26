const MINIMAX_API_KEY = 'sk-api-Zn-DCUe_dyO-mznujui-SvdpwBLs6hn9rbqRaBE4cuwH49l28q7pzHkr-tOWWWHQ7ALExJvSxyPotQjt8LPhJrHAdsj4qcwzzi7WLYkw-b5gaWfyf-H1JGI';

document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const manualBtn = document.getElementById('manualBtn');
    const clearBtn = document.getElementById('clearBtn');
    const pageContent = document.getElementById('pageContent');
    const results = document.getElementById('results');
    const manualModal = document.getElementById('manualModal');
    const manualInput = document.getElementById('manualInput');
    const submitBtn = document.getElementById('submitBtn');
    const closeBtn = document.getElementById('closeBtn');

    // 自動提取網頁內容
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getPageContent' }, function(response) {
            if (chrome.runtime.lastError) {
                pageContent.value = '無法提取頁面內容，請使用手動輸入模式';
            } else if (response && response.content) {
                const text = response.content.substring(0, 2000);
                pageContent.value = text;
            }
        });
    });

    analyzeBtn.addEventListener('click', function() {
        const text = pageContent.value.trim();
        if (!text || text.includes('無法提取')) {
            results.innerHTML = '<p class="error">❌ 無法提取頁面內容，請使用手動輸入功能</p>';
            return;
        }
        analyzeWithMiniMax(text);
    });

    manualBtn.addEventListener('click', function() {
        manualModal.style.display = 'flex';
        manualInput.focus();
    });

    closeBtn.addEventListener('click', function() {
        manualModal.style.display = 'none';
    });

    submitBtn.addEventListener('click', function() {
        const text = manualInput.value.trim();
        if (!text) {
            alert('請輸入文本');
            return;
        }
        manualModal.style.display = 'none';
        analyzeWithMiniMax(text);
        manualInput.value = '';
    });

    clearBtn.addEventListener('click', function() {
        pageContent.value = '';
        results.innerHTML = '<p class="placeholder">已清除</p>';
        manualInput.value = '';
    });

    function analyzeWithMiniMax(text) {
        results.innerHTML = '<p class="loading">🔄 AI 分析中，請稍候...</p>';

        const systemPrompt = '你是一位專業的邏輯謬誤分析專家。你的任務是分析文本中存在的邏輯謬誤，並用簡潔的方式解釋。';
        
        const userPrompt = `請分析以下文本中存在的邏輯謬誤。如果沒有謬誤，請說明。對於每個檢測到的謬誤，請說明：
1. 謬誤類型（如：人身攻擊、稻草人論證、滑坡謬誤等）
2. 簡短解釋為何這是謬誤

文本：
"""
${text}
"""

請用簡潔的格式返回結果。`;

        const payload = {
            model: 'MiniMax-01',
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userPrompt
                }
            ],
            temperature: 0.7,
            top_p: 0.95,
            max_tokens: 1024
        };

        fetch('https://api.minimaxi.com/v1/text/chatcompletion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MINIMAX_API_KEY}`
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);
            if (data.choices && data.choices.length > 0) {
                const analysisText = data.choices[0].message.content;
                displayResults(analysisText);
            } else if (data.error) {
                results.innerHTML = `<p class="error">❌ API 錯誤: ${data.error.message}</p>`;
            } else {
                results.innerHTML = '<p class="error">❌ 無法獲取分析結果</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            results.innerHTML = `<p class="error">❌ 連接失敗: ${error.message || JSON.stringify(error)}</p>`;
        });
    }

    function displayResults(analysisText) {
        if (!analysisText || analysisText.trim() === '') {
            results.innerHTML = '<p class="placeholder">✅ 未檢測到明顯的謬誤</p>';
            return;
        }

        const lines = analysisText.split('\n').filter(line => line.trim().length > 0);
        
        if (lines.length === 0) {
            results.innerHTML = '<p class="placeholder">✅ 未檢測到明顯的謬誤</p>';
            return;
        }

        let html = '';
        for (const line of lines) {
            if (line.trim()) {
                html += `<div class="fallacy-item">
                    <div class="fallacy-description">${line.trim()}</div>
                </div>`;
            }
        }

        if (!html) {
            results.innerHTML = '<p class="placeholder">✅ 分析完成</p>';
        } else {
            results.innerHTML = html;
        }
    }
});
