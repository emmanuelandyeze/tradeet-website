'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoMdClose, IoMdTrash } from 'react-icons/io';
import { IoBagHandleOutline } from 'react-icons/io5';

const NormalStoreNavbar = ({ storeData }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const router = useRouter();
	

	return (
		<nav className="bg-white z-50 bg-opacity-30 backdrop-blur-md fixed w-full border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							<Link href={`/store/${storeData?.storeLink}`} className='flex flex-row items-center gap-2'>
								<img
									src={storeData?.logoUrl}
									className="h-12 w-12 rounded-full md:h-14 md:w-14 object-contain"
									alt=""
                                />
                                <h1 className='font-semibold text-xl'>{ storeData?.name}</h1>
							</Link>
						</div>
					</div>

					<div></div>
				</div>
			</div>
		</nav>
	);
};

export default NormalStoreNavbar;
