import CatalogForm from "./components/CatalogForm";
import CategoryForm from "./components/CategoryForm";
import ContactForm from "./components/ContactForm";
import ManufacturerForm from "./components/ManufacturerForm";
import SubcategoryForm from "./components/SubcategoryForm";
import Tabs from "./components/Tabs";
// import AboutForm from "./components/AboutForm";
import QuestionsForm from "./components/QuestionsForm";

export default function AdminPage() {
  const tabs = [
    { name: "Категории", content: <CategoryForm /> },
    { name: "Субкатегории", content: <SubcategoryForm /> },
    { name: "Производители", content: <ManufacturerForm /> },
    { name: "Товары", content: <CatalogForm /> },
    { name: "Контакты", content: <ContactForm /> },
    // { name: "О компании", content: <AboutForm /> },
    { name: "Вопросы", content: <QuestionsForm /> },
  ];

  return (
    <section className="p-10">
      <h1 className="text-3xl font-bold mb-6">Админка</h1>
      <Tabs tabs={tabs} />
    </section>
  );
}
