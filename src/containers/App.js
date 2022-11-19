import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ActivityFeed from '../components/activity/ActivityFeed';
import ActivityDetail from '../components/activity/ActivityDetail';
import Archive from '../components/activity/Archive';
import Nav from '../components/layout/Nav';
import Home from '../components/layout/Home';
import { AppProvider } from '../context/appContext';
// ============================================================

const App = () => {

    return (
        <AppProvider>
            <BrowserRouter>
                <div className='container'>
                    <Header/>
                    <Nav />
                    <div className="container-view">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path='/activities' element={<ActivityFeed />} />
                            <Route path='/activities/:id/details' element={<ActivityDetail />} />
                            <Route path='/archive' element={<Archive />} />
                        </Routes>
                    </div>
            
                    <Footer/>
                </div>
            </BrowserRouter>
        </AppProvider>
    );
};

export default App;