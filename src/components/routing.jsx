import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import App from '../App';
import SignUserUp from '../pages/signup';
import LogUserIn from '../pages/login';
import { AuthProvider, useAuth } from './auth';
import Dashboard from '../pages/dashboard';
import CreateCampaign from '../pages/newcamp';
import ManageCampaigns from '../pages/manage_campaigns';
import UserProfile from '../pages/settings';
import ProfileInfo from '../pages/profile_info';
import CampaignDetail from '../pages/campaign_details';
import NotFound from '../pages/notfound';
import Callback from './callback'; // Ensure correct import path
import ProfileLinkage from '../pages/profilelinkage';
import SuccessGoogle from '../pages/success_google';
import PlatformGoogle from '../pages/platform_google_edit';
import PlatformSelect from '../pages/platform_select';
import PlatformFacebook from '../pages/platform_facebook_edit';
import ProfileLinkageFacebook from '../pages/profilelinkage-facebook';
import PlatformView from '../pages/platformView';
import PlatformGoogleView from '../pages/platform_view_google';

function RouteChangeTracker() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/login') {
            localStorage.setItem('lastVisitedPath', location.pathname);
        }
    }, [location]);

    return null;
}

function RouterSetup() {
    return (
        <Router>
            <AuthProvider>
                <RouteChangeTracker />  {/* This will track and save route changes */}
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/signup" element={<SignUserUp />} />
                    <Route path="/login" element={<LogUserIn />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
                    <Route path="/dashboard/manage-campaigns" element={<PrivateRoute><ManageCampaigns/></PrivateRoute>} />
                    <Route path="/new/campaign" element={<PrivateRoute><CreateCampaign/></PrivateRoute>} />
                    <Route path="/account/settings" element={<PrivateRoute><UserProfile/></PrivateRoute>} />
                    <Route path="/account/settings/profile-info" element={<PrivateRoute><ProfileInfo/></PrivateRoute>} />
                    <Route path="/dashboard/manage-campaigns/campaign-details" element={<PrivateRoute><CampaignDetail/></PrivateRoute>} />
                    <Route path="/dashboard/previous-campaigns" element={<PrivateRoute><NotFound/></PrivateRoute>} />
                    <Route path="/dashboard/product-profiles" element={<PrivateRoute><NotFound/></PrivateRoute>} />
                    <Route path="/auth/google/callback" element={<Callback />} /> {/* Use wildcard route */}
                    <Route path="/success-google" element={<SuccessGoogle />} /> {/* Use wildcard route */}
                    <Route path="/platform-edit-google" element={<PrivateRoute><PlatformGoogle /></PrivateRoute>} /> {/* Use wildcard route */}
                    <Route path="/account/settings/profilelinkage" element={<PrivateRoute><ProfileLinkage/></PrivateRoute>} />
                    <Route path="/account/settings/profilelinkage-facebook" element={<PrivateRoute><ProfileLinkageFacebook/></PrivateRoute>} />
                    <Route path="/platform-select" element={<PrivateRoute><PlatformSelect/></PrivateRoute>} />
                    <Route path="/platform-select-view" element={<PrivateRoute><PlatformView/></PrivateRoute>} />
                    <Route path="/platform-view-google" element={<PrivateRoute><PlatformGoogleView/></PrivateRoute>} />
                    <Route path="/platform-edit-facebook" element={<PrivateRoute><PlatformFacebook/></PrivateRoute>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        console.log('Redirecting to login, session invalid');
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default RouterSetup;
