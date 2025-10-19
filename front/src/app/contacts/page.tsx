import Container from "@/components/layouts/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Title from "@/components/ui/Title";
import Link from "next/link";
import {
  IoCall,
  IoLocationSharp,
  IoLogoWhatsapp,
  IoPersonCircle,
} from "react-icons/io5";

const breadcrumbs = [
  { label: "Главная", href: "/" },
  { label: "Контакты", href: "/contacts" },
];

const contactPerson = {
  name: "Какоткина Алла",
  position: "Контактное лицо",
};

const contacts = [
  {
    item: "+7 (701) 788 71 85",
    icon: <IoCall size={20} />,
    link: "tel:+77017887185",
  },
  {
    item: "Написать в WhatsApp",
    icon: <IoLogoWhatsapp size={20} />,
    link: "https://wa.me/77017887185",
  },
  {
    item: "г. Алматы, Казахстан",
    icon: <IoLocationSharp size={20} />,
    link: "https://maps.google.com?q=Алматы,+Казахстан",
  },
];

export default function Contacts() {
  return (
    <section>
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        <div className="py-20">
          <Title size="lg">Контакты</Title>
          <div className="grid md:grid-cols-2 gap-10 items-start mt-10">
            {/* Левая часть — контакты */}
            <div className="space-y-8 text-white">
              <div className="flex items-center">
                <IoPersonCircle size={60} className="" />
                <div className="flex flex-col justify-start">
                  <p className="text-xl font-semibold">{contactPerson.name}</p>
                  <p className="text-gray text-sm">{contactPerson.position}</p>
                </div>
              </div>

              <address className="not-italic">
                <ul className="space-y-4 text-lg inline-block">
                  {contacts.map((contact, i) => (
                    <li key={i}>
                      <Link
                        href={contact.link}
                        target={
                          contact.link.startsWith("http") ? "_blank" : "_self"
                        }
                        className="hover:text-grey transition flex gap-3 items-center"
                      >
                        {contact.icon}
                        <span>{contact.item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </address>
            </div>

            {/* Правая часть — карта */}
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-primary/10">
              <iframe
                src="https://www.google.com/maps?q=Алматы,+Казахстан&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
