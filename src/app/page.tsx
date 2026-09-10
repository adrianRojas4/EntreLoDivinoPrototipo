"use client";

import React, { useState, useEffect } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import ReactPlayer from 'react-player';
import 'react-inner-image-zoom/lib/styles.min.css';

// --- MOCK DATA ---
const CATEGORIES = ["All", "Ropa", "Hogar", "Carteras", "Accesorios"];

const MOCK_PRODUCTS = [
  { id: 1, name: "Cartera elegante de Cuero", category: "Carteras", price: 120, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: "Más vendido", description: "Descubre la calidad inigualable de nuestro cuero premium. Elegante, duradero y versátil para complementar cualquier look." },
  { id: 2, name: "Bolso de Cuero Minimal", category: "Carteras", price: 85, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: "Destacado", description: "Un bolso de cuero artesanal perfecto para el día a día. Espacioso y elegante." },
  { id: 3, name: "Jarrón de Cerámica", category: "Hogar", price: 45, image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: null, description: "Minimalismo para tu sala con este hermoso jarrón hecho a mano." },
  { id: 4, name: "Abrigo de Lana", category: "Ropa", price: 190, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: null, description: "Abrigo cálido y atemporal, ideal para cualquier temporada fría." },
  { id: 5, name: "Tote Bag de Lino", category: "Carteras", price: 35, image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: "Nuevo", description: "Bolsa ecológica y resistente, perfecta para compras ligeras." },
  { id: 6, name: "Lámpara de Mesa Clásica", category: "Hogar", price: 110, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: null, description: "Iluminación cálida con un diseño atemporal para tu buró o escritorio." },
  { id: 7, name: "Blusa de Lino Blanca", category: "Ropa", price: 55, image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: "Más vendido", description: "Fresca, cómoda y elegante. Una prenda básica indispensable." },
  { id: 8, name: "Gafas de Sol Vintage", category: "Accesorios", price: 65, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: null, description: "Estilo retro con máxima protección UV." },
  { id: 9, name: "Velas Aromáticas", category: "Hogar", price: 25, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: "Destacado", description: "Set de 3 velas con aroma a lavanda y vainilla." },
  { id: 10, name: "Falda Plisada", category: "Ropa", price: 75, image: "https://images.unsplash.com/photo-1582142306909-195724d33ffc?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1582142306909-195724d33ffc?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: null, description: "Falda ligera con movimiento fluido, ideal para primavera." },
  { id: 11, name: "Mochila de Cuero", category: "Carteras", price: 140, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: null, description: "Práctica, resistente y con compartimento para laptop." },
  { id: 12, name: "Sombrero de Paja", category: "Accesorios", price: 30, image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: "Verano", description: "El accesorio perfecto para protegerte del sol en la playa." },
  { id: 13, name: "Sillón de Terciopelo", category: "Hogar", price: 350, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: "Destacado", description: "Un toque de sofisticación y color para tu espacio favorito." },
  { id: 14, name: "Cinturón Trenzado", category: "Accesorios", price: 45, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: null, description: "Cuero genuino tejido artesanalmente." },
  { id: 15, name: "Pantalón de Lino", category: "Ropa", price: 65, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: null, description: "Corte recto, holgado y extremadamente cómodo." },
  { id: 16, name: "Billetera de Cuero", category: "Carteras", price: 50, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop", zoomImage: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=100&w=2500&auto=format&fit=crop", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", tag: "Nuevo", description: "Diseño delgado y elegante para tus tarjetas y efectivo." },
];

export default function Storefront() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // States for filtering and sorting
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter & Sort Logic
  const filteredProducts = MOCK_PRODUCTS.filter(p =>
    activeCategory === "All" ? true : p.category === activeCategory
  ).sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0; // default
  });

  // --- VISTA DETALLE DE PRODUCTO ---
  if (selectedProduct) {
    return (
      <main className="min-h-screen bg-[#fafafa] text-gray-900 font-sans selection:bg-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">

          {/* Header & Botón de Volver */}
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-200 pb-6 gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-light tracking-tight text-gray-800">
                Entre lo Divino
              </h1>
              <p className="text-gray-500 mt-3 text-sm md:text-base uppercase tracking-widest font-medium">
                Detalle del Producto
              </p>
            </div>
            <button
              onClick={() => setSelectedProduct(null)}
              className="text-sm font-medium uppercase tracking-wider text-gray-600 hover:text-gray-900 transition flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full bg-white hover:bg-gray-50"
            >
              ← Volver a Vitrina
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Lupa de Imagen */}
            <div className="flex flex-col space-y-6">
              <div className="bg-white p-4 shadow-sm rounded-xl border border-gray-100 overflow-hidden group">
                <InnerImageZoom
                  src={selectedProduct.image}
                  zoomSrc={selectedProduct.zoomImage}
                  zoomType="hover"
                  zoomPreload={true}
                  className="w-full h-auto object-cover rounded-lg"
                  hideHint={true}
                />
              </div>
              <p className="text-sm text-gray-500 text-center italic">
                Pasa el mouse o toca la imagen para ver el detalle.
              </p>
            </div>

            {/* Información y Video */}
            <div className="flex flex-col space-y-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{selectedProduct.category}</p>
                <h2 className="text-3xl font-normal text-gray-800 mb-2">{selectedProduct.name}</h2>
                <p className="text-2xl text-gray-600 font-light">{selectedProduct.price.toFixed(2)} <span className="text-sm text-gray-400">Bs</span></p>

                <div className="mt-6 prose prose-sm text-gray-600">
                  <p>{selectedProduct.description}</p>
                </div>

                <button className="mt-8 w-full md:w-auto px-10 py-4 bg-gray-900 text-white text-sm uppercase tracking-widest font-semibold hover:bg-gray-800 transition-colors rounded">
                  Comprar por WhatsApp
                </button>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Experiencia en movimiento</h3>
                <div className="relative pt-[56.25%] rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-100">
                  {isMounted && (
                    <ReactPlayer
                      src={selectedProduct.videoUrl}
                      className="absolute top-0 left-0"
                      width="100%"
                      height="100%"
                      controls={true}
                      light={true}
                      playing={false}
                    />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center italic">
                  Video demostrativo integrado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --- VISTA DE VITRINA (GRID) ---
  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">

        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-800">
            Entre lo Divino
          </h1>
          <p className="text-gray-500 mt-4 text-sm md:text-base uppercase tracking-widest font-medium">
            Nueva Colección
          </p>
        </header>

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-gray-200 pb-4 gap-6">

          {/* Categories Tab */}
          <div className="flex space-x-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-sm tracking-wide transition-colors whitespace-nowrap ${activeCategory === category
                  ? "text-gray-900 font-semibold border-b-2 border-gray-900 pb-1"
                  : "text-gray-500 hover:text-gray-900 pb-1"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <label className="text-sm text-gray-500">Ordenar por:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="text-sm bg-transparent border-none text-gray-800 font-medium focus:ring-0 cursor-pointer outline-none"
            >
              <option value="default">Recomendados</option>
              <option value="asc">Precio: Menor a Mayor</option>
              <option value="desc">Precio: Mayor a Menor</option>
            </select>
          </div>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer flex flex-col"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Tags Sutiles */}
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-wider font-semibold text-gray-800 rounded">
                    {product.tag}
                  </span>
                )}

                {/* Hover overlay suave */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <div className="flex justify-between items-start mt-2">
                <div className="flex flex-col">
                  <h3 className="text-base text-gray-900 font-medium">{product.name}</h3>
                  <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{product.category}</span>
                </div>
                <span className="text-base text-gray-800">{product.price.toFixed(2)} Bs</span>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            No se encontraron productos en esta categoría.
          </div>
        )}

      </div>
    </main>
  );
}
