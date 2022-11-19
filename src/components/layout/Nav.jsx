import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
// =================================================

// pages information object
const pages = [
    {page: 'activities', title: 'inbox'}, 
    {page: 'archive', title: 'archived calls'}
];

const Nav = () => {

    const [activeTab, setActiveTab] = useState(null);

    const handleCloseNavMenu = (page) => {
        setActiveTab(page);
    };

  
    // ---------------------------------------------
    return (
        <AppBar position="static" className='appbar'>
            <Container>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace'
                        }}
                        className="appbar_logo"
                    >
                        Activity
                    </Typography>
                
                    <Box 
                        sx={{ 
                            flexGrow: 1, 
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignContent: 'center' 
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.page}
                                onClick={() => handleCloseNavMenu(page.page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                className={activeTab === page.page ? 'active_tab' : null}                
                            >
                                <Link 
                                    to={`/${page.page}`}
                                    className="menu_items"
                                >
                                    {page.title}
                                </Link>
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Nav;