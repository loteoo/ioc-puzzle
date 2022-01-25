import { BrowserRouter } from "react-router-dom";

import Header from "/src/components/core/Header";
import Router from "/src/components/core/Router";
import Footer from "/src/components/core/Footer";
import AuthProvider from "/src/components/core/AuthProvider";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <main className="container">
        <Router />
      </main>
      <Footer />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
