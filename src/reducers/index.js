import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import allProductsReducer from './products.reducer';
import productReducer from './product.reducer';
import trendProductsReducer from './trendProducts.reducer';
import latestProductsReducer from './latestProducts.reducer';
import bestSellerReducer from './bestSeller.reducer';
import dealsProductsReducer from './bestDeals.reducer';
import ordersReducer from './orders.reducer';
import orderReducer from './order.reducer';
import datesReducer from './dates.reducer';

export default combineReducers({
    usersReducer,
    userReducer,
    allProductsReducer,
    productReducer,
    trendProductsReducer,
    latestProductsReducer,
    bestSellerReducer,
    dealsProductsReducer,
    ordersReducer,
    orderReducer,
    datesReducer
})