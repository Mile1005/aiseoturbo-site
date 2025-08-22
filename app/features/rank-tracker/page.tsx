import BrandContainer from '../../../components/brand/BrandContainer';
import Sparkline from '../../../components/charts/Sparkline';

export default function RankTracker() {
	return (
		<BrandContainer className="py-16 space-y-6">
			<h1 className="text-3xl font-semibold tracking-tight">Rank Tracking</h1>
			<p className="text-muted-foreground max-w-2xl">Daily positions, competitor slots (coming), and trend visibility.</p>
			<Sparkline />
		</BrandContainer>
	);
}


