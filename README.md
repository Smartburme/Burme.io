<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Smart Burme - Main</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #000;
      color: #fff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #111;
      padding: 1rem 2rem;
      border-bottom: 1px solid #333;
      position: sticky;
      top: 0;
      z-index: 999;
    }

    .title {
      font-size: 1.8rem;
      font-weight: bold;
      background: linear-gradient(45deg, cyan, dodgerblue);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .menu-btn {
      font-size: 1.5rem;
      cursor: pointer;
    }

    .slide-menu {
      position: fixed;
      top: 0;
      right: -250px;
      width: 250px;
      height: 100%;
      background: #111;
      transition: right 0.3s ease;
      padding: 2rem 1rem;
      z-index: 1000;
    }

    .slide-menu.show {
      right: 0;
    }

    .slide-menu a {
      display: block;
      color: #fff;
      margin: 1rem 0;
      text-decoration: none;
      font-size: 1.2rem;
    }

    main {
      flex: 1;
      padding: 2rem;
      text-align: center;
    }

    .generate-btn {
      margin-top: 2rem;
      padding: 1rem 2rem;
      font-size: 1.2rem;
      background: linear-gradient(90deg, cyan, dodgerblue);
      color: #000;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .generate-btn:hover {
      transform: scale(1.05);
    }

    .light-effect {
      position: fixed;
      bottom: 60px;
      left: 0;
      width: 100%;
      height: 80px;
      background: radial-gradient(ellipse at center, #0ff33a33, transparent);
      animation: float 3s ease-in-out infinite;
      z-index: 1;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 1.2rem 0;
      text-align: center;
      font-size: 0.9rem;
      background: transparent;
      color: #0ff;
      text-shadow: 0 0 10px cyan;
      z-index: 10;
    }
  </style>
</head>
<body>

  <header>
    <div class="title">Smart Burme</div>
    <div class="menu-btn" onclick="toggleMenu()">☰</div>
  </header>

  <div class="slide-menu" id="slideMenu">
    <a href="#">Account</a>
    <a href="#">Settings</a>
    <hr style="border-color: #333;">
    <a href="#">Contact</a>
    <a href="#">About</a>
  </div>

  <main>
    <h2>Generate AI Video</h2>
    <p>Upload a photo and generate a smart video with AI.</p>
    <button class="generate-btn">Generate Video</button>
  </main>

  <div class="light-effect"></div>

  <footer>
    Deploy by Aung Myo Kyaw
  </footer>

  <script>
    function toggleMenu() {
      const menu = document.getElementById('slideMenu');
      menu.classList.toggle('show');
    }
  </script>

</body>
</html>
