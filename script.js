let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

let clickCount = 0;  // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
    "??bb你认真的吗…",
    "宝贝要不再想想？",
    "宝宝不许选这个！ ",
    "小宝我会很伤心…",
    "绝对不行！！！"
];
const container = document.querySelector('.container');
let containerRect;

function getRandomPosition(element) {
    // 如果 containerRect 还未初始化，则获取容器的尺寸和位置
    if (!containerRect) {
        containerRect = container.getBoundingClientRect();
    }

    // 获取按钮自身的尺寸
    const elementRect = element.getBoundingClientRect();

    // 计算容器内可移动的最大范围
    const maxX = containerRect.width - elementRect.width;
    const maxY = containerRect.height - elementRect.height;

    // 生成随机位置
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    return { top: randomY + 'px', left: randomX + 'px' };
}

// No 按钮点击事件
noButton.addEventListener("click", function () {
    clickCount++;

    // 让 Yes 变大，每次放大 2 倍
    let yesSize = 1 + (clickCount * 1);
    yesButton.style.transform = `scale(${yesSize})`;

    // 挤压 No 按钮，每次右移 100px
    const newPosition = getRandomPosition(noButton);
    noButton.style.position = 'absolute'; // 需要设置为绝对定位才能使用 top 和 left
    noButton.style.top = newPosition.top;
    noButton.style.left = newPosition.left;

    // **新增：让图片和文字往上移动**
    let moveUp = clickCount * 20; // 每次上移 20px
    mainImage.style.transform = `translateY(-${moveUp}px)`;
    questionText.style.transform = `translateY(-${moveUp}px)`;

    // No 文案变化（前 5 次变化）
    if (clickCount <= 5) {
        noButton.innerText = noTexts[clickCount - 1];
    }

    // 图片变化（前 5 次变化）
    if (clickCount == 1) mainImage.src = "images/shocked.gif"; // 震惊
    if (clickCount == 2) mainImage.src = "images/think.gif";   // 思考
    if (clickCount == 3) mainImage.src = "images/angry.gif";   // 生气
    if (clickCount == 4) mainImage.src = "images/crying.gif";  // 哭
    if (clickCount >= 5) mainImage.src = "images/crying.gif";  // 之后一直是哭

});

// Yes 按钮点击后，进入表白成功页面
yesButton.addEventListener("click", function () {
    document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text">!!!喜欢你!!!!</h1>
            <img src="images/hug.gif" alt="拥抱" class="yes-image">
        </div>
    `;

    document.body.style.overflow = "hidden";
});