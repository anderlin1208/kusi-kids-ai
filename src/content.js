export const WORLDS = [
  {
    id: "comunicacion",
    title: "Bosque de las Palabras",
    area: "Comunicación y prelectura",
    emoji: "📚",
    color: "#f5a747",
    description:
      "Escucha cuentos, descubre sonidos, juega con palabras y comienza a leer con Kusi."
  },
  {
    id: "matematicas",
    title: "Montaña de los Números",
    area: "Matemática temprana",
    emoji: "🔢",
    color: "#7c6af5",
    description:
      "Cuenta, compara, ordena, completa patrones y explora formas jugando."
  },
  {
    id: "naturaleza",
    title: "Valle de los Exploradores",
    area: "Ciencia y naturaleza",
    emoji: "🌿",
    color: "#48ad88",
    description:
      "Observa plantas, animales, clima y el cuerpo para descubrir cómo funciona tu entorno."
  },
  {
    id: "emociones",
    title: "Jardín de las Emociones",
    area: "Desarrollo socioemocional",
    emoji: "💛",
    color: "#ee8fa8",
    description:
      "Reconoce emociones, aprende a convivir, pedir ayuda y cuidar de los demás."
  },
  {
    id: "logica",
    title: "Isla de los Retos",
    area: "Lógica y memoria",
    emoji: "🧩",
    color: "#5c9bd9",
    description:
      "Observa, recuerda, compara, clasifica y resuelve pequeños desafíos."
  },
  {
    id: "arte",
    title: "Arcoíris Creativo",
    area: "Arte y creatividad",
    emoji: "🎨",
    color: "#ae7edc",
    description:
      "Explora colores, ritmos, imaginación, expresión artística e historias creativas."
  },
  {
    id: "habitos",
    title: "Villa de los Hábitos",
    area: "Autonomía y hábitos",
    emoji: "🪥",
    color: "#e59961",
    description:
      "Practica rutinas saludables, autocuidado, orden y seguridad cotidiana."
  },
  {
    id: "movimiento",
    title: "Parque del Movimiento",
    area: "Psicomotricidad",
    emoji: "🤸",
    color: "#49aeb7",
    description:
      "Muévete, coordina tu cuerpo, sigue instrucciones y disfruta aprendiendo con acción."
  }
];

