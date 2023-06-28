import React from 'react'
import { getInformationPage } from "#/lib"
// import Prose from '#/components/prose';

async function page({params} : {params:any}) {
  const pageInfo = await getInformationPage(params.id);
  // const description = product?.description.replace(/(<([^>]+)>)|(&lt;...|gt;)|&/gi, "");
  return (
      <div className="mx-auto px-6 lg:px-8 py-24">
        <div className="sm:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{pageInfo.title}</p>
          <div className="mx-auto mt-6 text-lg leading-8 text-gray-600 whitespace-pre-wrap">
            {/* <Prose html={pageInfo.description} /> */}
            {pageInfo.description}
          </div>
        </div>
      </div>
  )
}

export default page