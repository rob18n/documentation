import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import SponsorList from '../components/SponsorList';
import Spacer from '../components/Spacer';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--secondary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--8">
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className="buttons">
              <Link
                className="button button--primary button--md"
                to="/docs/guide/introduction">
                Get started
              </Link>
              <Link
                className="button button--secondary button--md"
                to="https://github.com/rob18n/app">
                View on Github
              </Link>
            </div>
          </div>
          <div className="col col--2">
            <img src="/img/welcome.webp"></img>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} documentation`}
      description="Your local internationalization manager">
      <HomepageHeader />
      <main>
        <HomepageFeatures />

        <Spacer></Spacer>

        <SponsorList></SponsorList>
      </main>
    </Layout>
  );
}
