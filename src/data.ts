export interface InventoryItem {
    idSucursal: number;
    nombreSucursal: string;
    idProveedor: number;
    nombreProveedor: string;
    stockProducto: number;
    precioProducto: number;
}

export interface Product {
    idProducto: number;
    nombreProducto: string;
    marcaProducto: string;
    modeloProducto: string;
    dimensionesProducto: string;
    especificacionesProducto: string;
    pesoProducto: number;
    urlImagenProducto: string;
    categoriaNombre: string;
    idCategoria: number;
    activo: boolean;
    descuentoActual: number | null;
    porcentajeDescuento: number | null;
    precio?: number;
    inventario?: InventoryItem[];
}
