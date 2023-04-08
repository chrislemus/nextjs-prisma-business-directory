import { businessApi } from '@/api';
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

export const getStaticProps: GetStaticProps<
  BusinessProps,
  { businessId: string }
> = async (ctx) => {
  const businessId = Number(ctx.params?.businessId);
  const business = await businessApi.findUnique(businessId);

  return {
    props: { business },
    revalidate: 864000, // 10 days
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const businesses: Business[] = await businessApi.findMany();

  const paths = businesses.map((biz) => {
    const businessId = `${biz.id}`;
    return { params: { businessId } };
  });

  return {
    paths,
    fallback: true,
  };
};
