import React from "react";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import home from "../public/home.svg";
import heart from "../public/heart.svg";
import home_highlighted from "../public/home_highlighted.svg";
import heart_highlighted from "../public/heart_highlighted.svg";

interface activePageProps {
  activePage: string;
}

const headerComponent = (props: activePageProps) => {
  const { activePage } = props;
  return (
    <div>
      {/* Header For Web view */}
      <header className="hidden sm:block ">
        <div className={styles["nav-container"]}>
          <nav>
            <ul>
              <li className={`${styles.logo}`}>&nbsp;DelayGram&nbsp;</li>
              <li
                className={`${
                  activePage === "Home" ? `${styles.highlight}` : ""
                }`}
              >
                <a href="/">home</a>
              </li>
              <li
                className={`${
                  activePage === "Favorites" ? `${styles.highlight}` : ""
                }`}
              >
                <a href="/favorites" className={styles["bloc-icon"]}>
                  Liked
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Header For Mobile view */}
      </header>
      <header className="sm:hidden">
        <nav className={styles["mobile-nav"]}>
          <a href="/" className={`${styles["bloc-icon"]}`}>
            <Image
              src={activePage === "Home" ? home_highlighted : home}
              alt=""
            />
          </a>
          <a href="/favorites" className={`${styles["bloc-icon"]}`}>
            <Image
              src={activePage === "Favorites" ? heart_highlighted : heart}
              alt=""
            />
          </a>
        </nav>
      </header>
    </div>
  );
};

export default headerComponent;
