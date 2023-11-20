import type { GetServerSideProps, InferGetServerSidePropsType } from "next"

import Line from "@/components/Line"

export const getServerSideProps = (async () => {
  const response = await fetch('http://localhost:4000/data')
  const data = await response.json()
  return { props: { data } }
}) satisfies GetServerSideProps<{
  data: any 
}>

export default function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24 px-20 pb-10">
      <h1 className="text-7xl">{data.current.value || '-'}</h1> 

      <div className="relative flex-1 w-full h-full">
        <Line
          series={data.history}
        />
      </div>
    </main>
  )
}
