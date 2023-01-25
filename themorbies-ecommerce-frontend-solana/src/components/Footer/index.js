import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Grid } from '@mui/material';
import { GitHub, LinkedIn, Twitter, Instagram} from '@mui/icons-material';
import "./style.css";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link href="https://swaroopmaddu.me">
                Swaroop Maddu
            </Link>{'  '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function StickyFooter() {
    return (
        <Box component="footer" className='footer-wrapper' >
            <Container>
                <Grid container>
                    <Grid item xs={12} md={3}>
                        <img style={{ width: "80px", margin: "0px 20px" }} alt="" src={require("../../assets/images/sac_logo_with_text.png")} />
                    </Grid>
                    <Grid className='footer-links' item xs={12} md={6}>
                        <Link className='single-link' variant="button" color="text.primary" underline="none" href="airdrop" sx={{ my: 1, mx: 1.5 }} > Store </Link>
                        <Link className='single-link' variant="button" color="text.primary" underline="none" href="about" sx={{ my: 1, mx: 1.5 }} > Your Orders </Link>
                        <Link className='single-link' variant="button" color="text.primary" underline="none" href="contact" sx={{ my: 1, mx: 1.5 }} > Shipping Cart </Link>
                    </Grid>
                    <Grid className = "site-links" item xs={12} md={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', marginRight: '10px', justifyContent: "space-evenly", alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Twitter />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <GitHub />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LinkedIn />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Instagram />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

            </Container>
        </Box>
    );
}