import { CalculatorInputs, CalculationResult, MonthlyData } from '../types';

const getFrequencyMultiplier = (frequency: string): number => {
  switch (frequency) {
    case 'weekly': return 52;
    case 'monthly': return 12;
    case 'quarterly': return 4;
    default: return 12;
  }
};

export const calculateInvestmentResults = (inputs: CalculatorInputs): CalculationResult => {
  const {
    initialAmount,
    stockPrice,
    annualDividendPerShare,
    dividendFrequency,
    withdrawalAmount,
    numberOfWithdrawals,
    reinvestDividends,
    initialInvestmentDate,
    firstWithdrawalDate,
    priceVariance = 0,
    dividendVariance = 0,
    expenseRatio = 0
  } = inputs;

  let currentShares = initialAmount / stockPrice;
  let currentBalance = initialAmount;
  const monthlyBreakdown: MonthlyData[] = [];
  let totalDividendsEarned = 0;
  let totalExpenses = 0;

  const startDate = new Date(initialInvestmentDate);
  const endDate = new Date(firstWithdrawalDate);
  endDate.setMonth(endDate.getMonth() + numberOfWithdrawals);

  const dividendMultiplier = getFrequencyMultiplier(dividendFrequency);
  const dividendPerPeriod = annualDividendPerShare / dividendMultiplier;
  
  // Calculate monthly expense ratio
  const monthlyExpenseRatio = expenseRatio / 100 / 12;

  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    // Apply price variance
    const currentStockPrice = stockPrice * (1 + (Math.random() * 2 - 1) * priceVariance / 100);
    
    // Calculate current value before expenses
    const currentValue = currentShares * currentStockPrice;
    
    // Calculate and apply monthly expenses
    const monthlyExpense = currentValue * monthlyExpenseRatio;
    const sharesToDeductForExpenses = monthlyExpense / currentStockPrice;
    currentShares -= sharesToDeductForExpenses;
    totalExpenses += monthlyExpense;
    
    // Calculate dividends with variance
    const currentDividend = dividendPerPeriod * (1 + (Math.random() * 2 - 1) * dividendVariance / 100);
    const dividendEarned = currentShares * currentDividend;
    totalDividendsEarned += dividendEarned;

    // Reinvest dividends if enabled
    if (reinvestDividends) {
      const newShares = dividendEarned / currentStockPrice;
      currentShares += newShares;
    }

    // Process withdrawal if after firstWithdrawalDate
    let withdrawal = 0;
    if (currentDate >= new Date(firstWithdrawalDate)) {
      withdrawal = withdrawalAmount;
      const sharesToSell = withdrawal / currentStockPrice;
      currentShares -= sharesToSell;
    }

    currentBalance = currentShares * currentStockPrice;

    monthlyBreakdown.push({
      date: currentDate.toISOString().split('T')[0],
      shares: currentShares,
      sharePrice: currentStockPrice,
      dividendAmount: dividendEarned,
      withdrawalAmount: withdrawal,
      expenseAmount: monthlyExpense,
      balance: currentBalance
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  const isGoalAchievable = currentBalance > 0;
  const maxMonthlyWithdrawal = isGoalAchievable ? withdrawalAmount : 
    (initialAmount / numberOfWithdrawals) * 0.95; // 95% of even distribution

  const requiredDividendYield = (withdrawalAmount * 12) / initialAmount * 100;

  return {
    isGoalAchievable,
    maxMonthlyWithdrawal,
    requiredDividendYield,
    monthlyBreakdown,
    totalDividendsEarned,
    totalExpenses,
    finalBalance: currentBalance
  };
};