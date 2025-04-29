"use client";

import { useEffect, useRef, useState } from "react";
import InlinePaywall from "./inline-paywall";
import Image from "next/image";

export default function Article() {
  const [isPaywallVisible, setIsPaywallVisible] = useState(false);
  const paywallTriggerRef = useRef<HTMLDivElement>(null);
  const hiddenContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsPaywallVisible(true);
          if (paywallTriggerRef.current) {
            observer.unobserve(paywallTriggerRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (paywallTriggerRef.current) {
      observer.observe(paywallTriggerRef.current);
    }

    return () => {
      if (paywallTriggerRef.current) {
        observer.unobserve(paywallTriggerRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-[800px] mx-auto p-5">
      {/* Header */}
      <header className="bg-[#005379] text-white p-3 px-5">
        <h1 className="m-0 text-2xl">Avisa i Trondheim</h1>
      </header>

      <div className="bg-white">
        {/* Article */}
        <article className="bg-white p-5 mt-5 shadow-md">
          <h2 className="text-gray-900 text-2xl font-bold">
            Lokalt oppstartsselskap lanserer revolusjonerende app
          </h2>
          <h3 className="text-gray-600 text-lg font-normal mb-4">
            Overraskende hendelse i Trondheim. Dette må du lese.
          </h3>
        </article>

        {/* Image */}
        <div>
          <Image
            src="https://vcdn.polarismedia.no/dfbb3016-fcb8-4775-b254-9ed134f8f7a0?fit=crop&h=700&q=80&tight=false&w=1000"
            alt="News Image fabrikk"
            width={800}
            height={400}
            className="w-full h-auto mt-2.5"
          />
          <p className="italic text-gray-700 mt-2.5 pl-5" id="image-ingress">
            En ny bølge av innovasjon vokser frem fra hjertet av teknologimiljøet når en oppstartsbedrift redefinerer
            produktivitet.
          </p>
          <p className="text-gray-500 text-sm pl-5 mt-2 meta">
            Av Jane Doe | 25. april 2025
          </p>
        </div>

        {/* Article Content */}
        <article className="bg-white p-5 shadow-md">
          {/* First 4 paragraphs - visible content */}
          <p className="mb-4 text-gray-700">
            I et dristig trekk som har fanget oppmerksomheten til teknologientusiaster over hele landet, har det lokale
            oppstartsselskapet ByteBloom lansert en ny produktivitetsapp som lover å forandre hvordan folk organiserer
            tiden sin.
          </p>

          <p className="mb-4 text-gray-700">
            Appen, som heter "FocusFlow," bruker kunstig intelligens for å analysere brukerens atferd og optimalisere
            daglige rutiner. Bare timer etter lansering toppet den appbutikkens hitliste.
          </p>

          <p className="mb-4 text-gray-700">
            "Vi utviklet FocusFlow for å hjelpe folk med å jobbe smartere, ikke hardere," sier administrerende direktør
            Alex Green. "Det er som å ha en personlig assistent i lomma."
          </p>

          <p className="mb-4 text-gray-700">
            Teknologieksperter har lenge spådd at AI-drevne produktivitetsverktøy vil bli den neste store trenden, og
            ByteBloom ser ut til å være i forkant av denne utviklingen med sin innovative tilnærming.
          </p>

          {/* Paywall trigger point - after 4th paragraph */}
          <div ref={paywallTriggerRef} className="h-1 w-full"></div>

          {isPaywallVisible ? (
            <InlinePaywall />
          ) : (
            <div ref={hiddenContentRef}>
              <p className="mb-4 text-gray-700">
                De første anmeldelsene har vært overveldende positive, med brukere som roser appens elegante design og
                intuitive funksjoner.
              </p>

              <p className="mb-4 text-gray-700">
                ByteBloom planlegger å rulle ut nye oppdateringer i ukene som kommer, inkludert integrasjon med populære
                kalenderapper og stemmestyring.
              </p>

              <p className="mb-4 text-gray-700">
                <strong>Om ByteBloom:</strong> ByteBloom er et teknologiselskap med base i Norge, som har spesialisert
                seg på utvikling av digitale løsninger for personlig produktivitet. Selskapet ble grunnlagt i 2022 av et
                team med bakgrunn innen kunstig intelligens, UX-design og programvareutvikling. De har som mål å
                forenkle hverdagen for brukere gjennom smarte og brukervennlige verktøy. Med lanseringen av FocusFlow
                har ByteBloom raskt markert seg som en innovativ aktør i det nordiske teknologimarkedet.
              </p>

              <p className="mb-4 text-gray-700">
                Ifølge markedsanalytikere kan ByteBloom være på vei mot en betydelig vekst i det kommende året, spesielt
                hvis de fortsetter å innovere i samme tempo. Flere investorer har allerede vist interesse for selskapet
                etter den vellykkede lanseringen.
              </p>

              <p className="mb-4 text-gray-700">
                "Vi ser et enormt potensial i det nordiske markedet," sier Green. "Vår visjon er å bli den foretrukne
                produktivitetsplattformen for profesjonelle i hele Skandinavia innen utgangen av neste år."
              </p>

              <p className="mb-4 text-gray-700">
                Brukere kan laste ned FocusFlow fra alle større app-butikker, og selskapet tilbyr en gratis prøveperiode
                på 14 dager for nye brukere.
              </p>
            </div>
          )}
        </article>
      </div>

      {/* Footer */}
      <footer className="text-center p-2.5 text-sm text-gray-500">
        &copy; 2025 Avisa i Trondheim. All rights reserved.
      </footer>
    </div>
  );
}
