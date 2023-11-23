
import getSongs from "@/actions/getSongs";
import Header from "../components/Header"
import ListItem from "../components/ListItem"
import PageContent from "./component/PageContent";


export const revalidate = 0;

export default async function Home() {

  const songs = await getSongs();

  return (
    <main className="h-full overflow-hidden w-full ml-2 bg-[#121212] rounded-lg">
      <Header>
      <div className="mb-2">
        <h1 className="text-3xl font-semibold">Welcome Back</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
          <ListItem image="/images/liked.png" name="Liked Songs" href="liked"/>
        </div>
      </div>
      </Header>
      <div className="mt-2 mx-4 font-semibold"><h1 className="text-xl">New Songs</h1>
      
      <div className="">
        <PageContent songs={songs}/>
      </div>
      </div>

    </main>
  )
}
