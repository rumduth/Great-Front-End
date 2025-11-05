import { use, useState } from "react";

export default function MortgateCalculator() {
    const [loanAmount, setLoanAmount] = useState(null);
    const [loanTerm, setLoanTerm] = useState(null);
    const [interestRate, setInterestRate] = useState(null);
    function handleFormSubmit(e) {
        // Mortgage calculation logic will go here
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const loanAmount = parseFloat(fd.get("loanAmount"));
        const loanTerm = parseFloat(fd.get("loanTerm"));
        const interestRate = parseFloat(fd.get("interestRate"));

        // Further calculation logic to be implemented
        if(isNaN(loanAmount) || isNaN(loanTerm) || isNaN(interestRate)) {
            alert("Please enter valid numbers for all fields.");
            return;
        }
        if(loanAmount <= 0 || loanTerm <= 0 || interestRate < 0) {
            alert("Please enter positive values for loan amount and term, and non-negative for interest rate.");
            return;
        }

        
        // Calculation logic will be added here later 
        setLoanAmount(loanAmount);
        setLoanTerm(loanTerm);
        setInterestRate(interestRate);  


    }
    function calculateMortgage(loanAmount, loanTerm, interestRate) {
        // Placeholder for mortgage calculation logicP(r(1+r)^n/((1+r)^n)-1))
        if(!loanAmount || !loanTerm || interestRate == null) {
            return null;
        }
        const monthlyPayment = loanAmount * ((interestRate/100/12) * Math.pow(1 + (interestRate/100/12), loanTerm * 12)) / (Math.pow(1 + (interestRate/100/12), loanTerm * 12) - 1);
        const totalPayment = monthlyPayment * loanTerm * 12;
        const totalInterest = totalPayment - loanAmount;        
        return {
            monthlyPayment,
            totalPayment,
            totalInterest    
        };
    }
    const mortgageDetails = calculateMortgage(loanAmount, loanTerm, interestRate);

  return (
    <div className="morgage-container">
        <form onSubmit={handleFormSubmit} className="mortgage-form">
            <div className="mortgage-form-row">
                <label htmlFor="loanAmount">Loan Amount:</label>
                <input type="number" id="loanAmount" name="loanAmount" min={1}/>
            </div>
            <div className="mortgage-form-row">
                <label htmlFor="loanTerm">Loan Term (years):</label>
                <input type="number" id="loanTerm" name="loanTerm" min={1}/>
            </div>
            <div className="mortgage-form-row">
                <label htmlFor="interestRate">Interest Rate (%):</label>
                <input type="number" step='any' id="interestRate" name="interestRate" min={0}/>
            </div>
            <button>Calculate</button>
        </form>

        <div className="mortgage-results">
            <h4>Mortgage Details:</h4>
            <p>Monthly Payment: <strong>${mortgageDetails ? mortgageDetails.monthlyPayment.toFixed(2) : ''}</strong></p>
            <p>Total Payment: <strong>${mortgageDetails ? mortgageDetails.totalPayment.toFixed(2): ''}</strong></p>
            <p>Total Interest: <strong>${mortgageDetails ? mortgageDetails.totalInterest.toFixed(2): ''}</strong></p>
        </div>
    </div>
  )
}
