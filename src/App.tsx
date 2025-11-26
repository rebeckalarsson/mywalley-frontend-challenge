import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./styles/global.scss";
import ErrorBoundary from "./page-views/ErrorBoundary";
import Transactions from "./pages/Transactions";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useReducer } from "react";
import {
  initialState,
  transactionReducer,
} from "./context/transaction-reducer";
import { TransactionContext } from "./context/transaction-context";

export default function App() {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  return (
    <ErrorBoundary
      fallback={
        <div role="alert" className="error-fallback">
          Something went wrong. Please refresh the page.
        </div>
      }
    >
      <Router>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="app">
          <TransactionContext value={{ state, dispatch }}>
            <Header />
            <main id="main-content">
              <Routes>
                <Route path="/" element={<Transactions />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </TransactionContext>
        </div>
      </Router>
    </ErrorBoundary>
  );
}
