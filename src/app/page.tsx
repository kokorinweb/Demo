import { ChatWidget } from "@/components/ChatWidget";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileBar } from "@/components/MobileBar";
import { Prices } from "@/components/Prices";
import { RequestForm } from "@/components/RequestForm";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { Stages } from "@/components/Stages";
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
        <Stages />
        <Reviews />
        <RequestForm />
        <Contacts />
      </main>
      <Footer />
      <MobileBar />
      <ChatWidget />
    </>
  );
}
