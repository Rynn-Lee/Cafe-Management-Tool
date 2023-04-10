import Head from "next/head";
import PageNavLayout from "./PageNavLayout";

export function PageLayout({children, title, pageNav, id, nav2, noContent}: any){
  return(
    <>
    <Head>
      <title>Управление Кафе</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

      {title && <div className="content-title">{title}</div>}
      {pageNav && <PageNavLayout page={pageNav} id={id} nav2={nav2}/>}
      <div className={(!noContent && "content") + (!pageNav ? " without-nav" : "") + (nav2 ? " top" : "")}>
        {children}
      </div>

    </>
  )
}