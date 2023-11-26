import type { GetServerSideProps, InferGetServerSidePropsType } from "next"

import Line from "@/components/Line"
import { useEffect, useState } from "react"
import { socket } from "@/services/io"

export const getServerSideProps = (async () => {
  // const apiUrl = (process.env.API_URL || 'http://localhost:4000') + '/data'
  const apiUrl = 'https://api.glukees.online/data'
  const response = await fetch(apiUrl)
  const data = await response.json()
  return { props: { data } }
}) satisfies GetServerSideProps<{
  data: any 
}>

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [data, setData] = useState(props.data)

  useEffect(() => {
    function onData(data: any) {
      setData(data)
    }

    socket.on('data', onData);

    return () => {
      socket.off('data', onData);
    };
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-4 lg:px-20 lg:pt-[100px] lg:pb-10">
      <h1 className="text-[4rem] font-thin lg:text-[12rem] mb-4">{data.current.value || '-'}</h1> 

      <div className="relative flex-1 w-full h-full">
        <Line
          series={data.history}
        />
      </div>
    </main>
  )
}
