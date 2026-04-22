import imgAlimentos from "@/assets/cat-alimentos.jpg";
import imgSnacks from "@/assets/cat-snacks.jpg";
import imgJuguetes from "@/assets/cat-juguetes.jpg";
import imgAccesorios from "@/assets/cat-accesorios.jpg";
import imgGrooming from "@/assets/cat-grooming.jpg";
import imgSalud from "@/assets/cat-salud.jpg";
import imgOtros from "@/assets/cat-otros.jpg";

export type Category =
  | "Alimentos"
  | "Snacks"
  | "Juguetes"
  | "Accesorios"
  | "Grooming"
  | "Salud"
  | "Otros";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  emoji: string;
  price: number; // colones
}

export const CATEGORY_IMAGES: Record<Category, string> = {
  Alimentos: imgAlimentos,
  Snacks: imgSnacks,
  Juguetes: imgJuguetes,
  Accesorios: imgAccesorios,
  Grooming: imgGrooming,
  Salud: imgSalud,
  Otros: imgOtros,
};

export const getProductImage = (product: Product) => CATEGORY_IMAGES[product.category];

export const CATEGORIES: { name: "Todos" | Category; emoji: string }[] = [
  { name: "Todos", emoji: "✨" },
  { name: "Alimentos", emoji: "🍖" },
  { name: "Snacks", emoji: "🦴" },
  { name: "Juguetes", emoji: "🧸" },
  { name: "Accesorios", emoji: "🛏️" },
  { name: "Grooming", emoji: "🧼" },
  { name: "Salud", emoji: "🐾" },
  { name: "Otros", emoji: "🐹" },
];

const mk = (
  id: string,
  name: string,
  category: Category,
  emoji: string,
  price: number,
  description: string,
): Product => ({ id, name, category, emoji, price, description });

