import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileBar } from "@/components/MobileBar";
import { Prices } from "@/components/Prices";
import { Request } from "@/components/Request";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { Works } from "@/components/Works";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Works />
        <Prices />
        <Reviews />
        <Request />
        <Contacts />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
