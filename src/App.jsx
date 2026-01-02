import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Component/Header.jsx';
import Login from './Component/Login.jsx';
import WasteManage from './Component/WasteManage.jsx';
import HouseholdChaos from './Component/HouseholdChaos.jsx';
import QueueLayout from './Component/Queue/QueueLayout';
import QueueDashboard from './Component/Queue/Dashboard';
import JoinQueue from './Component/Queue/JoinQueue.jsx';
import QueueHistory from './Component/Queue/History.jsx';
import FamilyLayout from './Component/family/FamilyLayout';
import FamilyDashboard from './Component/family/Dashboard';
import TasksPage from './Component/family/pages/TasksPage';
import Shopping from './Component/family/components/Shopping';
import CalendarView from './Component/family/components/CalendarView';
import Conflicts from './Component/family/components/Conflicts';
import PeopleResources from './Component/family/components/PeopleResources';
import ComingSoon from './Component/ComingSoon.jsx';
import SolarLayout from './Component/SolarPanelInstall/SolarLayout';
import SolarDashboard from './Component/SolarPanelInstall/Dashboard';
import SolarAnalytics from './Component/SolarPanelInstall/Analytics';
import SolarSchedule from './Component/SolarPanelInstall/Schedule';
import SolarAIDesign from './Component/SolarPanelInstall/AIDesign';
import SolarSettings from './Component/SolarPanelInstall/Settings';

import CarbonFootprintPage from './Component/CarbonFootprintPage.jsx';
import WaterConservation from './Component/WaterConservation/index.jsx';
import SmartHome from './Component/SmartHome/index.jsx';
import Team from './Component/Team.jsx';
import PageLayout from './Component/PageLayout.jsx';
import { GOOGLE_CLIENT_ID } from './constants';
import Dashboard from './Component/WasteManagement/Dashboard.jsx';
import Booking from './Component/WasteManagement/Booking.jsx';
import Analytics from './Component/WasteManagement/Analytics.jsx';
import Reports from './Component/WasteManagement/Reports.jsx';
import WasteClassifier from './Component/WasteManagement/WasteClassifier.jsx';
import Profile from './Component/WasteManagement/Profile.jsx';
import Admin from './Component/WasteManagement/Admin.jsx';
import './App.css';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <div className="App">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<HouseholdChaos />} />

            {/* Login Route - Modal style or separate page? keeping separate for now or overlay? 
                Actually, Login was an overlay. We can make it a route or keep it as a component used elsewhere.
                The prompt asked for Login Route. Let's make it a route for now, or keep it in HouseholdChaos if it's just a modal.
                Re-reading plan: "/login -> Login".
             */}
            <Route path="/login" element={
              <div className="login-overlay">
                <div className="login-container">
                  <Login />
                </div>
              </div>
            } />

            {/* Feature Routes wrapped in PageLayout */}
            <Route path="/waste-management" element={
              <PageLayout className="waste-management-modal">
                <WasteManage />
              </PageLayout>
            }>
              <Route index element={<Dashboard />} />
              <Route path="booking" element={<Booking />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="reports" element={<Reports />} />
              <Route path="waste-classifier" element={<WasteClassifier />} />
              <Route path="profile" element={<Profile />} />
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route path="/queue" element={
              <PageLayout className="queue-modal">
                <QueueLayout />
              </PageLayout>
            }>
              <Route index element={<QueueDashboard />} />
              <Route path="join" element={<JoinQueue />} />
              <Route path="history" element={<QueueHistory />} />
            </Route>

            <Route path="/family" element={
              <PageLayout className="familyapp-modal">
                <FamilyLayout />
              </PageLayout>
            }>
              <Route index element={<FamilyDashboard />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="shopping" element={<div className="p-4"><Shopping /></div>} />
              <Route path="calendar" element={<div className="p-4"><CalendarView /></div>} />
              <Route path="conflicts" element={<div className="p-4"><Conflicts /></div>} />
              <Route path="people" element={<div className="p-4"><PeopleResources /></div>} />
            </Route>

            <Route path="/solar-install" element={
              <PageLayout className="solar-install-modal">
                <SolarLayout />
              </PageLayout>
            }>
              <Route index element={<SolarDashboard />} />
              <Route path="analytics" element={<SolarAnalytics />} />
              <Route path="schedule" element={<SolarSchedule />} />
              <Route path="ai-design" element={<SolarAIDesign />} />
              <Route path="settings" element={<SolarSettings />} />
            </Route>

            <Route path="/coming-soon" element={
              <PageLayout className="coming-soon-modal">
                <ComingSoon />
              </PageLayout>
            } />

            <Route path="/water-conservation" element={
              <PageLayout className="water-conservation-modal">
                <WaterConservation />
              </PageLayout>
            } />

            <Route path="/smart-home" element={
              <PageLayout className="smart-home-modal">
                <SmartHome />
              </PageLayout>
            } />

            <Route path="/carbon-footprint" element={
              <PageLayout className="carbon-footprint-modal">
                <CarbonFootprintPage />
              </PageLayout>
            } />

            <Route path="/team" element={
              <PageLayout className="team-page-modal" backLabel="Back to Home">
                <Team />
              </PageLayout>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;