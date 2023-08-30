import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Error from '../errorpage/errorpage';

const Register = lazy(() => import('../register/register'));
const Login = lazy(() => import('../login/login'));
const Home = lazy(() => import('../Home/home'));
const Detail = lazy(() => import('../detail/detail'));
const AddForm = lazy(() => import('../addform/addform'));
const EditForm = lazy(() => import('../editform/editform'));

export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="/detail/random" element={<Detail></Detail>}></Route>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/detail/:id" element={<Detail></Detail>}></Route>
        <Route path="/addform" element={<AddForm></AddForm>}></Route>
        <Route path="/editform/:id" element={<EditForm></EditForm>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </Suspense>
  );
}
