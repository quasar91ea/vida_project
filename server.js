
const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Configura Express para servir archivos estáticos desde el directorio raíz del proyecto
app.use(express.static(path.join(__dirname, '/')));

// Para cualquier otra solicitud, envía el archivo index.html.
// Esto es clave para que el enrutamiento del lado del cliente de React funcione.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Función para obtener las direcciones IP locales de la máquina
const getLocalIps = () => {
    const interfaces = os.networkInterfaces();
    const ips = [];
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Filtra por direcciones IPv4 y excluye las internas (como 127.0.0.1)
            if ('IPv4' === iface.family && !iface.internal) {
                ips.push(iface.address);
            }
        }
    }
    return ips;
};

app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado y escuchando en el puerto ${PORT}`);
  console.log('Puedes ver tu aplicación en los siguientes enlaces:');
  console.log(`   - En tu computadora: http://localhost:${PORT}`);
  
  const localIps = getLocalIps();
  if (localIps.length > 0) {
    console.log('   - En tu red local (usa esta URL en tu teléfono):');
    localIps.forEach(ip => {
        console.log(`     http://${ip}:${PORT}`);
    });
  }
  
  console.log('\n⚠️  Recuerda: Para que aparezca el botón "Instalar aplicación" (PWA), necesitas servir la app desde una URL segura (HTTPS).');
});
