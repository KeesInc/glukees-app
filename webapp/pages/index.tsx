import type { GetServerSideProps, InferGetServerSidePropsType } from "next"

import Line from "@/components/Line"
import { useEffect, useState } from "react"
import { socket } from "@/services/io"

export const getServerSideProps = (async () => {
  const response = await fetch('http://localhost:4000/data')
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
    <main className="flex min-h-screen flex-col items-center justify-between pt-[100px] lg:px-20 pb-10">
      <h1 className="text-[12rem] font-thin">{data.current.value || '-'}</h1> 

      <div className="relative flex-1 w-full h-full">
        <Line
          series={data.history}
        />
      </div>
    </main>
  )
}
