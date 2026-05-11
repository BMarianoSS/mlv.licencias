export function filtrarSoloNumeros(event: any): string {
    const input = event.target;
    const valor = input.value.replace(/[^0-9]/g, '');
    input.value = valor;
    return valor;
}