import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { motion, MotionConfig, useReducedMotion } from "motion/react";
import { EditorialHome, EditorialProject } from "./Editorial";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { projects, type Project, type Category } from "./data";

const nav = [
  ["Projects", "/projects"],
  ["Studio", "/studio"],
  ["Contact", "/contact"],
];
function Meta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} — FORMA`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [title, description]);
  return null;
}
function Header() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const loc = useLocation();
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    if (!open) return;
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("main,footer"),
    );
    background.forEach((el) => (el.inert = true));
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
      if (e.key === "Tab") {
        const els = [
          button.current,
          ...Array.from(
            panel.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const i = els.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i === 0) {
          e.preventDefault();
          els.at(-1)?.focus();
        } else if (!e.shiftKey && i === els.length - 1) {
          e.preventDefault();
          els[0].focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      background.forEach((el) => (el.inert = false));
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header">
        <Link className="wordmark" to="/" aria-label="FORMA home">
          FORMA<span aria-hidden="true">·</span>
        </Link>
        <span className="header-note">ARCHITECTURE & INTERIORS</span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, url]) => (
            <NavLink key={url} to={url}>
              {label}
            </NavLink>
          ))}
          <span className="nav-dot" />
        </nav>
        <button
          ref={button}
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Plus />}
        </button>
      </header>
      {open && (
        <motion.div
          ref={panel}
          id="mobile-menu"
          className="menu-overlay"
          initial={reducedMotion ? false : { opacity: 0.96 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <p className="eyebrow">EXPLORE FORMA</p>
          <nav>
            {nav.map(([label, url], i) => (
              <Link key={url} to={url}>
                <small>0{i + 1}</small>
                {label}
                <ArrowUpRight />
              </Link>
            ))}
          </nav>
          <p>
            Spaces with purpose.
            <br />
            Architecture with feeling.
          </p>
        </motion.div>
      )}
    </>
  );
}
function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Link className="wordmark" to="/">
          FORMA<span aria-hidden="true">·</span>
        </Link>
        <p>
          Spaces with purpose.
          <br />
          Architecture with feeling.
        </p>
        <nav aria-label="Footer navigation">
          {nav.map(([label, url]) => (
            <Link key={url} to={url}>
              {label}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <p>
          Independent fictional portfolio concept. All projects are
          architectural studies, not built work.
        </p>
        <span>© FORMA CONCEPT 2026</span>
      </div>
    </footer>
  );
}
function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowUpRight size={20} />
    </Link>
  );
}
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="project-card">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`Explore ${project.name}`}
      >
        <div className="image-wrap">
          <img
            src={project.image}
            alt={project.alt}
            width="1536"
            height="1024"
            loading="lazy"
          />
          <span className="image-arrow">
            <ArrowUpRight />
          </span>
        </div>
        <div className="project-meta">
          <span className="project-number">0{index + 1}</span>
          <h3>{project.name}</h3>
          <span>
            {project.category} <span className="separator">/</span>{" "}
            {project.year}
          </span>
        </div>
        <p className="project-place">
          {project.location} · Architectural concept
        </p>
      </Link>
    </div>
  );
}
function Invite() {
  return (
    <section className="edition-colophon">
      <span className="figure-number">ENDNOTE / A CONVERSATION</span>
      <div>
        <h2>
          What kind of place
          <br />
          do you have in mind?
        </h2>
        <p>Explore the enquiry form with an imagined brief.</p>
      </div>
      <TextLink to="/contact">Try the project enquiry demo</TextLink>
    </section>
  );
}
function Home() {
  return (
    <>
      <Meta
        title="On light, and the life between walls"
        description="FORMA: an architectural monograph of six fictional concepts. Studies in light, proportion and material, from coastline to interior."
      />
      <EditorialHome closing={<Invite />} />
    </>
  );
}
function Projects() {
  const [category, setCategory] = useState<Category | "All">("All");
  const filtered = projects.filter(
    (p) => category === "All" || p.category === category,
  );
  return (
    <>
      <Meta
        title="Projects"
        description="Six fictional architectural concepts: residential spaces, commercial places and considered interiors."
      />
      <section className="page-heading">
        <span className="eyebrow">THE COLLECTION / 2025—2026</span>
        <h1>
          The concept <em>index.</em>
        </h1>
        <div className="page-heading-bottom">
          <p>
            Six imagined places. One considered approach.
            <br />
            Explorations in light, proportion and material.
          </p>
          <span className="eyebrow">ARCHITECTURAL CONCEPTS ONLY</span>
        </div>
      </section>
      <section className="collection section-pad">
        <h2 className="sr-only">Concept collection</h2>
        <div className="filter-bar">
          <div aria-label="Filter projects" className="filters">
            {(["All", "Residential", "Commercial", "Interiors"] as const).map(
              (c) => (
                <button
                  key={c}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                  <sup>{c === "All" ? "06" : "02"}</sup>
                </button>
              ),
            )}
          </div>
          <p aria-live="polite">
            {String(filtered.length).padStart(2, "0")} concepts
          </p>
        </div>
        <div className="collection-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
          ))}
        </div>
      </section>
      <Invite />
    </>
  );
}
function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <Meta
        title={project.name}
        description={
          project.intro +
          " Fictional architectural concept in " +
          project.location +
          "."
        }
      />
      <EditorialProject key={project.slug} project={project} next={next} />
    </>
  );
}
function Studio() {
  return (
    <>
      <Meta
        title="Studio"
        description="The philosophy, services and design process behind FORMA, an independent fictional architecture portfolio."
      />
      <section className="page-heading">
        <span className="eyebrow">THE STUDIO / A DESIGN PERSPECTIVE</span>
        <h1>
          Less noise.
          <br />
          <em>More meaning.</em>
        </h1>
        <div className="page-heading-bottom">
          <p>
            Architecture begins with attention.
            <br />
            To a place. To a material. To the way we live.
          </p>
          <span className="eyebrow">A FICTIONAL STUDIO CONCEPT</span>
        </div>
      </section>
      <section className="studio-image">
        <img
          src={projects[5].image}
          alt={projects[5].alt}
          width="1536"
          height="1024"
        />
        <span>RITUAL TEA ROOM / INTERIOR CONCEPT</span>
      </section>
      <section className="studio-statement section-pad">
        <span className="eyebrow">01 / WHAT GUIDES US</span>
        <div>
          <h2>
            We believe the most lasting spaces are the ones that feel{" "}
            <em>inevitable.</em>
          </h2>
          <p>
            FORMA is an imagined studio exploring architecture and interiors
            through a shared language of restraint. We are interested in the
            meeting of solid and open, rough and refined, shelter and landscape.
          </p>
          <p>
            These concepts are a way to test ideas: how a courtyard gathers a
            home, how shade shapes a workplace, how a single material can give a
            room its character. Each study begins with context and returns to
            the experience of being there.
          </p>
        </div>
      </section>
      <section className="services section-pad">
        <span className="eyebrow">02 / AREAS OF EXPLORATION</span>
        <div>
          {[
            [
              "Architecture",
              "Residential and commercial concepts, from the first spatial idea to an imagined architectural language.",
            ],
            [
              "Interiors",
              "Room planning, bespoke joinery studies and material palettes that support everyday use.",
            ],
            [
              "Spatial direction",
              "An overarching design perspective connecting light, landscape, furniture and detail.",
            ],
          ].map(([a, b], i) => (
            <div className="service-row" key={a}>
              <small>0{i + 1}</small>
              <h3>{a}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="process section-pad">
        <div className="section-heading">
          <div>
            <span className="eyebrow">03 / THE PROCESS</span>
            <h2>
              From listening
              <br />
              to <em>understanding.</em>
            </h2>
          </div>
          <p>
            A framework for the imagined studio’s work.
            <br />
            No professional services are offered through this site.
          </p>
        </div>
        <div className="process-sequence">
          {[
            [
              "Observe",
              "Begin with the setting, the brief and the rhythms of the people who might inhabit it.",
            ],
            [
              "Explore",
              "Test proportions, connections and light through drawings and spatial studies.",
            ],
            [
              "Refine",
              "Bring material, detail and atmosphere into a coherent design proposition.",
            ],
            [
              "Resolve",
              "Document the concept clearly, including the questions that still need to be answered.",
            ],
          ].map(([a, b], i) => (
            <div key={a}>
              <span>0{i + 1}</span>
              <h3>{a}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
      </section>
      <Invite />
    </>
  );
}
const fields = [
  ["name", "Your name", "text"],
  ["email", "Email address", "email"],
  ["location", "Project location", "text"],
] as const;
function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const err: Record<string, string> = {};
    for (const [key, label] of fields) {
      const val = String(data.get(key) || "").trim();
      if (!val) err[key] = `Please enter ${label.toLowerCase()}.`;
      else if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
        err[key] =
          "Please enter a valid email address, such as name@example.com.";
    }
    for (const key of ["type", "budget"])
      if (!data.get(key))
        err[key] =
          `Please choose a project ${key === "type" ? "type" : "budget range"}.`;
    if (String(data.get("message") || "").trim().length < 20)
      err.message = "Please describe your project in at least 20 characters.";
    setErrors(err);
    if (Object.keys(err).length) {
      setDone(false);
      requestAnimationFrame(() =>
        form
          .querySelector<HTMLElement>(`[name="${Object.keys(err)[0]}"]`)
          ?.focus(),
      );
    } else {
      form.reset();
      setDone(true);
      requestAnimationFrame(() =>
        document.getElementById("demo-success")?.focus(),
      );
    }
  };
  const control = (name: string) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onChange: () => {
      setDone(false);
      setErrors((old) => {
        const next = { ...old };
        delete next[name];
        return next;
      });
    },
  });
  return (
    <>
      <Meta
        title="Contact"
        description="Try the FORMA project enquiry demonstration. No personal data is transmitted or retained, and no enquiry is sent."
      />
      <section className="page-heading contact-heading">
        <span className="eyebrow">START WITH A CONVERSATION</span>
        <h1>
          A space for
          <br />
          <em>your ideas.</em>
        </h1>
      </section>
      <section className="contact-layout section-pad">
        <aside>
          <h2>
            Every project begins
            <br />
            with a possibility.
          </h2>
          <p>
            Tell us about the place you have in mind, what matters to you and
            what you’d like it to become.
          </p>
          <div className="demo-note">
            <span className="eyebrow">PORTFOLIO DEMONSTRATION</span>
            <p>
              This form is an interaction demo. Nothing is sent or saved. Please
              use fictional details; FORMA is an imagined studio.
            </p>
          </div>
        </aside>
        <form noValidate onSubmit={submit}>
          <div className="form-grid">
            {fields.map(([name, label, type]) => (
              <div className={`field field-${name}`} key={name}>
                <label htmlFor={name}>
                  {label} <span>*</span>
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  maxLength={160}
                  autoComplete="off"
                  required
                  {...control(name)}
                />
                {errors[name] && (
                  <p className="error" id={`${name}-error`}>
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}
            <div className="field">
              <label htmlFor="type">
                Project type <span>*</span>
              </label>
              <select id="type" name="type" required {...control("type")}>
                <option value="">Select a type</option>
                {[
                  "Residential",
                  "Commercial",
                  "Interiors",
                  "Still exploring",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              {errors.type && (
                <p className="error" id="type-error">
                  {errors.type}
                </p>
              )}
            </div>
            <div className="field field-full">
              <label htmlFor="budget">
                Indicative budget <span>*</span>
              </label>
              <select id="budget" name="budget" required {...control("budget")}>
                <option value="">Select a range (EUR)</option>
                {[
                  "Under €100,000",
                  "€100,000–€250,000",
                  "€250,000–€500,000",
                  "€500,000–€1,000,000",
                  "Over €1,000,000",
                  "Not yet defined",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              {errors.budget && (
                <p className="error" id="budget-error">
                  {errors.budget}
                </p>
              )}
            </div>
            <div className="field field-full">
              <label htmlFor="message">
                Tell us about your project <span>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={3000}
                placeholder="The setting, the ambition, the feeling you’re looking for…"
                required
                {...control("message")}
              />
              {errors.message && (
                <p className="error" id="message-error">
                  {errors.message}
                </p>
              )}
            </div>
          </div>
          <div className="form-bottom">
            <p>
              All fields are required.
              <br />
              No enquiry or personal data is transmitted.
            </p>
            <button className="submit-button" type="submit">
              Complete demo
              <ArrowUpRight size={19} />
            </button>
          </div>
          {done && (
            <div
              id="demo-success"
              className="success"
              tabIndex={-1}
              role="status"
            >
              <h3>Demo completed.</h3>
              <p>
                No enquiry was sent. Your details have been cleared and were not
                saved.
              </p>
            </div>
          )}
        </form>
      </section>
    </>
  );
}
function NotFound() {
  return (
    <section className="not-found">
      <Meta
        title="Page not found"
        description="This page could not be found. Explore FORMA’s architectural concepts."
      />
      <span className="eyebrow">404 / A LITTLE OFF PLAN</span>
      <h1>
        This space
        <br />
        is <em>unmapped.</em>
      </h1>
      <p>The page you’re looking for isn’t here.</p>
      <TextLink to="/">Return home</TextLink>
    </section>
  );
}
export default function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur();
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [location.pathname]);
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="main" tabIndex={-1} key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </MotionConfig>
  );
}