export const PRODUCTS: Product[] = [
  // ALIMENTOS 🍖
  mk("a1", "Purina Pro Plan Cachorro", "Alimentos", "🍖", 18500, "Nutrición premium para perros cachorros en crecimiento."),
  mk("a2", "Purina Pro Plan Adulto", "Alimentos", "🍖", 19800, "Croquetas balanceadas para perros adultos activos."),
  mk("a3", "Purina Pro Plan Gato", "Alimentos", "🍖", 17900, "Alimento completo y equilibrado para gatos adultos."),
  mk("a4", "NutriSource Perro", "Alimentos", "🍖", 22500, "Fórmula natural con proteínas de alta calidad."),
  mk("a5", "NutriSource Gato", "Alimentos", "🍖", 21000, "Receta holística para gatos exigentes."),
  mk("a6", "Balance Perro Adulto", "Alimentos", "🍖", 14500, "Croquetas nutritivas a un precio accesible."),
  mk("a7", "Balance Cachorro", "Alimentos", "🍖", 14900, "Apoyo al desarrollo de cachorros sanos."),
  mk("a8", "Diamond Maintenance Cat", "Alimentos", "🍖", 16500, "Mantenimiento diario para gatos adultos."),
  mk("a9", "Pedigree Croquetas", "Alimentos", "🍖", 9500, "Sabor irresistible para perros de toda edad."),
  mk("a10", "Biscrok Snacks", "Alimentos", "🍖", 8500, "Galletas crocantes ideales como premio."),
  mk("a11", "Alimento húmedo para gato", "Alimentos", "🍖", 12500, "Lata jugosa y aromática para gatos."),
  mk("a12", "Alimento premium razas pequeñas", "Alimentos", "🍖", 24500, "Croqueta pequeña adaptada a razas mini."),

  // SNACKS 🦴
  mk("s1", "Huesos masticables", "Snacks", "🦴", 4500, "Ayudan a la salud dental y entretienen por horas."),
  mk("s2", "Galletas Dukan", "Snacks", "🦴", 3800, "Premio crocante con sabor irresistible."),
  mk("s3", "Premios dentales", "Snacks", "🦴", 5500, "Snacks que reducen el sarro y refrescan el aliento."),
  mk("s4", "Snacks naturales", "Snacks", "🦴", 6200, "Sin colorantes ni conservantes artificiales."),
  mk("s5", "Treats para entrenamiento", "Snacks", "🦴", 4200, "Bocaditos pequeños perfectos para reforzar conductas."),

  // JUGUETES 🧸
  mk("j1", "Peluche squeaky", "Juguetes", "🧸", 5500, "Peluche con sonido para horas de diversión."),
  mk("j2", "Kong rellenable", "Juguetes", "🧸", 12500, "Juguete clásico que estimula mente y mandíbula."),
  mk("j3", "Cuerda para tirar", "Juguetes", "🧸", 4800, "Ideal para juegos interactivos y dental."),
  mk("j4", "Pelotas de caucho", "Juguetes", "🧸", 4500, "Resistentes y rebotan a la perfección."),
  mk("j5", "Juguetes interactivos", "Juguetes", "🧸", 13500, "Estimulación mental con premios escondidos."),
  mk("j6", "Mordedores", "Juguetes", "🧸", 6500, "Material seguro para cachorros en dentición."),

  // ACCESORIOS 🛏️
  mk("ac1", "Camas para perro", "Accesorios", "🛏️", 18500, "Cama suave y acolchada para descanso profundo."),
  mk("ac2", "Camas para gato", "Accesorios", "🛏️", 14500, "Refugio acogedor para siestas felinas."),
  mk("ac3", "Platos para comida", "Accesorios", "🛏️", 6500, "Acero inoxidable, fáciles de limpiar."),
  mk("ac4", "Dispensadores de agua", "Accesorios", "🛏️", 12800, "Hidratación constante con flujo continuo."),
  mk("ac5", "Collares", "Accesorios", "🛏️", 7500, "Cómodos, ajustables y con estilo."),
  mk("ac6", "Correas", "Accesorios", "🛏️", 8900, "Resistentes para paseos seguros."),
  mk("ac7", "Arnés", "Accesorios", "🛏️", 11500, "Sujeción cómoda sin presionar el cuello."),

  // GROOMING 🧼
  mk("g1", "Shampoo para perro", "Grooming", "🧼", 8500, "Limpia y deja un pelaje brillante y suave."),
  mk("g2", "Shampoo para gato", "Grooming", "🧼", 8500, "Fórmula suave especial para gatos."),
  mk("g3", "Corte de uñas", "Grooming", "🧼", 6500, "Servicio rápido y seguro."),
  mk("g4", "Limpieza de oídos", "Grooming", "🧼", 7500, "Higiene esencial para prevenir infecciones."),
  mk("g5", "Cepillos", "Grooming", "🧼", 7900, "Eliminan pelo muerto y nudos."),
  mk("g6", "Servicios de grooming", "Grooming", "🧼", 17500, "Baño, secado, corte y mimos completos."),

  // SALUD 🐾
  mk("h1", "Vitaminas", "Salud", "🐾", 7500, "Refuerzo diario para una vida más sana."),
  mk("h2", "Suplementos", "Salud", "🐾", 8900, "Apoyo articular, piel y pelaje."),
  mk("h3", "Productos calmantes", "Salud", "🐾", 9500, "Reducen ansiedad por viajes o tormentas."),
  mk("h4", "Control de pulgas", "Salud", "🐾", 11500, "Protección efectiva contra parásitos."),

  // OTROS 🐹
  mk("o1", "Arena para gato", "Otros", "🐹", 6500, "Aglomerante y de fácil limpieza."),
  mk("o2", "Comida para conejo", "Otros", "🐹", 5500, "Pellets balanceados para conejos sanos."),
  mk("o3", "Heno", "Otros", "🐹", 4200, "Heno fresco esencial para roedores."),
  mk("o4", "Jaulas pequeñas", "Otros", "🐹", 22500, "Espacio cómodo para mascotas pequeñas."),
];

export const formatColones = (n: number) =>
  "₡" + n.toLocaleString("es-CR");
