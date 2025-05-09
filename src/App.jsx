import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import RouteComponent from './routes/RouteComponent';

function App() {
  return (
    <CartProvider>
      <Router>
        <RouteComponent />
      </Router>
    </CartProvider>
  );
}

export default App;
