import { useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "./data";

type Composition = "court" | "horizon" | "room";
type Direction = {
  composition: Composition;
  focus: string;
  observation: string;
  title: string[];
  palette: string[];
};

// Art direction belongs to the concept, rather than its position in a list.
export const directions: Record<string, Direction> = {
  "courtyard-house": {
    composition: "court",
    focus: "64% 55%",
    observation:
      "A room without a roof. The courtyard holds the house together.",
    title: ["Courtyard", "House"],
    palette: ["#b8a88e", "#e0d6c5", "#9c7852", "#bfc8c3"],
  },
  "tidal-house": {
    composition: "horizon",
    focus: "48% 47%",
    observation:
      "Two horizontal volumes trace the edge between shelter and sea.",
    title: ["Tidal", "House"],
    palette: ["#c4bfb1", "#98856c", "#aeb2ac", "#e1d8c8"],
  },
  "stone-gallery": {
    composition: "court",
    focus: "70% 48%",
    observation:
      "The pause before the gallery: stone, shadow and a single tree.",
    title: ["Stone", "Gallery"],
    palette: ["#c49e73", "#aaa393", "#5b5041", "#ddd0b6"],
  },
  "canopy-workplace": {
    composition: "horizon",
    focus: "59% 47%",
    observation:
      "Timber fins turn a tropical edge into a shaded place to gather.",
    title: ["Canopy", "Workplace"],
    palette: ["#514c3d", "#a49e86", "#c2ad90", "#727a70"],
  },
  "quiet-apartment": {
    composition: "room",
    focus: "68% 53%",
    observation:
      "The curve of a plaster wall gives a small room its centre of gravity.",
    title: ["Quiet", "Apartment"],
    palette: ["#73553e", "#c8b998", "#e3dccb", "#c7bbaa"],
  },
  "ritual-tea-room": {
    composition: "room",
    focus: "76% 51%",
    observation:
      "A stone counter makes a quiet stage for the preparation of tea.",
    title: ["Ritual", "Tea Room"],
    palette: ["#b69674", "#93734e", "#c9bea8", "#a68c60"],
  },
};

function LineLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="edition-link" to={to}>
      {children}
      <ArrowUpRight size={20} aria-hidden="true" />
    </Link>
  );
}

export function ConceptFigure({
  project,
  number,
  interactive = false,
}: {
  project: Project;
  number: string;
  interactive?: boolean;
}) {
  const [detail, setDetail] = useState(false);
  const direction = directions[project.slug];
  return (
    <figure
      className={`concept-figure ${detail ? "is-detail" : ""}`}
      style={{ "--image-focus": direction.focus } as CSSProperties}
    >
      <div className="concept-frame" id={`view-${project.slug}`}>
        <img
          src={project.image}
          alt={
            detail
              ? `Detail crop of the same ${project.name} concept image`
              : project.alt
          }
          width="1536"
          height="1024"
          loading={interactive ? "eager" : "lazy"}
          fetchPriority={interactive ? "high" : "auto"}
        />
        {interactive && (
          <div
            className="view-controls"
            role="group"
            aria-label="Concept image framing"
          >
            <button
              type="button"
              aria-pressed={!detail}
              aria-controls={`view-${project.slug}`}
              onClick={() => setDetail(false)}
            >
              Full view
            </button>
            <button
              type="button"
              aria-pressed={detail}
              aria-controls={`view-${project.slug}`}
              onClick={() => setDetail(true)}
            >
              View detail <span aria-hidden="true">+</span>
            </button>
          </div>
        )}
      </div>
      <figcaption>
        <span className="figure-number">FIG. {number}</span>
        <p aria-live={interactive ? "polite" : undefined}>
          {detail
            ? "Detail crop from the same generated concept view."
            : direction.observation}
        </p>
        <span className="figure-origin">
          AI-GENERATED CONCEPT / {project.year}
        </span>
      </figcaption>
    </figure>
  );
}

function Plate({
  project,
  number,
  className = "",
}: {
  project: Project;
  number: string;
  className?: string;
}) {
  return (
    <article className={`editorial-plate ${className}`}>
      <Link
        className="plate-link"
        to={`/projects/${project.slug}`}
        aria-label={`Explore ${project.name}`}
      >
        <div className="plate-image">
          <img
            src={project.image}
            alt={project.alt}
            width="1536"
            height="1024"
            loading="lazy"
          />
          <span className="plate-open">
            Open study <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
        <div className="plate-caption">
          <span className="figure-number">{number}</span>
          <div>
            <h3>{project.name}</h3>
            <p>
              {project.location} · {project.category}
            </p>
          </div>
          <ArrowUpRight size={20} aria-hidden="true" />
        </div>
      </Link>
      <p className="plate-observation">
        {directions[project.slug].observation}
      </p>
    </article>
  );
}

