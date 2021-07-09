import Head from 'next/head'
export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap" rel="stylesheet" />
        
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        {children}
      </main>
    </div>
  )
}