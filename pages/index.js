import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Layout, { siteTitle } from '../components/Layout';
import utilStyle from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";
import { getPostsData } from '../lib/post';


// SSGの場合（getStaticProps関数（非同期関数）で外部から１度だけデータを取得する際に用いる(外部データが必要なときにこの関数を用いる、外部データが必要でないときは書かない)
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData);
// propsとしてHomeコンポーネントに渡してあげる
  return {
    props: {
      allPostsData,
    },
  };
};

// SSRの場合（更新頻度が高いページに使用する）
// export async function getServerSideProps(context){
//   // contextはユーザーがリクエストした情報が格納されている
//   // ここで外部APIやデータベース接続を行う
//   return {
//     props: {
//       // コンポーネントに渡すプロップス
//     }
//   }
// }


export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          私は駆け出しフロントエンドエンジニアです。現在、Next.jsを勉強中です。
        </p>
      </section>

      <section>
        <h2>📝エンジニアブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id,title,date,thumbnail}) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={thumbnail} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
