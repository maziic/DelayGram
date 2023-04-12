import { Data } from "../posts/data";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import HeaderComponent from "../components/headerComponent";

interface Post {
  id: number;
  title: string;
  image: string;
  body: string;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Post[]>([]);

  const handleFavoriteClick = (post: Post) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((p) => p.id !== post.id)
    );
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (typeof storedFavorites === "string") {
      const parsedFavorites = JSON.parse(storedFavorites);
      setFavorites(parsedFavorites);
    }
  }, []);
  console.log("favorites from favorites:", favorites);
  return (
    <>
      <Head>
        <title>DelayGram</title>
        <meta
          name="Its a better instagram I guess"
          content="Home - Favorites"
        />
      </Head>
      <HeaderComponent activePage="Favorites" />
      <main className="mt-4">
        <div className={styles["content-container"]}>
          <section>
            {favorites.length > 0 ? (
              favorites.map((post) => (
                <div className={styles.post} key={post.id}>
                  <img src={post.image} alt={post.title} />
                  <div className={styles["post__content"]}>
                    <h2>{post.title}</h2>
                    <div className={styles["post__actions"]}>
                      <button
                        type="button"
                        onClick={() => handleFavoriteClick(post)}
                      >
                        ❤️
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles["noContent"]}>No favorites yet!</div>
            )}
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

// export async function getStaticProps() {
//   const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
//   const posts = await Data;
//   const likedPosts = posts.filter((post: Post) =>
//     favorites.some((fav: Post) => fav.id === post.id)
//   );
//   return { props: { favorites: likedPosts } };

// }
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
