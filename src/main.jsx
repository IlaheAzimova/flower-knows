import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ProductProvider } from './Components/context/ProductContext.jsx'
import { BasketProvider } from './Components/context/BasketContext.jsx'
import { CurrencyProvider } from './Components/context/CurrencyContext';

createRoot(document.getElementById('root')).render(
  <CurrencyProvider>
    <ProductProvider>
      <BasketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BasketProvider>

    </ProductProvider>
  </CurrencyProvider>





)
