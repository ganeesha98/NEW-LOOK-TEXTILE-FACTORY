import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './Admin/AddCategory';
import AddProducts from './core/AddProducts';
import Category from './core/Category';
import Attendance from './components/pages/TodayAttds';
import EmployeeList from './components/pages/EmployeeList';
import AddUser from './components/create/AddUser';
import EditUser from './components/update/EditUser';
import User from './components/pages/User';
import TodayAttds from './components/pages/TodayAttds';
import EditAttds from './components/update/EditAttds';
import MyOrder from './components/pages/MyOrder';
import MyCart from './components/pages/MyCart';
import UpdateOrder from './components/update/UpdateOrder';
import Payment from './components/pages/Payment';
import Summary from './components/pages/Summary';
import MainHeader from './components/pages/MainHeader';

const Routes = () => {
	return (
	 <BrowserRouter>
		<Switch>
          {/* <MainHeader/> */}
           <Route path="/" exact component={Home}/>   
           <Route path="/products" exact component={AddProducts}/>
           <Route path="/cate" exact component={Category}/>
		       <Route path="/signin" exact component={Signin}/>
           <Route path="/signup" exact component={Signup}/>
           <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
           <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
           <AdminRoute path="/create/category" exact component={AddCategory} />
           <Route path="/attendance/:id" exact component={Attendance}></Route>
          <Route path="/employeelist"  component={EmployeeList}></Route>
          <Route path="/user-add" exact component={AddUser}></Route>
          <Route path="/test-edit/:id" exact component={EditUser}></Route>
          <Route path="/User/:id" exact component={User}></Route>
          <Route path="/attendance" exact component={TodayAttds}></Route>
          <Route path="/editattds/:id" exact component={EditAttds}></Route>
          <Route path="/myorder" exact component={MyOrder}></Route>
          <Route path="/mycart" exact component={MyCart}></Route>
          <Route path="/updateorder/:id" exact component={UpdateOrder}></Route>
          <Route path="/payment/:id" exact component={Payment}></Route>
          <Route path="/summary/" exact component={Summary}></Route>
      </Switch>
    </BrowserRouter>
   );

};

export default Routes;