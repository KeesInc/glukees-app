import type { GetServerSideProps, InferGetServerSidePropsType } from "next"

export const getServerSideProps = (async () => {
  const response = await fetch('http://localhost:4000/data')
  const data = await response.json()
  return { props: { data } }
}) satisfies GetServerSideProps<{
  data: any 
}>

export default function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-7xl">{data.current.value || '-'}</h1> 
    </main>
  )
}
