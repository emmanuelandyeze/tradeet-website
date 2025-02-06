// components/Modal.js
'use client';
import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ children, onClose }) => {
	// Close modal on escape key press
	useEffect(() => {
		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () =>
			document.removeEventListener('keydown', handleEscape);
	}, [onClose]);

	return (
		<div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white w-full md:w-1/3 rounded-xl shadow-lg p-3 md:p-6 relative">
				<button
					onClick={onClose}
					className="absolute top-2 md:top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
				>
					<FaTimes size={28} />
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
