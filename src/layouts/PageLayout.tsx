import Head from "next/head";
import PageNavLayout from "./PageNavLayout";

export function PageLayout({children, title, pageNav, id}: any){
  return(
    <>
    <Head>
      <title>Управление Кафе</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

      <div className="content-title">{title}</div>
      {pageNav && <PageNavLayout page={pageNav} id={id}/>}
      <div className={(title && "content ") + (!pageNav && "without-nav")}>
        {children}
      </div>

    </>
  )
}