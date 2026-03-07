"use client";

import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Link from 'next/link';

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const PasswordToggle = ({ show, toggle }) => (
        <button type="button" onClick={toggle} title="Toggle Password Visibility">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer">
                {show ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                ) : (
                    <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </>
                )}
            </svg>
        </button>
    );

    return (
        <form className="w-full mt-4" onSubmit={(e) => e.preventDefault()}>
            <Input
                id="fullName"
                type="text"
                placeholder="Alexander Reed"
                label="Full Name"
            />
            <Input
                id="email"
                type="email"
                placeholder="your.name@hutchinson.apac"
                label="Corporate Email Address"
            />
            <Input
                id="company"
                type="text"
                placeholder="Hutchinson APAC Ltd."
                label="Company / Organization"
            />
            <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                label="Password"
                icon={<PasswordToggle show={showPassword} toggle={() => setShowPassword(!showPassword)} />}
            />
            <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter your password"
                label="Confirm Password"
                icon={<PasswordToggle show={showConfirm} toggle={() => setShowConfirm(!showConfirm)} />}
            />

            {/* Terms */}
            <div className="flex items-start gap-2 mt-4 mb-2">
                <input type="checkbox" id="terms" className="mt-1 accent-[#D4AF37] cursor-pointer" />
                <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                    I agree to the <a href="#" className="font-bold text-gradient-gold">Terms of Service</a> and <a href="#" className="font-bold text-gradient-gold">Privacy Policy</a>
                </label>
            </div>

            <Button type="submit">
                CREATE ACCOUNT
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-800">
                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                </svg>
            </Button>

            <p className="text-center text-sm text-gray-600 mt-5">
                Already have an account?{' '}
                <Link href="/login" className="font-bold text-gradient-gold hover:underline">
                    Sign In
                </Link>
            </p>
        </form>
    )
}
