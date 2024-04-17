import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    departments: [
    { id: 1, name: 'Anaesthesiology and Critical Care', image_url: '/images/psychiatry.jpg' },
    { id: 2, name: 'Cardiology', image_url: '/images/psychiatry.jpg' },
    { id: 3, name: 'General Surgery', image_url: '/images/psychiatry.jpg' },
    { id: 4, name: 'Gynaecology', image_url: '/images/psychiatry.jpg' },
    { id: 5, name: 'Neurology', image_url: '/images/psychiatry.jpg' },
    { id: 6, name: 'Ophthalmology', image_url: '/images/psychiatry.jpg' },
    { id: 7, name: 'Paediatrics', image_url: '/images/psychiatry.jpg' },
    { id: 8, name: 'Psychiatry', image_url: '/images/psychiatry.jpg' },
    { id: 9, name: 'Radiology', image_url: '/images/psychiatry.jpg' },
    { id: 10, name: 'Spine Surgery', image_url: '/images/psychiatry.jpg' },
    { id: 11, name: 'Thoracic Radiology', image_url: '/images/psychiatry.jpg' },
    { id: 12, name: 'Urology', image_url: '/images/psychiatry.jpg' },
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