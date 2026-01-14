const transactions = [
  {
    date: "2026-01-13",
    description: "Salary Deposit",
    category: "Salary",
    type: "income",
    amount: 5000,
  },
  {
    date: "2026-01-12",
    description: "Grocery Shopping",
    category: "Food",
    type: "expense",
    amount: -150,
  },
  {
    date: "2026-01-11",
    description: "Freelance Project",
    category: "Freelance",
    type: "income",
    amount: 800,
  },
  {
    date: "2026-01-10",
    description: "Electric Bill",
    category: "Utilities",
    type: "expense",
    amount: -85,
  },
  {
    date: "2026-01-09",
    description: "Restaurant",
    category: "Food",
    type: "expense",
    amount: -65,
  },
  {
    date: "2026-01-08",
    description: "Investment Return",
    category: "Investment",
    type: "income",
    amount: 320,
  },
  {
    date: "2026-01-07",
    description: "Internet Bill",
    category: "Utilities",
    type: "expense",
    amount: -60,
  },
  {
    date: "2026-01-06",
    description: "Client Payment",
    category: "Freelance",
    type: "income",
    amount: 1200,
  },
  {
    date: "2026-01-05",
    description: "Gas Station",
    category: "Transport",
    type: "expense",
    amount: -45,
  },
  {
    date: "2026-01-04",
    description: "Online Shopping",
    category: "Shopping",
    type: "expense",
    amount: -230,
  },
  {
    date: "2026-01-03",
    description: "Gym Membership",
    category: "Health",
    type: "expense",
    amount: -50,
  },
  {
    date: "2026-01-02",
    description: "Dividend Payment",
    category: "Investment",
    type: "income",
    amount: 150,
  },
  {
    date: "2026-01-01",
    description: "Rent Payment",
    category: "Housing",
    type: "expense",
    amount: -1200,
  },
  {
    date: "2025-12-30",
    description: "Bonus",
    category: "Salary",
    type: "income",
    amount: 2000,
  },
  {
    date: "2025-12-28",
    description: "Phone Bill",
    category: "Utilities",
    type: "expense",
    amount: -55,
  },
];

let filteredTransactions = [...transactions];
let currentPage = "home";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

function updateHomeBalances() {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = Math.abs(
    transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const totalBalance = totalIncome - totalExpense;

  document.getElementById("homeBalance").textContent =
    formatCurrency(totalBalance);
  document.getElementById("homeIncome").textContent =
    formatCurrency(totalIncome);
  document.getElementById("homeExpense").textContent =
    formatCurrency(totalExpense);

  // Update analytics summary
  document.getElementById("summaryIncome").textContent =
    formatCurrency(totalIncome);
  document.getElementById("summaryExpense").textContent =
    formatCurrency(totalExpense);
  document.getElementById("transactionCount").textContent = transactions.length;

  // Calculate most spent category
  const categorySpending = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categorySpending[t.category] =
        (categorySpending[t.category] || 0) + Math.abs(t.amount);
    });

  const topCat = Object.entries(categorySpending).sort(
    (a, b) => b[1] - a[1]
  )[0];
  if (topCat) {
    document.getElementById("topCategory").textContent = topCat[0];
    document.getElementById("topCategoryAmount").textContent =
      formatCurrency(topCat[1]) + " spent";
  }
}

function renderRecentTransactions() {
  const container = document.getElementById("recentTransactions");
  const recent = transactions.slice(0, 3);

  container.innerHTML = recent
    .map(
      (t) => `
                <div class="transaction-item">
                    <div class="transaction-info">
                        <div class="transaction-icon ${t.type}">
                            ${t.type === "income" ? "↓" : "↑"}
                        </div>
                        <div class="transaction-details">
                            <div class="transaction-description">${
                              t.description
                            }</div>
                            <div class="transaction-date">${new Date(
                              t.date
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}</div>
                        </div>
                    </div>
                    <div class="transaction-amount ${
                      t.amount > 0 ? "positive" : "negative"
                    }">
                        ${formatCurrency(t.amount)}
                    </div>
                </div>
            `
    )
    .join("");
}

function renderTransactionsTable() {
  const tbody = document.getElementById("transactionsBody");
  tbody.innerHTML = filteredTransactions
    .map(
      (t) => `
                <tr>
                    <td>${new Date(t.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}</td>
                    <td>${t.description}</td>
                    <td>${t.category}</td>
                    <td><span class="type-badge ${t.type}">${t.type}</span></td>
                    <td style="color: ${
                      t.amount > 0 ? "#16a34a" : "#dc2626"
                    }; font-weight: 600;">${formatCurrency(t.amount)}</td>
                </tr>
            `
    )
    .join("");

  const mobileContainer = document.getElementById("mobileTransactions");
  mobileContainer.innerHTML = filteredTransactions
    .map(
      (t) => `
                <div class="mobile-transaction-card">
                    <div class="mobile-transaction-header">
                        <div>
                            <div class="mobile-transaction-title">${
                              t.description
                            }</div>
                            <div class="mobile-transaction-date">${new Date(
                              t.date
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}</div>
                        </div>
                        <div class="mobile-transaction-amount" style="color: ${
                          t.amount > 0 ? "#16a34a" : "#dc2626"
                        }">
                            ${formatCurrency(t.amount)}
                        </div>
                    </div>
                    <div class="mobile-transaction-footer">
                        <div class="mobile-transaction-category">${
                          t.category
                        }</div>
                        <span class="type-badge ${t.type}">${t.type}</span>
                    </div>
                </div>
            `
    )
    .join("");
}

