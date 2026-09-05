import React, { useState } from 'react';
import { Link } from 'react-router';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IoArrowBackOutline } from 'react-icons/io5';
import logo from '../../assets/img/logo.avif';

function AuthPage() {
    const [mode, setMode] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form data state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    // Validation errors state
    const [errors, setErrors] = useState({});

    // Touched fields tracking
    const [touched, setTouched] = useState({});

    // Live validation function
    const validateField = (name, value) => {
        let error = '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        switch (name) {
            case 'firstName':
                if (mode === 'register') {
                    if (!value.trim()) {
                        error = 'First name is required';
                    } else if (value.trim().length < 2) {
                        error = 'First name must be at least 2 characters';
                    }
                }
                break;

            case 'lastName':
                if (mode === 'register') {
                    if (!value.trim()) {
                        error = 'Last name is required';
                    } else if (value.trim().length < 2) {
                        error = 'Last name must be at least 2 characters';
                    }
                }
                break;

            case 'email':
                if (!value.trim()) {
                    error = 'Email address is required';
                } else if (!emailRegex.test(value.trim())) {
                    error = 'Please enter a valid email address (e.g. name@domain.com)';
                }
                break;

            case 'password':
                if (!value) {
                    error = 'Password is required';
                } else if (value.length < 6) {
                    error = 'Password must be at least 6 characters long';
                }
                break;

            default:
                break;
        }

        return error;
    };

    // Live validation on change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));

        const fieldError = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
    };

    // Validation on blur
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const fieldError = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
    };

    // Submit zamanı bütün formu yoxlayan funksiya
    const handleSubmit = (e) => {
        e.preventDefault();

        const fieldsToValidate = mode === 'register'
            ? ['firstName', 'lastName', 'email', 'password']
            : ['email', 'password'];

        const newErrors = {};
        const allTouched = {};

        fieldsToValidate.forEach((field) => {
            allTouched[field] = true;
            const err = validateField(field, formData[field]);
            if (err) newErrors[field] = err;
        });

        setTouched(allTouched);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            // Form uğurla validasiyadan keçdi
            setTimeout(() => {
                setIsSubmitting(false);
            }, 600);
        }
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
        setErrors({});
        setTouched({});
        setShowPassword(false);
    };

    return (
        <div className="min-h-screen w-full bg-[#fff4f4] flex flex-col justify-between items-center px-4 py-8 relative">

            {/* Back Link */}
            <div className="w-full max-w-[480px] flex items-center justify-between mb-4">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-[12px] uppercase font tracking-[2px] text-[#717171] hover:text-[#c98f92] transition-colors"
                >
                    <IoArrowBackOutline size={16} />
                    <span>Back to Shop</span>
                </Link>
            </div>

            {/* Auth Card */}
            <div className="w-full max-w-[480px] bg-white border border-[#fae2e2] shadow-sm p-8 sm:p-12 my-auto relative">

                {/* Brand Logo & Title */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-3">
                        <img src={logo} alt="Flower Knows" className="w-[140px] h-auto mx-auto object-contain" />
                    </Link>
                    <h1 className="font text-[24px] sm:text-[26px] text-[#3b3836] tracking-[1px]">
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </h1>
                    <p className="dmsans text-[13px] text-[#857c7a] mt-1.5">
                        {mode === 'login'
                            ? 'Enter your e-mail and password to log in:'
                            : 'Fill in the information below to register:'}
                    </p>
                </div>

                {/* Form */}
                <form noValidate onSubmit={handleSubmit} className="space-y-4">

                    {/* Register: First & Last Name */}
                    {mode === 'register' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-[11px] uppercase tracking-[1.5px] font text-[#4d4a47] mb-1.5">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Jane"
                                    className={`w-full px-3.5 py-2.5 text-[13px] bg-[#fffaf9] border ${touched.firstName && errors.firstName ? 'border-[#e05656]' : 'border-[#ebdada]'
                                        } text-[#3b3836] placeholder-[#c8bcba] focus:outline-none focus:border-[#ea9393] transition`}
                                />
                                {touched.firstName && errors.firstName && (
                                    <span className="text-[#e05656] text-[10px] dmsans mt-1 block">
                                        {errors.firstName}
                                    </span>
                                )}
                            </div>

                            <div>
                                <label className="block text-[11px] uppercase tracking-[1.5px] font text-[#4d4a47] mb-1.5">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Doe"
                                    className={`w-full px-3.5 py-2.5 text-[13px] bg-[#fffaf9] border ${touched.lastName && errors.lastName ? 'border-[#e05656]' : 'border-[#ebdada]'
                                        } text-[#3b3836] placeholder-[#c8bcba] focus:outline-none focus:border-[#ea9393] transition`}
                                />
                                {touched.lastName && errors.lastName && (
                                    <span className="text-[#e05656] text-[10px] dmsans mt-1 block">
                                        {errors.lastName}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label className="block text-[11px] uppercase tracking-[1.5px] font text-[#4d4a47] mb-1.5">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="example@flowerknows.co"
                            className={`w-full px-3.5 py-2.5 text-[13px] bg-[#fffaf9] border ${touched.email && errors.email ? 'border-[#e05656]' : 'border-[#ebdada]'
                                } text-[#3b3836] placeholder-[#c8bcba] focus:outline-none focus:border-[#ea9393] transition`}
                        />
                        {touched.email && errors.email && (
                            <span className="text-[#e05656] text-[10px] dmsans mt-1 block">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-[11px] uppercase tracking-[1.5px] font text-[#4d4a47]">
                                Password
                            </label>
                            {mode === 'login' && (
                                <span className="text-[11px] dmsans text-[#8a7a7c] hover:text-[#ea9393] underline transition cursor-pointer">
                                    Forgot password?
                                </span>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="••••••••"
                                className={`w-full px-3.5 py-2.5 pr-10 text-[13px] bg-[#fffaf9] border ${touched.password && errors.password ? 'border-[#e05656]' : 'border-[#ebdada]'
                                    } text-[#3b3836] placeholder-[#c8bcba] focus:outline-none focus:border-[#ea9393] transition`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a89597] hover:text-[#555] transition cursor-pointer p-1"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                            </button>
                        </div>
                        {touched.password && errors.password && (
                            <span className="text-[#e05656] text-[10px] dmsans mt-1 block">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-4 py-3 bg-[#ea9393] hover:bg-[#d88080] text-white font uppercase text-[12px] tracking-[2.5px] transition duration-200 cursor-pointer shadow-xs font-semibold disabled:opacity-70"
                    >
                        {isSubmitting ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create My Account'}
                    </button>
                </form>

                {/* Switch Mode Section */}
                <div className="mt-8 pt-6 border-t border-[#fae2e2] text-center">
                    {mode === 'login' ? (
                        <div className="space-y-1.5">
                            <p className="dmsans text-[12px] text-[#717171]">Don't have an account?</p>
                            <button
                                type="button"
                                onClick={() => switchMode('register')}
                                className="font uppercase tracking-[1.5px] text-[12px] text-[#c98f92] hover:text-[#ea9393] underline underline-offset-4 transition cursor-pointer font-semibold"
                            >
                                Create an Account
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-1.5">
                            <p className="dmsans text-[12px] text-[#717171]">Already have an account?</p>
                            <button
                                type="button"
                                onClick={() => switchMode('login')}
                                className="font uppercase tracking-[1.5px] text-[12px] text-[#c98f92] hover:text-[#ea9393] underline underline-offset-4 transition cursor-pointer font-semibold"
                            >
                                Back to Sign In
                            </button>
                        </div>
                    )}
                </div>

            </div>

            {/* Bottom Footer Text */}
            <div className="mt-4 text-center">
                <p className="dmsans text-[11px] text-[#a19695]">
                    © Flower Knows. All rights reserved.
                </p>
            </div>

        </div>
    );
}

export default AuthPage;