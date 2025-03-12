import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Classes from './Header.module.css';  


const HeaderUnder = () => {
    return (
        <div className={Classes.headerUnder}>
            <ul>
                <li>
                 <MenuIcon/> <p> All</p>
                </li>
                <li><a href="#">today's Deals</a></li>
                <li><a href="#">Customer Service</a></li>
                <li><a href="#">Registry</a></li>
                <li><a href="#">Gift Cards</a></li>
                <li><a href="#">Sell</a></li>
            </ul>
        </div>
    );
};

export default HeaderUnder;