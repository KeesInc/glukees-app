import type { GetServerSideProps, InferGetServerSidePropsType } from "next"

import { getGlucoseData } from "@/llu-api"
import type { ReadResponse } from "@/llu-api/libre-link-up-api-client/src"

export const getServerSideProps = (async () => {
  const data = await getGlucoseData()
  return { props: { data } }
}) satisfies GetServerSideProps<{
  data: ReadResponse 
}>

export default function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{data.current.value}</h1> 
    </main>
  )
}
