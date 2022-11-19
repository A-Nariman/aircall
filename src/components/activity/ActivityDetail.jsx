import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// ==========================================================

const ActivityDetail = () => {

    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] = useState([]); 

    // Get parameters in the URL
    const params = useParams();

    // Gets info of selected item
    useEffect(() => {
        fetch(`https://aircall-job.herokuapp.com/activities/${params.id}`)
            .then(res => res.json())
            .then(json => {       
                setSelectedItem(json);
            });
    }, [params.id]);


    // Gets new object after changing the status of is_archived prop of selected item
    const archiveItem = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_archived: true })
        };
        fetch(`https://aircall-job.herokuapp.com/activities/${selectedItem.id}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(navigate('/archive'));
    }

    // Gets new object after changing the status of is_archived prop of selected item
    const unarchiveItem = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_archived: false })
        };
        fetch(`https://aircall-job.herokuapp.com/activities/${selectedItem.id}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(navigate('/activities'));
    }

    // button text value
    const buttonText = selectedItem.is_archived ? "Unarchive" : "Archive";

    // Options for date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // --------------------------------------------------------------
    return (
        <div className="content_items">
            <div className="title_from">
                {selectedItem.from}
            </div>
            
            <div className="detailCard" >
                <div>
                    <div className="txt_card_info">
                        To: {selectedItem.to}
                    </div>
                    <div className="txt_card_info">
                        {new Date(selectedItem.created_at).toLocaleDateString('en-US', options)} , {" "}
                        {new Date(selectedItem.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </div>
                    <div 
                        className={selectedItem.call_type === 'missed' ? "txt_card_call_missed" : "txt_card_call_answered"}>
                        {selectedItem.call_type}
                    </div>
                    <div className="txt_card_info">
                        Duration: {selectedItem.duration} seconds
                    </div>
                </div>
            </div>
            <div className="button_row">
                <Button
                    variant="contained" 
                    onClick={() => selectedItem.is_archived ? unarchiveItem() : archiveItem()}
                    className="btn"
                > 
                    {buttonText}
                </Button>
            </div>
        </div>
    )
}

export default ActivityDetail;