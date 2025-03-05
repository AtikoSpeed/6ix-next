import _ from "lodash";
import Image from "next/image";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Countries from "@/components/EXCountries";
import sanityApi from "@/utils/sanity/api";

type Props = {
  params: any[];
};

const IndexPage: NextPage<Props> = async ({ params }) => {
  const countries = await params;
  console.log(countries);
  return (
    <>
      <div className="m-16 mx-auto container">
        <Countries items={countries} />
      </div>
      <hr />
      <Image
        className="h-8 mx-auto m-12 md:mt-16"
        src="//data.commercelayer.app/assets/logos/full-logo/black/commercelayer_full_logo_black.svg"
        alt="Commerce Layer Logo"
        loading="eager"
        width={200}
        height={50}
      />
      <br />
    </>
  );
};

export const generateStaticParams: GetServerSideProps = async () => {
  const countries = await sanityApi.getAllCountries();
  return {
    props: {
      countries,
    },
    revalidate: false,
  };
};

export default IndexPage;
