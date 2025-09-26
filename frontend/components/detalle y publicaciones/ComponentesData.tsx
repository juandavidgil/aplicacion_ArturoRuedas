export const componentesData = {
  // 🔹 MTB
  marcoMtb: {
    nombre: "Marco MTB",
    imagen: require('../../iconos/mtb_marco.jpeg'),
    comoColocar: [
      "Paso 1: Desmonta todos los componentes del marco viejo.",
      "Paso 2: Limpia y prepara el nuevo marco, revisando compatibilidad con suspensión, ruedas y frenos de disco.",
      "Paso 3: Instala dirección, suspensión delantera y potencia.",
      "Paso 4: Monta transmisión, frenos hidráulicos y ruedas.",
      "Paso 5: Ajusta todo y verifica que no haya holguras.",
    ],
    herramientas: ["Llaves Allen", "Extractor de bielas", "Grasa para rodamientos"],
    informacion: {
      utilidad: "El marco MTB está diseñado para resistir impactos y terrenos irregulares.",
      mantenimiento: "Revisar fisuras tras caídas y mantenerlo limpio para detectar desgaste.",
    },
  },

  ruedasMtb: {
    nombre: "Ruedas MTB",
    imagen: require('../../img/rueda.webp'),
    comoColocar: [
      "Paso 1: Suelta el freno de disco o ejes pasantes.",
      "Paso 2: Retira la rueda y coloca la nueva alineándola en el cuadro.",
      "Paso 3: Ajusta el eje pasante o cierre rápido.",
      "Paso 4: Verifica que el rotor de disco no roce con la pinza.",
    ],
    herramientas: ["Llave inglesa", "Desmontadores de neumáticos", "Bomba de aire"],
    informacion: {
      utilidad: "Proporcionan tracción en terrenos irregulares.",
      mantenimiento: "Revisar presión, desgaste de llantas y estado de rodamientos.",
    },
  },
  manubrioMtb: {
    nombre: "Manubrio MTB",
    imagen: require('../../img/manub.webp'),
    comoColocar: [
      "Paso 1: Afloja los tornillos de la potencia.",
      "Paso 2: Coloca el nuevo manubrio ancho para mejor control.",
      "Paso 3: Ajusta la inclinación y aprieta tornillos en cruz.",
    ],
    herramientas: ["Llaves Allen (4-5 mm)", "Grasa ligera"],
    informacion: {
      utilidad: "Da control y estabilidad en bajadas y terrenos técnicos.",
      mantenimiento: "Revisar que no tenga grietas ni esté flojo.",
    },
  },
  suspensionMtb: {
    nombre: "Suspensión MTB",
    imagen: require('../../img/suspe.webp'),
    comoColocar: [
      "Paso 1: Retira la horquilla vieja aflojando la potencia.",
      "Paso 2: Lubrica rodamientos de dirección.",
      "Paso 3: Coloca la suspensión nueva y ajusta espaciadores.",
      "Paso 4: Monta la rueda delantera y alinea.",
    ],
    herramientas: ["Llaves Allen", "Grasa", "Trapo"],
    informacion: {
      utilidad: "Absorbe impactos en descensos y terrenos difíciles.",
      mantenimiento: "Lubricar, limpiar y hacer mantenimiento de aceite en taller.",
    },
  },
  pedalMtb: {
    nombre: "Pedales MTB",
    imagen: require('../../img/pedal.jpg'),
    comoColocar: [
      "Paso 1: Retira los pedales viejos con llave de 15 mm.",
      "Paso 2: Coloca grasa en las roscas.",
      "Paso 3: Enrosca pedal derecho en sentido horario, izquierdo antihorario.",
    ],
    herramientas: ["Llave de pedal", "Grasa"],
    informacion: {
      utilidad: "Permiten mejor agarre y eficiencia en subidas.",
      mantenimiento: "Lubricar y revisar rodamientos internos.",
    },
  },

  pachaMtb: {
    nombre: "Pacha MTB",
    imagen: require('../../iconos/mtb_piñon.jpeg'),
    comoColocar: [
      "Paso 1: Quita la rueda trasera de la bicicleta.",
      "Paso 2: Usa una llave de cadena y una llave para bloqueo de cassette (o extractor de cassette) para aflojar y retirar la pacha/cassette antiguo.",
      "Paso 3: Limpia el núcleo del buje (freehub) y revisa el estado del anclaje.",
      "Paso 4: Coloca el nuevo cassette alineando las estrías con el freehub y enrosca el anillo de bloqueo.",
      "Paso 5: Aprieta al par recomendado (si tienes llave dinamométrica) y monta la rueda trasera en el cuadro.",
    ],
    herramientas: [
      "Extractor de cassette / llave para bloqueo de cassette",
      "Llave de cadena (chain whip)",
      "Llave dinamométrica (recomendada)",
      "Guantes y trapo",
    ],
    informacion: {
      utilidad: "Conjunto de piñones que determina el rango de desarrollos en MTB; los cassettes MTB suelen tener relaciones más amplias para subir y bajar terreno técnico.",
      mantenimiento: "Limpiar y desengrasar periódicamente; revisar dientes por desgaste y reemplazar si la cadena salta. Controlar torque del anillo de bloqueo.",
    },
  },

  sillinMtb: {
    nombre: "Sillín MTB",
    imagen: require('../../iconos/mtb_sillin.jpeg'),
    comoColocar: [
      "Paso 1: Afloja la abrazadera de la tija del sillín (seatpost clamp).",
      "Paso 2: Coloca la tija a la altura aproximada y ajusta el retroceso del sillín (fore/aft) según tu posición.",
      "Paso 3: Alinea el sillín con el eje de la bicicleta y aprieta la abrazadera al par recomendado.",
      "Paso 4: Si la tija es telescópica (dropper), instala y conecta el mando/cable o manguera según el fabricante y verifica funcionalidad.",
      "Paso 5: Haz una prueba de rodado y ajusta altura/ángulo si es necesario.",
    ],
    herramientas: [
      "Llaves Allen (para abrazadera y railes)",
      "Grasa o pasta anti-apriete (si la tija es de carbono)",
      "Cinta métrica o referencia de altura",
    ],
    informacion: {
      utilidad: "Soporta al ciclista y ayuda en el control de la bici; en MTB los sillines suelen permitir mayor movilidad y las tijas telescópicas permiten bajar la altura del sillín en descensos.",
      mantenimiento: "Revisar raíles y abrazadera, limpiar la tija y comprobar que el mecanismo dropper no presente juego ni fugas.",
    },
  },

  frenosMtb: {
    nombre: "Frenos MTB",
    imagen: require('../../iconos/mtb_frenos.jpeg'),
    comoColocar: [
      "Paso 1: Monta los rotores (si aplica) en las llantas verificando el sentido y el apriete correcto.",
      "Paso 2: Fija las pinzas/calipers al cuadro y horquilla en sus puntos de anclaje.",
      "Paso 3: Centra la pinza respecto al rotor (afloja, oprime la palanca y aprieta los tornillos) o ajusta el cable en frenos mecánicos.",
      "Paso 4: Si son hidráulicos, comprueba que no haya fugas y, de ser necesario, realiza sangrado siguiendo las instrucciones del fabricante.",
      "Paso 5: Revisa recorrido de la palanca, desgaste de pastillas y realiza rodado de prueba.",
    ],
    herramientas: [
      "Llaves Allen / Torx (según tornillería)",
      "Llave dinamométrica (recomendada)",
      "Kit de sangrado (para hidráulicos)",
      "Limpiador de frenos (isopropanol) y trapo",
    ],
    informacion: {
      utilidad: "En MTB lo habitual son frenos de disco (mecánicos o hidráulicos) por su potencia y control en barro/humedad; proporcionan modulación y frenada consistente en terrenos técnicos.",
      mantenimiento: "Inspeccionar pastillas y rotores, limpiar residuos de aceite, centrar pinzas y sangrar frenos hidráulicos periódicamente; sustituir piezas desgastadas.",
    },
  },

  cadenaMtb: {
    nombre: "Cadena MTB",
    imagen: require('../../iconos/mtb_cadena.png'),
    comoColocar: [
      "Paso 1: Coloca la bicicleta en caballete o voltéala para trabajar cómodo.",
      "Paso 2: Selecciona una cadena compatible con el número de velocidades del grupo (anchura correcta).",
      "Paso 3: Mide la longitud adecuada (método big-big + 2 enlaces o según fabricante) y corta con corta-cadenas.",
      "Paso 4: Une la cadena con eslabón maestro o remache según tipo y verifica funcionamiento pasando cambios y girando pedales.",
      "Paso 5: Ajusta tensión si es necesario y aplica lubricante específico para cadenas de MTB.",
    ],
    herramientas: [
      "Corta cadenas / herramienta de remache",
      "Eslabón maestro (opcional)",
      "Guantes y trapo",
      "Lubricante para cadenas",
    ],
    informacion: {
      utilidad: "Transfiere la potencia del pedaleo al cassette; en MTB debe soportar cargas laterales y suciedad, por eso es importante elegir cadena compatible con el número de velocidades.",
      mantenimiento: "Limpiar y lubricar con regularidad; medir elongación y reemplazar antes de que desgaste cassette y platos.",
    },
  },

  platoMtb: {
    nombre: "Plato MTB",
    imagen: require('../../iconos/mtb_plato.png'),
    comoColocar: [
      "Paso 1: Si es necesario, retira la cadena y/o desmonta la biela para acceder al plato.",
      "Paso 2: Afloja los tornillos del plato o extrae la corona según el sistema (bolts o direct mount).",
      "Paso 3: Coloca el nuevo plato respetando orientación y alineación (BCD o montaje directo).",
      "Paso 4: Aprieta tornillos al par recomendado y vuelve a montar biela/cadena.",
      "Paso 5: Comprueba que el desviador (si existe) y la línea de cadena están correctamente ajustados.",
    ],
    herramientas: [
      "Llaves Allen (tornillos de plato)",
      "Extractor de bielas (si aplica)",
      "Llave dinamométrica (recomendada)",
    ],
    informacion: {
      utilidad: "Determina la relación de transmisión; en MTB hoy es muy común el sistema monoplato (1x) por simplicidad y menor riesgo de caída de cadena en terreno técnico.",
      mantenimiento: "Revisar desgaste de dientes y ajustar desviador/guía; limpiar restos de barro y grasa para prolongar vida útil.",
    },
  },


  // 🔹 Ruta
  marcoRuta: {
    nombre: "Marco Ruta",
    imagen: require('../../iconos/ruta_marco.png'),
    comoColocar: [
      "Paso 1: Desmonta componentes del marco viejo.",
      "Paso 2: Instala horquilla rígida y dirección ligera.",
      "Paso 3: Monta transmisión de carretera, frenos y ruedas delgadas.",
    ],
    herramientas: ["Llaves Allen", "Grasa", "Extractor de dirección"],
    informacion: {
      utilidad: "Ligero y aerodinámico, pensado para velocidad.",
      mantenimiento: "Revisar ante grietas por fatiga del material.",
    },
  },
  ruedasRuta: {
    nombre: "Ruedas Ruta",
     imagen: require("../../iconos/ruta_ruedas.jpeg"),
    comoColocar: [
      "Paso 1: Suelta frenos caliper o disco.",
      "Paso 2: Retira la rueda y coloca la nueva con cierre rápido.",
      "Paso 3: Ajusta y verifica alineación.",
    ],
    herramientas: ["Llave inglesa", "Bomba de aire"],
    informacion: {
      utilidad: "Minimizan la fricción y mejoran la velocidad en asfalto.",
      mantenimiento: "Mantener alta presión y revisar fisuras.",
    },
  },
  manubrioRuta: {
    nombre: "Manubrio Ruta",
     imagen: require("../../iconos/ruta_manubrio.jpeg"),
    comoColocar: [
      "Paso 1: Afloja potencia y retira manubrio antiguo.",
      "Paso 2: Coloca drop bar y ajusta inclinación.",
      "Paso 3: Aprieta tornillos en cruz.",
    ],
    herramientas: ["Llaves Allen", "Cinta de manubrio"],
    informacion: {
      utilidad: "Permite posiciones aerodinámicas y de resistencia.",
      mantenimiento: "Revisar cinta y que no tenga grietas.",
    },
  },
  // horquillaRuta: {
  //   nombre: "Horquilla Ruta",
  //   comoColocar: [
  //     "Paso 1: Desmonta la horquilla vieja.",
  //     "Paso 2: Limpia zona de dirección e instala nueva horquilla rígida.",
  //     "Paso 3: Ajusta espaciadores y aprieta tornillos de la potencia.",
  //   ],
  //   herramientas: ["Llaves Allen", "Grasa"],
  //   informacion: {
  //     utilidad: "Ligera y rígida para precisión en carretera.",
  //     mantenimiento: "Revisar rodamientos de dirección.",
  //   },
  // },

  pedalRuta: {
    nombre: "Pedales Ruta",
    imagen: require("../../iconos/ruta_pedal.jpeg"),
    comoColocar: [
      "Paso 1: Retira los pedales viejos.",
      "Paso 2: Instala pedales automáticos según lado.",
      "Paso 3: Ajusta tensión de enganche si aplica.",
    ],
    herramientas: ["Llave de pedal", "Grasa"],
    informacion: {
      utilidad: "Mejoran eficiencia del pedaleo al estar sujetos a las zapatillas.",
      mantenimiento: "Lubricar el sistema de clip y revisar desgaste.",
    },
  },

  pinonesRuta: {
    nombre: "Piñones Ruta",
    imagen: require('../../iconos/ruta_piñon.png'),
    comoColocar: [
      "Paso 1: Retira la rueda trasera.",
      "Paso 2: Usa extractor de cassette y llave de cadena para aflojar el anillo de bloqueo.",
      "Paso 3: Sustituye el cassette por uno compatible (mismo nº de velocidades) alineando las estrías.",
      "Paso 4: Aprieta al par recomendado y vuelve a montar la rueda.",
      "Paso 5: Ajusta el desviador trasero si hace falta para un cambio suave.",
    ],
    herramientas: [
      "Extractor de cassette / llave para bloqueo",
      "Llave de cadena (chain whip)",
      "Llave dinamométrica (opcional)",
    ],
    informacion: {
      utilidad: "Los piñones de ruta suelen tener desarrollos más cerrados (pasos finos) para mantener cadencia eficiente en asfalto.",
      mantenimiento: "Limpiar con desengrasante, revisar desgaste de dientes y sustituir cuando la cadena salte o esté muy gastada.",
    },
  },

  cadenaRuta: {
    nombre: "Cadena Ruta",
    imagen: require('../../iconos/ruta_cadena.png'),
    comoColocar: [
      "Paso 1: Verifica el número de velocidades del grupo y compra cadena compatible (anchura correcta).",
      "Paso 2: Mide longitud adecuada (según método recomendado) y corta con corta-cadenas.",
      "Paso 3: Une con eslabón maestro o remache según tipo y comprueba el cambio pasando marchas.",
      "Paso 4: Aplica lubricante específico para cadenas de carretera y retira exceso.",
    ],
    herramientas: [
      "Corta cadenas",
      "Eslabón maestro (opcional)",
      "Lubricante para cadena",
    ],
    informacion: {
      utilidad: "Cadena más estrecha para transmisiones de mayor número de velocidades; optimiza eficiencia en ruta.",
      mantenimiento: "Mantener limpia y lubricada; medir elongación y cambiar antes de que dañe cassette y platos.",
    },
  },

  platoRuta: {
    nombre: "Plato Ruta",
    imagen: require('../../iconos/ruta_plato.jpeg'),
    comoColocar: [
      "Paso 1: Retira la cadena o posiciona la transmisión en plato pequeño para liberar tornillos.",
      "Paso 2: Afloja los tornillos del plato (o desmonta el conjunto de platos/bielas si hace falta).",
      "Paso 3: Monta el plato nuevo asegurando correcta orientación y BCD si aplica.",
      "Paso 4: Aprieta a los pares recomendados y vuelve a montar la transmisión.",
      "Paso 5: Ajusta desviador delantero si se necesita para evitar caídas de cadena.",
    ],
    herramientas: [
      "Llaves Allen",
      "Extractor de bielas (si es necesario)",
      "Llave dinamométrica (recomendada)",
    ],
    informacion: {
      utilidad: "En ruta es común el doble plato (compact o estándar) para cubrir rangos de velocidad con cadencia eficiente.",
      mantenimiento: "Limpiar, revisar dientes y reemplazar si muestra desgaste o deformación.",
    },
  },

  sillinRuta: {
    nombre: "Sillín_Ruta",
    imagen: require('../../iconos/ruta_sillin.png'),
    comoColocar: [
      "Paso 1: Afloja la abrazadera de la tija y coloca la altura aproximada según tu medida de entrepierna.",
      "Paso 2: Ajusta el ángulo (ligeramente hacia abajo si prefieres aerodinámica) y el retroceso del sillín.",
      "Paso 3: Aprieta la abrazadera al par correcto y verifica que no exista juego.",
      "Paso 4: Realiza prueba de pedaleo y ajusta posición fina para comodidad y eficiencia.",
    ],
    herramientas: [
      "Llaves Allen",
      "Cinta métrica o guía de ajuste",
    ],
    informacion: {
      utilidad: "Sillines de ruta suelen ser más estrechos y firmes para reducir rozaduras y favorecer eficiencia en salidas largas.",
      mantenimiento: "Revisar raíles y fijaciones, cambiar si hay deformación o pérdida de confort excesiva.",
    },
  },

  frenosRuta: {
    nombre: "Frenos Ruta",
    imagen: require('../../img/frenos.webp'),
    comoColocar: [
      "Paso 1: Si son frenos de llanta (caliper), monta la pinza en la horquilla y el tirante trasero, centrándola sobre la llanta.",
      "Paso 2: Si son discos, instala rotores y pinzas como en frenos MTB (ajuste y sangrado si hidráulicos).",
      "Paso 3: Ajusta la tensión del cable (mecánicos) o revisa sistema hidráulico y palancas.",
      "Paso 4: Comprueba que las pastillas no rozan y que la respuesta sea progresiva.",
    ],
    herramientas: [
      "Llaves Allen / Torx",
      "Kit de sangrado (si hidráulicos)",
      "Limpieza de frenos (isopropanol)",
    ],
    informacion: {
      utilidad: "En ruta tradicionalmente se usaban frenos de llanta (caliper) por aerodinámica; hoy día los discos de carretera ofrecen mejor rendimiento en mojado y mayor consistencia.",
      mantenimiento: "Revisar pastillas y discos/rasgadas de llanta, ajustar y sangrar cuando sea necesario.",
    },
  },


  // 🔹 Fixie
  marcoFixie: {
    nombre: "Marco Fixie",
    imagen: require('../../iconos/fixie_marco.png'),
    comoColocar: [
      "Paso 1: Desmonta el cuadro viejo.",
      "Paso 2: Prepara nuevo marco verificando compatibilidad con piñón fijo.",
      "Paso 3: Instala horquilla, potencia y transmisión sencilla.",
    ],
    herramientas: ["Llaves Allen", "Grasa"],
    informacion: {
      utilidad: "Simple, rígido y ligero, diseñado para ciudad.",
      mantenimiento: "Limpieza y revisión de fisuras.",
    },
  },
  ruedasFixie: {
    nombre: "Ruedas Fixie",
    imagen: require("../../iconos/fixie_rueda.jpeg"),
    comoColocar: [
      "Paso 1: Afloja tuercas del eje.",
      "Paso 2: Retira la rueda vieja y coloca la nueva.",
      "Paso 3: Ajusta alineación y tensión de la cadena.",
    ],
    herramientas: ["Llave inglesa", "Bomba de aire"],
    informacion: {
      utilidad: "Diseñadas para uso urbano y resistencia.",
      mantenimiento: "Revisar tensión de radios y presión.",
    },
  },
   ruedas: {
    nombre: "Ruedas Fixie",
    imagen: require("../../iconos/fixie_rueda.jpeg"),
    comoColocar: [
      "Paso 1: Afloja tuercas del eje.",
      "Paso 2: Retira la rueda vieja y coloca la nueva.",
      "Paso 3: Ajusta alineación y tensión de la cadena.",
    ],
    herramientas: ["Llave inglesa", "Bomba de aire"],
    informacion: {
      utilidad: "Diseñadas para uso urbano y resistencia.",
      mantenimiento: "Revisar tensión de radios y presión.",
    },
  },
  manubrioFixie: {
    nombre: "Manubrio Fixie",
    imagen: require("../../iconos/fixie_manubrio.png"),
    comoColocar: [
      "Paso 1: Afloja potencia.",
      "Paso 2: Coloca nuevo manubrio (flat o bullhorn).",
      "Paso 3: Aprieta tornillos y ajusta posición.",
    ],
    herramientas: ["Llaves Allen"],
    informacion: {
      utilidad: "Varía entre control o velocidad según estilo.",
      mantenimiento: "Revisar apriete y estado de puños.",
    },
  },
  piñonFixie: {
    nombre: "Piñón Fijo",
    imagen: require("../../iconos/fixie_piñon.png"),
    comoColocar: [
      "Paso 1: Retira rueda trasera.",
      "Paso 2: Desmonta piñón viejo y coloca el nuevo enroscado.",
      "Paso 3: Ajusta tensión de cadena.",
    ],
    herramientas: ["Llave inglesa", "Extractor de piñón"],
    informacion: {
      utilidad: "Transmite fuerza sin rueda libre.",
      mantenimiento: "Revisar apriete y lubricar.",
    },
  },
  pedalFixie: {
    nombre: "Pedales Fixie",
    imagen: require("../../img/fixie_pedal.webp"),
    comoColocar: [
      "Paso 1: Retira pedales viejos.",
      "Paso 2: Coloca nuevos pedales (planos o con straps).",
      "Paso 3: Ajusta tensión de cadena si aplica.",
    ],
    herramientas: ["Llave de pedal", "Grasa"],
    informacion: {
      utilidad: "Ofrecen simplicidad o agarre con correas.",
      mantenimiento: "Revisar rodamientos y correas.",
    },
  },

  cadenaFixie: {
    nombre: "Cadena Fixie",
    imagen: require('../../iconos/fixie_cadena.jpeg'),
    comoColocar: [
      "Paso 1: Determina si tu fixie usa cadena 1/8\" (track) o 3/32\" (más común en conversiones).",
      "Paso 2: Mide la longitud adecuada (mueve la rueda trasera para lograr la tensión correcta si el cuadro tiene dropouts horizontales).",
      "Paso 3: Corta la cadena a medida y une con eslabón maestro o remache según tipo.",
      "Paso 4: Ajusta la rueda trasera para lograr 8–12 mm de juego vertical en la mitad del recorrido y aprieta las tuercas del eje.",
    ],
    herramientas: [
      "Corta cadenas",
      "Eslabón maestro (opcional)",
      "Llave inglesa para las tuercas del eje",
    ],
    informacion: {
      utilidad: "Cadena de una sola velocidad, generalmente más ancha y robusta (1/8\") para soportar esfuerzos constantes; en fixies la tensión correcta es crítica para evitar saltos.",
      mantenimiento: "Limpiar y lubricar; comprobar tensión con frecuencia y revisar desgaste para evitar roturas.",
    },
  },

  platoFixie: {
    nombre: "Plato Fixie (Chainring)",
    imagen: require('../../iconos/fixie_plato.jpeg'),
    comoColocar: [
      "Paso 1: Afloja los tornillos de la biela o corona y retira la corona vieja si aplica.",
      "Paso 2: Coloca el nuevo plato asegurándote de que las estrías/BCD coincidan y la orientación sea correcta.",
      "Paso 3: Aprieta los tornillos al par recomendado y coloca la cadena comprobando alineación con el piñón fijo.",
      "Paso 4: Ajusta la posición de la rueda trasera para que la cadena quede tensa y recta.",
    ],
    herramientas: [
      "Llaves Allen para tornillos de plato",
      "Extractor de bielas (si aplica)",
      "Llave dinamométrica (recomendada)",
    ],
    informacion: {
      utilidad: "El plato en fixie transmite directamente la fuerza al piñón fijo; normalmente es simple y muy robusto para uso urbano y altas solicitaciones.",
      mantenimiento: "Revisar dientes por desgaste y mantener buena alineación (línea de cadena).",
    },
  },

  sillinFixie: {
    nombre: "Sillín Fixie",
    imagen: require('../../iconos/fixie_sillin.png'),
    comoColocar: [
      "Paso 1: Afloja la abrazadera de la tija y coloca la altura deseada.",
      "Paso 2: Ajusta el ángulo y el retroceso para comodidad en ciudad.",
      "Paso 3: Aprieta la abrazadera al par correcto y verifica estabilidad.",
      "Paso 4: Prueba en ruta urbana y ajusta si hay molestias.",
    ],
    herramientas: [
      "Llaves Allen",
      "Cinta métrica o guía de ajuste",
    ],
    informacion: {
      utilidad: "Sillines para fixie suelen priorizar confort urbano y eficiencia; la elección depende de la ergonomía y el uso (trayectos cortos vs largos).",
      mantenimiento: "Revisar fijaciones y raíles; sustituir si hay deformación o rotura.",
    },
  },

  tenedorFixie: {
    nombre: "Tenedor (Horquilla) Fixie",
    imagen: require('../../img/tenedor.webp'),
    comoColocar: [
      "Paso 1: Retira la rueda delantera y afloja la potencia para liberar la horquilla antigua si la hay.",
      "Paso 2: Inserta la horquilla nueva en la dirección (asegurando rodamientos y espaciadores correctos).",
      "Paso 3: Ajusta la tapa de dirección y aprieta la potencia a su par, asegurando alineación con la rueda.",
      "Paso 4: Monta la rueda delantera y ajusta tuercas o cierre rápido; verifica que gire libremente sin juego.",
    ],
    herramientas: [
      "Llaves Allen",
      "Extractor de dirección (si es necesario)",
      "Grasa para rodamientos",
    ],
    informacion: {
      utilidad: "La horquilla en fixie suele ser rígida y simple para uso urbano; debe ser ligera y compatible con el eje delantero seleccionado.",
      mantenimiento: "Comprobar rodamientos de dirección, mantener limpia y verificar que no haya juego en la dirección.",
    },
  },

};
