import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import HomeTest from './components/pages/EmployeeList';
import AddUser from './components/create/AddUser';
import EditUser from './components/update/EditUser';
import User from './components/pages/User';
import Attendance from './components/create/Attendance';
import TodayAttds from './components/pages/TodayAttds';
import EditAttds from './components/update/EditAttds';
import MainHeader from './components/pages/MainHeader';
import MyOrder from "./components/pages/MyOrder";
import MyCart from "./components/pages/MyCart";
import UpdateOrder from "./components/update/UpdateOrder";
import Payment from "./components/pages/Payment";
import Summary from "./components/pages/Summary";
import AddProduct from "./components/create/AddProduct";
import ProductList from "./components/pages/ProductList";
import UpdateProduct from "./components/update/UpdateProduct";
import ProductCategory from "./components/pages/ProductCategory";
import ProductSummary from "./components/pages/ProductSummary";
import Driver from "./components/create/Driver";
import OrderManagement from "./components/pages/OrderManagement";
import Deliver from "./components/pages/Deliver";
import UpdateDriver from "./components/update/UpdateDriver";
import DriverList from "./components/pages/DriverList";
import DriverProfile from "./components/pages/DriverProfile";
import AddOutlet from "./components/create/AddOutlet";
import OutletList from "./components/pages/OutletList";
import UpdateOutlet from "./components/update/UpdateOutlet";
import OutletOrder from "./components/pages/OutletOrder";
import OutletOrderList from "./components/pages/OutletOrdersList";
import DeliverList from "./components/pages/DeliverList";
import OutletSummary from "./components/pages/OutletSummary";
import AddMachine from "./components/create/Machine";
import MachineList from "./components/pages/MachineList";
import UpdateMachine from "./components/update/UpdateMachine";
import MachineCategory from "./components/pages/MachineCategory";
import MachineProfile from "./components/pages/MachineProfile";
import Customer from "./components/create/Customer";
import CustomerList from "./components/pages/CustomerList";
import CustomerProfile from "./components/pages/CustomerProfile";
import UpdateCustomer from "./components/update/UpdateCustomer";
import Login from "./components/register/SignIn";
import SignIn from "./components/register/SignIn";
import SignUp from "./components/register/SignUp";
import Verify from "./components/register/Verify";
import LandedPage from "./components/register/LandedPage";
import Cookies from 'universal-cookie';
import ErrorPage from "./components/pages/ErrorPage";
import DeliverSummary from "./components/pages/DeliverSummary";
import EmployeeSummary from "./components/pages/EmployeeSummary";
import CustomerSummary from "./components/pages/CustomerSummary";
import AddDeliverTable from "./components/pages/AddDeliverTable";
import ManagerSignUp from "./components/register/ManagerSignUp";
import ManagerSignIn from "./components/register/ManagerSignIn";
import ManagerVerify from "./components/register/ManagerVerify";
import Footer from "./components/pages/Footer";
import Home from "./components/pages/Home";
import './App.css';

// import AddProducts from "./core/AddProducts";