export const ACTIVITIES = [
  // =========================
  // COMUNICACIÓN Y PRELECTURA
  // =========================
  {
    id: "a01",
    world: "comunicacion",
    title: "Escucha y comprende",
    kind: "cuento",
    emoji: "🌱",
    question:
      "Kusi contó: «Luna encontró una semilla, la puso en la tierra y la regó». ¿Qué encontró Luna?",
    options: ["Una semilla", "Un sombrero", "Una pelota"],
    correct: 0,
    explanation:
      "¡Muy bien! Luna encontró una semilla. Escuchar con atención nos ayuda a comprender mejor.",
    hint:
      "Piensa en la palabra que aparece al inicio del cuento. Era algo pequeño que puede crecer.",
    mascotIntro:
      "Vamos a escuchar un cuento corto. Después responderás una pregunta.",
    successTitle: "¡Escuchaste con mucha atención!",
    retryTitle: "¡Intentémoslo otra vez!",
    skill: "Comprensión oral"
  },
  {
    id: "a02",
    world: "comunicacion",
    title: "Sonidos iniciales",
    kind: "opcion",
    emoji: "🔤",
    question:
      "¿Cuál palabra comienza con el sonido /m/?",
    options: ["Mesa", "Sol", "Pato"],
    correct: 0,
    explanation:
      "Mesa comienza con el sonido /m/. Escuchar el primer sonido ayuda a prepararnos para leer.",
    hint:
      "Di cada palabra despacio y escucha con cuál empiezan tus labios: me-sa, sol, pa-to.",
    mascotIntro:
      "Escuchemos el primer sonido de cada palabra.",
    successTitle: "¡Descubriste el sonido inicial!",
    retryTitle: "¡Escuchemos otra vez!",
    skill: "Conciencia fonológica"
  },
  {
    id: "a03",
    world: "comunicacion",
    title: "Palabras que riman",
    kind: "opcion",
    emoji: "🐱",
    question:
      "¿Cuál palabra rima con gato?",
    options: ["Pato", "Mesa", "Luna"],
    correct: 0,
    explanation:
      "Gato y pato suenan parecido al final. Las rimas nos ayudan a jugar con los sonidos de las palabras.",
    hint:
      "Escucha cómo terminan las palabras: ga-to, pa-to, me-sa, lu-na.",
    mascotIntro:
      "Vamos a jugar con palabras que suenan parecido.",
    successTitle: "¡Encontraste la rima!",
    retryTitle: "¡Escucha el final de las palabras!",
    skill: "Rimas"
  },
  {
    id: "a04",
    world: "comunicacion",
    title: "Ordena el cuento",
    kind: "opcion",
    emoji: "📖",
    question:
      "Primero plantamos una semilla y después la regamos. ¿Qué pasó primero?",
    options: ["Plantar la semilla", "Regarla", "Comer una fruta"],
    correct: 0,
    explanation:
      "Primero plantamos la semilla. Después la regamos. Ordenar hechos ayuda a comprender historias.",
    hint:
      "Piensa qué se hace antes para que la planta pueda crecer.",
    mascotIntro:
      "Vamos a recordar el orden de una historia.",
    successTitle: "¡Recordaste el orden del cuento!",
    retryTitle: "¡Pensemos qué pasó primero!",
    skill: "Secuencia narrativa"
  },

  // =========================
  // MATEMÁTICA TEMPRANA
  // =========================
  {
    id: "a05",
    world: "matematicas",
    title: "Cuenta las frutas",
    kind: "contar",
    emoji: "🍎",
    question:
      "🍎 🍎 🍎 ¿Cuántas manzanas ves?",
    options: ["2", "3", "4"],
    correct: 1,
    explanation:
      "Hay tres manzanas. Contarlas una por una ayuda a no equivocarnos.",
    hint:
      "Señala cada manzana con el dedo mientras cuentas: uno, dos, tres.",
    mascotIntro:
      "Vamos a contar despacio. Toca cada manzana una por una.",
    successTitle: "¡Contaste muy bien!",
    retryTitle: "¡Contemos otra vez!",
    skill: "Conteo"
  },
  {
    id: "a06",
    world: "matematicas",
    title: "¿Dónde hay más?",
    kind: "opcion",
    emoji: "⭐",
    question:
      "¿Qué grupo tiene más estrellas?",
    options: ["⭐ ⭐", "⭐ ⭐ ⭐ ⭐", "⭐ ⭐ ⭐"],
    correct: 1,
    explanation:
      "Cuatro estrellas son más que dos o tres. Comparar cantidades nos ayuda a entender cuál grupo es mayor.",
    hint:
      "Cuenta cuántas estrellas hay en cada grupo y compáralas.",
    mascotIntro:
      "Vamos a descubrir dónde hay más.",
    successTitle: "¡Comparaste muy bien!",
    retryTitle: "¡Observemos con calma!",
    skill: "Comparación de cantidades"
  },
  {
    id: "a07",
    world: "matematicas",
    title: "Sigue el patrón",
    kind: "opcion",
    emoji: "🟦",
    question:
      "🔴 🔵 🔴 🔵 🔴 ... ¿Qué color sigue?",
    options: ["Rojo", "Azul", "Amarillo"],
    correct: 1,
    explanation:
      "El patrón va rojo, azul, rojo, azul. Después de rojo sigue azul.",
    hint:
      "Observa cómo se repiten los colores uno después del otro.",
    mascotIntro:
      "Vamos a descubrir qué se repite.",
    successTitle: "¡Descubriste el patrón!",
    retryTitle: "¡Miremos la secuencia otra vez!",
    skill: "Patrones"
  },
  {
    id: "a08",
    world: "matematicas",
    title: "Explora las formas",
    kind: "opcion",
    emoji: "🔺",
    question:
      "¿Qué figura tiene tres lados?",
    options: ["Triángulo", "Círculo", "Cuadrado"],
    correct: 0,
    explanation:
      "El triángulo tiene tres lados. Las figuras tienen formas distintas que podemos reconocer.",
    hint:
      "Piensa en la figura que parece una montañita con tres esquinas.",
    mascotIntro:
      "Vamos a observar las figuras.",
    successTitle: "¡Reconociste la figura!",
    retryTitle: "¡Pensemos en los lados!",
    skill: "Geometría inicial"
  },

  // =========================
  // CIENCIA Y NATURALEZA
  // =========================
  {
    id: "a09",
    world: "naturaleza",
    title: "¿Qué necesita una planta?",
    kind: "opcion",
    emoji: "🌱",
    question:
      "¿Qué necesita normalmente una planta para crecer?",
    options: ["Agua y luz", "Juguetes", "Zapatos"],
    correct: 0,
    explanation:
      "Las plantas necesitan agua y luz para crecer. También requieren tierra y cuidados.",
    hint:
      "Piensa en lo que usamos para regar una planta y en lo que recibe del sol.",
    mascotIntro:
      "Vamos a cuidar una planta con nuestras ideas.",
    successTitle: "¡Sabes cuidar plantas!",
    retryTitle: "¡Pensemos qué ayuda a crecer!",
    skill: "Seres vivos"
  },
  {
    id: "a10",
    world: "naturaleza",
    title: "Animal y entorno",
    kind: "opcion",
    emoji: "🐟",
    question:
      "¿Cuál de estos animales vive en el agua?",
    options: ["Pez", "Gato", "Gallina"],
    correct: 0,
    explanation:
      "El pez vive en el agua. Cada animal tiene un lugar donde vive mejor.",
    hint:
      "Piensa en qué animal nada y respira en el agua.",
    mascotIntro:
      "Vamos a descubrir dónde vive cada animal.",
    successTitle: "¡Encontraste el animal correcto!",
    retryTitle: "¡Observemos mejor los animales!",
    skill: "Entorno de los animales"
  },
  {
    id: "a11",
    world: "naturaleza",
    title: "Nuestros sentidos",
    kind: "opcion",
    emoji: "👂",
    question:
      "¿Con qué parte del cuerpo escuchamos?",
    options: ["Oídos", "Codos", "Rodillas"],
    correct: 0,
    explanation:
      "Escuchamos con los oídos. Nuestros sentidos nos ayudan a conocer el mundo.",
    hint:
      "Piensa en la parte del cuerpo que está a los lados de tu cabeza.",
    mascotIntro:
      "Vamos a descubrir cómo escuchamos el mundo.",
    successTitle: "¡Conoces tus sentidos!",
    retryTitle: "¡Piensa en tu cuerpo!",
    skill: "El cuerpo y los sentidos"
  },
  {
    id: "a12",
    world: "naturaleza",
    title: "El clima del día",
    kind: "opcion",
    emoji: "☀️",
    question:
      "Si el cielo tiene nubes grises y cae agua, ¿cómo está el día?",
    options: ["Lluvioso", "Muy seco", "De noche"],
    correct: 0,
    explanation:
      "Si cae agua del cielo, el día está lluvioso. El clima cambia y podemos observarlo.",
    hint:
      "Piensa qué palabra usamos cuando cae lluvia.",
    mascotIntro:
      "Vamos a observar el clima.",
    successTitle: "¡Observaste el clima!",
    retryTitle: "¡Miremos el cielo otra vez!",
    skill: "Observación del entorno"
  },

  // =========================
  // DESARROLLO SOCIOEMOCIONAL
  // =========================
  {
    id: "a13",
    world: "emociones",
    title: "Reconozco la alegría",
    kind: "opcion",
    emoji: "😊",
    question:
      "Tu amiga sonríe porque recibió una buena noticia. ¿Cómo podría sentirse?",
    options: ["Alegre", "Enojada", "Asustada"],
    correct: 0,
    explanation:
      "Una sonrisa puede mostrar alegría. Reconocer emociones nos ayuda a entender a los demás.",
    hint:
      "Piensa cómo te sientes tú cuando algo bonito pasa.",
    mascotIntro:
      "Vamos a descubrir cómo se sienten las personas.",
    successTitle: "¡Reconociste la emoción!",
    retryTitle: "¡Miremos la carita con calma!",
    skill: "Identificación de emociones"
  },
  {
    id: "a14",
    world: "emociones",
    title: "Pedir ayuda",
    kind: "opcion",
    emoji: "🤝",
    question:
      "Si una actividad te cuesta mucho, ¿qué puedes hacer?",
    options: ["Pedir ayuda", "Golpear la mesa", "Esconder el cuaderno"],
    correct: 0,
    explanation:
      "Pedir ayuda es una buena decisión. Aprender también significa apoyarnos en otros.",
    hint:
      "Piensa en una acción tranquila y respetuosa.",
    mascotIntro:
      "Aprender juntos también significa saber pedir apoyo.",
    successTitle: "¡Muy buena decisión!",
    retryTitle: "¡Busquemos una forma tranquila!",
    skill: "Búsqueda de apoyo"
  },
  {
    id: "a15",
    world: "emociones",
    title: "Esperar mi turno",
    kind: "opcion",
    emoji: "🕒",
    question:
      "Si estás jugando con otros niños y todos quieren participar, ¿qué es lo mejor?",
    options: ["Esperar mi turno", "Quitar el juguete", "Gritar más fuerte"],
    correct: 0,
    explanation:
      "Esperar el turno ayuda a convivir mejor y a jugar con respeto.",
    hint:
      "Piensa qué haría el juego más tranquilo y justo para todos.",
    mascotIntro:
      "Vamos a aprender a convivir mientras jugamos.",
    successTitle: "¡Sabes compartir!",
    retryTitle: "¡Pensemos en una acción amable!",
    skill: "Convivencia"
  },
  {
    id: "a16",
    world: "emociones",
    title: "Calmarme cuando me enojo",
    kind: "opcion",
    emoji: "💨",
    question:
      "Si te sientes enojado, ¿qué puede ayudarte a calmarte?",
    options: ["Respirar profundo", "Patear una silla", "Romper el papel"],
    correct: 0,
    explanation:
      "Respirar profundo puede ayudar a calmarnos y pensar mejor.",
    hint:
      "Busca una opción que cuide tu cuerpo y a los demás.",
    mascotIntro:
      "Vamos a descubrir una forma sana de calmarnos.",
    successTitle: "¡Elegiste una buena estrategia!",
    retryTitle: "¡Busquemos una forma tranquila!",
    skill: "Autorregulación"
  },

  // =========================
  // LÓGICA Y MEMORIA
  // =========================
  {
    id: "a17",
    world: "logica",
    title: "Encuentra la pareja",
    kind: "opcion",
    emoji: "🧠",
    question:
      "Si tienes una media azul, ¿cuál debería ser su pareja?",
    options: ["Otra media azul", "Un zapato rojo", "Una cuchara"],
    correct: 0,
    explanation:
      "La pareja correcta es otra media azul. Comparar y asociar nos ayuda a pensar.",
    hint:
      "Busca el objeto que sea del mismo tipo y del mismo color.",
    mascotIntro:
      "Vamos a unir objetos que combinan.",
    successTitle: "¡Encontraste la pareja!",
    retryTitle: "¡Comparemos con cuidado!",
    skill: "Asociación"
  },
  {
    id: "a18",
    world: "logica",
    title: "¿Cuál es diferente?",
    kind: "opcion",
    emoji: "🔍",
    question:
      "🍌 🍌 🍎 ¿Cuál es diferente?",
    options: ["La manzana", "El primer plátano", "El segundo plátano"],
    correct: 0,
    explanation:
      "La manzana es diferente porque no es igual a los plátanos.",
    hint:
      "Mira el grupo y encuentra el que no se parece a los demás.",
    mascotIntro:
      "Vamos a observar cuál no pertenece al grupo.",
    successTitle: "¡Observaste muy bien!",
    retryTitle: "¡Miremos otra vez!",
    skill: "Clasificación"
  },
  {
    id: "a19",
    world: "logica",
    title: "Recuerda el orden",
    kind: "opcion",
    emoji: "🟣",
    question:
      "Kusi mostró: círculo, cuadrado, círculo. ¿Qué forma apareció en el medio?",
    options: ["Cuadrado", "Círculo", "Triángulo"],
    correct: 0,
    explanation:
      "La forma del medio era el cuadrado. Recordar secuencias fortalece la memoria.",
    hint:
      "Repite en tu mente: círculo, cuadrado, círculo.",
    mascotIntro:
      "Vamos a recordar una pequeña secuencia.",
    successTitle: "¡Tu memoria está creciendo!",
    retryTitle: "¡Recordemos juntos!",
    skill: "Memoria secuencial"
  },
  {
    id: "a20",
    world: "logica",
    title: "Agrupa por color",
    kind: "opcion",
    emoji: "🟡",
    question:
      "Si quieres guardar juntos los juguetes amarillos, ¿cuál debes escoger?",
    options: ["🟡", "🔵", "🔴"],
    correct: 0,
    explanation:
      "Debes elegir el objeto amarillo. Agrupar por color es una forma de clasificar.",
    hint:
      "Busca el color del sol o de un pollito.",
    mascotIntro:
      "Vamos a ordenar por colores.",
    successTitle: "¡Clasificaste correctamente!",
    retryTitle: "¡Busquemos el color correcto!",
    skill: "Clasificación por atributo"
  },

  // =========================
  // ARTE Y CREATIVIDAD
  // =========================
  {
    id: "a21",
    world: "arte",
    title: "Mezcla de colores",
    kind: "opcion",
    emoji: "🎨",
    question:
      "Si mezclas azul y amarillo, ¿qué color puede aparecer?",
    options: ["Verde", "Rosado", "Marrón"],
    correct: 0,
    explanation:
      "Al mezclar azul y amarillo puede aparecer el verde. ¡Crear colores es una aventura!",
    hint:
      "Piensa en el color de una hoja o del césped.",
    mascotIntro:
      "Vamos a jugar con colores como pequeños artistas.",
    successTitle: "¡Exploraste colores!",
    retryTitle: "¡Pensemos en la naturaleza!",
    skill: "Exploración artística"
  },
  {
    id: "a22",
    world: "arte",
    title: "Sonido y ritmo",
    kind: "opcion",
    emoji: "🥁",
    question:
      "Si haces: palmas, palmas, silencio... ¿qué podría venir después para repetir el ritmo?",
    options: ["Palmas", "Un salto", "Dormir"],
    correct: 0,
    explanation:
      "Después del silencio vuelven las palmas. Repetir ritmos nos ayuda a sentir patrones en la música.",
    hint:
      "Repite el ritmo con tu cuerpo: palmas, palmas, silencio...",
    mascotIntro:
      "Vamos a escuchar y sentir un ritmo.",
    successTitle: "¡Seguiste el ritmo!",
    retryTitle: "¡Repitamos con palmas!",
    skill: "Ritmo"
  },
  {
    id: "a23",
    world: "arte",
    title: "Inventamos una historia",
    kind: "opcion",
    emoji: "✨",
    question:
      "Si ves una nube con forma de pez, ¿qué puedes hacer?",
    options: ["Inventar una historia", "Romper la nube", "Esconderse"],
    correct: 0,
    explanation:
      "Ver formas e inventar historias ayuda a desarrollar la imaginación.",
    hint:
      "Busca la opción que usa tu creatividad.",
    mascotIntro:
      "Vamos a imaginar algo nuevo con Kusi.",
    successTitle: "¡Tu imaginación vuela!",
    retryTitle: "¡Pensemos con creatividad!",
    skill: "Imaginación"
  },
  {
    id: "a24",
    world: "arte",
    title: "Elijo materiales",
    kind: "opcion",
    emoji: "🖍️",
    question:
      "Si quieres dibujar, ¿qué material te puede ayudar más?",
    options: ["Crayones", "Zapatos", "Cepillo de dientes"],
    correct: 0,
    explanation:
      "Los crayones ayudan a dibujar y crear. Los materiales artísticos sirven para expresarnos.",
    hint:
      "Piensa en el material que deja color sobre el papel.",
    mascotIntro:
      "Vamos a escoger herramientas de artista.",
    successTitle: "¡Elegiste como artista!",
    retryTitle: "¡Pensemos qué usamos para dibujar!",
    skill: "Expresión artística"
  },

  // =========================
  // AUTONOMÍA Y HÁBITOS
  // =========================
  {
    id: "a25",
    world: "habitos",
    title: "Lavado de manos",
    kind: "opcion",
    emoji: "🫧",
    question:
      "¿Cuándo es importante lavarse las manos?",
    options: ["Antes de comer", "Solo cuando juego", "Nunca"],
    correct: 0,
    explanation:
      "Lavarse las manos antes de comer ayuda a cuidar la salud.",
    hint:
      "Piensa en una rutina que nos ayuda a mantenernos limpios antes de tocar la comida.",
    mascotIntro:
      "Vamos a cuidar nuestro cuerpo con buenos hábitos.",
    successTitle: "¡Cuidas tu salud!",
    retryTitle: "¡Pensemos en la higiene!",
    skill: "Higiene"
  },
  {
    id: "a26",
    world: "habitos",
    title: "Ordeno mis cosas",
    kind: "opcion",
    emoji: "🧺",
    question:
      "Cuando terminas de jugar, ¿qué es buena idea hacer?",
    options: ["Guardar los juguetes", "Dejarlos tirados", "Esconderlos debajo de la cama"],
    correct: 0,
    explanation:
      "Guardar los juguetes ayuda a mantener el orden y a encontrarlos después.",
    hint:
      "Busca la opción que deja el espacio limpio y listo para volver a usarlo.",
    mascotIntro:
      "El orden también es parte de aprender.",
    successTitle: "¡Qué ordenado!",
    retryTitle: "¡Pensemos en cuidar el espacio!",
    skill: "Orden"
  },
  {
    id: "a27",
    world: "habitos",
    title: "Cepillo de dientes",
    kind: "opcion",
    emoji: "🪥",
    question:
      "¿Para qué usamos el cepillo de dientes?",
    options: ["Para limpiar los dientes", "Para peinar muñecos", "Para pintar"],
    correct: 0,
    explanation:
      "El cepillo de dientes sirve para limpiar los dientes y cuidarlos.",
    hint:
      "Piensa en la rutina que hacemos en el baño.",
    mascotIntro:
      "Vamos a cuidar nuestra sonrisa.",
    successTitle: "¡Cuidas tu sonrisa!",
    retryTitle: "¡Recordemos nuestra rutina!",
    skill: "Autocuidado"
  },
  {
    id: "a28",
    world: "habitos",
    title: "Seguridad cotidiana",
    kind: "opcion",
    emoji: "🚸",
    question:
      "Si quieres cruzar la calle, ¿qué es lo mejor?",
    options: ["Ir con un adulto y mirar", "Correr solo", "Cerrar los ojos"],
    correct: 0,
    explanation:
      "Cruzar con un adulto y mirar ayuda a mantenernos seguros.",
    hint:
      "Busca la opción que cuida tu cuerpo y te mantiene protegido.",
    mascotIntro:
      "Aprender también es saber cuidarnos.",
    successTitle: "¡Elegiste con seguridad!",
    retryTitle: "¡Pensemos en cuidarnos!",
    skill: "Seguridad"
  },

  // =========================
  // PSICOMOTRICIDAD
  // =========================
  {
    id: "a29",
    world: "movimiento",
    title: "Arriba y abajo",
    kind: "opcion",
    emoji: "⬆️",
    question:
      "Si Kusi levanta los brazos al cielo, ¿hacia dónde van sus brazos?",
    options: ["Arriba", "Abajo", "Detrás"],
    correct: 0,
    explanation:
      "Si los brazos van al cielo, van hacia arriba. Aprender posiciones también ayuda al movimiento.",
    hint:
      "Piensa en la dirección del techo o del cielo.",
    mascotIntro:
      "Vamos a movernos y aprender posiciones.",
    successTitle: "¡Muy bien orientado!",
    retryTitle: "¡Observemos la dirección!",
    skill: "Orientación espacial"
  },
  {
    id: "a30",
    world: "movimiento",
    title: "Sigue la instrucción",
    kind: "opcion",
    emoji: "👣",
    question:
      "Kusi dice: “Da un paso adelante”. ¿Qué debes hacer?",
    options: ["Moverte hacia adelante", "Sentarte y dormir", "Ir hacia atrás"],
    correct: 0,
    explanation:
      "Dar un paso adelante significa moverse hacia el frente.",
    hint:
      "Piensa en avanzar como cuando caminas hacia un amigo.",
    mascotIntro:
      "Vamos a escuchar y movernos con atención.",
    successTitle: "¡Seguiste la instrucción!",
    retryTitle: "¡Escuchemos y pensemos otra vez!",
    skill: "Seguimiento de instrucciones"
  },
  {
    id: "a31",
    world: "movimiento",
    title: "Equilibrio",
    kind: "opcion",
    emoji: "🦶",
    question:
      "Si quieres mantener el equilibrio como flamenco, ¿qué puedes intentar?",
    options: ["Pararte en un pie con ayuda", "Cerrar los ojos y correr", "Caerte al suelo"],
    correct: 0,
    explanation:
      "Pararte en un pie con ayuda puede trabajar el equilibrio de forma segura.",
    hint:
      "Busca la opción que ayude a tu cuerpo a mantenerse estable.",
    mascotIntro:
      "Vamos a mover el cuerpo con cuidado y equilibrio.",
    successTitle: "¡Buen equilibrio!",
    retryTitle: "¡Pensemos en movernos con seguridad!",
    skill: "Equilibrio"
  },
  {
    id: "a32",
    world: "movimiento",
    title: "Movimiento y ritmo",
    kind: "opcion",
    emoji: "🎵",
    question:
      "Si escuchas una canción alegre, ¿qué podrías hacer para acompañarla?",
    options: ["Moverte o bailar", "Esconderte debajo de la mesa", "Romper el parlante"],
    correct: 0,
    explanation:
      "Moverte o bailar con la música ayuda a coordinar el cuerpo y disfrutar del ritmo.",
    hint:
      "Busca una opción que use tu cuerpo de manera alegre y segura.",
    mascotIntro:
      "Vamos a movernos con música y alegría.",
    successTitle: "¡Te moviste con ritmo!",
    retryTitle: "¡Pensemos en una acción divertida!",
    skill: "Coordinación corporal"
  }
];