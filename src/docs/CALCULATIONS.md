# Dividend Reinvestment & Withdrawal Calculator Documentation

## Overview

This document explains the calculation methodology used in the Dividend Reinvestment & Withdrawal Calculator. The calculator simulates investment performance considering dividends, reinvestment, withdrawals, expenses, and market variance.

## Core Calculations

### 1. Initial Setup

```typescript
// Convert annual values to periodic values based on frequency
const dividendMultiplier = getFrequencyMultiplier(dividendFrequency);
const dividendPerPeriod = annualDividendPerShare / dividendMultiplier;

// Calculate initial shares owned
const initialShares = initialAmount / stockPrice;

// Convert annual expense ratio to monthly
const monthlyExpenseRatio = expenseRatio / 100 / 12;
```

In plain English:
1. We first determine how often dividends are paid (weekly, monthly, or quarterly) and convert the annual dividend into the appropriate payment amount for each period
2. We calculate how many shares you can buy with your initial investment by dividing your investment amount by the price per share
3. We convert the annual expense ratio (like 0.5%) into a monthly rate by dividing by 12

### 2. Monthly Processing Sequence

For each month in the simulation:

#### A. Stock Price Calculation
```typescript
currentStockPrice = stockPrice * (1 + (Math.random() * 2 - 1) * priceVariance / 100);
```

In plain English:
- We simulate market price changes using random variation
- For example, with 5% variance:
  - Price could go up or down by up to 5%
  - A $100 stock could end up anywhere between $95 and $105
  - Each month gets a new random price within this range

#### B. Expense Deduction
```typescript
const currentValue = currentShares * currentStockPrice;
const monthlyExpense = currentValue * monthlyExpenseRatio;
const sharesToDeductForExpenses = monthlyExpense / currentStockPrice;
currentShares -= sharesToDeductForExpenses;
```

In plain English:
1. Calculate your current portfolio value by multiplying shares owned by current price
2. Calculate the monthly fee based on your portfolio value
3. Convert the fee amount into an equivalent number of shares
4. Subtract those shares from your total (this is how ETF fees work in practice)

#### C. Dividend Processing
```typescript
const currentDividend = dividendPerPeriod * (1 + (Math.random() * 2 - 1) * dividendVariance / 100);
const dividendEarned = currentShares * currentDividend;
```

In plain English:
1. Calculate this period's dividend payment, including any random variance
2. For example, with 3% variance:
   - A $1 dividend could be between $0.97 and $1.03
   - This simulates real-world dividend changes
3. Multiply by your number of shares to get total dividend payment

#### D. Dividend Reinvestment
```typescript
if (reinvestDividends) {
  const newShares = dividendEarned / currentStockPrice;
  currentShares += newShares;
}
```

In plain English:
1. If reinvestment is enabled:
   - Take your dividend payment
   - Buy new shares at the current market price
   - Add these new shares to your total
2. This is how compound growth happens!

#### E. Withdrawal Processing
```typescript
if (currentDate >= firstWithdrawalDate) {
  const sharesToSell = withdrawalAmount / currentStockPrice;
  currentShares -= sharesToSell;
}
```

In plain English:
1. When it's time for a withdrawal:
   - Calculate how many shares need to be sold to get the desired withdrawal amount
   - Subtract these shares from your total
2. Example: To withdraw $500 when shares are $50 each:
   - Need to sell 10 shares ($500 ÷ $50 = 10)

## Key Metrics

### 1. Goal Achievement
```typescript
const isGoalAchievable = finalBalance > 0;
```

In plain English:
- Your withdrawal strategy is sustainable if you still have money left at the end
- If your balance hits zero, the strategy needs adjustment

### 2. Maximum Sustainable Withdrawal
```typescript
const maxMonthlyWithdrawal = isGoalAchievable ? 
  withdrawalAmount : 
  (initialAmount / numberOfWithdrawals) * 0.95;
```

In plain English:
1. If your current withdrawal amount works, that's your maximum
2. If not, we calculate a conservative estimate:
   - Take your initial investment
   - Divide it evenly across all planned withdrawals
   - Reduce by 5% for safety margin

### 3. Required Dividend Yield
```typescript
const requiredDividendYield = (withdrawalAmount * 12) / initialAmount * 100;
```

In plain English:
1. Calculate your annual withdrawal need (monthly × 12)
2. Divide by your initial investment
3. Convert to percentage
4. This shows what dividend yield you need to cover withdrawals
   - Example: $12,000 annual withdrawal on $100,000 investment
   - Requires 12% dividend yield ($12,000 ÷ $100,000 × 100)

## Market Variance

### Price Variance
```typescript
stockPrice * (1 + (Math.random() * 2 - 1) * priceVariance / 100)
```

Formula Translation:
1. `Math.random() * 2 - 1` creates a random number between -1 and 1
   - `Math.random()` gives us 0 to 1
   - Multiply by 2 gives us 0 to 2
   - Subtract 1 gives us -1 to 1
2. Multiply by `priceVariance / 100` to scale the random number
   - If variance is 10%, this gives us -0.1 to 0.1
3. Add 1 to get a multiplier between 0.9 and 1.1
4. Multiply by base stock price to get final price
   - For $100 stock with 10% variance:
   - Could be anywhere from $90 to $110

### Dividend Variance
```typescript
dividendPerPeriod * (1 + (Math.random() * 2 - 1) * dividendVariance / 100)
```

Formula Translation:
1. Same random number generation as price variance
2. For 5% dividend variance:
   - Random multiplier between 0.95 and 1.05
   - $1 dividend could become $0.95 to $1.05
   - Simulates dividend cuts or increases

## Example Calculation Flow

For a monthly dividend ETF with:
- Initial Investment: $10,000
- Stock Price: $100
- Annual Dividend: $8/share
- Monthly Withdrawal: $200
- Expense Ratio: 0.5%

1. Initial Setup:
   - Initial Shares: 100 ($10,000 ÷ $100)
   - Monthly Dividend: $0.67 ($8 ÷ 12)
   - Monthly Expense Ratio: 0.042% (0.5% ÷ 12)

2. First Month:
   - Portfolio Value: $10,000 (100 shares × $100)
   - Monthly Expense: $4.17 ($10,000 × 0.042%)
   - Shares After Expenses: 99.96 shares
   - Dividend Earned: $66.97 (99.96 shares × $0.67)
   - New Shares from Reinvestment: 0.67 ($66.97 ÷ $100)
   - Shares After Reinvestment: 100.63
   - Withdrawal: 2 shares ($200 ÷ $100)
   - Final Shares: 98.63
   - Final Value: $9,863

This process repeats monthly, with price and dividend variations affecting the results.