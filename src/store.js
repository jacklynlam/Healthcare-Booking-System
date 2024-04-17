import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from './features/doctorSlice';
import departmentReducer from './features/departmentSlice';

export default configureStore({
    reducer: {
        department: departmentReducer,
        doctor: doctorReducer, 
    }
});