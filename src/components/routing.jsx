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
import PlatformSpotify from '../pages/platform_spotify_edit';
import PlatformImageGeneration from '../pages/platform_image_gen';
import PlatformFacebookView from '../pages/platform_view_facebook';
import Privacy from '../pages/privacy';
import ImageEdit from '../pages/image_edit';

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
                    <Route path="/image" element={<ImageEdit />} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/dashboard/manage-campaigns" element={<ManageCampaigns/>} />
                    <Route path="/new/campaign" element={<CreateCampaign/>} />
                    <Route path="/account/settings" element={<UserProfile/>} />
                    <Route path="/account/settings/profile-info" element={<ProfileInfo/>} />
                    <Route path="/dashboard/manage-campaigns/campaign-details" element={<CampaignDetail/>} />
                    <Route path="/dashboard/previous-campaigns" element={<NotFound/>} />
                    <Route path="/dashboard/product-profiles" element={<NotFound/>} />
                    <Route path="/auth/google/callback" element={<Callback />} /> {/* Use wildcard route */}
                    <Route path="/success-google" element={<SuccessGoogle />} /> {/* Use wildcard route */}
                    <Route path="/platform-edit-google" element={<PlatformGoogle />} /> {/* Use wildcard route */}
                    <Route path="/account/settings/profilelinkage" element={<ProfileLinkage/>} />
                    <Route path="/account/settings/profilelinkage-facebook" element={<ProfileLinkageFacebook/>} />
                    <Route path="/platform-select" element={<PlatformSelect/>} />
                    <Route path="/platform-select-view" element={<PlatformView/>} />
                    <Route path="/platform-view-google" element={<PlatformGoogleView/>} />
                    <Route path="/platform-view-facebook" element={<PlatformFacebookView/>} />
                    <Route path="/platform-edit-facebook" element={<PlatformFacebook/>} />
                    <Route path="/platform-edit-spotify" element={<PlatformSpotify/>} />
                    <Route path="/platform-image-generation" element={<PlatformImageGeneration/>} />
                    <Route path="/privacy-policy" element={<Privacy />} />
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