export function EditorialHome({ closing }: { closing: ReactNode }) {
  return (
    <>
      <section className="monograph-cover" aria-labelledby="cover-title">
        <div className="edition-running-head">
          <span>ARCHITECTURE / INTERIORS</span>
          <span>VOLUME 01 — SIX SPATIAL STUDIES</span>
          <span>INDEPENDENT PORTFOLIO CONCEPT</span>
        </div>
        <h1 id="cover-title">
          FORMA<span className="cover-period">.</span>
        </h1>
        <div className="cover-positioning">
          <p>
            On light,
            <br />
            <em>and the life between walls.</em>
          </p>
          <p>
            Architecture and interiors explored through six imagined places.
          </p>
        </div>
        <div className="cover-spread">
          <div className="cover-image">
            <Link
              to="/projects/courtyard-house"
              aria-label="Explore Courtyard House"
            >
              <img
                src={projects[0].image}
                alt={projects[0].alt}
                width="1536"
                height="1024"
                fetchPriority="high"
              />
              <span className="cover-open">
                Open study 01 <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </Link>
          </div>
          <aside className="cover-margin">
            <span className="figure-number">PLATE 01 / 06</span>
            <h2>
              Courtyard
              <br />
              <em>House</em>
            </h2>
            <p>
              Alentejo, Portugal
              <br />
              Residential concept · 2026
            </p>
            <div className="margin-rule" />
            <p>
              A sheltered court.
              <br />
              An olive tree.
              <br />A daily measure of light.
            </p>
            <LineLink to="/projects">The collection</LineLink>
          </aside>
        </div>
        <div className="cover-footnote">
          <span>AN IMAGINED PRACTICE. A CONSIDERED POINT OF VIEW.</span>
          <span>SCROLL TO READ THE STUDIES ↓</span>
        </div>
      </section>
      <section className="editorial-selection" aria-labelledby="selected-title">
        <div className="edition-section-head">
          <span className="figure-number">01 / SELECTED STUDIES</span>
          <h2 id="selected-title">
            Three ways
            <br />
            of <em>inhabiting.</em>
          </h2>
          <LineLink to="/projects">View all six concepts</LineLink>
        </div>
        <div className="plates-spread">
          <Plate
            project={projects[1]}
            number="02"
            className="plate-landscape"
          />
          <div className="plate-note">
            <span className="figure-number">A NOTE ON SCALE</span>
            <p>
              From an open coastline to the curve of an interior wall. A change
              in scale; the same attention to how a space is lived in.
            </p>
          </div>
          <Plate project={projects[4]} number="05" className="plate-room" />
          <Plate project={projects[2]} number="03" className="plate-court" />
        </div>
      </section>
      <section className="studio-excerpt" aria-labelledby="excerpt-title">
        <div>
          <span className="figure-number">02 / FROM THE STUDIO NOTEBOOK</span>
          <h2 id="excerpt-title">
            Begin with
            <br />
            <em>what is already there.</em>
          </h2>
        </div>
        <div className="excerpt-copy">
          <p>
            Light across a wall. The shade of a tree. A route taken every
            morning. Our studies begin with these small observations, before
            they become plans, rooms or buildings.
          </p>
          <p>
            FORMA is an imagined practice. These six concepts explore a design
            language through place, proportion and material.
          </p>
          <LineLink to="/studio">Read the studio perspective</LineLink>
        </div>
        <span className="excerpt-word" aria-hidden="true">
          Observe.
        </span>
      </section>
      {closing}
    </>
  );
}

export function EditorialProject({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const direction = directions[project.slug];
  const number = String(projects.indexOf(project) + 1).padStart(2, "0");
  return (
    <article
      className={`project-edition composition-${direction.composition} project-${project.slug}`}
    >
      <div className="project-running-head">
        <LineLink to="/projects">Concept index</LineLink>
        <span className="figure-number">STUDY {number} / 06</span>
        <span>FICTIONAL ARCHITECTURAL CONCEPT</span>
      </div>
      <div className="project-opening">
        <header className="edition-project-title">
          <span className="eyebrow">
            {project.category} / {project.year}
          </span>
          <h1>
            {direction.title[0]}
            <br />
            <em>{direction.title[1]}</em>
          </h1>
          <p>{project.location}</p>
        </header>
        <ConceptFigure project={project} number={`${number}.1`} interactive />
      </div>
      <section className="edition-brief">
        <span className="figure-number">01 / THE PROPOSITION</span>
        <h2>{project.intro}</h2>
        <div className="edition-approach">
          <span className="figure-number">02 / SPATIAL APPROACH</span>
          <p>{project.approach}</p>
        </div>
      </section>
      <section className="edition-materials" aria-labelledby="material-title">
        <div className="material-heading">
          <span className="figure-number">03 / MATERIAL REGISTER</span>
          <h2 id="material-title">
            The texture
            <br />
            of{" "}
            <em>
              {direction.composition === "room"
                ? "daily life."
                : direction.composition === "horizon"
                  ? "the edge."
                  : "shelter."}
            </em>
          </h2>
          <p>
            Proposed material relationships for an imagined place. Colours are
            indicative, not product samples.
          </p>
        </div>
        <ol className="material-register">
          {project.materials.map((material, index) => (
            <li key={material}>
              <span
                className="material-sample"
                style={{ background: direction.palette[index] }}
                aria-hidden="true"
              />
              <span className="figure-number">0{index + 1}</span>
              <h3>{material}</h3>
            </li>
          ))}
        </ol>
      </section>
      <div className="study-disclosure">
        <span className="figure-number">ABOUT THIS STUDY</span>
        <p>
          Original AI-generated visualization of a fictional design. The detail
          control crops the same image; no completed building or commissioned
          professional work is represented.
        </p>
      </div>
      <Link className="edition-next" to={`/projects/${next.slug}`}>
        <div>
          <span className="figure-number">
            TURN TO STUDY {String(projects.indexOf(next) + 1).padStart(2, "0")}
          </span>
          <h2>{next.name}</h2>
          <span>
            {next.category} / {next.location}
          </span>
        </div>
        <img
          src={next.image}
          alt=""
          width="1536"
          height="1024"
          loading="lazy"
        />
        <ArrowUpRight size={42} aria-hidden="true" />
      </Link>
    </article>
  );
}
