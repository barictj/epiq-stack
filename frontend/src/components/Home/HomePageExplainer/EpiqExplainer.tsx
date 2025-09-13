import styles from './epiqExplainer.module.css';

export default function EpiqExplainer() {
    return (
        <section className={styles.epiqExplainer}>
            <div className={styles.container}>
                <h2 className={styles.explainerTitle}>What Is EPIQ?</h2>
                <p className={styles.explainerText}>
                    The <strong>Efficiency Possession Impact Quotient</strong> measures how much a player shifts the game — per possession. It’s not just stats. It’s impact.
                </p>
                <p className={styles.explainerText}>
                    Every rebound, every turnover, every possession — resolved, weighted, and scored. EPIQ captures the ripple effect of every decision on the floor.
                </p>
            </div>
        </section>
    );
}
