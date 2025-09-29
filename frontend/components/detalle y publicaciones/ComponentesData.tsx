
export type ComponenteId =
  // 🔹 MTB
  | 'marcoMtb'
  | 'tenedorMtb'
  | 'bielaMtb'
  | 'pinonMtb'
  | 'desviadortraseroMtb'
  | 'mandodecambio'
  | 'frenosdiscoMtb'
  | 'ruedaMtb'
  | 'amortiguadortraseroMtb'

  // 🔹 Ruta
  | 'marcoRuta'
  | 'tenedorRuta' 
  | 'bielaRuta'
  | 'pinonRuta'
  | 'desviadordelanteroRuta'
  | 'desviadortraseroRuta'
  | 'cambiosRuta'
  | 'frenospinsaRuta'
  | 'ruedaRuta'

  // 🔹 Fixie
  | 'marcoFixie'
  | 'tenedorFixie'
  | 'bielasFixie'
  | 'pinonFixie'
  | 'ruedaFixie'

   // 🔹 componentes en comun 
  | 'cana'
  | 'centro'
  | 'manubrio'
  | 'juegodedireccion'
  | 'sillin'
  | 'poste'
  | 'pedales'
  | 'neumatico'
  | 'cadena' 

interface Componente {
  nombre: string;
  imagen: string; 
  comoColocar: string[];
  herramientas: string[];
  informacion: {
    consiste: string;
    curiosidades: string;
    mantenimiento: string;
  };
}

