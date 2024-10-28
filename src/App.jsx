import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components/index.js";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]); //accessing the object currencyInfo with [] notation
  };
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  return (
    <div
      className=" flex  items-center justify-center min-h-screen w-screen  fixed inset-0  bg-center bg-no-repeat bg-cover "
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1645226880663-81561dcab0ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 ">
          <h1 className="text-2xl  font-bold pb-3">
            Choose Your Currency To Convert.{" "}
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                className="text-xl font-medium"
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                className="absolute top-1/2 left-1/2 transform- -translate-x-1/2 -translate-y-1/2 bg-orange-500   w-11 h- flex justify-center items-center  hover:bg-orange-700 text-white rounded-md"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-1">
              <InputBox
                label="To "
                className="text-xl font-medium "
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                amountDisabled
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={to}
              />
            </div>
            <button
              type="submit"
              className=" mt-3 bg-blue-500 w-full text-white px-3 py-3 rounded-md hover:bg-blue-700"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
