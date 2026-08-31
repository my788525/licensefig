import { getNetworkStrip } from "./network-sites.mjs";

// Standardized cross-site network strip for the whole matrix.
// `self` = this site's own domain (e.g. "relofig.com"); it is filtered out and
// only a themed subset of the network is shown (own category first, capped at
// MAX_LINKS). All links are nofollow + noopener (SEO-safe cross-site footer).
export function NetworkStrip({ self }: { self: string }) {
  const { items, cats } = getNetworkStrip(self);
  return (
    <section className="network-strip" aria-label="Related tools from our network">
      <div className="wrap">
        <h2 className="network-title">Related tools from our network</h2>
        <p className="network-sub">
          A focused set of free calculators and guides across related topics — no
          account required.
        </p>
        <div className="net-grid">
          {cats.map((cat: string) => {
            const list = items.filter((i) => i.cat === cat);
            if (!list.length) return null;
            return (
              <div className="net-cat" key={cat}>
                <h3 className="net-cat-name">{cat}</h3>
                <ul className="net-list">
                  {list.map((i) => (
                    <li key={i.domain}>
                      <a
                        href={`https://${i.domain}`}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                      >
                        <span className="net-label">{i.label}</span>
                        <span className="net-desc">{i.desc}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default NetworkStrip;
