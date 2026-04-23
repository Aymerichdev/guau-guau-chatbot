export type Category =
  | "Alimentos"
  | "Snacks"
  | "Salud"
  | "Accesorios"
  | "Aves"
  | "Conejos"
  | "Peces";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  emoji: string;
  price: number; // colones
  brand?: string;
}

export const CATEGORIES: { name: "Todos" | Category; emoji: string }[] = [
  { name: "Todos", emoji: "✨" },
  { name: "Alimentos", emoji: "🍖" },
  { name: "Snacks", emoji: "🦴" },
  { name: "Salud", emoji: "💊" },
  { name: "Accesorios", emoji: "🛏️" },
  { name: "Aves", emoji: "🦜" },
  { name: "Conejos", emoji: "🐰" },
  { name: "Peces", emoji: "🐟" },
];

const mk = (
  id: string,
  name: string,
  category: Category,
  emoji: string,
  price: number,
  description: string,
  brand?: string,
): Product => ({ id, name, category, emoji, price, description, brand });

export const PRODUCTS: Product[] = [
  // ALIMENTOS — Perros y Gatos 🍖
  mk("a1", "Purina Dog Chow Adulto", "Alimentos", "🍖", 14500, "Alimento seco balanceado para perros adultos.", "Purina"),
  mk("a2", "Purina Dog Chow Cachorro", "Alimentos", "🍖", 14900, "Fórmula para cachorros en crecimiento.", "Purina"),
  mk("a3", "Purina Cat Chow Adulto", "Alimentos", "🍖", 13500, "Alimento seco completo para gatos adultos.", "Purina"),
  mk("a4", "Purina Pro Plan Perro Adulto", "Alimentos", "🍖", 19800, "Nutrición premium para perros adultos activos.", "Purina"),
  mk("a5", "Purina Pro Plan Cachorro", "Alimentos", "🍖", 18500, "Fórmula premium para cachorros en desarrollo.", "Purina"),
  mk("a6", "Purina Pro Plan Gato", "Alimentos", "🍖", 17900, "Alimento premium balanceado para gatos.", "Purina"),
  mk("a7", "Purina Alpo", "Alimentos", "🍖", 9800, "Croquetas sabrosas y económicas para perros.", "Purina"),
  mk("a8", "Purina Friskies", "Alimentos", "🍖", 8900, "Alimento seco para gatos con sabor irresistible.", "Purina"),
  mk("a9", "Purina Felix Húmedo", "Alimentos", "🍖", 1500, "Sobre de alimento húmedo para gato.", "Purina"),
  mk("a10", "Royal Canin Mini Adulto", "Alimentos", "🍖", 22500, "Alimento para perros adultos de razas pequeñas.", "Royal Canin"),
  mk("a11", "Royal Canin Maxi Adulto", "Alimentos", "🍖", 26500, "Nutrición específica para razas grandes.", "Royal Canin"),
  mk("a12", "Royal Canin Kitten", "Alimentos", "🍖", 21500, "Fórmula para gatitos en crecimiento.", "Royal Canin"),
  mk("a13", "Hill's Science Diet Adulto", "Alimentos", "🍖", 24500, "Nutrición científicamente formulada para perros.", "Hill's"),
  mk("a14", "Hill's Prescription Diet i/d", "Alimentos", "🍖", 28500, "Alimento medicado para problemas digestivos.", "Hill's"),
  mk("a15", "Pet Master Perro Adulto", "Alimentos", "🍖", 11500, "Croquetas balanceadas a precio accesible.", "Pet Master"),
  mk("a16", "Pro Pet Cachorro", "Alimentos", "🍖", 12500, "Alimento para cachorros con nutrientes esenciales.", "Pro Pet"),
  mk("a17", "Super Perro Adulto", "Alimentos", "🍖", 9500, "Croquetas nutritivas para perros adultos.", "Super Perro"),

  // SNACKS 🦴
  mk("s1", "Galletas para perro", "Snacks", "🦴", 3800, "Premio crocante con sabor irresistible."),
  mk("s2", "Premios dentales", "Snacks", "🦴", 5500, "Snacks que reducen el sarro y refrescan el aliento."),
  mk("s3", "Snacks naturales", "Snacks", "🦴", 6200, "Sin colorantes ni conservantes artificiales."),
  mk("s4", "Treats para entrenamiento", "Snacks", "🦴", 4200, "Bocaditos pequeños para reforzar conductas."),
  mk("s5", "Huesos masticables", "Snacks", "🦴", 4500, "Ayudan a la salud dental y entretienen."),
  mk("s6", "Premios para gato", "Snacks", "🦴", 3500, "Bocaditos suaves con sabor irresistible para felinos."),

  // SALUD 💊
  mk("h1", "Vitaminas multivitamínicas", "Salud", "💊", 7500, "Refuerzo diario para una vida más sana."),
  mk("h2", "Suplementos minerales", "Salud", "💊", 6900, "Aportan minerales esenciales al organismo."),
  mk("h3", "Suplemento articular", "Salud", "💊", 12500, "Apoyo para articulaciones de perros mayores."),
  mk("h4", "Suplemento piel y pelaje", "Salud", "💊", 9800, "Mejora el brillo y salud del pelaje."),
  mk("h5", "Probióticos", "Salud", "💊", 8500, "Equilibran la flora intestinal de tu mascota."),
  mk("h6", "Suplemento digestivo", "Salud", "💊", 7900, "Favorece la digestión y absorción de nutrientes."),
  mk("h7", "Antiparasitario oral", "Salud", "💊", 8900, "Protección interna contra parásitos.", "Bayer"),
  mk("h8", "Frontline Pipetas", "Salud", "💊", 11500, "Pipetas contra pulgas y garrapatas.", "Frontline"),
  mk("h9", "Nexgard Masticable", "Salud", "💊", 13500, "Tableta masticable contra pulgas y garrapatas.", "Nexgard"),
  mk("h10", "Shampoo medicado", "Salud", "💊", 9500, "Trata problemas dermatológicos comunes."),
  mk("h11", "Gotas óticas", "Salud", "💊", 6500, "Limpieza y cuidado de oídos."),
  mk("h12", "Pasta dental para mascotas", "Salud", "💊", 5500, "Cuidado dental diario con sabor agradable."),
  mk("h13", "Kit de cuidado dental", "Salud", "💊", 8900, "Cepillo y pasta para higiene oral completa."),

  // ACCESORIOS 🛏️
  mk("ac1", "Collar ajustable", "Accesorios", "🛏️", 7500, "Cómodo, ajustable y con estilo.", "Fancy Pets"),
  mk("ac2", "Correa resistente", "Accesorios", "🛏️", 8900, "Correa para paseos seguros.", "Fancy Pets"),
  mk("ac3", "Pechera acolchada", "Accesorios", "🛏️", 11500, "Sujeción cómoda sin presionar el cuello.", "Fancy Pets"),
  mk("ac4", "Placa de identificación", "Accesorios", "🛏️", 3500, "Personalizada con nombre y teléfono."),
  mk("ac5", "Cama para perro", "Accesorios", "🛏️", 18500, "Cama suave y acolchada para descanso profundo."),
  mk("ac6", "Cama para gato", "Accesorios", "🛏️", 14500, "Refugio acogedor para siestas felinas."),
  mk("ac7", "Cobija polar", "Accesorios", "🛏️", 6500, "Suave y cálida para los días fríos."),
  mk("ac8", "Transportadora plástica", "Accesorios", "🛏️", 22500, "Segura y ventilada para viajes."),
  mk("ac9", "Comedero de acero", "Accesorios", "🛏️", 6500, "Acero inoxidable, fácil de limpiar."),
  mk("ac10", "Bebedero antideslizante", "Accesorios", "🛏️", 5800, "Base de goma para evitar derrames."),
  mk("ac11", "Fuente de agua eléctrica", "Accesorios", "🛏️", 18900, "Hidratación constante con flujo continuo."),
  mk("ac12", "Juguete Kong Clásico", "Accesorios", "🛏️", 12500, "Juguete rellenable que estimula mente y mandíbula.", "Kong"),
  mk("ac13", "Juguete Kong Puppy", "Accesorios", "🛏️", 10500, "Versión suave para cachorros en dentición.", "Kong"),

  // AVES 🦜
  mk("av1", "Vitakraft Mezcla Pericos", "Aves", "🦜", 4500, "Mezcla balanceada de semillas para pericos.", "Vitakraft"),
  mk("av2", "Kaytee Forti-Diet", "Aves", "🦜", 5800, "Alimento fortificado para aves pequeñas.", "Kaytee"),
  mk("av3", "ZuPreem FruitBlend", "Aves", "🦜", 9500, "Pellets con sabor a frutas para aves.", "ZuPreem"),
  mk("av4", "Vitakraft Snacks Aves", "Aves", "🦜", 3500, "Premios crocantes para aves de jaula.", "Vitakraft"),
  mk("av5", "Mezcla para canarios", "Aves", "🦜", 4200, "Semillas seleccionadas para canarios.", "Kaytee"),

  // CONEJOS 🐰
  mk("co1", "Oxbow Heno Timothy", "Conejos", "🐰", 6500, "Heno fresco esencial para conejos.", "Oxbow"),
  mk("co2", "Oxbow Pellets Adultos", "Conejos", "🐰", 8900, "Pellets balanceados para conejos adultos.", "Oxbow"),
  mk("co3", "Vitakraft Conejo", "Conejos", "🐰", 5500, "Alimento completo para conejos.", "Vitakraft"),
  mk("co4", "Kaytee Forti-Diet Conejo", "Conejos", "🐰", 6800, "Pellets fortificados con vitaminas.", "Kaytee"),
  mk("co5", "Snacks de heno y frutas", "Conejos", "🐰", 3800, "Premios naturales para roedores.", "Vitakraft"),

  // PECES 🐟
  mk("p1", "Tetra Escamas Tropical", "Peces", "🐟", 4500, "Escamas balanceadas para peces tropicales.", "Tetra"),
  mk("p2", "Tetra Min Granulado", "Peces", "🐟", 5200, "Gránulos nutritivos para peces de acuario.", "Tetra"),
  mk("p3", "Sera Vipan", "Peces", "🐟", 6800, "Escamas premium con alto contenido proteico.", "Sera"),
  mk("p4", "API Pellets de Fondo", "Peces", "🐟", 5500, "Alimento que se hunde para peces de fondo.", "API"),
  mk("p5", "Hikari Cichlid Gold", "Peces", "🐟", 8500, "Pellets premium para cíclidos.", "Hikari"),
  mk("p6", "Hikari Betta Bio-Gold", "Peces", "🐟", 4900, "Pellets formulados para peces betta.", "Hikari"),
];

export const formatColones = (n: number) =>
  "₡" + n.toLocaleString("es-CR");
