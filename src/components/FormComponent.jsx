import React, { useState } from 'react';
import { useFormik } from 'formik';
import { FileParser } from '../assets/utils/fileParser';
import * as Yup from 'yup';

function FormComponent() {
    // State за преглед на слика
    const [imagePreview, setImagePreview] = useState(null);

    // Функција за обработка на слика
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
        formik.setFieldValue(event.target.name, file);
    };

    // Валидација за тип и големина на слика
    const VALID_TYPE = ['image/png', 'image/jpg', 'image/jpeg'];
    const kb = 1024;
    const mb = kb * 1024;

    // useFormik hook
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            gender: "",
            image: "",
            birthDate: ""
        },

        validationSchema: Yup.object({
            firstName: Yup.string().required('Field is required'),
            lastName: Yup.string().required('Field is required'),
            email: Yup.string().email('Invalid email').required('Field is required'),
            password: Yup.string().min(4).required('Field is required'),
            image: Yup.mixed()
                .required('Field is required')
                .test('fileSize', 'Wrong Size under 2MB', (value) => value && value.size < mb * 2)
                .test('filetype', 'Wrong file Type', (value) => value && VALID_TYPE.includes(value.type)),
            birthDate: Yup.string().required('Field is required')
        }),

        // onSubmit функција
        onSubmit: (values) => {
            console.log(values);
            FileParser(values.image)
                .then((res) => {
                    console.log({ ...values, image: res });
                    // Испраќање кон backend (пример)
                    // userLogin.addUser({...values , image:res})
                    //     .then(res => navigate('/'))
                    //     .catch(err => console.log(err));
                })
                .catch((err) => console.log(err));

            // Ресетирање на формата и прегледот на сликата
            formik.resetForm();
            setImagePreview(null);
        }
    });

    // Функција за прикажување на грешки
    const chowError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 py-[40px]">
            <form
                onSubmit={formik.handleSubmit}
                className="bg-white p-4 rounded-xl shadow-2xl w-full max-w-[24rem] flex flex-col justify-center"
            >
                <h2 className="text-lg font-semibold text-gray-800 text-center mb-3">Register</h2>

                {/* First Name */}
                <div className="mb-2">
                    <label htmlFor="firstName" className="block text-gray-700 text-sm">
                        First Name
                        <span className='text-[14px] text-red-500 ml-[10px]'>{chowError('firstName')}</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Insert first name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                </div>

                {/* Last Name */}
                <div className="mb-2">
                    <label htmlFor="lastName" className="block text-gray-700 text-sm">
                        Last Name
                        <span className='text-[14px] text-red-500 ml-[10px]'>{chowError('lastName')}</span>
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Insert last name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                </div>

                {/* Email */}
                <div className="mb-2">
                    <label htmlFor="email" className="block text-gray-700 text-sm">
                        Email
                        <span className='text-[14px] text-red-500 ml-[10px]'>{chowError('email')}</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Insert email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                </div>

                {/* Password */}
                <div className="mb-2">
                    <label htmlFor="password" className="block text-gray-700 text-sm">
                        Password
                        <span className='text-[14px] text-red-500 ml-[10px]'>{chowError('password')}</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Insert password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                </div>

                {/* Gender */}
                <div className="mb-2">
                    <label htmlFor="gender" className="block text-gray-700 text-sm">Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-sm"
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                {/* Image Upload */}
                <div className="mb-2">
                    <label htmlFor="image" className="block text-gray-700 text-sm">
                        Image
                        <span className='text-[14px] text-red-500 ml-[10px]'>{chowError('image')}</span>
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg shadow-md" />
                    )}
                </div>

                {/* Birth Date */}
                <div className="mb-2">
                    <label htmlFor="birthDate" className="block text-gray-700 text-sm">Birth Date</label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formik.values.birthDate}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default FormComponent;
