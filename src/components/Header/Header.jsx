import React, { useContext } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import classes from './Header.module.css';
import HeaderUnder from './HeaderUnder';
import flagg from '../../assets/image.png';
import { Link } from 'react-router-dom';
import { DataContext } from '../dataProvider/DataProvider';
import { auth } from '../../utility/firebase';

const Header = () => {
    const [{ user, basket }, dispatch] = useContext(DataContext);
    const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className={classes.fixed}>
            <div className={classes.headerWrapper}>
                {/* Amazon Logo */}
                <Link to="/" className={classes.imageAmazon}>
                    <img 
                        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
                        alt="Amazon Logo" 
                    />
                </Link>

                {/* Delivery Location */}
                <div className={classes.delivery}>
                    <LocationOnIcon fontSize="small" />
                    <div>
                        <p>Deliver to</p>
                        <span>Ethiopia</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className={classes.SearchaBar}>
                    <select>
                        <option>All</option>
                    </select>
                    <input type="text" placeholder="Search Amazon" />
                    <button className={classes.searchButton}>
                        <SearchIcon fontSize="medium" />
                    </button>
                </div>

                {/* Right Navigation */}
                <div className={classes.order_wrapper}>
                    {/* Language Selector */}
                    <div className={classes.lang}>
                        <img src={flagg} alt="country flag" />
                        <p>EN</p>
                        <ArrowDropDownIcon fontSize="small" />
                    </div>

                    {/* Account Section */}
                    <Link 
                        to={!user && '/auth'} 
                        className={classes.account}
                        style={{ textDecoration: 'none' }}
                    >
                        <div>
                            <p>{user ? `Hello, ${user.email.split('@')[0]}` : 'Hello, Sign in'}</p>
                        </div>
                        {user ? (
                            <span onClick={handleSignOut}>Sign Out</span>
                        ) : (
                            <select>
                                <option>Account & Lists</option>
                            </select>
                        )}
                    </Link>

                    {/* Returns & Orders */}
                    <Link to="/orders" className={classes.returns}>
                        <p>Returns</p>
                        <span>& Orders</span>
                    </Link>

                    {/* Cart */}
                    <Link to="/cart" className={classes.cart}>
                        <div className={classes.cartIconContainer}>
                            <ShoppingCartOutlinedIcon fontSize="large" />
                            <span>{totalItem || 0}</span>
                        </div>
                        <p>Cart</p>
                    </Link>
                </div>
            </div>
            
            <HeaderUnder />
        </div>
    );
};

export default Header;