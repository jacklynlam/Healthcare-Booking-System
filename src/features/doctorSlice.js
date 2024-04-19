import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    doctors: [
        {
            id: 1,
            name: 'Dr Anis B',
            departmentId: 1,
            image_url: '/images/doctor1.jpeg',
            languages: 'English, Bahasa Malaysia',
            qualifications: 'MBBS (UM)',
            location: 'Damansara',
            contact: '+603-7491 9191 (Ext. 16477)'},
           
        {
            id: 2,
            name: 'Dr Nadzmi O',
            departmentId: 1,
            image_url: '/images/doctor2.jpg',
            languages: 'English, Bahasa Malaysia',
            qualifications: 'MBBS (UM)',
            location: 'Subang Jaya',
            contact: '+603-7491 9191 (Ext. 16477)'
        }, 
    
        {
            id: 3,
            name: 'Dr Ben C',
            departmentId: 1,
            image_url: '/images/doctor3.jpeg',
            languages: 'English, Bahasa Malaysia',
            qualifications: 'MBBS (UM)',
            location: 'Penang',
            contact: '+603-7491 9191 (Ext. 16477)'
        },
    
        {
            id: 4,
            name: 'Dr Heng R',
            departmentId: 1,
            image_url: '/images/doctor4.jpeg',
            languages: 'English, Bahasa Malaysia',
            qualifications: 'MBBS (UM)',
            location: 'Malacca',
            contact: '+603-7491 9191 (Ext. 16477)'
        },],
        selectedDoctor: null,
        loading: false,
        error: null,
    };

export const doctorSlice = createSlice({
        name: 'doctor',
        initialState,
        reducers: {

            setDoctors: (state, action) => {
                state.doctors = action.payload;
            },
            selectDoctor: (state, action) => {
                state.selectedDoctor = action.payload;
            },
            setLoading: (state, action) => {
                state.loading = action.payload;
            },
            setError: (state, action) => {
                state.error = action.payload;
            },
        },
    });

    export const { setDoctors, selectDoctor, setLoading, setError } = doctorSlice.actions;

    export default doctorSlice.reducer; 