import { Business } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';

type BusinessProps = { business: Business };

export default function Business(p: BusinessProps) {
  const { name, description } = p.business;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps<BusinessProps> = async () => {
  const res = await fetch('http://localhost:3000/api/business/1').then((res) =>
    res.json()
  );
  const business = res.data;

  return {
    props: { business },
    revalidate: 864000, // 10 days
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const businesses: Business[] = await fetch(
    'http://localhost:3000/api/business'
  )
    .then((res) => res.json())
    .then((res) => res.data);

  const paths = businesses.map((biz) => {
    const businessId = `${biz.id}`;
    return { params: { businessId } };
  });

  return {
    paths,
    fallback: true,
  };
};
