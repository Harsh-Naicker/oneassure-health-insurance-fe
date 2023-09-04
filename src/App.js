import * as React from 'react'
import './App.css';
import UserRegistration from './pages/UserRegistration';
import UserLogin from './pages/UserLogin';
import PremiumRateInquiry from './pages/PremiumRateInquiry';
import PlanPurchaseSummary from './pages/PlanPurchaseSummary';
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  let navigation = useNavigate();
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<UserRegistration navigation={navigation} />} />
        <Route path="/login/" element={<UserLogin navigation={navigation} />} />
        <Route path="/home/" element={<PremiumRateInquiry navigation={navigation} />} />
        <Route path="/purchase-summary/" element={<PlanPurchaseSummary navigation={navigation} />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
