import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    doctors: [
        {
            id: 1,
            name: 'Dr. Ainul Zahaniah Hj Abd Aziz',
            departmentId: 1,
            image_url: '/images/psychiatry.jpg',
            specialty: 'Gynaecology, Obstetrics & Gynaecology',
            languages: 'English, Bahasa Malaysia',
            gender: 'Female',
            qualifications: 'MBBS (UM), M.Med (O&G) (UM)',
            location: 'B-2-01, 2nd Floor, Tower B',
            contact: '+603-7491 9191 (Ext. 16477)'},
           
        {
            id: 1,
            name: 'Dr. Ainul Zahaniah Hj Abd Aziz',
            departmentId: 1,
            image_url: '/images/psychiatry.jpg',
            specialty: 'Gynaecology, Obstetrics & Gynaecology',
            languages: 'English, Bahasa Malaysia',
            gender: 'Female',
            qualifications: 'MBBS (UM), M.Med (O&G) (UM)',
            location: 'B-2-01, 2nd Floor, Tower B',
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