'use client';
import Content from '@/components/Content';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import StoreCard from '@/components/StoreCard';
import axiosClient from '@/utils/axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaBars, FaUserAlt } from 'react-icons/fa'; // Import icon for the menu
import { AiOutlineClose } from 'react-icons/ai'; // Import icon for the close button
import Link from 'next/link';
import { RiMenu2Line } from 'react-icons/ri';
import { TbBulbFilled } from 'react-icons/tb';
import { MdOutlineHelp } from 'react-icons/md';
import {
	IoIosLogOut,
	IoLogoWhatsapp,
	IoMdPerson,
} from 'react-icons/io';
import AdminProducts from '@/components/AdminProducts';
import AdminNewProduct from '@/components/AdminNewProduct';
import Loader from '@/components/Loader';
import { IoMdArrowBack } from 'react-icons/io';
import AdminEditProduct from '@/components/AdminEditProduct';
import ProtectedRoute from '@/components/ProtectedRoute';

const Page = () => {
	const { storeLink } = useParams();
	const [store, setStore] = useState(null);
	const [error, setError] = useState(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const router = useRouter();

	console.log(showMenu);

	const storeData = store?.store;

	const placeholderImage =
		'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png';

	const logoPreview = storeData?.logo;

	useEffect(() => {
		if (storeLink) {
			const fetchStore = async () => {
				try {
					const response = await axiosClient.get(
						`/api/stores/${storeLink}`,
					);
					setStore(response.data);
				} catch (err) {
					setError('Store not found');
				}
			};

			fetchStore();
		}
	}, [storeLink]);

	if (error) {
		return (
			<div className="min-h-screen max-w-3xl mx-auto flex justify-center items-center">
				<StoreCard />
			</div>
		);
	}

	if (!store) {
		return <Loader />;
	}

	return (
		<ProtectedRoute>
			<div className="flex h-screen">
				{/* Sidebar for mobile */}
				{sidebarOpen && (
					<div className="fixed inset-0 z-50 bg-black bg-opacity-50">
						<div className="fixed inset-y-0 z-50 left-0 w-full bg-white shadow-lg">
							<div className="flex justify-end pt-4 px-4">
								<button
									onClick={() => setSidebarOpen(false)}
								>
									<AiOutlineClose size={24} />
								</button>
							</div>
							<Sidebar storeData={storeData} />
						</div>
						<div
							className="fixed inset-0 z-10"
							onClick={() => setSidebarOpen(false)}
						></div>
					</div>
				)}

				{/* Main layout */}
				<div className="w-full flex md:flex-row flex-col h-full">
					<header className="w-full fixed bg-white shadow p-4 flex justify-between items-center md:hidden">
						<button
							className="text-2xl"
							onClick={() => setSidebarOpen(true)}
						>
							<RiMenu2Line />
						</button>

						<Link href="/">
							<h1 className="font-bold text-2xl">
								Trad
								<span className="text-[#25D366]">eet</span>
								<span className="text-[#25D366] text-2xl">
									.
								</span>
							</h1>
						</Link>

						<div className="">
							{logoPreview ? (
								<img
									src={logoPreview}
									alt="Store Logo Preview"
									className="w-10 h-10 object-contain text-gray-200 cursor-pointer rounded-full border-2"
									onClick={() => setShowMenu(!showMenu)}
								/>
							) : (
								<FaUserAlt
									className="w-7 h-7 text-gray-200 cursor-pointer rounded-full border-2"
									onClick={() => setShowMenu(!showMenu)}
								/>
							)}
						</div>
					</header>
					{showMenu && (
						<div className="absolute block md:hidden z-50 top-[4.2rem] right-3 mt-0 w-60 rounded-xl bg-white border border-gray-200 shadow-lg">
							<ul className="flex flex-col">
								<p className="text-sm px-4 text-gray-400 pb-1 pt-2 font-bold">
									{storeData?.email}
								</p>
								<li className="px-4 flex flex-row gap-3 cursor-pointer items-center py-2 hover:bg-gray-100">
									<IoMdPerson />
									<p className="text-sm">My Account</p>
								</li>
								<hr />
								<li className="px-4 flex flex-row gap-3 cursor-pointer items-center py-2 hover:bg-gray-100">
									<IoLogoWhatsapp />
									<p className="text-sm">
										{' '}
										WhatsApp Community
									</p>
								</li>
								<li className="px-4 flex flex-row gap-3 cursor-pointer items-center py-2 hover:bg-gray-100">
									<MdOutlineHelp />
									<p className="text-sm"> Get Help</p>
								</li>
								<li className="px-4 flex flex-row gap-3 cursor-pointer items-center py-2 hover:bg-gray-100">
									<TbBulbFilled />
									<p className="text-sm">
										Make Suggestions
									</p>
								</li>
								<hr />

								<li className="px-4 flex flex-row gap-3 cursor-pointer items-center py-2 hover:bg-gray-100">
									<IoIosLogOut className="text-red-500" />
									<p className="text-sm text-red-500">
										Logout
									</p>
								</li>
							</ul>
						</div>
					)}
					<div className="hidden md:flex w-[20%] h-full">
						<Sidebar storeData={storeData} />
					</div>
					<div className="flex flex-col w-full md:w-[80%] h-full">
						<div className="hidden md:block">
							<Header storeData={storeData} />
						</div>
						<Content>
							<AdminEditProduct storeData={storeData} />
						</Content>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
};

export default Page;
