import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPathIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
  const paths = getAllPathIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
      </article>
      <div className={utilStyles.lightText}>{postData.date}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.blogContentHtml }} />
    </Layout>
  );
}
