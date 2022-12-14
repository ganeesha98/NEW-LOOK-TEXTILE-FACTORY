import React from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Customer from '../images/Estate.png';
import Supplier from '../images/Estate.png';
import Employee from '../images/Estate.png';
import Inventory from '../images/Estate.png';
import Order from '../images/Estate.png';
import Finance from '../images/Estate.png';
import Transport from '../images/Estate.png';
import Maketing from '../images/Estate.png';
import Maintenance from '../images/Estate.png';
import Estate from '../images/Estate.png';

import '../css/css1.css';
import HomeTest from './EmployeeList';
import TodayAttds from './TodayAttds';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div  role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "theme.palette.background.paper",
    },
    bar: {
        background: "grey",
    }
}));

function CustomerManagement() {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const history = useHistory();
    const CreateCustomerForm = () => history.push('/CreateCustomer');
    const loadDashboard = () => history.push('/Dashboard');
    const loadCustomerManagement = () => history.push('/CustomerManagement');
    const loadSupplierManagement = () => history.push('/SupplierManagement');
    const loadEmployeeManagement = () => history.push('/EmployeeManagement');
    const loadInventoryManagement = () => history.push('/InventoryManagement');
    const loadOrderManagement = () => history.push('/OrderManagement');
    const loadFinanceManagement = () => history.push('/FinanceManagement');
    const loadTransportManagement = () => history.push('/TransportManagement');
    const loadMaketingManagement = () => history.push('/MaketingManagement');
    const loadMaintenanceManagement = () => history.push('/MaintenanceManagement');
    const loadEstateManagement = () => history.push('/EstateManagement');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div className="sidePanel">
                <div className="panelContent">
                    <button type="button" name="customer" onClick={loadDashboard}><img src={Customer} alt="Customer"/>Dashboard</button>
                    <button type="button" name="customer" onClick={loadCustomerManagement}><img src={Customer} alt="Customer"/>Customer Management</button>
                    <button type="button" name="supplier" onClick={loadSupplierManagement}><img src={Supplier} alt="supplier"/>Supplier Management</button>
                    <button type="button" name="employee" onClick={loadEmployeeManagement}><img src={Employee} alt="employee"/>Employee Management</button>
                    <button type="button" name="inventory" onClick={loadInventoryManagement}><img src={Inventory} alt="inventory"/>Inventory Management</button>
                    <button type="button" name="order" onClick={loadOrderManagement}><img src={Order} alt="order"/>Order Management</button>
                    <button type="button" name="finance" onClick={loadFinanceManagement}><img src={Finance} alt="finance"/>Finance Management</button>
                    <button type="button" name="transport" onClick={loadTransportManagement}><img src={Transport} alt="transport"/>Transport Management</button>
                    <button type="button" name="maketing" onClick={loadMaketingManagement}><img src={Maketing} alt="maketing"/>Maketing Management</button>
                    <button type="button" name="maintenance" onClick={loadMaintenanceManagement}><img src={Maintenance} alt="maintenance"/>Maintenance Management</button>
                    <button type="button" name="estate" onClick={loadEstateManagement}><img src={Estate} alt="estate"/>Estate Management</button>
                </div>
            </div><br/>
            <div className="mainBody">
                
                <header>
                    <div className="headerWrapper">
                        <div className="navigationBar">
                            <div className="navbarAlignLeft">
                                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                                <span>Some One</span>
                            </div>
                            <div className="navbarAlignCenter">
                                Customer Management
                            </div>
                            <div className="navbarAlignRight">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                                    </svg>
                                </button>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                                    </svg>
                                </button>
                                <button onClick={handleClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-gear-fill" viewBox="0 0 16 16">
                                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                    </svg>
                                </button>
                                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                                    <MenuItem onClick={handleClose}>
                                        <button className="menu_btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-person-fill" viewBox="0 0 16 16">
                                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                            </svg>
                                            <span>My Profile</span>
                                        </button>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <button className="menu_btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-people-fill" viewBox="0 0 16 16">
                                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                                <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                            </svg>
                                            <span>System Users</span>
                                        </button>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <button className="menu_btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                            </svg>
                                            <span>Logout</span>
                                        </button>
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div className="tabs">
                            <AppBar position="static" className={classes.bar}>
                                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                    <Tab label="All Employee" {...a11yProps(0)} />
                                    <Tab label="All Attendance" {...a11yProps(1)} />
                                </Tabs>
                            </AppBar>
                        </div>
                    </div>
                </header>

                 <div className="bodyContent">
                    <TabPanel value={value} index={0}>
                        <HomeTest/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TodayAttds/>
                    </TabPanel>
                    
                </div>

                <footer>
                    <div className="footerWrapper">
                        <button className="report_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                                <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                            </svg>
                            <span>Report</span>
                        </button>
                    </div>
                </footer>

            </div>
        </div>
        );
}

export default CustomerManagement;




