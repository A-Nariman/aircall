import { useNavigate } from "react-router-dom";
import { Toolbar, Badge, Tooltip } from "@mui/material";
import { LocalPhone, PhoneMissed, PhoneEnabled, Voicemail, RestartAlt } from "@mui/icons-material";
import { useAppState } from "../../context/appContext";
// ================================================================

const Footer = () => {

    const navigate = useNavigate();

    // Gets current state
    const state = useAppState();

    //reset API
    const reset = () => {
        fetch(`https://aircall-job.herokuapp.com/reset`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
        });

        navigate('/');
    }

    // ------------------------------------------------
    return (
        <footer>
            <div className="footer_container">
                <Toolbar>
                    <div className="tab_icon tab_divider">
                        <Badge 
                            badgeContent={state.items.length} 
                            color="primary"
                        >
                            <LocalPhone color="action" />
                        </Badge>
                    </div>

                    {/* ----------------------------------------- */}

                    <div className="tab_icon">
                        <Tooltip title="Missed Call">
                            <PhoneMissed className="missed_call_icon" />
                        </Tooltip>
                    </div>
                    <div className="tab_icon">
                        <Tooltip title="Answered Call">
                            <PhoneEnabled className="answered_call_icon" />
                        </Tooltip>
                    </div>
                    <div className="tab_icon">
                        <Tooltip title="Voicemail">
                            <Voicemail color="action" />
                        </Tooltip>
                    </div>
                    <div className="tab_icon">
                        <Tooltip title="Reset">
                            <RestartAlt color="action" onClick={reset} />
                        </Tooltip>
                    </div>
                </Toolbar>
            </div>
        </footer>
    )
}

export default Footer;