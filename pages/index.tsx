import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { Data } from "../posts/data";
import HeaderComponent from "@/components/headerComponent";

interface Post {
  id: number;
  title: string;
  image: string;
  body: string;
}

interface HomeProps {
  posts: Post[];
}
function getRandomNumber(): number {
  return Math.floor(Math.random() * 100) + 1;
}
function formatPostTitle(title: string) {
  const regex = /#[^\s]+/g; // regex to match hashtags without spaces
  return title.replace(
    regex,
    (match) => `<span class="${styles.hashtag}">${match}</span>`
  );
}

export default function Home({ posts }: HomeProps) {
  const [favorites, setFavorites] = useState<Post[]>([]);

  const handleFavoriteClick = (post: Post) => {
    const index = favorites.findIndex((p) => p.id === post.id);
    if (index !== -1) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((p) => p.id !== post.id)
      );
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, post]);
      localStorage.setItem("favorites", JSON.stringify([...favorites, post]));
    }
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (typeof storedFavorites === "string") {
      const parsedFavorites = JSON.parse(storedFavorites);
      setFavorites(parsedFavorites);
    }
  }, []);
  // console.log("favorites:", favorites);

  return (
    <>
      <Head>
        <title>DelayGram</title>
        <meta
          name="Its a better instagram I guess"
          content="Home - Favorites"
        />
      </Head>
      <HeaderComponent activePage="Home" />
      <div className="sm:hidden">
        <h1 className={styles["noContent"]}>Welcome to DelayGram </h1>
      </div>
      <main className="mt-4">
        <div className={styles["content-container"]}>
          <section>
            {posts &&
              posts.map((post) => (
                <div className={styles.post} key={post.id}>
                  <button className="text-teal-500  flex justify-between items-center py-2 px-3 text-3xl">
                    ☹{" "}
                    <div className="flex underline decoration-1 pl-3 text-lg text-blue-300">
                      sad.user
                    </div>
                  </button>
                  <img src={post.image} alt={post.title} />
                  <div className={styles["post__content"]}>
                    <button
                      className={
                        favorites.find((p) => p.id === post.id)
                          ? styles.active
                          : ""
                      }
                      type="button"
                      onClick={() => handleFavoriteClick(post)}
                    >
                      {favorites.find((p) => p.id === post.id)
                        ? "❤️ 20"
                        : "🤍19 "}
                    </button>
                    <h2
                      className="pt-2"
                      dangerouslySetInnerHTML={{
                        __html: formatPostTitle(post.title),
                      }}
                    />
                    <div className={styles["post__actions"]}></div>
                  </div>
                  <a
                    href=""
                    className="ml-6 mb-2 font-thin text-xs line-clamp-3 text-slate-400	"
                  >
                    View Comments
                  </a>
                </div>
              ))}
          </section>
        </div>
      </main>
      <footer>
        <div className={styles["footer-container"]}>
          <p>Delaygram &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}

export async function getStaticProps() {
  // Fetch posts data from mocked API
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const posts = await res.json();
  // console.log(Data.length);
  // Fetch posts data from data.tsx
  const posts = await Data;

  // console.log(posts); // this will log the data from your JSON file
  return {
    props: {
      posts,
    },
  };
}
