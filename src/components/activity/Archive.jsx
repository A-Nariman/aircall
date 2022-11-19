import { ArchiveOutlined, PhoneMissed, PhoneEnabled } from '@mui/icons-material';
import { Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { setArchivedItems, useAppDispatch, useAppState } from '../../context/appContext';
// =================================================

const Archive = () => {
    const navigate = useNavigate();

    // Gets current state and dispatch for actions
    const state     = useAppState();
    const dispatch  = useAppDispatch();

    // Fetches Items from API
    useEffect(() => {
        fetch('https://aircall-job.herokuapp.com/activities')
            .then(res => res.json())
            .then(json => {
                const archiveItems = json.filter(items => {
                    return (items.is_archived === true);
                });

                setArchivedItems(dispatch, archiveItems);
            });
    }, [dispatch]);

    // Unarchive all calls
    const handleUnarchiveAllItems = async () => {
        const delay = ms => new Promise(res => setTimeout(res, ms));

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_archived: false })
        };
        
        for (let i = 0; i < state.archived_items.length; i++) {
            fetch(`https://aircall-job.herokuapp.com/activities/${state.archived_items[i].id}`, requestOptions)
                .then(response => response.json())
                .then(data => console.log(data))
                .then(navigate('/activities'));
        }

        await delay(300);
    }

    // ------------------------------------------------------
    return (
        <div className="content_items">
            <div className="card" onClick={handleUnarchiveAllItems} >
                <div className="card_icon">
                    <ArchiveOutlined />
                </div>
                <p className="title">Unarchive all calls</p>
            </div>

            {state.archived_items.map(item => (
                
                <ul 
                    key={item.id} 
                    onClick={() => { 
                        navigate(`/activities/${item.id}/details`) 
                    }}
                >
                    <Divider className="dashed_divider"> 
                        <span className='divider_text'> 
                            {new Date(item.created_at).toLocaleDateString()}
                        </span>
                    </Divider>
                    <div className="card">
                        <Grid>
                            <div
                                className={item.call_type === "answered" ? "answered_call_icon" : "missed_call_icon"}
                            >
                                {item.call_type === "answered" ? <PhoneEnabled /> : <PhoneMissed />}
                            </div>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <span className="card_title"> {item.from} <br /></span>
                            <span className='card_subtitle'> tried to call on {item.via} </span><br />
                        </Grid>
                        <Grid>
                            <span className="time">
                                {new Date(item.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                            </span>
                        </Grid>
                    </div>

                </ul>
            ))}
        </div>
    )
}

export default Archive;