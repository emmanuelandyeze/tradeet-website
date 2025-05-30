// app/dashboard/page.tsx
'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

export default function DashboardPage() {
	const { userInfo } = useContext(AuthContext);
	const router = useRouter();

  console.log('user', userInfo);

	useEffect(() => {
		if (!userInfo) {
			router.push('/dashboard/signup');
		}
	}, [userInfo]);

	if (!userInfo) return null; // or a loading spinner

	return <div>Welcome to your dashboard</div>;
}
