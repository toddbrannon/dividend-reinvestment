import { TestScenario } from '../types';

const today = new Date();
const nextMonth = new Date(today);
nextMonth.setMonth(today.getMonth() + 1);

export const testScenarios: TestScenario[] = [
  {
    name: 'Conservative Income',
    description: 'Low-risk ETF with stable dividends, minimal variance',
    inputs: {
      initialAmount: 50000,
      stockPrice: 25,
      annualDividendPerShare: 1.25,
      dividendFrequency: 'monthly',
      withdrawalAmount: 200,
      numberOfWithdrawals: 60,
      reinvestDividends: true,
      initialInvestmentDate: today.toISOString().split('T')[0],
      firstWithdrawalDate: nextMonth.toISOString().split('T')[0],
      withdrawalFrequency: 'monthly',
      priceVariance: 2,
      dividendVariance: 1,
      expenseRatio: 0.25
    }
  },
  {
    name: 'High Yield Risk',
    description: 'High-yield ETF with significant price and dividend variance',
    inputs: {
      initialAmount: 25000,
      stockPrice: 15,
      annualDividendPerShare: 2.4,
      dividendFrequency: 'monthly',
      withdrawalAmount: 300,
      numberOfWithdrawals: 48,
      reinvestDividends: true,
      initialInvestmentDate: today.toISOString().split('T')[0],
      firstWithdrawalDate: nextMonth.toISOString().split('T')[0],
      withdrawalFrequency: 'monthly',
      priceVariance: 15,
      dividendVariance: 10,
      expenseRatio: 0.85
    }
  },
  {
    name: 'Quarterly Dividend Growth',
    description: 'Growth-focused ETF with quarterly distributions',
    inputs: {
      initialAmount: 75000,
      stockPrice: 50,
      annualDividendPerShare: 1.8,
      dividendFrequency: 'quarterly',
      withdrawalAmount: 750,
      numberOfWithdrawals: 24,
      reinvestDividends: true,
      initialInvestmentDate: today.toISOString().split('T')[0],
      firstWithdrawalDate: nextMonth.toISOString().split('T')[0],
      withdrawalFrequency: 'monthly',
      priceVariance: 8,
      dividendVariance: 3,
      expenseRatio: 0.45
    }
  },
  {
    name: 'BKLN Simulation',
    description: 'Based on Invesco Senior Loan ETF characteristics',
    inputs: {
      initialAmount: 15000,
      stockPrice: 14.5,
      annualDividendPerShare: 1.15,
      dividendFrequency: 'monthly',
      withdrawalAmount: 471,
      numberOfWithdrawals: 36,
      reinvestDividends: true,
      initialInvestmentDate: today.toISOString().split('T')[0],
      firstWithdrawalDate: nextMonth.toISOString().split('T')[0],
      withdrawalFrequency: 'monthly',
      priceVariance: 5,
      dividendVariance: 3,
      expenseRatio: 0.65
    }
  },
  {
    name: 'Aggressive Withdrawal',
    description: 'Testing sustainability of higher withdrawal rates',
    inputs: {
      initialAmount: 100000,
      stockPrice: 30,
      annualDividendPerShare: 2.4,
      dividendFrequency: 'monthly',
      withdrawalAmount: 1500,
      numberOfWithdrawals: 48,
      reinvestDividends: true,
      initialInvestmentDate: today.toISOString().split('T')[0],
      firstWithdrawalDate: nextMonth.toISOString().split('T')[0],
      withdrawalFrequency: 'monthly',
      priceVariance: 10,
      dividendVariance: 5,
      expenseRatio: 0.55
    }
  }
];