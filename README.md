<div align="center">
  <img src="./img/plogo.png" alt="Profile Logo" width="100" style="margin-bottom: 20px;">
  <h1>Shahid Ul Islam: AI & Data Science Portfolio</h1>
  <p><b>Machine Learning Engineer | Data Scientist | Research Focused</b></p>
  
  [![Live Deployment](https://img.shields.io/badge/Live-Production-00f2ff?style=for-the-badge&logoColor=white)](https://khanz9664.github.io/portfolio)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shahid-ul-islam-13650998)
  [![GitHub](https://img.shields.io/badge/GitHub-Projects-333?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Khanz9664)
  
  [![Deploy to GitHub Pages](https://github.com/Khanz9664/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Khanz9664/portfolio/actions/workflows/deploy.yml)
  [![Lint Code Base](https://github.com/Khanz9664/portfolio/actions/workflows/lint.yml/badge.svg)](https://github.com/Khanz9664/portfolio/actions/workflows/lint.yml)
  [![Playwright Tests](https://github.com/Khanz9664/portfolio/actions/workflows/test.yml/badge.svg)](https://github.com/Khanz9664/portfolio/actions/workflows/test.yml)

  <br />

  <p align="center">
    <i>"Architecting resilient AI systems by bridging mathematical theory with production-grade engineering."</i>
  </p>
</div>

---

##  Visual Showcase

Experience the high-fidelity design system built with custom modular CSS and cinematic GSAP animations.

<p align="center">
  <img src="img/screenshots/1.png" width="48%" alt="Home Hub" />
  <img src="img/screenshots/2.png" width="48%" alt="Contact Gateway" />
</p>
<p align="center">
  <img src="img/screenshots/3.png" width="48%" alt="Project CTA" />
  <img src="img/screenshots/4.png" width="48%" alt="Mobile Responsive" />
</p>

---

##  Technical Architecture

The portfolio is architected as a modular, high-performance static environment, prioritizing cinematic visuals without compromising on core DevOps stability.

```mermaid
graph TD
    subgraph "Core Engine Layer"
        GSAP["GSAP & ScrollTrigger<br/>(Animation Control)"]
        CanvasJS["Generative Backgrounds<br/>(Math-driven Canvas)"]
        MathJax["MathJax Rendering<br/>(Scientific Articles)"]
    end

    subgraph "Structural Layer"
        HTML5["Semantic HTML5<br/>Modular UI Templates"]
        CSS3["Modular CSS System<br/>(Zero-Error Standard)"]
    end

    subgraph "DevOps & Quality Gates"
        GHA["GitHub Actions CI/CD"]
        Lint["Stylelint & htmlhint<br/>(Static Analysis)"]
        Tests["Playwright E2E Tests<br/>(Functional Verification)"]
    end

    HTML5 --> GSAP
    HTML5 --> MathJax
    CSS3 --> HTML5
    CanvasJS --> GSAP
    
    GHA --> Lint
    GHA --> Tests
    
    Lint --> |Passes| GHA
    Tests --> |Passes| GHA
    
    GHA --> |Atomic Deploy| GH_Pages["Production Env (live)"]

    style GSAP fill:#bd00ff,stroke:#333,stroke-width:2px,color:#fff
    style GHA fill:#2ea44f,stroke:#333,stroke-width:2px,color:#fff
    style Tests fill:#00f2ff,stroke:#333,stroke-width:2px,color:#111
```

---

##  Automated CI/CD Pipeline

Every commitment to the production environment undergoes a rigorous evaluation through our automated quality gates.

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant GHA as GitHub Actions CI
    participant QG as Quality Gates (Lint/Test)
    participant Prod as GitHub Pages

    Dev->>GHA: Git Push (Main)
    activate GHA
    
    par Quality Audit
        GHA->>QG: Execute htmlhint & stylelint
        GHA->>QG: Execute Playwright E2E Suite
    end
    
    QG-->>GHA: Success Report
    
    rect rgb(20, 40, 20)
    Note right of GHA: Deployment Gate
    GHA->>Prod: Trigger Atomic Deployment
    Prod->>Prod: Build & Sync
    Prod->>Dev: Deployment Live
    end
    deactivate GHA
```

---

##  Automated Testing Methodology

To guarantee a premium user experience across all devices, we employ a **Playwright-driven** testing suite.

- **E2E Navigation**: Verifies navbar integrity, mobile menu toggles, and active link states across **Desktop Chrome**, **Firefox**, and **Mobile Safari**.
- **Functional Integrity**: Comprehensive testing of the "Arooth" contact form, including service chip selection and mocked API submissions.
- **Robust Error Handling**: Verified server-side failure detection to ensure graceful feedback to users.
- **Cross-Device Reliability**: Automated testing of the fluid typography and modular grid stacking at key breakpoints (`375px`, `768px`, `1024px`).

---

##  Scientific Methodology: ML Articles

A core pillar of this portfolio is the **"Machine Learning From First Principles"** series. These are rigorous mathematical derivations rendered with `MathJax`.

- **LaTeX Accuracy**: Precise rendering of calculus and linear algebra primitives.
- **Interactive Methodology**: GSAP-driven diagrams to illustrate concepts like Gradient Descent trajectories and Lagrange optimization boundaries.
- **Standard Scientific Narrative**: *Intuition -> Mathematical Derivation -> Algorithmic Implementation*.

---

##  Repository & Tooling

| Category | Tools | Standard |
| :--- | :--- | :--- |
| **Animation** | GSAP 3.12+ | Cinematic / Scroll-synced |
| **Logic** | Vanilla JS (ES6+) | Modular / Modern |
| **Quality** | Playwright, Stylelint | Zero-Error Policy |
| **Hosting** | GitHub Pages | Atomic CI/CD |

### Local Setup
1. **Clone & Install:**
   ```bash
   git clone https://github.com/Khanz9664/portfolio.git
   npm install
   ```
2. **Execute Tests:**
   ```bash
   npm test          # Run headless suite
   npm run test:ui   # Open Playwright UI
   ```
3. **Static Analysis:**
   ```bash
   npx stylelint "**/*.css"
   ```

## Technical Articles

| Article | Description | Category |
| :--- | :--- | :--- |
| **[Gradient Descent](https://khanz9664.github.io/portfolio/articles/gradient-descent.html)** | The workhorse of machine learning optimization. Understand partial derivatives, learning rates, and convergence behavior from first principles. | Optimization |
| **[Lagrange Multipliers](https://khanz9664.github.io/portfolio/articles/lagrange-multipliers.html)** | Constrained optimization unlocked. A deep dive into the method of Lagrange multipliers, dual problems, and their geometric intuition. | Optimization |
| **[Bias Variance TradeOff](https://khanz9664.github.io/portfolio/articles/biasvariance.html)** | The fundamental trade-off between model simplicity and prediction accuracy. | Optimization |
| **[Linear Regression](https://khanz9664.github.io/portfolio/articles/linear-regression.html)** | The foundation of predictive modeling. Complete mathematical derivation of Ordinary Least Squares, normal equations, and assumptions. | Supervised Learning |
| **[Logistic Regression](https://khanz9664.github.io/portfolio/articles/logistic-regression.html)** | Moving from continuous to categorical. Explore sigmoid functions, maximum likelihood estimation, and cross-entropy loss gradients. | Classification |
| **[Neural Networks](https://khanz9664.github.io/portfolio/articles/neuralnets.html)** | The mathematical foundations of deep learning. Explore forward propagation, backpropagation derivations, and the universal approximation theorem. | Deep Learning |
| **[Principal Component Analysis](https://khanz9664.github.io/portfolio/articles/pca.html)** | From variance maximization to SVD equivalence. A definitive guide to understanding PCA's mathematical machinery from the ground up. | Dimensionality Reduction |
| **[Information Theory](https://khanz9664.github.io/portfolio/articles/infotheory.html)** | The mathematics of uncertainty and learning. Explore Shannon entropy, KL divergence, cross-entropy, and the maximum entropy principle. | Information Theory |
| **[Singular Value Decomposition](https://khanz9664.github.io/portfolio/articles/svd.html)** | The most powerful factorization in all of mathematics. Works on every matrix, reveals hidden geometry, and underlies PCA and compression. | Linear Algebra |

---
<p align="center">
  Engineering Design © 2025 Shahid Ul Islam. <br />
  Built with passion for Mathematical Rigor and Technical Excellence.
</p>
<p align="center">
  <a href="https://khanz9664.github.io/portfolio">
    <img src="https://img.shields.io/badge/Portfolio-255E00?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfolio">
  </a>
  <a href="https://github.com/khanz9664">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://www.linkedin.com/in/shahid-ul-islam-13650998/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://www.kaggle.com/shaddy9664">
    <img src="https://img.shields.io/badge/Kaggle-20BEFF?style=for-the-badge&logo=Kaggle&logoColor=white" alt="Kaggle">
  </a>
  <a href="mailto:[EMAIL_ADDRESS]">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
</p>
