"use client";
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		const onScroll = () => {
			const scrolled = window.scrollY;
			const height = document.documentElement.scrollHeight - window.innerHeight;
			setProgress(height > 0 ? (scrolled / height) * 100 : 0);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);
	return (
		<div className="fixed top-0 left-0 right-0 h-0.5 z-50">
			<div className="h-full bg-blue-600" style={{ width: `${progress}%` }} />
		</div>
	);
}


