import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./style.css";

const CustomerService = ({ customerServiceDetail }) => {
    return (
        <div className="customer-service-wrapper">
            <h1>Customer Service</h1>
            {
                customerServiceDetail.length > 0 &&
                customerServiceDetail.map((item_, index_) => {
                    return <Accordion key={"Accordin" + index_}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{item_.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                            <Typography>
                                {item_.detail}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                })
            }
        </div >
    );
}

export default CustomerService;