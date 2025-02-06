'use client';
import { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		console.error('ErrorBoundary caught an error:', error);
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error('Error details:', errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="flex flex-col items-center justify-center min-h-screen text-center">
					<h1 className="text-3xl font-semibold text-red-500">
						Something went wrong
					</h1>
					<p className="text-gray-600 mt-2">
						Please try again later.
					</p>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
