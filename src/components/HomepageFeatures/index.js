import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: "It is free!",
    Svg: require('@site/static/img/coding.png').default,
    description: (
      <>
        rob18n is an open source product and free to use for hobby projects. Feel free
        to join the project on github to extend it.
      </>
    ),
  },
  {
    title: 'It is on your machine!',
    Svg: require('@site/static/img/computer.png').default,
    description: (
      <>
        No account is needed. Just mount the Docker-Image and start managing your i18n files.
      </>
    ),
  },
  {
    title: 'Stop wasting time!',
    Svg: require('@site/static/img/browser.png').default,
    description: (
      <>
        Manage your variables manually trough the UI or use the local API to implement automated
        scripts to pull your i18n files.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={Svg} className={styles.featureSvg}></img>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
