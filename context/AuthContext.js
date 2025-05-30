'use client';

import React, {
	createContext,
	useEffect,
	useState,
} from 'react';
import axiosClient from '@/utils/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [userInfo, setUserInfo] = useState(null);

	// Check login status on load
	const checkLoginStatus = async () => {
		setIsLoading(true);
		try {
			const token = localStorage.getItem('userToken');
			if (token) {
				setUser({ token });
				const userData = await getUserInfo(token);
				if (userData?.business)
					setUserInfo(userData.business);
			}
		} catch (error) {
			console.error('Failed to fetch token:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		checkLoginStatus();
	}, []);

	// Auth API functions
	const verifyPhoneNumber = async (phone) => {
		setIsLoading(true);
		try {
			const res = await axiosClient.post(
				'/auth/send-code',
				{ phone },
			);
			return res.data;
		} catch (err) {
			console.error(err.response?.data?.message || err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const verifyCode = async (phone, code) => {
		setIsLoading(true);
		try {
			const res = await axiosClient.post(
				'/auth/verify-code',
				{ phone, code },
			);
			return res.data;
		} catch (err) {
			console.error(err.response?.data || err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const completeProfile = async (profileData) => {
		setIsLoading(true);
		try {
			const res = await axiosClient.post(
				'/auth/complete-profile',
				profileData,
			);
			const { token } = res.data;
			localStorage.setItem('userToken', token);
			setUser({ token });

			const userData = await getUserInfo(token);
			if (userData?.business)
				setUserInfo(userData.business);

			return res.data;
		} catch (err) {
			console.error(err.response?.data || err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const completeCampusProfile = async (profileData) => {
		setIsLoading(true);
		try {
			const res = await axiosClient.post(
				'/auth/complete-campus-profile',
				profileData,
			);
			const { token } = res.data;
			localStorage.setItem('userToken', token);
			setUser({ token });

			const userData = await getUserInfo(token);
			if (userData?.business)
				setUserInfo(userData.business);

			return res.data;
		} catch (err) {
			console.error(err.response?.data || err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (phone, password) => {
		setIsLoading(true);
		try {
			const res = await axiosClient.post('/auth/login', {
				phone,
				password,
			});
			const { token } = res.data;
			localStorage.setItem('userToken', token);
			setUser({ token });

			const userData = await getUserInfo(token);
			if (userData?.business)
				setUserInfo(userData.business);

			return res.data;
		} catch (err) {
			console.error(err.response?.data || err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const getUserInfo = async (token) => {
		try {
			const res = await axiosClient.get('/auth/user-info', {
				headers: { Authorization: `Bearer ${token}` },
			});
			setUser(res.data);
			return res.data;
		} catch (err) {
			console.error(
				'User info fetch error:',
				err.response?.data || err,
			);
			await logout();
			throw err;
		}
	};

	const sendResetOtp = async (phone) => {
		setIsLoading(true);
		try {
			const res = await axiosClient.post(
				'/auth/forgot-password',
				{ phone },
			);
			return res.data;
		} catch (err) {
			console.error(err.response?.data || err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const verifyResetOtp = async (phone, otp) => {
		setIsLoading(true);
		try {
			const res = await axiosClient.post(
				'/auth/verify-otp',
				{ phone, otp },
			);
			return res.data;
		} catch (err) {
			console.error(err.response?.data || err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const resetPassword = async (phone, otp, newPassword) => {
		setIsLoading(true);
		try {
			const res = await axiosClient.post(
				'/auth/reset-password',
				{ phone, otp, newPassword },
			);
			return res.data;
		} catch (err) {
			console.error(err.response?.data || err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		setIsLoading(true);
		try {
			localStorage.removeItem('userToken');
			setUser(null);
			setUserInfo(null);
		} catch (err) {
			console.error('Logout failed:', err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				verifyPhoneNumber,
				verifyCode,
				completeProfile,
				completeCampusProfile,
				login,
				logout,
				checkLoginStatus,
				userInfo,
				sendResetOtp,
				verifyResetOtp,
				resetPassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
