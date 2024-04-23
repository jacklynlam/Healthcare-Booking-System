import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    departments: [
    { id: 1, name: 'Anaesthesiology and Critical Care', image_url: '/images/criticalcare.jpg' },
    { id: 2, name: 'Cardiology', image_url: '/images/cardiology.jpg' },
    { id: 3, name: 'General Surgery', image_url: '/images/generalsurgery.webp' },
    { id: 4, name: 'Gynaecology', image_url: '/images/gynaecology.jpg' },
    { id: 5, name: 'Neurology', image_url: '/images/neurology.webp' },
    { id: 6, name: 'Ophthalmology', image_url: '/images/ophthalmology.jpg' },
    { id: 7, name: 'Paediatrics', image_url: '/images/paediatrics.jpg' },
    { id: 8, name: 'Psychiatry', image_url: '/images/psychiatry.jpeg' },
    { id: 9, name: 'Urology', image_url: '/images/criticalcare.jpg' },
    ],
    selectedDepartment: null,
}

const departmentSlice = createSlice({
    name: "department",
    initialState, 
    reducers: {
        setDepartments: (state, action) => {
            state.departments = action.payload;
        },
        selectDepartment: (state, action) => {
            state.selectedDepartment = action.payload;
        },

    },
});

export const { setDepartments, selectDepartment } = departmentSlice.actions;

export default departmentSlice.reducer;