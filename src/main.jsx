import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ProductProvider } from './Components/context/ProductContext.jsx'
import { BasketProvider } from './Components/context/BasketContext.jsx'
import { CurrencyProvider } from './Components/context/CurrencyContext';
import ScrollToTop from './Components/common/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <CurrencyProvider>
    <ProductProvider>
      <BasketProvider>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </BasketProvider>

    </ProductProvider>
  </CurrencyProvider>





)
