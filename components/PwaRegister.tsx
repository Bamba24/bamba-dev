"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("serviceWorker" in navigator && (window.location.protocol === "https:" || window.location.hostname === "localhost")) {
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
          });

          // Check for background updates
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (!installingWorker) return;

            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  // New update available
                  console.info("[PWA] Nouvelle version disponible en arrière-plan.");
                } else {
                  // Content is cached for offline use
                  console.info("[PWA] Contenu mis en cache pour une utilisation hors-ligne.");
                }
              }
            };
          };
        } catch (error) {
          console.error("[PWA] Échec de l'enregistrement du Service Worker:", error);
        }
      };

      // Register when the page is fully loaded to prevent blocking critical resources
      if (document.readyState === "complete") {
        registerServiceWorker();
      } else {
        window.addEventListener("load", registerServiceWorker);
        return () => window.removeEventListener("load", registerServiceWorker);
      }
    }
  }, []);

  return null;
}
