import React from "react";
import styles from "./homepage_hero.module.css";

const HomepageHero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <h1 className={styles.tagline}>
                Possession-Level Truth. Modular Impact. Welcome to{" "}
                <span className={styles.highlight}>EPIQ</span>.
            </h1>
            <p className={styles.subtext}>
                Explore the stat that redefines basketball analytics—one possession at a time.
            </p>
            <button className={styles.cta}>View Leaderboard</button>
        </section>
    );
};

export default HomepageHero;
