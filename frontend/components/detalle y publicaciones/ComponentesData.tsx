export const componentesData = {

  //los de mtb
  ruedas: {
    nombre: "Ruedas",
    imagen: require('../../img/rueda.webp'),
    comoColocar: [
    "Paso 1: Si tu bicicleta tiene frenos de llanta o de disco, suéltalos o desactiva el sistema según corresponda.",
    "Paso 2: Retira la rueda antigua aflojando las tuercas con una llave inglesa o liberando el cierre rápido.",
    "Paso 3: Coloca la nueva rueda alineándola correctamente con la horquilla (delantera) o el cuadro (trasera).",
    "Paso 4: Ajusta y aprieta bien las tuercas o activa el cierre rápido asegurándote de que quede firme.",
    "Paso 5: Verifica que la rueda gire libremente sin rozar y que esté centrada correctamente.",
    ],
    informacion: {
      utilidad: "Las ruedas permiten el desplazamiento de la bicicleta y soportan el peso del ciclista. Son esenciales para la estabilidad y la eficiencia del pedaleo.",
    mantenimiento: "Revisa la presión de las llantas regularmente. Limpia los radios, el aro y verifica que no haya deformaciones. También es importante revisar los rodamientos del eje.",
    },

      herramientas: [
      "Llave inglesa o llave de cubo",
    "Desmontadores de neumáticos",
    "Bomba de aire o inflador",
    ],
  },

  manubrio: {
    nombre: "manubrio",
    imagen: require('../../img/manub.webp'),
    comoColocar: [
      "Paso 1: Afloja y retira los tornillos de la potencia que sujetan el manubrio antiguo.",
    "Paso 2: Limpia el área de montaje para eliminar suciedad o grasa vieja.",
    "Paso 3: Coloca el nuevo manubrio asegurándote de que esté centrado respecto a la potencia.",
    "Paso 4: Aprieta los tornillos en forma de 'X' (diagonalmente) para distribuir la presión de manera uniforme.",
    "Paso 5: Verifica que el manubrio esté bien alineado con la rueda delantera y correctamente apretado. Si es necesario, ajusta nuevamente.",

    ],

    herramientas: [
      "Llaves Allen (generalmente 4 mm o 5 mm)",
    "Nivel o referencia visual para centrar",
    "Grasa (opcional para tornillos)",
    ],

    informacion: {
       utilidad: "El manubrio es fundamental para el control y la dirección de la bicicleta. Un buen manubrio mejora la maniobrabilidad, el confort y la seguridad.",
    mantenimiento: "No requiere mantenimiento frecuente, pero debe revisarse periódicamente para asegurar que esté firme, sin grietas ni desgastes en los puntos de sujeción.",
    },

  },

  suspension: {
    nombre: "suspension",
    imagen: require('../../img/suspe.webp'),
    comoColocar: [
      "Paso 1: Retira la rueda delantera y afloja los tornillos de la potencia para soltar la suspensión (o tenedor) vieja. Retira también los espaciadores si los hay.",
    "Paso 2: Limpia bien el área de montaje, especialmente la parte del tubo de dirección y la potencia.",
    "Paso 3: Aplica grasa nueva en los rodamientos de la dirección (o en el sistema de dirección integrado).",
    "Paso 4: Coloca la nueva suspensión junto con los espaciadores. Ajusta primero el tornillo superior de la tapa (en la potencia) y luego los laterales.",
    "Paso 5: Vuelve a instalar la rueda delantera. Asegúrate de que esté bien ajustada y que la dirección esté alineada correctamente.",
    ],

    herramientas: [
       "Llaves Allen (4 mm, 5 mm o 6 mm según la bicicleta)",
    "Grasa para rodamientos",
    "Trapo de limpieza",
    ],

    
    informacion: {
      utilidad: "La suspensión es esencial para bicicletas de montaña (MTB), ya que absorbe impactos en terrenos irregulares, mejora el control y protege tanto al ciclista como al cuadro.",
    mantenimiento: "Debe mantenerse limpia y lubricada. Se recomienda llevarla a un taller especializado para realizar mantenimiento interno, como cambio de retenes o revisión de aceite.",
    },

  },

  pedal: {
      nombre: "pedal",
    imagen: require('../../img/pedal.jpg'),
    comoColocar: [
      "Paso 1: Usa una llave número 15 o una llave específica para pedales.",
    "Paso 2: Gira el pedal izquierdo en sentido horario para aflojarlo (rosca inversa) y el derecho en sentido antihorario.",
    "Paso 3: Limpia la rosca de las bielas antes de instalar los nuevos pedales.",
    "Paso 4: Revisa las marcas en los pedales: 'R' (derecha) y 'L' (izquierda) para colocarlos correctamente.",
    "Paso 5: Atornilla el pedal derecho en sentido horario y el izquierdo en sentido antihorario. Ajusta firmemente.",
    ],

    herramientas: [
       "Llave para pedales (15 mm o específica)",
    "Grasa para roscas",
    "Trapo de limpieza",
    ],

    informacion: {
       utilidad: "El pedal permite transmitir la fuerza del pedaleo hacia las bielas y es esencial para el movimiento y control de la bicicleta.",
    mantenimiento: "Limpia y engrasa las roscas regularmente para evitar que se atasquen. Si el pedal presenta juego o ruido, es recomendable revisarlo o reemplazarlo.",
    },

  },

   piñon: {
      nombre: "piñon",
    imagen: require('../../iconos/piñon.png'),
    comoColocar: [
       "Paso 1: Retira la rueda trasera de la bicicleta.",
    "Paso 2: Usa un extractor de cassette o rueda libre (dependiendo del tipo de piñón) y una llave inglesa para aflojar el componente.",
    "Paso 3: Retira el piñón viejo con cuidado.",
    "Paso 4: Limpia bien el núcleo de la rueda donde va instalado el nuevo piñón.",
    "Paso 5: Coloca el nuevo piñón, asegurándote de alinear correctamente las ranuras.",
    "Paso 6: Aprieta con el extractor y vuelve a montar la rueda en la bicicleta.",
    ],

    herramientas: [
     "Extractor de cassette o rueda libre",
    "Llave inglesa",
    "Llave de cadena",
    ],

    informacion: {
       utilidad: "El piñón forma parte del sistema de transmisión. Permite variar la relación de pedaleo y facilita subir o bajar pendientes.",
    mantenimiento: "Debe mantenerse limpio y bien lubricado. Si los dientes están desgastados o la cadena se salta, es necesario reemplazarlo. Requiere herramientas específicas para su instalación y remoción.",
    },

  },
    cadena: {
      nombre: "cadena",
    imagen: require('../../iconos/cadena.png'),
    comoColocar: [
     "Paso 1: Coloca la bicicleta en una base o volteada para trabajar cómodamente.",
    "Paso 2: Si es necesario quitar la cadena vieja, utiliza un corta cadenas o abre el eslabón maestro con una herramienta adecuada.",
    "Paso 3: Alinea la nueva cadena sobre el plato delantero y el piñón trasero, asegurándote de que pase correctamente por el desviador.",
    "Paso 4: Une los extremos de la cadena usando un eslabón maestro o un remache con la herramienta corta cadenas.",
    "Paso 5: Revisa que la cadena corra suavemente y que tenga la tensión adecuada.",
    ],

    herramientas: [
         "Corta cadenas",
    "Eslabón maestro (opcional)",
    "Guantes",
    ],

    informacion: {
      utilidad: "La cadena es fundamental para transmitir la energía del pedaleo hacia la rueda trasera, permitiendo el movimiento de la bicicleta.",
    mantenimiento: "Debe limpiarse y lubricarse con frecuencia para evitar el desgaste prematuro. Se recomienda revisar su estiramiento con una herramienta específica y reemplazarla cuando esté alargada.",
  
    },

  },
  
  plato: {
      nombre: "plato",
    imagen: require('../../iconos/plato.png'),
    comoColocar: [
      "Paso 1: Retira la cadena del plato y asegúrate de tener acceso libre a los tornillos.",
    "Paso 2: Usa una llave Allen o herramienta específica para aflojar los tornillos del plato.",
    "Paso 3: Retira el plato dañado o desgastado.",
    "Paso 4: Coloca el nuevo plato alineando correctamente los orificios de montaje.",
    "Paso 5: Ajusta y aprieta los tornillos de manera uniforme.",
    "Paso 6: Vuelve a colocar la cadena y verifica que funcione correctamente al pedalear."
    ],

    herramientas: [
    "Llave Allen (generalmente de 5 mm o 6 mm)",
    "Extractor de bielas (si es necesario)",
    "Grasa para componentes",
    ],

    informacion: {
       utilidad: "El plato transmite la fuerza del pedaleo hacia la cadena, permitiendo el movimiento de la bicicleta. Es clave en el sistema de transmisión.",
    mantenimiento: "Debe mantenerse limpio y libre de óxido. Si presenta desgaste en los dientes, es recomendable reemplazarlo. Se puede limpiar con desengrasante y un cepillo.",
    },

  },
    marco: {
      nombre: "marco",
    imagen: require('../../iconos/marco.png'),
    comoColocar: [
      "Paso 1: Desmonta todos los componentes de la bicicleta (ruedas, transmisión, frenos, manubrio, suspensión, etc.) del marco antiguo.",
    "Paso 2: Limpia todas las piezas y asegúrate de que estén en buen estado para ser reutilizadas.",
    "Paso 3: Prepara el nuevo marco verificando que sea compatible con tus componentes (tipo de dirección, eje, soporte de freno, etc.).",
    "Paso 4: Instala la dirección, la suspensión delantera y la potencia.",
    "Paso 5: Monta el resto de componentes: transmisión, frenos, ruedas, manubrio, sillín, etc.",
    "Paso 6: Ajusta y alinea todo correctamente, y realiza una inspección final antes de usar la bicicleta.",
    ],

    herramientas: [
    "Juego de llaves Allen",
    "Extractor de bielas",
    "Extractor de dirección (si es necesario)",
    "Grasa para componentes",
    "Desmontadores de neumáticos",
    ],

    informacion: {
       utilidad: "El marco es la estructura principal de la bicicleta; sostiene todos los componentes y define el tipo, geometría y resistencia del conjunto.",
    mantenimiento: "Debe limpiarse regularmente, inspeccionarse por fisuras o golpes, y mantenerse libre de óxido o corrosión. Un marco en mal estado puede comprometer la seguridad del ciclista.",
    },

  },
 // los de ruta


  ruedasr: {
    nombre: "Ruedas de ruta",
    // imagen: require('../../iconos/rueda.png'),
    comoColocar: [
      "Paso 1: Desactiva los frenos (tipo caliper o de disco) para liberar la rueda.",
      "Paso 2: Suelta el cierre rápido o afloja los ejes pasantes, dependiendo del tipo de rueda.",
      "Paso 3: Retira la rueda delantera o trasera con cuidado.",
      "Paso 4: Alinea la nueva rueda en la horquilla (delantera) o en el cuadro (trasera).",
      "Paso 5: Ajusta y aprieta el cierre rápido o eje pasante. Verifica que esté centrada y gire libremente.",
    ],
    informacion: {
      utilidad: "Las ruedas de ruta están diseñadas para minimizar la resistencia y maximizar la eficiencia en el pedaleo sobre superficies pavimentadas.",
      mantenimiento: "Revisa la presión regularmente, inspecciona el aro por fisuras o golpes, y revisa la tensión de los radios y los rodamientos.",
    },
    herramientas: [
      "Llave inglesa o llave Allen (para ejes pasantes)",
      "Desmontadores de neumáticos",
      "Bomba de aire o inflador de precisión",
    ],
  },

  manubrior: {
    nombre: "Manubrio de ruta",
    // imagen: require('../../iconos/manubrior.jpeg'),
    comoColocar: [
      "Paso 1: Retira la tapa frontal de la potencia soltando los tornillos Allen.",
      "Paso 2: Retira el manubrio antiguo y limpia la zona de contacto.",
      "Paso 3: Coloca el nuevo manubrio de ruta (tipo drop bar) centrado en la potencia.",
      "Paso 4: Ajusta la inclinación del manubrio a tu gusto.",
      "Paso 5: Aprieta los tornillos de forma cruzada para una presión uniforme.",
    ],
    herramientas: [
      "Llaves Allen (4 mm o 5 mm)",
      "Grasa ligera (opcional)",
      "Nivel o cinta métrica para centrar",
    ],
    informacion: {
      utilidad: "El manubrio de ruta permite múltiples posiciones de agarre y mejora la aerodinámica del ciclista en terrenos planos o en competencia.",
      mantenimiento: "Revisa que no tenga grietas, que esté bien apretado y que la cinta esté en buen estado.",
    },
  },

  horquilla: {
    nombre: "Horquilla",
    // imagen: require('../../iconos/tenedor.png'),
    comoColocar: [
      "Paso 1: Retira la rueda delantera y desmonta el manubrio de la potencia.",
      "Paso 2: Afloja los tornillos de la potencia y extrae la horquilla antigua.",
      "Paso 3: Limpia la zona de dirección e instala rodamientos o pista nueva si es necesario.",
      "Paso 4: Inserta la nueva horquilla y ajusta con los espaciadores adecuados.",
      "Paso 5: Ajusta el tornillo superior de la tapa de dirección y luego los laterales de la potencia.",
    ],
    herramientas: [
      "Llaves Allen (5 mm o 6 mm)",
      "Grasa para dirección",
      "Trapo de limpieza",
    ],
    informacion: {
      utilidad: "La horquilla en bicicletas de ruta proporciona estabilidad, rigidez y precisión en la dirección.",
      mantenimiento: "Debe mantenerse limpia. En caso de dirección integrada, revisar rodamientos y reemplazarlos si hay desgaste.",
    },
  },

  pedalr: {
    nombre: "Pedal de ruta",
    // imagen: require('../../iconos/pedalr.png'),
    comoColocar: [
      "Paso 1: Usa una llave para pedales o una Allen (por la parte trasera de la biela).",
      "Paso 2: Gira el pedal izquierdo en sentido horario y el derecho en sentido antihorario para retirarlos.",
      "Paso 3: Limpia las roscas de las bielas.",
      "Paso 4: Identifica 'L' y 'R' en los nuevos pedales.",
      "Paso 5: Enrosca y aprieta los pedales correctamente según su lado.",
    ],
    herramientas: [
      "Llave para pedales (15 mm) o Allen de 6/8 mm",
      "Grasa para roscas",
      "Guantes",
    ],
    informacion: {
      utilidad: "Los pedales de ruta, a menudo automáticos, mejoran la eficiencia de pedaleo y permiten una conexión directa con el ciclista.",
      mantenimiento: "Lubrica las roscas, revisa el mecanismo de enganche y limpia regularmente.",
    },
  },

  cassette: {
    nombre: "Cassette",
    // imagen: require('../../iconos/casetter.png'),
    comoColocar: [
      "Paso 1: Retira la rueda trasera.",
      "Paso 2: Usa un extractor de cassette y una llave de cadena para aflojar el seguro.",
      "Paso 3: Retira el cassette viejo y limpia el núcleo.",
      "Paso 4: Coloca el nuevo cassette alineando bien las estrías.",
      "Paso 5: Aprieta con el extractor hasta que quede firme.",
    ],
    herramientas: [
      "Extractor de cassette",
      "Llave de cadena",
      "Llave inglesa",
    ],
    informacion: {
      utilidad: "El cassette permite cambiar la relación de pedaleo y adaptar la cadencia según el terreno.",
      mantenimiento: "Limpieza frecuente con desengrasante. Si hay desgaste en los dientes o saltos, reemplazarlo.",
    },
  },

  cadenilla: {
    nombre: "Cadenilla",
    // imagen: require('../../iconos/cadenilla.png'),
    comoColocar: [
      "Paso 1: Si hay cadena vieja, córtala con una herramienta adecuada.",
      "Paso 2: Pasa la nueva cadena por el desviador trasero y delantero.",
      "Paso 3: Alinea la longitud correcta (consulta con medidor de cadena o compara con la anterior).",
      "Paso 4: Cierra con eslabón maestro o remache usando corta cadenas.",
      "Paso 5: Revisa que se mueva suavemente al girar los pedales.",
    ],
    herramientas: [
      "Corta cadenas",
      "Eslabón maestro (opcional)",
      "Guantes",
    ],
    informacion: {
      utilidad: "La cadena transfiere la energía del ciclista al sistema de tracción de la bicicleta.",
      mantenimiento: "Lubricar frecuentemente, limpiar con desengrasante, y reemplazar cuando esté elongada.",
    },
  },

  platos: {
    nombre: "Platos",
    // imagen: require('../../iconos/plato.png'),
    comoColocar: [
      "Paso 1: Quita la cadena y asegúrate de tener acceso a los tornillos.",
      "Paso 2: Usa llave Allen para retirar los tornillos del plato.",
      "Paso 3: Instala el nuevo plato alineando los orificios.",
      "Paso 4: Aprieta los tornillos de forma cruzada y pareja.",
      "Paso 5: Vuelve a colocar la cadena y ajusta el desviador si es necesario.",
    ],
    herramientas: [
      "Llaves Allen (5 mm o 6 mm)",
      "Grasa ligera",
      "Extractor de bielas (si es necesario)",
    ],
    informacion: {
      utilidad: "Los platos determinan el desarrollo del pedaleo y su relación con el cassette trasero.",
      mantenimiento: "Limpieza regular y cambio en caso de desgaste de dientes o deformaciones.",
    },
  },

  cuadro: {
    nombre: "Cuadro",
    // imagen: require('../../iconos/marcor.png'),
    comoColocar: [
      "Paso 1: Desmonta todos los componentes del cuadro antiguo.",
      "Paso 2: Limpia las piezas para asegurar compatibilidad.",
      "Paso 3: Verifica que el nuevo cuadro sea compatible (dirección, frenos, eje de pedalier, etc.).",
      "Paso 4: Instala primero la dirección, horquilla y potencia.",
      "Paso 5: Monta la transmisión, frenos, ruedas y manillar.",
      "Paso 6: Ajusta y revisa toda la configuración antes de usar.",
    ],
    herramientas: [
      "Llaves Allen",
      "Grasa para componentes",
      "Extractor de bielas",
      "Extractor de dirección (si es necesario)",
      "Cortacables y ajustadores",
    ],
    informacion: {
      utilidad: "El cuadro es la base estructural de la bicicleta y define su geometría, peso y rigidez.",
      mantenimiento: "Inspección visual frecuente, limpieza, y revisión ante golpes o fisuras. Un cuadro dañado puede poner en riesgo al ciclista.",
    },
  },

  //los de fija 

  ruedasf: {
  // nombre: "Ruedas para fixie",
  imagen: require('../../iconos/ruedaf.png'),
  comoColocar: [
    "Paso 1: Afloja el cierre rápido o tuercas del eje trasero y delantero.",
    "Paso 2: Retira la rueda vieja con cuidado.",
    "Paso 3: Coloca la rueda nueva alineándola en el cuadro y horquilla.",
    "Paso 4: Ajusta y aprieta bien el cierre rápido o las tuercas.",
    "Paso 5: Verifica que las ruedas estén centradas y giren libremente.",
  ],
  informacion: {
    utilidad: "Las ruedas en fixie son robustas y diseñadas para ofrecer buena tracción en la ciudad.",
    mantenimiento: "Revisa tensión de radios, presión de neumáticos y estado de rodamientos regularmente.",
  },
  herramientas: [
    "Llave inglesa",
    "Desmontadores de neumáticos",
    "Bomba de aire",
  ],
},

manubriof: {
  nombre: "Manubrio para fixie",
  // imagen: require('../../iconos/flatb.jpeg'),
  comoColocar: [
    "Paso 1: Afloja los tornillos de la potencia y retira el manubrio antiguo.",
    "Paso 2: Limpia la zona de montaje.",
    "Paso 3: Coloca el nuevo manubrio (puede ser tipo bullhorn, drop o flat) centrado en la potencia.",
    "Paso 4: Ajusta la inclinación y posición a tu preferencia.",
    "Paso 5: Aprieta los tornillos de forma cruzada y segura.",
  ],
  herramientas: [
    "Llaves Allen (4 mm o 5 mm)",
    "Grasa ligera",
  ],
  informacion: {
    utilidad: "El manubrio en fixie puede variar según estilo, pero siempre busca comodidad y control en la ciudad.",
    mantenimiento: "Revisa apriete y estado de la cinta o puños regularmente.",
  },
},

piñonf: {
  nombre: "Piñón fijo",
  /* imagen: require('../../iconos/piñonf.png'), */
  comoColocar: [
    "Paso 1: Retira la rueda trasera de la bicicleta.",
    "Paso 2: Desmonta el piñón viejo con una llave adecuada o extractor si es necesario.",
    "Paso 3: Limpia el núcleo de la rueda donde se monta el piñón.",
    "Paso 4: Enrosca el piñón fijo nuevo con firmeza, asegurándote de la orientación correcta.",
    "Paso 5: Vuelve a montar la rueda en la bicicleta y ajusta la tensión de la cadena.",
  ],
  herramientas: [
    "Llave inglesa",
    "Extractor de piñón (si es necesario)",
  ],
  informacion: {
    utilidad: "El piñón fijo conecta directamente la fuerza del pedaleo con la rueda trasera, sin posibilidad de rueda libre.",
    mantenimiento: "Asegura que esté bien apretado y limpio para evitar desgastes.",
  },
},

cadenaf: {
  nombre: "Cadena para fixie",
  // imagen: require('../../iconos/cadenaf.jpeg'),
  comoColocar: [
    "Paso 1: Retira la cadena vieja si es necesario.",
    "Paso 2: Coloca la cadena nueva asegurándote que la longitud sea correcta para evitar tensión o flojedad excesiva.",
    "Paso 3: Usa un eslabón maestro o remache para cerrar la cadena.",
    "Paso 4: Revisa que la cadena se mueva suavemente y sin saltos.",
  ],
  herramientas: [
    "Corta cadenas",
    "Eslabón maestro (opcional)",
    "Guantes",
  ],
  informacion: {
    utilidad: "La cadena transmite la fuerza directamente del plato al piñón fijo, siendo crucial para el funcionamiento.",
    mantenimiento: "Lubrica y limpia con frecuencia para evitar desgaste y alargamiento.",
  },
},

platof: {
  nombre: "Plato para fixie",
  // imagen: require('../../iconos/plato.png'),
  comoColocar: [
    "Paso 1: Retira la cadena del plato.",
    "Paso 2: Afloja los tornillos del plato con una llave Allen.",
    "Paso 3: Retira el plato viejo.",
    "Paso 4: Coloca el nuevo plato y ajusta los tornillos de forma uniforme.",
    "Paso 5: Vuelve a colocar la cadena y ajusta la tensión si es necesario.",
  ],
  herramientas: [
    "Llave Allen (5 mm o 6 mm)",
    "Grasa ligera",
  ],
  informacion: {
    utilidad: "El plato transmite el pedaleo directamente al piñón fijo en fixie, siendo clave para el movimiento.",
    mantenimiento: "Mantén limpio y revisa desgaste en los dientes para evitar saltos de cadena.",
  },
},

cuadrof: {
  nombre: "Cuadro para fixie",
  // imagen: require('../../iconos/marcof.png'),
  comoColocar: [
    "Paso 1: Desmonta todos los componentes del cuadro antiguo.",
    "Paso 2: Limpia las piezas para verificar compatibilidad.",
    "Paso 3: Verifica compatibilidad con dirección, ejes y frenos (si tiene).",
    "Paso 4: Instala dirección, potencia y horquilla.",
    "Paso 5: Monta transmisión, ruedas, manubrio y demás componentes.",
    "Paso 6: Ajusta y revisa todo antes de rodar.",
  ],
  herramientas: [
    "Llaves Allen",
    "Grasa para componentes",
    "Extractor de bielas",
    "Extractor de dirección (si es necesario)",
  ],
  informacion: {
    utilidad: "El cuadro para fixie es sencillo, rígido y ligero, pensado para la ciudad y la velocidad constante.",
    mantenimiento: "Limpieza regular, inspección visual para evitar fisuras o golpes peligrosos.",
  },
},
};