function populateCategoryFilter() {
  const categories = [...new Set(transactions.map((t) => t.category))];
  const select = document.getElementById("categoryFilter");

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function applyFilters() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const typeFilter = document.getElementById("typeFilter").value;
  const categoryFilter = document.getElementById("categoryFilter").value;

  filteredTransactions = transactions.filter((t) => {
    const dateMatch =
      (!startDate || t.date >= startDate) && (!endDate || t.date <= endDate);
    const typeMatch = typeFilter === "all" || t.type === typeFilter;
    const categoryMatch =
      categoryFilter === "all" || t.category === categoryFilter;
    return dateMatch && typeMatch && categoryMatch;
  });

  renderTransactionsTable();
}

function drawBarChart(ctx, labels, incomeData, expenseData) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const padding = 50;
  const barWidth = (width - padding * 2) / (labels.length * 2.5);

  const maxValue = Math.max(...incomeData, ...expenseData);
  const scale = (height - padding * 2) / maxValue;

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  labels.forEach((label, i) => {
    const x = padding + i * barWidth * 2.5;
    const incomeHeight = incomeData[i] * scale;
    const expenseHeight = expenseData[i] * scale;

    ctx.fillStyle = "#16a34a";
    ctx.fillRect(x, height - padding - incomeHeight, barWidth, incomeHeight);

    ctx.fillStyle = "#dc2626";
    ctx.fillRect(
      x + barWidth + 5,
      height - padding - expenseHeight,
      barWidth,
      expenseHeight
    );

    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, x + barWidth, height - padding + 20);
  });

  ctx.fillStyle = "#16a34a";
  ctx.fillRect(width - 150, 20, 15, 15);
  ctx.fillStyle = "#1e293b";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Income", width - 130, 32);

  ctx.fillStyle = "#dc2626";
  ctx.fillRect(width - 150, 40, 15, 15);
  ctx.fillText("Expense", width - 130, 52);
}

function createIncomeExpenseChart() {
  const canvas = document.getElementById("incomeExpenseChart");
  const ctx = canvas.getContext("2d");

  const monthlyData = {};
  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleDateString("en-US", {
      month: "short",
    });
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }
    if (t.type === "income") {
      monthlyData[month].income += t.amount;
    } else {
      monthlyData[month].expense += Math.abs(t.amount);
    }
  });

  const labels = Object.keys(monthlyData);
  const incomeData = labels.map((l) => monthlyData[l].income);
  const expenseData = labels.map((l) => monthlyData[l].expense);

  drawBarChart(ctx, labels, incomeData, expenseData);
}

function drawPieChart(ctx, labels, data, total) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 80;

  const colors = [
    "#3B82F6",
    "#60a5fa",
    "#93c5fd",
    "#dbeafe",
    "#16a34a",
    "#f59e0b",
  ];

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  let currentAngle = -Math.PI / 2;

  data.forEach((value, i) => {
    const sliceAngle = (value / total) * 2 * Math.PI;

    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fill();

    const textAngle = currentAngle + sliceAngle / 2;
    const textX = centerX + Math.cos(textAngle) * (radius + 40);
    const textY = centerY + Math.sin(textAngle) * (radius + 40);

    ctx.fillStyle = "#1e293b";
    ctx.font = "12px sans-serif";
    ctx.textAlign = textX > centerX ? "left" : "right";
    ctx.fillText(labels[i], textX, textY);

    currentAngle += sliceAngle;
  });
}

function createDistributionChart() {
  const canvas = document.getElementById("distributionChart");
  const ctx = canvas.getContext("2d");

  const categoryData = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryData[t.category] =
        (categoryData[t.category] || 0) + Math.abs(t.amount);
    });

  const labels = Object.keys(categoryData);
  const data = Object.values(categoryData);
  const total = data.reduce((a, b) => a + b, 0);

  drawPieChart(ctx, labels, data, total);
}

function setCanvasSize() {
  const canvases = document.querySelectorAll("canvas");
  canvases.forEach((canvas) => {
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = 300;
  });
}

function navigateToPage(pageName) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".nav-item")
    .forEach((n) => n.classList.remove("active"));

  document.getElementById(pageName + "Page").classList.add("active");
  document.querySelector(`[data-page="${pageName}"]`).classList.add("active");

  const titles = {
    home: "Home",
    transactions: "Transactions",
    analytics: "Analytics",
    profile: "Profile",
  };
  document.getElementById("pageTitle").textContent = titles[pageName];

  currentPage = pageName;

  if (pageName === "analytics") {
    setTimeout(() => {
      setCanvasSize();
      createIncomeExpenseChart();
      createDistributionChart();
    }, 100);
  }

  if (window.innerWidth <= 768) {
    document.getElementById("sidebar").classList.remove("mobile-visible");
    document.getElementById("overlay").classList.remove("active");
  }
}

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    const page = item.getAttribute("data-page");
    navigateToPage(page);
  });
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("mobile-visible");
  document.getElementById("overlay").classList.toggle("active");
});

document.getElementById("overlay").addEventListener("click", () => {
  document.getElementById("sidebar").classList.remove("mobile-visible");
  document.getElementById("overlay").classList.remove("active");
});

document.getElementById("startDate").addEventListener("change", applyFilters);
document.getElementById("endDate").addEventListener("change", applyFilters);
document.getElementById("typeFilter").addEventListener("change", applyFilters);
document
  .getElementById("categoryFilter")
  .addEventListener("change", applyFilters);

window.addEventListener("resize", () => {
  if (currentPage === "analytics") {
    setCanvasSize();
    createIncomeExpenseChart();
    createDistributionChart();
  }
});

populateCategoryFilter();
updateHomeBalances();
renderRecentTransactions();
renderTransactionsTable();
