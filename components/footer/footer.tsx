import Widgets from "./widgets";
import Copyright from "./copyright";
import { footer } from "./data";
const { widgets, payment }:any = footer;
import React from 'react';

export default async function Footer({infoPages}:any) {

  let pageList = {
		id: 5,
		widgetTitle: "Информация",
		lists: infoPages && infoPages.map((page:any)=>{
      return {
				id: page.information_id,
				title: page.title,
				path: `/info/${page.information_id}`,
        bottom: page.bottom
			}
    }).filter((item:any) => item?.bottom)
	};

  return (
    <footer className="border-b-4 border-heading mt-9 md:mt-11 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-2">
      <Widgets widgets={[...widgets, pageList]} />
      <Copyright payment={payment} />
    </footer>
  )
}