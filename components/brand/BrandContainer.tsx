import type React from 'react';

export default function BrandContainer({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
	return <div id={id} className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}


