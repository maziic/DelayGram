import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { Data } from "../posts/data";
import Image from "next/image";
import home from "../public/home.svg";
import heart from "../public/heart.svg";
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
                  <img src={post.image} alt={post.title} />
                  <div className={styles["post__content"]}>
                    <h2>{post.title}</h2>
                    <div className={styles["post__actions"]}>
                      <button
                        className={
                          favorites.find((p) => p.id === post.id)
                            ? styles.active
                            : ""
                        }
                        type="button"
                        onClick={() => handleFavoriteClick(post)}
                      >
                        {favorites.find((p) => p.id === post.id) ? "❤️" : "🤍"}
                      </button>
                    </div>
                  </div>
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
