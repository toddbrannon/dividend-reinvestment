export interface CalculatorInputs {
  initialAmount: number;
  stockPrice: number;
  annualDividendPerShare: number;
  dividendFrequency: 'weekly' | 'monthly' | 'quarterly';
  withdrawalAmount: number;
  numberOfWithdrawals: number;
  reinvestDividends: boolean;
  initialInvestmentDate: string;
  firstWithdrawalDate: string;
  withdrawalFrequency: 'weekly' | 'monthly' | 'quarterly';
  priceVariance?: number;
  dividendVariance?: number;
  expenseRatio?: number;
}

export interface CalculationResult {
  isGoalAchievable: boolean;
  maxMonthlyWithdrawal?: number;
  requiredDividendYield?: number;
  monthlyBreakdown: MonthlyData[];
  totalDividendsEarned: number;
  totalExpenses: number;
  finalBalance: number;
}

export interface MonthlyData {
  date: string;
  shares: number;
  sharePrice: number;
  dividendAmount: number;
  withdrawalAmount: number;
  expenseAmount: number;
  balance: number;
}

export interface TestScenario {
  name: string;
  description: string;
  inputs: CalculatorInputs;
}