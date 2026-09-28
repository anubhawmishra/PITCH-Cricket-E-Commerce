import React, { useEffect, useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/products';
import { BookOpen, ArrowRight, Clock, Tag } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

const EXTENDED_CONTENT = {
  'art-01': `
English Willow cricket bats are a marvel of craft and material science. The journey from tree to crease is painstaking — and the difference between a great bat and an average one comes down to choices made at every step.

**Selecting the Cleft**

The finest bats start with hand-selected Grade 1+ English Willow clefts — typically harvested from pollarded willow trees between 15 and 25 years old in the Norfolk and Essex regions of England. A master bat maker examines each cleft for grain count, straightness, moisture content and absence of blemish.

Twelve or more straight, parallel grains running the length of the blade is considered ideal — these grains compress and spring back on impact, giving the bat its characteristic "ping" and power transfer.

**Seasoning**

After splitting, clefts are left to air-dry for six to twelve months — a stage that cannot be rushed without compromising the wood's performance. Kiln drying is faster but produces inferior results; the natural process allows the willow's cellular structure to stabilize while retaining the fibrous elasticity that makes a bat powerful.

**Pressing**

Once seasoned, the cleft goes through hydraulic pressing — compressing the outer face of the blade to harden it and improve durability without sacrificing the springiness of the inner wood. The degree of press varies depending on the grade and intended playing style of the bat.

**Shaping**

The most skilled stage: a master maker shapes the blade on a lathe and by hand, creating the spine profile, edge thickness, and toe shape that will define the bat's pickup weight and sweet spot position.

A thicker spine distributes mass to the middle of the bat, producing a "mid" sweet spot popular with all-round batsmen. A lower mass distribution creates a "low" sweet spot preferred on slower pitches.

**Handle Construction**

The handle is separately constructed from compressed cane and rubber strips — engineered to absorb vibration and reduce the "sting" transmitted to a batsman's hands on off-centre hits. The handle is then inserted into the blade and secured under a pressed cane grip.

**Finishing**

Finally, the bat is sanded smooth, pressed again, and given its final face graining. A light coat of raw linseed oil is applied to protect the wood, followed by knocking-in with a bat mallet or pneumatic press to compress the surface fibres before use.
  `,
  'art-02': `
Choosing the right cricket ball can significantly affect your game — whether you're playing a club match, a T20 tournament or a first-class red ball fixture.

**Red Ball**

The traditional red leather match ball — used in Test cricket and first-class matches — is designed for durability and swing. The ball's quarter seam and primary hand-stitched seam are engineered to move through the air when held correctly and bowled at speed.

Kookaburra, Dukes and SG are the three Test-approved manufacturers — each with subtle differences. Kookaburra balls (used in Australia, South Africa and Asia) have a prominent seam that deteriorates faster, leading to flatter pitches as a match progresses. Dukes balls (used in England and West Indies) retain their seam and hardness longer, favouring swing bowling throughout a Test match.

**White Ball**

White ODI and T20 balls are made from the same grade leather as red balls but treated with a white pigment. Two balls are used per innings in limited-overs cricket — one from each end — to ensure both remain consistent throughout 50 overs. White balls swing less than red balls but have a more pronounced seam for cutters and medium pace bowlers.

**Pink Ball**

The newest addition to Test cricket, the pink ball is used for day-night Test matches to maximize visibility under floodlights. Pink balls share the construction of red balls but use a lacquer finish that retains the color under artificial lighting. They tend to behave differently to red balls — offering more swing in the evening session when conditions suit.

**Choosing Your Ball for Training**

For net practice and training, a turf ball (like the Kookaburra Turf) offers the best match simulation. For indoor or non-turf surfaces, a leather indoor ball or composite ball is more suitable. Match leather balls are designed for turf pitches only — using them on concrete or matting will rapidly degrade the seam.
  `,
  'art-03': `
One of the most common misconceptions in cricket is that bat weight — as measured on a scale — is the primary factor in selecting the right blade. In reality, pickup weight (how heavy the bat feels when you swing it) is far more important than static weight.

**Why Pickup Matters More**

A well-balanced bat distributes its mass through the sweet spot and handle in a way that makes it feel lighter in motion than it does on a scale. Conversely, a poorly balanced bat with a low static weight can feel heavy and sluggish because its mass is not distributed in the ideal position.

A 2lb 9oz bat with ideal mass distribution through the mid-spine can pick up lighter and generate faster bat speed than a 2lb 7oz bat with a bottom-heavy blade.

**Profile & Mass Distribution**

The profile of the blade — specifically the spine height, shoulder thickness, and edge thickness — determines where the mass sits in the bat:

- **High spine / thick edges:** Mass sits high in the blade, creating a mid-to-high sweet spot and a lighter pickup feel
- **Low spine / flat face:** Mass distributed lower, creating a low sweet spot ideal for front-foot dominated players on slower pitches

**Wrist Strength & Playing Style**

Aggressive boundary hitters with strong wrists can handle a heavier bat (2lb 9oz – 2lb 11oz) effectively — the extra mass generates power at contact. Touch players, opening batsmen, and juniors typically benefit from lighter bats (2lb 7oz – 2lb 8.5oz) that allow faster, more controlled swing.

**Testing Pickup**

Always test a bat's pickup in-store by holding it in your batting position and playing an imaginary drive — don't just weigh it in your hands at rest. A bat that feels right in your stance and allows a natural, fluid swing is the correct choice — regardless of what the scale says.
  `,
};

export const JournalPage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!selectedArticle) {
      const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
        },
        { threshold: 0.1 }
      );
      revealEls.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }
  }, [selectedArticle]);

  const formatContent = (text) => {
    return text.split('\n\n').map((para, i) => {
      if (!para.trim()) return null;
      if (para.startsWith('**') && para.endsWith('**')) {
        return (
          <h3 key={i} className="font-display text-xl font-bold uppercase text-willow mt-8 mb-4">
            {para.replace(/\*\*/g, '')}
          </h3>
        );
      }
      if (para.includes('**')) {
        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        return (
          <h3 key={i} className="font-display text-base font-bold uppercase text-willow mt-6 mb-3">
            {parts.map((part, j) =>
              part.startsWith('**') ? part.replace(/\*\*/g, '') : part
            )}
          </h3>
        );
      }
      if (para.startsWith('- **')) {
        const items = para.split('\n').filter(Boolean);
        return (
          <ul key={i} className="space-y-2 mt-4">
            {items.map((item, j) => {
              const [bold, ...rest] = item.replace('- **', '').split(':**');
              return (
                <li key={j} className="flex gap-2 text-sm text-bone/70">
                  <span className="w-1 h-1 rounded-full bg-willow mt-2 flex-shrink-0" />
                  <span><strong className="text-bone">{bold}:</strong>{rest.join(':**')}</span>
                </li>
              );
            })}
          </ul>
        );
      }
      return <p key={i} className="text-sm text-bone/65 leading-relaxed font-light">{para}</p>;
    }).filter(Boolean);
  };

  return (
    <div className="flex flex-col min-h-screen bg-carbon relative page-enter">
      <Header />

      <main className="flex-grow pb-24">
        {/* Banner */}
        <div className="bg-carbonRaised border-b border-[var(--carbon-line)] py-14 px-6 lg:px-12 noise-dark">
          <div className="max-w-[1700px] mx-auto">
            <div className="flex items-center gap-3 mb-3 font-mono text-[9px] text-willow uppercase tracking-[0.35em]">
              <BookOpen className="w-3.5 h-3.5" />
              Performance Research Journal
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-bone tracking-tight mb-3">
              Cricket Gear Guides
            </h1>
            <p className="text-sm font-light text-bone/50 max-w-xl leading-relaxed">
              Technical guides on choosing the right bat, maintaining match leather balls, and maximizing performance from your equipment.
            </p>
          </div>
        </div>

        <div className="max-w-[1700px] mx-auto px-6 lg:px-12 pt-12">
          {selectedArticle ? (
            /* Article Detail */
            <div className="max-w-3xl mx-auto space-y-8 page-enter">
              <button
                onClick={() => setSelectedArticle(null)}
                className="cursor-hover font-mono text-[10px] text-willow uppercase tracking-wider hover:text-bone transition-colors flex items-center gap-2 bg-transparent border-none p-0"
              >
                ← Back to Journal
              </button>

              <div className="space-y-5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-[9px] text-willow uppercase tracking-widest bg-willow/10 border border-willow/25 px-3 py-1 rounded-full flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" />
                    {selectedArticle.category}
                  </span>
                  <span className="font-mono text-[9px] text-bone/40 flex items-center gap-1 uppercase tracking-widest">
                    <Clock className="w-2.5 h-2.5" />
                    {selectedArticle.readTime}
                  </span>
                </div>

                <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-bone leading-tight">
                  {selectedArticle.title}
                </h2>

                <div className="flex items-center gap-4 font-mono text-[10px] text-bone/35 border-b border-bone/[0.07] pb-6">
                  <span>By {selectedArticle.author}</span>
                  <span>·</span>
                  <span>{selectedArticle.date}</span>
                </div>
              </div>

              <div className="aspect-[2/1] overflow-hidden rounded-sm border border-bone/[0.07]">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <blockquote className="border-l-2 border-willow pl-6 py-2">
                <p className="text-base text-bone/80 font-light italic leading-relaxed">
                  "{selectedArticle.summary}"
                </p>
              </blockquote>

              <div className="space-y-5 prose-lg">
                {EXTENDED_CONTENT[selectedArticle.id]
                  ? formatContent(EXTENDED_CONTENT[selectedArticle.id])
                  : <p className="text-sm text-bone/65 leading-relaxed font-light">{selectedArticle.summary}</p>
                }
              </div>

              <div className="pt-8 border-t border-bone/[0.07] flex justify-between items-center">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="cursor-hover font-mono text-[10px] text-willow uppercase tracking-wider hover:text-bone transition-colors flex items-center gap-2 bg-transparent border-none p-0"
                >
                  ← Back to All Guides
                </button>
                <span className="font-mono text-[9px] text-bone/25 uppercase tracking-widest">Pitch Lab Journal</span>
              </div>
            </div>
          ) : (
            /* Article Grid */
            <div>
              {/* Feature Article */}
              <div
                className="reveal reveal-scale cursor-hover group cursor-pointer mb-8 grid grid-cols-1 md:grid-cols-2 rounded-sm overflow-hidden border border-[var(--carbon-line)] hover:border-willow/40 transition-all duration-300"
                onClick={() => setSelectedArticle(JOURNAL_ARTICLES[0])}
              >
                <div className="aspect-[16/10] md:aspect-auto overflow-hidden bg-carbon/40">
                  <img
                    src={JOURNAL_ARTICLES[0].image}
                    alt={JOURNAL_ARTICLES[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="bg-carbonRaised p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-mono text-[9px] text-willow uppercase tracking-widest bg-willow/10 border border-willow/20 px-3 py-1 rounded-full">
                        {JOURNAL_ARTICLES[0].category}
                      </span>
                      <span className="font-mono text-[9px] text-bone/30 uppercase tracking-widest flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {JOURNAL_ARTICLES[0].readTime}
                      </span>
                    </div>
                    <div className="font-mono text-[9px] text-bone/30 uppercase tracking-widest mb-3">Featured</div>
                    <h3 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight text-bone group-hover:text-willow transition-colors mb-4">
                      {JOURNAL_ARTICLES[0].title}
                    </h3>
                    <p className="text-sm text-bone/50 font-light leading-relaxed">
                      {JOURNAL_ARTICLES[0].summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-willow font-bold uppercase tracking-wider mt-6 group-hover:gap-3 transition-all">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Other Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {JOURNAL_ARTICLES.slice(1).map((article, i) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className={`reveal ${i === 0 ? '' : 'reveal-delay-1'} group cursor-hover cursor-pointer rounded-sm overflow-hidden border border-[var(--carbon-line)] hover:border-willow/40 transition-all duration-300 flex flex-col`}
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-carbon/40">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6 bg-carbonRaised flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-[8px] text-willow uppercase tracking-widest">{article.category}</span>
                        <span className="font-mono text-[8px] text-bone/30 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />{article.readTime}
                        </span>
                      </div>
                      <h3 className="font-display text-base font-bold uppercase tracking-wide text-bone group-hover:text-willow transition-colors mb-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-bone/45 font-light leading-relaxed line-clamp-2 flex-1">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between pt-5 mt-5 border-t border-bone/[0.07]">
                        <span className="font-mono text-[9px] text-bone/30 uppercase tracking-widest">{article.date}</span>
                        <span className="font-mono text-[9px] text-willow font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
