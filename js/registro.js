async function cargarPaises() {
    try {
        const response = await fetch('../data/paises.txt');
        const data = await response.text();
        const paises = data.split('\n').map(pais => pais.trim()).filter(pais => pais);
        const selectPais = document.getElementById('country');

        paises.forEach(pais => {
            const option = document.createElement('option');
            option.value = pais.toLowerCase().replace(/\s+/g, '_');
            option.textContent = pais;
            selectPais.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los países:', error);
    }
}

window.onload = cargarPaises;
