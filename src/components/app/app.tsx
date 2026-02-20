import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route';

const App = () => {
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={<ProtectedRoute children={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute children={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute children={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute children={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute children={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute children={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title='' children={<OrderInfo />} onClose={() => {}} />
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингредиента'
              children={<IngredientDetails />}
              onClose={onClose}
            />
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute
              children={
                <Modal title='' children={<OrderInfo />} onClose={() => {}} />
              }
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