export const componentesData: Record<ComponenteId, Componente> = {
  // --------------------
  // 🔹 MTB
  // --------------------
  marcoMtb: {
    nombre: "Marco",
    imagen: require( "../../img/MTB/marco.jpg"),
    comoColocar: [
      "Paso 1: Retira componentes del cuadro anterior (ruedas, transmisión, frenos).",
      "Paso 2: Revisa compatibilidad con suspensión y ejes.",
      "Paso 3: Monta juego de dirección y horquilla; luego ancla ruedas y transmisión.",
    ],
    herramientas: ["Llaves Allen", "Extractor de bielas", "Grasa para rodamientos"],
    informacion: {
      consiste:
        "La estructura principal de la bicicleta (triángulo delantero y trasero) diseñada para absorber impactos y soportar geometrías específicas para montaña (ángulos más relajados y mayor distancia entre ejes).",
      curiosidades:
        "Los marcos MTB modernos se fabrican en aluminio, carbono o acero; algunos incorporan anclajes para amortiguador trasero (full-suspension). La geometría puede cambiar radicalmente la sensación de manejo.",
      mantenimiento:
        "Revisar soldaduras y roscas, limpiar después de salidas embarradas y revisar puntos de anclaje de suspensión; aplicar grasa donde lo indique el fabricante.",
    },
  },

  tenedorMtb: {
    nombre: "Horquilla o suspensión",
    imagen: require('../../img/MTB/tenedor.avif'),
    comoColocar: [
      "Paso 1: Instala el tubo de dirección en la caja de dirección del cuadro.",
      "Paso 2: Ajusta rodamientos y aprieta la potencia.",
      "Paso 3: Monta la rueda delantera y comprueba alineación.",
    ],
    herramientas: ["Llaves Allen", "Grasa", "Extractor de dirección"],
    informacion: {
      consiste:
        "Componente que sostiene la rueda delantera; en MTB suele integrar suspensión (horquilla con recorrido) para absorber impactos y mejorar tracción y control.",
      curiosidades:
        "Las horquillas de suspensión tienen ajustes de rebote y compresión; la cantidad de recorrido (mm) indica cuánto movimiento absorbe la rueda delantera.",
      mantenimiento:
        "Limpiar sellos y barras, revisar fugas de aceite y realizar servicio de suspensión según recomendaciones del fabricante.",
    },
  },

  bielaMtb: {
    nombre: "Biela",
    imagen: require('../../img/MTB/biela.webp'),
    comoColocar: [
      "Paso 1: Instala el eje de pedalier compatible en la caja del cuadro.",
      "Paso 2: Monta las bielas y aprieta a torque especificado.",
      "Paso 3: Verifica alineación de platos y cadena.",
    ],
    herramientas: ["Extractor de bielas", "Llaves Allen", "Grasa"],
    informacion: {
      consiste:
        "Brazo que conecta el eje del pedalier con el plato(s); transmite la fuerza del ciclista al sistema de transmisión.",
      curiosidades:
        "Existen bielas monoplato (1x) muy usadas en MTB moderno para simplificar la transmisión y ahorrar peso.",
      mantenimiento:
        "Comprobar apriete, lubricar el eje del pedalier y revisar holguras; cambiar rodamientos si hay juego o ruidos.",
    },
  },

  pinonMtb: {
    nombre: "Pacha",
    imagen: require('../../img/MTB/pinon.jpg'),
    comoColocar: [
      "Paso 1: Monta el cassette o piñón en el núcleo de la rueda trasera.",
      "Paso 2: Usa extractor o llave específica para apretar.",
      "Paso 3: Reinstala la rueda en el cuadro y ajusta la cadena.",
    ],
    herramientas: ["Extractor de cassette", "Llave inglesa"],
    informacion: {
      consiste:
        "Conjunto de coronas (piñones) montadas en el buje trasero que, junto con la cadena y platos, definen las relaciones de marcha.",
      curiosidades:
        "Los cassettes actuales ofrecen rangos muy amplios (p. ej. 11–50) para subir y bajar terreno técnico sin cambiar tanto la cadencia.",
      mantenimiento:
        "Limpiar el cassette con desengrasante, revisar desgaste de dientes y sustituir si hay salto o pérdida de rendimiento.",
    },
  },

  desviadortraseroMtb: {
    nombre: "Desviador trasero",
    imagen: require('../../img/MTB/desviadortrasero.jpg'),
    comoColocar: [
      "Paso 1: Atornilla el desviador a la patilla del cuadro.",
      "Paso 2: Pasa la cadena por las poleas correctamente.",
      "Paso 3: Ajusta topes y tensión de cable o línea hidráulica electrónica.",
    ],
    herramientas: ["Llaves Allen", "Destornillador estrella"],
    informacion: {
      consiste:
        "Mecanismo que mueve la cadena en el cassette para seleccionar diferentes piñones; mantiene tensión con un muelle y poleas guía.",
      curiosidades:
        "Los desviadores modernos tienen tecnología Shadow/Clutch para reducir golpes y caídas de cadena en MTB.",
      mantenimiento:
        "Limpiar poleas, revisar alineación de la patilla y ajustar la tensión de cable; sustituir poleas gastadas.",
    },
  },

  mandodecambio: {
    nombre: "Mando de cambio",
    imagen: require('../../img/MTB/mandodecambio.jpg'),
    comoColocar: [
      "Paso 1: Fija el mando al manubrio con la abrazadera.",
      "Paso 2: Pasa la funda y cable hasta el desviador (o configura electrónicamente).",
      "Paso 3: Ajusta índice y tensión para cambios precisos.",
    ],
    herramientas: ["Llaves Allen", "Cortacables"],
    informacion: {
      consiste:
        "Control montado en el manillar que permite al ciclista cambiar marchas; puede ser mecánico (cable) o electrónico (ACTUADORES).",
      curiosidades:
        "Algunos mandos integran freno y cambio (especial en ruta) mientras que en MTB suelen separarse o ser multifunción.",
      mantenimiento:
        "Comprobar tensión de cable, lubricar funda y actualizar firmware en mandos electrónicos cuando aplique.",
    },
  },

  frenosdiscoMtb: {
    nombre: "Frenos de disco",
    imagen: require('../../img/MTB/frenosdisco.webp'),
    comoColocar: [
      "Paso 1: Atornilla la pinza en el soporte del cuadro/horquilla.",
      "Paso 2: Monta el rotor en la rueda y verifica separación con la pinza.",
      "Paso 3: Si son hidráulicos, purga el circuito si detectas esponjosidad.",
    ],
    herramientas: ["Llaves Allen", "Llave Torx", "Kit de purgado"],
    informacion: {
      consiste:
        "Sistema de frenado que usa un rotor metálico y pinza con pastillas; puede ser mecánico (cable) o hidráulico (líquido).",
      curiosidades:
        "Los discos ofrecen frenado más consistente con barro/agua y permiten diseños de rueda más flexibles que los frenos de llanta.",
      mantenimiento:
        "Cambiar pastillas cuando estén desgastadas, limpiar rotors con desengrasante y purgar frenos hidráulicos según necesidad.",
    },
  },

  ruedaMtb: {
    nombre: "Ruedas",
    imagen: require('../../img/MTB/ruedas.webp'),
    comoColocar: [
      "Paso 1: Instala la rueda en el eje o horquilla.",
      "Paso 2: Asegura cierre rápido o eje pasante.",
      "Paso 3: Comprueba centrado y tensión de radios.",
    ],
    herramientas: ["Llave inglesa", "Tendedor de radios", "Bomba de aire"],
    informacion: {
      consiste:
        "Conjunto de llanta, radios, buje y neumático que transmite tracción y soporta cargas; en MTB se usan llantas más anchas y bujes reforzados.",
      curiosidades:
        "Diámetros comunes: 29\", 27.5\" y 26\"; el tamaño afecta maniobrabilidad y rodamiento sobre obstáculos.",
      mantenimiento:
        "Verificar tensión de radios, centrado de la llanta y estado del buje; desalambrar o truear si es necesario.",
    },
  },

  amortiguadortraseroMtb: {
    nombre: "Amortiguador trasero",
    imagen: require('../../img/MTB/amortiguadortrasero.jpg'),
    comoColocar: [
      "Paso 1: Monta el amortiguador en los anclajes del cuadro.",
      "Paso 2: Aprieta tornillería al torque correcto.",
      "Paso 3: Ajusta presión o precarga según peso y estilo.",
    ],
    herramientas: ["Llaves Allen", "Bomba para suspensión"],
    informacion: {
      consiste:
        "Elemento que controla el movimiento del triángulo trasero en bicicletas full-suspension; puede ser aire o muelle con ajustes de rebote/compresión.",
      curiosidades:
        "La evolución de amortiguadores ha permitido separar ajustes para subida y bajada (lockout) y mejorar eficiencia.",
      mantenimiento:
        "Revisar fugas, cambiar aceite/retén según intervalos del fabricante y comprobar pernos de anclaje.",
    },
  },

  // --------------------
  // 🔹 Ruta
  // --------------------
  marcoRuta: {
    nombre: "Marco",
    imagen: require('../../img/Ruta/marco.jpg'),
    comoColocar: [
      "Paso 1: Retira componentes del cuadro anterior.",
      "Paso 2: Monta horquilla, juego de dirección y transmisión alineada.",
      "Paso 3: Ajusta potencias y manillares para postura aerodinámica.",
    ],
    herramientas: ["Llaves Allen", "Grasa", "Extractor de bielas"],
    informacion: {
      consiste:
        "Cuadro optimizado para eficiencia aerodinámica y peso ligero; geometría pensada para postura inclinada y transmisión eficiente en carretera.",
      curiosidades:
        "Los marcos de ruta de alto rendimiento usan perfiles aerodinámicos y muchas marcas realizan pruebas en túnel de viento.",
      mantenimiento:
        "Revisar integridad del cuadro, puntos de fijación y limpieza frecuente; seguir torque recomendado en tornillería integrada.",
    },
  },

  tenedorRuta: {
    nombre: "Tenedor",
    imagen: require('../../img/Ruta/tenedor.webp'),
    comoColocar: [
      "Paso 1: Inserta tubo de dirección y ajusta juego de dirección.",
      "Paso 2: Monta potencia y manillar de ruta.",
      "Paso 3: Instala la rueda delantera y ajusta alineación.",
    ],
    herramientas: ["Llaves Allen", "Grasa"],
    informacion: {
      consiste:
        "Horquilla rígida (o con poca suspensión en modelos de gravel) que sujeta la rueda delantera y contribuye a la aerodinámica del conjunto.",
      curiosidades:
        "En ruta, muchas horquillas son de carbono para reducir peso y vibraciones.",
      mantenimiento:
        "Comprobar cola de dirección y estado de rodamientos; evitar golpes fuertes que dañen fibra (si es carbono).",
    },
  },

  bielaRuta: {
    nombre: "Biela",
    imagen: require('../../img/Ruta/biela.jpg'),
    comoColocar: [
      "Paso 1: Monta eje de pedalier compatible.",
      "Paso 2: Inserta bielas y aprieta a torque.",
      "Paso 3: Asegura platos y comprueba alineación con desviador.",
    ],
    herramientas: ["Extractor de bielas", "Llaves Allen"],
    informacion: {
      consiste:
        "Biela (y conjunto de platos) diseñada para eficiencia en transferencia de potencia; suele estar optimizada para peso y rigidez en ruta.",
      curiosidades:
        "Bielas compactas (50/34) y estándar (53/39) son elecciones comunes según tipo de recorrido.",
      mantenimiento:
        "Revisar aprietes, limpiar y comprobar desgaste de roldanas y platos.",
    },
  },

  pinonRuta: {
    nombre: "Piñón",
    imagen: require('../../img/Ruta/pinon.jpg'),
    comoColocar: [
      "Paso 1: Montar cassette en el núcleo del buje trasero.",
      "Paso 2: Ajustar con extractor y bloquear correctamente.",
    ],
    herramientas: ["Extractor de cassette", "Llave inglesa"],
    informacion: {
      consiste:
        "Cassette de piñones con relaciones pensadas para mantener cadencia eficiente en asfalto; materiales varían entre acero y aleaciones ligeras.",
      curiosidades:
        "Las relaciones y el número de piñones han evolucionado (11, 12 velocidades) buscando escalonamientos más finos.",
      mantenimiento:
        "Limpiar y desengrasar, comprobar desgaste y sustituir para evitar salto de cadena.",
    },
  },

  desviadordelanteroRuta: {
    nombre: "Desviador delantero",
    imagen: require('../../img/Ruta/desviadordelantero.jpg'),
    comoColocar: [
      "Paso 1: Fija el desviador al tubo del cuadro o al cuello del pedalier.",
      "Paso 2: Ajusta límites superior e inferior y tensiona cable.",
    ],
    herramientas: ["Llaves Allen", "Destornillador"],
    informacion: {
      consiste:
        "Mecanismo que guía la cadena entre los platos delanteros para seleccionar marchas; en ruta permite transiciones suaves entre platos.",
      curiosidades:
        "Algunas bicis modernas optan por configuraciones 1x para eliminar el desviador delantero en ciertos segmentos.",
      mantenimiento:
        "Limpiar bisagras, ajustar topes y tensionar el cable regularmente.",
    },
  },

  desviadortraseroRuta: {
    nombre: "Desviador trasero",
    imagen: require('../../img/Ruta/desviadortrasero.jpg'),
    comoColocar: [
      "Paso 1: Instalar en patilla del cuadro.",
      "Paso 2: Pasa la cadena y ajusta la tensión de cable y límites.",
    ],
    herramientas: ["Llaves Allen", "Destornillador"],
    informacion: {
      consiste:
        "Desviador trasero que mueve la cadena entre los piñones del cassette; en ruta busca precisión y cambios rápidos.",
      curiosidades:
        "Los sistemas electrónicos ofrecen cambios más precisos y requieren menos mantenimiento mecánico.",
      mantenimiento:
        "Limpiar, lubricar poleas y comprobar que la patilla esté recta; ajustar índice de cambios.",
    },
  },

  cambiosRuta: {
    nombre: "Mando de cambios",
    imagen: require('../../img/Ruta/cambios.jpg'),
    comoColocar: [
      "Paso 1: Montar manetas en el manubrio de ruta (integradas con freno si aplica).",
      "Paso 2: Conectar cables/fundas a desviadores.",
    ],
    herramientas: ["Llaves Allen", "Cortacables"],
    informacion: {
      consiste:
        "Manetas que permiten cambiar marchas y, en ruta, suelen integrarse con frenos para control ergonómico.",
      curiosidades:
        "El diseño STI (stops/turns integration) revolucionó el control al juntar freno y cambio en una sola palanca.",
      mantenimiento:
        "Revisar causa/tensión de cables y ajustes; en electrónico, mantener firmware actualizado y baterías cargadas.",
    },
  },

  frenospinsaRuta: {
    nombre: "Frenos de pinza",
    imagen: require('../../img/Ruta/frenospinsa.jpg'),
    comoColocar: [
      "Paso 1: Atornilla las pinzas en los soportes del cuadro u horquilla.",
      "Paso 2: Ajusta la alineación de las zapatas con la llanta y la tensión del cable.",
    ],
    herramientas: ["Llaves Allen", "Destornillador"],
    informacion: {
      consiste:
        "Frenos de llanta tradicionales que aplican zapatas a la superficie de la llanta para detener la bici; ligeros y sencillos.",
      curiosidades:
        "Aunque los frenos de disco ganan terreno, las pinzas siguen siendo populares por su ligereza y simplicidad en competición de ruta.",
      mantenimiento:
        "Sustituir zapatas gastadas, limpiar la llanta y verificar que el cable no esté deshilachado.",
    },
  },

  ruedaRuta: {
    nombre: "Ruedas",
    imagen: require('../../img/Ruta/rueda.webp'),
    comoColocar: [
      "Paso 1: Montar la rueda en la horquilla o cuadro.",
      "Paso 2: Asegurar cierre rápido o eje pasante.",
    ],
    herramientas: ["Llave inglesa", "Bomba de aire"],
    informacion: {
      consiste:
        "Rueda diseñada para velocidad: llantas más estrechas, perfiles aerodinámicos y rodamientos finos para minimizar resistencia.",
      curiosidades:
        "Las ruedas con perfil alto mejoran la aerodinámica pero pueden afectar control con viento lateral.",
      mantenimiento:
        "Comprobar centrado, tensión de radios y estado de los rodamientos; mantener la presión de neumáticos adecuada.",
    },
  },

  // --------------------
  // 🔹 Fixie
  // --------------------
  marcoFixie: {
    nombre: "Marco",
    imagen: require('../../img/Fixie/marco.jpg'),
    comoColocar: [
      "Paso 1: Montar horquilla y juego de dirección.",
      "Paso 2: Instalar transmisión (piñón fijo) y ajustar tensión de cadena.",
    ],
    herramientas: ["Llaves Allen", "Grasa"],
    informacion: {
      consiste:
        "Cuadro de diseño simple y rígido pensado para uso urbano y transmisión directa; geometría pensada para maniobrabilidad en ciudad.",
      curiosidades:
        "Las fixies suelen prescindir de cambio y a veces de frenos delanteros/más habituales, priorizando simplicidad y bajo mantenimiento.",
      mantenimiento:
        "Revisar tensado de cadena, apriete de piñón fijo y estado del cuadro; limpiar con regularidad.",
    },
  },

  tenedorFixie: {
    nombre: "Tenedor",
    imagen: require('../../img/Fixie/tenedor.jpg'),
    comoColocar: [
      "Paso 1: Insertar tubo de dirección y ajustar rodamientos.",
      "Paso 2: Fijar potencia y manillar.",
    ],
    herramientas: ["Llaves Allen", "Grasa"],
    informacion: {
      consiste:
        "Horquilla rígida que sujeta la rueda delantera; en fixie suele ser simple y robusta para uso urbano.",
      curiosidades:
        "Al ser usos urbanos, muchas horquillas fixie priorizan durabilidad sobre lujo (poco peso).",
      mantenimiento:
        "Mantener rodamientos limpios y sin juego; revisar por golpes o dobleces.",
    },
  },

  bielasFixie: {
    nombre: "Bielas",
    imagen: require('../../img/Fixie/bielas.jpg'),
    comoColocar: [
      "Paso 1: Montar eje y colocar bielas en el pedalier.",
      "Paso 2: Fijar plato y comprobar aprietes.",
    ],
    herramientas: ["Extractor de bielas", "Llaves Allen"],
    informacion: {
      consiste:
        "Conjunto de bielas y plato que transmiten la pedaleada a un único piñón fijo; construcción simple y resistente.",
      curiosidades:
        "Las configuraciones varían poco (plato único) lo que facilita mantenimiento y reduce piezas.",
      mantenimiento:
        "Revisar apriete de bielas y desgaste del plato; lubricar el eje si es necesario.",
    },
  },

  pinonFixie: {
    nombre: "Piñón",
    imagen: require('../../img/Fixie/pinon.jpg'),
    comoColocar: [
      "Paso 1: Enroscar el piñón fijo en el buje del buje trasero.",
      "Paso 2: Asegurarlo con herramienta adecuada y contra-tuerca si aplica.",
    ],
    herramientas: ["Llave de piñón", "Herramienta de bloqueo"],
    informacion: {
      consiste:
        "Piñón roscado que no permite libre giro (es fijo); la rueda y la transmisión giran en síncrono con los pedales.",
      curiosidades:
        "En fixie no existe rueda libre: si la rueda gira, los pedales lo hacen también — esto altera técnicas de frenado y control.",
      mantenimiento:
        "Revisar apriete, rosca y estado de dientes; controlar tensión y alineación de cadena.",
    },
  },

  ruedaFixie: {
    nombre: "Ruedas",
    imagen: require('../../img/Fixie/rueda.jpg'),
    comoColocar: [
      "Paso 1: Montar y asegurar rueda en el cuadro.",
      "Paso 2: Ajustar tensión de cadena y alineación.",
    ],
    herramientas: ["Llave inglesa", "Bomba de aire"],
    informacion: {
      consiste:
        "Rueda pensada para uso urbano; bujes simples y llantas resistentes que toleren frenado por retención cuando se practica.",
      curiosidades:
        "Algunos ciclistas usan ruedas con mayor rigidez para transmisión directa y mejor respuesta.",
      mantenimiento:
        "Comprobar centrado, tensión de radios y presión del neumático; revisar buje si hay juegos.",
    },
  },

  

  // --------------------
  // 🔹 Comunes
  // --------------------
  cana: {
    nombre: "Caña (Tija guía del manubrio)",
    imagen: require('../../img/Comun/cana.jpg'),
    comoColocar: [
      "Paso 1: Insertar la caña en la horquilla/steerer tube.",
      "Paso 2: Ajustar altura y apretar la potencia según torque.",
    ],
    herramientas: ["Llaves Allen"],
    informacion: {
      consiste:
        "Tubo que conecta la horquilla con la potencia y el manubrio; puede ser parte del sistema de dirección (steerer) o una pieza de ajuste.",
      curiosidades:
        "En bicicletas modernas las cañas integradas y potencias de una pieza mejoran la estética y rigidez pero limitan ajustes rápidos.",
      mantenimiento:
        "Revisar apriete, corrosión y alineación; evitar apretar en exceso que pueda dañar roscas o carbono.",
    },
  },

  centro: {
    nombre: "Centro (Eje / Buje)",
    imagen: require('../../img/Comun/centro.jpg'),
    comoColocar: [
      "Paso 1: Insertar buje en la llanta y centrar radios.",
      "Paso 2: Ajustar rodamientos y verificar libre giro.",
    ],
    herramientas: ["Extractor de centro", "Llaves de cono", "Tendedor de radios"],
    informacion: {
      consiste:
        "Buje es el eje central de la rueda que aloja rodamientos y permite que la llanta gire; en freno de piñón o cassette se monta el sistema de transmisión.",
      curiosidades:
        "Los bujes modernos incorporan rodamientos sellados para menor mantenimiento y mayor durabilidad.",
      mantenimiento:
        "Servir y limpiar rodamientos, engrasar o sustituir sellos y comprobar juego axial/ radial periódicamente.",
    },
  },

  manubrio: {
    nombre: "Manubrio",
    imagen: require('../../img/Comun/manubrio.png'),
    comoColocar: [
      "Paso 1: Colocar en la potencia y fijar a torque.",
      "Paso 2: Ajustar ángulo e instalar controles (frenos, mandos).",
    ],
    herramientas: ["Llaves Allen"],
    informacion: {
      consiste:
        "Barra que permite dirigir la bicicleta y alojar controles (freno, cambio, luces); viene en distintos anchos y formas según disciplina.",
      curiosidades:
        "Los manubrios anchos ofrecen mayor control en MTB; en ruta se usan manubrios curvos para posiciones aerodinámicas.",
      mantenimiento:
        "Revisar apriete de la potencia, integridad (grietas en carbono) y estado de cinta/punos.",
    },
  },

  juegodedireccion: {
    nombre: "Juego de dirección",
    imagen: require('../../img/Comun/juegodedireccion.jpg'),
    comoColocar: [
      "Paso 1: Insertar rodamientos en la caja de dirección.",
      "Paso 2: Ajustar tapa superior y comprobar ausencia de juego.",
    ],
    herramientas: ["Extractor de dirección", "Grasa"],
    informacion: {
      consiste:
        "Conjunto de rodamientos que permite girar la horquilla suavemente dentro del tubo de dirección del cuadro.",
      curiosidades:
        "Los sistemas integrados ocultan los rodamientos para estética y aerodinámica, pero pueden ser más difíciles de ajustar.",
      mantenimiento:
        "Limpiar, engrasar rodamientos y ajustar precarga para evitar juego o rozamiento.",
    },
  },

  sillin: {
    nombre: "Sillín",
    imagen: require('../../img/Comun/sillin.jpg'),
    comoColocar: [
      "Paso 1: Insertar en la abrazadera del poste y ajustar altura e inclinación.",
      "Paso 2: Apriete final a torque recomendado.",
    ],
    herramientas: ["Llave Allen"],
    informacion: {
      consiste:
        "Asiento del ciclista; hay variedad en forma, relleno y propósito (ruta, MTB, confort) para adaptarse a la anatomía y la disciplina.",
      curiosidades:
        "Elegir sillín correcto depende de la separación de isquiones y estilo de pedaleo; un sillín mal ajustado causa molestias.",
      mantenimiento:
        "Revisar railes, abrazadera y desgaste de la cubierta; reemplazar cuando se deforme o rompa el relleno.",
    },
  },

  poste: {
    nombre: "Poste de sillín",
    imagen: require('../../img/Comun/poste.jpg'),
    comoColocar: [
      "Paso 1: Insertar poste en el tubo del sillín y fijar con abrazadera.",
      "Paso 2: Ajustar altura y apretar a torque.",
    ],
    herramientas: ["Llaves Allen", "Grasa"],
    informacion: {
      consiste:
        "Tubo que conecta el sillín al cuadro y permite ajustar la altura; hay postes rígidos, con suspensión y materiales variados.",
      curiosidades:
        "Postes telescópicos (dropper) permiten bajar el sillín en descenso sin desmontar herramientas, muy usados en MTB.",
      mantenimiento:
        "Limpiar y engrasar la zona de inserción (si aplica), y revisar mecanismos telescópicos por suciedad y desgaste.",
    },
  },

  pedales: {
    nombre: "Pedales",
    imagen: require ('../../img/Comun/pedales.jpg'),
    comoColocar: [
      "Paso 1: Enroscar pedales en las bielas (derecho e izquierdo con sentido correcto).",
      "Paso 2: Aprietar a torque y comprobar giro suave.",
    ],
    herramientas: ["Llave de pedales", "Grasa"],
    informacion: {
      consiste:
        "Interfaz donde el pie aplica fuerza; hay pedales planos y automáticos (clipless) que enganchan a zapatillas específicas.",
      curiosidades:
        "Los pedales clipless aumentan eficiencia y control; existen múltiples standards (SPD, Look, etc.).",
      mantenimiento:
        "Lubricar roscas antes de montaje, revisar rodamientos y limpiar conexiones mecánicas o de cala.",
    },
  },

  neumatico: {
    nombre: "Neumático",
    imagen: require('../../img/Comun/neumatico.jpg'),
    comoColocar: [
      "Paso 1: Montar neumático en la llanta con desmontadores.",
      "Paso 2: Asegurar cámara o usar tubeless y sellar correctamente.",
      "Paso 3: Inflar a la presión recomendada.",
    ],
    herramientas: ["Desmontadores", "Bomba de aire", "Sellador (si tubeless)"],
    informacion: {
      consiste:
        "Elemento que hace contacto con el suelo; su compuesto, dibujo y ancho determinan tracción, confort y resistencia a pinchazos.",
      curiosidades:
        "En MTB se usan neumáticos anchos y con tacos; en ruta, neumáticos estrechos y de alta presión para menor resistencia rodante.",
      mantenimiento:
        "Revisar presión antes de cada salida, comprobar cortes o desgaste y, en tubeless, mantener nivel de sellador.",
    },
  },

  cadena: {
    nombre: "Cadena",
    imagen: require('../../img/Comun/cadena.png'),
    
    comoColocar: [
      "Paso 1: Pasar la cadena por platos, desviadores y piñones siguiendo el recorrido correcto.",
      "Paso 2: Unir eslabones con pin o cierre rápido y ajustar tensión.",
    ],
    herramientas: ["Tronchacadenas", "Lubricante"],
    informacion: {
      consiste:
        "Elemento metálico compuesto por eslabones que transmite la potencia desde las bielas al cassette/plato; su desgaste afecta la transmisión.",
      curiosidades:
        "Una cadena desgastada acelera el desgaste de platos y piñones; medir la elongación periódicamente evita reemplazos mayores.",
      mantenimiento:
        "Limpiar y lubricar regularmente, comprobar la elongación con una herramienta medidora y sustituir cuando supere el desgaste recomendado.",
    },
  },
};
