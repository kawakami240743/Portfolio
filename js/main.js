console.log("Unity Engineer Portfolio Loaded");

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        // スムーススクロールを実行
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // 要素が10%見えたらアニメーションを開始
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // CSSの .animate-on-scroll.visible クラスを付与
            entry.target.classList.add('visible');
            // 一度アニメーションしたら監視を停止したい場合は、以下の行を有効化
            // observer.unobserve(entry.target); 
        } else {
            // スクロールで戻ったときのためにクラスを削除（繰り返しアニメーションする場合）
            entry.target.classList.remove('visible');
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
    if (!typingElement) return; // エラーガード

    if (i < text.length) {
        // CSSの .cursor クラスと連携
        typingElement.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
        i++;
        setTimeout(typeWriter, 50);
    } else {
        // 完了後、カーソルを削除してテキストを確定
        typingElement.innerHTML = text; 
    }
}

// Start typing effect after a slight delay
setTimeout(typeWriter, 1000);
