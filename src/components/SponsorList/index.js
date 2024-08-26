import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function SponsorList() {
  return (
    <section>
      <div className="container">
        <div className={styles.cta}>
          <Heading as="h2">Sponsoring</Heading>
          <div className="col col--12">
            <p>
              You like my project? Or are you using the rob18n for a commercial product? <br></br>
              Then you are welcome to become a sponsor and help the project continue to grow.
            </p>
            <p>
              If you use rob18n in combination with a commercial project, please be fair and respect my work by considering a sponsorship.
            </p>
            <Link
              className="button button--primary button--md"
              to="/docs/guide/introduction">
              Get a sponsor
            </Link>
          </div>
        </div>
      </div>
    </section >
  );
}
