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
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useMatch
} from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { getUser } from '../../features/userSlice';
import { ingredientsTrunk } from '../../features/ingredientsSlice';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const background = location.state?.background;
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  const onClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getUser());
    dispatch(ingredientsTrunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth children={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth children={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth children={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth children={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute onlyUnAuth={false} children={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute onlyUnAuth={false} children={<ProfileOrders />} />
          }
        />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute onlyUnAuth={false} children={<OrderInfo />} />
          }
        />
      </Routes>
      {background && (
        <Routes>
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
            path='/feed/:number'
            element={
              <Modal
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                children={<OrderInfo />}
                onClose={onClose}
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                onlyUnAuth={false}
                children={
                  <Modal
                    title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                    children={<OrderInfo />}
                    onClose={onClose}
                  />
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
