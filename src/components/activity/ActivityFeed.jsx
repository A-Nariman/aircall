import { Grid, Divider } from '@mui/material';
import { ArchiveOutlined, PhoneMissed, PhoneEnabled } from "@mui/icons-material";

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { setItems, useAppDispatch, useAppState } from '../../context/appContext';
// =================================================================================

const ActivityFeed = () => {    

    const navigate  = useNavigate();

    // Gets current state and dispatch for actions
    const state     = useAppState();
    const dispatch  = useAppDispatch();
    
    // Fetches Items from API
    useEffect(() => {
        fetch('https://aircall-job.herokuapp.com/activities')
            .then(res => res.json())
            .then(json => {
                const unArchiveItems = json.filter(items => {
                    return (items.is_archived === false);
                });

                setItems(dispatch, unArchiveItems);
            });
    }, [dispatch]);


    // Archive All Items
    const handleArchiveAllItems = async () => { 
        const delay = ms => new Promise(res => setTimeout(res, ms));

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_archived: true })
        };

        for (let i = 0; i < state.items.length; i++) {
            fetch(`https://aircall-job.herokuapp.com/activities/${state.items[i].id}`, requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
        }

        await delay(500);
        window.location.reload(false);
    }

    // Options for date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // ---------------------------------------------------------------------------
    return (
        <div className='content_items'>
            <div className="card" onClick={handleArchiveAllItems} >
                <div className="card_icon">
                    <ArchiveOutlined />
                </div>
                <p className="title">Archive all calls</p>
            </div>

            {state.items.map(item => (

                <ul 
                    key={item.id} 
                    onClick={() => { 
                        navigate(`/activities/${item.id}/details`) 
                    }}
                >
                    <Divider className="dashed_divider"> 
                        <span className='divider_text'> 
                            {new Date(item.created_at).toLocaleDateString('en-US', options)} 
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
                            <div className="card_title"> {item.from} <br /></div>
                            <div className='card_subtitle'> tried to call on {item.via} </div><br />
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

export default ActivityFeed;