"use client";

import React, { useState, useEffect } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import ReactPlayer from 'react-player';
import 'react-inner-image-zoom/lib/styles.min.css';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900 font-sans selection:bg-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">

        {/* Header */}
        <header className="mb-16 text-center md:text-left border-b border-gray-200 pb-8">
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-gray-800">
            Entre lo Divino
          </h1>
          <p className="text-gray-500 mt-3 text-sm md:text-base uppercase tracking-widest font-medium">
            Demo de Funcionalidades
          </p>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left Column: Image Zoom */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white p-4 shadow-sm rounded-xl border border-gray-100 overflow-hidden group">
              <InnerImageZoom
                src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop"
                zoomSrc="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=100&w=2500&auto=format&fit=crop"
                zoomType="hover"
                zoomPreload={true}
                className="w-full h-auto object-cover rounded-lg"
                hideHint={true}
              />
            </div>
            <p className="text-sm text-gray-500 text-center italic">
              Pasa el mouse o toca la imagen para ver el detalle de la tela.
            </p>
          </div>

          {/* Right Column: Product Info & Video */}
          <div className="flex flex-col space-y-8">
            <div>
              <h2 className="text-3xl font-normal text-gray-800 mb-2">Vestido Elegante de Seda</h2>
              <p className="text-2xl text-gray-600 font-light">120.00 <span className="text-sm text-gray-400">Bs</span></p>

              <div className="mt-6 prose prose-sm text-gray-600">
                <p>
                  Descubre la suavidad inigualable de nuestra seda premium.
                  Diseñado para realzar la figura con una caída perfecta y un brillo sutil.
                </p>
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
                    src="https://www.youtube.com/shorts/G2icH57FBQc"
                    className="absolute top-0 left-0"
                    width="100%"
                    height="100%"
                    controls={true}
                    light={true}
                    playing
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
