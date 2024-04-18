import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    doctors: [
        {
            id: 1,
            name: 'Dr Anis B',
            departmentId: 1,
            image_url: '/images/doctor1.jpg',
            languages: 'English, Bahasa Malaysia',
            qualifications: 'MBBS (UM), M.Med (O&G) (UM)',
            location: 'Damansara',
            contact: '+603-7491 9191 (Ext. 16477)'},
           
        {
            id: 1,
            name: 'Nadzmi O',
            departmentId: 1,
            image_url: '/images/doctor1.jpg',
            languages: 'English, Bahasa Malaysia',
            qualifications: 'MBBS (UM), M.Med (O&G) (UM)',
            location: 'Subang Jaya',
            contact: '+603-7491 9191 (Ext. 16477)'
        }, ],
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