function App() {

  const cookies = new Cookies();


  return (
    <Router>
      <div className="App">
        
        
        <switch> 
          <Route exact path="/"><Redirect to="/section/home"/></Route>
          
          <Route path="/manager-signin" exact component={ManagerSignIn}/>
          <Route path="/manager-signup" exact component={ManagerSignUp}/>
          <Route path="/verify/:token" exact component={Verify}/>
          <Route path="/manager-verify/:token" exact component={ManagerVerify}/>
          <Route path="/landedpage" exact component={LandedPage}/>

          <Route path="/footer" exact component={Footer}/>

          <Route path="/section" component={MainHeader}/>
          <Route path="/errorpage" component={ErrorPage}/>
          
          <Route path="/section/product" exact component={AddProduct}>{/*{cookies.get('designation') != 'product' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/productlist" exact component={ProductList}>{/*{cookies.get('designation') != 'product' && <Redirect to="/section"/>}*/}</Route>
          
          <Route path="/section/update-product/:id" exact component={UpdateProduct}>{/*{cookies.get('designation') != 'product' && <Redirect to="/section"/>}*/}</Route>        
          <Route path="/section/product-summary" exact component={ProductSummary}>{/*{cookies.get('designation') != 'product' && <Redirect to="/section"/>}*/}</Route>

          
          <Route path="/section/customerlist" exact component={CustomerList}>{/*{cookies.get('designation') != 'customer' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/customer-profile/:id" exact component={CustomerProfile}></Route>
          <Route path="/section/update-customer/:id" exact component={UpdateCustomer}></Route>
          {/* <Route path="/section/login" exact component={Login}>{cookies.get('designation') != 'customer' && <Redirect to="/section"/>}</Route> */}
          <Route path="/section/customer-summary" exact component={CustomerSummary}>{/*{cookies.get('designation') != 'customer' && <Redirect to="/section"/>}*/}</Route>

          <Route path="/section/driver" exact component={Driver}>{/*{cookies.get('designation') != 'transport' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/deliver/:id" exact component={Deliver}>{/*{cookies.get('designation') != 'transport' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/update-driver/:id" exact component={UpdateDriver}>{/*{cookies.get('designation') != 'transport' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/driverlist" exact component={DriverList}>{/*{cookies.get('designation') != 'transport' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/driver-profile/:id" exact component={DriverProfile}>{/*{cookies.get('designation') != 'transport' && <Redirect to="/section"/>}*/}</Route>
          
          <Route path="/section/deliver-summary" exact component={DeliverSummary}>{/*{cookies.get('designation') != 'transport' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/addDeliverTable" exact component={AddDeliverTable}>{/*{cookies.get('designation') != 'transport' && <Redirect to="/section"/>}*/}</Route>

          <Route path="/section/outlet" exact component={AddOutlet}>{/*{cookies.get('designation') != 'outlet' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/outletlist" exact component={OutletList}>{/*{cookies.get('designation') != 'outlet' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/update-outlet/:id" exact component={UpdateOutlet}>{/*{cookies.get('designation') != 'outlet' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/outlet-order/:id" exact component={OutletOrder}>{/*{cookies.get('designation') != 'outlet' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/outletorderlist" exact component={OutletOrderList}>{/*{cookies.get('designation') != 'outlet' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/outlet-summary" exact component={OutletSummary}>{/*{cookies.get('designation') != 'outlet' && <Redirect to="/section"/>}*/}</Route>

          <Route path="/section/machine" exact component={AddMachine}>{/*{cookies.get('designation') != 'machine' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/machinelist" exact component={MachineList}>{/*{cookies.get('designation') != 'machine' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/update-machine/:id" exact component={UpdateMachine}>{/*{cookies.get('designation') != 'machine' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/machineCategory" exact component={MachineCategory}>{/*{cookies.get('designation') != 'machine' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/machine-profile/:id" exact component={MachineProfile}>{/*{cookies.get('designation') != 'machine' && <Redirect to="/section"/>}*/}</Route>

          <Route path="/section/employeelist"  component={HomeTest}>{/*{cookies.get('designation') != 'employee' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/user-add" exact component={AddUser}>{/*{cookies.get('designation') != 'employee' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/test-edit/:id" exact component={EditUser}>{/*{cookies.get('designation') != 'employee' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/User/:id" exact component={User}>{/*{cookies.get('designation') != 'employee' && <Redirect to="/section"/>}*/}</Route>
          
          <Route path="/section/attendance/:id" exact component={Attendance}>{/*{cookies.get('designation') != 'employee' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/editattds/:id" exact component={EditAttds}>{/*{cookies.get('designation') != 'employee' && <Redirect to="/section"/>}*/}</Route>
          <Route path="/section/employee-summary" exact component={EmployeeSummary}>{/*{cookies.get('designation') != 'employee' && <Redirect to="/section"/>}*/}</Route>
          
          <Route path="/section/myorder/:id" exact component={MyOrder}></Route>
          
          
          <Route path="/section/updateorder/:id" exact component={UpdateOrder}></Route>
          <Route path="/section/payment/:id" exact component={Payment}></Route>
          <Route path="/section/summary/" exact component={Summary}></Route>
          <Route path="/section/home" exact component={Home}></Route>
          
        </switch>
        
    </div>    
    </Router>
    
  )
}

export default App;

//<Route path="/section/attendance" exact component={TodayAttds}>{/*{cookies.get('designation') != 'employee' && <Redirect to="/section"/>}*/}</Route>
//<Route path="/section/productcategory" exact component={ProductCategory}></Route>
//<Route path="/section/mycart" exact component={MyCart}></Route>
//<Route path="/section/orderManagement" exact component={OrderManagement}>{/*{cookies.get('designation') != 'order' && <Redirect to="/section"/>}*/}</Route>
//<Route path="/section/deliverlist" exact component={DeliverList}>{/*{cookies.get('designation') != 'transport' && <Redirect to="/section"/>}*/}</Route>
//<Route path="/signin" exact component={SignIn}/>
//<Route path="/section/customer" exact component={Customer}></Route>