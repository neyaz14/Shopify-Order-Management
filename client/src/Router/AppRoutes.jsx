import { BrowserRouter, Route, Routes } from 'react-router';
import Root from '../Pages/Root';
import Home from '../Pages/Home';

import SignIn from '../Authentication/SignIn';
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../ErrorPage';

import OrderManage from '../Pages/Order_Management/OrderManage';
import Register from '../Authentication/Register';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Root></Root>}>
                    <Route path="*" element={<ErrorPage />} />
                    <Route index element={<Home></Home>} />
                    <Route path='login' element={<SignIn></SignIn>} />
                    <Route path='register' element={<Register></Register>} />

                   

                    <Route path='orderManage' element={
                        <PrivateRoute>
                            <OrderManage></OrderManage>
                        </PrivateRoute>
                    } />

                    
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
