import InsightList from './components/InsightList';

interface InsightPageProps {
  articles: any[];
}

export default function InsightPage({ articles }: InsightPageProps) {
  return (
    <main className='min-h-screen bg-white'>
      <InsightList articles={articles} />
    </main>
  );
}
