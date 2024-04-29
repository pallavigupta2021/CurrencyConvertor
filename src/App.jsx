
import './App.css'
import CurrencyConvertor  from "./components/currency-convertor.jsx";

function App() {
  
  // currencies "https://api.frankfurter.app/currencies"
  // conversion "https://api.frankfurter.app/latest?amount=1&from=INR&to=USD"

  return (
    <>
      <div className="min-h-screen bg-zinc-800 flex flex-col items-center justify-center">
     <div className='container'>
      <CurrencyConvertor/>
      </div>
    </div>
    </>
  )
}

export default App
