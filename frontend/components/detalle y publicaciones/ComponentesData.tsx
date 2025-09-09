

export const componentesData = {
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
  // Puedes agregar más componentes aquí
};





