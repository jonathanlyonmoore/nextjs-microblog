import Layout from "../../components/Layout";
import utilStyle from "../../styles/utils.module.css";
import { getAllPostIds, getPostData } from "../../lib/post";
import Head from "next/head";


// 設定したパスに関して静的生成するための関数(paramsのプロパティとファイルの[]の中を一致させる必要あり)
export async function getStaticPaths(){
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false
    // fallbackをfalseにするとpathsに指定されていないパスにアクセスすると404NotFoundページを表示してくれる
  };
};


export async function getStaticProps({params}) {
  const postData = await getPostData(params.id);
  
  return {
    props: {
      postData
    }
  };
};



export default function Post({postData}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyle.headingXl}>{postData.title}</h1>
        <div className={utilStyle.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML}} />
      </article>
    </Layout>
  );
}