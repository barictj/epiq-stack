import React from "react";
import Link from "next/link";
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
            <div className={styles.homepageHeroButtons}>
                <button className={styles.cta}>
                    Leaders By Year
                </button>
                <button className={styles.cta}>
                    League Averages
                </button>
                <button className={styles.cta}>
                    By Season Averages
                </button>
            </div>
        </section>
    );
};

export default HomepageHero;
