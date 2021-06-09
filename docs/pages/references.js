import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { formatMD } from '../lib/utils'

export default function Docs({ mdFile }) {

    return (
        <>
            <Head>
                <title>Portal.js Api Documentation</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <div >
                <div className="prose">
                    <div dangerouslySetInnerHTML={{ __html: mdFile }} />
                </div>
                <br />
                <Link href="/">
                    <button >Back Home</button>
                </Link>
            </div>

            <Footer />

        </>
    )
}


export async function getStaticProps() {
    const mdFilePath = path.join(process.cwd(), "markdowns/api-doc/references.md")
    const mdFile = await formatMD(mdFilePath)
    return {
        props: {
            mdFile
        }
    }
}