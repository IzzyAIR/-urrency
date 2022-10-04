import React from 'react';
// import { useDeferredValue } from 'react';
import { Block } from './Block';
import './index.scss';



function App() {
  const [fromCurrency, setFromCurrency] = React.useState('UZS');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);
  


  // const [rates, setRates] = React.useState({});
  const ratesRef = React.useRef({});

  const onChaneToPrice  = (value)=>{
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice (result.toFixed(2));
    setToPrice(value);
  };


  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json').then(res => res.json()).then(json => {
      ratesRef.current = json.rates;
      onChaneToPrice(1);
    }).catch(err => {
      console.warn(err);
    });
  }, []);

  const onChaneFromPrice  = (value)=>{
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);

  };

  React.useEffect(()=>{
    onChaneFromPrice(fromPrice); 
   }, [fromCurrency]); 

   React.useEffect(()=>{
    onChaneToPrice(toPrice); 
   }, [toCurrency]); 

  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChaneFromPrice}/>
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChaneToPrice}/>

    </div>
  );
}

export default App;
