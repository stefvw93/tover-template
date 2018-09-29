import { h, Component } from "preact";
import anime from "animejs";

// styles
import styles from "./Example.styles";

interface IPoweredByProps {
  title: string;
  description?: string;
}

function PoweredBy({ title, description }: IPoweredByProps) {
  return (
    <div className={styles.poweredBy}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}

export default class Test extends Component {
  poweredByContainerRef: HTMLDivElement;
  poweredBys = [
    ["Preact", "lib"],
    ["TypeStyle", "styling"],
    ["Anime", "animation"],
    ["Lodash", "utilities"]
  ];

  render() {
    return (
      <div>
        <h1 className={styles.title}>PWA Boilerplate</h1>
        <div ref={r => (this.poweredByContainerRef = r)}>
          {this.poweredBys.map(item => (
            <PoweredBy title={item[0]} description={item[1]} />
          ))}
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.poweredByContainerRef);
    const targets = this.poweredByContainerRef.children;
    const duration = 500;
    const delay = duration / targets.length;
    for (let i = 0; i < targets.length; i++) {
      anime({
        targets: targets[i],
        opacity: [0, 1],
        translateY: [-10, 0],
        easing: "easeOutQuad",
        delay: duration + delay * i,
        duration: delay * 2
      });
    }
  }
}
