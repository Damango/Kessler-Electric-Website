import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    title: "Residential",
    image: "/assets/residential-column-rough-house.jpg",
  },
  {
    title: "Commercial",
    image: "/assets/commercial-column-lighting.jpeg",
  },
  {
    title: "Industrial",
    image: "/assets/industrial-column-facility.png",
  },
];

const jobTypes = [
  {
    title: "Home Wiring",
    description: "New home construction full wiring services. From the simplest builds to vastly complicated custom designed homes.",
    image: "/assets/home-wiring-modern-home.jpg",
    alternateImage: "/assets/home-wiring-framing.png",
    alt: "Contemporary home for home wiring work",
  },
  {
    title: "Remodels",
    description: "Power for your next renovation.",
    image: "/assets/remodels-latest-job.jpg",
    alternateImage: "/hero.jpg",
    alt: "Modern interior during a remodel",
  },
  {
    title: "Service Calls",
    description: "Troubleshooting and Repairs",
    image: "/assets/service-calls-electrician.png",
    alternateImage: "/commercial.jpg",
    alt: "Electrician handling a service call at an electrical panel",
  },
  {
    title: "Lighting Upgrades",
    description: "From the simplest lighting additions, to complex control systems",
    image: "/assets/lighting-upgrades-bedroom.png",
    alternateImage: "/commercial.jpg",
    alt: "Interior lighting upgrade",
  },
  {
    title: "Outdoor Lighting",
    description: "Comfort, safety, and curb appeal.",
    image: "/assets/outdoor-lighting-evening-home.png",
    alternateImage: "/interior.jpg",
    alt: "Contemporary home suited for outdoor lighting",
  },
  {
    title: "Panel Changeouts",
    description: "Capacity and safety improvements.",
    image: "/assets/panel-changeout-job.jpg",
    alternateImage: "/hero.jpg",
    alt: "Electrician working on a panel changeout",
  },
  {
    title: "Parking Lot Lighting",
    description: "Reliable illumination after dark.",
    image: "/assets/parking-lot-lighting.png",
    alternateImage: "/hero.jpg",
    alt: "Commercial property for parking lot lighting work",
  },
  {
    title: "Commercial Wiring",
    description: "Systems built for business.",
    image: "/assets/commercial-wiring-rooftop.png",
    alternateImage: "/assets/electrician-at-panel.png",
    alt: "Commercial space for electrical wiring",
  },
  {
    title: "Generator Installation",
    description: "Reliable backup power for when it matters most.",
    image: "/assets/generator-installation.png",
    alt: "Standby generator installed beside a home",
  },
];

