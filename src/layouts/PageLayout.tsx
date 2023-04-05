import Head from "next/head";

export function PageLayout({children, title, noContent}: any){
  return(
    <>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    
    
    {!noContent ?
      <>
        <div className="content-title">{title}</div>
        <div className="content">
          {children}
        </div>
      </>
    : <>{children}</>}

      
    </>
  )
}