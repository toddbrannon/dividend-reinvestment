import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar, Percent, RefreshCw, Beaker, BookOpen } from 'lucide-react';
import { CalculatorInputs, CalculationResult } from '../types';
import { calculateInvestmentResults } from '../utils/calculations';
import { testScenarios } from '../data/testScenarios';
import HowItWorks from './HowItWorks';

const initialInputs: CalculatorInputs = {
  initialAmount: 15000,
  stockPrice: 100,
  annualDividendPerShare: 8,
  dividendFrequency: 'monthly',
  withdrawalAmount: 471,
  numberOfWithdrawals: 36,
  reinvestDividends: true,
  initialInvestmentDate: new Date().toISOString().split('T')[0],
  firstWithdrawalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  withdrawalFrequency: 'monthly',
  priceVariance: 0,
  dividendVariance: 0,
  expenseRatio: 0.65
};

// Set to true to enable test scenarios, false for production
const ENABLE_TEST_SCENARIOS = true;

export default function DividendCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(initialInputs);
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const scenarioIndex = parseInt(e.target.value);
    if (scenarioIndex >= 0) {
      setInputs(testScenarios[scenarioIndex].inputs);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculationResults = calculateInvestmentResults(inputs);
    setResults(calculationResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsHowItWorksOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            How It Works
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900 mb-4">
            Dividend Reinvestment & Withdrawal Calculator
          </h1>
          <p className="text-lg text-green-700 mb-6">
            Plan your dividend investment strategy and calculate sustainable withdrawal rates
          </p>
          
          {ENABLE_TEST_SCENARIOS && (
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-3 text-green-800">
                <Beaker className="w-5 h-5" />
                <h2 className="font-semibold">Test Scenarios</h2>
              </div>
              <select
                onChange={handleScenarioChange}
                className="w-full p-2 border border-green-300 rounded-md bg-green-50 text-green-800"
              >
                <option value="-1">Select a test scenario...</option>
                {testScenarios.map((scenario, index) => (
                  <option key={index} value={index}>
                    {scenario.name} - {scenario.description}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 border border-green-200">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-green-800">
                <DollarSign className="w-5 h-5" />
                Investment Details
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-green-700">
                  Initial Amount Invested
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-green-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="initialAmount"
                    value={inputs.initialAmount}
                    onChange={handleInputChange}
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-green-300 rounded-md bg-green-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700">
                  Stock Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-green-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="stockPrice"
                    value={inputs.stockPrice}
                    onChange={handleInputChange}
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-green-300 rounded-md bg-green-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700">
                  Annual Dividend Per Share
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-green-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="annualDividendPerShare"
                    value={inputs.annualDividendPerShare}
                    onChange={handleInputChange}
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-green-300 rounded-md bg-green-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700">
                  Dividend Frequency
                </label>
                <select
                  name="dividendFrequency"
                  value={inputs.dividendFrequency}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-green-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-green-50"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700">
                  ETF Expense Ratio (%)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="expenseRatio"
                    value={inputs.expenseRatio}
                    onChange={handleInputChange}
                    step="0.01"
                    className="focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-green-300 rounded-md bg-green-50"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-green-800">
                <Calculator className="w-5 h-5" />
                Withdrawal Strategy
              </h2>

              <div>
                <label className="block text-sm font-medium text-green-700">
                  Regular Withdrawal Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-green-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="withdrawalAmount"
                    value={inputs.withdrawalAmount}
                    onChange={handleInputChange}
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-green-300 rounded-md bg-green-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700">
                  Number of Withdrawals
                </label>
                <input
                  type="number"
                  name="numberOfWithdrawals"
                  value={inputs.numberOfWithdrawals}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-green-300 rounded-md bg-green-50"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="reinvestDividends"
                  checked={inputs.reinvestDividends}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
                />
                <label className="ml-2 block text-sm text-green-700">
                  Reinvest Dividends
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-green-800">
                <Calendar className="w-5 h-5" />
                Dates
              </h2>

              <div>
                <label className="block text-sm font-medium text-green-700">
                  Initial Investment Date
                </label>
                <input
                  type="date"
                  name="initialInvestmentDate"
                  value={inputs.initialInvestmentDate}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-green-300 rounded-md bg-green-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700">
                  First Withdrawal Date
                </label>
                <input
                  type="date"
                  name="firstWithdrawalDate"
                  value={inputs.firstWithdrawalDate}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-green-300 rounded-md bg-green-50"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-green-800">
                <Percent className="w-5 h-5" />
                Variance Analysis
              </h2>

              <div>
                <label className="block text-sm font-medium text-green-700">
                  Stock Price Variance (%)
                </label>
                <input
                  type="number"
                  name="priceVariance"
                  value={inputs.priceVariance}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-green-300 rounded-md bg-green-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700">
                  Dividend Variance (%)
                </label>
                <input
                  type="number"
                  name="dividendVariance"
                  value={inputs.dividendVariance}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-green-300 rounded-md bg-green-50"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                Calculate Results
              </button>
            </div>
          </form>

          {results && (
            <div className="mt-8 border-t border-green-200 pt-8">
              <h3 className="text-2xl font-bold text-green-900 mb-6">Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">Goal Achievement</h4>
                  <p className={`text-xl font-bold ${results.isGoalAchievable ? 'text-green-600' : 'text-red-600'}`}>
                    {results.isGoalAchievable ? 'Achievable' : 'Not Achievable'}
                  </p>
                  {!results.isGoalAchievable && results.maxMonthlyWithdrawal && (
                    <p className="mt-2 text-sm text-green-700">
                      Maximum sustainable monthly withdrawal: ${results.maxMonthlyWithdrawal.toFixed(2)}
                    </p>
                  )}
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">Required Dividend Yield</h4>
                  <p className="text-xl font-bold text-green-600">
                    {results.requiredDividendYield?.toFixed(2)}%
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">Total Dividends Earned</h4>
                  <p className="text-xl font-bold text-green-600">
                    ${results.totalDividendsEarned.toFixed(2)}
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">Total Expenses</h4>
                  <p className="text-xl font-bold text-green-600">
                    ${results.totalExpenses.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-green-900 mb-4">Monthly Breakdown</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-green-200">
                    <thead className="bg-green-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Shares</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Share Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Dividend</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Expenses</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Withdrawal</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-green-200">
                      {results.monthlyBreakdown.map((month, index) => (
                        <tr key={index} className="hover:bg-green-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900">{month.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900">{month.shares.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900">${month.sharePrice.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900">${month.dividendAmount.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900">${month.expenseAmount.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900">${month.withdrawalAmount.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900">${month.balance.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <HowItWorks 
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
    </div>
  );
}