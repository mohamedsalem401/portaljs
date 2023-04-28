import { GetStaticProps } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import parse from '../lib/markdown';
import DRD from '../components/DRD';

export const getServerSideProps = async (context) => {
  const indexFile = path.join(process.cwd(), '/content/' + context.params.path.join('/') + '/index.md');
  const readme = await fs.readFile(indexFile, 'utf8');
  let { mdxSource, frontMatter } = await parse(readme, '.mdx');
  return {
    props: {
      mdxSource,
      frontMatter,
    },
  };
};

export default function DatasetPage({ mdxSource, frontMatter }) {
  return (
    <div className="prose mx-auto">
      <header>
        <div className="mb-6">
          <>
            <h1>{frontMatter.title}</h1>
            {frontMatter.author && (
              <div className="-mt-6">
                <p className="opacity-60 pl-1">{frontMatter.author}</p>
              </div>
            )}
            {frontMatter.description && (
              <p className="description">{frontMatter.description}</p>
            )}
          </>
        </div>
      </header>
      <main>
        <DRD source={mdxSource} />
      </main>
    </div>
  );
}