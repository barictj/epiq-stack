import styles from '@components/About/about.module.css';

export default function About() {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.content}>
                <h1 className={styles.title}>About EPIQ</h1>
                <p className={styles.description}>
                    EPIQ—<strong>Efficiency Possession Impact Quotient</strong>—is a modern basketball metric built to measure offensive impact at the possession level. It’s designed to go beyond traditional box scores, capturing how a player influences outcomes through efficiency, decision-making, and contextual value.
                </p>
                <p className={styles.description}>
                    This stat was developed in close collaboration between a human architect and an AI copilot, combining deep basketball intuition with scalable, modular logic. Every possession is resolved, every stat variant is modularized, and every output is built for clarity and reproducibility.
                </p>
                <p className={styles.description}>
                    The site showcases top performers across seasons, teams, and roles—whether you're scouting talent, comparing eras, or just exploring the game through a sharper lens. From fantasy variants to clutch impact, EPIQ adapts to the context you're curious about.
                </p>
                <p className={styles.tagline}>
                    Built with precision. Refined by AI. Made for basketball minds.
                </p>
            </div>
        </section>
    );
}
