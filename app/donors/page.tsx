"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/Database/firebase.config";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

// Define types for the donor data
interface Donor {
    id: string;
    name: string;
    email: string;
    number: string;
    bloodGroup: string;
    gender: string;
    age: number;
}

function Donors() {
    const [donors, setDonors] = useState<Donor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDonors = async () => {
            const querySnapshot = await getDocs(collection(db, "userData"));
            const donorsData: Donor[] = [];
            querySnapshot.forEach((doc) => {
                donorsData.push({ id: doc.id, ...doc.data() } as Donor);
            });
            setDonors(donorsData);
            setLoading(false);
        };

        fetchDonors();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-5 flex min-h-[100vh] w-full flex-wrap justify-center items-center gap-5">
                {loading ? (
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-3 text-lg text-gray-600">Loading donors...</p>
                    </div>
                ) : donors.length > 0 ? (
                    donors.map((donor) => (
                        <div
                            key={donor.id}
                            className="mt-5 shadow-2xl p-4 border-b w-[280px] min-h-[350px] rounded-xl transform transition duration-800 hover:scale-105 cursor-pointer"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
                                alt="user"
                                className="h-[100px]"
                            />
                            <br />
                            <div className="flex flex-col justify-center gap-2">
                                <h1 className="text-[20px] font-medium font-serif">{donor.name}</h1>
                                <p>Email: {donor.email}</p>
                                <p>Phone: {donor.number}</p>
                                <p>Blood Group: {donor.bloodGroup}</p>
                                <p>Gender: {donor.gender}</p>
                                <p>Age: {donor.age}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No donors found</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Donors;
