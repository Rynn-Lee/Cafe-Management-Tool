import Head from "next/head";
import TabsLayout from "./TabsLayout";

export function PageLayout({children, title, pageNav, id, nav2, noContent}: any){
  return(
    <>
      <Head>
        <title>Управление Кафе</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {title && <div className="content-title">{title}</div>}
      {pageNav && <TabsLayout page={pageNav} id={id} nav2={nav2}/>}
      <div className={(!noContent && "content bubble !pt-20") + (!pageNav ? " without-nav" : "") + (nav2 ? " top" : "")}>
        {children}
      </div>
    </>
  )
}