console.log("Unity Engineer Portfolio Loaded");

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // #hero から hero を取得
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // ページ遷移が多いため、スクロールアニメーションは一度実行したら保持する方が自然な場合がある
            // entry.target.classList.remove('visible'); 
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(section => {
    observer.observe(section);
});

// Typing effect for hero text
const text = "ゲーム開発者 | Unity エンジニア | C# プログラマー";
const typingElement = document.querySelector('.typing-effect');
let i = 0;

function typeWriter() {
    if (!typingElement) return; // Guard clause for pages without typing effect

    if (i < text.length) {
        typingElement.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
        i++;
        setTimeout(typeWriter, 50);
    } else {
        typingElement.innerHTML = text; // Remove cursor at end
    }
}

// Start typing effect after a slight delay
setTimeout(typeWriter, 1000);


// ------------------------------------------------------------------
// 【新規追加】ギャラリーの自動スクロール機能
// ------------------------------------------------------------------

function startImageCarousel() {
    const galleryGrid = document.querySelector('.project-gallery .gallery-grid');
    if (!galleryGrid) return;

    const scrollSpeed = 2; // 1回のタイマーで移動するピクセル数
    const intervalTime = 30; // ms (描画更新頻度)
    let scrollInterval;

    // スムーズスクロールを停止するためのフラグ
    let isPaused = false;
    
    // スクロール処理を実行する関数
    const scroll = () => {
        if (isPaused) return;

        // 右端に到達したかチェック (スクロール幅 >= 最大スクロール位置)
        // scrollWidth: コンテンツ全体の幅
        // clientWidth: 表示領域の幅
        // scrollLeft: 現在のスクロール位置
        if (galleryGrid.scrollLeft + galleryGrid.clientWidth >= galleryGrid.scrollWidth) {
            // 右端に到達したら、アニメーションをリセットする
            // CSSアニメーションのように無限ループに見せるため、最初の位置に戻す
            galleryGrid.scrollLeft = 0; 
        } else {
            // 通常のスクロール
            galleryGrid.scrollLeft += scrollSpeed;
        }
    };

    // 自動スクロールを開始
    scrollInterval = setInterval(scroll, intervalTime);

    // ホバー時にスクロールを停止・再開
    galleryGrid.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    galleryGrid.addEventListener('mouseleave', () => {
        isPaused = false;
    });
}

// ドキュメント全体が読み込まれた後にカルーセルを開始
window.onload = function() {
    startImageCarousel();
};
