import { Business } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

type HomePageProps = { businesses: Business[] };

function HomePage(p: HomePageProps) {
  return (
    <div>
      <h4 className="text-lg font-bold">Businesses</h4>
      <ul role="list" className="space-y-3  text-black">
        {p.businesses.map((biz) => {
          return (
            <Link href={`/business/${encodeURIComponent(biz.id)}`} key={biz.id}>
              <li className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6">
                <h4 className="text-lg font-bold">{biz.name}</h4>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const res = await fetch('http://localhost:3000/api/business').then((res) =>
    res.json()
  );

  const businesses: Business[] = res.data;
  return { props: { businesses } };
};

export default HomePage;