export default function Home() {
  const root = useRef(null);
  const jobsCompletedRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      if (jobsCompletedRef.current) jobsCompletedRef.current.textContent = "3,876";
      return;
    }

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".site-header", { y: -28, opacity: 0, duration: 0.8 })
        .from(".hero-kicker, .hero-copy, .hero-actions", { y: 22, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.65")
        .from(".hero-aside", { x: 32, opacity: 0, duration: 0.8 }, "-=0.65");

      gsap.to(".hero-image", {
        scale: 1.08,
        yPercent: 5,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 54,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      gsap.from(".service-card", {
        y: 70,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 78%", once: true },
      });

      const jobsCounter = { value: 0 };
      gsap.to(jobsCounter, {
        value: 3876,
        duration: 1.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".quality-stat", start: "top 84%", once: true },
        onUpdate: () => {
          if (jobsCompletedRef.current) {
            jobsCompletedRef.current.textContent = Math.round(jobsCounter.value).toLocaleString();
          }
        },
      });

      const magnets = gsap.utils.toArray("[data-magnetic]");
      const cleanups = magnets.map((button) => {
        const xTo = gsap.quickTo(button, "x", { duration: 0.45, ease: "power3.out" });
        const yTo = gsap.quickTo(button, "y", { duration: 0.45, ease: "power3.out" });
        const move = (event) => {
          const rect = button.getBoundingClientRect();
          xTo((event.clientX - rect.left - rect.width / 2) * 0.2);
          yTo((event.clientY - rect.top - rect.height / 2) * 0.2);
        };
        const leave = () => { xTo(0); yTo(0); };
        button.addEventListener("pointermove", move);
        button.addEventListener("pointerleave", leave);
        return () => {
          button.removeEventListener("pointermove", move);
          button.removeEventListener("pointerleave", leave);
        };
      });

      return () => cleanups.forEach((cleanup) => cleanup());
    }, root);

    return () => ctx.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div ref={root} className="site-shell">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Kessler Electric home" onClick={closeMenu}>
          <img className="brand-emblem" src="/assets/kessler-electric-emblem.png" alt="" />
          <span className="brand-title">
            <span className="brand-title-main">Kessler</span>
            <span className="brand-title-sub">Electric Inc.</span>
          </span>
        </a>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          <a href="#about" onClick={closeMenu}>Services</a>
          <a href="#work" onClick={closeMenu}>Our work</a>
        </nav>

        <a href="mailto:hello@kesslerelectric.com?subject=Project estimate" className="header-cta" data-magnetic>
          Get an estimate <span aria-hidden="true">↗</span>
        </a>

        <button
          type="button"
          className={menuOpen ? "menu-toggle is-open" : "menu-toggle"}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </header>

      <main>
        <section className="hero" id="top">
          <img className="hero-image" src="/hero.jpg" alt="Contemporary home with considered architectural detailing" />
          <div className="hero-wash" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-content">
            <h1 aria-label="Small-Town Service. Professional Results">
              <span className="hero-line"><span>Small-Town</span></span>
              <span className="hero-line copper-line"><span>Service.</span></span>
              <span className="hero-line"><span>Professional</span></span>
              <span className="hero-line"><span>Results.</span></span>
            </h1>
            <p className="hero-copy">
              Family owned and operated for over <strong>25 years</strong>.
            </p>
          </div>

          <aside className="hero-aside">
            <div className="aside-image-wrap">
              <img src="/assets/electrician-at-panel.png" alt="Electrician working on a residential electrical panel" />
              <span className="live-dot">Available for new projects</span>
            </div>
            <div className="aside-body">
              <p className="aside-callout">Text or Call!</p>
              <a className="aside-contact" href="tel:+13869372537" aria-label="Call the Kessler Electric office at 386-937-2537">
                <span>Office</span>
                <strong>386-937-2537</strong>
              </a>
              <a className="aside-contact" href="tel:+13869723393" aria-label="Call Kessler Electric mobile at 386-972-3393">
                <span>Mobile</span>
                <strong>386-972-3393</strong>
              </a>
              <a className="aside-email" href="mailto:kesslerelectircinc@att.net">
                kesslerelectircinc@att.net
              </a>
            </div>
          </aside>

          <div className="hero-foot">
            <p className="hero-services">Residential <span>·</span> Commercial <span>·</span> Industrial</p>
            <p className="hero-insured">Licensed &amp; insured</p>
            <p className="hero-license">License number: EC13012950</p>
          </div>
        </section>

        <section className="jobs section" id="about">
          <div className="jobs-heading reveal">
            <h2>Our <em>Services.</em></h2>
          </div>
          <div className="job-types reveal">
            <div className="job-types-grid">
              {jobTypes.map((job) => (
                <article className={`job-type${job.title === "Generator Installation" ? " job-type-generator" : ""}`} key={job.title}>
                  <div className="job-type-image-wrap">
                    <img className="job-type-image" src={job.image} alt={job.alt} />
                    <div className="job-type-title"><h2>{job.title}</h2></div>
                  </div>
                  <div className="job-type-description">
                    <p>{job.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="services-head reveal">
            <h2>Powering <em>Projects of Every Size.</em></h2>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-image">
                  <img src={service.image} alt="" />
                </div>
                <div className="service-body">
                  <h3>{service.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="project section" id="work">
          <div className="quality-top">
            <div className="quality-copy reveal">
              <h2>Work done with <em>pride,</em><br />built to last.</h2>
              <div className="quality-stat reveal" id="process">
                <strong ref={jobsCompletedRef}>0</strong>
                <span>Jobs completed</span>
              </div>
            </div>
            <div className="quality-before-after reveal">
              <figure>
                <img src="/assets/quality-before.jpg" alt="Ceiling detail before the completed lighting work" />
              </figure>
              <span className="quality-before-after-arrow" aria-label="Before and after">→</span>
              <figure>
                <img src="/assets/quality-after.jpg" alt="Completed illuminated ceiling detail" />
              </figure>
            </div>
          </div>
          <div className="quality-gallery reveal">
            <figure className="quality-panel">
              <img src="/assets/quality-panel-work-straightened.png" alt="Neatly organized electrical panel wiring" />
            </figure>
            <figure className="quality-team">
              <img src="/assets/remodels-scaffold-job.jpeg" alt="Electrician completing detailed work from a scaffold" />
            </figure>
            <figure className="quality-commercial-panel">
              <img src="/assets/quality-gallery-1774.jpg" alt="Commercial electrical panel equipment under service" />
            </figure>
            <figure className="quality-residential-panel">
              <img src="/assets/quality-gallery-7023.jpg" alt="Residential electrical panel installation" />
            </figure>
            <figure className="quality-lighting-work">
              <img src="/assets/quality-gallery-9606.jpg" alt="Custom interior lighting work in progress" />
            </figure>
            <figure className="quality-pool-controls">
              <img src="/assets/quality-gallery-9855.jpg" alt="Pool equipment controls and electrical installation" />
            </figure>
            <figure className="quality-rough-wiring">
              <img src="/assets/quality-gallery-7255.jpeg" alt="Electrical box wiring during new-home construction" />
            </figure>
            <figure className="quality-ceiling-detail">
              <img src="/assets/quality-gallery-ceiling.jpeg" alt="Custom illuminated wood ceiling and pendant lighting" />
            </figure>
            <figure className="quality-recessed-detail">
              <img src="/assets/quality-gallery-recessed-lighting.jpeg" alt="Finished recessed and linear lighting installation" />
            </figure>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-glow" />
          <p className="eyebrow reveal"><span /> Contact Kessler Electric</p>
          <h2 className="reveal">For estimates, questions,<br /><em>or service requests.</em></h2>
          <div className="cta-actions reveal">
            <a className="cta-contact" href="tel:+13869372537">
              <span>Office</span>
              <strong>386-937-2537</strong>
            </a>
            <a className="cta-contact" href="tel:+13869723393">
              <span>Mobile</span>
              <strong>386-972-3393</strong>
            </a>
            <a className="cta-contact" href="mailto:kesslerelectircinc@att.net">
              <span>Email</span>
              <strong>kesslerelectircinc@att.net</strong>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <a href="#top" className="brand footer-brand" aria-label="Back to top">
          <img className="brand-emblem" src="/assets/kessler-electric-emblem.png" alt="" />
          <span className="brand-title">
            <span className="brand-title-main">Kessler</span>
            <span className="brand-title-sub">Electric Inc.</span>
          </span>
        </a>
        <div className="footer-links">
          <a href="#top">Back to top ↑</a>
        </div>
        <small>© {new Date().getFullYear()} Kessler Electric. Licensed &amp; insured.</small>
      </footer>
    </div>
  );
}
