import { css } from "demitasse";

export const styles = /*#__PURE__*/css({
  card: {
    borderRadius: 6,
    paddingTop: 16,
    paddingRight: 24,
    paddingBottom: 16,
    paddingLeft: 24,
    background: "#eee",
    color: "#333",
    fontFamily: "sans-serif",
    fontSize: 14,
    lineHeight: "16px",
    maxWidth: 400,
    textAlign: "justify",
  },
  heading: {
    fontSize: 32,
    lineHeight: 1,
    fontWeight: 600,
    margin: "0 0 16px 0",
  },
  photo: {
    width: 170,
    float: "left",
    marginRight: 16,
    marginBottom: 16,
  },
  footer: {
    marginTop: 16,
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 10,
  },
  sourceLabel: {
    display: "inline-block",
    marginRight: 4,
  },
});

export const App = ({ host }: { host: Node }) => {
  const card = document.createElement("div");
  card.className = styles.card;

  const heading = document.createElement("h1");
  heading.className = styles.heading;
  heading.textContent = "Liger";
  card.appendChild(heading);

  const image = document.createElement("img");
  image.src = "https://cdn.britannica.com/w:400,h:300,c:crop/75/143575-050-3B2D398F/Liger.jpg";
  image.alt = "Liger";
  image.className = styles.photo;
  card.appendChild(image);

  const main = document.createElement("div");
  main.textContent = `
    Liger, offspring of a male lion and a female tiger. The liger is a zoo-bred
    hybrid, as is the tigon, which is the result of mating a male tiger with a
    female lion. The liger and the tigon possess features of both parents, in
    variable proportions, but are generally larger than either. It is thought
    that most, if not all, male ligers and tigons are sterile. The females,
    however, on occasion, may be able to produce young. The terms liger and
    tigon are portmanteaus of the words lion and tiger.
  `;
  card.appendChild(main);

  const footer = document.createElement("div");
  footer.className = styles.footer;
  card.appendChild(footer);
  
  const sourceLabel = document.createElement("span");
  sourceLabel.className = styles.sourceLabel;
  sourceLabel.textContent = "Source:";
  footer.appendChild(sourceLabel);

  const source = document.createElement("a");
  source.href = "https://www.britannica.com/animal/liger";
  source.textContent = "Britannica";
  footer.appendChild(source);

  host.appendChild(card);
};
