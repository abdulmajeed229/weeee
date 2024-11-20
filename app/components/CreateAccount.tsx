"use client"
 
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from "react";
import { auth, db } from '@/app/Database/firebase.config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function CreateAcount() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [number, setNumber] = useState("");
    const [resetEmail, setResetEmail] = useState(""); // State for password reset email
    const [showResetModal, setShowResetModal] = useState(false); // Toggle modal visibility

    function CreateAcountClick(e:any) {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setDoc(doc(db, "userData", user.uid), {
                    name,
                    email,
                    bloodGroup,
                    gender,
                    password,
                    age,
                    number
                });

                localStorage.setItem('user' , 'user')
                router.push('/home');
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    // Handle password reset
    const handleForgotPassword = async (e:any) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            alert("Password reset email sent!");
            setShowResetModal(false); // Close the modal
            setResetEmail(""); // Clear email input field
        } catch (error) {
            alert("Failed");
        }
    };

    return (
        <div className="createAccontImage min-h-screen w-full relative bg-cover bg-center text-black">
            <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-6 md:p-10 lg:p-20">
                <div className="text-white">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold">Give Blood</h1>
                    <h2 className="text-xl sm:text-2xl md:text-3xl mt-2">Patients need your help</h2>
                </div>
                <div className="absolute bottom-0 left-0 w-full flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 gap-4 bg-white bg-opacity-80 rounded-t-lg">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">Blood Donation</h1>
                    <form className="w-full max-w-md flex flex-col gap-4">
                        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="h-12 w-full p-3 border-b border-orange-200 outline-none rounded" />
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="h-12 w-full p-3 border-b border-orange-200 outline-none rounded" />
                        <input type="number" onChange={(e) => setAge(e.target.value)} placeholder="Enter your Age" className="h-12 w-full p-3 border-b border-orange-200 outline-none rounded" />
                        <select onChange={(e) => setBloodGroup(e.target.value)} className="h-12 w-full p-3 border-b border-orange-200 outline-none rounded">
                            <option value="" disabled selected>Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                        <select onChange={(e) => setGender(e.target.value)} className="h-12 w-full p-3 border-b border-orange-200 outline-none rounded">
                            <option value="" disabled selected>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="number" onChange={(e) => setNumber(e.target.value)} placeholder="Phone Number" className="h-12 w-full p-3 border-b border-orange-200 outline-none rounded" />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="h-12 w-full p-3 border-b border-orange-200 outline-none rounded" />
                        <button type="submit" onClick={CreateAcountClick} className="h-12 w-full bg-orange-600 text-white font-medium rounded hover:bg-orange-700 transition-colors">Create Account</button>

                        <div className="flex justify-between text-[15px]">
                            <Link href={'/login'}><span>Already have an account</span></Link>
                            <span className="cursor-pointer" onClick={() => setShowResetModal(true)}>Forget Password</span>
                        </div>
                    </form>

                    {/* Password Reset Modal */}
                    {showResetModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
                                <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
                                <input
                                    type="email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="h-12 w-full p-3 border border-orange-200 outline-none rounded mb-4"
                                />
                                <button onClick={handleForgotPassword} className="h-12 w-full bg-orange-600 text-white font-medium rounded hover:bg-orange-700 transition-colors">Send Reset Email</button>
                                <button onClick={() => setShowResetModal(false)} className="mt-2 text-gray-600">Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateAcount;
